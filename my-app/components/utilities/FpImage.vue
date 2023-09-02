<script setup>
const props = defineProps({
  src: String | { light: String, dark: String },
});
</script>

<template>
  <img
    v-if="typeof src === 'string'"
    class="FPImage"
    :src="`${
      $config.app.baseURL.replace(new RegExp('/$'), '') +
      '/' +
      src.replace('public/', '')
    }`"
  />
  <template v-else>
    <FpImage class="dark" :src="src.dark" v-bind="$attrs" />
    <FpImage class="light" :src="src.light" v-bind="$attrs" />
  </template>
</template>

<style>
html:not(.dark) .FPImage.dark {
  @apply hidden;
}

.dark .FPImage.light {
  @apply hidden;
}
</style>
