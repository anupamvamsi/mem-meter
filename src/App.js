import { useState, useEffect } from 'react';
import './App.css';
import { Pokemon } from './components/Pokemon';
import { Random } from './lib/Random';

function App() {
  let [name, setName] = useState('No Pokemon here.');
  let [source, setSource] = useState('Could not load Pokemon.');

  useEffect(
    () => {
      async function fetchPoke() {
        const pokeResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${Random.getRandomInt(1, 905)}/`
        );
        const pokeResponseJSON = await pokeResponse.json();

        setName(pokeResponseJSON.name);
        setSource(
          pokeResponseJSON.sprites.other['official-artwork'].front_default
        );

        console.log(name, source);
      }

      fetchPoke();
    },
    // Empty array is given to run the useEffect function, i.e.,
    // fetchPoke() only once.
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once/53121021#53121021
    []
  );

  return (
    <div>
      {console.log(name, source)}
      <Pokemon sourceURL={source} caption={name} />
    </div>
  );
}

export default App;
