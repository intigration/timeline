<script setup>
defineProps({
  columns: String,
  disableDots: Boolean,
});
</script>

<template>
  <ul
    class="fp-list mx-auto grid max-w-screen-xl place-items-center p-2 md:p-0"
    :class="`${columns} ${
      disableDots
        ? 'list-none'
        : 'list-outside marker:text-4xl marker:text-fp-newblue-500'
    }`"
  >
    <slot></slot>
  </ul>
</template>
