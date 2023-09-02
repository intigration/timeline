<script setup>
defineProps({
  color: {
    default: "text-fp-darkblue-500",
    type: String,
  },
  class: String,
});
// Data Import
const { data } = await useAsyncData(() => {
  return queryContent("/partials/publications").findOne();
});
</script>
<template>
  <section class="bg-fp-gray-lightest px-8" :class="class">
    <div class="container mx-auto flex max-w-7xl flex-col justify-center pb-8">
      <div
        class="grid max-w-7xl grid-cols-1 gap-4 py-12 lg:grid-cols-2 lg:gap-10"
      >
        <!-- Loop through publications -->
        <FpCard
          v-for="card in data?.body[0].content.slice(0, 2)"
          :description="card.description"
          :variants="['btn']"
          :link="card.link"
          class=""
        >
          <template #prepend>
            <FpCardImage
              class="max-h-[100px]"
              slot="prepend"
              :src="card.image"
            />
          </template>
        </FpCard>
      </div>
      <FpJoinTip
        :description="data?.body[0].content[2].description"
        :link="data?.body[0].content[2].link"
      />
    </div>
  </section>
</template>
