import { useState, useEffect } from 'react';
import './App.css';
import { Pokemon } from './components/Pokemon';
import { Random } from './lib/Random';

function App() {
  const [pokeArray, setPokeArray] = useState([]);

  useEffect(
    () => {
      console.log('mounted / rendered');

      async function fetchPoke() {
        const pokeResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${Random.getRandomInt(1, 905)}/`
        );
        const pokeResponseJSON = await pokeResponse.json();

        const name = await pokeResponseJSON.name;
        const source = await pokeResponseJSON.sprites.other['official-artwork']
          .front_default;

        // console.log(name, source);

        return { name, source };
      }

      async function fetchMultiplePoke() {
        const array = [];
        for (let i = 0; i < 4; i++) {
          const poke = await fetchPoke();
          console.log(poke);
          array.push(poke);
          // console.log('array:', array);
        }

        setPokeArray(array);
        console.log('setState - triggering re-render');
      }

      fetchMultiplePoke();
    },
    // Empty array is given to run the useEffect function, i.e.,
    // fetchPoke() only once.
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once/53121021#53121021
    []
  );

  console.log('mounting... / rendering...');
  return (
    <div>
      {console.log('In render call:', pokeArray)}
      {(() => {
        if (pokeArray.length > 0) {
          return (
            <>
              <Pokemon
                sourceURL={pokeArray[0].source}
                caption={pokeArray[0].name}
                // count={count}
              />
              <Pokemon
                sourceURL={pokeArray[1].source}
                caption={pokeArray[1].name}
                // count={count}
              />
              <Pokemon
                sourceURL={pokeArray[2].source}
                caption={pokeArray[2].name}
                // count={count}
              />
              <Pokemon
                sourceURL={pokeArray[3].source}
                caption={pokeArray[3].name}
                // count={count}
              />
            </>
          );
        }
      })()}
    </div>
  );
}

export default App;
