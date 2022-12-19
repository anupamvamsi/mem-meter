import { Random } from '../lib/Random';
// PID = Pokemon ID, a = first Poke, z = last Poke
import { PIDa, PIDz } from './constants';

export async function fetchPoke() {
  let name, source;
  try {
    const pokeID = Random.getRandomInt(PIDa, PIDz);

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
