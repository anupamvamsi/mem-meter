import { useEffect } from 'react';
import './App.css';
import { Pokemon } from './components/Pokemon';
import { Random } from './lib/Random';

function App() {
  // async function fetchRandomPokemon() {
  //   const pokeCards = document.querySelector('.poke-cards');
  //   const pokeImg = document.createElement('img');
  //   // console.log(app);

  //   try {
  //     const poke = await fetch('https://pokeapi.co/api/v2/pokemon/905/');
  //     const pokeJSON = await poke.json();
  //     console.log(pokeJSON);

  //     pokeImg.src = pokeJSON.sprites.other['official-artwork'].front_default;
  //     pokeImg.alt = pokeJSON.name;

  //     console.log(pokeImg);
  //   } catch {
  //     pokeImg.alt = 'Unable to fetch Pokemon.';
  //   }
  //   pokeCards.appendChild(pokeImg);
  // }

  // async function fetchRandomPokemon(id) {
  //   const pokeCards = document.querySelector('.poke-cards');

  //   const pokeImg = document.createElement('img');
  //   const pokeCaption = document.createElement('p');
  //   pokeImg.classList.add('pc-img');
  //   pokeCaption.classList.add('pc-caption');

  //   try {
  //     const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  //     const pokeJSON = await poke.json();
  //     console.log('pokeJSON:', pokeJSON);

  //     pokeCaption.textContent = pokeJSON.name;
  //     pokeImg.src = pokeJSON.sprites.other['official-artwork'].front_default;
  //     pokeImg.alt = `An image of the Pokemon, ${pokeCaption.textContent}`;

  //     console.log('pokeImg:', pokeImg);
  //   } catch {
  //     pokeCaption.textContent = 'Oops. No Pokemon here!';
  //     pokeImg.alt = 'Unable to fetch Pokemon.';
  //   }

  //   console.log('pokeCardImg:', pokeImg);
  //   console.log('pokeCardCaption:', pokeCaption);

  //   pokeCards.appendChild(pokeImg);
  //   return { pokeImg, pokeCaption };
  // }

  // useEffect(() => {
  //   fetchRandomPokemon(Random.getRandomInt(1, 905));
  // });

  return (
    <div className="App">
      <h1>Moshi Moshi</h1>
      {/* <img src="" alt="Nothing loaded here yet." /> */}
      <div className="poke-cards">
        <Pokemon />
      </div>
    </div>
  );
}

export default App;
