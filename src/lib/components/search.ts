import { goto } from "$app/navigation";
import type { Page } from "@sveltejs/kit";

export const searchQuery = (searchTerm: string | null, page: Page<Record<string, string>, string | null>) => {
    if (searchTerm === null) return "";
    if (searchTerm.trim() === "") return "";

    let query = new URLSearchParams(page.url.searchParams.toString());
    query.set("term", searchTerm);

    return query.toString() || "";
  };