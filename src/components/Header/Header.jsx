import React from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Button } from "../Button/Button";
import './Header.css';

export const Header = (props) => {
  const {
    onClose,
    user,
  } = useTelegram();

  return (
    <div className={'header'}>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={'username'}>
        {user}
      </span>
    </div>
  );
};