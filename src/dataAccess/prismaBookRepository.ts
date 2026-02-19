import type { Book } from "../generated/prisma/index.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

export class PrismaBookRepository {
	private prisma: PrismaClient;

	constructor() {
		const connectionString = process.env.DATABASE_URL ?? "";
		const adapter = new PrismaBetterSqlite3({ url: connectionString });
		this.prisma = new PrismaClient({ adapter });
	}

	// 本を作成する
	async create(title: string): Promise<Book> {
		return await this.prisma.book.create({
			data: {
				title,
				isAvailable: true,
			},
		});
	}

	// 本をIDで取得する
	async findById(id: string): Promise<Book | null> {
		return await this.prisma.book.findUnique({
			where: { id },
		});
	}
}
