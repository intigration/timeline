<script setup>
// Dynamic Props
const props = defineProps({
  color: {
    default: "text-fp-darkblue-500",
    type: String,
  },
  eventsLink: {
    default:
      "https://www.youtube.com/watch?v=kj9Hzo5MSmM&list=PL0x39xti0_66-VnwFuVEpS21cdJ1ihYbf",
    type: String,
  },
  colurSlogan: {
    default: "Join Us!",
    type: String,
  },
});

// Data Import
let { data } = await useAsyncData(() => {
  return queryContent("/partials/events").findOne();
});

for (let item of data._value.body[0].content) {
  item.descriptionMd = await mdparser(item.description);
}
</script>
<template>
  <section>
    <div
      class="container my-12 mx-auto grid max-w-7xl grid-cols-2 gap-4 p-5 lg:grid-cols-3"
    >
      <header class="container col-span-2 mx-auto flex flex-col justify-evenly">
        <!-- Events Header -->
        <section class="mx-8 mb-8 text-center md:text-start xl:mx-0">
          <h2 class="mb-4 xl:text-4xl" :class="color">
            {{ $t(data.body[0].sectionTitle) }}
          </h2>
          <p class="text-fp-gray-darkest dark:text-fp-gray">
            {{ $t(data.body[0].sectionDescription) }}
          </p>
        </section>
        <!-- Flock Info -->
        <article class="mx-8 mb-8 flex flex-col self-center xl:mx-0">
          <h3
            class="text-center text-lg text-fp-darkblue-500 dark:text-gray-200 xl:text-xl"
          >
            {{ $t(data.body[0].content[0].title) }}
          </h3>
          <FpImage
            :src="data.body[0].content[0].image"
            class="order-first mx-auto w-60 lg:max-w-lg"
          />
          <ContentRenderer
            class="markdown my-0 text-fp-gray-darkest dark:text-fp-gray md:my-2"
            :value="data.body[0].content[0].descriptionMd"
          />
          <div
            class="xl-mx-0 mt-6 w-full bg-pink-200 p-2 text-fp-gray-darkest dark:bg-neutral-900 dark:text-fp-gray lg:py-3 lg:pl-4"
          >
            <p>{{ $t(data.body[0].content[0].link.text) }}</p>
          </div>
        </article>
      </header>

      <!-- Colur -->
      <figure
        class="col-start-3 row-start-1 hidden gap-4 justify-self-start lg:grid"
      >
        <!-- flock sign text -->
        <p
          class="z-20 col-start-1 row-start-1 mt-12 font-medium text-fp-gray ltr:ml-14 rtl:mr-32"
        >
          {{ $t(colurSlogan) }}
        </p>
        <FpImage
          :src="data.body[0].content[1].image"
          class="z-10 col-start-1 row-start-1 w-48 lg:w-60"
        />
        <figcaption
          class="text-center text-xs text-fp-gray-dark dark:text-fp-gray"
        >
          {{ $t(data.body[0].content[1].description) }}
        </figcaption>
      </figure>

      <!-- Nest and Hatch -->
      <div
        class="items-between xl-mx-0 col-span-2 mt-6 flex flex-wrap justify-center lg:justify-start"
      >
        <article
          v-for="card in data.body[0].content.slice(3, 5)"
          :key="card.id"
          class="container my-4 mx-auto flex w-fit flex-col gap-y-4 md:w-1/2"
        >
          <h4 class="text-base text-fp-blue dark:text-gray-200 xl:text-lg">
            {{ $t(card.title) }}
          </h4>
          <ContentRenderer class="max-w-sm" :value="card.descriptionMd" />
          <div class="xl-mx-0 order-first">
            <FpImage :src="card.image" class="h-16" />
          </div>
        </article>
      </div>

      <!-- Recap Message -->
      <figure class="container col-start-3 mt-6 hidden lg:block">
        <NuxtLink
          :to="eventsLink"
          target="_blank"
          class="transition duration-100 ease-in-out hover:opacity-70"
        >
          <FpImage :src="data.body[0].content[2].image" class="w-80" />
        </NuxtLink>
        <figcaption
          class="mt-4 max-w-xs text-sm text-fp-gray-dark dark:text-fp-gray"
        >
          {{ $t(data.body[0].content[2].description) }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>
