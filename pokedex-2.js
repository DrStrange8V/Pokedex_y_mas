const pokemonsNode = document.querySelector("#pokemons");
const pokemonNode = document.querySelector("#pokemon");
const detailNode = document.querySelector("#detail");

pokemonsNode.addEventListener("click", clickHandler);
pokemonNode.addEventListener("click", HandlerDetails);

function getPokemons() {
  pokemonsNode.textContent = "Is loading...";

  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
      pokemonsNode.textContent = "";

      renderPokemons(data.results);
    })
    .catch(error => alert(error.message));
}

function renderPokemons(pokemons) {
  for (const pokemon of pokemons) {
    const p = document.createElement("p");
    const a = document.createElement("a");

    a.setAttribute("href", pokemon.url);
    a.textContent = pokemon.name;

    p.append(a);

    pokemonsNode.append(p);
  }
}

function fetchPokemon(url) {
  fetch(url)
    .then(response => response.json())
    .then(pokemon => renderPokemon(pokemon));
}

function fetchDetail(url) {
  fetch(url)
    .then(response => response.json())
    .then(types => renderDetail(types));
}
function renderPokemon(pokemon) {
  const name = pokemon.name;
  const sprites = pokemon.sprites;
  const abilities = pokemon.abilities;
  const moves = pokemon.moves;
  const types = pokemon.types;

  const h1 = document.createElement("h1");
  const ul = document.createElement("ul");

  //ADD FOR ME
  const h3 = document.createElement("h3");
  const ul_move = document.createElement("ul");
  const h3_ability = document.createElement("h3");
  //----------------------------------------
  const h3_type = document.createElement("h3");
  const ul_type = document.createElement("ul");

  // name
  h1.textContent = name;
  h3.textContent = "Movimientos.";
  h3_ability.textContent = "Habilidades.";
  h3_type.textContent = "Tipos.";
  // clean pokemon node content
  pokemonNode.innerHTML = "";
  detailNode.innerHTML = "";
  // append content
  pokemonNode.append(h1);

  // sprites
  for (const key in sprites) {
    const img = document.createElement("img");
    const sprite = sprites[key];

    console.log(sprite);

    if (sprite) {
      img.setAttribute("src", sprite);
      pokemonNode.append(img);
    }
  }
  pokemonNode.append(h3_type);

  for (const type of types) {
    const a_type = document.createElement("a");
    const li_type = document.createElement("li");

    a_type.setAttribute("href", type.type.url);
    a_type.textContent = type.type.name;

    li_type.append(a_type);

    ul_type.append(li_type);
  }
  pokemonNode.append(ul_type);

  pokemonNode.append(h3_ability);
  // abilities
  for (const ability of abilities) {
    const li = document.createElement("li");

    li.textContent = ability.ability.name;

    ul.append(li);
  }

  pokemonNode.append(ul);

  for (const move of moves) {
    const li_moves = document.createElement("li");
    li_moves.textContent = move.move.name;

    ul_move.append(li_moves);
  }
  pokemonNode.append(h3);
  pokemonNode.append(ul_move);
}

//Funcion para los detalles

function renderDetail(types) {
  const super_efect_from = document.createElement("h3");
  const super_efect_to = document.createElement("h3");
  const no_very_efect_from = document.createElement("h3");
  const no_very_efect_to = document.createElement("h3");
  const no_efect_from = document.createElement("h3");
  const no_efect_to = document.createElement("h3");

  const ul_ddf = document.createElement("ul");
  const ul_ddt = document.createElement("ul");
  const ul_hdf = document.createElement("ul");
  const ul_hdt = document.createElement("ul");
  const ul_ndf = document.createElement("ul");
  const ul_ndt = document.createElement("ul");

  //arrays
  const dd_from = types.damage_relations.double_damage_from;
  const dd_to = types.damage_relations.double_damage_to;
  const hd_from = types.damage_relations.half_damage_from;
  const hd_to = types.damage_relations.half_damage_to;
  const nd_from = types.damage_relations.no_damage_from;
  const nd_to = types.damage_relations.no_damage_to;

  //name
  super_efect_from.textContent = "Super Debil Contra.";
  super_efect_to.textContent = "Super Efectivo Contra.";
  no_very_efect_from.textContent = "Resistente Contra";
  no_very_efect_to.textContent = "No muy Efectivo Contra.";
  no_efect_from.textContent = "No Afecta a.";
  no_efect_to.textContent = "No le Afecta.";

  detailNode.innerHTML = "";
  //Efectivo de
  if(dd_from.length>0)
  {
    detailNode.append(super_efect_from);
    for (const dd of dd_from) {
      const li_dd = document.createElement("li");
      li_dd.textContent = dd.name;
  
      ul_ddf.append(li_dd);
    }
    detailNode.append(ul_ddf);
  }

  //Efectivo Contra
  if(dd_to.length>0)
  {
    detailNode.append(super_efect_to);
    for (const ddt of dd_to) {
      const li_ddt = document.createElement("li");
      li_ddt.textContent = ddt.name;
  
      ul_ddt.append(li_ddt);
    }
    detailNode.append(ul_ddt);
  }


  //No muy Efectivo de
  if(hd_from.length>0)
  {
    detailNode.append(no_very_efect_from);
    for (const hd of hd_from) {
      const li_hd = document.createElement("li");
      li_hd.textContent = hd.name;
  
      ul_hdf.append(li_hd);
    }
    detailNode.append(ul_hdf);
  }


  //No muy Efectivo Contra
  if (hd_to.length > 0) {
    detailNode.append(no_very_efect_to);
    for (const hdt of hd_to) {
      const li_hdt = document.createElement("li");
      li_hdt.textContent = hdt.name;

      ul_hdt.append(li_hdt);
    }
    detailNode.append(ul_hdt);
  }

  //No Afectado de
  if (nd_from.length > 0) {
    detailNode.append(no_efect_from);
    for (const nd of nd_from) {
      const li_nd = document.createElement("li");
      li_nd.textContent = nd.name;

      ul_ndf.append(li_nd);
    }
    detailNode.append(ul_ndf);
  }

  //No Afecta a
  if (nd_to.length > 0) {
    detailNode.append(no_efect_to);
    for (const ndt of nd_to) {
      const li_ndt = document.createElement("li");
      li_ndt.textContent = ndt.name;

      ul_ndt.append(li_ndt);
    }
    detailNode.append(ul_ndt);
  }
} //Fin de RenderDetails

function HandlerDetails(event) {
  const target = event.target;

  if (target.nodeName !== "A") {
    return false;
  }

  event.preventDefault();

  fetchDetail(target.getAttribute("href"));
}

function clickHandler(event) {
  const target = event.target;

  if (target.nodeName !== "A") {
    return false;
  }

  event.preventDefault();

  fetchPokemon(target.getAttribute("href"));
}

// initial function
getPokemons();
