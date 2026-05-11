import UserRepository from "../Repository/userRepo";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../Utils/jwt";

const userRepo = new UserRepository();

export const RegisterUserService = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await userRepo.GetUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepo.CreateUser({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const LoginUserService = async (email: string, password: string) => {
  const user = await userRepo.GetUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }

  const token = generateToken({ id: user._id.toString() });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
    },
  };
};

export const GetCurrentUserService = async (token: string) => {
  const decodedToken = await verifyToken(token);

  if (!decodedToken) {
    throw new Error("Invalid token");
  }
  console.log(decodedToken);
  const user = await userRepo.GetUserById(decodedToken.id);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const LogoutUserService = async () => {
  return {
    status: "success",
    message: "User logged out successfully",
  }
}