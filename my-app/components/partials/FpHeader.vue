<script setup>
defineProps({
  title: {
    type: String,
    default: "Fedora Linux Edition Page",
  },
  description: {
    type: String,
    default: "A supporting page for a Fedora Edition",
  },
  details: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  color: {
    type: String,
    default: "text-fp-blue",
  },
  bgColor: {
    type: String,
    default: "bg-fp-newblue-500/10",
  },
});
</script>
<template>
  <header>
    <!-- TODO: Insert Local Nav -->
    <section
      class="my-8 mx-auto max-w-7xl px-8 text-center lg:text-start xl:px-0"
    >
      <div class="container mx-auto">
        <h1 class="mb-4 xl:mb-8" :class="color">{{ title }}</h1>
        <p class="text-fp-gray">{{ description }}</p>
      </div>
    </section>
    <section class="mx-auto flex flex-col pb-2" :class="bgColor">
      <div
        class="container mx-auto max-w-7xl px-8 py-12 text-center lg:px-0 lg:text-start"
      >
        <p class="text-fp-gray-darkest">
          {{ details }}
        </p>
      </div>
      <!-- slot for extra list of details in header -->
      <slot></slot>
      <svg
        viewBox="-82 388 1280 62"
        style="-webkit-print-color-adjust: exact"
        fill="none"
        class="order-first"
      >
        <path d="M-82 450v-62h1280L-82 450Z" fill="#fff" />
      </svg>
    </section>
  </header>
</template>
