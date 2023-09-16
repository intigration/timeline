<script setup>
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const data = await getCMS("editions/coreos/releasenotes");
const baseProdUrl = "https://builds.coreos.fedoraproject.org";

let selectedStream = useState("stream", () => "stable");
let selectedArch = useState("arch", () => "x86_64");

let buildsList = useState("buildsList", () => ({}));
let buildsDetails = useState("buildsDetails", () => ({}));

const importantPkgs = [
  "kernel",
  "systemd",
  "rpm-ostree",
  "ignition",
  "podman",
  "moby-engine",
  "containerd",
];

async function switchStream(stream) {
  selectedStream.value = stream;
  // Fetch build list & release notes if not yet cached
  if (!buildsList.value[stream]) {
    try {
      const buildUrl = `${baseProdUrl}/prod/streams/${stream}/releases.json`;
      const buildsrq = await $fetch(buildUrl, {
        key: "buildsrq",
        server: false,
        watch: false,
      });
      const notesUrl = `${baseProdUrl}/release-notes/${stream}.json`;
      const notesrq = await $fetch(notesUrl, {
        key: `notesrq-${stream}`,
        server: false,
        watch: false,
      });
      buildsList.value[stream] = {
        builds: buildsrq.releases
          .map((release) => ({
            id: release.version,
            arches: release.commits.map((arch) => arch.architecture),
          }))
          .reverse(),
        releases: notesrq.releases,
      };
    } catch (e) {
      console.log(e);
    }
  }

  // Update URL parameters
  router.replace({
    hash: route.hash,
    path: route.path,
    query: { ...route.query, ...{ stream: stream } },
  });

  // Preload first 3 builds for this stream/arch
  preloadBuild();

  // Update stream selector on DOM
  window.requestAnimationFrame(() => {
    if (document) {
      Array.from(
        document.querySelectorAll(".coreos-stream .coreos-selector a")
      ).forEach(function (el) {
        el.classList.remove("active");
      });
      document.getElementById(stream)?.classList.add("active");
    }
  });
}

function switchArch(arch) {
  selectedArch.value = arch;

  // Update URL parameters
  router.replace({
    hash: route.hash,
    path: route.path,
    query: { ...route.query, ...{ arch: arch } },
  });

  // Preload first 3 builds for this stream/arch
  preloadBuild();

  // Update arch selector on DOM
  window.requestAnimationFrame(() => {
    if (document) {
      Array.from(
        document.querySelectorAll(".coreos-arch .coreos-selector a")
      ).forEach(function (el) {
        el.classList.remove("active");
      });
      document.getElementById(arch)?.classList.add("active");
    }
  });
}

function preloadBuild(nb = 3) {
  if (buildsList.value[selectedStream.value]?.builds) {
    for (var i = 0; i < nb; i++) {
      loadBuild(buildsList.value[selectedStream.value].builds[i].id);
    }
  }
}

async function loadBuild(id) {
  if (!buildsDetails.value[selectedArch.value]) {
    buildsDetails.value[selectedArch.value] = {};
  }
  if (!buildsDetails.value[selectedArch.value][id]) {
    const metaUrl = `${baseProdUrl}/prod/streams/${selectedStream.value}/builds/${id}/${selectedArch.value}/meta.json`;
    const { data: build_data } = await useFetch(metaUrl);
    const commitmetaUrl = `${baseProdUrl}/prod/streams/${selectedStream.value}/builds/${id}/${selectedArch.value}/commitmeta.json`;
    const { data: meta_data } = await useFetch(commitmetaUrl);
    buildsDetails.value[selectedArch.value][id] = {
      meta: build_data.value,
      commitmeta: meta_data.value,
    };
    parsePkgs(id);
  }
}

function parsePkgs(id) {
  if (!buildsDetails.value[selectedArch.value][id]["pkglist"]) {
    buildsDetails.value[selectedArch.value][id]["pkglist"] = [];
    buildsDetails.value[selectedArch.value][id]["commitmeta"][
      "rpmostree.rpmdb.pkglist"
    ].forEach((pkg) => {
      if (importantPkgs.includes(pkg[0])) {
        buildsDetails.value[selectedArch.value][id]["pkglist"].push(pkg);
      }
    });
  }
}

function prettyDateTime(ts) {
  const date = new Date(ts);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

  return `${month} ${day}, ${year}`;
}

function parseArgs() {
  // stream param
  if (!route.query.stream) {
    // default to stable stream
    switchStream("stable");
  } else if (route.query.stream.match("^(stable|testing|next)$")) {
    switchStream(route.query.stream);
  }
  // arch param
  if (!route.query.arch) {
    // default to x86_64 arch
    switchArch("x86_64");
  } else if (route.query.arch.match("^(x86_64|aarch64|s390x)$")) {
    switchArch(route.query.arch);
  }
}

onMounted(() => {
  parseArgs();
});
useContentHead(data);
</script>

<template>
  <main class="border-t-8 border-fp-magenta dark:bg-neutral-800 md:mt-1">
    <header>
      <TheLocalBar
        :image="{
          light: 'assets/images/fedora-coreos-logo-light.png',
          dark: 'assets/images/fedora-coreos-logo.png',
        }"
        home="/coreos"
        :items="[
          { name: 'Download', link: '/coreos/download' },
          { name: 'Community', link: '/coreos/community' },
        ]"
        textColor="text-fp-magenta"
      />
    </header>
    <section class="py-12 px-2 text-center lg:text-start">
      <div class="container mx-auto max-w-7xl px-2">
        <h1 class="mb-4 text-4xl text-gray-600 dark:text-gray-200">
          <span class="text-fp-magenta">Fedora CoreOS </span>
          {{ $t("Release Notes") }}
        </h1>
        <p class="text-fp-gray">{{ data.description }}</p>
      </div>
    </section>
    <!-- Mini stream selector -->
    <section class="scroll-mt-14 bg-blue-50 py-2 px-2 dark:bg-neutral-900">
      <div class="coreos-stream container mx-auto max-w-7xl px-2">
        <div class="mx-auto px-24 pb-4">
          <div
            class="coreos-selector flex flex-wrap justify-between gap-4 text-center text-fp-darkblue-500 dark:text-white"
          >
            <a
              id="stable"
              class="active"
              href="#"
              @click="switchStream('stable')"
            >
              <FpCard title="stable"> </FpCard>
            </a>
            <a id="testing" href="#" @click="switchStream('testing')">
              <FpCard title="testing"> </FpCard>
            </a>
            <a id="next" href="#" @click="switchStream('next')">
              <FpCard title="next"> </FpCard>
            </a>
          </div>
        </div>
      </div>

      <!-- Mini arch selector -->
      <div class="coreos-arch container mx-auto max-w-7xl px-2">
        <div class="mx-auto px-24 pb-4">
          <div
            class="coreos-selector flex flex-wrap justify-between gap-4 text-center text-fp-darkblue-500 dark:text-white"
          >
            <a
              id="x86_64"
              class="active"
              href="#"
              @click="switchArch('x86_64')"
            >
              <FpCard title="x86_64"> </FpCard>
            </a>
            <a id="aarch64" href="#" @click="switchArch('aarch64')">
              <FpCard title="aarch64"> </FpCard>
            </a>
            <a id="s390x" href="#" @click="switchArch('s390x')">
              <FpCard title="s390x"> </FpCard>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Release notes -->
    <section class="scroll-mt-14 bg-blue-50 py-6 px-2 dark:bg-neutral-800">
      <div
        class="container mx-auto grid max-w-max divide-y divide-dotted divide-fp-gray text-fp-gray-600 dark:text-fp-gray-200"
      >
        <template v-if="buildsList[selectedStream]?.builds">
          <template v-for="build in buildsList[selectedStream]?.builds">
            <div v-if="build.arches.includes(selectedArch)" class="py-8">
              <FpObserver @intersect="loadBuild(build.id)" />
              <h3
                class="pb-3 text-center text-fp-blue dark:text-fp-newblue sm:text-start"
              >
                {{ build.id }}
              </h3>
              <template v-if="buildsDetails[selectedArch]?.[build.id]">
                <div class="mb-4 flex gap-2">
                  <div class="">Release Date:</div>
                  <div
                    v-if="buildsDetails[selectedArch]?.[build.id]"
                    class="font-bold"
                  >
                    {{
                      prettyDateTime(
                        buildsDetails[selectedArch]?.[build.id]?.["meta"]?.[
                          "coreos-assembler.build-timestamp"
                        ]
                      )
                    }}
                  </div>

                  <div v-else class="animate-pulse">
                    <div class="grid grid-cols-6 gap-4">
                      <div
                        class="col-span-2 h-6 w-full rounded bg-gray-200 dark:bg-gray-500"
                      ></div>
                      <div
                        class="h-6 w-full rounded bg-gray-200 dark:bg-gray-500"
                      ></div>
                      <div
                        class="col-span-3 h-6 w-full rounded bg-gray-200 dark:bg-gray-500"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="mb-4 flex flex-wrap items-baseline gap-x-1">
                  <div
                    v-if="
                      buildsList[selectedStream]?.releases[build.id]?.issues
                        .length === 0
                    "
                  >
                    No specific issues fixed in this release.
                  </div>
                  <div
                    v-else-if="
                      buildsList[selectedStream]?.releases[build.id]?.issues
                        .length
                    "
                  >
                    <div class="font-bold">Issues fixed:</div>
                    <ul class="ml-8 list-[square]">
                      <li
                        v-for="issue in buildsList[selectedStream]?.releases[
                          build.id
                        ]?.issues"
                        class="text-base"
                      >
                        <a
                          :href="issue.url"
                          class="text-sm underline underline-offset-1"
                          target="_blank"
                          >{{ issue.text }}</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div v-else class="font-bold">
                    Release notes for this release are still pending review.
                  </div>
                </div>
                <div class="flex flex-wrap items-baseline gap-x-4">
                  <div
                    v-for="pkg in buildsDetails[selectedArch]?.[build.id]?.[
                      'pkglist'
                    ]"
                  >
                    {{ pkg[0] }} <b>{{ pkg[2] }}</b>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-full animate-pulse lg:w-[962px]">
                  <div class="mb-4 grid grid-cols-6 gap-4">
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                  </div>
                  <div class="mb-2 grid grid-cols-6 gap-4">
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                  </div>
                  <div class="mb-2 ml-10 grid grid-cols-6 gap-4">
                    <div
                      class="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                  </div>
                  <div class="mb-2 ml-10 grid grid-cols-6 gap-4">
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                  </div>
                  <div class="mb-4 ml-10 grid grid-cols-6 gap-4">
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                  </div>
                  <div class="grid grid-cols-12 gap-4">
                    <div
                      class="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                    <div
                      class="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-500"
                    ></div>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="mx-auto mt-8 text-center">
            <Icon
              name="ei:spinner-3"
              size="64"
              class="animate-spin !align-baseline text-fp-magenta"
            />
          </div>
        </template>
      </div>
    </section>
  </main>
</template>
<style>
.coreos-selector a {
  @apply grow basis-64 border-b-8 border-fp-blue/10 p-2 transition-colors hover:border-fp-newblue-500 dark:hover:border-gray-200;
}

.coreos-selector .active {
  @apply border-fp-blue dark:border-gray-400;
}
</style>
