import "dotenv/config";
import express from "express";
import { BookService } from "./businessLogic/bookService.js";
import { PrismaBookRepository } from "./dataAccess/prismaBookRepository.js";
import { BookController } from "./presentation/bookController.js";

// Expressを使う
const app = express();

// JSONを使えるようにする
app.use(express.json());

const bookRepository = new PrismaBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

// ポートを指定する
const PORT = process.env.PORT || 3000;

app.post("/books", bookController.add.bind(bookController));
app.get("/books/:id", bookController.findById.bind(bookController));

// サーバーを起動する
app.listen(PORT, () => {
	console.log(`Server is runnning on port ${PORT}`);
});
