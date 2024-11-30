const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const dataFilePath = path.join(__dirname, "data.json");


if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

app.post("/api/data", (req, res) => {
    const postData = req.body;
    console.log("Отримано дані від клієнта:", postData);

    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Помилка зчитування файлу:", err);
            return res.status(500).json({ message: "Помилка сервера" });
        }

        const jsonData = JSON.parse(data); 
        jsonData.push(postData); 

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Помилка запису у файл:", err);
                return res.status(500).json({ message: "Помилка сервера" });
            }
            res.json({ message: "Дані успішно збережено" });
        });
    });
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});