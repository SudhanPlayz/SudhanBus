import { redirect } from "next/navigation";
import { Suspense } from "react";

import { SearchResults } from "@/components/search/search-results";

export const runtime = "edge";

interface SearchPageProps {
	searchParams: Promise<{
		from?: string;
		to?: string;
		date?: string;
	}>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { from, to, date } = await searchParams;

	if (!(from && to && date)) {
		redirect("/");
	}

	return (
		<Suspense
			fallback={
				<div className="flex min-h-[50svh] items-center justify-center text-muted-foreground">
					Loading search results...
				</div>
			}
		>
			<SearchResults date={date} from={from} to={to} />
		</Suspense>
	);
}
