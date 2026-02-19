import express from "express";
import { BookController } from "./presentation/bookController.js";

// Expressを使う
const app = express();

// JSONを使えるようにする
app.use(express.json());

const bookController = new BookController();

// ポートを指定する
const PORT = process.env.PORT || 3000;

app.post("/books", bookController.add.bind(bookController));
app.get("/books/:id", bookController.findById.bind(bookController));

// サーバーを起動する
app.listen(PORT, () => {
	console.log(`Server is runnning on port ${PORT}`);
});
