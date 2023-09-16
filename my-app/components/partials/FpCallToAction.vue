<script setup>
defineProps({
  cta: Array,
  image: String,
});
</script>
<template>
  <div class="flex flex-col items-center pt-12 pb-24">
    <FpImage :src="image" class="max-w-sm px-4" />
    <p class="p-10 text-center text-2xl text-gray-500 dark:text-gray-300">
      {{ $t("Try it now.") }}
    </p>
    <FpBtn :href="cta[0].url">{{ $t("Get Started") }}</FpBtn>
  </div>
</template>
