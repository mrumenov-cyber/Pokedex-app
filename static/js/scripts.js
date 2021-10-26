// A new pokemonRepository variable to hold what your IIFE will return, 
// then assigned IIFE to that variable
let pokemonRepository = (function(){
    let pokemonList = [
        {name:'Bulbasaur', height: 0.7, types: ['grass','poison']},
        {name:'Charmender', height: 0.6, types: ['fire']},
        {name:'Pikachu', height: 0.4, types: ['electric']},
        {name:'Squirtle', height: 0.5, types: ['water']},
        {name:'Chikorita', height: 0.9, types: ['grass']},
        {name:'Swellow', height: 0.7, types: ['Flying', 'Normal']},
        {name:'Chikorita', height: 0.5, types: ['fire']}
        ];

        /*Function should add the Pokemon to the pokemonList array*/
        function add(pokemon) {
            pokemonList.push(pokemon);
          }
    
       /*Function should return the pokemonList array*/
        function getAll() {
            return pokemonList;
          }

      /*Return all the above functions and values, inside the IIFE, to the outside */
          return {
            add: add,
            getAll: getAll,
          };
//End of wrapped PokemonList in IIFE function          
})();

// I am catching the whole Pokemon List from IIFE protected function, to be able to print it out
pokemonList = pokemonRepository.getAll();

// PRINTING OUT THE LIST OF POKEMONS IN THE LIST WITH *** FOR ***
/*for (i=0; i<pokemonList.length; i++)
{   
    text = "Name of the Pokemon: " + pokemonList[i].name + " - Height: " + pokemonList[i].height + "m " + " - Types: " + pokemonList[i].types;
    document.write(text);
    // Condition to determine the biggest pokemon and to compare it with my results from up, and then to print it out
    if (bigPokemon == pokemonList[i].height){
     document.write("  - Wow, thats big! This is the one of the biggest pokemon out here." + "<br>");
    }
    else {document.write("<br>");
    }
}*/

// I am determining the biggest pokemon of all, 
// if there are two with the same biggest size, all of them will be printed later on
    let bigPokemon = null;
            for (k=0; k<pokemonList.length; k++)
            {
                if(bigPokemon <= pokemonList[k].height)
                { 
                    bigPokemon = pokemonList[k].height;
                    k++;
                } else {
                    k++;
                }
            }
    // PRINTING OUT THE LIST OF POKEMONS IN THE LIST WITH *** forEach() LOOP ****
    function myLoopFunction(pokemon) {
        let text=" ";
        text = "Name of the Pokemon: " + pokemon.name + " - Height: " + pokemon.height + "m " + " - Types: " + pokemon.types;
        document.write(text);
    // Condition to determine the biggest pokemon and to compare it with my results from up, and then to print it out
        if (bigPokemon == pokemon.height){
        document.write("  - Wow, thats big! This is the one of the biggest pokemon out here." + "<br>");
        }
        else {document.write("<br>");
        }
    }

  pokemonList.forEach(myLoopFunction);