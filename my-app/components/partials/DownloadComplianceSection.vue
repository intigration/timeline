<script setup>
defineProps({});

// Data Import
let { data } = await useAsyncData(() => {
  return queryContent("/partials/compliance").findOne();
});
if (data._value.description) {
  data._value.descriptionMd = await mdparser(data._value.description);
}
</script>
<template>
  <div class="container mx-auto max-w-7xl">
    <div class="p-2">
      <ContentRenderer
        class="markdown text-center dark:text-white"
        tag="div"
        v-if="data.descriptionMd"
        :value="data.descriptionMd"
      />
    </div>
  </div>
</template>
