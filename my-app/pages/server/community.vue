<script setup>
const { locale } = useI18n();
const data = await getCMS("editions/server/community");

useContentHead(data);
</script>

<template>
  <main class="border-t-8 border-fp-orange dark:bg-neutral-800 md:mt-1">
    <header>
      <TheLocalBar
        :image="{
          light: 'assets/images/fedora-server-logo-light.png',
          dark: 'assets/images/fedora-server-logo.png',
        }"
        home="/server"
        textColor="text-fp-orange"
        :items="[
          { name: 'Download', link: '/server/download' },
          { name: 'Community', link: '/server/community' },
        ]"
      />

      <div class="px-8">
        <div class="mx-auto my-8 max-w-7xl text-center lg:text-start">
          <div class="container mx-auto lg:mx-0">
            <h1 class="mb-4 text-fp-orange xl:mb-8">
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
      color="orange"
      :sectionTitle="data.sections[1].sectionTitle"
      :content="data.sections[1].content"
    />

    <!-- ways to get involved -->
    <FpGetInvolvedSection
      color="orange"
      :sectionTitle="data.sections[2].sectionTitle"
      :content="data.sections[2].content"
      class="dark:bg-neutral-900"
    />

    <!-- Fedora Events -->
    <FpEventSection color="text-fp-orange" />

    <!-- Publication Section -->
    <FpPublicationSection class="dark:bg-black" />
  </main>
</template>
