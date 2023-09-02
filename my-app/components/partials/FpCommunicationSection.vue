<script setup>
defineProps({
  color: {
    default: "green",
    type: String,
  },
  sectionTitle: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <section class="px-8" :class="`bg-fp-${color}-light/10`">
    <div class="container mx-auto flex max-w-7xl flex-col justify-center pb-8">
      <header class="py-8 text-center xl:text-start">
        <h2 class="xl:text-4xl" :class="`text-fp-${color}`">
          {{ $t(sectionTitle) }}
        </h2>
      </header>
      <div
        class="flex flex-wrap justify-center gap-10 pb-4 2xl:justify-between"
      >
        <FpCard
          v-for="card in content"
          :key="card.id"
          :title="card.title"
          :description="card.description"
          :image="card.image"
          :link="card.link"
          :variants="['center', 'btn']"
          class="h-80 grow basis-64 lg:h-96"
        />
      </div>
      <FpJoinTip
        description="Your friendly and helpful contributions to these communication channels would be greatly appreciated"
      />
    </div>
  </section>
</template>
