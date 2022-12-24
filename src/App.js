import './styles/general.css';
import './styles/card.css';
import './styles/loader.css';
import './styles/modal.css';
import { CardSet } from './components/CardSet';
import { useRef } from 'react';

function App() {
  const roundRef = useRef(null);

  return (
    <div className="App">
      <h1 className="round" ref={roundRef}>
        Round 1
      </h1>
      <h1 className="title">Mem-Meter</h1>
      <h2 className="desc">Click a tile only once in each round!</h2>

      <CardSet roundRef={roundRef} />
    </div>
  );
}

export default App;
