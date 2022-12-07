const UserModel = require('../model/User.js')


class UserModule {

    async create(data) {
        try {
            const newUser = new UserModel(data);
            return newUser.save();
        }
        catch (e) {
            console.log(e)
        }
    }
    async findByEmail(email) {
        try {
            const user = await UserModel.findOne({ email: email }).select('-__v');
            if (!user) {
                return null
            }
            return user
        }
        catch (e) {
            console.log(e)
        }

    }
    async findById(id) {
        try {
            const user = await UserModel.findById(id).select('-__v');
            return user;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = UserModule
