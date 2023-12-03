import { Action } from 'redux';

export const SET_FORM_DATA = 'SET_FORM_DATA';

interface SetFormDataAction extends Action<typeof SET_FORM_DATA> {
  payload: FormData;
}

export const setFormData = (formData: FormData): SetFormDataAction => ({
  type: SET_FORM_DATA,
  payload: formData,
});
