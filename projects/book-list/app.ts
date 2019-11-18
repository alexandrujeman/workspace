// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Event Listeners
document.getElementById("book-form").addEventListener(
  "submit",

  function(e) {
    const titleUI = (<HTMLInputElement>document.getElementById("title")).value;
    const authorUI = (<HTMLInputElement>document.getElementById("author"))
      .value;
    const isbnUI = (<HTMLInputElement>document.getElementById("isbn")).value;

    // Instantiate a book
    const book = new Book(titleUI, authorUI, isbnUI);

    // Instantiate UI
    const ui = new UI();

    ui.addBookToList(book);

    e.preventDefault();
  }
);
