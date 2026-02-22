import type { BookRepositoryInterface } from "../dataAccess/bookRepositoryInterface.ts";
import type { Book } from "../generated/prisma/index.js";

export class BookService {
	constructor(private readonly bookRepository: BookRepositoryInterface) {}

	// 本を登録する
	async add(title: string): Promise<Book> {
		return await this.bookRepository.create(title);
	}

	// 本をIDで取得する
	async findById(id: string): Promise<Book | null> {
		return await this.bookRepository.findById(id);
	}
}
