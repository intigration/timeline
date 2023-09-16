<script setup>
defineProps({
  sponsors: {
    name: String,
    imageURI: String,
    level: String,
    description: String,
  },
});

function sponsorClass(sponsor) {
  let classList = "";
  switch (sponsor.level) {
    case "platinium":
      classList = "bg-gray-100 dark:bg-neutral-300 col-span-4";
      break;
    case "gold":
      classList = "bg-gray-100 dark:bg-neutral-300 col-span-3";
      break;
    case "silver":
      classList = "bg-gray-100 dark:bg-neutral-300 col-span-2";
      break;
    case "bronze":
      classList = "bg-gray-100 dark:bg-neutral-300";
      break;
    case "media":
      classList = "bg-slate-100 dark:bg-slate-800";
      break;
    default:
      classList = "bg-gray-50 dark:bg-slate-900";
  }
  return classList;
}
</script>

<template>
  <div
    class="grid-none mx-auto mt-10 max-w-screen-lg grid-cols-1 flex-wrap justify-items-stretch gap-4 text-gray-500 md:grid md:grid-flow-dense md:grid-cols-4 md:flex-nowrap"
  >
    <div
      v-for="sponsor in sponsors"
      class="relative grid h-48 content-center p-8 text-center text-xs"
      :class="sponsorClass(sponsor)"
    >
      <template v-if="sponsor.level != 'placeholder'">
        <FpImage
          v-if="sponsor.image"
          class="mx-auto max-h-32 w-full object-contain"
          :src="sponsor.image"
        />
        <p v-else>{{ sponsor.name }}</p>
        <p class="absolute inset-x-0 bottom-2.5 text-xs capitalize">
          {{ sponsor.level }} sponsor
        </p>
      </template>
    </div>

    <a href="#">
      <div
        class="media grid h-48 content-center bg-violet-300 p-8 text-center align-middle text-xs dark:bg-fp-blue"
      >
        <p class="text-3xl text-black dark:text-white">
          {{ $t("Become a Sponsor") }}
        </p>
      </div>
    </a>
  </div>
</template>
