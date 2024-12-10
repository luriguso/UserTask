import bcrypt from 'bcryptjs'

//module.exports 
export const encryptPass = async (pass_user) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass_user, salt);
}

export const comparePassword = async(pass_received, pass_user) => {
    return await bcrypt.compare(pass_received, pass_user);
}