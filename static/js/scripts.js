// A new pokemonRepository variable to hold what your IIFE will return, 

// then assigned IIFE to that variable
const pokemonRepository = (function () {
    const pokemonList = [];
    // The url to the extended API with pokemon data we are fetching
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=40';
    let nextUrl = '';
    let previousUrl = '';

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

    function getNextUrl(){
          return nextUrl;
          }

    function getPreviousUrl(){
          return previousUrl;
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
    function loadList(apiUrl) {
      return fetch(apiUrl).then(function (response) {
      return response.json();
        }).then(function (json) {
          //console.log(json);
          nextUrl = json.next;
          previousUrl = json.previous;
        json.results.forEach(function (item) {
            const pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
          add(pokemon);
          });

          //setup pagination
          setupPagination();
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

    // TODO
    // 1. Clear the existing pokemon list
    // 2. Check if the getNextUrl or getPreviousUrl has value, only you show the buttons otherwise you set a css class "disabled"

    function clearPokemonList() {
      const pokemonListUI = document.querySelector(".pokemon-list");
      pokemonListUI.innerHTML = '';
      pokemonList.length = 0;
    }

    function setupPagination(nextUrl, previousUrl){
        // Next Button
        const nextBtn = document.getElementById('btn-next');
        if (!getNextUrl()) {
          //alert(getNextUrl())
          nextBtn.setAttribute("disabled", "");
          nextBtn.style.backgroundColor = "grey";
        }
        else {
          nextBtn.removeAttribute("disabled");
          nextBtn.style.backgroundColor = "rgb(255, 51, 0)";
        }
        nextBtn.addEventListener('click', function() {
            clearPokemonList();
            loadList(getNextUrl()).then(function () {
              getAll().forEach(function (pokemon) {
                addListItem(pokemon);
              });
          });
        });

        // Previous Button
        const previousBtn = document.getElementById('btn-previous');
        if (!getPreviousUrl()) {
          //alert(getPreviousUrl())
          previousBtn.setAttribute("disabled", "");
          previousBtn.style.backgroundColor = "grey";
        }
        else {
          previousBtn.removeAttribute("disabled");
          previousBtn.style.backgroundColor = "rgb(255, 51, 0)";
        }

        previousBtn.addEventListener('click', function() {
          clearPokemonList();
          loadList(getPreviousUrl()).then(function () {
            getAll().forEach(function (pokemon) {
              addListItem(pokemon);
            });
        });
        });

    }

return {
          add,
          getAll,
          addListItem,
          loadList,
          loadDetails,
          showDetails,
          showModal,
          getNextUrl,
          getPreviousUrl,
        };
})();

pokemonRepository.loadList('https://pokeapi.co/api/v2/pokemon/?limit=40').then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });
});