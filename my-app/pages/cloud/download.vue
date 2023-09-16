<script setup>
const data = await getCMS("editions/cloud/download");
const release_data = await getCMS("release");

// TODO: fallback to n-1 version if metadata are not yet available
const { data: ga_data } = await useFetch(
  `https://kojipkgs.fedoraproject.org/compose/${release_data._value.ga.releasever}/latest-Fedora-${release_data._value.ga.releasever}/compose/metadata/images.json`
);
const { data: beta_data } = await useFetch(
  `https://dl.fedoraproject.org/pub/alt/stage/${release_data._value.beta.releasever}_Beta-${release_data._value.beta.rc_version}/metadata/images.json`
);

const betaSwitch = useState("betaSwitch", () => false);
const verifyModal = useState("verifyModal", () => ({ show: false }));

// Fetch pre-generated Cloud AMIs list
const cloud_ami = await getCMS("editions/cloud/ami_list");
const showAMI = useState("showAMI", () => ({ show: false }));

const dlpath = {
  x86_64: "https://download.fedoraproject.org/pub/fedora/linux/releases",
  aarch64: "https://download.fedoraproject.org/pub/fedora/linux/releases",
  s390x: "https://download.fedoraproject.org/pub/fedora-secondary/releases",
  ppc64le: "https://download.fedoraproject.org/pub/fedora-secondary/releases",
};

// TODO: Define this in a AMI component to be used here and by coreos dl page
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

function updateAMIs(art) {
  showAMI.value.art = art;
  if (document) {
    document.body.classList.add("has-modal");
  }
  showAMI.value.show = true;
}

function updateVerify(art) {
  console.log(art);
  verifyModal.value.art_name = art.path.substring(
    art.path.lastIndexOf("/") + 1
  );
  let path = art.path.substring(0, art.path.lastIndexOf("/"));
  if (betaSwitch.value) {
    // Beta
    verifyModal.value.chk_name = `Fedora-Cloud-${release_data._value.beta.releasever}_Beta-${release_data._value.beta.rc_version}-${art.arch}-CHECKSUM`;
    // Fedora-Cloud-37_Beta-1.5-x86_64-CHECKSUM
    verifyModal.value.checksum = `${dlpath[art.arch]}/test/${
      release_data._value.beta.releasever
    }_Beta/${path}/${verifyModal.value.chk_name}`;
  } else {
    verifyModal.value.chk_name = `Fedora-Cloud-${release_data._value.ga.releasever}-${release_data._value.ga.rc_version}-${art.arch}-CHECKSUM`;
    // Fedora-Cloud-37-1.7-x86_64-CHECKSUM
    verifyModal.value.checksum = `${dlpath[art.arch]}/${
      release_data._value.ga.releasever
    }/${path}/${verifyModal.value.chk_name}`;
  }
  if (document) {
    document.body.classList.add("has-modal");
  }
  verifyModal.value.show = true;
}

function closeModal(state) {
  if (document) {
    document.body.classList.remove("has-modal");
  }
  state.show = false;
}

useContentHead(data);
</script>
<template>
  <main
    class="border-t-8 border-fp-newblue dark:border-fp-newblue-700 dark:bg-neutral-800 md:mt-1"
  >
    <TheLocalBar
      :image="{
        light: 'assets/images/fedora-cloud-logo-light.png',
        dark: 'assets/images/fedora-cloud-logo.png',
      }"
      home="/cloud"
      class="sm:px-2"
      textColor="text-fp-newblue dark:text-fp-newblue-700"
      :items="[
        { name: 'Download', link: '/cloud/download' },
        { name: 'Community', link: '/cloud/community' },
      ]"
    />

    <!-- TITLE -->
    <section class="px-2 pt-24 pb-8 text-center lg:text-start">
      <div class="container mx-auto max-w-7xl px-2">
        <h1 class="mb-4 text-4xl text-gray-600 dark:text-gray-200">
          {{ $t("Download") }}
          <span
            class="text-fp-newblue dark:text-fp-newblue-700"
            v-if="betaSwitch == false"
          >
            {{ data.title }} {{ release_data.ga.releasever }}</span
          >
          <span class="text-fp-newblue dark:text-fp-newblue-700" v-else>
            {{ data.title }} {{ release_data.beta.releasever }}
            {{ $t("BETA").toLowerCase() }}
          </span>
        </h1>
        <p class="text-gray-600 dark:text-fp-gray-light">
          {{ $t(data.description) }}
        </p>
        <div class="mt-5 flex">
          <p
            class="text-sm text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-fp-gray-200"
          >
            {{ $t("RELEASE DATE") }}:
            <span class="font-semibold" v-if="betaSwitch == false">{{
              $d(Number(release_data.ga.release_date), {
                dateStyle: "full",
                timeZone: "UTC",
              })
            }}</span>
            <span class="font-semibold" v-else>{{
              $d(Number(release_data.beta.release_date), {
                dateStyle: "full",
                timeZone: "UTC",
              })
            }}</span>
          </p>
        </div>
        <div class="mt-5 flex ltr:-ml-5 rtl:-mr-5" id="ctas">
          <FpLink
            :href="data.sections[0].content[0].link.url"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t(data.sections[0].content[0].title) }}
          </FpLink>
          <FpLink
            :href="`https://docs.fedoraproject.org/en-US/fedora/f${release_data.ga.releasever}/release-notes/`"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t("Release Notes") }}
          </FpLink>
          <FpLink
            :href="data.sections[0].content[1].link.url"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t(data.sections[0].content[1].title) }}
          </FpLink>
        </div>
      </div>
    </section>

    <!-- DOWNLOAD ARTIFACTS -->
    <section
      class="scroll-mt-14 bg-gradient-to-r from-sky-50 to-blue-50 py-6 px-2 dark:bg-neutral-800 dark:bg-none"
      id="download_section"
    >
      <div
        class="container mx-auto max-w-7xl"
        v-if="release_data.beta.enabled && beta_data"
      >
        <div class="flex items-center justify-end gap-4">
          <p class="text-fp-gray">Show Beta downloads</p>
          <FpSwitch @switchToggled="betaSwitch = $event.target.checked" />
        </div>
        <div class="flex justify-end pb-8">
          <FpJoinTip
            description="Help us with testing!"
            inline="true"
            class="origin-right scale-75"
          />
        </div>
      </div>
      <div class="container mx-auto my-8 max-w-7xl px-2">
        <div
          class="grid grid-flow-row grid-flow-dense auto-rows-max grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <template v-if="betaSwitch == false && ga_data?.payload">
            <DownloadSection
              name="For Intel and AMD x86_64 systems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="ga_data.payload.images.Cloud.x86_64"
              :dlPrefix="dlpath.x86_64"
              :version="release_data.ga.releasever"
              class="cloud-theme"
            >
              <template #extra>
                <div class="download-section mb-2">
                  <FpDownloadItem
                    :name="`Fedora Cloud ${release_data.ga.releasever}`"
                    type="aws"
                    v-if="cloud_ami?.ga?.x86_64"
                  >
                    <template #btn>
                      <a
                        title="List AWS EC2 region"
                        class="rounded-xl"
                        @click="updateAMIs(cloud_ami.ga.x86_64)"
                      >
                        <Icon name="fa-solid:th-list" class="!align-baseline" />
                      </a>
                    </template>
                  </FpDownloadItem>
                </div>
              </template>
            </DownloadSection>

            <DownloadSection
              name="For ARM® aarch64 systems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="ga_data.payload.images.Cloud.aarch64"
              :dlPrefix="dlpath.aarch64"
              :version="release_data.ga.releasever"
              class="cloud-theme"
            >
              <template #extra>
                <div class="download-section mb-2">
                  <FpDownloadItem
                    :name="`Fedora Cloud ${release_data.ga.releasever}`"
                    type="aws"
                    v-if="cloud_ami?.ga?.arm64"
                  >
                    <template #btn>
                      <a
                        title="List AWS EC2 region"
                        class="rounded-xl"
                        @click="updateAMIs(cloud_ami.ga.arm64)"
                      >
                        <Icon name="fa-solid:th-list" class="!align-baseline" />
                      </a>
                    </template>
                  </FpDownloadItem>
                </div>
              </template>
            </DownloadSection>
            <DownloadSection
              name="For Power ppc64le systems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="ga_data.payload.images.Cloud.ppc64le"
              :dlPrefix="dlpath.ppc64le"
              :version="release_data.ga.releasever"
              class="cloud-theme"
            />
            <DownloadSection
              name="For IBM s390x zSystems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="ga_data.payload.images.Cloud.s390x"
              :dlPrefix="dlpath.s390x"
              :version="release_data.ga.releasever"
              class="cloud-theme"
            />
          </template>
          <template v-else-if="betaSwitch == true && beta_data?.payload">
            <DownloadSection
              name="For Intel and AMD x86_64 systems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="beta_data.payload.images.Cloud.x86_64"
              :dlPrefix="dlpath.x86_64"
              :version="release_data.beta.releasever"
              class="cloud-theme"
              isBeta
            >
              <template #extra>
                <div class="download-section mb-2">
                  <FpDownloadItem
                    :name="`Fedora Cloud ${release_data.beta.releasever}`"
                    type="aws"
                    v-if="cloud_ami?.ga?.x86_64"
                    :variants="['beta']"
                  >
                    <template #btn>
                      <a
                        title="List AWS EC2 region"
                        class="rounded-xl"
                        @click="updateAMIs(cloud_ami.beta.x86_64)"
                      >
                        <Icon name="fa-solid:th-list" class="!align-baseline" />
                      </a>
                    </template>
                  </FpDownloadItem>
                </div>
              </template>
            </DownloadSection>

            <DownloadSection
              name="For ARM® aarch64 systems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="beta_data.payload.images.Cloud.aarch64"
              :dlPrefix="dlpath.aarch64"
              :version="release_data.beta.releasever"
              class="cloud-theme"
              isBeta
            >
              <template #extra>
                <div class="download-section mb-2">
                  <FpDownloadItem
                    :name="`Fedora Cloud ${release_data.beta.releasever}`"
                    type="aws"
                    v-if="cloud_ami?.ga?.arm64"
                    :variants="['beta']"
                  >
                    <template #btn>
                      <a
                        title="List AWS EC2 region"
                        class="rounded-xl"
                        @click="updateAMIs(cloud_ami.beta.arm64)"
                      >
                        <Icon name="fa-solid:th-list" class="!align-baseline" />
                      </a>
                    </template>
                  </FpDownloadItem>
                </div>
              </template>
            </DownloadSection>
            <DownloadSection
              name="For Power ppc64le systems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="beta_data.payload.images.Cloud.ppc64le"
              :dlPrefix="dlpath.ppc64le"
              :version="release_data.ga.releasever"
              class="cloud-theme"
              isBeta
            />
            <DownloadSection
              name="For IBM s390x zSystems"
              art_name="Fedora Cloud"
              @verify-click="updateVerify"
              :artifacts="beta_data.payload.images.Cloud.s390x"
              :dlPrefix="dlpath.s390x"
              :version="release_data.ga.releasever"
              class="cloud-theme"
              isBeta
            />
          </template>
          <template v-else>
            <div class="text-center font-bold lg:col-span-2">
              {{ $t("No files available for this version.") }}
            </div>
          </template>
        </div>
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
              "Verify your download for security and integrity using the proper checksum file. If there is a good signature from one of the Fedora keys, and the SHA256 checksum matches, then the download is valid."
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
                target="_blank"
                >checksum file</a
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
            <p class="mb-2">{{ $t("Verify the checksum file is valid") }}</p>
            <pre
              class="mb-4 bg-slate-100 px-4 text-sm text-gray-800 dark:bg-slate-800 dark:text-gray-300"
            ><code>gpgv --keyring ./fedora.gpg {{ verifyModal.chk_name }}</code></pre>
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
              v-for="(ami, region) in showAMI.art"
              class="hover:bg-gray-200 hover:dark:bg-slate-800"
            >
              <td class="ltr:pr-6 rtl:pl-6">
                {{ EC2_regions[region] || region }}
              </td>
              <td class="hidden ltr:pr-6 rtl:pl-6 sm:block">{{ ami }}</td>
              <td class="text-center">
                <FpLink
                  :href="`https://console.aws.amazon.com/ec2/home?region=${region}#launchAmi=${ami}`"
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

.cloud-theme .fp-download-item a {
  @apply border-fp-newblue-500 text-fp-newblue-500 hover:bg-fp-newblue-500 hover:text-white;
  @apply dark:border-fp-newblue-700 dark:text-fp-newblue-700 dark:hover:bg-fp-newblue-700 dark:hover:text-white;
}
</style>
