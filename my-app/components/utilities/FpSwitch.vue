<template>
  <label class="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      @click="$emit('switchToggled', $event)"
    />
    <div class="fp-switch peer"></div>
  </label>
</template>

<style>
.fp-switch {
  @apply h-6 w-11 rounded-full bg-fp-gray-200 dark:bg-gray-700;
  @apply after:absolute after:top-[4px] after:left-[6px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''];
  @apply peer-checked:bg-fp-newblue peer-checked:after:translate-x-full dark:peer-checked:bg-fp-blue;
  @apply peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300;
  @apply dark:peer-focus:ring-blue-800;
}
</style>
