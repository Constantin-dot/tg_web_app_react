import { useEffect } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Header } from './components/Header/Header';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
