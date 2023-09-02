<script setup>
defineProps({
  url: String,
  text: String,
});
</script>
<template>
  <NuxtLink :to="url" class="block">{{ text }}</NuxtLink>
</template>
