<script setup>
const { locale } = useI18n();
const data = await getCMS("editions/workstation/community");

useContentHead(data);

if (data._value.sections[3].content[6].description) {
  data._value.sections[3].content[6].descriptionMd = await mdparser(
    data._value.sections[3].content[6].description
  );
}
</script>

<template>
  <main
    class="border-t-8 border-fp-green dark:border-fp-green-700 dark:bg-neutral-800 md:mt-1"
  >
    <header>
      <TheLocalBar
        :image="{
          light: 'assets/images/fedora-workstation-logo-light.png',
          dark: 'assets/images/fedora-workstation-logo.png',
        }"
        home="/workstation"
        textColor="text-fp-green-700"
        :items="[
          { name: 'Download', link: '/workstation/download' },
          { name: 'Community', link: '/workstation/community' },
        ]"
      />

      <div class="px-8">
        <div class="mx-auto my-8 max-w-7xl text-center lg:text-start">
          <div class="container mx-auto lg:mx-0">
            <h1 class="mb-4 text-fp-green-700 xl:mb-8">
              {{ data.title }}
            </h1>
            <p class="text-fp-gray">{{ data.description }}</p>
          </div>
        </div>
      </div>
      <FpDescriptionSection
        :sectionDescription="data.sections[0].sectionDescription"
        class="px-8 dark:bg-neutral-900"
      />
    </header>

    <!-- communication channels -->
    <FpCommunicationSection
      color="green-700"
      :sectionTitle="data.sections[1].sectionTitle"
      :content="data.sections[1].content"
    />

    <!-- ways to get involved -->
    <FpGetInvolvedSection
      color="green-700"
      :sectionTitle="data.sections[2].sectionTitle"
      :content="data.sections[2].content"
      class="dark:bg-neutral-900"
    />

    <!-- Fedora Events -->
    <FpEventSection color="text-fp-green-700" />

    <!-- Fedora Release Parties -->
    <section class="px-8">
      <div
        class="container col-span-full mx-auto my-8 flex max-w-7xl flex-col items-center md:items-start"
      >
        <h3 class="font-bold text-fp-darkblue-500 dark:text-fp-darkblue-300">
          {{ data.sections[3].content[5].title }}
        </h3>
        <p class="mt-6 text-fp-gray">
          {{ data.sections[3].content[5].description }}
        </p>
      </div>
    </section>

    <!-- Nest Banner -->
    <!--
    <article
      class="bg-gradient-to-r from-fp-green-300/40 to-fp-newblue-500/40 p-12 dark:bg-neutral-900 dark:bg-none"
    >
      <div class="mx-auto flex max-w-7xl justify-center">
        <div class="justify-end p-12">
          <h3
            class="mb-12 text-center font-bold text-fp-darkblue-500 dark:text-fp-darkblue-300"
          >
            {{ data.sections[3].content[6].title }}
          </h3>
          <div>
            <ContentRenderer
              class="markdown mb-12 max-w-4xl text-center text-fp-gray md:text-start"
              :value="data.sections[3].content[6].descriptionMd"
            />
          </div>
          <FpBtn
            :href="data.sections[3].content[6].link.url"
            class="mx-auto block"
            >{{ data.sections[3].content[6].link.text }}</FpBtn
          >
        </div>
        <FpImage
          :src="data.sections[3].content[6].image"
          class="order-first hidden h-fit w-48 md:block"
        />
      </div>
    </article>
    -->

    <FpPublicationSection class="dark:bg-black" />
  </main>
</template>
