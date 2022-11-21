import { useEffect } from 'react';
import { Random } from '../lib/Random';

export function Pokemon(props) {
  async function fetchRandomPokemon(id) {
    const pokeImg = document.createElement('img');
    const pokeCaption = document.createElement('p');
    pokeImg.classList.add('pc-img');
    pokeCaption.classList.add('pc-caption');

    try {
      const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const pokeJSON = await poke.json();
      console.log('pokeJSON:', pokeJSON);

      pokeCaption.textContent = pokeJSON.name;
      pokeImg.src = pokeJSON.sprites.other['official-artwork'].front_default;
      pokeImg.alt = `An image of the Pokemon, ${pokeCaption.textContent}`;

      console.log('pokeImg:', pokeImg);
    } catch {
      pokeCaption.textContent = 'Oops. No Pokemon here!';
      pokeImg.alt = 'Unable to fetch Pokemon.';
    }

    console.log('pokeCardImg:', pokeImg);
    console.log('pokeCardCaption:', pokeCaption);

    return { pokeImg, pokeCaption };
  }

  async function buildPokeCard() {
    const pokeCard = document.createElement('div');
    pokeCard.classList.add('poke-card');

    const pokeID = Random.getRandomInt(1, 905);

    try {
      const { pokeCardImg, pokeCardCaption } = await fetchRandomPokemon(pokeID);

      // not cardCaptor hehe
      // pokeCardImg.classList.add('pc-img');
      // pokeCardCaption.classList.add('pc-caption');
      // setTimeout(() => console.log('pokeCardImg:', pokeCardImg), 1000);
      // setTimeout(() => console.log('pokeCardCaption:', pokeCardCaption), 1000);

      pokeCard.appendChild(pokeCardImg);
      pokeCard.appendChild(pokeCardCaption);

      console.log('pokeCard:', pokeCard);
    } catch {
      pokeCard.textContent = 'Oh nooo';
    }
    return pokeCard;
  }

  const callOnce = buildPokeCard();
  // useEffect(() => {
  //   buildPokeCard();
  // });

  return (
    // <div className="poke-card">
    // {/* <img className="poke-img" src="" alt=""/> */}
    <>{callOnce}</>
    // </div>
  );
}
