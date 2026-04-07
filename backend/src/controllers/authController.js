import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

const handleRegister = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ errCode: 1, message: "Vui lòng điền đủ thông tin!" });
        }
        
        let userExists = await db.User.findOne({ where: { email: email } });
        if (userExists) {
            return res.status(400).json({ errCode: 2, message: "Email đã tồn tại trong hệ thống." });
        }

        const hashPassword = bcrypt.hashSync(password, salt);
        let newUser = await db.User.create({
            email,
            password: hashPassword,
            firstName,
            lastName,
            role: "user"
        });

        return res.status(200).json({
            errCode: 0,
            message: "Đăng ký thành công",
        });
    } catch (e) {
         console.error(e);
         return res.status(500).json({ errCode: -1, message: "Lỗi server" });
    }
}

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ errCode: 1, message: "Thiếu email hoặc mật khẩu!" });
        }

        let user = await db.User.findOne({ where: { email: email }, raw: true });
        if (!user) {
            return res.status(404).json({ errCode: 2, message: "Tài khoản không tồn tại." });
        }

        let check = bcrypt.compareSync(password, user.password);
        if (!check) {
            return res.status(401).json({ errCode: 3, message: "Sai mật khẩu!" });
        }

        // Tạo JWT Token
        let token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "123456",
            { expiresIn: '1h' }
        );

        delete user.password; // Không trả về password
        
        return res.status(200).json({
            errCode: 0,
            message: "Đăng nhập thành công",
            user: user,
            access_token: token
        });

    } catch (e) {
         console.error(e);
         return res.status(500).json({ errCode: -1, message: "Lỗi server" });
    }
}

module.exports = {
    handleLogin,
    handleRegister
}
