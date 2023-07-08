class Library {
    #books = [];

    constructor() {
        this.#cacheDOM();
        this.#bindEvents();
        this.newBook("Harper Lee", "To Kill a Mockingbird", "Read", true);
        this.newBook("George Orwell", "1984", "Not read", true);
        this.newBook(
            "J.K. Rowling",
            "Harry Potter and the Sorcerer's Stone",
            "Read",
            true
        );
        this.newBook("Jane Austen", "Pride and Prejudice", "Not read", true);
        this.newBook("F. Scott Fitzgerald", "The Great Gatsby", "Read", true);
        this.newBook("Markus Zusak", "The Book Thief", "Not read", true);
        this.newBook("J.R.R. Tolkien", "The Lord of the Rings", "Read", true);
        this.newBook(
            "Ernest Hemingway",
            "The Old Man and the Sea",
            "Not read",
            true
        );
        this.newBook(
            "Agatha Christie",
            "Murder on the Orient Express",
            "Read",
            true
        );
        this.newBook(
            "Gabriel Garcia Marquez",
            "One Hundred Years of Solitude",
            "Not read",
            true
        );
    }

    #cacheDOM = () => {
        this.container = document.querySelector(".container");
        this.table = document.querySelector("#books");
        this.btnAddBook = document.querySelector("#addBook");
    };
    #bindEvents = () => {
        this.btnAddBook.addEventListener("click", (event) => {
            this.container.appendChild(modalAddBook);
        });
    };
    render = () => {
        //CLEAR
        this.table.innerText = "";
        //table HEADERS
        const row = document.createElement("div");
        row.classList.add("row");
        const keys = Object.keys(this.newBook("", "", ""));
        keys.forEach((element) => {
            const cell = createCell(element.toUpperCase(), ["header", element]);
            row.appendChild(cell);
        });
        const buttonsHeader = createCell("", ["header"]);
        row.appendChild(buttonsHeader);
        this.table.appendChild(row);

        //table ELEMENTS
        if (this.#books.length > 0) {
            this.#books.forEach((book) => {
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

                const buttons = this.#renderBooktableIcons(book);
                outerButtons.appendChild(buttons);

                bookRow.appendChild(outerButtons);
                this.table.appendChild(bookRow);
            });
        } else {
            const cell = document.createElement("div");
            cell.style.gridColumn = "1 / -1";
            cell.innerText = "Add some books to your library!";
            this.table.appendChild(cell);
        }

        //AUX RENDER FUNCTIONS
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
    };
    #renderBooktableIcons = (book) => {
        const icons = document.createElement("div");
        //CHANGE READ STATUS
        const iconRead = document.createElement("img");
        iconRead.setAttribute("src", "./svg/read.svg");
        const buttonRead = document.createElement("button");
        buttonRead.classList.add("icon");
        buttonRead.appendChild(iconRead);
        buttonRead.setAttribute("data-bookindex", this.#books.indexOf(book));
        buttonRead.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-bookindex");
            this.toggleRead(index);
            this.render();
        });

        //DELETE
        const iconDelete = document.createElement("img");
        iconDelete.setAttribute("src", "./svg/delete-forever.svg");
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("icon");
        buttonDelete.appendChild(iconDelete);
        buttonDelete.setAttribute("data-bookindex", this.#books.indexOf(book));
        buttonDelete.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-bookindex");
            this.deleteBook(index);
            this.render();
        });

        //RETURN
        icons.appendChild(buttonRead);
        icons.appendChild(buttonDelete);
        return icons;
    };
    newBook = (author, title, status, push) => {
        const book = { author, title, status };
        if (push) {
            this.#books.push(book);
            this.render();
        }
        return book;
    };
    deleteBook = (id) => {
        this.#books.splice(id, 1);
    };
    toggleRead = (id) => {
        const status = this.#books[id].status;
        switch (status) {
            case "Read":
                this.#books[id].status = "Not read";
                break;
            case "Not read":
                this.#books[id].status = "Read";
                break;
        }
    };
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
    library.newBook(author.value, title.value, status.value, true);
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
█▀▄ █ █ █▄ █ 
█▀▄ ▀▄█ █ ▀█  */
const library = new Library();
