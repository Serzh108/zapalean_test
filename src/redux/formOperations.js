import { formSlice } from './formReducer';

const addForm = data => (dispatch, getState) => {
  dispatch(formSlice.actions.addForm(data));
};

const writeData = data => (dispatch, getState) => {
  dispatch(formSlice.actions.writeData(data));
};

export default { addForm, writeData };
