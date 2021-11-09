// A new pokemonRepository variable to hold what your IIFE will return, 
// then assigned IIFE to that variable
let pokemonRepository = (function () {
    let pokemonList = [];
    // The url to the extended API with pokemon data we are fetching
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    //Create a variable that contains the place of the container
    let modalContainer = document.querySelector('.modal-container');
    
    
    function showModal (pokemon) {
        modalContainer.innerHTML='';
        let type = pokemon.types[0].type.name;
        // Creating new button that contains pokemon details
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.classList.add(type+'-pokemon');

        //Close button Creation
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        //Create h1 tag with Pokemon name
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.forms[0].name;
        //Create paragraph that contains pokemon height
        let heightElement = document.createElement('p');
        heightElement.innerText='Height: '+pokemon.height/10 +' m';
        // Paragraph that contains pokemon type
        let typeElement = document.createElement('p');
        typeElement.innerText = 'Type: ' +type;
        // Add pokemon image url
        let img = document.createElement('img');
        img.classList.add('modal-img');
        img.src = pokemon.sprites.other['official-artwork']['front_default'];


        //Add the new created elements
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(typeElement);
        modal.appendChild(img);
        modalContainer.appendChild(modal);
        //Adding visiability to modal - when we want to show it
        modalContainer.classList.add('is-visible');
        console.log('trying to display the modal', modalContainer)
    }

    //This function hides modal when we click X, outise the box or esc
    function hideModal() {
        console.log('Inside HideModal function');
        modalContainer.classList.remove('is-visible');

    }

    //Hide modal on escape button
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    });

    // Hide modal on click outside the modal
    modalContainer.addEventListener('click', (e) => {
      // Closes only if the user clicks directly on the overlay

      let target = e.target;
      console.log(target);
      if (target === modalContainer) {
        hideModal();
      }
    });


    /*Function should add the Pokemon to the pokemonList array*/
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
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
    //A function that openes additional info after clicking one of the displayed buttons
    function pokemonEventListener(button, pokemon){
        button.addEventListener('click', showDetails.bind(this, pokemon, button));
    }

    //Function that shows a message :....loading Pokemon list while fetching the Api
    function showLoadingMessage(){
        let loadingMessage = document.querySelector('main');
        let button = document.createElement('button');
        button.innerText = 'Loading Pokemon List...';
        button.classList.add('loading-button');
        loadingMessage.appendChild(button);
    }

    /* A function that hide the
  message: "Loading Pokemon List..."
  after fetched and display all content from pokemon API */
  function hideLoadingMessage(){
    let loadingMsg = document.querySelector('main > button');
    loadingMsg.parentElement.removeChild(loadingMsg);
  }



    //Function that is reading html elements and then passing list of pokemons to each button
    //Event listener is passing more information about each pokemon we click, but on console for now
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
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
    showLoadingMessage();
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
      // hideLoadingMessage();
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }
  
    function loadDetails(item) {
        let url = item.detailsUrl;
        showLoadingMessage();

        console.log('url', url);
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          hideLoadingMessage();
          showModal(details);
          // item.imageUrl = details.sprites.front_default;
          // item.height = details.height;
          // item.types = details.types;
        }).catch(function (e) {
          // hideLoadingMessage();
          console.error(e);
        });
      }
  
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  
  
  


