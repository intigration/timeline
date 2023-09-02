<script setup>
const data = await getCMS("editions/workstation/download");
const release_data = await getCMS("release");

// TODO: fallback to n-1 version if metadata are not yet available
// Alt location:
// https://kojipkgs.fedoraproject.org/compose/${release_data._value.ga.releasever}/latest-Fedora-${release_data._value.ga.releasever}/compose/metadata/
// https://dl.fedoraproject.org/pub/alt/stage/${release_data._value.ga.releasever}_RC-${release_data._value.ga.rc_version}/metadata/
// Final location should be:
// https://dl.fedoraproject.org/pub/fedora/linux/releases/37/metadata
/* 
const { data: ga_data } = await useFetch(
  `https://dl.fedoraproject.org/pub/alt/stage/${release_data._value.ga.releasever}_RC-${release_data._value.ga.rc_version}/metadata/images.json`
);
*/
const { data: ga_data } = await useFetch(
  `https://kojipkgs.fedoraproject.org/compose/${release_data._value.ga.releasever}/latest-Fedora-${release_data._value.ga.releasever}/compose/metadata/images.json`
);
const { data: beta_data } = await useFetch(
  `https://dl.fedoraproject.org/pub/alt/stage/${release_data._value.beta.releasever}_Beta-${release_data._value.beta.rc_version}/metadata/images.json`
);

const betaSwitch = useState("betaSwitch", () => false);
const verifyModal = useState("verifyModal", () => ({ show: false }));

// for checksums
const dlpath = {
  x86_64: "https://download.fedoraproject.org/pub/fedora/linux/releases",
  aarch64: "https://download.fedoraproject.org/pub/fedora/linux/releases",
  s390x: "https://download.fedoraproject.org/pub/fedora-secondary/releases",
  ppc64le: "https://download.fedoraproject.org/pub/fedora-secondary/releases",
};

function updateVerify(art) {
  console.log(art);
  verifyModal.value.art_name = art.path.substring(
    art.path.lastIndexOf("/") + 1
  );
  let path = art.path.substring(0, art.path.lastIndexOf("/"));
  if (betaSwitch.value) {
    // Beta
    verifyModal.value.chk_name = `Fedora-Workstation-${release_data._value.beta.releasever}_Beta-${release_data._value.beta.rc_version}-${art.arch}-CHECKSUM`;
    // Fedora-Workstation-37_Beta-1.5-x86_64-CHECKSUM
    verifyModal.value.checksum = `${dlpath[art.arch]}/test/${
      release_data._value.beta.releasever
    }_Beta/${path}/${verifyModal.value.chk_name}`;
  } else {
    // GA
    verifyModal.value.chk_name = `Fedora-Workstation-${release_data._value.ga.releasever}-${release_data._value.ga.rc_version}-${art.arch}-CHECKSUM`;
    // Fedora-Workstation-37-1.7-x86_64-CHECKSUM
    verifyModal.value.checksum = `${dlpath[art.arch]}/${
      release_data._value.ga.releasever
    }/${path}/${verifyModal.value.chk_name}`;
  }
  if (document) {
    document.body.classList.add("has-modal");
  }
  verifyModal.value.show = true;
}

function closeVerify() {
  if (document) {
    document.body.classList.remove("has-modal");
  }
  verifyModal.value.show = false;
}

useContentHead(data);

// fedora media writer
if (data._value.sections[1].sectionDescription) {
  data._value.sections[1].sectionDescriptionMd = await mdparser(
    data._value.sections[1].sectionDescription
  );
}

// desktop images
if (data._value.sections[2].sectionDescription) {
  data._value.sections[2].sectionDescriptionMd = await mdparser(
    data._value.sections[2].sectionDescription
  );
}
</script>

<template>
  <main
    class="border-t-8 border-fp-green dark:border-fp-green-700 dark:bg-neutral-800 md:mt-1"
  >
    <TheLocalBar
      :image="{
        light: 'assets/images/fedora-workstation-logo-light.png',
        dark: 'assets/images/fedora-workstation-logo.png',
      }"
      home="/workstation"
      textColor="text-fp-green-700"
      :items="[
        { name: 'Download', link: '/workstation/download' },
        { name: 'Community', link: '/workstation/community' },
      ]"
    />

    <!-- TITLE -->
    <section class="px-2 pt-24 pb-8 text-center lg:text-start">
      <div class="container mx-auto max-w-7xl px-2">
        <h1 class="mb-4 text-4xl text-gray-600 dark:text-gray-200">
          {{ $t("Download") }}
          <span class="text-fp-green-700" v-if="betaSwitch == false">
            {{ data.title }} {{ release_data.ga.releasever }}
          </span>
          <span class="text-fp-green-700" v-else>
            {{ data.title }} {{ release_data.beta.releasever }}
            {{ $t("BETA").toLowerCase() }}
          </span>
        </h1>
        <p class="text-gray-600 dark:text-fp-gray-200">
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
            :href="data.sections[0].content[1].link.url"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t(data.sections[0].content[1].title) }}
          </FpLink>
          <FpLink
            :href="`https://docs.fedoraproject.org/en-US/fedora/f${release_data.ga.releasever}/release-notes/`"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t("Release Notes") }}
          </FpLink>
          <FpLink
            :href="data.sections[0].content[2].link.url"
            class="mx-5 text-blue-500"
          >
            <Icon name="fa-book" />
            {{ $t(data.sections[0].content[2].title) }}
          </FpLink>
        </div>
      </div>
    </section>

    <section
      class="bg-gradient-to-r from-green-50 to-blue-50 py-6 px-2 dark:bg-neutral-800 dark:bg-none"
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
          <!-- FEDORA MEDIA WRITER DOWNLOAD -->
          <div class="">
            <div class="flex">
              <div>
                <FpImage :src="data.sections[1].images" />
              </div>
              <div>
                <h3 class="text-fp-newblue-500">
                  {{ $t(data.sections[1].sectionTitle) }}
                </h3>

                <ContentRenderer
                  class="markdown mb-10 text-fp-gray"
                  :value="data.sections[1].sectionDescriptionMd"
                />
              </div>
            </div>
            <div
              v-for="item in data.sections[1].content"
              class="workstation-theme download-section mb-2"
            >
              <FpDownloadItem name="Fedora Media Writer" :format="item.title">
                <template #btn>
                  <FpLink
                    :href="item.link.url"
                    title="Download"
                    class="rounded-xl"
                  >
                    <Icon :name="item.link.text" class="!align-baseline" />
                  </FpLink>
                </template>
              </FpDownloadItem>
            </div>
          </div>

          <!-- DESKTOP IMAGES -->
          <div class="">
            <h3 class="text-fp-newblue-500">
              {{ $t(data.sections[2].sectionTitle) }}
            </h3>

            <ContentRenderer
              class="markdown mb-10 text-fp-gray"
              :value="data.sections[2].sectionDescriptionMd"
            />
            <div v-if="betaSwitch == false && ga_data?.payload">
              <DownloadSection
                name="For Intel and AMD x86_64 systems"
                art_name="Fedora Workstation"
                @verify-click="updateVerify"
                :artifacts="ga_data.payload.images.Workstation.x86_64"
                :dlPrefix="dlpath.x86_64"
                :version="release_data.ga.releasever"
                class="workstation-theme"
              />
              <DownloadSection
                name="For ARM® aarch64 systems"
                art_name="Fedora Workstation"
                @verify-click="updateVerify"
                :artifacts="ga_data.payload.images.Workstation.aarch64"
                :dlPrefix="dlpath.aarch64"
                :version="release_data.ga.releasever"
                class="workstation-theme"
              />
              <DownloadSection
                name="For Power ppc64le systems"
                art_name="Fedora Workstation"
                @verify-click="updateVerify"
                :artifacts="ga_data.payload.images.Workstation.ppc64le"
                :dlPrefix="dlpath.ppc64le"
                :version="release_data.ga.releasever"
                class="workstation-theme"
              />
            </div>
            <!-- Beta Releases -->
            <div v-else-if="betaSwitch == true && beta_data?.payload">
              <DownloadSection
                name="For Intel and AMD x86_64 systems"
                art_name="Fedora Workstation"
                @verify-click="updateVerify"
                :artifacts="beta_data.payload.images.Workstation.x86_64"
                :dlPrefix="dlpath.x86_64"
                :version="release_data.beta.releasever"
                isBeta
                class="workstation-theme"
              />
              <DownloadSection
                name="For ARM® aarch64 systems"
                art_name="Fedora Workstation"
                @verify-click="updateVerify"
                :artifacts="beta_data.payload.images.Workstation.aarch64"
                :dlPrefix="dlpath.aarch64"
                :version="release_data.beta.releasever"
                isBeta
                class="workstation-theme"
              />
              <DownloadSection
                name="For Power ppc64le systems"
                art_name="Fedora Workstation"
                @verify-click="updateVerify"
                :artifacts="beta_data.payload.images.Workstation.ppc64le"
                :dlPrefix="dlpath.ppc64le"
                :version="release_data.beta.releasever"
                isBeta
                class="workstation-theme"
              />
            </div>
            <div v-else>
              <p class="text-center font-bold">
                {{ $t("No files available for this version.") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BUT WAIT THERE'S MORE  -->
    <section class="bg-white py-8 px-4 dark:bg-neutral-900">
      <OtherDownloads />
    </section>

    <!-- SECURITY -->
    <section class="bg-white py-8 px-4 dark:bg-neutral-900">
      <CoreOsVerifySection />
    </section>

    <!-- LAPTOPS PRELOADED -->
    <section class="bg-blue-50 py-24 px-4 dark:bg-neutral-800">
      <div class="container mx-auto grid max-w-7xl grid-cols-2">
        <div
          class="col-span-2 my-5 flex items-center justify-center p-2 md:col-span-1"
        >
          <FpImage class="max-h-72" :src="data.sections[3].content[0].image" />
        </div>
        <div class="col-span-2 my-5 p-2 md:col-span-1">
          <h2 class="mb-5 text-fp-newblue-500">
            {{ $t(data.sections[3].sectionTitle) }}
          </h2>
          <p class="mb-5 text-fp-gray">
            {{ $t(data.sections[3].sectionDescription) }}
          </p>
          <FpBtn :href="data.sections[3].content[0].link.url">{{
            $t(data.sections[3].content[0].link.text)
          }}</FpBtn>
        </div>
      </div>
    </section>

    <!-- LEARN MORE ABOUT FEDORA MEDIA WRITER -->
    <section class="py-24 px-4 dark:bg-neutral-900">
      <div class="container mx-auto grid max-w-7xl grid-cols-2">
        <div class="col-span-2 my-5 p-2 md:col-span-1">
          <h2 class="mb-5 text-fp-newblue-500">
            {{ $t(data.sections[4].sectionTitle) }}
          </h2>
          <p class="text-base text-fp-gray">
            {{ $t(data.sections[4].content[0].description) }}
          </p>
          <p class="mt-5 text-sm text-gray-400">
            {{ $t(data.sections[4].content[1].description) }}
          </p>
        </div>
        <div
          class="col-span-2 my-5 flex items-center justify-center p-2 md:col-span-1"
        >
          <FpImage class="max-h-72" :src="data.sections[4].content[1].image" />
        </div>
      </div>
    </section>

    <!-- CONTRIBUTE -->
    <section class="bg-gray-50 py-12 px-4 dark:bg-neutral-800">
      <BecomeContributorSection />
    </section>

    <!-- COMPLIANCE -->
    <section class="py-12 px-4 dark:bg-black">
      <DownloadComplianceSection />
    </section>

    <!-- Verify pop up -->
    <Transition
      enter-active-class="transform duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-30"
      leave-active-class="transform duration-200 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <FpModal class="pt-12" v-if="verifyModal.show" @close-modal="closeVerify">
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
  </main>
</template>

<style>
.workstation-theme .fp-download-item a {
  @apply border-fp-green-700 text-fp-green-700 hover:bg-fp-green-700 hover:text-white;
  @apply dark:border-fp-green-900 dark:text-fp-green-900 dark:hover:bg-fp-green-900 dark:hover:text-white;
}

.download-section .fp-download-item {
  @apply rounded-xl;
}
</style>
