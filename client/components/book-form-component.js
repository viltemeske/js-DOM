class BookFormComponent {
    htmlElement;
    onSubmit;
    authorInput;
    titleInput;
    yearInput;
    readInput;
    formNameElement;
    submitButton;

    constructor({ onSubmit }) {
        this.htmlElement = document.createElement('form');
        this.htmlElement.className = 'shadow p-3';
        this.htmlElement.innerHTML = `
        <h2 class="h5 text-center">Add Book</h2>
        <div class="mb-3">
          <label for="author" class="form-label">Author</label>
          <input type="text" class="form-control" id="author" name="author">
        </div>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" name="title">
        </div>
        <div class="mb-3">
          <label for="year" class="form-label">Year</label>
          <input type="number" class="form-control" id="year" name="year">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="read" name="read">
          <label class="form-check-label" for="read">Is read</label>
        </div>
        <button type="submit" class="btn btn-success w-100">Add Book</button>`;
        this.onSubmit = onSubmit;
        this.authorInput = this.htmlElement.querySelector('[name=author]');
        this.titleInput = this.htmlElement.querySelector('[name=title]');
        this.yearInput = this.htmlElement.querySelector('[name=year]');
        this.readInput = this.htmlElement.querySelector('[name=read]');
        this.formNameElement = this.htmlElement.querySelector('h2');
        this.submitButton = this.htmlElement.querySelector('button');

        this.htmlElement.addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const values = {
            author: formData.get('author'),
            title: formData.get('title'),
            year: formData.get('year'),
            read: Boolean(formData.get('read')),
        }

        this.onSubmit(values);

        event.target.reset();
    }

    enableEditing = ({ author, title, year, read }) => {
        this.authorInput.value = author;
        this.titleInput.value = title;
        this.yearInput.value = year;
        this.readInput.checked = read;
        this.formNameElement.innerText = 'Update Book';
        this.submitButton.innerText = 'Update Book';
        this.submitButton.className = 'btn btn-warning w-100';
    }

    disableEditing = () => {
        this.htmlElement.reset();
        this.formNameElement.innerText = 'Add Book';
        this.submitButton.innerText = 'Add Book';
        this.submitButton.className = 'btn btn-success w-100';
    }
}

export default BookFormComponent;
