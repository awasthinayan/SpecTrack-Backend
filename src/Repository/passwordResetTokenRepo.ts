import { PasswordResetTokenModel } from "../Models/passwordResetTokenModel";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

export class PasswordResetTokenRepository {
  async CreatePasswordResetToken(tokenData: any) {
    const newToken = new PasswordResetTokenModel(tokenData);
    return await newToken.save();
  }

  async GetPasswordResetTokenByToken(token: string) {
    return await PasswordResetTokenModel.findOne({ token });
  }

  async GetPasswordResetTokenByUserId(userId: string) {
    const safeUserId = getSafeObjectIdFromParam(userId);
    return await PasswordResetTokenModel.findOne({ userId: safeUserId });
  }

  async DeletePasswordResetTokenById(id: string) {
    const safeId = getSafeObjectIdFromParam(id);
    return await PasswordResetTokenModel.findByIdAndDelete(safeId);
  }

  async DeletePasswordResetTokenByUserId(userId: string) {
    const safeUserId = getSafeObjectIdFromParam(userId);
    return await PasswordResetTokenModel.findOneAndDelete({ userId: safeUserId });
  }
}

export default PasswordResetTokenRepository;