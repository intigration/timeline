<template>
  <div
    class="container mx-auto flex max-w-7xl flex-row flex-wrap justify-center gap-8 lg:flex-nowrap"
  >
    <div class="my-5">
      <slot name="header">
        <h2
          class="mb-5 text-center text-fp-blue dark:text-gray-200 lg:text-start"
        >
          {{ $t("We take security seriously") }}
        </h2>
      </slot>
      <p class="mb-5 text-fp-gray">
        {{
          $t(
            "Once you have downloaded an image, be sure to verify it for both security and integrity."
          )
        }}
      </p>
      <p class="mb-5 text-fp-gray">
        {{
          $t(
            "By calculating the image’s checksum on your own computer and comparing it to the original checksum, you can verify the image has not been tampered with or corrupted. Images are also gpg signed with Fedora keys to demonstrate their integrity."
          )
        }}
      </p>
      <i18n-t
        keypath="verify_button_instruction"
        tag="p"
        class="mb-5 text-fp-gray"
      >
        <template #verify_button>
          <Icon
            name="fa-solid:clipboard-check"
            class="!align-baseline text-fp-newblue-500 dark:text-gray-200"
          />
        </template>
      </i18n-t>
    </div>
    <div
      class="flex w-[400px] flex-none shrink items-center justify-center sm:shrink-0"
    >
      <FpImage
        class="max-h-72 drop-shadow-lg grayscale invert dark:grayscale-0 dark:invert-0"
        src="public/assets/images/verify_download_2.png"
      />
    </div>
  </div>
</template>
