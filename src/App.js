import './styles/general.css';
import './styles/card.css';
import { useState, useEffect } from 'react';
import { PokeCard } from './components/Pokemon';
import { Random } from './lib/Random';

// Figure out service worker installation
// const Pokedex = require('pokeapi-js-wrapper');
// INSTEAD SAVE AND SERVE FIRST 30 POKEMON FROM YOUR OWN SITE PAGE? no point of API then, just take a random offset and fetch 30 pokemon?

function App() {
  const [pokeArray, setPokeArray] = useState([]);

  // useEffect is called once <App/> component
  // has been mounted (componentDidMount)
  useEffect(
    () => {
      // Called on first mount
      console.log('mounted / rendered');

      async function fetchPoke() {
        let name, source;
        try {
          const pokeResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${Random.getRandomInt(1, 905)}/`
          );
          const pokeResponseJSON = await pokeResponse.json();

          name = await pokeResponseJSON.name;
          source = await pokeResponseJSON.sprites.other['official-artwork']
            .front_default;
        } catch {
          name = '???';
          source = ''; // put a source of ??? Pokemon
        }

        return { name, source };
      }

      async function fetchMultiplePoke() {
        const array = [];
        for (let i = 0; i < 4; i++) {
          const poke = await fetchPoke();
          console.log(poke);
          array.push(poke);
        }

        // Triggers re-render on every change of state
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

  // Called on every render
  console.log('mounting... / rendering...');
  return (
    <div className="App">
      <h1 className="title">Mem-Meter</h1>

      <div className="poke-cards">
        {console.log('In render call:', pokeArray)}
        {(() => {
          if (pokeArray.length === 0) {
            console.log('NONETHING');
            return <h2 className="load-text">Loading...</h2>;
          } else {
            return pokeArray.map((poke, i) => (
              <PokeCard sourceURL={poke.source} caption={poke.name} key={i} />
            ));
          }
        })()}
      </div>
    </div>
  );
}

export default App;
