import { useSelector, useDispatch } from "react-redux";
import { selectNotes, eraseNote, addNote } from "../store/notesSlice.js";
function Notes({ bookId }) {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes).filter(
    (note) => note.book_id == bookId
  );
  console.log(notes);
  function handleEraseNote(id) {
    if (window.confirm("Are you sure you want to erase this note?")) {
      dispatch(eraseNote(id));
    }
  }
  function handleAddNote(e) {
    e.preventDefault();
    console.log(
      "add note" + document.querySelector("textarea[name='note']").value
    );
    const newNote = {
      book_id: bookId,
      title: document.querySelector("input[name='title']").value,
      text: document.querySelector("textarea[name='note']").value,
    };
    if (!newNote.title || !newNote.text) {
      alert("Please fill in all fields");
      return;
    } else {
      dispatch(addNote(newNote));
      alert("created new Note successfully");
    }

    navigate("/");
  }

  return (
    <>
      <div className="notes-wrapper">
        <h2>Reader's Notes</h2>
        {notes.length ? (
          <div className="notes">
            {notes.map((note) => (
              <div key={note.id} className="note">
                <div
                  className="erase-note"
                  onClick={() => handleEraseNote(note.id)}
                >
                  Erase note
                </div>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>No notes yet</div>
        )}

        <details>
          <summary>Add a note</summary>
          <form className="add-note">
            <div className="form-control">
              <label>Title *</label>
              <input type="text" name="title" placeholder="Add a note title" />
            </div>
            <div className="form-control">
              <label>Note *</label>
              <textarea type="text" name="note" placeholder="Add note" />
            </div>

            <button className="btn btn-block" onClick={(e) => handleAddNote(e)}>
              Add Note
            </button>
          </form>
        </details>
      </div>
    </>
  );
}

export default Notes;
