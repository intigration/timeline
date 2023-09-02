<script setup>
const data = await getCMS("editions/workstation/home");
useContentHead(data);
</script>
<template>
  <FpHero
    :background="data.header_images[1].image"
    alignment="bg-left"
    class="workstation-hero relative z-0 pb-8 dark:bg-fp-blue-300 dark:bg-blend-multiply"
  >
    <TheLocalBar
      :image="{
        light: 'assets/images/fedora-workstation-logo-light.png',
        dark: 'assets/images/fedora-workstation-logo.png',
      }"
      home="/workstation"
      :items="[
        { name: 'Download', link: '/workstation/download' },
        { name: 'Community', link: '/workstation/community' },
      ]"
    />
    <FpBanner
      :title="data.title"
      :subtitle="data.description"
      :ctas="data.links"
      color="text-fp-green"
      border="border border-fp-green dark:border-fp-green-700"
      background="text-white bg-fp-green dark:bg-fp-green-700"
    >
      <div class="hero-laptop-container">
        <div class="px-auto mb-20 max-w-sm sm:max-w-xl">
          <FpImage
            class="w-full"
            src="assets/images/workstation_framework.png"
          />
        </div>
      </div>
    </FpBanner>
    <svg
      viewBox="0 0 35 4"
      width="100%"
      height="100%"
      class="absolute -bottom-5 -z-10 h-1/3 fill-white dark:fill-neutral-900 sm:h-1/2"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="m 0 2 L 35 0 V 4 H 0 z" />
    </svg>
  </FpHero>

  <main>
    <!-- Why Fedora Workstation -->
    <div class="relative z-0 dark:bg-neutral-800">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="absolute -top-12 -z-10 fill-fp-green dark:hidden"
        width="317.566"
        xmlns="http://www.w3.org/2000/svg"
        height="80.662"
        id="screenshot-00734246-430e-11ed-8d85-8fd7de2f268d"
        viewBox="287 1008 317.566 80.662"
        style="-webkit-print-color-adjust: exact"
        version="1.1"
      >
        <g id="shape-00734246-430e-11ed-8d85-8fd7de2f268d">
          <g class="fills" id="fills-00734246-430e-11ed-8d85-8fd7de2f268d">
            <path
              rx="0"
              ry="0"
              d="M291.534,1033.562L604.410,1060.835L291.534,1088.662L291.534,1033.562Z"
              style="opacity: 0.15; fill-opacity: 1"
            />
          </g>
        </g>
      </svg>

      <section class="mx-auto max-w-screen-xl px-6 py-12">
        <header
          class="mx-auto grid max-w-screen-xl gap-4 p-2 text-center md:grid-cols-2 md:p-0 md:text-left"
        >
          <h3
            class="mb-4 font-medium text-fp-green md:col-span-2 xl:col-span-1 xl:mb-6"
          >
            {{ $t(data.sections[0].sectionTitle) }}
          </h3>
        </header>
        <FpList columns="sm:grid-cols-2 gap-12 lg:gap-4 workstation-accent">
          <FpListItem v-for="item in data.sections[0].content" v-bind="item" />
        </FpList>
      </section>
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
    </div>

    <!-- Benefits Section -->
    <section class="pt-24 pb-12 dark:bg-neutral-900">
      <h2
        class="mb-12 bg-gradient-to-r from-fp-green to-fp-newblue-500 bg-clip-text text-center text-5xl font-bold text-transparent"
      >
        {{ $t(data.sections[1].sectionTitle) }}
      </h2>
      <FpBenefit
        v-for="item in data.sections[1].content"
        v-bind="item"
        columns="2"
      />
    </section>

    <!-- Developers Section -->
    <section class="pt-24 dark:bg-neutral-800">
      <h2
        class="mb-12 bg-gradient-to-r from-fp-green to-fp-newblue-500 bg-clip-text text-center text-5xl font-bold text-transparent"
      >
        {{ $t(data.sections[2].sectionTitle) }}
      </h2>
      <div class="mx-auto max-w-7xl pb-12">
        <FpBenefit
          v-for="item in data.sections[2].content"
          v-bind="item"
          columns="4"
        />
      </div>
    </section>

    <!-- Get Started Developing Section -->
    <section class="relative z-0 pt-10 dark:bg-neutral-900">
      <div
        class="mx-auto max-w-7xl rounded-xl bg-gradient-to-r from-green-200 to-blue-100 p-2 py-8 dark:bg-none sm:p-10"
      >
        <h3
          class="mb-8 text-center font-bold text-fp-newblue-500 dark:text-gray-100"
        >
          {{ $t(data.sections[3].sectionTitle) }}
        </h3>
        <FpList columns="sm:grid-cols-3 gap-4 lg:gap-4" :disableDots="true">
          <FpListItem
            v-for="item in data.sections[3].content"
            v-bind="item"
            :images="true"
            buttons="true"
          />
        </FpList>
      </div>
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
      <FpCommunity
        :data="data.sections[4]"
        class="workstation-accent dark:!bg-none"
      />
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
          light: 'assets/images/workstation-logo-light.png',
          dark: 'assets/images/workstation-logo-dark.png',
        }"
      />
    </section>
  </main>
</template>
<style>
.workstation-hero .fp-banner h1 {
  @apply text-4xl font-medium lg:text-7xl lg:font-semibold;
}
.workstation-hero .fp-banner h2 {
  @apply pt-6 text-lg lg:text-3xl;
}
ul.workstation-accent,
.workstation-accent ul {
  @apply marker:text-fp-green-500 dark:marker:text-fp-green-700;
}
</style>
