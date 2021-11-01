let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    // Other functions remain here
       /*Function should add the Pokemon to the pokemonList array*/
       function add(pokemon) { 
        if (typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl" in pokemon &&
        "types" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }

    /*Function should return the pokemonList array*/
    function getAll() {
        return pokemonList;
      }

      function showDetails(pokemon){
          console.log(pokemon);
      }

    //Function that is reading html elements and then passing list of pokemons to each button
   //Event listener is passing more information about each pokemon we click, but on console for now
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-style");
        listpokemon.appendChild(button);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        pokemonList.appendChild(listpokemon);
    }
    
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
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

  /*Return all the above functions and values, inside the IIFE, to the outside */
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
      addListItem: addListItem
    };
  })();
  
    //pokemonList = pokemonRepository.getAll();
    
    pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
        pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
  });



/*    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
  }

/*
    

*/

// I am catching the whole Pokemon List from IIFE protected function, to be able to print it out


//Calling function addListItem() to execute the code on our page, and passing forEach to move through list of pokemons

/*pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });