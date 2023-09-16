<script setup>
const { t } = useI18n();
const slots = useSlots();
const props = defineProps({
  name: {
    type: String,
  },
  version: {
    type: String,
  },
  artifacts: {
    type: Object,
  },
  theme: {
    type: String,
    default: "blue",
  },
  isBeta: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <p class="my-2 font-bold">{{ $t(name) }}</p>

    <div v-for="(v, k) in artifacts" key="k" class="download-section mb-2">
      <FpDownloadItem
        :name="'Fedora IoT ' + version"
        :type="v.type"
        :format="v.format"
        :downloadLink="`https://download.fedoraproject.org/pub/alt/iot/test/${version}/${v.path}`"
        @verify-click="$emit('verifyClick', v)"
        :theme="theme"
        v-if="v.arch != 'src' && isBeta"
        :variants="['beta']"
      />
      <FpDownloadItem
        :name="'Fedora IoT ' + version"
        :type="v.type"
        :format="v.format"
        :downloadLink="`https://download.fedoraproject.org/pub/alt/iot/${version}/${v.path}`"
        @verify-click="$emit('verifyClick', v)"
        :theme="theme"
        v-if="v.arch != 'src' && !isBeta"
      />
    </div>
  </div>
</template>

<style>
.download-section .fp-download-item {
  @apply first:rounded-t-xl last:rounded-b-xl;
}
</style>
