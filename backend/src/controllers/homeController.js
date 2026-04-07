let getHomePage = async (req, res) => {
    // Tự động chuyển hướng sang trang Docs của Swagger khi vào thư mục gốc
    return res.redirect('/api-docs');
}

module.exports = {
    getHomePage: getHomePage
}