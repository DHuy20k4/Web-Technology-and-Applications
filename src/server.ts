const express = require('express');

const app = express();
const port = 3000;

// cho phép đọc JSON từ body
app.use(express.json());
app.use(express.static('public'));

// API test
app.get('/', (req: any, res: any) => {
    res.send('Hello World!');
});

// API tính tổng từ 1 -> n
app.get('/TinhTong/:id', (req: any, res: any) => {
    const n = Number(req.params.id);

    if (isNaN(n)) {
        return res.send('n phải là số!');
    }

    let s = 0;
    for (let i = 1; i <= n; i++) {
        s += i;
    }

    res.send('Tổng là: ' + s);
});

// API tính tổng 2 số
app.post('/TinhTongHaiSo', (req: any, res: any) => {
    const a = Number(req.body.a);
    const b = Number(req.body.b);

    if (isNaN(a) || isNaN(b)) {
        return res.send('a và b phải là số!');
    }

    const s = a + b;
    res.send('Tổng là: ' + s);
});


// chạy server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});