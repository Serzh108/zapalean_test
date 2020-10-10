import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Form.module.css';

const initialState = {
  name: '',
  amount: '',
  isnameOnFocus: false,
  isamountOnFocus: false,
};

const Form = () => {
  const [state, setState] = useState(initialState);
  const nameInputId = uuidv4();
  const amountInputId = uuidv4();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { isnameOnFocus, isamountOnFocus, ...user } = state;

    console.log('state', state);
    console.log('user', user);

    // dispatch(authOperations.login(user));
    reset();
    // history.replace('/home');
  };

  const reset = () => {
    setState({ name: '', amount: '' });
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            value={state.name}
            name="name"
            type="text"
            id={nameInputId}
            className={styles.input}
            placeholder="Название"
            onChange={handleChange}
          />
          <input
            value={state.amount}
            name="amount"
            type="text"
            id={amountInputId}
            className={styles.input}
            placeholder="Количество"
            onChange={handleChange}
          />
          <button type="submit" className={styles.registration_btn}>
            Ввод
          </button>
        </form>
      </div>

      <button type="button" className={styles.registration_btn}>
        Добавить
      </button>

      <div>Form 2</div>
    </>
  );
};

export default Form;
