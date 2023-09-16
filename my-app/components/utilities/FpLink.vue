<script setup>
defineProps({
  href: String,
  current: Boolean,
  class: String,
  rel: String,
  i18n: Boolean,
});
const localePath = useLocalePath();
</script>

<template>
  <a
    :href="`${
      i18n // i18n switcher link
        ? $config.app.baseURL.replace(new RegExp('/$'), '') + href
        : href.includes('https') // external link
        ? href 
        : $config.app.baseURL.replace(new RegExp('/$'), '') + localePath(href) // normal in-site link
    }`"
    :aria-current="current ? 'page' : undefined"
    :rel="rel"
    :class="class"
  >
    <slot></slot>
  </a>
</template>
