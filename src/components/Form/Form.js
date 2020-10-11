import React, { useState } from 'react';
import FormItem from '../FormItem/FormItem';
import styles from './Form.module.css';

const initialState = {
  name: '',
  amount: '',
};

const Form = () => {
  const [state, setState] = useState([initialState]);

  const handleChange = e => {
    const currentEl = e.target;
    if (!currentEl.closest('FORM').id) return;
    const id = Number(currentEl.closest('FORM').id);
    const { name, value } = e.currentTarget;
    const tempState = [...state];
    tempState[id] = { ...tempState[id], [name]: value };
    setState([...tempState]);
  };

  const addHandler = () => {
    setState(prev => [...prev, initialState]);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const { ...user } = state;

  //   console.log('state', state);
  //   console.log('user', user);

  //   // dispatch(authOperations.login(user));
  //   reset();
  //   // history.replace('/home');
  // };

  // const reset = () => {
  //   setState({ name: '', amount: '' });
  // };

  return (
    <>
      <div className={styles.container}>
        {state &&
          state.map((item, idx) => (
            <FormItem
              key={idx}
              handleChange={handleChange}
              state={item[idx]}
              id={idx}
            />
          ))}
      </div>

      <button type="button" onClick={addHandler} className={styles.add_btn}>
        Добавить
      </button>
    </>
  );
};

export default Form;
