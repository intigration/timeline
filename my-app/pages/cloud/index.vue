<script setup>
const data = await getCMS("editions/cloud/home");
useContentHead(data);
</script>

<template>
  <!-- Hero Section -->
  <FpHero :background="data.header_images[1].image" alignment="bg-bottom">
    <TheLocalBar
      image="assets/images/fedora-cloud-logo.png"
      home="/cloud"
      :items="[
        { name: 'Download', link: '/cloud/download' },
        { name: 'Community', link: '/cloud/community' },
      ]"
    />

    <FpBanner
      :title="data.title"
      :subtitle="data.description"
      color="text-fp-blue"
      border="border border-fp-blue"
      background="text-white bg-fp-blue"
      :ctas="data.links"
    >
      <FpImage :src="data.header_images[0].image" />
    </FpBanner>
  </FpHero>

  <!-- Why Section -->
  <FpHero :background="data.sections[0].images" alignment="bg-bottom">
    <section class="mx-auto max-w-screen-xl p-2 pt-12 md:p-0">
      <h3
        class="mb-4 font-medium text-fp-blue md:col-span-2 xl:col-span-1 xl:mb-6"
      >
        {{ $t(data.sections[0].sectionTitle) }}
      </h3>
      <FpList columns="sm:grid-cols-2 gap-12 lg:gap-4">
        <FpListItem v-for="item in data.sections[0].content" v-bind="item" />
      </FpList>
    </section>
  </FpHero>

  <!-- Platforms Section -->
  <div class="bg-fp-blue-200 relative z-0 dark:bg-neutral-900">
    <section class="mx-auto w-10/12 py-12">
      <h3 class="mb-16 text-center font-medium text-fp-blue">
        {{ $t(data.sections[1].sectionTitle) }}
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
    <FpCommunity :data="data.sections[2]" class="dark:!bg-none" />
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
        light: 'assets/images/cloud-logo-light.png',
        dark: 'assets/images/cloud-logo-dark.png',
      }"
    />
  </section>
</template>
