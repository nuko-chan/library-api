import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import express from "express";
import { BookController } from "../../adapter/controllers/bookController.js";
import { PrismaBookRepository } from "../../adapter/repositories/prismaBookRepository.js";
import { UuidGenerator } from "../../adapter/utils/uuidGenerator.js";
import { AddBookUseCase } from "../../application/usecases/book/addBookUseCase.js";
import { FindBookByIdUseCase } from "../../application/usecases/book/findBookByIdUseCase.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { bookRoutes } from "./routers/bookRouter.js";

const app = express();
app.use(express.json());

const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL ?? "",
});
const prisma = new PrismaClient({ adapter });
const iiudidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, iiudidGenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);
app.use("/books", bookRoutes(bookController));

// ポートを指定する
const PORT = process.env.PORT || 3000;

// サーバーを起動する
app.listen(PORT, () => {
	console.log(`Server is runnning on port ${PORT}`);
});
