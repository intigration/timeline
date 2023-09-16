<script setup>
defineProps({
  home: String,
  image: String | { light: String, dark: String },
  items: Array,
  textColor: String,
});
</script>
<template>
  <div class="px-8">
    <div
      class="mx-auto mt-12 flex max-w-7xl flex-col justify-between sm:flex-row"
    >
      <FpLink :href="home">
        <FpImage class="mx-auto mb-5 max-h-8 w-auto sm:m-0" :src="image" />
      </FpLink>
      <div
        :class="`flex justify-center gap-10 md:justify-end ${
          textColor || 'text-white'
        }`"
      >
        <FpLink v-for="item in items" :href="item.link">
          {{ $t(item.name) }}
        </FpLink>
      </div>
    </div>
  </div>
</template>
