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
      <p class="text-4xl font-bold">Lionhearted. Efficient. Original.</p>
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
      <p class="text-4xl font-bold">About the founding company.</p>
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
  class="grid grid-cols-3 grid-rows-2 bg-primary-50 pb-32 pt-32"
  style="grid-template-columns: 10% 80% 10%; grid-template-rows: auto"
>
  <div class="col-start-2 col-end-3 row-start-1 row-end-2">
    <h1 class="pb-12 text-center text-3xl font-bold">
      Some logo versions over the past few months:
    </h1>
  </div>
  <div class="col-start-2 col-end-3 row-start-2 row-end-3">
    <div class="flex items-center justify-center space-x-16">
      {#each Array(5)
        .fill(null)
        .map((_, i) => i + 1) as number (number)}
        <img
          loading="lazy"
          src="/about-photos/logos/logo_v{number}.png"
          alt=""
          class="h-32"
        />
      {/each}
    </div>
  </div>
</div>
