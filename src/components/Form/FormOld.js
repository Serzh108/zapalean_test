import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import formOperations from '../../redux/formOperations';
import FormItem from '../FormItem/FormItem';
import styles from './Form.module.css';

const initialState = {
  name: '',
  amount: '',
};

const Form = () => {
  const [state, setState] = useState([initialState]);
  // -----===
  const dispatch = useDispatch();
  // -----===
  const handleChange = e => {
    const currentEl = e.target;
    if (!currentEl.closest('FORM').id) return;
    const id = Number(currentEl.closest('FORM').id);
    const { name, value } = e.currentTarget;
    const tempState = [...state];
    tempState[id] = { ...tempState[id], [name]: value };
    setState([...tempState]);
    // -----===
    dispatch(formOperations.writeData({ id, [name]: value }));
  };

  const addHandler = () => {
    setState(prev => [...prev, initialState]);
    // -----===
    dispatch(formOperations.addForm(initialState));
  };

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
