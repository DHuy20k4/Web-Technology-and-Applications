const db = require('../models');

let createNovel = async (req, res) => {
    try {
        let newNovel = await db.Novel.create(req.body);
        return res.status(201).json({
            errCode: 0,
            message: 'Tạo truyện mới thành công',
            data: newNovel
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            message: 'Lỗi server khi tạo truyện'
        });
    }
}

let getAllNovels = async (req, res) => {
    try {
        let novels = await db.Novel.findAll();
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: novels
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            message: 'Lỗi server khi lấy danh sách truyện'
        });
    }
}

let getNovelById = async (req, res) => {
    try {
        let novelId = req.params.id;
        if (!novelId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu định danh ID truyện'
            });
        }
        let novel = await db.Novel.findOne({
            where: { id: novelId }
        });
        if (novel) {
            return res.status(200).json({
                errCode: 0,
                message: 'OK',
                data: novel
            });
        } else {
            return res.status(404).json({
                errCode: 2,
                message: 'Không tìm thấy truyện'
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            message: 'Lỗi server khi tìm truyện'
        });
    }
}

let updateNovel = async (req, res) => {
    try {
        let novelId = req.params.id;
        if (!novelId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu định danh ID của truyện'
            });
        }
        let novel = await db.Novel.findOne({
            where: { id: novelId },
            raw: false
        });
        if (novel) {
            await novel.update(req.body);
            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhật truyện thành công',
                data: novel
            });
        } else {
            return res.status(404).json({
                errCode: 2,
                message: 'Không tìm thấy truyện để cập nhật!'
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            message: 'Lỗi server khi cập nhật truyện'
        });
    }
}

let deleteNovel = async (req, res) => {
    try {
        let novelId = req.params.id;
        if (!novelId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu định danh ID của truyện'
            });
        }
        let novel = await db.Novel.findOne({
            where: { id: novelId }
        });
        if (novel) {
            await db.Novel.destroy({
                where: { id: novelId }
            });
            return res.status(200).json({
                errCode: 0,
                message: 'Đã xóa truyện thành công'
            });
        } else {
            return res.status(404).json({
                errCode: 2,
                message: 'Không tìm thấy truyện để xóa!'
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            message: 'Lỗi server khi xóa truyện'
        });
    }
}

module.exports = {
    createNovel,
    getAllNovels,
    getNovelById,
    updateNovel,
    deleteNovel
}
