<script setup>
const props = defineProps({
  image: [Object, String],
  title: String,
  description: String,
  columns: String,
});
const descriptionMd = await mdparser(props.description);
</script>

<template>
  <div
    :class="`mx-auto mt-8 grid max-w-screen-xl grid-cols-1 md:grid-cols-${columns}`"
  >
    <div class="col-span-1 flex items-center justify-center p-1 sm:p-5">
      <FpImage :src="image" />
    </div>
    <div
      :class="`col-span-${
        columns - 1
      } flex flex-col justify-center p-1 text-left text-center sm:p-5 sm:text-start`"
    >
      <h2 class="mb-5 font-bold text-gray-700 dark:text-gray-100">
        {{ $t(title) }}
      </h2>
      <ContentRendererMarkdown
        class="markdown font-normal text-gray-600 dark:text-gray-300"
        :value="descriptionMd"
      />
    </div>
  </div>
</template>
