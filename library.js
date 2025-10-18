console.log("Hello World");
const cardsContainer = document.getElementById("cards");
/**@type {HTMLFormElement} */
const form = document.getElementById("book-form");
const submit_button = document.getElementById("submit_button");
const add_book_button = document.getElementById("add-new-book");
const form_div = document.getElementById("form");
const add_button_div = document.getElementById("new-button");
const Books = [];

class Book {
  constructor(title, author, pages, is_read) {
    this.id = this.generateuniqueID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.is_read = is_read;
  }

  generateuniqueID() {
    let id;
    do {
      id = getSafeUUID();
    } while (Books.some((book) => book.id === id));
    return id;
  }

  bookReadToggle() {
    this.is_read = !this.is_read;
  }
}
function getSafeUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  } else {
    // Fallback UUID v4 generator
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

add_book_button.addEventListener("click", () => {
  
  form_div.style.display = "flex";
  add_button_div.style.display = "none";
  console.log("button clicked");
});

function createBookCard(book) {
  const card = document.createElement("div");
  card.id = "card";
  card.dataset.id = book.id;

  card.innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p><strong>Status:</strong> ${book.is_read ? "Read" : "Not Read"}</p>
    <button class="toggle-read">Toggle-Read</button>
    <button class="delete">Delete</button>
  `;

  // Attach event listeners for buttons
  card
    .querySelector(".toggle-read")
    .addEventListener("click", () => toggleRead(book.id));
  card
    .querySelector(".delete")
    .addEventListener("click", () => deleteBook(book.id));

  return card;
}

function addBook(title, author, pages, is_read) {
  const book = new Book(title, author, pages, is_read);
  Books.push(book);
  const card = createBookCard(book);
  cardsContainer.append(card);
}

submit_button.addEventListener("click", function (event) {
  event.preventDefault();

  // Get input values
  const title = document.getElementById("form-title").value.trim();
  const author = document.getElementById("form-author").value.trim();
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("form-checkbox").checked;

  //Adding data to array and page
  addBook(title, author, pages, isRead);

  form.reset();
  form_div.style.display = "none";
  add_button_div.style.display = "flex";
});

function deleteBook(bookId) {

  // 1. Remove from the data array
  const index = Books.findIndex(book => book.id === bookId);
  Books.splice(index,1);

  //2. Remove card from DOM
  const card = document.querySelector(`[data-id="${bookId}"]`);

  card.remove();
  
}

function toggleRead(bookId){
  // Find the book in the library
  const book = Books.find(book => book.id === bookId);
  if (!book) return;

  // Toggle the read status
  book.bookReadToggle();

  // Find the book card in the DOM
  const card = document.querySelector(`[data-id='${bookId}']`);

  // Update the text in the card
  const statusParagraph = card.querySelector('p:nth-child(4)');
  statusParagraph.innerHTML = `<strong>Status:</strong> ${book.is_read ? 'Read' : 'Not Read'}`;
  console.log(Books);
}

addBook("To Kill a Mockingbird", "Harper Lee", 281, true);
addBook("1984", "George Orwell", 328, false);
addBook("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBook("The Catcher in the Rye", "J.D. Salinger", 214, false);
addBook("Pride and Prejudice", "Jane Austen", 279, true);
//addBook("The Hobbit", "J.R.R. Tolkien", 310, true);
//addBook("Fahrenheit 451", "Ray Bradbury", 194, false);
//addBook("Moby-Dick", "Herman Melville", 585, false);
//addBook("The Odyssey", "Homer", 374, true);
//addBook("Crime and Punishment", "Fyodor Dostoevsky", 430, false);


console.log(Books);
