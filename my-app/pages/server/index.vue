<script setup>
const data = await getCMS("editions/server/home");
useContentHead(data);
</script>
<template>
  <FpHero
    :background="data.header_images[1].image"
    alignment="bg-bottom"
    class="server-hero relative z-0 dark:bg-gray-300 dark:bg-blend-multiply"
  >
    <TheLocalBar
      image="assets/images/fedora-server-logo.png"
      home="/server"
      :items="[
        { name: 'Download', link: '/server/download' },
        { name: 'Community', link: '/server/community' },
      ]"
    />
    <div class="relative mx-auto max-w-screen-2xl">
      <FpBanner
        :title="data.title"
        :subtitle="data.description"
        color="text-fp-blue"
        border="border border-fp-blue"
        background="text-white bg-fp-blue"
        :ctas="data.links"
      >
        <FpImage class="absolute -z-20" :src="data.header_images[0].images" />
      </FpBanner>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 11"
      class="absolute -bottom-5 -z-10 h-56 fill-white dark:fill-neutral-900 md:h-2/5"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <path d="m 0 6 L 11 9 L 35 0 V 11 H 0 z" />
    </svg>
  </FpHero>

  <!-- Benefits Section -->
  <section class="pt-32 dark:bg-neutral-900">
    <h2
      class="mb-12 bg-gradient-to-r from-fp-green to-fp-orange bg-clip-text text-center text-5xl font-bold text-transparent"
    >
      {{ $t(data.sections[0].sectionTitle) }}
    </h2>
    <FpBenefit
      v-for="item in data.sections[0].content"
      v-bind="item"
      columns="2"
    />
  </section>

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

    <FpCommunity :data="data.sections[1]" class="server-accent dark:!bg-none" />
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
        light: 'assets/images/server-logo-light.png',
        dark: 'assets/images/server-logo-dark.png',
      }"
    />
  </section>
</template>

<style>
.server-hero > div > div > .FPImage {
  @apply bottom-4 w-1/2 md:left-0 xl:w-fit;
}

.server-hero .fp-banner {
  @apply mx-0 ml-auto mt-2 px-2 pt-12 pb-40 text-center;
  @apply sm:pt-24 sm:pb-80;
  @apply md:w-1/2 md:pt-40 md:pb-56 ltr:md:text-left rtl:md:text-right;
  @apply lg:pb-60;
  @apply 2xl:w-2/3 2xl:pl-64 2xl:pb-80;
}

.server-hero .fp-banner h1 {
  @apply text-2xl font-medium sm:text-3xl lg:text-4xl xl:text-6xl;
}

.server-hero .fp-banner h2 {
  @apply pt-6 text-lg lg:text-2xl;
}

ul.server-accent,
.server-accent ul {
  @apply marker:text-fp-orange-500 dark:marker:text-fp-orange-700;
}
</style>
