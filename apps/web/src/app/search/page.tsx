import { redirect } from "next/navigation";

import { SearchResults } from "@/components/search/search-results";

interface SearchPageProps {
	searchParams: Promise<{
		from?: string;
		to?: string;
		date?: string;
	}>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { from, to, date } = await searchParams;

	if (!from || !to || !date) {
		redirect("/");
	}

	return <SearchResults date={date} from={from} to={to} />;
}
