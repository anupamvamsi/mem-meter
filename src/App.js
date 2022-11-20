import { useEffect } from 'react';
import './App.css';

function App() {
  async function fetchRandomPokemon() {
    const app = document.querySelector('.App');
    const pokeImg = document.querySelector('img');
    // console.log(app);

    try {
      const poke = await fetch('https://pokeapi.co/api/v2/pokemon/905/');
      const pokeJSON = await poke.json();
      console.log(pokeJSON);

      pokeImg.src = pokeJSON.sprites.other['official-artwork'].front_default;
      // pokeImg.alt =

      console.log(pokeImg);
    } catch {
      pokeImg.alt = 'Unable to fetch Pokemon.';
    }
    app.appendChild(pokeImg);
  }

  useEffect(() => {
    fetchRandomPokemon();
  });

  return (
    <div className="App">
      <h1>Moshi Moshi</h1>
      <img src="" alt="Nothing loaded here yet." />
    </div>
  );
}

export default App;
