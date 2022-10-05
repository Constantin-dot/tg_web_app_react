import React from "react";
import { useTelegram } from "../../hooks/useTelegram";
import './ProductList.css';

export const ProductList = (props) => {
  const {
    onClose,
    user,
  } = useTelegram();

  return (
    <div className={''}>
      ProductList
    </div>
  );
};