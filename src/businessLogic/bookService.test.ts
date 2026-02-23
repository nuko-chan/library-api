import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	type Mocked,
	vi,
} from "vitest";
import type { BookRepositoryInterface } from "../domain/repositories/bookRepositoryInterface.js";
import type { Book } from "../generated/prisma/index.js";
import { BookService } from "./bookService.js";

const mockBookRepository: Mocked<BookRepositoryInterface> = {
	create: vi.fn(),
	findById: vi.fn(),
};

describe("BookService", () => {
	let bookService: BookService;

	beforeEach(() => {
		bookService = new BookService(mockBookRepository);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("書籍の登録が成功する", async () => {
		const newBook: Book = {
			id: "1",
			title: "test book",
			isAvailable: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		mockBookRepository.create.mockResolvedValue(newBook);
		const result = await bookService.add("Test Book");

		expect(result).toEqual(newBook);
		expect(mockBookRepository.create).toHaveBeenCalledWith("Test Book");
	});
});
