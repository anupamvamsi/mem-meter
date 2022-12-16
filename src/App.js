import './styles/general.css';
import './styles/card.css';
import './styles/loader.css';
import './styles/modal.css';
import React, { useState, useEffect } from 'react';
import { PokeCard } from './components/Pokemon';
import { Random } from './lib/Random';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';

// Figure out service worker installation
// const Pokedex = require('pokeapi-js-wrapper');
// INSTEAD SAVE AND SERVE FIRST 30 POKEMON FROM YOUR OWN SITE PAGE? no point of API then, just take a random offset and fetch 30 pokemon?
const NUM_POKE_MAX_FOR_GAME = 10;

const ALLOWED_NUM_OF_SAME_POSITIONS = 0;

function App() {
  const [numPokeCurrRound, setNumPokeCurrRound] = useState(4);
  const [numChangeInPositions, setNumChangeInPositions] = useState(
    numPokeCurrRound - ALLOWED_NUM_OF_SAME_POSITIONS
  );

  const [pokeArray, setPokeArray] = useState([]);
  const [clickedPokeCards, setClickedPokeCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  async function fetchPoke() {
    let name, source;
    try {
      const pokeID = Random.getRandomInt(1, 905);

      const pokeResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeID}/`
      );
      const pokeResponseJSON = await pokeResponse.json();

      name = await pokeResponseJSON.species.name;
      source = await pokeResponseJSON.sprites.other['official-artwork']
        .front_default;
    } catch {
      name = '???';
      source = ''; // put a source of ??? Pokemon
    }

    return { name, source };
  }

  async function fetchMultiplePoke() {
    let initArray;
    if (pokeArray.length === NUM_POKE_MAX_FOR_GAME) {
      initArray = [];
    } else {
      initArray = pokeArray;
    }

    for (
      let i = initArray.length;
      i < numPokeCurrRound && numPokeCurrRound <= NUM_POKE_MAX_FOR_GAME;
      i++
    ) {
      const poke = await fetchPoke();
      // console.log(poke);

      // CHECK FOR DUPLICATES
      const isDuplicate = initArray.find((p) => p.name === poke.name);
      if (isDuplicate) {
        i--;
        continue;
      }

      initArray.push(poke);
    }

    // Triggers re-render on every change of state
    setPokeArray(initArray);
    randomizeCards();

    // Reset / Ensure clickedPokeCards is empty
    setClickedPokeCards([]);
    console.info('setState (pokeArray to initArray) - triggering re-render');
  }

  // useEffect is called once <App/> component
  // has been mounted (componentDidMount)
  useEffect(
    () => {
      // Called on first mount
      console.info('mounted / rendered');

      fetchMultiplePoke();
    },
    // Empty array is given to run the useEffect function, i.e.,
    // fetchPoke() only once.
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once/53121021#53121021
    [numPokeCurrRound]
  );

  useEffect(() => {
    console.log('clickedCard 2: ', clickedPokeCards);

    function didWin() {
      console.log('SAME LENGTH!!!', numPokeCurrRound);
      if (numPokeCurrRound < NUM_POKE_MAX_FOR_GAME) {
        setNumPokeCurrRound(numPokeCurrRound + 2);
      }
      setNumChangeInPositions(numPokeCurrRound - ALLOWED_NUM_OF_SAME_POSITIONS);
      console.log(numPokeCurrRound);
    }

    if (
      pokeArray.length > 0 &&
      clickedPokeCards.length === NUM_POKE_MAX_FOR_GAME
    ) {
      alert('YOU WIN!');
      setGameOver(true);
      // setNumPokeCurrRound(4);
    }

    if (pokeArray.length > 0 && clickedPokeCards.length === pokeArray.length) {
      didWin();
    }
  }, [clickedPokeCards]);

  function clickTracker(e) {
    const clickedCard = e.currentTarget;

    // Track clicked cards
    console.info('setState (clickedArray) - triggering re-render');
    console.log('clickedCard 1: ', clickedCard, clickedPokeCards);

    const present = clickedPokeCards.find((card) => card === clickedCard);
    if (!present) {
      setClickedPokeCards(clickedPokeCards.concat(clickedCard));
    } else {
      // alert('Game over!');
      setGameOver(true);
    }
  }

  // Event listener to randomize cards
  function randomizeCards(e) {
    /////////////////////////////////////////////////////////////////////
    // RANDOMIZATION ////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    // Guaranteed to not let any one tile to be in the position it
    // was in, before the click.
    /////////////////////////////////////////////////////////////////////
    // How does it work?
    // 0. The current list of Pokemon (pokeArray) is copied into another,
    //    `origPokeArray`, from which another temporary array `oldPos`
    //    is created to remember the old (current) positions.
    // 1. A for-loop runs for N number of times (N = number of Pokemon /
    //    present on the UI).
    // 2. Two random numbers are generated with ranges [0, N - 1 - M]
    //    and [0, N], where M is the `i`th iteration of the loop.
    // 3. The first random number (randomIdx1) is used to select and
    //    extract a random Pokemon (extractedPoke) from the current list
    //    of Pokemon.
    // 4. This extracted random Pokemon is then added into a new list
    //   (randomizedPokeArray) at a randomly selected index (randomIdx2).
    // 5. With this new list, a check is performed using it along with
    //    the temporary array.
    // 6. If the randomized array has a Pokemon in the same position as
    //    the old array, it is excluded from `checkArray`.
    // 7. This means that, if the length of `checkArray` is equal to N,
    //    then NONE of the Pokemon are occupying the same position before
    //    the click (of a card) happened.
    // 8. If you think that there can be X Pokemon with possibly the
    //    same position as before, reduce N by X.
    /////////////////////////////////////////////////////////////////////
    const randomizedPokeArray = [];

    // Copy over pokeArray into originalArray
    const origPokeArray = pokeArray.map((poke) => poke);
    // Array to check against, for successful randomization
    const oldPos = origPokeArray.map((poke) => poke);

    for (let i = 0; i < numPokeCurrRound; i++) {
      const randomIdx1 = Random.getRandomInt(0, numPokeCurrRound - 1 - i);
      const randomIdx2 = Random.getRandomInt(0, numPokeCurrRound);

      // Remove ONE (1) element from randomIdx1
      const extractedPoke = origPokeArray.splice(randomIdx1, 1)[0];
      // Remove ZERO (0) and add at randomIdx2
      randomizedPokeArray.splice(randomIdx2, 0, extractedPoke);
    }

    const checkArray = randomizedPokeArray.filter(
      (newPos, i) => newPos.name !== oldPos[i].name
    );

    // console.log(
    //   'equal?',
    //   checkArray.length >= NUM_CHANGE_IN_POSITIONS,
    //   checkArray
    // );

    // 'e' is undefined when called in fetchMultiplePoke() call.
    // ONLY IF 'e' is defined, you can call randomizeCards(e) recursively.
    // ELSE, it results in infinite recursion!
    if (e && checkArray.length < numChangeInPositions) {
      return randomizeCards(e);
    }
    // console.log('//////////////////// equal');

    setPokeArray(randomizedPokeArray);
    console.info(
      'setState (pokeArray to randomizedArray) - triggering re-render'
    );
  }

  // Called on every render
  console.info('mounting... / rendering...');
  return (
    <div className="App">
      <h1 className="title">Mem-Meter</h1>

      <div className="poke-cards">
        {console.info('In render call:', pokeArray)}
        {console.log('//////////////////// end render\n')}
        {console.log()}

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
            return (
              <>
                <Modal
                  show={gameOver}
                  retry={() => {
                    if (pokeArray.length > 4) {
                      setPokeArray([]);
                      setGameOver(false);
                      setNumPokeCurrRound(4);
                      setClickedPokeCards([]);
                    }
                  }}
                  exit={() => {
                    window.close();
                  }}
                />
                {/* {console.log(
                  'SAAAAAAAMEEEEEE',
                  clickedPokeCards.length === pokeArray.length
                )} */}
                {pokeArray.map((poke, i) => (
                  <PokeCard
                    sourceURL={poke.source}
                    caption={poke.name}
                    key={poke.name}
                    count={i}
                    randomizeCards={randomizeCards}
                    clickTracker={clickTracker}
                    // separate calls of randomizeCards and clickTracker
                  />
                ))}
              </>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default App;
