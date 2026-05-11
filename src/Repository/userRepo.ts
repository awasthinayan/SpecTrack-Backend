import { User } from "../Models/userModel";
import { getSafeObjectIdFromParam } from "../Utils/safeIdValidation";

export class UserRepository {
 async CreateUser(user: any) {
   const newUser = new User(user);
   return await newUser.save();
 }

 async GetUserById(id: string) {
   const safeId = getSafeObjectIdFromParam(id);
   return await User.findById(safeId);
 }

 async GetUserByEmail(email: string) {
   return await User.findOne({ email });
 }
 
 async UpdateUserPassword(id: string, hashedPassword: string) {
   const safeId = getSafeObjectIdFromParam(id);
   return await User.findByIdAndUpdate(safeId, { password: hashedPassword }, { new: true });
 }
}

export default UserRepository;