import { Loan } from "../../domain/entities/loan.js";

import type { LoanRepositoryInterface } from "../../domain/repositories/loadnRepositoryInterface.js";

import type { PrismaClient } from "../../generated/prisma/client.js";

export class PrismaLoanRepository implements LoanRepositoryInterface {
	constructor(private readonly prisma: PrismaClient) {}

	// 貸し出し履歴を作成する
	async create(loan: Loan): Promise<Loan> {
		const createdLoan = await this.prisma.loan.create({
			data: {
				id: loan.id,
				bookId: loan.bookId,
				userId: loan.userId,
				loanDate: loan.loanDate,
				dueDate: loan.dueDate,
				returnDate: loan.returnDate,
				createdAt: loan.createdAt,
				updatedAt: loan.updatedAt,
			},
		});

		return new Loan(
			createdLoan.id,
			createdLoan.bookId,
			createdLoan.userId,
			createdLoan.loanDate,
			createdLoan.returnDate,
			createdLoan.createdAt,
			createdLoan.updatedAt,
		);
	}

	// 貸し出し履歴をIDで取得する
	async findById(id: string): Promise<Loan | null> {
		const foundBook = await this.prisma.loan.findUnique({
			where: { id },
		});

		if (!foundBook) {
			return null;
		}

		return new Loan(
			foundBook.id,
			foundBook.bookId,
			foundBook.userId,
			foundBook.loanDate,
			foundBook.returnDate,
			foundBook.createdAt,
			foundBook.updatedAt,
		);
	}

	// 貸し出し履歴をIDで取得する
	async findByUserId(userId: string): Promise<Loan[]> {
		const foundLoans = await this.prisma.loan.findMany({
			where: { userId },
		});

		return foundLoans.map(
			(foundLoan) =>
				new Loan(
					foundLoan.id,
					foundLoan.bookId,
					foundLoan.userId,
					foundLoan.loanDate,
					foundLoan.returnDate,
					foundLoan.createdAt,
					foundLoan.updatedAt,
				),
		);
	}
}
