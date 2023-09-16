<script setup>
const slots = useSlots();
const props = defineProps({
  title: String,
  subtitle: String,
});

const hasTitle = !!(props.title || slots.title);
const hasSubtitle = !!(props.subtitle || slots.subtitle);
</script>
<template>
  <slot name="prepend"></slot>
  <h3 v-if="hasTitle">
    <slot name="title"> {{ $t(title) }} </slot>
  </h3>
  <h4 v-if="hasSubtitle">
    <slot name="subtitle"> {{ $t(subtitle) }} </slot>
  </h4>
  <slot></slot>
</template>
