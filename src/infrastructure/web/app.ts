import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import express from "express";
import { BookController } from "../../adapter/controllers/bookController.js";
import { LoanController } from "../../adapter/controllers/loanController.js";
import { UserController } from "../../adapter/controllers/userController.js";
import { PrismaBookRepository } from "../../adapter/repositories/prismaBookRepository.js";
import { PrismaLoanRepository } from "../../adapter/repositories/prismaLoanRepository.js";
import { PrismaUserRepository } from "../../adapter/repositories/prismaUserRepository.js";
import { UuidGenerator } from "../../adapter/utils/uuidGenerator.js";
import { AddBookUseCase } from "../../application/usecases/book/addBookUseCase.js";
import { FindBookByIdUseCase } from "../../application/usecases/book/findBookByIdUseCase.js";
import { LoanBookUseCase } from "../../application/usecases/loan/loanBookUseCase.js";
import { CreateUserUseCase } from "../../application/usecases/user/createUserUseCase.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { bookRoutes } from "./routers/bookRouter.js";
import { loanRoutes } from "./routers/loanRouter.js";
import { userRoutes } from "./routers/userRouter.js";

const app = express();
app.use(express.json());

const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL ?? "",
});
const prisma = new PrismaClient({ adapter });
const uuidGenerator = new UuidGenerator();

// 本
const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

// ユーザー
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenerator);
const userController = new UserController(createUserUseCase);

// 貸し出し
const loanRepository = new PrismaLoanRepository(prisma);
const loanBookUseCase = new LoanBookUseCase(
	loanRepository,
	bookRepository,
	uuidGenerator,
);
const loanController = new LoanController(loanBookUseCase);

// ルーティングを登録
app.use("/users", userRoutes(userController));
app.use("/books", bookRoutes(bookController));
app.use("/loans", loanRoutes(loanController));

// ポートを指定
const PORT = process.env.PORT || 3000;

// サーバーを起動
app.listen(PORT, () => {
	console.log(`Server is runnning on port ${PORT}`);
});
