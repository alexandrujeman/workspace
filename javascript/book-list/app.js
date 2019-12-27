// Written in ES6 compiled to ES5 with TypeScript
var Book = /** @class */ (function () {
    function Book(title, author, isbn) {
        this["title"] = title;
        this["author"] = author;
        this["isbn"] = isbn;
    }
    return Book;
}());
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.addBookToList = function (book) {
        var list = document.getElementById("book-list");
        // Create tr element
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>" + book.title + "</td>\n      <td>" + book.author + "</td>\n      <td>" + book.isbn + "</td>\n      <td><a href=\"#\" class=\"delete\">X</a></td>\n    ";
        list.appendChild(row);
    };
    UI.prototype.showAlert = function (message, className) {
        // Create Div
        var div = document.createElement("div");
        // Add classes
        div.className = "alert " + className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        var container = document.querySelector(".container");
        // Get form
        var form = document.querySelector("#book-form");
        // Insert alert
        container.insertBefore(div, form);
        // Remove after 3 sec
        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 3000);
    };
    UI.prototype.deleteBook = function (target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    };
    UI.prototype.clearFields = function () {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    };
    return UI;
}());
// Local Storage Class
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.getBooks = function () {
        var books;
        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    };
    Store.displayBooks = function () {
        var books = Store.getBooks();
        books.forEach(function (book) {
            var ui = new UI();
            ui.addBookToList(book);
        });
    };
    Store.addBook = function (book) {
        var books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    };
    Store.removeBook = function (isbn) {
        var books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    };
    return Store;
}());
// DOM load event
Store.displayBooks();
// Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
    var titleUI = document.getElementById("title").value;
    var authorUI = document.getElementById("author")
        .value;
    var isbnUI = document.getElementById("isbn").value;
    // Instantiate a book
    var book = new Book(titleUI, authorUI, isbnUI);
    // Instantiate UI
    var ui = new UI();
    // Validate
    if (titleUI === "" || authorUI === "" || isbnUI === "") {
        // Show error alert
        ui.showAlert("Please fill in all fields", "error");
    }
    else {
        // Add book to list
        ui.addBookToList(book);
        // Add book to local storage
        Store.addBook(book);
        // Show success alert
        ui.showAlert("Book added!", "success");
        // Clear input fields after book is added
        ui.clearFields();
    }
    e.preventDefault();
});
// Event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
    var ui = new UI();
    // Delete book from UI
    ui.deleteBook(e.target);
    // Delete book from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show message
    ui.showAlert("Book deleted!", "success");
    // Prevent reload on submit
    e.preventDefault();
});
