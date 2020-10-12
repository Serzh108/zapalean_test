import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formOperations from '../../redux/formOperations';
import FormItem from '../FormItem/FormItem';
import styles from './Form.module.css';

const initialState = {
  name: '',
  amount: '',
};

const Form = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.piechart);

  const handleChange = e => {
    const currentEl = e.target;
    if (!currentEl.closest('FORM').id) return;
    const id = Number(currentEl.closest('FORM').id);
    let { name, value } = e.currentTarget;
    // =========- ? -========
    const valueD = Math.abs(Number(value));
    value = valueD ? valueD : value;
    // =========- /? -========
    dispatch(formOperations.writeData({ id, [name]: value }));
  };

  const addHandler = () => {
    dispatch(formOperations.addForm(initialState));
  };

  return (
    <>
      <div className={styles.container}>
        {items &&
          items.map((item, idx) => (
            <FormItem
              key={idx}
              handleChange={handleChange}
              itemCur={item}
              id={idx}
            />
          ))}
      </div>

      <button type="button" onClick={addHandler} className={styles.add_btn}>
        Добавить
      </button>

      <p className={styles.form_link}>
        <NavLink to="/piechart">Перейти к Pie Chart</NavLink>
      </p>
    </>
  );
};

export default Form;
