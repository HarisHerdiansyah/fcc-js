const basicContainer = document.querySelector(".basics");
const detailStatsContainer = document.querySelectorAll(".detail-stats");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonSprite = document.getElementById("pokemon-sprite");
const types = document.getElementById("types");

async function fetchPokemon(index) {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${index}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error from fetchPokemon() : ", error);
    return null;
  }
}

function sanitizeInput(input) {
  const regex = /[^a-zA-Z0-9\s]/gi;
  const cleanInput = input.replace(regex, "");
  return cleanInput.replaceAll(" ", "-").toLowerCase();
}

function render(data) {
  pokemonName.innerText = data.name;
  pokemonId.innerText = `#${data.id}`;
  weight.innerText = `Weight: ${data.weight}`;
  height.innerText = `Height: ${data.height}`;
  pokemonSprite.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}" />`;
  types.innerHTML = data.types
    .map((obj) => `<p class="type ${obj.type.name}">${obj.type.name}</p>`)
    .join("");

  const stats = data.stats.map((obj) => obj.base_stat);
  detailStatsContainer.forEach(
    (element, index) => (element.textContent = stats[index])
  );
}

function cleanUp() {
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  weight.innerText = "";
  height.innerText = "";
  pokemonSprite.innerHTML = "";
  types.innerHTML = "";
  detailStatsContainer.forEach((element) => (element.textContent = ""));
}

document.addEventListener("DOMContentLoaded", () => {
  searchButton.addEventListener("click", async () => {
    const input = sanitizeInput(searchInput.value);
    const data = await fetchPokemon(input);

    cleanUp();

    if (!data) {
      alert("Pokémon not found");
      return;
    }

    render(data);
  });
});
