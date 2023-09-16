<!-- vim:set ts=2 et: -->

<script setup>
import { decode } from "html-entities";

const { t } = useI18n();

const data = await getCMS("start");
useContentHead(data);

// number of headlines to display
const count_headlines = 9;
const count_headlines_narrow = 6;

// number of common issues to display
const count_common = 6;

// number of solved issues to display
const count_solved = 4;

// number of commblog posts to display
const count_commblog = 4;

// user documentation
const user_documentation = data._value.sections[0];

// communication channels
const comm_channels = data._value.sections[1];

const magazine_uri = "https://fedoramagazine.org";
const magazine_api = "wp-json/fedora-ssr-endpoint";

const fm_headlines = async () => {
  let index = await $fetch(`${magazine_uri}/${magazine_api}/v1/index/1`);

  let i = 0;
  let headlines = [];
  while (i < count_headlines) {
    let date = new Date(index[i].date);

    headlines.push({
      timestamp: date,
      thumbnail: index[i].feature,
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      title: decode(index[i].title),
      link: `${magazine_uri}/${index[i].slug}`,
    });

    i++;
  }

  return headlines;
};

const commblog_uri = "https://communityblog.fedoraproject.org";
const commblog_api = "wp-json/fedora-ssr-endpoint";

const cb_headlines = async () => {
  let index = await $fetch(`${commblog_uri}/${commblog_api}/v1/index/1`);

  let i = 0;
  let headlines = [];
  while (i < count_commblog) {
    let date = new Date(index[i].date);

    headlines.push({
      timestamp: date,
      thumbnail: index[i].feature,
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      title: decode(index[i].title),
      link: `${commblog_uri}/${index[i].slug}`,
    });

    i++;
  }

  return headlines;
};

const discourse_uri = "https://discussion.fedoraproject.org";
const discourse_api = "c/news/announce-list/76.json";

const fp_headlines = async () => {
  let dcdata = await $fetch(`${discourse_uri}/${discourse_api}`);
  let topics = dcdata.topic_list.topics;

  let i = 0;
  let headlines = [];
  while (i < count_headlines + 1) {
    let date = new Date(topics[i].created_at);

    if (topics[i].title == "About the Announce List category") {
      i++;
      continue;
    }

    headlines.push({
      timestamp: date,
      thumbnail: "/assets/images/announcements-472x200.png",
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      title: topics[i].title,
      link: `${discourse_uri}/t/${topics[i].slug}`,
    });

    i++;
  }

  return headlines.slice(0, count_headlines);
};

const common_query = "c/ask/common-issues/82/none";

const fp_common_issues = async () => {
  let dcdata = await $fetch(`${discourse_uri}/${common_query}.json`);
  let topics = dcdata.topic_list.topics;

  let i = 0;
  let issues = [];
  while (i < count_common + 1) {
    let title = topics[i].title;

    if (title == "About the Common Issues category") {
      i++;
      continue;
    }

    issues.push({
      title: title,
      link: `${discourse_uri}/t/${topics[i].slug}`,
    });

    i++;
  }

  return issues.slice(0, count_common);
};

const solved_query = "q=%23ask%20status%3Asolved%20order%3Alatest_topic";
const user_avatars = "https://sea1.discourse-cdn.com/fedoraproject";

const fp_solved_issues = async () => {
  let dcdata = await $fetch(`${discourse_uri}/search.json?${solved_query}`);
  let solved = dcdata.posts;

  let i = 0;
  let issues = [];
  while (i < count_solved) {
    let avatar;
    if (solved[i].avatar_template) {
      avatar = solved[i].avatar_template.replace("{size}", "48");
      if (avatar.startsWith("/user_avatar")) {
        avatar = user_avatars + avatar;
      }
    } else {
      avatar = "/assets/images/unknown_avatar.png";
    }

    let topic;
    if (solved[i].topic_id) {
      topic = await $fetch(`${discourse_uri}/t/${solved[i].topic_id}.json`);
    }

    if (topic) {
      issues.push({
        avatar: avatar,
        title: topic.title,
        link: `${discourse_uri}/t/${topic.slug}`,
      });
    }

    i++;
  }

  return issues;
};

let magazine = [];
try {
  if (process.client) {
    magazine = await fm_headlines();
  }
} catch (e) {
  console.log(e);
}

let commblog = [];
try {
  if (process.client) {
    commblog = await cb_headlines();
  }
} catch (e) {
  console.log(e);
}

const got_commblog = commblog.length == count_commblog;

let newsfeed = [];
try {
  if (process.client) {
    newsfeed = await fp_headlines();
  }
} catch (e) {
  console.log(e);
}

let headlines;
if (magazine.length > 0 && newsfeed.length > 0) {
  let combined = [...magazine, ...newsfeed];
  headlines = combined
    .sort(function (a, b) {
      return b.timestamp - a.timestamp;
    })
    .slice(0, count_headlines);
} else if (magazine.length > 0) {
  headlines = magazine;
} else if (newsfeed.length > 0) {
  headlines = newsfeed;
} else {
  headlines = [];
}

const got_headlines = headlines.length == count_headlines;

let common = [];
try {
  if (process.client) {
    common = await fp_common_issues();
  }
} catch (e) {
  console.log(e);
}

const got_common = common.length == count_common;

let solved = [];
try {
  if (process.client) {
    solved = await fp_solved_issues();
  }
} catch (e) {
  console.log(e);
}

const got_solved = solved.length == count_solved;

// https://stackoverflow.com/a/71210364 (CC BY-SA 4.0)
const get_width = () => {
  let width = ref(window.innerWidth);

  const onWidthChange = () => (width.value = window.innerWidth);

  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  return computed(() => width.value);
};

let width = 0;
if (process.client) {
  width = get_width();
}

// https://tailwindcss.com/docs/responsive-design
const width_2xl = 1536;
</script>

<template>
  <div class="bg-fp-gray-lightest dark:bg-neutral-900">
    <div class="mx-8 flex gap-8 py-8">
      <ClientOnly>
        <div class="hidden w-[22em] max-w-[25vw] flex-none xl:block">
          <div class="mb-6 rounded-2xl bg-white p-4 dark:bg-gray-700">
            <h2 class="mb-8 text-2xl leading-none">
              <a
                href="https://docs.fedoraproject.org/en-US/fedora/latest/"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >{{ $t(user_documentation.sectionTitle) }}</a
              >
            </h2>
            <div v-for="d in user_documentation.content" class="mb-6">
              <div class="flex items-center">
                <a :href="d.link.url" class="flex-none"
                  ><Icon name="fa6-solid:book" size="48" class="text-fp-blue"
                /></a>
                <a
                  :href="d.link.url"
                  class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-6 rtl:mr-6"
                  >{{ d.link.text }}</a
                >
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-4 dark:bg-gray-700" dir="ltr">
            <h2 class="mb-8 text-2xl leading-none">
              <a
                :href="`${discourse_uri}/${common_query}`"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >Common Issues</a
              >
            </h2>
            <div v-for="i in common" class="mb-6">
              <div class="ml-2 flex items-center">
                <a :href="i.link" class="flex-none p-2"
                  ><Icon name="fa6-solid:wrench" size="32" class="text-fp-blue"
                /></a>
                <a
                  :href="i.link"
                  class="ml-4 max-h-12 overflow-hidden text-base font-semibold"
                  >{{ i.title }}</a
                >
              </div>
            </div>
            <div class="whitespace-no-wrap text-right">
              <span class="text-base/4text-gray-400 font-semibold"
                >{{ $t("From") }}
                <a href="https://ask.fedoraproject.org/" class="text-fp-newblue"
                  >ask​.​fedoraproject​.​org</a
                ></span
              >
            </div>
          </div>
        </div>
      </ClientOnly>
      <div class="mx-auto max-w-screen-xl flex-initial">
        <div class="flex justify-center pb-12">
          <form
            class="max-h-[2em]"
            method="get"
            id="search"
            action="https://duckduckgo.com/"
          >
            <input
              class="w-full rounded-2xl bg-white py-2 font-semibold leading-[2em] ltr:pl-6 rtl:pr-6 dark:bg-gray-700 dark:text-gray-100 sm:text-2xl"
              type="text"
              name="q"
              maxlength="300"
              :placeholder="t('Search with DuckDuckGo')"
            />
            <input type="submit" value="Search" style="visibility: hidden" />
          </form>
        </div>
        <ClientOnly>
          <div v-if="got_headlines">
            <h2 class="mb-2 px-4 text-2xl font-semibold leading-none">
              {{ $t("Latest news and publications from the Fedora Project") }}:
            </h2>
            <div class="flex flex-wrap" dir="ltr">
              <div
                v-for="h in width < width_2xl
                  ? headlines.slice(0, count_headlines_narrow)
                  : headlines"
                class="mb-4 w-full p-4 md:w-1/2 2xl:w-1/3"
              >
                <div>
                  <a :href="h.link">
                    <img :src="h.thumbnail" class="w-full rounded-lg" />
                  </a>
                </div>
                <div class="text-base leading-8 text-gray-500">
                  {{ h.date }}
                </div>
                <div class="max-h-[5.25rem] overflow-hidden">
                  <a
                    :href="h.link"
                    class="align-top text-xl font-semibold text-fp-blue"
                    >{{ h.title }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6 rounded-2xl bg-white p-6 dark:bg-gray-700 xl:hidden">
            <h2 class="mb-8 text-2xl leading-none">
              <a
                :href="`${discourse_uri}/${common_query}`"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >Common Issues</a
              >
            </h2>
            <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div v-for="i in common">
                <div class="flex items-center ltr:ml-2 rtl:mr-2">
                  <a :href="i.link" class="flex-none p-2"
                    ><Icon
                      name="fa6-solid:wrench"
                      size="32"
                      class="text-fp-blue"
                  /></a>
                  <a
                    :href="i.link"
                    class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-4 rtl:mr-4"
                    >{{ i.title }}</a
                  >
                </div>
              </div>
            </div>
            <div class="whitespace-no-wrap text-right">
              <span class="text-base/4text-gray-400 font-semibold"
                >{{ $t("From") }}
                <a href="https://ask.fedoraproject.org/" class="text-fp-newblue"
                  >ask​.​fedoraproject​.​org</a
                ></span
              >
            </div>
          </div>
          <div class="mb-6 rounded-2xl bg-white p-6 dark:bg-gray-700 xl:hidden">
            <h2 class="mb-8 text-2xl leading-none">
              <a
                :href="`${discourse_uri}/search?${solved_query}`"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >{{ $t("Latest Solved Issues") }}</a
              >
            </h2>
            <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div v-for="s in solved">
                <div class="flex items-center">
                  <a :href="s.link" class="flex-none"
                    ><img
                      :src="s.avatar"
                      class="h-12 w-12 rounded object-cover"
                  /></a>
                  <a
                    :href="s.link"
                    class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-6 rtl:mr-6"
                    >{{ s.title }}</a
                  >
                </div>
              </div>
            </div>
            <div class="whitespace-no-wrap text-right">
              <span class="text-base/4text-gray-400 font-semibold"
                >{{ $t("From") }}
                <a href="https://ask.fedoraproject.org/" class="text-fp-newblue"
                  >ask​.​fedoraproject​.​org</a
                ></span
              >
            </div>
          </div>
          <div
            class="mb-6 rounded-2xl bg-white p-6 dark:bg-gray-700 xl:hidden"
            dir="ltr"
          >
            <h2 class="text-2xl leading-none">
              <a
                href="https://communityblog.fedoraproject.org/"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >Fedora Community Blog</a
              >
              <p class="mb-6 font-semibold text-fp-newblue">
                ({{ $t("news for project contributors") }})
              </p>
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div v-for="p in commblog" class="mb-6">
                <div class="flex items-center ltr:ml-2 rtl:mr-2">
                  <a :href="p.link" class="flex-none p-2"
                    ><Icon
                      name="fa6-solid:feather-pointed"
                      size="32"
                      class="text-fp-blue"
                  /></a>
                  <a
                    :href="p.link"
                    class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-4 rtl:mr-4"
                    >{{ p.title }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white p-6 dark:bg-gray-700 xl:hidden">
            <h2 class="mb-8 text-2xl leading-none">
              <a
                href="https://docs.fedoraproject.org/en-US/fedora/latest/"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >{{ $t(user_documentation.sectionTitle) }}</a
              >
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div v-for="d in user_documentation.content">
                <div class="flex items-center">
                  <a :href="d.link.url" class="flex-none"
                    ><Icon name="fa6-solid:book" size="48" class="text-fp-blue"
                  /></a>
                  <a
                    :href="d.link.url"
                    class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-6 rtl:mr-6"
                    >{{ d.link.text }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- the fallback template is shown when the client has javascript disabled -->
          <template #fallback>
            <div class="rounded-2xl bg-white p-6 dark:bg-gray-700">
              <h2 class="mb-8 text-2xl leading-none">
                <a
                  href="https://docs.fedoraproject.org/en-US/fedora/latest/"
                  class="text-2xl font-semibold leading-none text-fp-newblue"
                  >{{ $t(user_documentation.sectionTitle) }}</a
                >
              </h2>
              <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div v-for="d in user_documentation.content">
                  <div class="flex items-center">
                    <a :href="d.link.url" class="flex-none"
                      ><Icon
                        name="fa6-solid:book"
                        size="48"
                        class="text-fp-blue"
                    /></a>
                    <a
                      :href="d.link.url"
                      class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-6 rtl:mr-6"
                      >{{ d.link.text }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
      <ClientOnly>
        <div class="hidden w-[22em] max-w-[25vw] flex-none xl:block">
          <div class="mb-6 rounded-2xl bg-white p-4 dark:bg-gray-700">
            <h2 class="mb-8 text-2xl leading-none">
              <a
                href="https://www.youtube.com/playlist?list=PL0x39xti0_64uSci6Wqk_E-IMSyq6vEuE"
                target="_blank"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >{{ $t("Latest Council Video") }}</a
              >
            </h2>
            <div class="mb-6 grid place-items-center">
              <iframe
                type="text/html"
                src="/council-video.html"
                frameborder="0"
                class="h-[9em] w-[16em]"
              >
              </iframe>
            </div>
          </div>
          <div class="mb-6 rounded-2xl bg-white p-4 dark:bg-gray-700">
            <h2 class="mb-8 text-2xl leading-none">
              <a
                :href="`${discourse_uri}/search?${solved_query}`"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >{{ $t("Latest Solved Issues") }}</a
              >
            </h2>
            <div v-for="s in solved" class="mb-6">
              <div class="flex items-center">
                <a :href="s.link" class="flex-none"
                  ><img :src="s.avatar" class="h-12 w-12 rounded object-cover"
                /></a>
                <a
                  :href="s.link"
                  class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-6 rtl:mr-6"
                  >{{ s.title }}</a
                >
              </div>
            </div>
            <div class="whitespace-no-wrap text-right">
              <span class="text-base/4text-gray-400 font-semibold"
                >{{ $t("From") }}
                <a href="https://ask.fedoraproject.org/" class="text-fp-newblue"
                  >ask​.​fedoraproject​.​org</a
                ></span
              >
            </div>
          </div>
          <div class="rounded-2xl bg-white p-4 dark:bg-gray-700" dir="ltr">
            <h2 class="text-2xl leading-none">
              <a
                href="https://communityblog.fedoraproject.org/"
                class="text-2xl font-semibold leading-none text-fp-newblue"
                >Fedora Community Blog</a
              >
              <p class="mb-6 font-semibold text-fp-newblue">
                ({{ $t("news for project contributors") }})
              </p>
            </h2>
            <div v-for="p in commblog" class="mb-6">
              <div class="flex items-center ltr:ml-2 rtl:mr-2">
                <a :href="p.link" class="flex-none p-2"
                  ><Icon
                    name="fa6-solid:feather-pointed"
                    size="32"
                    class="text-fp-blue"
                /></a>
                <a
                  :href="p.link"
                  class="max-h-12 overflow-hidden text-base font-semibold ltr:ml-4 rtl:mr-4"
                  >{{ p.title }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>

  <FpPublicationSection class="bg-fp-gray-lightest dark:bg-neutral-900" />

  <FpCommunicationSection
    color="magenta"
    :sectionTitle="comm_channels.sectionTitle"
    :content="comm_channels.content"
  />
</template>
