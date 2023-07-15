// @ts-nocheck
import React, { useState } from "react";
import "./App.css";
import { Note } from "./Note";
import { connect } from "react-redux";
import {
  addNote,
  changeInput,
  changeColor,
  updateNotes,
  changeTitle,
} from "./actions/actions";
import NoteList from "./NoteList";
import PinnedNoteList from "./PinnedNoteList";

const App = ({
  notes,
  title,
  inputValue,
  selectedColor,
  addNote,
  changeTitle,
  changeInput,
  changeColor,
  updateNotes,
}) => {
  const handleAddNote = () => {
    if (inputValue.trim() !== "") {
      addNote({
        title: title,
        content: inputValue,
        isEditable: false,
        color: selectedColor,
        pinned: false,
      });
      changeInput("");
      changeTitle("");
    }
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i: number) => i !== index);
    // setNotes(updatedNotes);
    updateNotes(updatedNotes);
  };

  const handleEditNote = (index: number) => {
    if (!notes[index].isEditable) {
      const updatedNotes = [...notes];
      updatedNotes[index] = { ...updatedNotes[index], isEditable: true };
      updateNotes(updatedNotes);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[index] = { ...updatedNotes[index], isEditable: false };
      updateNotes(updatedNotes);
    }
  };

  const handleNoteChanges = (e, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { ...updatedNotes[index], content: e.target.value };
    updateNotes(updatedNotes);
  };

  const handleNoteTitleChanges = (e, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { ...updatedNotes[index], title: e.target.value };
    updateNotes(updatedNotes);
  };

  const colors = [
    "#D3D3D3",
    "#d9e8ff",
    "#ffe6ea",
    "#d1f8e0",
    "#ffe6cc",
    "#d8f3ff",
    "#ffb0b0",
    "#fffdd0",
  ];
  return (
    <div>
      <h1>Notes App</h1>
      <div className="container">
        <div>
          <div className="noteContainer">
            <div
              style={{ backgroundColor: selectedColor }}
              className="newNoteInputStyle"
            >
              <input
                className="noteTitle"
                placeholder="Enter a title..."
                value={title}
                onChange={(e) => {
                  changeTitle(e.target.value);
                }}
              ></input>
              <hr className="h-line"></hr>
              <textarea
                className="noteContent"
                onChange={(e) => {
                  changeInput(e.target.value);
                }}
                placeholder="Enter a note..."
                value={inputValue}
              ></textarea>
              {inputValue ? (
                <img
                  className="deleteIcon"
                  title="clear note"
                  src="./src/assets/clear-icon.png"
                  alt="Clear Text"
                  onClick={() => changeInput("")}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <button className="addNoteButton" onClick={handleAddNote}>
            Add Note
          </button>
          <h2> Choose a Note color</h2>
          <div className="colorList">
            {colors.map((color, index) => (
              <div
                className={`colorBlock ${
                  selectedColor == color ? "selectedBorder" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => changeColor(color)}
              ></div>
            ))}
          </div>
        </div>
        <div className="separator"></div>
        <div className="noteAlign">
          <PinnedNoteList />
          <NoteList />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  notes: state.AppReducer.notes,
  inputValue: state.AppReducer.inputValue,
  title: state.AppReducer.title,
  selectedColor: state.AppReducer.selectedColor,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNote: (note: Note) => dispatch(addNote(note)),
    changeInput: (input: string) => dispatch(changeInput(input)),
    changeTitle: (title: string) => dispatch(changeTitle(title)),
    changeColor: (color: string) => dispatch(changeColor(color)),
    updateNotes: (notes: Note[]) => dispatch(updateNotes(notes)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
