## 🌐 Rijaya Advertising

Selamat datang di repositori resmi proyek website Rijaya Advertising. Proyek ini merupakan aplikasi web full-stack yang dirancang untuk menjadi platform e-commerce dan portofolio digital bagi Rijaya Advertising, sebuah usaha percetakan digital. Aplikasi ini dibangun dari awal, bertransformasi dari sebuah konsep statis menjadi platform dinamis dengan backend yang kuat dan antarmuka yang modern.

![Tampilan Website Rijaya Advertising](https://github.com/davyirsyad/RijayaAdvertising/blob/main/asset/Tampilan%20Website%20Rijaya%20Advertising.png?raw=true)

## 📜 Deskripsi Project

Rijaya Advertising adalah aplikasi web e-commerce yang memungkinkan pengguna untuk melihat, memesan, dan mengelola produk percetakan digital. Di sisi lain, aplikasi ini menyediakan Admin Dashboard yang komprehensif bagi pemilik usaha untuk mengelola seluruh aspek data, mulai dari produk, stok, hingga pesanan yang masuk.

Proyek ini dibangun dengan tujuan untuk memodernisasi proses bisnis, memperluas jangkauan pasar, dan menyediakan platform yang efisien bagi pelanggan dan administrator.

## ✨ Fitur Utama
Berikut adalah beberapa fungsionalitas utama yang telah diimplementasikan:

**Front-End (Halaman Pengguna)**:

2. Galeri produk yang dinamis dan dimuat langsung dari database.

3. Modal detail produk untuk menampilkan informasi lengkap tanpa pindah halaman.

4. Sistem keranjang belanja (Shopping Cart) yang fungsional.

5. Formulir checkout untuk proses pemesanan.

6. Desain responsif dan modern dengan animasi halus.

**Back-End (Sisi Server)**:

1. RESTful API yang dibangun dengan Node.js dan Express.js.

2. Sistem otentikasi dan otorisasi pengguna berbasis JSON Web Tokens (JWT).

3. Rute terproteksi yang hanya bisa diakses oleh admin.

4. Manajemen data yang efisien menggunakan MongoDB dan Mongoose.

**Admin Dashboard**:

1. Halaman login khusus untuk admin.

2. Operasi CRUD (Create, Read, Update, Delete) untuk manajemen produk.

3. Tampilan daftar pesanan yang masuk dari pengguna.

4. Kartu statistik untuk memantau jumlah total produk dan pesanan.


## 💻 Tumpukan Teknologi (Tech Stack)

Proyek ini dibangun menggunakan teknologi modern, handal, dan skalabel:

#### **Frontend**
<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Google%20Fonts-4285F4?style=for-the-badge&logo=google-fonts&logoColor=white" alt="Google Fonts"/>
  <img src="https://img.shields.io/badge/AOS-Animate%20On%20Scroll-9cf?style=for-the-badge" alt="AOS Library"/>
</p>

#### **Backend, Database & Tools**
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
</p>

1. Node.js: Sebagai runtime environment yang memungkinkan kode JavaScript berjalan di sisi server (server-side). Dalam proyek ini, Node.js menjadi fondasi utama untuk membangun seluruh logika backend, mulai dari menerima permintaan HTTP hingga berinteraksi dengan database.
2. Express.js: Merupakan framework minimalis yang berjalan di atas Node.js. Express digunakan untuk menyederhanakan dan mempercepat pengembangan backend dengan menyediakan serangkaian fitur yang kuat untuk membangun RESTful API, seperti manajemen routing (penentuan URL), middleware (fungsi perantara), dan penanganan request/response.

#### **Database & ODM**
<p align="left">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
</p>

1. MongoDB : Sebagai database NoSQL utama untuk menyimpan semua data aplikasi, termasuk informasi produk, pengguna, dan pesanan, dengan skema yang fleksibel dan skalabel.
2. Mongoose : Sebagai Object Data Modeling (ODM) library yang mempermudah interaksi antara aplikasi Node.js dengan database MongoDB, menyediakan validasi skema, dan menyederhanakan query.

#### **Tools & Lainnya**
<p align="left">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Bcrypt.js-6243A4?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt.js"/>
  <img src="https://img.shields.io/badge/CORS-Enabled-orange?style=for-the-badge" alt="CORS"/>
  <img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</p>

1. JSON Web Token (JWT) : Untuk mengamankan API dan mengelola sesi pengguna. JWT digunakan untuk otentikasi dan otorisasi, memastikan bahwa hanya pengguna yang terverifikasi yang dapat mengakses rute-rute tertentu.
2. Bcrypt.js : Untuk mengamankan kata sandi pengguna dengan melakukan *hashing* sebelum menyimpannya ke database, menambahkan lapisan keamanan yang krusial.
3. CORS (Cross-Origin Resource Sharing) : Diaktifkan di sisi server untuk memungkinkan aplikasi frontend (yang berjalan di domain berbeda) dapat berkomunikasi dan mengakses sumber daya dari API backend dengan aman.
4. Visual Studio Code: Sebagai code editor utama yang digunakan dalam pengembangan proyek ini, menyediakan lingkungan yang kaya fitur untuk menulis, menguji, dan melakukan debugging kode.
5. Git: Sistem kontrol versi (version control system) yang digunakan untuk melacak setiap perubahan pada kode, mengelola branch, dan memfasilitasi kolaborasi tim.
6. GitHub: Platform yang digunakan untuk menghosting repositori kode secara remote, mengelola isu, dan menjadi pusat kolaborasi bagi seluruh tim pengembang.


## 👥 Tim Pengembang & Peran

Proyek ini merupakan hasil kolaborasi dari tim yang solid dengan pembagian tugas yang jelas.

| No | Nama | Peran & Tanggung Jawab |
|:---|:---|:---|
| 1. | **DAVY IRSYAD TULLOH (24SA31A055)** | **Full-Stack & Dokumentasi**. Bertanggung jawab membangun Frontend, Backend, Database, dan API, serta membuat laporan akhir project. |
| 2. | **LUGHRI WIJAYA PAMUNGKAS (24SA31A038)** | **Project Owner & Content**. Sebagai pemilik Rijaya Advertising, bertugas menyiapkan materi produk dan membuat kerangka awal HTML. |
| 3. | **MA'RUF AMRULLOH (24SA31A001)** | **Logistik & Support**. Menyiapkan fasilitas dan konsumsi tim, serta membantu dalam proses penyuntingan file HTML. |
| 4. | **AZIZ ILHAM RIYADI (24SA31A037)** | **Frontend**. Fokus pada penyuntingan tampilan visual, kerangka HTML, dan styling menggunakan CSS untuk menciptakan antarmuka yang menarik. |

---

## 🎥 Dokumentasi Proyek

Untuk melihat demonstrasi lengkap dari fitur-fitur aplikasi, alur kerja, dan penjelasan teknis, silakan kunjungi video dokumentasi kami yang tersedia di Google Drive.

<p align="center">
  <a href="LINK_GOOGLE_DRIVE_ANDA" target="_blank">
    <img src="https://img.shields.io/badge/Tonton_Dokumentasi-4285F4?style=for-the-badge&logo=google-drive&logoColor=white" alt="Link Dokumentasi Video"/>
  </a>
</p>

---
