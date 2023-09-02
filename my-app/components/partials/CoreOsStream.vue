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
  last_update: {
    type: String,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  json_url: {
    tyte: String,
  },
});

function timeSince(rfc3339_timestamp) {
  var current = Date.now();
  var timestamp = Date.parse(rfc3339_timestamp);
  var elapsed = current - timestamp;
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  function stringize(n, s) {
    return n + ` ${s}` + (n == 1 ? "" : "s") + " ago";
  }
  if (elapsed < msPerMinute) {
    return stringize(Math.floor(elapsed / 1000), "second");
  } else if (elapsed < msPerHour) {
    return stringize(Math.floor(elapsed / msPerMinute), "minute");
  } else if (elapsed < msPerDay) {
    return stringize(Math.floor(elapsed / msPerHour), "hour");
  } else if (elapsed < msPerMonth) {
    return stringize(Math.floor(elapsed / msPerDay), "day");
  } else if (elapsed < msPerYear) {
    return stringize(Math.floor(elapsed / msPerMonth), "month");
  } else {
    return stringize(Math.floor(elapsed / msPerYear), "year");
  }
}
</script>

<template>
  <div
    class="flex flex-col justify-between gap-6 pt-3 ltr:border-l-8 ltr:pl-6 rtl:border-r-8 rtl:pr-6"
    :class="`border-${color}`"
  >
    <div class="flex items-center justify-center">
      <div
        class="ml-4 h-16 w-16 rounded-full p-4 text-white"
        :class="`bg-${color}`"
      >
        <Icon :name="icon" size="32" />
      </div>
      <div class="pl-8">
        <h3 class="font-weight-light">{{ name }}</h3>
        <h6 class="mb-0 text-gray-500 dark:text-gray-400">v {{ version }}</h6>
        <p class="text-gray-500 dark:text-gray-400">
          <span>
            <a :href="json_url" class="font-bold underline">JSON</a>
          </span>
          — <span class="font-normal">{{ timeSince(last_update) }}</span>
        </p>
      </div>
    </div>
    <p class="pl-3 pr-2"><slot /></p>
    <slot name="footer">
      <button
        id="stable"
        class="mx-auto mb-4 rounded-sm py-1 px-3 text-sm font-bold text-white"
        :class="`bg-${color}`"
      >
        Show Downloads
      </button>
    </slot>
  </div>
</template>
