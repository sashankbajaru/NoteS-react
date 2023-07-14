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
  unpinNote,
} from "./actions/actions";

const PinnedNoteList = ({ notes, updateNotes, pinnedList, unpinNote }) => {
  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i: number) => i !== index);
    updateNotes(updatedNotes);
  };

  const handleEditNote = (index: number) => {
    if (!notes[index].isEditable) {
      const updatedNotes = [...notes];
      updatedNotes[index] = { ...updatedNotes[index], isEditable: true };
      console.log("Hey1" + updatedNotes);
      updateNotes(updatedNotes);
    } else {
      console.log("Hey2 saving....");
      const updatedNotes = [...notes];
      updatedNotes[index] = { ...updatedNotes[index], isEditable: false };
      console.log(updatedNotes);
      updateNotes(updatedNotes);
    }
  };

  const handleNoteChanges = (e, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { ...updatedNotes[index], content: e.target.value };
    console.log("Hey4" + updatedNotes);
    updateNotes(updatedNotes);
  };

  const handleNoteTitleChanges = (e, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { ...updatedNotes[index], title: e.target.value };
    console.log("Hey4" + updatedNotes);
    updateNotes(updatedNotes);
  };

  console.log("Hey pinnedLIst", pinnedList, notes);

  return (
    <ul>
      {notes.map((note, index) =>
        note.pinned ? (
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
                    src="src/assets/delete-bin.png"
                    alt="Delete Note"
                    onClick={() => handleDeleteNote(index)}
                  />
                  <img
                    className="editIcon"
                    title={` ${note.isEditable ? "Save Note" : "Edit Note"}`}
                    src={` ${
                      note.isEditable
                        ? "src/assets/save-icon1.png"
                        : "src/assets/edit-icon.png"
                    }`}
                    alt="Edit Note"
                    onClick={() => handleEditNote(index)}
                  />
                  <img
                    className="pinIcon"
                    src="src/assets/unpin-icon.png"
                    alt="Pin Note"
                    title="unpin Note"
                    onClick={() => unpinNote(index)}
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
    unpinNote: (index: number) => dispatch(unpinNote(index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PinnedNoteList);