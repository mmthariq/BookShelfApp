const LOCAL_STORAGE_KEY = "bookshelfApp";

// Fungsi untuk mengambil data dari localStorage
function loadBooksFromLocalStorage() {
  const books = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  books.forEach(book => addBookToList(book.title, book.author, book.year, book.isComplete, book.id));
}

// Fungsi untuk menyimpan data ke localStorage
function saveBooksToLocalStorage() {
  const bookElements = document.querySelectorAll('[data-testid="bookItem"]');
  const books = Array.from(bookElements).map(bookElement => ({
    id: bookElement.getAttribute('data-bookid'),
    title: bookElement.querySelector('[data-testid="bookItemTitle"]').textContent,
    author: bookElement.querySelector('[data-testid="bookItemAuthor"]').textContent.replace('Penulis: ', ''),
    year: bookElement.querySelector('[data-testid="bookItemYear"]').textContent.replace('Tahun: ', ''),
    isComplete: bookElement.closest('#completeBookList') !== null,
  }));
  console.log("Data yang disimpan ke localStorage:", books); // Debugging log
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
}

// Fungsi untuk membuat elemen buku
function createBookElement(id, title, author, year, isComplete) {
  const bookItem = document.createElement('div');
  bookItem.setAttribute('data-bookid', id);
  bookItem.setAttribute('data-testid', 'bookItem');

  bookItem.innerHTML = `
    <h3 data-testid="bookItemTitle">${title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${author}</p>
    <p data-testid="bookItemYear">Tahun: ${year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton">${isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
      <button data-testid="bookItemDeleteButton">Hapus Buku</button>
      <button data-testid="bookItemEditButton">Edit Buku</button>
    </div>
  `;

  const toggleButton = bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]');
  const deleteButton = bookItem.querySelector('[data-testid="bookItemDeleteButton"]');
  const editButton = bookItem.querySelector('[data-testid="bookItemEditButton"]');

  toggleButton.addEventListener('click', () => toggleBookStatus(id, bookItem, isComplete));
  deleteButton.addEventListener('click', () => deleteBook(id, bookItem));
  editButton.addEventListener('click', () => openEditForm(id, bookItem));

  return bookItem;
}

// Fungsi untuk menambahkan buku ke list
function addBookToList(title, author, year, isComplete, id) {
  const bookElement = createBookElement(id, title, author, year, isComplete);

  if (isComplete) {
    document.getElementById('completeBookList').appendChild(bookElement);
  } else {
    document.getElementById('incompleteBookList').appendChild(bookElement);
  }
}

// Fungsi untuk mengubah status buku (Selesai <-> Belum selesai)
function toggleBookStatus(id, bookElement, currentStatus) {
  const newStatus = !currentStatus;
  bookElement.remove();

  const title = bookElement.querySelector('[data-testid="bookItemTitle"]').textContent;
  const author = bookElement.querySelector('[data-testid="bookItemAuthor"]').textContent.replace('Penulis: ', '');
  const year = bookElement.querySelector('[data-testid="bookItemYear"]').textContent.replace('Tahun: ', '');

  addBookToList(title, author, year, newStatus);
}

// Fungsi untuk menghapus buku
function deleteBook(id, bookElement) {
  bookElement.remove();
  console.log(`Buku dengan ID ${id} telah dihapus.`);
}

// Fungsi untuk membuka form edit buku
function openEditForm(id, bookElement) {
  const title = bookElement.querySelector('[data-testid="bookItemTitle"]').textContent;
  const author = bookElement.querySelector('[data-testid="bookItemAuthor"]').textContent.replace('Penulis: ', '');
  const year = bookElement.querySelector('[data-testid="bookItemYear"]').textContent.replace('Tahun: ', '');

  // Mengisi form dengan data buku yang ada
  document.getElementById('editBookTitle').value = title;
  document.getElementById('editBookAuthor').value = author;
  document.getElementById('editBookYear').value = year;
  
  // Menyimpan elemen yang akan diedit
  currentEditBookElement = bookElement;

  // Menampilkan form edit
  document.getElementById('editBookFormContainer').style.display = 'block';
}

// Fungsi untuk menyimpan perubahan buku
document.getElementById('editBookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const newTitle = document.getElementById('editBookTitle').value.trim();
  const newAuthor = document.getElementById('editBookAuthor').value.trim();
  const newYear = document.getElementById('editBookYear').value.trim();

  if (newTitle && newAuthor && newYear) {
    currentEditBookElement.querySelector('[data-testid="bookItemTitle"]').textContent = newTitle;
    currentEditBookElement.querySelector('[data-testid="bookItemAuthor"]').textContent = `Penulis: ${newAuthor}`;
    currentEditBookElement.querySelector('[data-testid="bookItemYear"]').textContent = `Tahun: ${newYear}`;

    // Simpan perubahan ke localStorage
    saveBooksToLocalStorage();

    // Sembunyikan form edit
    document.getElementById('editBookFormContainer').style.display = 'none';
  } else {
    alert("Data yang Anda masukkan tidak valid!");
  }
});

// Fungsi untuk membatalkan pengeditan
document.getElementById('cancelEditButton').addEventListener('click', function() {
  document.getElementById('editBookFormContainer').style.display = 'none';
});

// Event listener untuk form tambah buku
document.getElementById('bookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = document.getElementById('bookFormYear').value;
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  addBookToList(title, author, year, isComplete);

  // Reset form
  document.getElementById('bookForm').reset();
});

// Event listener untuk form pencarian
document.getElementById('searchBook').addEventListener('submit', function(event) {
  event.preventDefault();

  const query = document.getElementById('searchBookTitle').value.toLowerCase();
  const bookItems = document.querySelectorAll('[data-testid="bookItem"]');

  bookItems.forEach(bookItem => {
    const title = bookItem.querySelector('[data-testid="bookItemTitle"]').textContent.toLowerCase();
    bookItem.style.display = title.includes(query) ? '' : 'none';
  });

  // Memastikan input dikosongkan setelah pencarian
  document.getElementById('searchBookTitle').value = '';
});

// Fungsi untuk membuka popup edit
function editBook(id, bookElement) {
    // Ambil nilai yang ada di elemen buku
    const title = bookElement.querySelector('[data-testid="bookItemTitle"]').textContent;
    const author = bookElement.querySelector('[data-testid="bookItemAuthor"]').textContent.replace('Penulis: ', '');
    const year = bookElement.querySelector('[data-testid="bookItemYear"]').textContent.replace('Tahun: ', '');
  
    // Set nilai input form edit
    document.getElementById('editBookTitle').value = title;
    document.getElementById('editBookAuthor').value = author;
    document.getElementById('editBookYear').value = year;
  
    // Tampilkan popup
    document.getElementById('editBookFormContainer').style.display = 'flex';
  
    // Simpan perubahan saat form disubmit
    document.getElementById('editBookForm').onsubmit = function(event) {
      event.preventDefault();
      const newTitle = document.getElementById('editBookTitle').value.trim();
      const newAuthor = document.getElementById('editBookAuthor').value.trim();
      const newYear = document.getElementById('editBookYear').value.trim();
  
      if (newTitle && newAuthor && isValidYear(newYear)) {
        // Update data buku di elemen DOM
        bookElement.querySelector('[data-testid="bookItemTitle"]').textContent = newTitle;
        bookElement.querySelector('[data-testid="bookItemAuthor"]').textContent = `Penulis: ${newAuthor}`;
        bookElement.querySelector('[data-testid="bookItemYear"]').textContent = `Tahun: ${newYear}`;
  
        // Simpan ke localStorage
        saveBooksToLocalStorage();
  
        // Tutup popup setelah perubahan
        document.getElementById('editBookFormContainer').style.display = 'none';
      } else {
        alert("Mohon masukkan data yang valid!");
      }
    };
  
    // Menutup popup jika tombol batal diklik
    document.getElementById('cancelEditButton').onclick = function() {
      document.getElementById('editBookFormContainer').style.display = 'none';
    };
  }
  

// Load data dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadBooksFromLocalStorage);
