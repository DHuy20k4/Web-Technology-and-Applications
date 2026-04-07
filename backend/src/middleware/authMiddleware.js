import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET || "123456");
            req.user = decoded; // Dữ liệu payload gán vào req.user
            next();
        } catch (e) {
            return res.status(401).json({ errCode: -1, message: "Token không hợp lệ hoặc đã hết hạn" });
        }
    } else {
        return res.status(401).json({ errCode: -1, message: "Không tìm thấy Auth Token, bạn cần đăng nhập" });
    }
}

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ errCode: -2, message: "Bạn không có quyền truy cập chức năng này (Yêu cầu quyền Admin)" });
    }
}

module.exports = {
    checkAuth,
    checkAdmin
}
