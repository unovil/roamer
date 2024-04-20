<script lang="ts">
  import { page } from "$app/stores";

  let statusMessage: string = "";

  switch ($page.status) {
    case 404:
      statusMessage = "Sorry, the page you requested does not exist.";
      break;
    case 400:
      statusMessage =
        "Sorry, you may have made a bad request. Retype the URL or go back to the homepage.";
      break;
    case 401:
      statusMessage = "Sorry, you are not authorized to view this page.";
      break;
    default:
      statusMessage = $page.error?.message || "";
      break;
  }
</script>

<div class="grid grid-cols-3 grid-rows-4 h-screen text-center bg-red-100 overflow-hidden" style="grid-template-columns: 25% 50% 25%;">
  <div
    class="col-start-2 col-end-3 row-start-2 row-end-3 flex flex-col items-center justify-center"
  >
    <h1 class="text-9xl text-red-800 font-bold mb-2">{$page.status}</h1>
    <p class="text-xl text-red-800 font-semibold mb-10">{statusMessage}</p>
  </div>

  <img
    src="/error_leo.png"
    class="col-start-2 col-end-3 row-start-3 row-end-5 self-end object-contain m-auto"
    alt=""
  />
</div>
