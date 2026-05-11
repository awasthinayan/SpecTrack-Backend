import UserRepository from "../Repository/userRepo";
import PasswordResetTokenRepository from "../Repository/passwordResetTokenRepo";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/jwt";
import crypto from "crypto";

const userRepo = new UserRepository();
const passwordResetTokenRepo = new PasswordResetTokenRepository();

// Generate a random token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Send reset email (placeholder - integrate with actual email service)
const sendResetEmail = async (email: string, resetLink: string) => {
  // In production, integrate with an email service like Nodemailer
  // For now, we'll just log the reset link
  console.log(`Reset email sent to ${email}`);
  console.log(`Reset link: ${resetLink}`);

  // This is where you would actually send the email:
  // await transporter.sendMail({
  //   to: email,
  //   from: process.env.EMAIL_FROM,
  //   subject: "Password Reset Request",
  //   html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
  // });
};

export const RequestPasswordResetService = async (email: string) => {
  try {
    const user = await userRepo.GetUserByEmail(email);

    if (!user) {
      // Don't reveal if email exists for security reasons
      // Return success even if user doesn't exist to prevent email enumeration
      return {
        success: true,
        message: "If an account exists with this email, a password reset link has been sent."
      };
    }

    // Delete any existing reset tokens for this user
    await passwordResetTokenRepo.DeletePasswordResetTokenByUserId(user._id.toString());

    // Generate new token
    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    // Save token to database
    await passwordResetTokenRepo.CreatePasswordResetToken({
      userId: user._id,
      token,
      expiresAt
    });

    // Generate reset link (this should be your frontend URL)
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${token}&userId=${user._id}`;

    // Send email (in production, add email service)
    await sendResetEmail(email, resetLink);

    return {
      success: true,
      message: "If an account exists with this email, a password reset link has been sent."
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to process password reset request"
    };
  }
};

export const ValidatePasswordResetTokenService = async (userId: string, token: string) => {
  try {
    const resetToken = await passwordResetTokenRepo.GetPasswordResetTokenByToken(token);

    if (!resetToken) {
      return {
        success: false,
        message: "Invalid or expired reset token"
      };
    }

    if (resetToken.expiresAt < new Date()) {
      return {
        success: false,
        message: "Reset token has expired"
      };
    }

    if (resetToken.userId.toString() !== userId) {
      return {
        success: false,
        message: "Invalid reset token"
      };
    }

    return {
      success: true,
      message: "Token is valid"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to validate reset token"
    };
  }
};

export const ResetPasswordService = async (userId: string, token: string, newPassword: string) => {
  try {
    // Validate token first
    const validationResult = await ValidatePasswordResetTokenService(userId, token);

    if (!validationResult.success) {
      return validationResult;
    }

    // Get user
    const user = await userRepo.GetUserById(userId);
    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await userRepo.UpdateUserPassword(user._id.toString(), hashedPassword);

    // Delete used token
    await passwordResetTokenRepo.DeletePasswordResetTokenByUserId(userId);

    return {
      success: true,
      message: "Password has been reset successfully"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to reset password"
    };
  }
};