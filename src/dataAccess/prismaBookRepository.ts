import type { Book } from "../generated/prisma/client.js";
import { PrismaClient } from "../generated/prisma/client.js";

export class PrismaBookRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient({} as any);
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
