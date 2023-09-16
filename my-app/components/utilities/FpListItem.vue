<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String,
  url: String,
  iconURI: String,
});
let descriptionMd;
if (props.description) {
  descriptionMd = await mdparser(props.description);
}
</script>
<template>
  <li
    class="mb-2 w-10/12"
    :style="
      iconURI
        ? {
            background: `url(${
              $config.app.baseURL.replace(new RegExp('/$'), '') +
              '/' +
              iconURI.replace('public/', '')
            }) no-repeat left top`,
            'padding-left': '60px',
            'list-style': 'none',
          }
        : 'null'
    "
  >
    <div v-if="props.image" class="flex h-64 items-center justify-center">
      <FpImage :src="props.image" />
    </div>
    <h4
      v-if="title"
      class="inline font-bold text-fp-darkblue-500 dark:text-slate-100"
    >
      {{ $t(props.title) }}
    </h4>
    <ContentRenderer
      v-if="descriptionMd"
      class="markdown text-fp-darkblue-500 dark:text-slate-200"
      tag="p"
      :value="descriptionMd"
    />
    <br />
    <div v-if="props.url" class="flex items-center justify-center">
      <FpBtn :href="props.url">{{ $t("Learn More") }}</FpBtn>
    </div>
  </li>
</template>
