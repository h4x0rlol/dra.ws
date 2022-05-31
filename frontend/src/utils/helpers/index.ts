export const preventNegativeValue = (n: number): number | null =>
	!!n && Math.abs(n) >= 0 ? Math.abs(n) : null;
