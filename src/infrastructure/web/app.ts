import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import express from "express";
import { BookController } from "../../adapter/controllers/bookController.js";
import { UserController } from "../../adapter/controllers/userController.js";
import { PrismaBookRepository } from "../../adapter/repositories/prismaBookRepository.js";
import { PrismaUserRepository } from "../../adapter/repositories/prismaUserRepository.js";
import { UuidGenerator } from "../../adapter/utils/uuidGenerator.js";
import { AddBookUseCase } from "../../application/usecases/book/addBookUseCase.js";
import { FindBookByIdUseCase } from "../../application/usecases/book/findBookByIdUseCase.js";
import { CreateUserUseCase } from "../../application/usecases/user/createUserUseCase.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { bookRoutes } from "./routers/bookRouter.js";
import { userRoutes } from "./routers/userRouter.js";

const app = express();
app.use(express.json());

const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL ?? "",
});
const prisma = new PrismaClient({ adapter });
const uuidGenerator = new UuidGenerator();

// 本のルーティング
const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

// ユーザーのルーティング
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenerator);
const userController = new UserController(createUserUseCase);

// ルーティングを登録する
app.use("/users", userRoutes(userController));
app.use("/books", bookRoutes(bookController));

// ポートを指定する
const PORT = process.env.PORT || 3000;

// サーバーを起動する
app.listen(PORT, () => {
	console.log(`Server is runnning on port ${PORT}`);
});
