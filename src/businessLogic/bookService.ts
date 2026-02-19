import { PrismaBookRepository } from "../dataAccess/prismaBookRepository.js";
import type { Book } from "../generated/prisma/index.js";

export class BookService {
	private bookRepository: PrismaBookRepository;

	constructor() {
		this.bookRepository = new PrismaBookRepository();
	}

	// 本を登録する
	async add(title: string): Promise<Book> {
		return await this.bookRepository.create(title);
	}

	// 本をIDで取得する
	async findById(id: string): Promise<Book | null> {
		return await this.bookRepository.findById(id);
	}
}
