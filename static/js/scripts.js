// A new pokemonRepository variable to hold what your IIFE will return, 
// then assigned IIFE to that variable
const pokemonRepository = (function () {
    const pokemonList = [];
    // The url to the extended API with pokemon data we are fetching
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function showModal(pokemon) {
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');

        modalTitle.innerText = '';
        modalBody.innerText = '';

        //Create h1 tag with Pokemon name
        const titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.forms[0].name;

        // Add pokemon image url
        const img = document.createElement('img');
        img.src = pokemon.sprites.other['official-artwork']['front_default'];
        img.classList.add('modal-img');


        //Create paragraph that contains pokemon height
        const heightElement = document.createElement('p');
        heightElement.innerText='Height: '+pokemon.height/10 +' m';


        //create element for pokemon in modal content
        const pokemonTypes = [];

        Object.keys(pokemon.types).forEach(key => {
              pokemonTypes.push(' ' + pokemon.types[key].type.name);
    });


        // Paragraph that contains pokemon type
        const typesElement = document.createElement('p');
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
        const pokemonList = document.querySelector(".pokemon-list");
        const listpokemon = document.createElement("li");
        const button = document.createElement("button");
        
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
            const pokemon = {
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
        const url = item.detailsUrl;

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

    const SearchBar = document.querySelector('#filter');

    SearchBar.addEventListener('input', function() {
        const pokemonListItem = document.querySelectorAll('li');
        const filter = SearchBar.value.toUpperCase();

        pokemonListItem.forEach(function(pokemon){
            if (pokemon.innerText.toUpperCase().indexOf(filter) === 0) {
                pokemon.style.display = 'block';
            } else {
                pokemon.style.display = 'none';
            }
        });
});

return {
          add,
          getAll,
          addListItem,
          loadList,
          loadDetails,
          showDetails,
          showModal,
        };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});