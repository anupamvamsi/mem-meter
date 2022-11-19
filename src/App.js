import { render } from '@testing-library/react';
import { Component, useEffect } from 'react';
import './App.css';

function App() {
  async function fetchRandomPokemon() {
    const app = document.querySelector('.App');
    console.log(app);
    // try {
    const poke = await fetch('https://pokeapi.co/api/v2/pokemon/905/');
    const pokeJSON = await poke.json();
    console.log(pokeJSON);

    const pokeImg = document.createElement('img');
    pokeImg.src = pokeJSON.sprites.other['official-artwork'].front_default;

    console.log(pokeImg);
    app.appendChild(pokeImg);
    // } catch {}
  }

  useEffect(() => {
    // (() => {
    // setTimeout(fetchRandomPokemon, 0);
    // })();
    console.log('mounted');
    fetchRandomPokemon();
  });

  console.log('mounting...');
  return <div className="App">Moshi Moshi </div>;
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       imageSrc: '',
//     };
//   }

//   fetchRandomPokemon = async (id) => {
//     const app = document.querySelector('.App');
//     console.log(app);
//     // try {
//     const poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
//     const pokeJSON = await poke.json();
//     console.log(pokeJSON);

//     const pokeImg = document.querySelector('img');
//     pokeImg.src = pokeJSON.sprites.other['official-artwork'].front_default;
//     // this.setState({
//     //   imageSrc: pokeJSON.sprites.other['official-artwork'].front_default,
//     // });

//     console.log(pokeImg);
//     app.appendChild(pokeImg);
//     // } catch {}
//     return pokeJSON;
//   };

//   async componentDidMount() {
//     // console.log('mounted');
//     // // const pokeJSON = setTimeout(() => this.fetchRandomPokemon(901), 0);
//     const pokeJSON = await this.fetchRandomPokemon(1);
//     // console.log(pokeJSON);
//     //
//     // const pokeImg = document.querySelector('img');
//     //
//     // Setting state or props (thereby modifying them) triggers the componentDidUpdate() function
//     // this.setState(
//     //   {
//     //     imageSrc: pokeJSON.sprites.other['official-artwork'].front_default,
//     //   },
//     //   // this function / callback provides .src for the img
//     //   () => {
//     //     pokeImg.src = this.state.imageSrc;
//     //   }
//     // );
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     console.log('updated');
//   }

//   render() {
//     console.log('mounting...');
//     return (
//       <div className="App">
//         <img src="" alt="enamoros" />
//         Moshi Moshi
//         <button
//           onClick={() =>
//             this.fetchRandomPokemon(Math.floor(Math.random() * 905 + 1))
//           }
//         >
//           Click me
//         </button>
//       </div>
//     );
//   }
// }

export default App;
// App.fetchRandomPokemon();
