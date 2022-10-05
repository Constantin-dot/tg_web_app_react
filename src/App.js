import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Form } from './components/Form/Form';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { useTelegram } from './hooks/useTelegram';

const tg = window.Telegram.WebApp;

function App() {
  const {
    tg,
  } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'/form'} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
