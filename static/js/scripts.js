// A new pokemonRepository variable to hold what your IIFE will return, 
// then assigned IIFE to that variable
let pokemonRepository = (function
    (){
    let pokemonList = [
        {name:'Bulbasaur', height: 0.7, types: ['grass','poison']},
        {name:'Charmender', height: 0.6, types: ['fire']},
        {name:'Pikachu', height: 0.5, types: ['electric']},
        {name:'Squirtle', height: 0.5, types: ['water']},
        {name:'Chikorita', height: 0.9, types: ['grass']},
        {name:'Swellow', height: 0.7, types: ['Flying', 'Normal']},
        {name:'Chikorita', height: 0.5, types: ['fire']}
        ];

        /*Function should add the Pokemon to the pokemonList array*/
        function add(pokemon) { 
            if (typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
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

      /*Return all the above functions and values, inside the IIFE, to the outside */
          return {
            add: add,
            getAll: getAll,
            addListItem: addListItem
          };
//End of wrapped PokemonList in IIFE function          
})();

// I am catching the whole Pokemon List from IIFE protected function, to be able to print it out
pokemonList = pokemonRepository.getAll();

//Calling function allListItem() to execute the code on our page, and passing forEach to move through list of pokemons
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });