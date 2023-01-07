class BooksTableComponent {
    htmlElement;
    tbody;
    onDelete;
    onEdit;
    editedRowId;
  
    constructor({ books, onDelete, onEdit }) {
      this.htmlElement = document.createElement('table');
      this.htmlElement.className = 'table';
      this.htmlElement.innerHTML = ` 
      <thead class="bg-dark text-white">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Author</th>
      <th scope="col">Title</th>
      <th scope="col">Year</th>
      <th scope="col">Read</th>
      <th>Actions</th>
      </tr>
      </thead>
      <tbody></tbody>`;
      this.tbody = this.htmlElement.querySelector('tbody');
      this.onDelete = onDelete;
      this.onEdit = onEdit;
      this.editedRowId = null;
  
      this.renderBooks(books, null);
    }
  
    createRowHtmlElement = (book) => {
      const { id, author, title, year, read } = book;
      const tr = document.createElement('tr');
      const thisRowIsEdited = id === this.editedRowId;
      if (thisRowIsEdited) tr.classList.add('bg-edited');
      tr.innerHTML = `
        <td>${id}</td>
        <td>${author}</td>
        <td>${title}</td>
        <td>${year}</td>
        <td>${read}</td>
        <td>
          <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-warning btn-sm">${thisRowIsEdited ? 'Cancel' : '⟳'}</button>
            <button class="btn btn-danger btn-sm">✗</button>
          </div>
        </td>`;
  
      const deleteButton = tr.querySelector('.btn-danger');
      deleteButton.addEventListener('click', () => this.onDelete(id));
  
      const updateButton = tr.querySelector('.btn-warning');
      updateButton.addEventListener('click', () => this.onEdit(book));
  
      return tr;
    }
  
    renderBooks(books, editedRowId) {
      this.editedRowId = editedRowId;
      const rowsHtmlElements = books.map(this.createRowHtmlElement);
  
      this.tbody.innerHTML = null;
      this.tbody.append(...rowsHtmlElements);
    }
  }
  
  export default BooksTableComponent;
  