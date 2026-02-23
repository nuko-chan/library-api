import type { Book } from "../entities/book.js";

export interface BookRepositoryInterface {
	create(book: Book): Promise<Book>;
	// findById(id: string): Promise<Book | null>;
}
