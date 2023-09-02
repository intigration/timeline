function selectCategory(category, section) {
  // only toggle if nav is not already open, otherwise switch category
  if (document.getElementById("fpNavigation").classList.contains("hidden")) {
    resetCategories();
    document.getElementById("fpNavigation").classList.remove("hidden");
  }
  // if the current category is already visible aka. second click on same menu, close it.
  if (document.getElementById(category).classList.contains("hidden")) {
    // otherwise set the active category and the first section of it.
    resetCategories();
    resetSections();
    const c = document.getElementById(`${category}-button`).classList;
    c.add("bg-fp-darkblue-700");
    c.remove("hover:bg-fp-blue-500");
    const s = document.getElementById(`${section}-button`).classList;
    s.add("bg-gray-300");
    s.add("dark:bg-gray-800");
    document.getElementById(category).classList.remove("hidden");
    document.getElementById(section).classList.remove("hidden");
  } else {
    document.getElementById(category).classList.add("hidden");
    document.getElementById("fpNavigation").classList.add("hidden");
    document
      .getElementById(`${category}-button`)
      .classList.add("hover:bg-fp-blue-500");
    document
      .getElementById(`${category}-button`)
      .classList.remove("bg-fp-darkblue-700");
  }
}

function selectSection(section) {
  resetSections();
  document.getElementById(section).classList.toggle("hidden");
  const sb = document.getElementById(`${section}-button`).classList;
  sb.add("bg-gray-300");
  sb.add("dark:bg-gray-800");
}

function mobileExpander() {
  document.getElementById("categoryButtons").classList.toggle("hidden");
  document.getElementById("categoryButtons").classList.toggle("flex");
  document.getElementById("fpNavigation").classList.toggle("hidden");
  resetCategories();
  resetSections();
  const c = document.getElementById(`Get\u00A0Fedora-button`).classList;
  c.add("bg-fp-darkblue-700");
  c.remove("hover:bg-fp-blue-500");
  document.getElementById("Get\u00A0Fedora").classList.toggle("hidden");
  document.getElementById("Editions").classList.toggle("hidden");
  document.getElementById(`Editions-button`).classList.add("bg-gray-300");
  document.getElementById(`Editions-button`).classList.add("dark:bg-gray-800");
}

function resetCategories() {
  const categoryButtons = document.getElementsByClassName("fpCategoryButtons");
  for (let i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].classList.remove("bg-fp-darkblue-700");
    categoryButtons[i].classList.add("hover:bg-fp-blue-500");
  }
  const categories = document.getElementsByClassName("fpCategory");
  for (let i = 0; i < categories.length; i++) {
    categories[i].classList.add("hidden");
  }
}

function resetSections() {
  const sectionsButtons = document.getElementsByClassName("fpSectionButtons");
  for (let i = 0; i < sectionsButtons.length; i++) {
    sectionsButtons[i].classList.remove("bg-gray-300");
    sectionsButtons[i].classList.remove("dark:bg-gray-800");
  }
  const sections = document.getElementsByClassName("fpSection");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.add("hidden");
  }
}

function toggleFooter(section) {
  document.getElementById(`${section}-footer`).classList.toggle("hidden");
}
