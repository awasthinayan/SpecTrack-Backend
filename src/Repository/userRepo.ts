import { User } from "../Models/userModel";
 

export class UserRepository {
  async CreateUser(user: any) {
    const newUser = new User(user);
    return await newUser.save();
  }

  async GetUserById(id: string) {
    return await User.findById(id);
  }

  async GetUserByEmail(email: string) {
    return await User.findOne({ email });
  }
}

export default UserRepository;
