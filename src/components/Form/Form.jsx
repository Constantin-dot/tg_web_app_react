import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import './Form.css';

export const Form = () => {
  const {
    tg,
  } = useTelegram();

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('physical');

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      street,
      subject,
    };

    tg.sendData(JSON.stringify(data));
  }, [country, city, street, subject]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные',
    })
  }, []);

  useEffect(() => {
    if (!country || !city || !street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, city, street]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);

    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    }
  }, [onSendData]);

  return (
    <div className={'form'}>
      <h3>Введите ваши данные:</h3>
      <input
        className={'input'}
        type={'text'}
        placeholder={'Страна'}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={'input'}
        type={'text'}
        placeholder={'Город'}
        value={city}
        onChange={onChangeCity}
      />
      <input
        className={'input'}
        type={'text'}
        placeholder={'Улица'}
        value={street}
        onChange={onChangeStreet}
      />
      <select className={'select'} value={subject} onChange={onChangeSubject}>
        <option vlaue={'physical'}>Физ. лицо</option>
        <option value={'legal'}>Юр. лица</option>
      </select>
    </div>
  );
};