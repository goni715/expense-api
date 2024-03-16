import UserLoginService from "../../services/user/UserLoginService.js";
import UserModel from "../../models/user/UserModel.js";
import UserCreateService from "../../services/user/UserCreateService.js";

export const Register = async (req, res) => {
     await UserCreateService(req, res, UserModel)
}

export const Login = async (req, res) => {
    await UserLoginService(req, res, UserModel)
}