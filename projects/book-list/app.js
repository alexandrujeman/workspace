// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI() { }
UI.prototype.addBookToList = function (book) {
    var list = document.getElementById("book-list");
    // Create tr element
    var row = document.createElement("tr");
    row.innerHTML = "\n    <td>" + book.title + "</td>\n    <td>" + book.author + "</td>\n    <td>" + book.isbn + "</td>\n    <td><a href=\"#\" class=\"delete\">X</a></td>\n  ";
    list.appendChild(row);
};
// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
    var titleUI = document.getElementById("title").value;
    var authorUI = document.getElementById("author")
        .value;
    var isbnUI = document.getElementById("isbn").value;
    // Instantiate a book
    var book = new Book(titleUI, authorUI, isbnUI);
    // Instantiate UI
    var ui = new UI();
    ui.addBookToList(book);
    e.preventDefault();
});
