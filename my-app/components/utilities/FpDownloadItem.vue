<script setup>
const { t } = useI18n();
const slots = useSlots();
const props = defineProps({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  format: {
    type: String,
  },
  theme: {
    type: String,
  },
  variants: {
    type: Array,
    default: [],
  },
  downloadLink: {
    type: String,
  },
  verifyLink: {
    type: String,
  },
});

const variantClasses = props.variants.map(
  (v) => `fp-download-item--variant-${v}`
);

const prettyType = {
  aliyun: "Alibaba Cloud",
  aws: "AWS",
  azure: "Azure",
  azurestack: "Azure Stack",
  digitalocean: "DigitalOcean",
  exoscale: "Exoscale",
  gcp: "GCP",
  hyperv: "Hyper-V",
  ibmcloud: "IBM Cloud",
  "raw.xz": "Raw",
  "raw-xz": "Raw",
  "4k.raw.xz": "Raw (4k Native)",
  iso: "Live DVD",
  dvd: "DVD",
  "dvd-ostree": "OSTree",
  kubevirt: "KubeVirt",
  pxe: "Netboot",
  nutanix: "Nutanix",
  openstack: "OpenStack",
  packet: "Packet",
  qemu: "QEMU",
  qcow2: "QEMU",
  virtualbox: "VirtualBox",
  vmware: "VMware",
  vultr: "Vultr",
  "vagrant-libvirt": "Vagrant",
  "vagrant-virtualbox": "Vagrant",
  "tar-gz": "Compressed Image",
  boot: "Network Install",
  live: "Live ISO",
};
</script>

<template>
  <div :class="['fp-download-item', variantClasses, theme]">
    <div class="flex items-center justify-between gap-4">
      <p class="flex flex-wrap gap-x-5 text-gray-800 dark:text-gray-400">
        <slot>
          <span class="font-semibold">
            {{ name }}
          </span>
          <span class="w-0 basis-full sm:hidden"></span>
          <span class="">{{ prettyType[type] }}</span>
          <span class="text-gray-500"> {{ format }}</span>
          <span class="beta-flag hidden">{{ $t("BETA") }} </span>
        </slot>
      </p>
      <div class="inline-flex">
        <slot name="btn">
          <a
            @click="$emit('verifyClick')"
            title="Verify"
            class="ltr:rounded-l-xl rtl:rounded-r-xl"
          >
            <Icon name="fa-solid:clipboard-check" class="!align-baseline" />
          </a>
          <FpLink
            :href="downloadLink"
            v-if="downloadLink"
            title="Download"
            class="ltr:-ml-px ltr:rounded-r-xl rtl:-mr-px rtl:rounded-l-xl"
          >
            <Icon name="fa-download" class="!align-baseline" />
          </FpLink>
        </slot>
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<style>
.fp-download-item {
  @apply border border-gray-200 bg-white px-5 py-2 dark:border-gray-900 dark:bg-neutral-900;
}

.fp-download-item a,
.fp-download-item--variant-beta a {
  @apply cursor-pointer border py-1 px-3 transition-colors;
}

.fp-download-item--variant-beta {
}

.fp-download-item--variant-beta .beta-flag {
  @apply inline self-center rounded-full bg-fp-newblue-500 px-2 text-sm font-bold leading-normal text-white dark:bg-fp-darkblue-500;
}
</style>
