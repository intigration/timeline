<script setup>
defineProps({
  background: String,
  alignment: String,
});
</script>

<template>
  <div
    :style="{
      backgroundImage: `url(${
        $config.app.baseURL.replace(new RegExp('/$'), '') +
        '/' +
        background.replace('public/', '')
      })`,
    }"
    style="min-height: 60vh"
    :class="`${alignment} pb-30 w-screen max-w-full bg-cover pt-6`"
  >
    <slot />
  </div>
</template>
