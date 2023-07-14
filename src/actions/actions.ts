import { Note } from "../Note";
import {
  ADD_NOTE,
  CHANGE_INPUT,
  CHANGE_COLOR,
  UPDATE_NOTES,
  CHANGE_TITLE,
  ADD_PINEED,
  UNPIN_NOTE,
} from "./actionTypes";

export const addNote = (note: Note) => ({
  type: ADD_NOTE,
  payload: note,
});

export const changeInput = (input: string) => ({
  type: CHANGE_INPUT,
  payload: input,
});

export const changeTitle = (title: string) => ({
  type: CHANGE_TITLE,
  payload: title,
});

export const changeColor = (color: string) => ({
  type: CHANGE_COLOR,
  payload: color,
});

export const updateNotes = (notes: Note[]) => ({
  type: UPDATE_NOTES,
  payload: notes,
});

export const addPin = (index: number) => ({
  type: ADD_PINEED,
  payload: index,
});

export const unpinNote = (index: number) => ({
    type: UNPIN_NOTE,
    payload: index,
})
