import locales from "./locales.json";

var ask_fedora;

const navigation = {
  downloads: {
    label: "Get\u00A0Fedora",
    icon: "fa6-solid:download",
    sections: [
      {
        label: "Editions",
        description: "Our flagship Fedora Linux variants for different uses.",
        links: [
          {
            label: "Workstation",
            path: "/workstation",
            icon: "fa6-solid:desktop",
            description:
              "The flagship Fedora edition featuring the latest Gnome desktop. The Linux desktop you've been waiting for.",
          },
          {
            label: "Server",
            path: "/server",
            icon: "fa6-solid:server",
            description:
              "Run applications on bare metal or the cloud with a Linux server OS packed with the latest open source technology.",
          },
          {
            label: "IoT",
            path: "/iot",
            icon: "fa6-solid:microchip",
            description:
              "A foundation for Internet of Things and Device Edge ecosystem.",
          },
          {
            label: "CoreOS",
            path: "/coreos",
            icon: "fa6-solid:circle",
            description:
              "An automatically-updating, minimal operating system for running containerized workloads securely and at scale.",
          },
          {
            label: "Cloud",
            path: "/cloud",
            icon: "fa6-solid:cloud",
            description: "Images optimized to run on cloud infrastructures.",
          },
        ],
      },
      {
        label: "Immutable Desktops",
        description:
          "These editions are supported but not yet a part of the official Fedora editions.",
        links: [
          {
            label: "Silverblue",
            path: "/silverblue",
            icon: "fa6-solid:desktop",
            description:
              "Fedora Silverblue is an immutable desktop operating system aimed at good support for container-focused workflows.",
          },
          {
            label: "Kinoite",
            path: "https://kinoite.fedoraproject.org/",
            icon: "fa6-solid:desktop",
            description: "Fedora Kinoite is an immutable KDE-based desktop.",
          },
          {
            label: "Sericea",
            path: "/sericea",
            icon: "fa6-solid:desktop",
            description: "Fedora Sericea is an immutable Sway-based desktop.",
          },
        ],
      },
      {
        label: "Spins",
        description:
          "The Desktop spins feature specific Linux Desktop Environments. Our official Workstation Edition uses the Gnome Desktop, but you can install Fedora preconfigured with any of the listed Desktop Environments.",
        links: [
          {
            label: "KDE Desktop",
            path: "/spins/kde",
            icon: "fa6-solid:desktop",
            description:
              "A complete, modern desktop built using the KDE Plasma Desktop Environment.",
          },
          {
            label: "XFCE Desktop",
            path: "/spins/xfce/",
            icon: "fa6-solid:desktop",
            description: "A complete and well integrated desktop.",
          },
          {
            label: "Cinnamon Desktop",
            path: "https://spins.fedoraproject.org/cinnamon/",
            icon: "fa6-solid:desktop",
            description:
              "A modern desktop featuring a traditional gnome user experience.",
          },
          {
            label: "Mate-Compiz Desktop",
            path: "https://spins.fedoraproject.org/mate-compiz/",
            icon: "fa6-solid:desktop",
            description:
              "A classic Fedora desktop with an additional 3D window manager.",
          },
          {
            label: "i3 Tiling WM",
            path: "https://spins.fedoraproject.org/i3/",
            icon: "fa6-solid:desktop",
            description: "Fedora Linux with the i3 Tiling Window Manager.",
          },
          {
            label: "LXQT Desktop",
            path: "https://spins.fedoraproject.org/lxqt/",
            icon: "fa6-solid:desktop",
            description:
              "A lightweight and well intgrated LXQT desktop environment.",
          },
          {
            label: "LXDE Desktop",
            path: "https://spins.fedoraproject.org/lxde/",
            icon: "fa6-solid:desktop",
            description:
              "A light, fast, and less resource hungry desktop environment",
          },
          {
            label: "Phosh (Phone Shell)",
            path: "/spins/phosh",
            icon: "fa6-solid:mobile",
            description: "Preview of Fedora for mobile devices",
          },
          {
            label: "Sway Tiling WM",
            path: "/spins/sway",
            icon: "fa6-solid:desktop",
            description: "Fedora Linux with the Sway Tiling Window Manager",
          },
          {
            label: "Budgie Desktop",
            path: "/spins/budgie",
            icon: "fa6-solid:desktop",
            description: "Fedora Linux with the Budgie Desktop",
          },
        ],
      },
      {
        label: "Labs",
        description:
          "The Labs are Fedora Linux set up with software bundles based on particular topics.",
        links: [
          {
            label: "Astronomy",
            path: "https://labs.fedoraproject.org/astronomy/",
            icon: "fa6-solid:desktop",
            description:
              "Powerful, completely open-source and free tools for amateur and professional astronomers.",
          },
          {
            label: "Comp Neuro",
            path: "https://labs.fedoraproject.org/comp-neuro/",
            icon: "fa6-solid:desktop",
            description:
              "A plethora of Free/Open source computational modelling tools for Neuroscience.",
          },
          {
            label: "Design Suite",
            path: "https://labs.fedoraproject.org/design-suite/",
            icon: "fa6-solid:desktop",
            description:
              "Visual design, multimedia production, and publishing suite of free and open source creative tools.",
          },
          {
            label: "Games",
            path: "https://labs.fedoraproject.org/games",
            icon: "fa6-solid:desktop",
            description:
              "A collection and perfect showcase of the best games available in Fedora.",
          },
          {
            label: "Jam",
            path: "https://labs.fedoraproject.org/jam/",
            icon: "fa6-solid:desktop",
            description:
              "For audio enthusiasts and musicians who want to create, edit, and produce audio and music on Linux.",
          },
          {
            label: "Python Classroom",
            path: "https://labs.fedoraproject.org/python-classroom/",
            icon: "fa6-solid:desktop",
            description:
              "A classroom lab for teaching the Python programming language to students.",
          },
          {
            label: "Robotics Suite",
            path: "https://labs.fedoraproject.org/robotics",
            icon: "fa6-solid:desktop",
            description:
              "A wide variety of free and open robotics software packages for beginners and experts.",
          },
          {
            label: "Scientific",
            path: "https://labs.fedoraproject.org/scientific",
            icon: "fa6-solid:desktop",
            description:
              "A bundle of open source scientific and numerical tools used in research.",
          },
          {
            label: "Security Lab",
            path: "https://labs.fedoraproject.org/security",
            icon: "fa6-solid:desktop",
            description:
              "A bundle of open source scientific and numerical tools used in research.",
          },
        ],
      },
    ],
  },
  contributors: {
    label: "Contributors",
    icon: "fa6-solid:user",
    description:
      "These pages connect you to all the different spaces that Fedorans work on projects. From new to long-term contributors, the following links will get you to where you want to go.",
    sections: [
      {
        label: "Accounts & Apps",
        description:
          "These are some of the tools that you will use when contributing to the Fedora Project.",
        links: [
          {
            label: "Fedora Accounts",
            path: "https://accounts.fedoraproject.org/",
            icon: "fa6-brands:fedora",
            description:
              "To be granted access and be credited for your contributions, you will need a Fedora account. Do this first!",
          },
          {
            label: "Mote",
            path: "https://meetbot.fedoraproject.org/",
            icon: "fa6-brands:fedora",
            description:
              "Most subprojects hold weekly meetings in chatrooms. Fedora's Zodbot listens in on these meetings and keeps the logs here.",
          },
          {
            label: "Badges",
            path: "https://badges.fedoraproject.org/",
            icon: "fa6-brands:fedora",
            description:
              "This is where contributors are awarded tokens of recognition for their contributions. How many can you get!",
          },
          {
            label: "Elections",
            path: "https://elections.fedoraproject.org/",
            icon: "fa6-brands:fedora",
            description:
              "Talented leaders are elected to oversee the Fedora Project and Fedora's subprojects.",
          },
          {
            label: "Fedocal",
            path: "https://calendar.fedoraproject.org/",
            icon: "fa6-brands:fedora",
            description: "It's Fedora's calendar!",
          },
          {
            label: "Mailing Lists",
            path: "https://lists.fedoraproject.org/",
            icon: "fa6-brands:fedora",
            description: "Yes, they still exist.",
          },
          {
            label: "Infrastructure Status",
            path: "https://www.fedorastatus.org/",
            icon: "fa6-brands:fedora",
            description:
              "This page lists known and scheduled outages of Fedora Project services.",
          },
          {
            label: "Edit this website",
            path: "https://fedora.gitlab.io/websites-apps/fedora-websites/fedora-websites-3.0/admin/",
            icon: "fa6-solid:pencil",
            description:
              "Edit fedoraproject.org using the content management system! Tip: Use the GitLab SSO link to open a session first.",
          },
        ],
      },
      {
        label: "Packaging & Development",
        description:
          "These are the tools and Git forges that Fedora packagers and developers use to build the Fedora systems.",
        links: [
          {
            label: "Bugzilla",
            path: "https://bugzilla.redhat.com/",
            icon: "fa6-solid:circle",
            description:
              "Fedora Linux bugs are reported to Red Hat's bugzilla.",
          },
          {
            label: "Bodhi",
            path: "https://bodhi.fedoraproject.org/",
            icon: "fa6-solid:circle",
            description:
              "This is Fedora's official build system. It is used to create, test, and publish packages.",
          },
          {
            label: "Koji",
            path: "https://koji.fedoraproject.org/koji/",
            icon: "fa6-solid:circle",
            description:
              "This is the software that builds Fedora's RPM packages.",
          },
          {
            label: "Copr",
            path: "https://copr.fedorainfracloud.org/",
            icon: "fa6-solid:circle",
            description:
              "This is an easy-to-use build system for the Fedora community.",
          },
          {
            label: "GitLab",
            path: "https://gitlab.com/groups/fedora/-/saml/sso",
            icon: "fa6-solid:circle",
            description:
              "GitLab is the newest of Fedora's official version control systems. It supports single-sign-on with Fedora accounts.",
          },
          {
            label: "GitHub",
            path: "https://github.com/",
            icon: "fa6-solid:circle",
            description:
              "Many of Fedora's groups use this version control system.",
          },
          {
            label: "Pagure",
            path: "https://pagure.io/browse/projects/",
            icon: "fa6-solid:circle",
            description:
              "This is an open-source git forge that the Fedora Project uses.",
          },
          {
            label: "Package Sources",
            path: "https://src.fedoraproject.org/browse/projects/",
            icon: "fa6-solid:circle",
            description:
              "This is an open-source git forge that hosts most of Fedora's source RPM packages.",
          },
          {
            label: "Sourcegraph",
            path: "https://sourcegraph.com/search?q=context:global+repo:%5Esrc.fedoraproject.org/&patternType=regexp",
            icon: "fa6-solid:circle",
            description:
              "You can use this to search for things in Fedora's code repositores. See the Fedora Magazine article for more info.",
          },
        ],
      },
      {
        label: "Contributor Guides",
        description:
          "These documentation pages are contributor-focused. They include Fedora's guidelines, teams, organizational structure, and legal docs. If you are looking for user guides (installation, getting started, etc.) check under the Help menu.",
        links: [
          {
            label: "Packaging Guidelines",
            path: "https://docs.fedoraproject.org/en-US/packaging-guidelines/",
            icon: "fa6-solid:book",
            description:
              "Learn about packaging for Fedora Linux — from both a policy and a technical perspective.",
          },
          {
            label: "Engineering Teams",
            path: "https://docs.fedoraproject.org/en-US/engineering/",
            icon: "fa6-solid:book",
            description:
              "Learn about FESCo and Engineering subprojects, SIGs, Work Groups, and teams.",
          },
          {
            label: "Mindshare Teams",
            path: "https://docs.fedoraproject.org/en-US/mindshare-committee/teams/",
            icon: "fa6-solid:book",
            description:
              "Activities beyond engineering: Learn about the teams focused on Fedora's outreach, brand, & more.",
          },
          {
            label: "Fedora Council",
            path: "https://docs.fedoraproject.org/en-US/project/leadership/#_fedora_council",
            icon: "fa6-solid:book",
            description: "Learn about the Fedora Project governance.",
          },
          {
            label: "Program Management",
            path: "https://docs.fedoraproject.org/en-US/council/fpgm/",
            icon: "fa6-solid:book",
            description: "Release planning, scheduling, and status tracking.",
          },
          {
            label: "Diversity & Inclusion",
            path: "https://docs.fedoraproject.org/en-US/diversity-inclusion/",
            icon: "fa6-solid:book",
            description:
              "The goal of this initiative is to help foster diversity and inclusion in Fedora community.",
          },
          {
            label: "Legal",
            path: "https://docs.fedoraproject.org/en-US/legal/",
            icon: "fa6-solid:book",
            description:
              "Policies for licensing, trademarks, and other legal issues.",
          },
          {
            label: "Edit these docs",
            path: "https://docs.fedoraproject.org/en-US/fedora-docs/contributing-docs/tools-gitlab-howto/",
            icon: "fa6-solid:pencil",
            description:
              "Did you notice a glaring typo or a broken link in these docs? Click here to find out how you can help make it right!",
          },
        ],
      },
      {
        label: "New Contributors",
        description:
          "We are always excited to work with new contributors. If you're new to the project, check out these sites.",
        links: [
          {
            label: "Join SIG",
            path: "https://docs.fedoraproject.org/en-US/fedora-join/",
            icon: "fa6-solid:people-line",
            description:
              "This is a special interest group that has formed for the sole purpose of helping new contributors get involved. Fedora is big and complex and it needs your help!",
          },
          {
            label: "Easy Fix",
            path: "https://fedoraproject.org/easyfix/",
            icon: "fa6-solid:wrench",
            description:
              "These are some low-priority items that are thought to be good entry-level tasks for a new contributor to start with.",
          },
        ],
      },
    ],
  },
  connections: {
    label: "Connections",
    icon: "fa6-solid:user",
    description: "These are places to get (and give) user support.",
    sections: [
      {
        label: "News & Publications",
        description:
          "These are sites where updates about new and upcomming events, releases, packages, and projects are likely to be posted. You might want to subscribe to some of these to get the notices in your inbox.",
        links: [
          {
            label: "News & Announcements",
            path: "https://discussion.fedoraproject.org/c/news/5",
            icon: "fa6-brands:discourse",
            description:
              "The Fedora Project Leader likes to post things here. This forum also receives weekly updates from The Fedora Project Manager and the Community Platform Engineering team.",
          },
          {
            label: "Fedora Magazine",
            path: "https://fedoramagazine.org/",
            icon: "fa6-solid:bookmark",
            description:
              "Fedora new release and beta release announcements show up here first. Test Day announcements are also posted here. This blog also hosts articles contributed from users like you!",
          },
          {
            label: "Fedora Community Blog",
            path: "https://communityblog.fedoraproject.org/",
            icon: "fa6-brands:fedora",
            description:
              "Announcements that are pertinent to Fedora developers and the Fedora infrastructure team tend to be posted here.",
          },
          {
            label: "Fedora Mastodon",
            path: "https://fosstodon.org/@fedora",
            rel: "me",
            icon: "fa6-brands:mastodon",
            description:
              "Follow us on Mastodon! This is a great place to stay up to date on the latest in the Fedora community.",
          },
          {
            label: "Fedora Twitter",
            path: "https://twitter.com/fedora",
            icon: "fa6-brands:twitter",
            description:
              "Follow us on twitter! This is a great place to stay up to date on the latest in the Fedora community.",
          },
        ],
      },
      (ask_fedora = {
        label: "Ask Fedora",
        description:
          "This is Fedora's main forum for all project collaboration and user support. Also, if you have encountered a problem that might be a software bug, this is a good place to triage it with other users before escalating it to Red Hat's bugzilla reporting system.",
        links: [
          {
            label: "General Q&A",
            path: "https://discussion.fedoraproject.org/c/ask",
            icon: "fa6-brands:discourse",
            description:
              "If you need help installing, using, or customizing Fedora Linux, or have any other questions about the operating system or the Fedora Project, this is the place to ask!",
          },
          {
            label: "Workstation",
            path: "https://discussion.fedoraproject.org/tags/c/ask/6/all/workstation",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about Fedora Workstation.",
          },
          {
            label: "Server",
            path: "https://discussion.fedoraproject.org/tags/c/ask/6/all/server",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about Fedora Server.",
          },
          {
            label: "Cloud",
            path: "https://discussion.fedoraproject.org/tags/c/ask/6/all/cloud",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about Fedora Cloud.",
          },
          {
            label: "IoT",
            path: "https://discussion.fedoraproject.org/tags/c/ask/6/all/iot",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about Fedora IoT (Internet of Things).",
          },
          {
            label: "CoreOS",
            path: "https://discussion.fedoraproject.org/tags/c/ask/6/all/coreos",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about Fedora CoreOS.",
          },
          {
            label: "GNOME",
            path: "https://discussion.fedoraproject.org/tag/gnome",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about the GNOME desktop environment.",
          },
          {
            label: "KDE",
            path: "https://discussion.fedoraproject.org/tag/kde",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about the KDE desktop environment.",
          },
          {
            label: "Installation",
            path: "https://discussion.fedoraproject.org/tag/installation",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to focus on questions and answers about installing Fedora Linux.",
          },
        ],
      }),
      {
        label: "Project Discussion",
        description:
          "These are some convenient links to the discussion threads for several of Fedora's larger subprojects and special interest groups.",
        links: [
          {
            label: "Workstation",
            path: "https://discussion.fedoraproject.org/tags/c/project/7/workstation-wg",
            icon: "fa6-brands:discourse",
            description:
              "Use this link to connect with other workstation contributors.",
          },
          {
            label: "Server",
            path: "https://discussion.fedoraproject.org/tags/c/project/7/server-wg",
            icon: "fa6-brands:discourse",
            description: "The Fedora Server edition working group",
          },
          {
            label: "Cloud",
            path: "https://discussion.fedoraproject.org/tags/c/project/7/cloud-wg",
            icon: "fa6-brands:discourse",
            description: "The Fedora Cloud edition working group",
          },
          {
            label: "IoT",
            path: "https://discussion.fedoraproject.org/tags/c/project/7/iot-wg",
            icon: "fa6-brands:discourse",
            description:
              "The Fedora IoT (Internet of Things) edition working group",
          },
          {
            label: "CoreOS",
            path: "https://discussion.fedoraproject.org/tags/c/project/7/coreos-wg",
            icon: "fa6-brands:discourse",
            description: "The Fedora CoreOS working group",
          },
          {
            label: "Silverblue",
            path: "https://discussion.fedoraproject.org/tag/silverblue-team",
            icon: "fa6-brands:discourse",
            description: "The Fedora Silverblue team",
          },
          {
            label: "Kinoite",
            path: "https://discussion.fedoraproject.org/tag/kinoite-team",
            icon: "fa6-brands:discourse",
            description: "The Fedora Kinoite team",
          },
          {
            label: "EPEL",
            path: "https://discussion.fedoraproject.org/tag/epel-sig",
            icon: "fa6-brands:discourse",
            description:
              "The Extra Packages for Enterprise Linux special interest group",
          },
          {
            label: "All Teams & Tags",
            path: "https://discussion.fedoraproject.org/tags",
            icon: "fa6-brands:discourse",
            description:
              "Fedora has lots of teams! Click here to see a more complete list.",
          },
        ],
      },
      {
        label: "Social & Events",
        description:
          "These are a few free-form communication channels and some links to information about Fedora's release parties and annual conferences. Fedorans regularly come together to celebrate our community and the hard work that we put into it!",
        links: [
          {
            label: "The Water Cooler",
            path: "https://discussion.fedoraproject.org/c/fun/8",
            icon: "fa6-brands:discourse",
            description:
              "This is the proverbial office “water cooler”, where people gather for “break from work” conversation. Introduce yourself, have (friendly!) off-topic discussions, and socialize!",
          },
          {
            label: "Fedora Social",
            path: "https://chat.fedoraproject.org/#/room/#social:fedoraproject.org",
            icon: "cib:matrix",
            description:
              "The Fedora Social chat room is a place for Fedora community members to relax and talk about most any topics they wish.",
          },
          {
            label: "Extended Social Channels",
            path: "https://fedoraproject.org/wiki/Marketing_social_networks#Official_Accounts",
            icon: "fa6-solid:bullhorn",
            description:
              "Beyond the official channels for Fedorans to communicate, community members are involved on other popular platforms as well! Check out IRC, Discord, Telegram, Reddit, and more!",
          },
          {
            label: "Week of Diversity",
            path: "https://docs.fedoraproject.org/en-US/diversity-inclusion/",
            icon: "fa6-solid:users",
            description:
              "This is a week in September where we highlight the contributions and experiences of women, lgbtq+, and bipoc in Fedora.",
          },
          {
            label: "Flock To Fedora",
            path: "https://flocktofedora.org/",
            icon: "fa6-brands:fedora",
            description:
              "The annual contributor conference for Fedora Linux. Flock takes place at the beginning of August.",
          },
          {
            label: "Release Parties",
            path: "https://docs.fedoraproject.org/en-US/mindshare-committee/release-parties/#_what_is_a_release_party",
            icon: "fa6-brands:fedora",
            description:
              "Fedora releases two major versions every year. We celebrate the hard work of our contributors virtually at each release.",
          },
        ],
      },
    ],
  },
  help: {
    label: "Help",
    icon: "bi:life-preserver",
    description: "Help!",
    sections: [
      {
        // This label is padded with a zero-width space to make it a unique "key".
        label: `${ask_fedora.label}\u200B`,
        description: ask_fedora.description,
        links: ask_fedora.links,
      },
      {
        label: "User Guides",
        description:
          "These are some introductory guides to help users get started with Fedora Linux.",
        links: [
          {
            label: "Downloading Fedora Linux",
            path: "https://docs.fedoraproject.org/en-US/fedora/latest/fedora-downloads-info/",
            icon: "fa6-solid:book",
            description: "How to select the appropriate download.",
          },
          {
            label: "Getting Started",
            path: "https://docs.fedoraproject.org/en-US/fedora/latest/getting-started/",
            icon: "fa6-solid:book",
            description: "An in-depth guide to installing Fedora Linux.",
          },
          {
            label: "Upgrading Fedora Linux",
            path: "https://docs.fedoraproject.org/en-US/quick-docs/dnf-system-upgrade/",
            icon: "fa6-solid:book",
            description:
              "How to upgrade an existing Fedora Linux installation.",
          },
        ],
      },
      {
        label: "Documentation",
        description:
          "Over the years, Fedorans have created many sources of information about Fedora Linux and the Fedora Project.",
        links: [
          {
            label: "Fedora Docs",
            path: "https://docs.fedoraproject.org/en-US/docs/",
            icon: "fa6-solid:book",
            description:
              "This is the main index page for all of Fedora's Documentation. If you weren't able to find a direct link to what you were looking for in this site's menus, you can try searching from here.",
          },
          {
            label: "Fedora Quick Docs",
            path: "https://docs.fedoraproject.org/en-US/quick-docs/",
            icon: "fa6-solid:book",
            description:
              "This is a collection of short HOWTO and FAQ-style documentation for Fedora users.",
          },
          {
            label: "Fedora Wiki",
            path: "https://fedoraproject.org/wiki/Fedora_Project_Wiki",
            icon: "fa6-solid:book",
            description:
              "This is primarily a collaboration tool for the community. Content that has been submitted here might be out of date and/or it might not have undergone the same level of scrutiny as the information on Fedora Docs.",
          },
          {
            label: "Fedora Magazine",
            path: "https://fedoramagazine.org/",
            icon: "fa6-solid:bookmark",
            description:
              "Fedora Magazine is a website that hosts promotional articles and short guides contributed from the community about free/libre and open-source software that runs on or works with the Fedora Linux operating system.",
          },
          {
            label: "Fedora Developer",
            path: "https://developer.fedoraproject.org/",
            icon: "fa6-solid:signs-post",
            description:
              "From mobile apps to web; from desktop to GUIs to CLI tools; create it all easily with Fedora.",
          },
        ],
      },
      {
        label: "About",
        description:
          "The Fedora Project is a community of people working together to build a free and open source software platform and to collaborate on and share user-focused solutions built on that platform. Or, in plain English, we make an operating system and we make it easy for you to do useful stuff with it.",
        links: [
          {
            label: "Fedora’s Mission and Foundations",
            path: "https://docs.fedoraproject.org/en-US/project/#_what_is_fedora_all_about",
            icon: "fa6-brands:fedora",
            description: "",
          },
        ],
      },
    ],
  },
  languages: {
    label: "Languages",
    icon: "bi:globe",
    description: "Languages",
    sections: [
      {
        label: "Translations",
        description: "Pick a language to view this page in your language",
        links: locales,
      },
      {
        label: "Add a translation",
        description:
          "We use weblate to translate our site. Please find relevant links below.",
        links: [
          {
            label: "Add translation",
            path: "https://translate.fedoraproject.org/projects/fedora-websites-3-0/fedoraproject-org/",
            icon: "simple-icons:weblate",
            description: "",
          },
          {
            label: "How to use Weblate",
            path: "https://docs.fedoraproject.org/en-US/localization/weblate/",
            icon: "fa6-solid:book",
            description: "",
          },
        ],
      },
    ],
  },
};

export default navigation;
