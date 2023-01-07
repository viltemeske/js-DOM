import AlertComponent from "./components/alert-component.js";
import BookFormComponent from "./components/book-form-component.js";
import BooksTableComponent from "./components/books-table-component.js";
import ContainerComponent from "./components/container-component.js";
import FlexContainerComponent from "./components/flex-container-component.js"
import ApiService from "./services/api-service.js";

let booksTableComponent;
let bookFormComponent;
let alertComponent;

let books;
let editedRowId = null;

const handleBookDelete = async (id) => {
    try {
        await ApiService.deleteBook(id);
        books = await ApiService.getBooks();
        booksTableComponent.renderBooks(books, editedRowId);
    } catch (error) {
        alertComponent.show(error.message);
    }
}
const handleBookCreate = async (bookProps) => {
    try {
        await ApiService.createBook(bookProps);
        books = await ApiService.getBooks();
        booksTableComponent.renderBooks(books, editedRowId);
    } catch (error) {
        alertComponent.show(error.message);
    }
}
const handleBookUpdate = async (bookProps) => {
    try {
        await ApiService.updateBook(editedRowId, bookProps);
        books = await ApiService.getBooks();
        editedRowId = null;
        bookFormComponent.disableEditing();
        booksTableComponent.renderBooks(books, editedRowId);
    } catch (error) {
        alertComponent.show(error.message);
    }
}

const handleBookEdit = (bookProps) => {
    if (editedRowId === bookProps.id) editedRowId = null;
    else editedRowId = bookProps.id;
  
    booksTableComponent.renderBooks(books, editedRowId);
    if (editedRowId === null) {
      bookFormComponent.disableEditing();
      bookFormComponent.onSubmit = handleBookCreate;
    } else {
      bookFormComponent.enableEditing(bookProps);
      bookFormComponent.onSubmit = handleBookUpdate;
    }
  }

  (async function initialize() {
    const rootHtmlElement = document.querySelector('#root');
    const containerComponent = new ContainerComponent();
    alertComponent = new AlertComponent();
    containerComponent.addComponents(alertComponent);
    rootHtmlElement.append(containerComponent.htmlElement);
    try {
      books = await ApiService.getBooks();
      booksTableComponent = new BooksTableComponent({
        books,
        onDelete: handleBookDelete,
        onEdit: handleBookEdit,
      });
      bookFormComponent = new BookFormComponent({
        onSubmit: handleBookCreate,
      });
      const flexContainerComponent = new FlexContainerComponent();
      flexContainerComponent.addComponents(booksTableComponent, bookFormComponent);
      containerComponent.addComponents(flexContainerComponent);
    } catch (error) {
      alertComponent.show(error.message);
    }
  })();
  