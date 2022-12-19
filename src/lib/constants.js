const POKE_ID_FIRST = 1;
const POKE_ID_LAST = 905;
const NUM_POKE_MAX_FOR_GAME = 6;
const NUM_BASE_POKE = 2;
const ALLOWED_NUM_OF_SAME_POSITIONS = 0;

const rootElement = document.querySelector(':root');

function setCols(numPokeCurrRound) {
  if (numPokeCurrRound === 2) {
    rootElement.style.setProperty('--cols', numPokeCurrRound);
  } else {
    rootElement.style.setProperty('--cols', numPokeCurrRound / 2);
  }
}

export {
  POKE_ID_FIRST as PIDa,
  POKE_ID_LAST as PIDz,
  NUM_POKE_MAX_FOR_GAME as POKEMAX,
  NUM_BASE_POKE as POKEBASE,
  ALLOWED_NUM_OF_SAME_POSITIONS as ALLOWEDPOS,
  rootElement as ROOT,
  setCols,
};
