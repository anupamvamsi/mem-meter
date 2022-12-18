import './styles/general.css';
import './styles/card.css';
import './styles/loader.css';
import './styles/modal.css';
import { CardSet } from './components/CardSet';

function App() {
  return (
    <div className="App">
      <h1 className="title">Mem-Meter</h1>

      <CardSet />
    </div>
  );
}

export default App;
