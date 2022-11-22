import { useState, useEffect } from 'react';
import './App.css';
import { Pokemon } from './components/Pokemon';
import { Random } from './lib/Random';

let count = 0;
function App() {
  let [name, setName] = useState('uninit');
  let [source, setSource] = useState('uninitURL');

  useEffect(() => {
    async function fetchPoke() {
      const pokeResponse = await fetch(
        'https://pokeapi.co/api/v2/pokemon/905/'
      );
      const pokeResponseJSON = await pokeResponse.json();

      console.log(count++);
      setName(pokeResponseJSON.name);
      setSource(
        pokeResponseJSON.sprites.other['official-artwork'].front_default
      );

      console.log(await name, await source);
    }

    fetchPoke();
  });

  return (
    <div>
      <img src={source} alt={name} />
    </div>
  );
}

export default App;
