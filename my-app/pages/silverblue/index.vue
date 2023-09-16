<script setup>
const data = await getCMS("immutable/silverblue/home");
useContentHead(data);
data._value.descriptionMd = await mdparser(data._value.description);
</script>
<template>
  <main class="border-t-8 border-fp-newblue dark:bg-neutral-800 md:mt-1">
    <TheLocalBar
      :image="{
        light: 'assets/images/fedora-silverblue-logo-light.png',
        dark: 'assets/images/fedora-silverblue-logo-dark.png',
      }"
      home="/silverblue"
      textColor="text-fp-newblue"
      :items="[{ name: 'Download', link: '/silverblue/download' }]"
    />

    <!-- TITLE -->
    <section
      class="bg-gradient-to-b from-white to-fp-newblue-100 px-2 pt-24 pb-12 text-center dark:bg-none lg:text-start"
    >
      <div class="container mx-auto max-w-7xl px-2">
        <h1 class="mb-8 text-4xl text-gray-600 dark:text-gray-200">
          {{ $t(data.title) }}
        </h1>
        <ContentRendererMarkdown
          class="space-y-6 text-start text-gray-600 dark:text-fp-gray-light lg:w-4/5"
          :value="data.descriptionMd"
        />
        <div
          class="mt-5 flex justify-center ltr:-ml-5 rtl:-mr-5 lg:justify-end"
          id="ctas"
        >
          <FpBtn
            :href="data.links[1].url"
            class="mr-1 border !border-fp-blue !bg-gray-100 text-fp-blue dark:!bg-gray-800 dark:!text-white"
          >
            {{ $t(data.links[1].text) }}
          </FpBtn>
          <FpBtn :href="data.links[0].url">
            {{ $t(data.links[0].text) }}
            <Icon name="fa-download" />
          </FpBtn>
        </div>
      </div>
    </section>

    <!-- Screenshot Section -->
    <!-- <FpSpinPreviewSection :background="data.screenshot_image.image" /> -->

    <!-- Benefits Section -->
    <section class="pt-24 pb-12 dark:bg-neutral-900">
      <h2
        class="mb-12 bg-gradient-to-r from-fp-green to-fp-newblue-500 bg-clip-text text-center text-5xl font-bold text-transparent"
      >
        {{ $t(data.sections[0].sectionTitle) }}
      </h2>
      <FpBenefit
        v-for="item in data.sections[0].content"
        v-bind="item"
        columns="3"
      />
    </section>

    <!-- Features Section -->
    <section
      class="relative z-0 space-y-24 bg-gradient-to-b from-fp-newblue-100 to-fp-purple-100 pt-16 pb-32 dark:bg-neutral-800 dark:bg-none"
    >
      <div
        class="mx-auto max-w-7xl rounded-lg bg-white px-12 pt-6 pb-10 dark:bg-neutral-900"
        v-for="section in [data.sections[1]]"
      >
        <h2
          class="mb-4 text-center text-4xl font-semibold text-fp-blue-500 dark:text-gray-200"
        >
          {{ $t(section.sectionTitle) }}
        </h2>
        <div
          class="flex flex-wrap justify-between gap-4 text-center text-fp-darkblue-500 xl:gap-10"
        >
          <FpCard
            v-for="card in section.content"
            :title="card.title"
            :description="card.description"
            class="mx-auto grow basis-64"
          >
            <template #prepend>
              <FpCardImage slot="prepend" :src="card.image" />
            </template>
          </FpCard>
        </div>
      </div>
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
          light: 'assets/images/immutable/fedora-silverblue-logo.png',
          dark: 'assets/images/immutable/fedora-silverblue-logo.png',
        }"
      />
    </section>
  </main>
</template>

<style></style>
