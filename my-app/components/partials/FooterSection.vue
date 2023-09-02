<script setup>
const switchLocalePath = useSwitchLocalePath();

const props = defineProps({
  title: {
    type: String,
    default: "Section Title",
  },
  links: {
    type: Object,
  },
});
</script>

<template>
  <div>
    <label
      :onclick="`toggleFooter('${title}')`"
      class="flex w-full cursor-pointer items-center justify-between"
    >
      <h4 class="text-2xl font-semibold">{{ $t(title) }}</h4>
      <div class="ltr:hidden md:hidden">
        <Icon name="fa6-solid:chevron-left" />
      </div>
      <div class="rtl:hidden md:hidden">
        <Icon name="fa6-solid:chevron-right" />
      </div>
    </label>
    <ul class="hidden md:inline-block" :id="`${title}-footer`">
      <li v-for="link in links" :key="link.id">
        <FpLink :href="link.path" v-if="!link.code">{{
          $t(link.label)
        }}</FpLink>
        <a :href="switchLocalePath(link.code)" v-if="link.code">
          {{ link.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
