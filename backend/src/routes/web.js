import expess from "express";
import homeController from "../controllers/homeController";
import novelController from "../controllers/novelController";
import authController from "../controllers/authController";
import { checkAuth, checkAdmin } from "../middleware/authMiddleware";

let router = expess.Router();
let initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);

    // ============================================
    // API Auth (Đăng ký / Đăng nhập)
    // ============================================

    /**
     * @swagger
     * tags:
     *   name: Auth
     *   description: Đăng nhập và Đăng ký API
     */

    /**
     * @swagger
     * /api/register:
     *   post:
     *     summary: Đăng ký một tài khoản mới
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Thành công
     */
    router.post("/api/register", authController.handleRegister);

    /**
     * @swagger
     * /api/login:
     *   post:
     *     summary: Đăng nhập hệ thống (trả về Token)
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Trả về Token và User
     */
    router.post("/api/login", authController.handleLogin);



    // Các API của Novel

    /**
     * @swagger
     * tags:
     *   name: Novels
     *   description: API Quản lý tiểu thuyết
     */

    /**
     * @swagger
     * /api/novels:
     *   get:
     *     summary: Lấy danh sách tất cả các bài tiểu thuyết
     *     tags: [Novels]
     *     responses:
     *       200:
     *         description: Trả về danh sách truyện
     *   post:
     *     summary: Tạo một tiểu thuyết mới
     *     tags: [Novels]
     *     responses:
     *       201:
     *         description: Đã tạo tiểu thuyết
     */
    router.get("/api/novels", novelController.getAllNovels);
    router.post("/api/novels", checkAuth, checkAdmin, novelController.createNovel);

    /**
     * @swagger
     * /api/novels/{id}:
     *   get:
     *     summary: Xem thông tin 1 tiểu thuyết
     *     tags: [Novels]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       200:
     *         description: Thông tin tiểu thuyết
     *   put:
     *     summary: Cập nhật thông tin tiểu thuyết
     *     tags: [Novels]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       200:
     *         description: Đã cập nhật
     *   delete:
     *     summary: Xóa một tiểu thuyết
     *     tags: [Novels]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       200:
     *         description: Đã xóa thành công
     */
    router.get("/api/novels/:id", novelController.getNovelById);
    router.put("/api/novels/:id", checkAuth, checkAdmin, novelController.updateNovel);
    router.delete("/api/novels/:id", checkAuth, checkAdmin, novelController.deleteNovel);

    return app.use("/", router);
}
module.exports = initWebRoute;  