import React, { useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { ProductItem } from "../ProductItem/ProductItem";
import './ProductList.css';

const products = [
  { id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета' },
  { id: '2', title: 'Куртка', price: 12000, description: 'Черного цвета' },
  { id: '3', title: 'Шорты', price: 4000, description: 'Зеленого цвета' },
  { id: '4', title: 'Брюки', price: 122, description: 'Розового цвета' },
  { id: '5', title: 'Ботинки', price: 3200, description: 'Желтого цвета' },
  { id: '6', title: 'Сумка', price: 600, description: 'Голубого цвета' },
  { id: '7', title: 'Шляпа', price: 2400, description: 'Соломенная' },
  { id: '8', title: 'Рюкзак', price: 11000, description: 'Кожаный' },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price;
  }, 0)
};

export const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      })
    }
  };

  const onSendData = useCallback(() => {
    const data = {
      queryId,
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
    }
    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);

    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    }
  }, [onSendData]);

  return (
    <div className={'list'}>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  );
};