// A new pokemonRepository variable to hold what your IIFE will return, 
// then assigned IIFE to that variable
let pokemonRepository = (function () {
let pokemonList = [];
// The url to the extended API with pokemon data we are fetching
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


function showModal(pokemon) {
    console.log("Pokemon: ", pokemon);
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerText = '';
    modalBody.innerText = '';

    //Create h1 tag with Pokemon name
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.forms[0].name;

    // Add pokemon image url
    let img = document.createElement('img');
    img.src = pokemon.sprites.other['official-artwork']['front_default'];
    img.classList.add('modal-img');


    //Create paragraph that contains pokemon height
    let heightElement = document.createElement('p');
    heightElement.innerText='Height: '+pokemon.height/10 +' m';


    //create element for pokemon in modal content
      let pokemonTypes = [];

    Object.keys(pokemon.types).forEach(key => {
          pokemonTypes.push(' ' + pokemon.types[key].type.name);
});


    // Paragraph that contains pokemon type
    let typesElement = document.createElement('p');
    typesElement.innerText = 'Type: ' + pokemonTypes;


    //Add the new created elements
    modalTitle.appendChild(titleElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(img);
}


/*Function should add the Pokemon to the pokemonList array*/
function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
        } else {
        console.log("pokemon is not correct");
        }
      }
      
      
/*Function should return the pokemonList array*/
function getAll() {
      return pokemonList;
      }

//Function that is reading html elements and then passing list of pokemons to each button
//Event listener is passing more information about each pokemon we click, but on console for now
function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");

    button.innerText = pokemon.name;
    button.classList.add("button-style");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
    showDetails(pokemon);
});
}

/* function to load each pokemon wich is defined
in the API URL and fetch it to the inside the pokemonList array */
function loadList() {
  return fetch(apiUrl).then(function (response) {
  return response.json();
    }).then(function (json) {
    json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
      add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
  })
}

function loadDetails(item) {
    let url = item.detailsUrl;

    console.log('url', url);
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      showModal(details);
        // item.imageUrl = details.sprites.front_default;
        // item.height = details.height;
        // item.types = details.types;
      }).catch(function (e) {
      console.error(e);
    });
}

function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      });
}

// Function to search for pokemon using search bar

let SearchBar = document.querySelector('#filter');

SearchBar.addEventListener('input', function() {
    let pokemonListItem = document.querySelectorAll('li');
    let filter = SearchBar.value.toUpperCase();

    pokemonListItem.forEach(function(pokemon){
        if (pokemon.innerText.toUpperCase().indexOf(filter) === 0) {
            pokemon.style.display = 'block';
        } else {
            pokemon.style.display = 'none';
        }
    });
});

return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails: showDetails,
          showModal: showModal,
        };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});