<script setup>
const slots = useSlots();
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  variants: {
    type: Array,
    default: [],
  },
  link: {
    type: Object,
  },
  centerAlign: {
    type: Boolean,
    default: false,
  },
});

const hasHeader = !!(props.title || slots.header || slots.prepend);
const variantClasses = props.variants.map((v) => `fp-card--variant-${v}`);

let descriptionMd;
if (props.description) {
  descriptionMd = await mdparser(props.description);
}
</script>

<template>
  <article :class="['fp-card', variantClasses]">
    <header v-if="hasHeader">
      <slot name="header">
        <FpCardTitle :title="title">
          <template #prepend>
            <slot slot="prepend" name="prepend" />
          </template>
        </FpCardTitle>
      </slot>
    </header>
    <main>
      <slot>
        <ContentRenderer
          v-if="descriptionMd"
          :value="descriptionMd"
          class="markdown"
        />
      </slot>
    </main>
    <footer>
      <slot name="footer">
        <FpImage :src="image" v-if="image" />

        <NuxtLink :to="link.url" v-if="link">{{ $t(link.text) }}</NuxtLink>
      </slot>
    </footer>
  </article>
</template>

<style>
.fp-card {
  @apply container flex flex-col justify-between;
}

.fp-card h3 {
  @apply px-2 text-2xl font-semibold text-fp-blue dark:text-gray-200 lg:px-0;
}

.fp-card h4 {
  @apply px-2 text-xl font-semibold text-fp-blue lg:px-0;
}

.fp-card main p {
  @apply my-3 break-words text-sm text-fp-gray-darkest dark:text-fp-gray-light lg:text-base;
}

.fp-card footer {
}

.fp-card footer > img {
  @apply mx-auto my-4 w-48 md:w-64;
}

.fp-card--variant-btn footer > a {
  @apply mx-auto my-3 flex max-w-fit justify-center rounded-lg bg-fp-newblue-500 py-2 px-10 font-medium text-white hover:bg-fp-newblue-700 dark:bg-fp-newblue-700 hover:dark:bg-fp-newblue-500;
}

.fp-card--variant-wide {
  @apply rounded-lg bg-white p-4 dark:bg-slate-800 md:max-w-full;
}

.fp-card--variant-event {
  @apply rounded-lg bg-white p-6 dark:bg-slate-800;
}

.fp-card--variant-event main > p {
  @apply mx-auto text-center dark:text-white;
}

.fp-card--variant-event footer > a {
  @apply underline dark:text-fp-newblue-500 lg:max-w-prose;
}

.fp-card--variant-event img {
  @apply max-h-[100px];
}
</style>
