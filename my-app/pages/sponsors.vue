<script setup>
const data = await getCMS("sponsors");
// import data from cms see line 2 of flocktofedora.vue
const engage = data._value.sections[2];
if (engage.sectionDescription) {
  engage.sectionDescriptionMd = await mdparser(engage.sectionDescription);
}
</script>
<template>
  <main class="dark:bg-neutral-800 md:mt-2">
    <header class="">
      <div class="mx-auto w-4/5 max-w-7xl py-12">
        <!-- h1 Hero Content -->
        <h1>{{ $t(data.title) }}</h1>
        <p>{{ $t(data.description) }}</p>
      </div>
    </header>

    <!-- Red Hat Section -->
    <section class="bg-fp-newblue py-12 dark:bg-fp-newblue-900">
      <div class="container mx-auto max-w-7xl px-4">
        <div
          class="mx-auto flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap lg:gap-16"
        >
          <FpImage :src="data.sections[0].images" class="object-contain" />
          <p class="">
            {{ $t(data.sections[0].sectionDescription) }}
          </p>
        </div>
      </div>
    </section>

    <!-- General sponsors -->
    <section class="py-8 px-2 dark:bg-black">
      <div class="container mx-auto max-w-7xl px-2">
        <header>
          <h3
            class="mb-16 text-center font-medium text-fp-blue dark:text-fp-newblue"
          >
            {{ $t(data.sections[1].sectionDescription) }}
          </h3>
        </header>
        <div class="flex flex-wrap items-center justify-center gap-16">
          <a
            :href="item.link.url"
            target="_blank"
            :title="item.link.text"
            v-for="item in data.sections[1].content"
          >
            <FpImage :src="item.image || item.images" class="w-64" />
          </a>
        </div>
      </div>
    </section>
    <section>
      <header>
        <!-- h2 Flock Sponsor Gallery Header -->
      </header>
      <div>
        <!-- Gallery Content See line 364 of flocktofedora.vue -->
      </div>
    </section>
    <section class="bg-fp-newblue-100/30 py-8 px-2 dark:bg-neutral-800">
      <div class="container mx-auto max-w-7xl px-2">
        <header>
          <!-- h2 Sponsor Engagement Header -->
          <h3
            class="mb-16 text-center font-medium text-fp-blue dark:text-fp-newblue"
          >
            {{ $t(engage.sectionTitle) }}
          </h3>
        </header>
        <div class="">
          <!-- Sponsor Engagement content -->
          <ContentRenderer
            class="markdown mt-2 text-center dark:text-white"
            v-if="engage.sectionDescriptionMd"
            :value="engage.sectionDescriptionMd"
          />
        </div>
      </div>
    </section>
  </main>
</template>
