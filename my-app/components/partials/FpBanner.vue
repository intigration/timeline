<script setup>
defineProps({
  logo: String,
  title: String,
  subtitle: String,
  subtitleStyle: {
    color: String,
    isBold: Boolean,
  },
  reviewUrl: String,
  color: String,
  border: String,
  background: String,
  ctas: Array,
  icon: String,
});
</script>
<template>
  <div
    class="fp-banner mx-auto mt-16 max-w-7xl px-4 text-center sm:mt-24 sm:px-6"
  >
    <div class="mx-auto max-w-sm sm:max-w-xl">
      <FpImage v-if="logo" class="z-10" :src="logo" :alt="$t('logo')" />
    </div>
    <slot name="title">
      <h1 v-if="title" class="font-semibold text-white">
        <span class="block">{{ $t(title) }}</span>
      </h1>
    </slot>
    <slot name="subtitle">
      <h2
        v-if="subtitle"
        class="mt-3"
        :class="[
          'text-' + (subtitleStyle?.color || 'white'),
          { 'font-semibold': subtitleStyle?.isBold },
        ]"
      >
        {{ $t(subtitle) }}
      </h2>
    </slot>
  </div>
  <div class="my-5 flex justify-center">
    <slot />
  </div>
  <div
    class="spacing-1 mt-5 flex flex-row-reverse flex-wrap justify-center gap-4"
  >
    <template v-for="(cta, idx) in ctas">
      <FpBtn
        :href="cta.url"
        :color="[
          'text-center',
          {
            [background]: idx == 0,
            [color]: idx > 0,
            [border]: idx > 0,
            'bg-white': idx > 0,
            'dark:bg-fp-darkblue-700': idx > 0,
            'dark:border-fp-darkblue-700': idx > 0,
            'dark:!text-white': idx > 0,
          },
        ]"
      >
        <Icon
          v-if="idx === 0 && cta.text.includes('Download')"
          name="fa-download"
        />
        {{ $t(cta.text) }}
      </FpBtn>
    </template>
  </div>
  <div class="mt-5 flex justify-center px-4">
    <a
      v-if="reviewUrl"
      class="z-10 mx-2 cursor-pointer px-12 py-4 font-semibold"
      :class="color"
    >
      {{ $t("Watch the latest reviews ➔") }}
    </a>
  </div>
</template>
