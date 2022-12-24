import './styles/general.css';
import './styles/card.css';
import './styles/loader.css';
import './styles/modal.css';
import './styles/gameboard.css';
import { CardSet } from './components/CardSet';

function App() {
  return (
    <div className="App">
      <h1 className="title">Mem-Meter</h1>
      <h2 className="desc">
        Click a tile only <span className="highlight"> once </span> in each
        round!
      </h2>

      <CardSet />
    </div>
  );
}

export default App;
