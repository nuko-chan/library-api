import type { Request, Response } from "express";
import { BookService } from "../businessLogic/bookService.js";

export class BookController {
	private bookService: BookService;

	constructor() {
		this.bookService = new BookService();
	}

	async add(req: Request, res: Response): Promise<void> {
		try {
			const { title } = req.body;
			const book = await this.bookService.add(title);
			res.status(202).json(book);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "書籍の登録二失敗しました" });
		}
	}

	async findById(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id as string;
			const book = await this.bookService.findById(id);
			if (book) {
				res.status(200).json(book);
			} else {
				res.status(404).json({ error: "書籍が見つかりませんでした" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "書籍の検索に失敗しました" });
		}
	}
}
