const cards = document.getElementById("cards");
const pages = document.getElementById("pages");
const currentPageElement = document.getElementById("currentPage");

const baseUrl = "https://swapi.dev/api/planets/?page=";

let currentPage = 1;
let numPages = 1;

const loadResults = async (page) => {
  const data = await fetch(`${baseUrl}${page}`);
  const json = await data.json();
  const results = json.results;

  cards.innerHTML = "";

  results.forEach((planet) => {
    const details = document.createElement("details");
    details.innerHTML = `
    <summary>${planet.name}</summary>`;
    const ul = document.createElement("ul");
    const attributes = [
			"rotation_period",
			"orbital_period",
			"diameter",
			"climate",
			"gravity",
			"terrain",
			"surface_water",
			"population",
			"residents",
			"films"
    ];
    ul.innerHTML = attributes
      .map(
        (attribute) =>
          `<li>${
            attribute.charAt(0).toUpperCase() +
            attribute.replace("_", " ").slice(1)
          }: ${planet[attribute]}</li>`
      )
      .join("");
    details.appendChild(ul);
    cards.appendChild(details);
  });
};

const updateCurrentPage = (newPage) => {
  currentPageElement.textContent = newPage;
};

const setup = async () => {
  const data = await fetch(baseUrl);
  const json = await data.json();
  numPages = Math.ceil(json.count / 10);
  const prevButton = document.createElement("button");
  prevButton.textContent = `<`;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      loadResults(currentPage - 1);
      currentPage = currentPage - 1;
      updateCurrentPage(currentPage);
    }
  });
  pages.appendChild(prevButton);

  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      currentPage = i;
      loadResults(i);
      updateCurrentPage(currentPage);
    });
    pages.appendChild(button);
  }
  const nextButton = document.createElement("button");
  nextButton.textContent = `>`;
  nextButton.addEventListener("click", () => {
    if (currentPage < numPages) {
      loadResults(currentPage + 1);
      currentPage = currentPage + 1;
      updateCurrentPage(currentPage);
    }
  });
  pages.appendChild(nextButton);
  loadResults(1);
  updateCurrentPage(1);
  // {"count":82,"next":"https://swapi.dev/api/planets/?page=2","previous":null,"results":[{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","bi...
};
setup();
