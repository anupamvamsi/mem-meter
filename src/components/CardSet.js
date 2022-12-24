import React, { useState, useEffect } from 'react';
import { fetchPoke } from '../lib/utils';
import { Random } from '../lib/Random';
import { PokeCard } from './Pokemon';
import { Loader } from './Loader';
import { Modal } from './Modal';
import {
  ALLOWEDPOS,
  BASEROUND,
  POKEBASE,
  POKEMAX,
  setCols,
} from '../lib/constants';
import { Round } from './Round';

// Figure out service worker installation
// const Pokedex = require('pokeapi-js-wrapper');

export function CardSet(props) {
  const [numPokeCurrRound, setNumPokeCurrRound] = useState(POKEBASE);
  const [numChangeInPositions, setNumChangeInPositions] = useState(
    numPokeCurrRound - ALLOWEDPOS
  );
  const [roundNum, setRoundNum] = useState(BASEROUND);

  const [pokeArray, setPokeArray] = useState([]);
  const [clickedPokeCards, setClickedPokeCards] = useState([]);

  const [gameWin, setGameWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [fetchState, setFetchState] = useState(true);

  async function fetchMultiplePoke() {
    setFetchState(true);

    let initArray;
    if (pokeArray.length === POKEMAX) {
      initArray = [];
    } else {
      initArray = pokeArray;
    }

    for (
      let i = initArray.length;
      i < numPokeCurrRound && numPokeCurrRound <= POKEMAX;
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
    // console.info('setState (pokeArray to initArray) - triggering re-render');

    setFetchState(false);
  }

  // useEffect is called once <App/> component
  // has been mounted (componentDidMount)
  useEffect(
    () => {
      // Called on first mount
      // console.info('mounted / rendered');

      setNumChangeInPositions(numPokeCurrRound - ALLOWEDPOS);
      setCols(numPokeCurrRound);

      if (!gameOver) {
        fetchMultiplePoke();
      }
    },
    // Empty array is given to run the useEffect function, i.e.,
    // fetchPoke() only once.
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once/53121021#53121021
    [numPokeCurrRound, gameOver]
  );

  useEffect(() => {
    // console.log('clickedCard 2: ', clickedPokeCards);

    function didWin() {
      // console.log('SAME LENGTH!!!', numPokeCurrRound);
      if (numPokeCurrRound < POKEMAX) {
        setNumPokeCurrRound(numPokeCurrRound + 2);
        setRoundNum(roundNum + 1);
      }
      // console.log(numPokeCurrRound);
    }

    if (pokeArray.length > 0 && clickedPokeCards.length === POKEMAX) {
      // alert('YOU WIN!');
      setGameOver(true);
      setGameWin(true);
    }

    if (pokeArray.length > 0 && clickedPokeCards.length === pokeArray.length) {
      didWin();
    }
  }, [clickedPokeCards]);

  function clickTracker(e) {
    const clickedCard = e.currentTarget;

    // Track clicked cards
    // console.info('setState (clickedArray) - triggering re-render');
    // console.log('clickedCard 1: ', clickedCard, clickedPokeCards);

    const present = clickedPokeCards.find((card) => card === clickedCard);
    if (!present) {
      setClickedPokeCards(clickedPokeCards.concat(clickedCard));
    } else {
      setGameOver(true);
      setGameWin(false);
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

    // 'e' is undefined when called in fetchMultiplePoke() call.
    // ONLY IF 'e' is defined, you can call randomizeCards(e) recursively.
    // ELSE, it results in infinite recursion!
    if (e && checkArray.length < numChangeInPositions) {
      return randomizeCards(e);
    }
    // console.log('//////////////////// equal');

    setPokeArray(randomizedPokeArray);
    // console.info(
    // 'setState (pokeArray to randomizedArray) - triggering re-render'
    // );
  }

  // Called on every render
  // console.info('mounting... / rendering...');
  return (
    <div className="game-board">
      {(() => {
        if (!fetchState) {
          return <Round roundNum={roundNum} />;
        }
      })()}
      <div className="poke-cards">
        {/* {console.info('In render call:', pokeArray)} */}
        {/* {console.log('//////////////////// end render\n')} */}
        {/* {console.log()} */}

        {(() => {
          if (fetchState === true) {
            return <Loader />;
          } else {
            return (
              <>
                <Modal
                  show={gameOver}
                  result={gameWin ? 'Won' : 'Over'}
                  retry={() => {
                    if (pokeArray.length >= POKEBASE) {
                      setPokeArray([]);
                      setGameOver(false);
                      setGameWin(false);
                      setFetchState(true);
                      setRoundNum(BASEROUND);
                      setNumPokeCurrRound(POKEBASE);
                      setNumChangeInPositions(POKEBASE - ALLOWEDPOS);
                      setClickedPokeCards([]);
                    }
                  }}
                />
                {pokeArray.map((poke, i) => (
                  <PokeCard
                    sourceURL={poke.source}
                    caption={poke.name}
                    key={poke.name}
                    count={i}
                    randomizeCards={randomizeCards}
                    clickTracker={clickTracker}
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
