import { hash } from "bcryptjs";

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 8);
    return hashedPassword;
};

export { hashPassword };
