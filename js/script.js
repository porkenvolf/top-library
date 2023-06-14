let myLibrary = [
    new Book("Harper Lee", "To Kill a Mockingbird", "Read"),
    new Book("George Orwell", "1984", "Not read"),
    new Book("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", "Read"),
    new Book("Jane Austen", "Pride and Prejudice", "Not read"),
    new Book("F. Scott Fitzgerald", "The Great Gatsby", "Read"),
    new Book("Markus Zusak", "The Book Thief", "Not read"),
    new Book("J.R.R. Tolkien", "The Lord of the Rings", "Read"),
    new Book("Ernest Hemingway", "The Old Man and the Sea", "Not read"),
    new Book("Agatha Christie", "Murder on the Orient Express", "Read"),
    new Book(
        "Gabriel Garcia Marquez",
        "One Hundred Years of Solitude",
        "Not read"
    ),
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
    //table HEADERS
    const row = document.createElement("div");
    row.classList.add("row");
    const keys = Object.keys(new Book());
    keys.forEach((element) => {
        const cell = createCell(element.toUpperCase(), ["header", element]);
        row.appendChild(cell);
    });
    const buttonsHeader = createCell("", ["header"]);
    row.appendChild(buttonsHeader);
    table.appendChild(row);

    //table ELEMENTS
    if (myLibrary.length > 0) {
        myLibrary.forEach((book) => {
            const bookRow = document.createElement("div");
            bookRow.classList.add("row");
            let propIndex = 1;
            for (const prop in book) {
                if (book.hasOwnProperty(prop)) {
                    const cell = createCell(book[prop], [prop]);
                    cell.style.gridColumn = propIndex;
                    propIndex += 1;

                    if (prop === "status") {
                        if (book[prop] === "Read") {
                            for (const child of cell.children) {
                                child.classList.add("read");
                            }
                        } else if (book[prop] === "Not read") {
                            for (const child of cell.children) {
                                child.classList.add("notRead");
                            }
                        }
                    }

                    bookRow.appendChild(cell);
                }
            }

            const outerButtons = document.createElement("div");
            outerButtons.classList.add("cell");
            outerButtons.style.gridColumn = propIndex;

            const buttons = renderBooktableIcons(book);
            outerButtons.appendChild(buttons);

            bookRow.appendChild(outerButtons);
            table.appendChild(bookRow);
        });
    } else {
        const cell = document.createElement("div");
        cell.style.gridColumn = "1 / -1";
        cell.innerText = "Add some books to your library!";
        table.appendChild(cell);
    }
}
function createCell(content, classes) {
    const cell = document.createElement("div");
    const span = document.createElement("div");
    span.innerText = content;
    cell.appendChild(span);
    if (classes) {
        classes.forEach((element) => {
            cell.classList.add(element);
        });
    }
    cell.classList.add("cell");

    return cell;
}
function renderBooktableIcons(book) {
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
