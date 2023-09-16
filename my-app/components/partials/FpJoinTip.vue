<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Become a Fedora Contributor",
  },
  description: {
    type: String,
    default: "Contact the Join SIG to start contributing",
  },
  link: {
    type: Object,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});
const descriptionMd = await mdparser(props.description);
</script>
<template>
  <aside :class="{ 'fp-jointip-inline': inline, 'fp-jointip': !inline }">
    <div>
      <h4
        class="mb-2 text-lg font-semibold text-fp-newblue-500 dark:text-gray-200"
      >
        {{ $t(title) }}
      </h4>
      <div class="text-sm text-fp-gray-dark dark:text-fp-gray">
        <ContentRendererMarkdown
          class="markdown markdown-inline"
          :value="descriptionMd"
        />&nbsp;
        <div class="inline whitespace-nowrap">
          <NuxtLink
            v-if="link"
            :to="link.url"
            class="text-fp-newblue-500 transition duration-100 ease-in-out hover:text-fp-newblue-700 hover:dark:text-fp-newblue-300"
            >{{ $t(link.text) }}</NuxtLink
          >
          <NuxtLink
            v-else
            to="https://docs.fedoraproject.org/en-US/fedora-join/"
            class="text-fp-newblue-500 transition duration-100 ease-in-out hover:text-fp-newblue-700 hover:dark:text-fp-newblue-300"
            >{{ $t("Learn more") }}</NuxtLink
          >
        </div>
      </div>
    </div>
    <Icon
      name="fa6-solid:door-open"
      class="order-first text-fp-newblue-500 dark:text-gray-200"
      size="1.5rem"
    />
  </aside>
</template>
<style>
.fp-jointip {
  @apply container my-2 flex gap-2;
}

.fp-jointip-inline {
  @apply flex gap-2;
}

.fp-jointip-inline > div {
  @apply gap-2 sm:flex;
}

.fp-jointip-inline h4 {
  @apply m-0 sm:after:content-['_-'];
}

.fp-jointip-inline > div > div {
  @apply flex items-baseline justify-end;
}
</style>
