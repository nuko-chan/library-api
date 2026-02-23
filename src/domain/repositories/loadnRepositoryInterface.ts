import type { Loan } from "../entities/loan.js";

export interface LoanRepositoryInterface {
	create(loan: Loan): Promise<Loan>;
	findById(id: string): Promise<Loan | null>;
	findByUserId(userId: string): Promise<Loan[]>;
}
