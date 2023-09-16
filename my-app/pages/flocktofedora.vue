<script setup>
const data = await getCMS("events/flock");
useContentHead(data);

const explore = data._value.sections[1];
const watch = data._value.sections[2];
const hybrid = data._value.sections[3];
const community = data._value.sections[5];
const sponsors = data._value.sponsors;
const sponsorsBenefits = data._value.sections[6];

function formatDate(dateStr) {
  const options = { month: "long", day: "2-digit" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
}
</script>
<template>
  <FpHero
    :background="data.header_images[1].image"
    alignment="bg-top"
    class="bg-gray-300 bg-blend-multiply dark:bg-gray-500"
  >
    <FpBanner
      :logo="data.header_images[0].image"
      color="text-fp-purple"
      border="border border-fp-purple"
      background="text-white bg-fp-purple"
      :ctas="data.links"
    >
      <template #title>
        <div
          class="mx-auto -mt-10 max-w-xs text-right text-lg font-semibold uppercase text-white sm:-mt-16 sm:max-w-lg sm:text-2xl"
          style="text-shadow: 2px 2px 2px black"
        >
          {{ $t(data.location) }}
        </div>
      </template>
      <template #subtitle>
        <h2
          class="mt-16 font-semibold text-fp-blue sm:mt-24"
          style="text-shadow: 4px 4px 4px black"
        >
          {{ $t(data.title) }}
        </h2>
      </template>
      <h2
        class="my-4 text-center font-semibold text-white"
        style="text-shadow: 4px 4px 4px black"
      >
        {{ $t(data.description) }}
      </h2>
    </FpBanner>
    <div class="mx-auto flex max-w-screen-xl p-12">
      <div
        v-for="card in data.sections[0].content"
        class="max-w-[17rem] rounded-lg bg-black/70 p-4 ltr:mr-8 rtl:ml-8"
      >
        <div
          class="text-lg font-semibold leading-none text-fp-blue"
          style="text-shadow: 1px 2px 4px black"
        >
          <FpImage
            class="inline h-10 max-w-none align-baseline ltr:mr-1 rtl:ml-1"
            :src="card.image"
          />
          {{ $t(card.title) }}
        </div>
        <p class="text-sm text-slate-300">{{ $t(card.description) }}</p>
      </div>
    </div>
  </FpHero>

  <main class="flex flex-col items-center dark:bg-black">
    <!-- Explore -->
    <section class="w-full bg-slate-100 pb-10 dark:bg-slate-900">
      <div class="my-20 mx-auto w-10/12 max-w-screen-xl">
        <h2
          class="mx-auto mb-4 max-w-screen-md bg-gradient-to-r from-fp-purple via-fp-newblue-500 to-fp-purple bg-clip-text text-center text-3xl font-bold text-transparent sm:text-5xl md:mb-12 lg:text-7xl"
        >
          {{ $t(explore.sectionTitle) }}
        </h2>
        <div
          class="flex flex-wrap justify-between gap-4 text-center text-fp-darkblue-500 xl:gap-20"
        >
          <FpCard
            v-for="card in explore.content"
            :title="card.title"
            :description="card.description"
            :variants="['event']"
            class="h-80 grow basis-64"
          >
            <template #prepend>
              <FpCardImage slot="prepend" :src="card.image" />
            </template>
            <template #footer>
              <NuxtLink
                :to="card.link.url"
                class="underline underline-offset-1"
                >{{ $t(card.link.text) }}</NuxtLink
              >
            </template>
          </FpCard>
        </div>

        <h3
          class="mt-20 text-center text-2xl font-semibold text-fp-darkblue-500 dark:text-fp-newblue-500 sm:text-4xl"
        >
          {{ $t(watch.sectionTitle) }}
        </h3>

        <FpCard
          class="mt-8 rounded-lg bg-white p-8 dark:bg-slate-800"
          variant="wide"
        >
          <div class="flex flex-wrap justify-between gap-8">
            <FpCardImage
              slot="prepend"
              class="flex-grow basis-24 lg:max-w-prose"
              src="public/assets/images/flock_youtube.png"
            />
            <div class="my-auto">
              <FpCardTitle :title="watch.content[0].title" />
              <p
                class="text-fp-gray-darkest dark:text-slate-200 2xl:max-w-prose"
              >
                {{ $t(watch.content[0].description) }}
              </p>
              <NuxtLink
                :to="watch.content[0].image"
                class="text-fp-blue ltr:after:content-['→'] rtl:after:content-['←'] dark:text-fp-newblue-500"
                >{{ $t("Visit Fedora Youtube") }}&nbsp;
              </NuxtLink>
            </div>
          </div>
        </FpCard>
      </div>
    </section>

    <section class="mx-auto w-full py-10 dark:bg-slate-800">
      <header class="my-10 mx-auto w-10/12 max-w-screen-xl">
        <h2
          class="mx-auto mb-12 max-w-max bg-gradient-to-r from-fp-purple via-fp-newblue-500 to-fp-purple bg-clip-text text-center text-3xl font-bold text-transparent sm:text-5xl md:leading-normal lg:text-7xl"
        >
          {{ $t(hybrid.sectionTitle) }}
        </h2>
        <p class="mx-auto max-w-prose text-center">
          {{ $t(hybrid.sectionDescription) }}
        </p>
      </header>
      <div
        class="container mx-auto my-8 grid grid-flow-row-dense gap-8 md:grid-cols-2 xl:my-16 xl:grid-cols-3 xl:gap-8"
      >
        <div
          class="col-start-1 place-self-center lg:row-start-2 xl:row-start-3"
        >
          <article class="flex max-w-sm flex-col p-6">
            <h3 class="my-2 font-sans text-xl font-bold text-fp-blue">
              {{ $t(hybrid.content[0].title) }}
            </h3>
            <FpImage
              :src="hybrid.content[0].image"
              class="order-first w-full"
            />
            <p class="my-2 w-72">
              {{ $t(hybrid.content[0].description) }}
            </p>
            <!-- Content will need to be dynamic-->
            <div class="mt-2 flex gap-4 text-xl">
              <NuxtLink
                to="#"
                class="rounded-md bg-fp-newblue-500 px-3 py-2 font-medium text-white duration-300 ease-in-out hover:bg-fp-blue"
                >{{ $t("Destination") }}</NuxtLink
              >
              <NuxtLink
                to="#"
                class="px-3 py-2 font-medium text-fp-blue underline underline-offset-1 duration-300 ease-in-out hover:text-fp-darkblue-500"
                >{{ $t("Learn More") }}</NuxtLink
              >
            </div>
          </article>
        </div>
        <div class="col-start-2 row-span-2 row-start-2 hidden xl:block">
          <FpImage
            src="public/assets/images/people-presenting.png"
            class="rounded-md object-cover"
          />
        </div>
        <div
          class="xl:col-span-2 xl:col-start-1 xl:row-start-3 xl:place-self-center"
        >
          <FpImage
            src="public/assets/images/two-people-at-conf.png"
            class="mx-auto rounded-md object-cover xl:w-48"
          />
        </div>
        <div
          class="place-self-center md:col-start-2 lg:row-start-2 xl:col-start-3 xl:row-span-2 xl:justify-self-start"
        >
          <article class="flex max-w-sm flex-col p-6">
            <h3 class="my-2 font-sans text-xl font-bold text-fp-blue">
              {{ $t(hybrid.content[1].title) }}
            </h3>
            <FpImage
              :src="hybrid.content[1].image"
              class="order-first -ml-3 w-5/6"
            />
            <p class="my-2 w-72">
              {{ $t(hybrid.content[1].description) }}
            </p>
            <!-- Content will need to be dynamic-->
            <div class="mt-2 flex gap-4 text-xl">
              <NuxtLink
                to="#"
                class="rounded-md bg-fp-newblue-500 px-3 py-2 font-medium text-white duration-300 ease-in-out hover:bg-fp-blue"
                >{{ $t("Destination") }}</NuxtLink
              >
              <NuxtLink
                to="#"
                class="px-3 py-2 font-medium text-fp-blue underline underline-offset-1 duration-300 ease-in-out hover:text-fp-darkblue-500"
                >{{ $t("Learn More") }}</NuxtLink
              >
            </div>
          </article>
        </div>
        <div
          class="m-4 place-self-center md:m-0 xl:row-start-2 xl:justify-self-start"
        >
          <div
            class="mx-auto grid h-96 w-96 place-items-center rounded-md bg-black text-white xl:h-60 xl:w-80"
          >
            <p>{{ $t("placeholder") }}</p>
          </div>
        </div>

        <div
          class="col-start-1 row-span-2 row-start-1 hidden place-self-end xl:block"
        >
          <FpImage
            src="public/assets/images/people-posing-destination-bg.png"
            class="h-1/2 w-fit rounded-md object-cover"
          />
        </div>

        <div class="col-span-2 hidden md:block xl:order-first xl:col-start-2">
          <FpImage
            src="public/assets/images/bridge.png"
            class="w-full rounded-md object-cover xl:w-10/12"
          />
        </div>
      </div>
      <div class="my-8">
        <NuxtLink
          to="#"
          class="mx-auto block max-w-fit rounded-md bg-fp-purple px-8 py-3 text-2xl font-medium text-white"
          >{{ $t("Registration") }}</NuxtLink
        >
      </div>
    </section>

    <!-- TODO: Important Dates -->
    <section class="mx-auto w-full py-10">
      <h2
        class="mx-auto mb-8 max-w-max bg-gradient-to-r from-fp-purple via-fp-newblue-500 to-fp-purple bg-clip-text text-center text-3xl font-bold text-transparent sm:text-5xl lg:text-7xl"
      >
        {{ $t(data.importantDates.title) }}
      </h2>
      <h4 class="mx-0 mb-16 text-center text-lg text-fp-darkblue-500 sm:mx-20">
        {{ $t(data.importantDates.description) }}
      </h4>
      <div
        class="container my-12 mx-auto grid grid-cols-2 gap-2 lg:grid-cols-4"
      >
        <figure class="mx-auto my-auto hidden lg:block">
          <img
            class="z-10 lg:w-60"
            src="/assets/images/colur-flap.png"
            :alt="$t('Screenshot')"
          />
          <figcaption
            class="mt-2 text-center text-xs text-fp-gray-dark lg:mt-6"
          >
            Colúr.
          </figcaption>
        </figure>
        <section class="col-span-2">
          <div
            v-for="date in data.importantDates.content"
            class="mx-auto mb-10 flex justify-center gap-5 rounded-xl p-2"
            :style="{ backgroundColor: date.color }"
          >
            <div class="my-auto w-28 text-center">
              <h3 class="text-4xl font-semibold text-fp-blue">
                {{ formatDate(date.startDate) }}
              </h3>
            </div>
            <div class="text-center">
              <h3 class="text-2xl font-bold text-fp-blue">
                {{ $t(date.name) }}
              </h3>
              <p v-if="date.endDate" class="mb-2 text-fp-gray-darkest">
                {{ $t("Deadline:") }} {{ formatDate(date.endDate) }}
              </p>
              <p v-if="date.description" class="mb-2 text-fp-gray-darkest">
                {{ $t(date.description) }}
              </p>
              <div class="flex justify-evenly gap-4">
                <a class="font-bold" v-for="link in date.link" :href="link.url">
                  {{ $t(link.text) }}
                </a>
              </div>
            </div>
          </div>
          <p class="text-center text-sm text-fp-gray">
            {{ $t(data.importantDates.footerText) }}
          </p>
        </section>
        <figure class="mx-auto my-auto hidden lg:block">
          <img
            class="z-10 lg:w-96"
            src="/assets/images/panda_beefy_badger.png"
            :alt="$t('Screenshot')"
          />
          <figcaption
            class="mt-2 text-center text-xs text-fp-gray-dark lg:mt-6"
          >
            {{ $t("Panda, Beefy and Badger.") }}
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- TODO: Event Calendar -->
    <!--
    <section class="w-10/12 mx-auto my-10">
      <h2
        class="text-5xl text-center mb-12 font-bold bg-clip-text text-transparent bg-gradient-to-r from-fp-green to-fp-newblue-500"
      >
        Event Calendar
      </h2>
    </section>
    -->

    <!-- Community Section -->
    <section class="max-w-full py-10 dark:bg-slate-900">
      <FpHero
        :background="community.image"
        alignment="bg-top"
        class="dark:!bg-none"
      >
        <section class="mx-auto w-10/12 max-w-screen-xl py-24">
          <h2
            class="mx-auto mb-12 max-w-max bg-gradient-to-r from-fp-purple via-fp-newblue-500 to-fp-purple bg-clip-text text-center text-3xl font-bold text-transparent sm:text-5xl lg:text-7xl"
          >
            {{ $t(community.sectionTitle) }}
          </h2>
          <h4
            class="mx-0 mb-20 text-center text-lg text-fp-darkblue-500 sm:mx-20"
          >
            {{ $t(community.sectionDescription) }}
          </h4>

          <FpList columns="sm:grid-cols-2">
            <FpListItem
              v-for="item in community.content"
              v-bind="item"
              :iconURI="item.image"
              :image="null"
            />
          </FpList>
        </section>
      </FpHero>
    </section>

    <!-- Our Sponsors -->
    <section class="mx-auto w-full py-10 dark:bg-slate-900">
      <h2
        class="mx-auto mb-12 max-w-max bg-gradient-to-r from-fp-purple via-fp-newblue-500 to-fp-purple bg-clip-text text-center text-3xl font-bold text-transparent sm:text-5xl lg:text-7xl"
      >
        {{ $t(sponsors.title) }}
      </h2>
      <p class="mx-auto max-w-lg text-center font-normal text-gray-600">
        {{ $t(sponsors.description) }}
      </p>

      <FpSponsors :sponsors="sponsors.content" />
    </section>

    <!-- Benefits of Sponsoring -->
    <section class="my-10 w-10/12">
      <header
        class="mx-auto max-w-screen-xl text-center md:w-11/12 md:text-left"
      >
        <h3 class="mb-4 text-center font-medium text-fp-blue">
          {{ $t(sponsorsBenefits.sectionTitle) }}
        </h3>
      </header>
      <FpList columns="sm:grid-cols-2">
        <FpListItem v-for="item in sponsorsBenefits.content" v-bind="item" />
      </FpList>
    </section>
  </main>
</template>
