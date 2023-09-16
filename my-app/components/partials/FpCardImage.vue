<script setup>
defineProps({
  src: String,
});
</script>
<template>
  <FpImage class="mx-auto mb-4" :src="src" />
</template>
