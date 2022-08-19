// pokemonRepository function (IIFE)
let pokemonRepository = (
  function() {
    // the first object ( pokemonList[0] ) is used as validation for the 'addv()' method
    let pokemonList = [
      {
        name: 'Bulbasaur',
        types: ['grass','poison'],
        height: 1.9,
      },
      {
        name: 'Charizard',
        types: ['fire','flying'],
        height: 9,
      },
      {
        name: 'Squirtle',
        types: ['water'],
        height: 4,
      }
    ];

    let searchResults;

    // 'add' pushes one argument to the pokemonList array WITHOUT validation
    function add(pokemon) {
      pokemonList.push(pokemon);
      console.log(`${pokemon.name} pokemon added!`);
    }

    // 'addv' pushes input to the pokemonList array WITH validation
    // the first object in pokemonList is considered 'valid'
    // the 'every' method is used to compare the sorted 'input' argument with sorted 'validInput' (comparing sorted 'Object.keys()' arrays) and returns a boolean
    function addv(input) {
      let validInput = Object.keys(pokemonList[0]).sort();

      if(typeof(input) == 'object') {
        let inputArray = Object.keys(input).sort();

        if(inputArray.every((value, index) => value === validInput[index])) {
          pokemonRepository.add(input);
        } else {
          console.log(`input=${input.name} is an object with incorrect keys...`)
        }

      } else {
        console.log(`input=${input} was not valid.`)
      }
    }

    // returns the pokemonList array
    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon) {
      let listItem = document.createElement('li');
      let button = document.createElement('button');

      button.innerText = `${pokemon.name}`;
      button.classList.add('pokemonTile');
      button.classList.add(pokemon.types[0]);
      listItem.appendChild(button);
      document.querySelector('.pokemon-list').appendChild(listItem);
    }
    
    function phraseHeight(height) {
      let phrase;
      
      if (height >= 6) {
        phrase = `This thing's HUGE! O_O`;
      } else if (height < 6 && height >= 4) {
        phrase = `That's about average o_o`;
      } else if (height < 4 && height >= 2){
        phrase = `Kind of a shorty -_-`;
      } else {
        phrase = `What a tiny little Pokemon! ^o^`;
      }
      
      return phrase;
    }

    // this function takes a query string and returns a filtered array from pokemonList names
    function filterByName(query){
      let nameArray = [];
      pokemonList.forEach(el => nameArray.push(el.name));
      return nameArray.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
    }

    // only the things in this returned object are accessible outside the scope of this function
    return {
      add: add,
      addv: addv,
      getAll: getAll,
      addListItem: addListItem,
      phraseHeight: phraseHeight,
      filterByName: filterByName
    }
  }
)();

// This loop evaluates the height of each pokemon in the pokemonList array and writes a string to the document.
// the 'poke' value is set to pokemon object at the current index
// the 'phrase' value is determined by the pokemon's height

pokemonRepository.addv('some random Pokemon');

pokemonRepository.addv(
  {
    name: 'Pidgey',
    types: ['flying', 'normal'],
    height: 3.5
  }
);

pokemonRepository.getAll().forEach(
  function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    }
);

document.querySelector('#searchResults').innerText = pokemonRepository.filterByName('e');
