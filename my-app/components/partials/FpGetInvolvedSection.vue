<script setup>
const props = defineProps({
  color: {
    default: "green",
    type: String,
  },
  sectionTitle: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: Object,
  },
});

for (let item of props.content) {
  item.descriptionMd = await mdparser(item.description);
}
</script>

<template>
  <section class="bg-fp-newblue-500/10 px-8">
    <div class="container mx-auto flex max-w-7xl flex-col justify-center pb-8">
      <header class="py-8 text-center xl:text-start">
        <h2 :class="`text-fp-${color}`" class="xl:text-4xl">
          {{ $t(sectionTitle) }}
        </h2>
      </header>
      <div class="grid gap-8 pb-4 lg:grid-cols-2 lg:justify-start">
        <div
          v-for="item in content.slice(0, 2)"
          :key="item.id"
          class="mx-auto max-w-lg text-center lg:text-start"
        >
          <h3 class="font-medium text-fp-blue dark:text-gray-200">
            {{ $t(item.title) }}
          </h3>
          <ContentRenderer
            class="markdown max-w-sm text-fp-gray-darkest dark:text-fp-gray"
            :value="item.descriptionMd"
          />
        </div>
      </div>
      <FpJoinTip
        description="Attending a meeting or reporting and discussing issues you've found can be a great first step at contribution"
      />
    </div>
  </section>
</template>
