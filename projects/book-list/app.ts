// Written in ES6 compiled to ES5 with TypeScript
class Book {
  constructor(title, author, isbn) {
    this["title"] = title;
    this["author"] = author;
    this["isbn"] = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }

  showAlert(message, className) {
    // Create Div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    // Get form
    const form = document.querySelector("#book-form");

    // Insert alert
    container.insertBefore(div, form);

    // Remove after 3 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    (<HTMLInputElement>document.getElementById("title")).value = "";
    (<HTMLInputElement>document.getElementById("author")).value = "";
    (<HTMLInputElement>document.getElementById("isbn")).value = "";
  }
}

// Event Listeners for add book
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

    // Validate
    if (titleUI === "" || authorUI === "" || isbnUI === "") {
      // Show error alert
      ui.showAlert("Please fill in all fields", "error");
    } else {
      // Add book to list
      ui.addBookToList(book);
      // Show success alert
      ui.showAlert("Book added!", "success");

      // Clear input fields after book is added
      ui.clearFields();
    }

    e.preventDefault();
  }
);

// Event listener for delete

document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert("Book deleted!", "success");

  e.preventDefault();
});
