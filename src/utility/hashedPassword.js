import bcrypt from "bcryptjs";
const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt); //hashedPassword
}

export default hashedPassword;