<script setup>
const props = defineProps({
  data: Object,
});

const descriptionMd = await mdparser(props.data.sectionDescription);
</script>

<template>
  <FpHero :background="data.images" alignment="bg-top" class="relative z-0">
    <section class="mx-auto w-10/12 max-w-screen-xl py-24">
      <h2
        class="mb-5 text-center text-5xl font-semibold text-fp-blue dark:text-slate-100"
      >
        {{ $t(data.sectionTitle) }}
      </h2>
      <ContentRendererMarkdown
        tag="h4"
        class="text-normal sm:text-normal markdown mb-5 text-fp-darkblue-500 dark:text-slate-300 sm:mx-14"
        :value="descriptionMd"
      />
      <FpList columns="sm:grid-cols-2 gap-2 lg:gap-4">
        <FpListItem v-for="item in data.content" v-bind="item" />
      </FpList>
    </section>
  </FpHero>
</template>
