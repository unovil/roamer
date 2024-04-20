import type { Page } from "@sveltejs/kit";

export const searchQuery = (searchTerm: string | undefined | null, category: string, page: Page<Record<string, string>, string | null>) => {
    if (searchTerm === null || typeof searchTerm === "undefined") return {query: "", term: ""};
    if (searchTerm.trim() === "") return {query: "", term: ""};

    let query = new URLSearchParams(page.url.searchParams.toString());
    query.set("term", searchTerm.trim());
    query.set("cat", category);

    return {query: query.toString() || "", term: searchTerm.trim()};
  };