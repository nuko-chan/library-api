import type { Book } from "../generated/prisma/index.js";

export interface BookServiceInterface {
	add(title: string): Promise<Book>;
	findById(id: string): Promise<Book | null>;
}
