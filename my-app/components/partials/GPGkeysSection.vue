<script setup>
const { t } = useI18n();
const slots = useSlots();
const props = defineProps({
  gpgs: {
    type: Object,
  },
});
</script>

<template>
  <div
    class="container mx-auto grid max-w-max divide-y divide-dotted divide-fp-gray text-fp-gray dark:text-fp-gray-light"
  >
    <div v-for="gpg in gpgs" class="py-8">
      <h3 class="pb-3 text-center text-fp-blue sm:text-start">
        {{ gpg.name }}
      </h3>
      <p>
        <span class="font-bold">id: </span
        ><code class="text-xs text-fp-gray sm:text-base">{{ gpg.id }}</code>
      </p>
      <p class="flex flex-wrap items-baseline gap-x-1">
        <span class="font-bold">Fingerprint: </span
        ><code class="break-all text-xs text-fp-gray sm:text-base">{{
          gpg.fingerprint
        }}</code>
      </p>
      <p v-if="gpg.openpgpkey" class="flex flex-wrap items-baseline gap-x-1">
        <span class="font-bold">DNS OpenPGPKey: </span
        ><code class="break-all text-xs text-fp-gray sm:text-base">{{
          gpg.openpgpkey
        }}</code>
      </p>
    </div>
  </div>
</template>
