<script setup>
defineProps({
  url: String,
  color: [String, Array],
});
</script>

<template>
  <FpLink
    :href="url"
    class="max-w-fit cursor-pointer rounded py-2 px-4 font-medium duration-300 ease-in-out hover:ease-in-out lg:py-3 lg:px-6"
    :class="
      color ||
      'bg-fp-newblue-500 text-white hover:bg-fp-newblue-700 dark:bg-fp-newblue-700 dark:hover:bg-fp-newblue-900'
    "
  >
    <slot></slot>
  </FpLink>
</template>
