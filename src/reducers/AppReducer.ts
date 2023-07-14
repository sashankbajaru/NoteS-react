// @ts-nocheck
import {
  ADD_NOTE,
  CHANGE_INPUT,
  CHANGE_COLOR,
  UPDATE_NOTES,
  CHANGE_TITLE,
  ADD_PINEED,
  UNPIN_NOTE,
} from "../actions/actionTypes";

const initialState = {
  notes: [],
  title: "",
  inputValue: "",
  selectedColor: "#D3D3D3",
  pinned: [],
};

const AppReducer = (noteState = initialState, action: any) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...noteState,
        notes: [...noteState.notes, action.payload],
      };
    case UPDATE_NOTES:
      return {
        ...noteState,
        notes: action.payload,
      };
    case CHANGE_TITLE:
      return { ...noteState, title: action.payload };
    case CHANGE_INPUT:
      console.log(action);
      console.log(noteState);
      return { ...noteState, inputValue: action.payload };
    case ADD_PINEED:
      const index = action.payload;
      const updatedNotes = [...noteState.notes];
      updatedNotes[index] = { ...updatedNotes[index], pinned: true };
      return { ...noteState, notes: updatedNotes };
    case UNPIN_NOTE:
      const ind = action.payload;
      const updatedNotes1 = [...noteState.notes];
      updatedNotes1[ind] = { ...updatedNotes1[ind], pinned: false };
      return { ...noteState, notes: updatedNotes1 };

    case CHANGE_COLOR:
      return { ...noteState, selectedColor: action.payload };
    default:
      return noteState;
  }
};

export default AppReducer;
