import './styles/general.css';
import './styles/card.css';
import './styles/loader.css';
import React, { useState, useEffect } from 'react';
import { PokeCard } from './components/Pokemon';
import { Random } from './lib/Random';
import { Loader } from './components/Loader';

// Figure out service worker installation
// const Pokedex = require('pokeapi-js-wrapper');
// INSTEAD SAVE AND SERVE FIRST 30 POKEMON FROM YOUR OWN SITE PAGE? no point of API then, just take a random offset and fetch 30 pokemon?
const NUM_POKE_MAX_FOR_GAME = 10;
let NUM_POKE_IN_CURR_ROUND = 3;

function App() {
  const [pokeArray, setPokeArray] = useState([]);
  const [clickedPokeCards, setClickedPokeCards] = useState([]);

  // useEffect is called once <App/> component
  // has been mounted (componentDidMount)
  useEffect(
    () => {
      // Called on first mount
      console.log('mounted / rendered');

      async function fetchPoke() {
        let name, source;
        try {
          // Ensure no duplicate pokemon appear!
          const pokeID = Random.getRandomInt(1, 905);
          const pokeResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokeID}/`
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
        const initArray = [];
        for (let i = 0; i < NUM_POKE_IN_CURR_ROUND; i++) {
          const poke = await fetchPoke();
          console.log(poke);
          initArray.push(poke);
        }

        // Triggers re-render on every change of state
        setPokeArray(initArray);
        console.log('setState (pokeArray to initArray) - triggering re-render');
      }

      fetchMultiplePoke();
    },
    // Empty array is given to run the useEffect function, i.e.,
    // fetchPoke() only once.
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once/53121021#53121021
    []
  );

  // Event listener to randomize cards
  function randomizeCards(e) {
    const clickedCard = e.currentTarget;

    // Track clicked cards
    setClickedPokeCards(clickedPokeCards.concat(clickedCard));
    console.log('setState (clickedArray) - triggering re-render');

    // Copy over pokeArray into originalArray
    const origPokeArray = pokeArray.map((poke) => poke);
    const randomizedPokeArray = [];

    for (let i = 0; i < NUM_POKE_IN_CURR_ROUND; i++) {
      const randomIdx = Random.getRandomInt(0, NUM_POKE_IN_CURR_ROUND - 1 - i);

      // Remove ONE (1) element from randomIdx
      const pokeNewPosition = origPokeArray.splice(randomIdx, 1)[0];
      randomizedPokeArray.push(pokeNewPosition);
    }

    setPokeArray(randomizedPokeArray);
    console.log(
      'setState (pokeArray to randomizedArray) - triggering re-render'
    );

    // console.log('pokeArray:', pokeArray);
    // console.log('originalArray:', originalArray);
    // console.log('randomizedArray:', randomizedPokeArray);
  }

  // Called on every render
  console.log('mounting... / rendering...');
  return (
    <div className="App">
      <h1 className="title">Mem-Meter</h1>

      <div className="poke-cards">
        {console.log('In render call:', pokeArray)}

        {/* THE FOLLOWING React.Suspense IS NOT WORKING... */}
        {/* <React.Suspense fallback={<div className="load-text">HELOOOOO</div>}>
          {pokeArray.map((poke, i) => (
            <PokeCard sourceURL={poke.source} caption={poke.name} key={i} />
          ))}
        </React.Suspense> */}

        {(() => {
          if (pokeArray.length === 0) {
            return <Loader />;
          } else {
            return pokeArray.map((poke, i) => (
              <PokeCard
                sourceURL={poke.source}
                caption={poke.name}
                key={poke.name}
                randomizeCards={randomizeCards}
              />
            ));
          }
        })()}
      </div>
    </div>
  );
}

export default App;
