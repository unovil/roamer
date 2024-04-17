<script lang="ts">
    import { page } from "$app/stores";

    let statusMessage: string = "";

    switch ($page.status) {
        case 404:
            statusMessage = "Sorry, the page you requested does not exist.";
            break;
        case 400:
            statusMessage = "Sorry, you may have made a bad request. Retype the URL or go back to the homepage.";
            break;
        case 401:
            statusMessage = "Sorry, you are not authorized to view this page.";
            break;
        default:
            statusMessage = $page.error?.message || "";
            break;
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center bg-red-100">
<h1 class ="text-9xl text-red-800 font-bold mb-2">{$page.status}</h1>
<p class = "text-xl text-red-800 font-semibold mb-10">{statusMessage}</p>

<img src="/uploads/38b33416-528b-4eac-aadb-6c19cd9e143e.jpg" class="w-20 h-20 fixed bottom-0" alt=""/>
</div>