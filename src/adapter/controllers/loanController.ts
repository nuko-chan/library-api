import type { Request, Response } from "express";
import type { LoanBookRequestDto } from "../../application/dtos/loan/loanBookRequestDto.js";
import type { LoanBookUseCaseInterface } from "../../application/usecases/loan/loanBookUseCaseInterface.js";
export class LoanController {
	constructor(private readonly loanBookUseCase: LoanBookUseCaseInterface) {}

	async loanBook(req: Request, res: Response): Promise<void> {
		try {
			const requestDto: LoanBookRequestDto = {
				bookId: req.body.bookId,
				userId: req.body.userId,
			};
			const loan = await this.loanBookUseCase.execute(requestDto);
			res.status(201).json(loan);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "書籍の貸し出しに失敗しました" });
		}
	}
}
