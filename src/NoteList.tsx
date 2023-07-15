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
  addPin,
} from "./actions/actions";

const NoteList = ({ notes, updateNotes, pinnedList, addPinnedNote }) => {
  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i: number) => i !== index);
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

  return (
    <ul>
      {notes.map((note, index) =>
        !note.pinned ? (
          <li key={index} className="noteList">
            <div className="noteContainer">
              <div
                style={{ backgroundColor: note.color }}
                className="newNoteInputStyle"
              >
                <input
                  className="noteTitle"
                  readOnly={!note.isEditable}
                  value={note.title}
                  onChange={(e) => {
                    handleNoteTitleChanges(e, index);
                  }}
                ></input>
                <hr className="h-line"></hr>
                <textarea
                  className="noteContent"
                  readOnly={!note.isEditable}
                  onChange={(e) => {
                    handleNoteChanges(e, index);
                  }}
                  value={note.content}
                >
                  {note.content}
                </textarea>
                <div className="footerStyle">
                  <img
                    className="deleteIcon"
                    title="Delete Note"
                    src="../dist/assets/delete-bin.png"
                    alt="Delete Note"
                    onClick={() => handleDeleteNote(index)}
                  />
                  <img
                    className="editIcon"
                    title={` ${note.isEditable ? "Save Note" : "Edit Note"}`}
                    src={` ${
                      note.isEditable
                        ? "../dist/assets/save-icon1.png"
                        : "../dist/assets/edit-icon.png"
                    }`}
                    alt="Edit Note"
                    onClick={() => handleEditNote(index)}
                  />
                  <img
                    className="pinIcon"
                    src="../dist/assets/pin-icon.png"
                    alt="Pin Note"
                    title="Pin Note"
                    onClick={() => addPinnedNote(index)}
                  />
                </div>
              </div>
            </div>
          </li>
        ) : (
          ""
        )
      )}
    </ul>
  );
};

const mapStateToProps = (state: any) => ({
  notes: state.AppReducer.notes,
  inputValue: state.AppReducer.inputValue,
  title: state.AppReducer.title,
  selectedColor: state.AppReducer.selectedColor,
  pinnedList: state.AppReducer.pinned,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNote: (note: Note) => dispatch(addNote(note)),
    changeInput: (input: string) => dispatch(changeInput(input)),
    changeTitle: (title: string) => dispatch(changeTitle(title)),
    changeColor: (color: string) => dispatch(changeColor(color)),
    updateNotes: (notes: Note[]) => dispatch(updateNotes(notes)),
    addPinnedNote: (index: number) => dispatch(addPin(index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
