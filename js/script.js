let myLibrary = [new Book("Dude", "Lets roll", "not read yet")];

function Book(author, title, status) {
    // the constructor...
    this.author = author;
    this.title = title;
    this.status = status;
}

function addBookToLibrary(author, title, status) {
    // do stuff here
    myLibrary.push(new Book(author, title, status));
}
function removeBookFromLibrary() {}
function updateBook() {}

/* 
█ █ ▄▀▀ ██▀ █▀▄    █ █▄ █ ▀█▀ ██▀ █▀▄ █▀ ▄▀▄ ▄▀▀ ██▀ 
▀▄█ ▄█▀ █▄▄ █▀▄    █ █ ▀█  █  █▄▄ █▀▄ █▀ █▀█ ▀▄▄ █▄▄  */
function displayBooks() {
    /* Write a function that loops through the array and displays 
    each book on the page. You can display them in some sort of
    table, or each on their own “card”. It might help for now to
    manually add a few books to your array so you can see the display. */
    
}
console.log(myLibrary);
