export interface PaginationMeta {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}

export const ok = <T>(data: T, meta?: PaginationMeta) =>
	({ ok: true as const, data, meta }) as const;

export const err = (code: string, message: string) =>
	({ ok: false as const, error: { code, message } }) as const;

export const PAISE_PER_RUPEE = 100;

export const formatPaiseForGateway = (paise: number): string =>
	(paise / PAISE_PER_RUPEE).toFixed(2);
