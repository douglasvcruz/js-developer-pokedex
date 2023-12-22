const pokemonDetails = document.getElementById("pokemon");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const fetchPokemonById = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();
  return pokemon;
};

const createPokemonAbout = async () => {
  const pokemon = await fetchPokemonById(id);
  return `
    <div class="chose">
      <ul>
        <li><span>Height</span> ${pokemon.height}</li>
        <li><span>Weight</span> ${pokemon.weight}</li>
        <li><span>Abilities</span> ${pokemon.abilities
          .map((slot) => slot.ability.name)
          .join(", ")}</li>
      </ul>
    </div>`;
};

const createPokemonBaseStats = async () => {
  const pokemon = await fetchPokemonById(id);
  return `
    <div class="chose">
      <ul>
        ${pokemon.stats
          .map((stats) => {
            return `<li><span>${stats.stat.name}</span> ${stats.base_stat}</li>`;
          })
          .join("")}
      </ul>
    </div>`;
};

const createPokemonDetail = async () => {
  const pokemon = await fetchPokemonById(id);
  const body = document.querySelector("body");
  body.className = pokemon.types[0].type.name;
  pokemonDetails.innerHTML += `
    <div class="pokemon pokemon-details ${pokemon.types[0].type.name}">
        <h1 class="name">${pokemon.name}</h1>
        <span class="number">#${pokemon.id}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types
                  .map(
                    (slot) =>
                      `<li class="type ${slot.type.name}">${slot.type.name}</li>`
                  )
                  .join("")}
            </ol>

            <img src="${
              pokemon.sprites.other.dream_world.front_default
            }" alt="${pokemon.name}">
        </div>
    </div>`;
};

createPokemonDetail();

const buttonAbout = document.querySelector(".about");
const buttonBaseStats = document.querySelector(".base");
const divDetails = document.getElementById("details");

buttonAbout.addEventListener("click", async () => {
  buttonBaseStats.className = "";
  buttonAbout.className = "active";
  divDetails.innerHTML = await createPokemonAbout();
});

buttonBaseStats.addEventListener("click", async () => {
  buttonAbout.className = "";
  buttonBaseStats.className = "active";
  divDetails.innerHTML = await createPokemonBaseStats();
});
