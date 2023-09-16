<script setup>
const data = await getCMS("editions/coreos/download");
const route = useRoute();
const router = useRouter();
const { data: stable_data } = await useFetch(
  "https://builds.coreos.fedoraproject.org/streams/stable.json",
  {
    server: false,
    onResponse({ request, response, options }) {
      console.log("stable data loaded");
      parseArgs("stable");
    },
  }
);
const { data: test_data } = await useFetch(
  "https://builds.coreos.fedoraproject.org/streams/testing.json",
  {
    server: false,
    onResponse({ request, response, options }) {
      console.log("testing data loaded");
      parseArgs("testing");
    },
  }
);
const { data: next_data } = await useFetch(
  "https://builds.coreos.fedoraproject.org/streams/next.json",
  {
    server: false,
    onResponse({ request, response, options }) {
      console.log("next data loaded");
      parseArgs("next");
    },
  }
);

let selectedStream = useState("stream", () => stable_data);
let selectedArch = useState("arch", () => "x86_64");
let isloaded = useState("isloaded", () => false);
const verifyModal = useState("verifyModal", () => ({ show: false }));
const showAMI = useState("showAMI", () => ({ show: false }));
const showGCP = useState("showGCP", () => ({ show: false }));
const streams = data._value.sections[1];
const architectures = data._value.sections[2];

async function parseArgs(initiator) {
  if (!isloaded.value) {
    if (!route.query.stream) {
      // default to stable stream
      switchStream("stable");
      isloaded.value = true;
    } else if (route.query.stream.match("^(stable|testing|next)$")) {
      if (initiator == route.query.stream) {
        if (route.query.arch) {
          switchArch(route.query.arch);
        }
        switchStream(route.query.stream);
        isloaded.value = true;
      }
    } else {
      console.log("invalid stream");
      switchStream("stable");
      isloaded.value = true;
    }
  }
  // if targeted stream is loaded
  if (isloaded.value & (initiator == route.query.stream)) {
    // scroll to hash
    if (route.hash) {
      // wait for DOM update
      await nextTick();
      // wait for client browser update
      window.requestAnimationFrame(() => {
        let id = route.hash.substring(1);
        if (document.getElementById(id)) {
          // wait 200ms more to make sure the dom is fully loaded
          setTimeout(() => {
            // then scroll
            document.getElementById(id).scrollIntoView();
          }, 200);
        }
      });
    }
  }
}

function switchStream(name) {
  switch (name) {
    case "stable":
      router.replace({
        hash: route.hash,
        path: route.path,
        query: { ...route.query, ...{ stream: "stable" } },
      });
      selectedStream.value = stable_data;
      console.log("switching to stable view");
      break;
    case "testing":
      router.replace({
        hash: route.hash,
        path: route.path,
        query: { ...route.query, ...{ stream: "testing" } },
      });
      selectedStream.value = test_data;
      console.log("switching to testing view");
      break;
    case "next":
      router.replace({
        hash: route.hash,
        path: route.path,
        query: { ...route.query, ...{ stream: "next" } },
      });
      selectedStream.value = next_data;
      console.log("switching to next view");
      break;
  }
  window.requestAnimationFrame(() => {
    if (document) {
      Array.from(document.querySelectorAll(".coreos-stream-sel")).forEach(
        function (el) {
          el.classList.remove("active");
        }
      );
      document.getElementById(name)?.classList.add("active");
    }
  });
}

function switchArch(name) {
  switch (name) {
    case "x86_64":
    case "aarch64":
    case "s390x":
      router.replace({
        hash: route.hash,
        path: route.path,
        query: { ...route.query, ...{ arch: name } },
      });
      selectedArch.value = name;
      window.requestAnimationFrame(() => {
        if (document) {
          Array.from(document.querySelectorAll("#arches .active")).forEach(
            function (el) {
              el.classList.remove("active");
            }
          );
          document.getElementById(name)?.classList.add("active");
        }
      });
      console.log("selected arch: " + name);
      break;
  }
}

function updateVerify(art) {
  verifyModal.value.art_name = art.location.substring(
    art.location.lastIndexOf("/") + 1
  );
  verifyModal.value.signature = art.signature;
  verifyModal.value.checksum = `data:text/plain;charset=utf-8,SHA256 (${encodeURIComponent(
    verifyModal.value.art_name
  )}) = ${art.sha256}`;
  verifyModal.value.sig_name = art.signature.substring(
    art.signature.lastIndexOf("/") + 1
  );
  verifyModal.value.chk_name = `${verifyModal.value.art_name}-CHECKSUM`;
  if (document) {
    document.body.classList.add("has-modal");
  }
  verifyModal.value.show = true;
}

function updateAMIs(art) {
  showAMI.value.art = art;
  if (document) {
    document.body.classList.add("has-modal");
  }
  showAMI.value.show = true;
}

function closeModal(state) {
  if (document) {
    document.body.classList.remove("has-modal");
  }
  state.show = false;
}

function virt_arts(data) {
  let dict = {};
  const virtualizedImages = ["hyperv", "qemu", "virtualbox", "vmware"];
  if (data) {
    for (let k of virtualizedImages) {
      if (k in data) {
        dict[k] = data[k];
      }
    }
  }
  return dict;
}

function metal_arts(data) {
  let dict = { metal: JSON.parse(JSON.stringify(data)) };
  // delete and recreate the 4k key at the end
  // this is to avoid implementing a overly complicated
  // sorting mechanism to get both raw images together.
  if ("4k.raw.xz" in dict.metal.formats) {
    let t = dict.metal.formats["4k.raw.xz"];
    delete dict.metal.formats["4k.raw.xz"];
    dict.metal.formats["4k.raw.xz"] = t;
  }

  return dict;
}

function cloud_arts(data) {
  let dict = {};
  const cloudImages = [
    "aws",
    "azure",
    "azurestack",
    "aliyun",
    "digitalocean",
    "exoscale",
    "gcp",
    "ibmcloud",
    "kubevirt",
    "nutanix",
    "openstack",
    "packet",
    "vultr",
  ];
  if (data) {
    for (let k of cloudImages) {
      dict[k] = data[k];
    }
  }
  return dict;
}

function getMajor(version) {
  return version.split(".")[0];
}

const EC2_regions = {
  "us-east-2": "US East (Ohio)",
  "us-east-1": "US East (N. Virginia)",
  "us-west-1": "US West (N. California)",
  "us-west-2": "US West (Oregon)",
  "af-south-1": "Africa (Cape Town)",
  "ap-east-1": "Asia Pacific (Hong Kong)",
  "ap-south-2": "Asia Pacific (Hyderabad)",
  "ap-southeast-3": "Asia Pacific (Jakarta)",
  "ap-south-1": "Asia Pacific (Mumbai)",
  "ap-northeast-3": "Asia Pacific (Osaka)",
  "ap-northeast-2": "Asia Pacific (Seoul)",
  "ap-southeast-1": "Asia Pacific (Singapore)",
  "ap-southeast-2": "Asia Pacific (Sydney)",
  "ap-northeast-1": "Asia Pacific (Tokyo)",
  "ca-central-1": "Canada (Central)",
  "eu-central-1": "Europe (Frankfurt)",
  "eu-west-1": "Europe (Ireland)",
  "eu-west-2": "Europe (London)",
  "eu-south-1": "Europe (Milan)",
  "eu-west-3": "Europe (Paris)",
  "eu-south-2": "Europe (Spain)",
  "eu-north-1": "Europe (Stockholm)",
  "eu-central-2": "Europe (Zurich)",
  "me-south-1": "Middle East (Bahrain)",
  "me-central-1": "Middle East (UAE)",
  "sa-east-1": "South America (São Paulo)",
};

useHead({ htmlAttrs: { class: "scroll-smooth" } });
useContentHead(data);
</script>
<template>
  <main
    class="border-t-8 border-fp-magenta bg-neutral-100 dark:bg-neutral-800 md:mt-1"
    :class="`coreos-theme-${selectedStream?.stream}`"
  >
    <TheLocalBar
      :image="{
        light: 'assets/images/fedora-coreos-logo-light.png',
        dark: 'assets/images/fedora-coreos-logo.png',
      }"
      home="/coreos"
      textColor="text-fp-magenta"
      :items="[
        { name: 'Download', link: '/coreos/download' },
        { name: 'Community', link: '/coreos/community' },
      ]"
    />

    <!-- TITLE -->
    <section class="py-24 px-2 text-center lg:text-start">
      <div class="container mx-auto max-w-7xl px-2">
        <h1 class="mb-4 text-4xl text-gray-600 dark:text-gray-200">
          {{ $t("Download") }}
          <span class="text-fp-magenta">{{ data.title }}</span>
        </h1>
        <p class="text-gray-600 dark:text-fp-gray-light">
          {{ $t(streams.sectionDescription) }}
        </p>
        <div class="mt-5 flex ltr:-ml-5 rtl:-mr-5" id="ctas">
          <FpLink
            :href="data.sections[0].content[0].link.url"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t(data.sections[0].content[0].title) }}
          </FpLink>
          <FpLink
            :href="data.sections[0].content[1].link.url"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t(data.sections[0].content[1].title) }}
          </FpLink>
          <FpLink
            :href="data.sections[0].content[2].link.url"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t(data.sections[0].content[2].title) }}
          </FpLink>
        </div>

        <!-- STREAMS -->
        <div
          class="container mx-auto mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3"
          v-if="selectedStream && 'architectures' in selectedStream"
        >
          <!-- Stable -->
          <CoreOsStream
            name="Stable"
            v-if="stable_data"
            :version="stable_data.architectures.x86_64.artifacts.metal.release"
            :last_update="stable_data.metadata['last-modified']"
            icon="fa-solid:shield-alt"
            color="fp-blue"
            json_url="https://builds.coreos.fedoraproject.org/streams/stable.json"
          >
            {{ $t(streams.content[0].description) }}
            <template #footer>
              <a
                id="stable"
                @click="switchStream('stable')"
                href="#arches"
                class="coreos-stream-sel"
                >Show Downloads</a
              >
            </template>
            <!-- Testing border-fp-green-700 bg-fp-green-700 -->
          </CoreOsStream>
          <CoreOsStreamLoading v-else />

          <CoreOsStream
            name="Testing"
            v-if="test_data"
            :version="test_data.architectures.x86_64.artifacts.metal.release"
            :last_update="test_data.metadata['last-modified']"
            icon="fa-solid:flask"
            color="fp-green-700"
            json_url="https://builds.coreos.fedoraproject.org/streams/testing.json"
          >
            {{ $t(streams.content[1].description) }}
            <template #footer>
              <a
                id="testing"
                @click="switchStream('testing')"
                href="#arches"
                class="coreos-stream-sel"
                >Show Downloads</a
              >
            </template>
          </CoreOsStream>
          <CoreOsStreamLoading v-else />

          <!-- Next border-fp-orange bg-fp-orange -->
          <CoreOsStream
            name="Next"
            v-if="next_data"
            :version="next_data.architectures.x86_64.artifacts.metal.release"
            :last_update="next_data.metadata['last-modified']"
            icon="fa-solid:layer-group"
            color="fp-orange"
            json_url="https://builds.coreos.fedoraproject.org/streams/next.json"
          >
            {{ $t(streams.content[2].description) }}
            <template #footer>
              <a
                id="next"
                @click="switchStream('next')"
                href="#arches"
                class="coreos-stream-sel"
                >Show Downloads</a
              >
            </template>
          </CoreOsStream>
          <CoreOsStreamLoading v-else />
        </div>
        <div class="mx-auto mt-8 text-center" v-else>
          <Icon
            name="ei:spinner-3"
            size="64"
            class="animate-spin !align-baseline text-fp-magenta"
          />
        </div>
      </div>
    </section>

    <!-- ARCH SELECTOR -->
    <section
      class="scroll-mt-14 bg-blue-50 py-6 px-2 dark:bg-neutral-900"
      id="arches"
      v-if="selectedStream && 'architectures' in selectedStream"
    >
      <div class="container mx-auto max-w-7xl px-2">
        <div class="text-center lg:text-start">
          <h2 class="mb-4 text-fp-blue dark:text-gray-200">
            {{ $t("Pick your") }}
            <span class="text-fp-magenta">{{ $t("architecture") }} </span>
          </h2>
          <p class="text-gray-600 dark:text-fp-gray-light">
            {{ $t(architectures.sectionDescription) }}
          </p>
        </div>
        <div class="mx-auto p-5">
          <div
            class="flex flex-wrap justify-between gap-4 text-center text-fp-darkblue-500 dark:text-white"
          >
            <a
              id="x86_64"
              @click="switchArch('x86_64')"
              href="#download_section"
              class="active"
            >
              <FpCard
                title="x86_64"
                :description="architectures.content[0].description"
                class="coreos-theme"
              >
              </FpCard>
            </a>
            <a
              id="aarch64"
              @click="switchArch('aarch64')"
              href="#download_section"
            >
              <FpCard
                title="aarch64"
                :description="architectures.content[1].description"
                class="coreos-theme"
              >
              </FpCard>
            </a>
            <a id="s390x" @click="switchArch('s390x')" href="#download_section">
              <FpCard
                title="s390x"
                :description="architectures.content[2].description"
                class="coreos-theme"
              >
              </FpCard>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- DOWNLOAD ARTIFACTS -->
    <section
      class="scroll-mt-14 bg-gradient-to-r from-pink-50 to-blue-50 py-6 px-2 dark:bg-neutral-800 dark:bg-none"
      id="download_section"
      v-if="selectedStream && 'architectures' in selectedStream"
    >
      <div
        class="container mx-auto mb-8 max-w-7xl px-2"
        v-if="
          Object.keys(selectedStream.architectures[selectedArch].images)
            .length > 0
        "
      >
        <div class="mb-6 text-center lg:text-start">
          <h2
            class="mb-4 scroll-mt-20 text-fp-blue dark:text-gray-200"
            id="cloud_launch"
          >
            <a class="" href="#cloud_launch">
              <Icon
                name="fa-solid:cloud"
                size="38"
                class="!align-top text-black dark:text-white"
              />
            </a>
            {{ $t("Cloud Launchable") }}
          </h2>
          <p class="text-gray-600 dark:text-fp-gray-light">
            Start Fedora CoreOS
            <span class="coreos-theme-text font-bold">{{
              selectedStream.stream
            }}</span>
            instances on
            <span class="coreos-theme-text font-bold">{{ selectedArch }}</span>
            architecture on public cloud platforms.
          </p>
        </div>
        <div class="container mx-auto max-w-7xl">
          <!-- AMIs & GCP -->
          <div
            class="coreos-theme grid grid-flow-row grid-flow-dense auto-rows-max grid-cols-1 gap-x-8 lg:grid-cols-2"
          >
            <div class="download-section mb-2">
              <FpDownloadItem
                name="Fedora CoreOS"
                type="aws"
                v-if="selectedStream.architectures[selectedArch].images.aws"
              >
                <template #btn>
                  <a
                    title="List AWS EC2 region"
                    class="rounded-xl"
                    @click="
                      updateAMIs(
                        selectedStream.architectures[selectedArch].images.aws
                      )
                    "
                  >
                    <Icon name="fa-solid:th-list" class="!align-baseline" />
                  </a>
                </template>
              </FpDownloadItem>
            </div>
            <div class="download-section mb-2">
              <FpDownloadItem
                name="Fedora CoreOS"
                type="gcp"
                v-if="selectedStream.architectures[selectedArch].images.gcp"
              >
                <template
                  #btn
                  v-for="art in [
                    selectedStream.architectures[selectedArch].images.gcp,
                  ]"
                >
                  <a
                    @click="showGCP.show = !showGCP.show"
                    title="Details"
                    class="ltr:rounded-l-xl rtl:rounded-r-xl"
                  >
                    <Icon name="fa-solid:info-circle" class="!align-baseline" />
                  </a>
                  <FpLink
                    :href="`https://console.cloud.google.com/marketplace/details/${art.project}/${art.family}`"
                    target="blank"
                    title="Launch"
                    class="-ml-px ltr:rounded-r-xl rtl:rounded-l-xl"
                  >
                    <Icon
                      name="material-symbols:rocket-launch"
                      class="!align-baseline"
                    />
                  </FpLink>
                </template>
                <template #footer>
                  <Transition
                    enter-active-class="transform duration-100 ease"
                    enter-from-class="opacity-0 -translate-y-12"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transform duration-150 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-8"
                  >
                    <div
                      class="mt-2 border-t dark:border-gray-600 dark:text-gray-400"
                      v-if="showGCP.show"
                    >
                      <p class="text-sm">
                        Image family:
                        <b class="font-semibold">{{
                          selectedStream.architectures[selectedArch].images.gcp
                            .family
                        }}</b>
                      </p>
                      <p class="text-sm">
                        Latest image:
                        <b class="font-semibold">{{
                          selectedStream.architectures[selectedArch].images.gcp
                            .name
                        }}</b>
                      </p>
                    </div>
                  </Transition>
                </template>
              </FpDownloadItem>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto mb-8 max-w-7xl px-2">
        <div class="mb-6 text-center lg:text-start">
          <h2
            class="mb-4 scroll-mt-20 text-fp-blue dark:text-gray-200"
            id="baremetal"
          >
            <a class="" href="#baremetal">
              <Icon
                name="fa-solid:server"
                size="28"
                class="-mt-4 text-black dark:text-white"
              />
            </a>
            {{ $t("Bare Metal & Virtualized") }}
          </h2>
          <p class="text-gray-600 dark:text-fp-gray-light">
            Download Fedora CoreOS
            <span class="coreos-theme-text font-bold">{{
              selectedStream.stream
            }}</span>
            artifacts for
            <span class="coreos-theme-text font-bold">{{ selectedArch }}</span
            >.
          </p>
        </div>
        <div
          class="container mx-auto grid max-w-7xl grid-flow-row grid-flow-dense auto-rows-max grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <CoreOsDownloadSection
            name="Bare Metal"
            class="coreos-theme row-span-3"
            @verify-click="updateVerify"
            :artifacts="
              metal_arts(
                selectedStream.architectures[selectedArch].artifacts.metal
              )
            "
          />
          <CoreOsDownloadSection
            name="Virtualized"
            class="coreos-theme"
            @verify-click="updateVerify"
            :artifacts="
              virt_arts(selectedStream.architectures[selectedArch].artifacts)
            "
          />
        </div>
      </div>

      <div class="container mx-auto mb-8 max-w-7xl px-2">
        <div class="mb-6 text-center lg:text-start">
          <h2
            class="mb-4 scroll-mt-20 text-fp-blue dark:text-gray-200"
            id="cloud_images"
          >
            <a class="" href="#cloud_images">
              <Icon
                name="uiw:cloud-upload"
                size="38"
                class="!align-top text-black dark:text-white"
              />
            </a>
            {{ $t("Cloud Images") }}
          </h2>
          <p class="text-gray-600 dark:text-fp-gray-light">
            Download Fedora CoreOS
            <span class="coreos-theme-text font-bold">{{
              selectedStream.stream
            }}</span>
            images for
            <span class="coreos-theme-text font-bold">{{ selectedArch }}</span>
            for cloud operators.
          </p>
        </div>
        <div class="container mx-auto max-w-7xl">
          <CoreOsDownloadSection
            :artifacts="
              cloud_arts(selectedStream.architectures[selectedArch].artifacts)
            "
            @verify-click="updateVerify"
            class="coreos-theme grid grid-flow-row grid-flow-dense auto-rows-max grid-cols-1 gap-x-8 lg:grid-cols-2"
          />
        </div>
      </div>
      <div class="container mx-auto max-w-7xl">
        <p class="text-end ltr:mr-4 rtl:ml-4">
          <a class="text-xs" href="#">Back to Top</a>
        </p>
      </div>
    </section>

    <section class="bg-white py-8 px-4 dark:bg-neutral-900">
      <CoreOsVerifySection />
    </section>

    <section class="bg-blue-50 py-12 px-4 dark:bg-neutral-800">
      <BecomeContributorSection />
    </section>

    <section class="py-12 px-4 dark:bg-black">
      <DownloadComplianceSection />
    </section>

    <Transition
      enter-active-class="transform duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-30"
      leave-active-class="transform duration-200 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <FpModal
        class="pt-12"
        v-if="verifyModal.show"
        @close-modal="closeModal(verifyModal)"
      >
        <template #header>
          <h5 class="text-xl font-medium ltr:text-left rtl:text-right">
            {{ $t("Verify your download") }}
          </h5>
        </template>
        <p class="text-base ltr:text-left rtl:text-right">
          {{
            $t(
              "Verify your download for security and integrity using the proper checksum and signature file. If there is a good signature from one of the Fedora keys, and the SHA256 checksum matches, then the download is valid."
            )
          }}
        </p>
        <ul
          class="list-outside list-decimal pt-2 ltr:pl-8 ltr:text-left rtl:pr-8 rtl:text-right"
        >
          <li>
            <p class="mb-2">
              Download the
              <a
                class="text-fp-blue"
                :href="verifyModal.checksum"
                :download="verifyModal.chk_name"
                >checksum file</a
              >
              and
              <a class="text-fp-blue" :href="verifyModal.signature"
                >signature</a
              >
              into the same directory as the image you downloaded.
            </p>
          </li>
          <li>
            <p class="mb-2">{{ $t("Import Fedora's GPG key(s)") }}</p>
            <pre
              class="mb-1 bg-slate-100 px-4 text-sm text-gray-800 dark:bg-slate-800 dark:text-gray-300"
            ><code>curl -O https://fedoraproject.org/fedora.gpg</code></pre>
            <p class="mb-4 text-sm">
              <Icon name="fa-solid:info-circle" class="mx-2 !align-sub" />

              {{ $t("You can verify the details of the GPG key(s)") }}
              <FpLink class="text-sm text-fp-blue" href="/security">here</FpLink
              >.
            </p>
          </li>
          <li>
            <p class="mb-2">{{ $t("Verify the signature file is valid") }}</p>
            <pre
              class="mb-4 bg-slate-100 px-4 text-sm text-gray-800 dark:bg-slate-800 dark:text-gray-300"
            ><code>gpgv --keyring ./fedora.gpg {{ verifyModal.sig_name }} {{ verifyModal.art_name }}</code></pre>
          </li>
          <li>
            <p class="mb-2">{{ $t("Verify the checksum matches") }}</p>
            <pre
              class="mb-4 bg-slate-100 px-4 text-sm text-gray-800 dark:bg-slate-800 dark:text-gray-300"
            ><code>sha256sum -c {{ verifyModal.chk_name }}</code></pre>
          </li>
        </ul>
        <p class="ltr:text-left rtl:text-right">
          {{
            $t(
              "If the output states that the file is valid, then it's ready to use!"
            )
          }}
        </p>
      </FpModal>
    </Transition>
    <Transition
      enter-active-class="transform duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-30"
      leave-active-class="transform duration-200 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <FpModal
        class="pt-12"
        v-if="showAMI.show"
        @close-modal="closeModal(showAMI)"
      >
        <template #header>
          <h5 class="text-xl font-medium ltr:text-left rtl:text-right">
            Select AWS EC2 region
          </h5>
        </template>
        <table class="w-full table-auto ltr:text-left rtl:text-right">
          <thead>
            <tr>
              <th class="">Region</th>
              <th class="hidden sm:block">AMI ID</th>
              <th class="text-center">Launch instance</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ami, region) in showAMI.art.regions"
              class="hover:bg-gray-200 hover:dark:bg-slate-800"
            >
              <td class="ltr:pr-6 rtl:pl-6">
                {{ EC2_regions[region] || region }}
              </td>
              <td class="hidden ltr:pr-6 rtl:pl-6 sm:block">{{ ami.image }}</td>
              <td class="text-center">
                <FpLink
                  :href="`https://console.aws.amazon.com/ec2/home?region=${region}#launchAmi=${ami.image}`"
                  target="blank"
                  :title="`Launch in ${region}`"
                  class="rounded-xl"
                >
                  <Icon
                    name="material-symbols:rocket-launch"
                    class="!align-baseline"
                  />
                </FpLink>
              </td>
            </tr>
          </tbody>
        </table>
      </FpModal>
    </Transition>
  </main>
</template>

<style>
body.has-modal {
  @apply overflow-hidden;
}

.coreos-theme-stable .coreos-theme-text,
.coreos-theme-stable .fp-card.coreos-theme h3 {
  @apply text-fp-blue-900 dark:text-fp-blue-500;
}

.coreos-theme-testing .coreos-theme-text,
.coreos-theme-testing .fp-card.coreos-theme h3 {
  @apply text-fp-green-900 dark:text-fp-green-700;
}

.coreos-theme-next .coreos-theme-text,
.coreos-theme-next .fp-card.coreos-theme h3 {
  @apply text-fp-orange-900 dark:text-fp-orange-700;
}

.coreos-theme-stable .coreos-theme .fp-download-item a {
  @apply border-fp-blue-900 hover:bg-fp-blue-900 hover:text-white dark:border-fp-blue-500 hover:dark:bg-fp-blue-500 hover:dark:text-white;
  @apply text-fp-blue-900 dark:text-fp-blue-500;
}

.coreos-theme-testing .coreos-theme .fp-download-item a {
  @apply border-fp-green-900 hover:bg-fp-green-900 hover:text-white dark:border-fp-green-700 hover:dark:bg-fp-green-700 hover:dark:text-white;
  @apply text-fp-green-900 dark:text-fp-green-700;
}

.coreos-theme-next .coreos-theme .fp-download-item a {
  @apply border-fp-orange-900 hover:bg-fp-orange-900 hover:text-white dark:border-fp-orange-700 hover:dark:bg-fp-orange-900 hover:dark:text-white;
  @apply text-fp-orange-900 dark:text-fp-orange-700;
}

a.coreos-stream-sel {
  @apply mx-auto mb-4 border-b-8 border-fp-blue/10 py-1 px-6 text-sm font-bold text-black transition hover:border-fp-newblue-500 dark:text-white dark:hover:border-gray-200;
}

a.coreos-stream-sel.active {
  @apply border-fp-blue dark:border-gray-400;
}

#arches a {
  @apply grow basis-64 border-b-8 border-fp-blue/10 p-2 transition-colors hover:border-fp-newblue-500 dark:hover:border-gray-200;
}

#arches .active {
  @apply border-fp-blue dark:border-gray-400;
}
</style>
