import type { Page } from "@sveltejs/kit";

export const searchQuery = (searchTerm: string | undefined | null, category: string, page: Page<Record<string, string>, string | null>) => {
    if (searchTerm === null || typeof searchTerm === "undefined") return "";
    if (searchTerm.trim() === "") return "";

    let query = new URLSearchParams(page.url.searchParams.toString());
    query.set("term", searchTerm);
    query.set("cat", category);

    return query.toString() || "";
  };