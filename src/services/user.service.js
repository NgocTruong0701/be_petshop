import User from "../models/user.model.js";

class UserService {
    static async findByEmail({ email, select = {
        email: 1, password: 2, name: 1, status: 1, roles: 1
    } }) {
        return await User.findOne({ email }).select(select).lean();
    }
}

export default UserService;