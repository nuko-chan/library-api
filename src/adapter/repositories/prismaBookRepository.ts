import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { Book } from "../../domain/entities/book.js";
import type { BookRepositoryInterface } from "../../domain/repositories/bookRepositoryInterface.js";
import { PrismaClient } from "../../generated/prisma/client.js";

export class PrismaBookRepository implements BookRepositoryInterface {
	constructor(private readonly prisma: PrismaClient) {
		const connectionString = process.env.DATABASE_URL ?? "";
		const adapter = new PrismaBetterSqlite3({ url: connectionString });
		this.prisma = new PrismaClient({ adapter });
	}

	// 本を作成する
	async create(book: Book): Promise<Book> {
		const createdBook = await this.prisma.book.create({
			data: {
				id: book.id,
				title: book.title,
				isAvailable: book.isAvailable,
				createdAt: book.createdAt,
				updatedAt: book.updatedAt,
			},
		});

		return new Book(
			createdBook.id,
			createdBook.title,
			createdBook.isAvailable,
			createdBook.createdAt,
			createdBook.updatedAt,
		);
	}

	// 本をIDで取得する
	// async findById(id: string): Promise<Book | null> {
	// 	return await this.prisma.book.findUnique({
	// 		where: { id },
	// 	});
	// }
}
