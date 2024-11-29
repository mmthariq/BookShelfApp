# Bookshelf App Starter Project

Ini adalah Starter Project yang saya kerjakan sebagai tugas pribadi untuk kelas **Belajar Membuat Front-End Web untuk Pemula** di Dicoding. Proyek ini bertujuan untuk mengembangkan aplikasi pengelolaan koleksi buku berbasis web dengan fitur-fitur yang sudah ditentukan, sebagai bagian dari penilaian untuk tugas akhir kelas.

## Fitur Aplikasi

- Menambahkan buku baru dengan informasi seperti judul, penulis, tahun rilis, dan status (selesai atau belum selesai dibaca).
- Mengedit data buku yang sudah ada, termasuk judul, penulis, dan tahun rilis.
- Menghapus buku dari daftar.
- Mengubah status buku antara "selesai dibaca" dan "belum selesai dibaca".
- Menyimpan data buku di **localStorage**, agar data tetap ada meskipun halaman di-refresh.

## Ketentuan Pengerjaan Tugas

- Anda dilarang mengedit atau menghapus atribut `data-testid` pada elemen-elemen HTML.
- Jika diperlukan, Anda boleh menambahkan atribut lain seperti class untuk styling, tetapi **jangan mengubah atau menghapus atribut `data-testid`**.
- Dalam menampilkan data buku, Anda wajib memberikan beberapa atribut pada setiap elemen, seperti:

    - `data-bookid`: menampung nilai ID buku.
    - `data-testid="bookItem"`: kontainer untuk data buku.
    - `data-testid="bookItemTitle"`, `data-testid="bookItemAuthor"`, `data-testid="bookItemYear"`: untuk menampilkan informasi buku.
    - `data-testid="bookItemIsCompleteButton"`, `data-testid="bookItemDeleteButton"`, `data-testid="bookItemEditButton"`: untuk tombol-tombol interaktif.

Untuk melihat kode sumber dan kontribusi lainnya, Anda dapat mengunjungi halaman repositori GitHub saya di sini: [GitHub Repository](https://mmthariq.github.io/BookShelfApp/)
