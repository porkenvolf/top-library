let library = (function () {
    //CACHE DOM
    const container = document.querySelector(".container");
    const table = document.querySelector("#books");
    const btnAddBook = document.querySelector("#addBook");

    //INIT
    let books = [];
    newBook("Harper Lee", "To Kill a Mockingbird", "Read", true);
    newBook("George Orwell", "1984", "Not read", true);
    newBook(
        "J.K. Rowling",
        "Harry Potter and the Sorcerer's Stone",
        "Read",
        true
    );
    newBook("Jane Austen", "Pride and Prejudice", "Not read", true);
    newBook("F. Scott Fitzgerald", "The Great Gatsby", "Read", true);
    newBook("Markus Zusak", "The Book Thief", "Not read", true);
    newBook("J.R.R. Tolkien", "The Lord of the Rings", "Read", true);
    newBook("Ernest Hemingway", "The Old Man and the Sea", "Not read", true);
    newBook("Agatha Christie", "Murder on the Orient Express", "Read", true);
    newBook(
        "Gabriel Garcia Marquez",
        "One Hundred Years of Solitude",
        "Not read",
        true
    );

    //BIND EVENTS
    btnAddBook.addEventListener("click", (event) => {
        container.appendChild(modalAddBook);
    });

    render();

    function newBook(author, title, status, push) {
        book = { author, title, status };
        if (push) {
            books.push(book);
            render();
        }
        return book;
    }

    function deleteBook(id) {
        books.splice(id, 1);
    }
    function toggleRead(id) {
        const status = books[id].status;
        switch (status) {
            case "Read":
                books[id].status = "Not read";
                break;
            case "Not read":
                books[id].status = "Read";
                break;
        }
    }
    function render() {
        //CLEAR
        table.innerText = "";
        //table HEADERS
        const row = document.createElement("div");
        row.classList.add("row");
        const keys = Object.keys(newBook("", "", ""));
        keys.forEach((element) => {
            const cell = createCell(element.toUpperCase(), ["header", element]);
            row.appendChild(cell);
        });
        const buttonsHeader = createCell("", ["header"]);
        row.appendChild(buttonsHeader);
        table.appendChild(row);

        //table ELEMENTS
        if (books.length > 0) {
            books.forEach((book) => {
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
        function renderBooktableIcons(book) {
            const icons = document.createElement("div");
            //CHANGE READ STATUS
            const iconRead = document.createElement("img");
            iconRead.setAttribute("src", "./svg/read.svg");
            const buttonRead = document.createElement("button");
            buttonRead.classList.add("icon");
            buttonRead.appendChild(iconRead);
            buttonRead.setAttribute("data-bookindex", books.indexOf(book));
            buttonRead.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-bookindex");
                toggleRead(index);
                render();
            });

            //DELETE
            const iconDelete = document.createElement("img");
            iconDelete.setAttribute("src", "./svg/delete-forever.svg");
            const buttonDelete = document.createElement("button");
            buttonDelete.classList.add("icon");
            buttonDelete.appendChild(iconDelete);
            buttonDelete.setAttribute("data-bookindex", books.indexOf(book));
            buttonDelete.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-bookindex");
                deleteBook(index);
                render();
            });

            //RETURN
            icons.appendChild(buttonRead);
            icons.appendChild(buttonDelete);
            return icons;
        }
    }

    //API
    return { newBook };
})();

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
