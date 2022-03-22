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