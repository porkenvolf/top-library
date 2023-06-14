let myLibrary = [
    new Book("Dude", "Lets roll", "Not read"),
    new Book("Dude2", "Lets roll2", "Read"),
    new Book("Dude", "Lets roll", "Not read"),
    new Book("Dude2", "Lets roll2", "Read"),
    new Book("Dude", "Lets roll", "Not read"),
    new Book("Dude2", "Lets roll2", "Read"),
    new Book("Dude", "Lets roll", "Not read"),
    new Book("Dude2", "Lets roll2", "Read"),
    new Book("Dude", "Lets roll", "Not read"),
    new Book("Dude2", "Lets roll2", "Read"),
];

function Book(author, title, status) {
    // the constructor...
    this.author = author;
    this.title = title;
    this.status = status;
}
Book.prototype.delete = function () {
    myLibrary.splice(myLibrary.indexOf(this), 1);
};
Book.prototype.toggleRead = function () {
    switch (this.status) {
        case "Read":
            this.status = "Not read";
            break;
        case "Not read":
            this.status = "Read";
            break;
    }
};

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
                if (book.hasOwnProperty(prop)) {
                    const td = document.createElement("td");
                    td.innerText = book[prop];
                    tr.appendChild(td);
                }
            }
            const tdButtons = document.createElement("td");
            tdButtons.appendChild(renderBookTableIcons(book));
            tr.appendChild(tdButtons);
            table.appendChild(tr);
        });
    } else {
        const td = document.createElement("td");
        td.colSpan = keys.length;
        td.innerText = "Add some books to your library!";
        table.appendChild(document.createElement("tr")).appendChild(td);
    }
}
function renderBookTableIcons(book) {
    const icons = document.createElement("div");
    //CHANGE READ STATUS
    const iconRead = document.createElement("img");
    iconRead.setAttribute("src", "./svg/read.svg");
    const buttonRead = document.createElement("button");
    buttonRead.classList.add("icon");
    buttonRead.appendChild(iconRead);
    buttonRead.setAttribute("data-bookindex", myLibrary.indexOf(book));
    buttonRead.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-bookindex");
        myLibrary[index].toggleRead();
        displayBooks();
    });

    //DELETE
    const iconDelete = document.createElement("img");
    iconDelete.setAttribute("src", "./svg/delete-forever.svg");
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("icon");
    buttonDelete.appendChild(iconDelete);
    buttonDelete.setAttribute("data-bookindex", myLibrary.indexOf(book));
    buttonDelete.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-bookindex");
        myLibrary[index].delete();
        displayBooks();
    });

    //RETURN
    icons.appendChild(buttonRead);
    icons.appendChild(buttonDelete);
    return icons;
}

/* 
█▄ ▄█ ▄▀▄ █▀▄ ▄▀▄ █   
█ ▀ █ ▀▄▀ █▄▀ █▀█ █▄▄  */
const modalAddBook = document.querySelector("#modal-addBook");

//SUBMIT
const addBookForm = document.querySelector("#addBookForm");

addBookForm.addEventListener("submit", (event) => {
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
