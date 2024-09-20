import Notes from "../components/Notes.jsx";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectBooks, eraseBook, toggleRead } from "../store/booksSlice.js";
import { eraseBookNote } from "../store/notesSlice.js";
function SingleBookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("SingleBookPage");
  const { id } = useParams();
  console.log(id);
  const books = useSelector(selectBooks);
  const book = books.find((book) => book.id == id);

  function handleEarseBook(id) {
    if (
      window.confirm(
        "Are you sure you want to erase this book and all it's notes?"
      )
    ) {
      dispatch(eraseBook(id));
      dispatch(eraseBookNote(id));
      // navigate back to the home page after erasing the book
      navigate("/");
    }
  }
  return (
    <>
      <div className="container">
        <Link to={"/"}>
          <button className="btn">← Back to Books</button>
        </Link>
        {book ? (
          <div>
            <div className="single-book">
              <div className="book-cover">
                <img src={book.cover} />
              </div>

              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
                <p>{book.synopsis}</p>
                <div className="read-checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={book.isRead}
                    onClick={() => dispatch(toggleRead(id))}
                  />
                  <label>
                    {book.isRead ? "Already Read It" : "Haven't Read it yet"}
                  </label>
                </div>
                <div
                  className="erase-book"
                  onClick={() => handleEarseBook(book.id)}
                >
                  Erase book
                </div>
              </div>
            </div>
            <Notes bookId={id} />
          </div>
        ) : (
          <div>Book not found</div>
        )}
      </div>
    </>
  );
}

export default SingleBookPage;
