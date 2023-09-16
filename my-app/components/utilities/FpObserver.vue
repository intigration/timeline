<script setup>
const emit = defineEmits(["intersect"]);
const observed = ref(null);
onMounted(() => {
  const options = {};
  const observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit("intersect");
    }
  }, options);
  observer.observe(observed.value);
});
</script>

<template>
  <div class="fp-observer" ref="observed" />
</template>
