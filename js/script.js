let myLibrary = [
    new Book("Dude", "Lets roll", "not read yet"),
    new Book("Dude2", "Lets roll2", "not read yet2"),
    new Book("Dude", "Lets roll", "not read yet"),
    new Book("Dude2", "Lets roll2", "not read yet2"),
    new Book("Dude", "Lets roll", "not read yet"),
    new Book("Dude2", "Lets roll2", "not read yet2"),
    new Book("Dude", "Lets roll", "not read yet"),
    new Book("Dude2", "Lets roll2", "not read yet2"),
];

function Book(author, title, status) {
    // the constructor...
    this.author = author;
    this.title = title;
    this.status = status;
}

function addBookToLibrary(author, title, status) {
    myLibrary.push(new Book(author, title, status));
}
function removeBookFromLibrary() {}
function updateBook() {}

/* 
█ █ ▄▀▀ ██▀ █▀▄    █ █▄ █ ▀█▀ ██▀ █▀▄ █▀ ▄▀▄ ▄▀▀ ██▀ 
▀▄█ ▄█▀ █▄▄ █▀▄    █ █ ▀█  █  █▄▄ █▀▄ █▀ █▀█ ▀▄▄ █▄▄  */
const container = document.querySelector(".container");
const table = document.querySelector("#books");

function displayBooks() {
    //CLEAR
    table.innerText = "";

    //TABLE HEADERS
    const keys = Object.keys(new Book());
    keys.forEach((element) => {
        const th = document.createElement("th");
        th.innerText = element.toUpperCase();
        table.appendChild(th);
    });

    //TABLE ELEMENTS
    if (myLibrary.length > 0) {
        myLibrary.forEach((book) => {
            const tr = document.createElement("tr");
            for (const prop in book) {
                const td = document.createElement("td");
                td.innerText = book[prop];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
    } else {
        const td = document.createElement("td");
        td.colSpan = keys.length;
        td.innerText = "Add some books to your library!";
        table.appendChild(document.createElement("tr")).appendChild(td);
    }
}

/* 
█▄ ▄█ ▄▀▄ █▀▄ ▄▀▄ █   
█ ▀ █ ▀▄▀ █▄▀ █▀█ █▄▄  */
const modalAddBook = document.querySelector("#modal-addBook");

//SUBMIT
const btnAddBookSubmit = document.querySelector("#addBookSubmit");
btnAddBookSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const author = document.querySelector("#author");
    const title = document.querySelector("#title");
    const status = document.querySelector("#status");
    myLibrary.push(new Book(author.value, title.value, status.value));
    displayBooks();
    closeModal(modalAddBook);
});

//CLOSE
const btnModalClose = document.querySelector("#btnModalClose");
btnModalClose.addEventListener("click", (event) => {
    closeModal(modalAddBook);
});
closeModal = (modal) => {
    modal.querySelector("form").reset();
    modal.remove();
};
closeModal(modalAddBook);

/* 
██▄ █ █ ▀█▀ ▀█▀ ▄▀▄ █▄ █ ▄▀▀ 
█▄█ ▀▄█  █   █  ▀▄▀ █ ▀█ ▄█▀  */
//ADD BOOK
const btnAddBook = document.querySelector("#addBook");
btnAddBook.addEventListener("click", (event) => {
    container.appendChild(modalAddBook);
});

displayBooks();
