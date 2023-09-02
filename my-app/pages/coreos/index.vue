<script setup>
const data = await getCMS("editions/coreos/home");
useContentHead(data);
</script>

<template>
  <!-- Hero Section -->
  <FpHero
    :background="data.header_images[1].image"
    alignment="bg-right md:bg-top 2xl:bg-right"
    class="coreos-hero relative z-0"
  >
    <TheLocalBar
      image="assets/images/fedora-coreos-logo.png"
      home="/coreos"
      :items="[
        { name: 'Download', link: '/coreos/download' },
        { name: 'Community', link: '/coreos/community' },
      ]"
    />

    <FpBanner
      :title="data.title"
      :subtitle="data.description"
      color="text-fp-magenta dark:text-fp-magenta-700"
      border="border border-fp-magenta dark:border-fp-magenta-700"
      background="text-white bg-fp-magenta dark:bg-fp-magenta-700"
      :ctas="data.links"
    >
    </FpBanner>
    <svg
      viewBox="0 0 1918.6658 172.80759"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      class="absolute -bottom-2.5 -z-10"
    >
      <g transform="translate(-0.38340506,-449.49539)">
        <path
          class="fill-white dark:fill-neutral-800"
          d="m 0.38340505,456.69538 c 0,0 534.13975495,87.11876 983.48064495,87.11876 449.34085,0 935.18515,-94.31876 935.18515,-94.31876 V 622.303 H 0.38340505 Z"
        />
      </g>
    </svg>
  </FpHero>

  <!-- Why Section -->
  <div class="relative z-0 dark:bg-neutral-800">
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="absolute -top-0 -z-10 dark:hidden"
      width="317.566"
      xmlns="http://www.w3.org/2000/svg"
      height="80.662"
      id="screenshot-00734246-430e-11ed-8d85-8fd7de2f268d"
      viewBox="287 1008 317.566 80.662"
      style="-webkit-print-color-adjust: exact"
      fill="none"
      version="1.1"
    >
      <g id="shape-00734246-430e-11ed-8d85-8fd7de2f268d">
        <g class="fills" id="fills-00734246-430e-11ed-8d85-8fd7de2f268d">
          <path
            rx="0"
            ry="0"
            d="M291.534,1033.562L604.410,1060.835L291.534,1088.662L291.534,1033.562Z"
            style="opacity: 0.05; fill: rgb(219, 50, 121); fill-opacity: 1"
          />
        </g>
        <g id="strokes-00734246-430e-11ed-8d85-8fd7de2f268d" class="strokes">
          <g class="stroke-shape">
            <path
              rx="0"
              ry="0"
              d="M291.534,1033.562L604.410,1060.835L291.534,1088.662L291.534,1033.562Z"
              style="opacity: 0.05; fill: none"
            />
          </g>
        </g>
      </g>
    </svg>
    <FpHero :background="data.sections[0].images" alignment="bg-bottom">
      <section class="mx-auto max-w-screen-xl px-6 py-12">
        <h3
          class="mb-4 font-medium text-fp-magenta md:col-span-2 xl:col-span-1 xl:mb-6"
        >
          {{ data.sections[0].sectionTitle }}
        </h3>
        <FpList columns="sm:grid-cols-2 gap-12 lg:gap-4 coreos-accent">
          <FpListItem v-for="item in data.sections[0].content" v-bind="item" />
        </FpList>
      </section>
    </FpHero>
    <svg
      width="614.927"
      height="101.23"
      class="absolute -bottom-0 right-0 -z-10 dark:hidden"
      id="screenshot-00734247-430e-11ed-8d85-8fd7de2f268d"
      viewBox="961 1746 614.92701 101.23"
      style="-webkit-print-color-adjust: exact"
      fill="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs2340" />
      <g
        id="shape-00734247-430e-11ed-8d85-8fd7de2f268d"
        transform="translate(0,-1.659)"
      >
        <g class="fills" id="fills-00734247-430e-11ed-8d85-8fd7de2f268d">
          <path
            rx="0"
            ry="0"
            d="m 961,1796.942 614.927,-49.283 v 101.23 z"
            style="opacity: 1; fill: #51a2da; fill-opacity: 0.1"
            id="path2328"
          />
        </g>
        <g id="strokes-00734247-430e-11ed-8d85-8fd7de2f268d" class="strokes">
          <g class="stroke-shape" id="g2333">
            <path
              rx="0"
              ry="0"
              d="m 961,1796.942 614.927,-49.283 v 101.23 z"
              style="opacity: 1; fill: none"
              id="path2331"
            />
          </g>
        </g>
      </g>
    </svg>
    <svg
      viewBox="0 0 209.98682 22.494961"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      version="1.1"
      id="svg4475"
      class="absolute -bottom-0 -z-10 hidden h-20 dark:block"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs4472" />
      <g id="layer1" transform="matrix(1,0,0,-1,0.04450727,157.96768)">
        <path
          class="fill-white dark:fill-neutral-900"
          d="M 209.94229,136.77754 -0.04450727,157.96768 V 135.47272 H 209.94229 Z"
          id="path6102"
        />
      </g>
    </svg>
  </div>

  <!-- Platforms Section -->
  <div
    class="bg-magenta-100 relative z-0 dark:bg-neutral-900"
    style="min-height: 60vh"
  >
    <section class="mx-auto w-10/12 pt-12">
      <h3 class="mb-16 text-center font-medium text-fp-blue">
        {{ data.sections[1].sectionTitle }}
      </h3>
      <div class="flex flex-wrap items-center justify-center gap-16">
        <FpImage
          v-for="item in data.sections[1].content"
          :src="item.image || item.images"
          class="w-64"
        />
      </div>
    </section>
  </div>

  <!-- Community Section -->
  <section class="relative z-0 dark:bg-neutral-800">
    <svg
      viewBox="0 0 209.9868 38.261421"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      version="1.1"
      id="svg4475"
      class="absolute top-0 z-10 h-40"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs4472" />
      <g id="layer1" transform="translate(0.04450727,-135.47272)">
        <path
          class="fill-white dark:fill-neutral-900"
          d="M 209.94229,136.77754 -0.04450727,157.96768 V 135.47272 H 209.94229 Z"
          id="path6102"
        />
      </g>
    </svg>
    <FpCommunity :data="data.sections[2]" class="coreos-accent dark:!bg-none" />
  </section>

  <!-- Call To Action -->
  <section class="relative z-0 dark:bg-black">
    <svg
      viewBox="185 3538 1202.8086 213"
      width="100%"
      height="100%"
      class="md:h-54 absolute -top-20 -z-10 h-36 fill-[url(#light)] dark:fill-black"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-145.0957)">
        <defs>
          <linearGradient
            x1="185"
            y1="3495"
            x2="185"
            y2="3699"
            gradientUnits="userSpaceOnUse"
            id="light"
          >
            <stop style="stop-color: #e0f2ff; stop-opacity: 1" offset="0" />
            <stop style="stop-color: #ffffff; stop-opacity: 1" offset="1" />
          </linearGradient>
        </defs>
        <g class="fills">
          <path
            rx="0"
            ry="0"
            d="m 931.5,3538 c -246.60668,0 -465.44392,34.1944 -601.4043,86.8574 3e-4,75.3984 0,126.1426 0,126.1426 H 906.66992 931.5 956.33008 1532.9043 c 0,0 -3e-4,-50.7442 0,-126.1426 C 1396.9439,3572.1944 1178.1067,3538 931.5,3538 Z"
          />
        </g>
      </g>
    </svg>
    <FpCallToAction
      :cta="data.links"
      :image="{
        light: 'assets/images/coreos-logo-light.png',
        dark: 'assets/images/coreos-logo-dark.png',
      }"
    />
  </section>
</template>
<style>
.coreos-hero .fp-banner {
  @apply pt-16 pb-28 text-center md:text-left lg:pt-32 lg:pb-72 xl:px-0;
}

.coreos-hero .fp-banner h1 {
  @apply text-4xl font-medium lg:text-6xl;
}
.coreos-hero .fp-banner h2 {
  @apply pt-6 text-lg lg:text-2xl;
}
ul.coreos-accent,
.coreos-accent ul {
  @apply marker:text-fp-magenta-500 dark:marker:text-fp-magenta-700;
}
</style>
