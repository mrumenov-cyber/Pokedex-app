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