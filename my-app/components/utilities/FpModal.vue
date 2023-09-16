<template>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex h-full min-h-full items-center justify-center text-center sm:p-4"
    >
      <!-- backdrop overlay -->
      <div
        class="fixed inset-0 bg-white/40 backdrop-blur-md dark:bg-black/50"
        @click="$emit('closeModal')"
      ></div>
      <!-- modal -->
      <div
        class="relative h-full w-full transform overflow-hidden border bg-white text-left text-black shadow-xl transition-all dark:border-gray-600 dark:bg-neutral-900 dark:text-gray-300 sm:my-8 sm:h-[unset] sm:max-h-[90vh] sm:max-w-3xl sm:rounded-md"
      >
        <div class="flex h-full flex-col justify-between">
          <header class="border-b p-3 dark:border-gray-600">
            <slot name="header">
              <h5>Title</h5>
            </slot>
          </header>
          <div class="overflow-y-scroll p-3 sm:h-full sm:max-h-[75vh]">
            <slot />
          </div>
          <footer class="flex justify-end border-t p-3 dark:border-gray-600">
            <slot name="footer">
              <button
                @click="$emit('closeModal')"
                class="rounded bg-fp-newblue-500 py-1 px-2 text-sm text-white hover:bg-fp-blue"
              >
                Close
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
