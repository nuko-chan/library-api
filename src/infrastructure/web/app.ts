import "dotenv/config";
import { PrismaClient } from "@prisma/client/extension";
import express from "express";
import { BookController } from "../../adapter/controllers/bookController.js";
import { PrismaBookRepository } from "../../adapter/repositories/prismaBookRepository.js";
import { UuidGenerator } from "../../adapter/utils/uuidGenerator.js";
import { AddBookUseCase } from "../../application/usecases/book/addBookUseCase.js";
import { bookRoutes } from "./routers/bookRouter.js";

// Expressを使う
const app = express();

// JSONを使えるようにする
app.use(express.json());

const prisma = new PrismaClient();
const iiudidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, iiudidGenerator);
const bookController = new BookController(addBookUseCase);
app.use("/book", bookRoutes(bookController));

// ポートを指定する
const PORT = process.env.PORT || 3000;

// サーバーを起動する
app.listen(PORT, () => {
	console.log(`Server is runnning on port ${PORT}`);
});
