<script setup>
import navigation from "../../config/navigation.js";
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <!-- BACKDROP, MAINLY TO CLOSE ON BLUR -->
  <!-- <div class="fixed inset-0"></div> -->

  <div
    class="fixed z-50 w-full from-fp-newblue-500 to-fp-blue ltr:bg-gradient-to-r rtl:bg-gradient-to-l dark:from-fp-darkblue-500 dark:to-fp-blue"
  >
    <!-- NAVBAR  -->
    <div class="grid grid-cols-2">
      <a
        href="#main"
        class="sr-only !fixed top-0 !h-[54px] bg-fp-blue-700 !py-4 !px-6 text-sm text-white focus:not-sr-only"
      >
        Skip to content
      </a>
      <div
        class="col-span-2 my-1 flex items-center justify-between px-4 md:col-span-1 md:mt-0 md:justify-start"
      >
        <!-- LOGO -->
        <FpNavLogo />

        <!-- MOBILE EXPANDER -->
        <button
          onclick="mobileExpander()"
          type="button"
          class="rounded-md p-2 text-white md:hidden"
        >
          <Icon name="fa6-solid:bars" />
        </button>
      </div>

      <!-- DESKTOP -->
      <div
        :class="`col-span-2 hidden justify-around gap-2 py-4 text-white md:col-span-1 md:flex md:justify-end md:px-4 md:py-1`"
        id="categoryButtons"
      >
        <button
          v-for="category in navigation"
          :key="category.id"
          :id="`${category.label}-button`"
          :class="`fpCategoryButtons rounded-xl p-1 hover:bg-fp-blue-500 md:p-3 ${
            category.label === 'Languages' && 'hidden md:inline-block'
          }`"
          :onclick="`selectCategory('${category.label}', '${category.sections[0].label}')`"
        >
          <div class="inline-block md:hidden">
            <Icon :name="category.icon" size="24" />
          </div>
          <p class="text-sm text-white">
            {{ $t(category.label) }}
          </p>
        </button>
        <div class="hidden items-center justify-end md:flex">
          <FpThemeSelector />
        </div>
      </div>
    </div>

    <!-- MENU -->
    <nav
      class="absolute left-0 right-0 mx-auto hidden h-screen bg-neutral-100 shadow-xl dark:bg-neutral-900 md:h-[60vh] md:overflow-hidden"
      id="fpNavigation"
    >
      <div class="mx-auto lg:max-w-[80%]">
        <!-- CATEGORIES (LEFT COLUMN DESKTOP, FULL-WIDTH MOBILE) -->
        <section class="w-full md:w-[20%]">
          <header
            v-for="category in navigation"
            :key="category.id"
            class="fpCategory hidden"
            :id="category.label"
          >
            <ul class="mt-2 px-2 md:w-[20vw]">
              <h2
                class="hidden px-2 text-base text-[1vw] font-semibold uppercase text-fp-blue md:mb-1 md:flex"
              >
                {{ $t(category.label) }}
              </h2>
              <li
                v-for="section in category.sections"
                role="button"
                :key="section.id"
              >
                <div
                  :id="`${section.label}-button`"
                  class="fpSectionButtons flex cursor-pointer justify-between rounded-xl px-2 py-1 text-gray-700 duration-150 ease-in-out hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-800 md:mb-[1vh]"
                  role="button"
                  :onclick="`selectSection('${section.label}')`"
                >
                  <h4 class="py-2 font-medium !leading-none">
                    {{ $t(section.label) }}
                  </h4>
                  <div class="md:hidden">
                    <Icon
                      name="fa6-solid:chevron-right"
                      :class="`rotate-90 duration-150 ease-in-out`"
                      size="16"
                    />
                  </div>
                </div>

                <!-- SECTIONS (RIGHT COLUMN DESKTOP, ACCORDION MOBILE) -->
                <section
                  class="p-1 pl-5 text-white md:absolute md:top-0 md:mt-2 md:border-neutral-400 md:p-5 ltr:md:left-[20%] md:ltr:border-l rtl:md:right-[20%] md:rtl:border-r md:dark:border-neutral-600 ltr:lg:left-[30%] ltr:lg:right-[10%] rtl:lg:right-[30%] rtl:lg:left-[10%]"
                >
                  <div
                    class="fpSection hidden h-60 overflow-y-auto md:h-[55vh]"
                    :id="section.label"
                  >
                    <header class="mb-6 hidden md:inline-block">
                      <h3
                        class="font-semibold text-gray-700 dark:text-gray-200"
                      >
                        {{ $t(section.label) }}
                      </h3>
                      <p class="text-gray-500 dark:text-gray-500">
                        {{ $t(section.description) }}
                      </p>
                    </header>
                    <div class="grid grid-cols-3 gap-2">
                      <FpLink
                        v-for="link in section.links"
                        :key="link.id"
                        class="col-span-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 md:col-span-1 md:p-4"
                        :i18n="link.code ? true : false"
                        :href="
                          link.code ? switchLocalePath(link.code) : link.path
                        "
                      >
                        <h5
                          :class="`${
                            link.code ? '' : 'mb-2'
                          } font-medium text-fp-blue`"
                        >
                          <Icon
                            v-if="link.icon"
                            :name="link.icon"
                            size="32"
                            class="text-fp-blue"
                          />
                          {{ link.code ? link.name : $t(link.label) }}
                        </h5>
                        <p
                          v-if="!link.code"
                          class="hidden text-base text-gray-700 dark:text-gray-500 md:inline-block"
                        >
                          {{ $t(link.description) }}
                        </p>
                      </FpLink>
                    </div>
                  </div>
                </section>
              </li>
            </ul>
          </header>
        </section>
      </div>
    </nav>
  </div>
</template>
