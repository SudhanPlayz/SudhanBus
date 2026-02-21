import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Route {
	from: string; // Original case from value
	id: string; // Deterministic ID for deduplication (e.g., "chennai-bangalore")
	timestamp: number;
	to: string; // Original case to value
}

interface UserState {
	/**
	 * Adds a recent route to the beginning of the list.
	 * Removes older duplicates and caps the total length to 5.
	 *
	 * @param from The original source city label/value
	 * @param to The original destination city label/value
	 */
	addRecentRoute: (from: string, to: string) => void;
	/**
	 * Array of recent routes searched by the user.
	 * Directionality matters: "A -> B" is distinct from "B -> A".
	 * Capped at 5 entries.
	 */
	recentRoutes: Route[];
}

// Optional, but exporting the selector keeps components from grabbing the whole store state directly
export const getRecentRoutes = (state: UserState) => state.recentRoutes;

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			recentRoutes: [],

			addRecentRoute: (from: string, to: string) =>
				set((state) => {
					if (!from || !to) return state;

					// Normalize keys for deterministic deduplication
					const normalizedFrom = from.trim().toLowerCase();
					const normalizedTo = to.trim().toLowerCase();

					// ID depends on directionality
					const id = `${normalizedFrom}-${normalizedTo}`;

					const newRoute: Route = {
						id,
						from,
						to,
						timestamp: Date.now(),
					};

					// Remove existing route with same ID if present
					const filteredRoutes = state.recentRoutes.filter(
						(route) => route.id !== id
					);

					// Prepend the new search, then cap the array at 5
					const updatedRoutes = [newRoute, ...filteredRoutes].slice(0, 5);

					return { recentRoutes: updatedRoutes };
				}),
		}),
		{
			name: "user-storage",
			version: 1, // Let's you migrate store shape later
		}
	)
);
