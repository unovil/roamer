<script lang="ts">
  import { Card, Button, Footer } from "flowbite-svelte";

  const teamCards = [
    {
      name: "Juan Miguel Villegas",
      role: "CEO / Programming Head",
      description:
        "He programs Roamer's front-end and back-end systems to troubleshoot bugs and address technical challenges.",
      img: "/about-photos/team-photos/miguel.jpg",
      img_silly: "/about-photos/team-photos/miguel_silly.jpg",
      currentImg: "",
    },
    {
      name: "Sheiry Hayah Reyes",
      role: "Design Head",
      description:
        "She designs logos, logo animations, and interface layouts that balance aesthetics and functionality.",
      img: "/about-photos/team-photos/hayah.jpg",
      img_silly: "/about-photos/team-photos/hayah_silly.jpg",
      currentImg: "",
    },
    {
      name: "Hazel Mae Tupas",
      role: "Content Manager",
      description:
        "She ensures that Leo and Roamer meet the needs of schools, admins, and students for a seamless and efficient educational environment.",
      img: "/about-photos/team-photos/hazel.jpg",
      img_silly: "/about-photos/team-photos/hazel_silly.jpg",
      currentImg: "",
    },
    {
      name: "Jairah Mae Castrence",
      role: "Assistant Programmer",
      description:
        "She is in charge of implementing design for Roamer's front end (a.k.a. the part of the website that the users can interact with).",
      img: "/about-photos/team-photos/jairah.jpg",
      img_silly: "/about-photos/team-photos/jairah_silly.jpg",
      currentImg: "",
    },
    {
      name: "Juliana Venice Robles",
      role: "Assistant Designer",
      description:
        "She designed the system's logo with animation and simplified Roamer's login and registration processes, and enhanced the interactive features.",
      img: "/about-photos/team-photos/jv.jpg",
      img_silly: "/about-photos/team-photos/jv_silly.jpg",
      currentImg: "",
    },
    {
      name: "Cassandra Leanne Polistico",
      role: "Assistant Content Manager",
      description:
        "She analyzes current content to find any gaps and ensures that all new content caters to the target audience's preferences, personalities, and challenges.",
      img: "/about-photos/team-photos/cass.jpg",
      img_silly: "/about-photos/team-photos/cass_silly.jpg",
      currentImg: "",
    },
  ];
</script>

<svelte:head>
  <title>Roamer | About</title>
</svelte:head>

<div
  class="grid grid-cols-5 bg-primary-900 pb-32 pt-32"
  style="grid-template-columns: 10% 38% 4% 38% 10%;"
>
  <div></div>
  <div class="flex items-center justify-center text-white">
    <div>
      <p class="font-trocchi text-4xl font-bold">
        Lionhearted. Efficient. Original.
      </p>
      <br />
      <p class="text-l">
        Roamer's goal is to make it easier for students and educational
        institutions to work together. We created a new platform to facilitate
        communication and collaboration between students and educational
        institutions, leading to mutually beneficial agreements and positive
        outcomes for all parties involved. We believe that with the right
        attitude and a caring approach, we can improve the educational
        experience for everyone.
      </p>
    </div>
  </div>
  <div></div>
  <div class="flex items-center justify-center">
    <img src="/logo.png" alt="" class="h-80 w-80" />
  </div>
</div>

<div
  class="grid grid-cols-5 bg-contessa-300 pb-32 pt-32"
  style="grid-template-columns: 10% 38% 4% 38% 10%;"
>
  <div></div>
  <div class="relative flex items-center justify-center">
    <img src="/about-photos/team.jpg" alt="" class="h-80" />
    <img
      src="/about-photos/logos/logo_v5.png"
      alt=""
      class="absolute bottom-[-30px] right-0 h-40 w-40"
    />
  </div>
  <div></div>
  <div class="flex items-center justify-center text-black">
    <div>
      <p class="font-trocchi text-4xl font-bold">About the founding company.</p>
      <br />
      <p class="text-l">
        Leo is a company founded by a team of 10th-grade students from Pasig
        City Science High School who created a website system as part of their
        ICT subject. Their goal is to improve the educational experience for
        both students and school facilitators. Leo's founders are passionate
        about creating a system that alters the way education works, and they
        aim to improve negotiations between students and school facilitators.
        Their unique initiative stands out for their visionary methodology and
        commitment to achieving their goal.
      </p>
    </div>
  </div>
</div>

<div
  class="grid grid-cols-3 grid-rows-2 bg-gray-400 pb-32 pt-32"
  style="grid-template-columns: 10% 80% 10%; grid-template-rows: auto"
>
  <div class="col-start-2 col-end-3 row-start-1 row-end-2">
    <h1 class="pb-12 text-center font-trocchi text-3xl font-bold">
      Some logo versions over the past few months:
    </h1>
  </div>
  <div class="col-start-2 col-end-3 row-start-2 row-end-3">
    <div class="flex flex-wrap justify-between">
      {#each Array(5)
        .fill(null)
        .map((_, i) => i + 1) as number (number)}
        <img
          loading="lazy"
          src="/about-photos/logos/logo_v{number}.png"
          alt=""
          class="mb-4 h-32 sm:w-auto"
        />
      {/each}
    </div>
  </div>
</div>

<div
  class="grid grid-cols-3 grid-rows-2 bg-primary-50 pb-32 pt-32"
  style="grid-template-columns: 5% 90% 5%; grid-template-rows: auto"
>
  <div class="col-start-2 col-end-3 row-start-1 row-end-2">
    <h1 class="pb-24 text-center text-3xl font-bold">
      Meet the Team behind <img
        class="inline h-10"
        src="/about-photos/logos/logo_v5.png"
        alt=""
      /> <span class="font-trocchi">Leo</span> and
      <img class="inline h-10" src="/logo.png" alt="" />
      <span class="font-trocchi">Roamer</span>.
    </h1>
  </div>

  <div
    class="col-start-2 col-end-3 row-start-2 row-end-2 flex flex-wrap justify-between"
  >
    {#each teamCards as teamCard}
      <Card
        class="mb-8 sm:w-auto"
        img={teamCard.currentImg === "" ? teamCard.img : teamCard.currentImg}
        on:mouseenter={() => (teamCard.currentImg = teamCard.img_silly)}
        on:mouseleave={() => (teamCard.currentImg = teamCard.img)}
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {teamCard.name}
        </h5>
        <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-400">
          {teamCard.role}
        </p>
        <p
          class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400"
        >
          {teamCard.description}
        </p>
      </Card>
    {/each}
  </div>
</div>

<Footer>
  <p class="flex justify-center bg-green-950 text-sm font-medium text-white">
    Ⓒ 2024 Roamer. All Rights Reserved.
  </p>
</Footer>
