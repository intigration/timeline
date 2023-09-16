<script setup>
import navigation from "../../config/navigation.js";
</script>

<template>
  <footer class="bg-gray-200 dark:bg-neutral-900">
    <!-- Footer Navigation -->
    <nav class="p-4 sm:px-8 sm:py-[1.5em]">
      <div
        class="mx-auto grid max-w-screen-xl gap-x-[4em] gap-y-2 sm:grid-cols-2 sm:gap-y-[1.5em] md:grid-cols-3 lg:grid-cols-4"
      >
        <FooterSection
          v-for="category in navigation.downloads.sections"
          :title="category.label"
          :links="category.links"
        />
        <FooterSection
          class="md:hidden"
          title="Languages"
          :links="navigation.languages.sections[0].links"
        />
      </div>
    </nav>
    <!-- Fedora Section -->
    <section class="p-4 sm:p-8">
      <div
        class="mx-auto flex max-w-screen-xl flex-wrap lg:flex-nowrap lg:justify-center"
      >
        <div class="w-[200px] flex-none pb-6 lg:pb-0">
          <FpImage
            src="assets/images/logos/fedora-blue.png"
            :alt="$t('Fedora Logo')"
            class="h-12"
          />
        </div>
        <div class="w-full">
          <div class="flex justify-center px-4">
            <ul class="flex flex-wrap justify-center gap-x-4 gap-y-[1ex]">
              <li class="list-none underline underline-offset-1">
                <FpLink
                  href="https://docs.fedoraproject.org/en-US/legal/privacy/"
                  class="text-fp-gray-darkest transition duration-300 ease-in-out hover:text-fp-gray dark:text-fp-gray-light dark:hover:text-fp-gray-dark"
                  >{{ $t("Privacy Statement") }}</FpLink
                >
              </li>
              <li class="list-none underline underline-offset-1">
                <FpLink
                  href="https://docs.fedoraproject.org/en-US/legal/"
                  class="text-fp-gray-darkest transition duration-300 ease-in-out hover:text-fp-gray dark:text-fp-gray-light dark:hover:text-fp-gray-dark"
                  >{{ $t("Legal") }}</FpLink
                >
              </li>
              <li class="list-none underline underline-offset-1">
                <FpLink
                  href="https://docs.fedoraproject.org/en-US/project/code-of-conduct/"
                  class="text-fp-gray-darkest transition duration-300 ease-in-out hover:text-fp-gray dark:text-fp-gray-light dark:hover:text-fp-gray-dark"
                  >{{ $t("Code of Conduct") }}</FpLink
                >
              </li>
              <li class="list-none underline underline-offset-1">
                <FpLink
                  href="/sponsors"
                  class="text-fp-gray-darkest transition duration-300 ease-in-out hover:text-fp-gray dark:text-fp-gray-light dark:hover:text-fp-gray-dark"
                  >{{ $t("Sponsors") }}</FpLink
                >
              </li>
              <li
                class="w-full flex-none list-none text-center text-fp-gray-darkest"
              >
                Help improve this website on the
                <FpLink
                  href="https://fedora.gitlab.io/websites-apps/fedora-websites/fedora-websites-3.0/admin/"
                  class="underline underline-offset-1 transition duration-300 ease-in-out hover:text-fp-gray dark:text-fp-gray-light dark:hover:text-fp-gray-dark"
                  >{{ $t("CMS") }}</FpLink
                >
                or the
                <FpLink
                  href="https://gitlab.com/fedora/websites-apps/fedora-websites/fedora-websites-3.0"
                  class="underline underline-offset-1 transition duration-300 ease-in-out hover:text-fp-gray dark:text-fp-gray-light dark:hover:text-fp-gray-dark"
                  >{{ $t("GitLab repo") }}</FpLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="w-[200px] flex-none"></div>
      </div>
    </section>
    <!-- Red Hat Sponsorship Section -->
    <section class="bg-black p-4 sm:p-8">
      <div
        class="mx-auto flex max-w-screen-xl flex-wrap lg:flex-nowrap lg:justify-center"
      >
        <div class="w-[200px] flex-none pb-6 lg:pb-0">
          <FpImage
            src="assets/images/logo-sponsored-by-red-hat.png"
            :alt="$t('Sponsored by Red Hat Logo')"
            class="mb-2 xl:mb-0"
          />
        </div>
        <div class="w-full">
          <div class="flex justify-center px-4">
            <p class="text-white">
              {{ $t("Fedora is sponsored by Red Hat.") }}
              <FpLink
                href="https://docs.fedoraproject.org/en-US/quick-docs/fedora-and-red-hat-enterprise-linux/"
                class="block w-full text-fp-gray underline underline-offset-1"
                >{{
                  $t(
                    "Learn more about the relationship between Red Hat and Fedora."
                  )
                }}</FpLink
              >
            </p>
          </div>
        </div>
        <div class="w-[200px] flex-none"></div>
      </div>
    </section>
  </footer>
</template>
