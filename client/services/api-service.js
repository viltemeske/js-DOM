const serverAddress = 'http://localhost:3000';

const getBooks = async () => {
  const response = await fetch(`${serverAddress}/books`);
  const books = await response.json();

  return books;
}

const deleteBook = async (id) => {
  const response = await fetch(`${serverAddress}/books/${id}`, {
    method: 'DELETE'
  });
  const books = await response.json();

  return books;
}

const createBook = async (bookProps) => {
    const response = await fetch(`${serverAddress}/books`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(bookProps)
    });
    const books = await response.json();
  
    return books;
  }

const updateBook = async (id, bookProps) => {
    const response = await fetch(`${serverAddress}/books/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(bookProps)
    });
    const books = await response.json();
  
    return books;
  }

const ApiService = {
  getBooks,
  deleteBook,
  createBook,
  updateBook,
};

export default ApiService;