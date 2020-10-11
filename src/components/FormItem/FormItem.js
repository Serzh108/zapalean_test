import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './FormItem.module.css';

const FormItem = ({ handleChange, state = {}, id }) => {
  const nameInputId = uuidv4();
  const amountInputId = uuidv4();

  const { name, amount } = state;

  return (
    <form className={styles.form} id={id}>
      <input
        value={name}
        name="name"
        type="text"
        id={nameInputId}
        className={styles.input}
        placeholder="Название"
        onChange={handleChange}
      />
      <input
        value={amount}
        name="amount"
        type="number"
        id={amountInputId}
        className={styles.input}
        placeholder="Количество"
        onChange={handleChange}
      />
    </form>
  );
};

export default FormItem;
