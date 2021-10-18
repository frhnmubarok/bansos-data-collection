<p align="center">
  <img src="https://i.imgur.com/Pw7Ep8R.png" alt='preview'>
</p>

> Illustration by [Vecteezy](https://www.vecteezy.com/free-vector/donation)

## Daftar isi

- [Jalankan di lokal server](#jalankan-di-lokal-server)
- [Tech Stack](#tech-stack)
- [Informasi Jabarcodingcamp 2021](#informasi-jabarcodingcamp-2021)
  - [Data diri](#data-diri)
  - [Demo](#demo)
  - [Web host](#web-host)
- [Alasan layout yang diterapkan](#alasan-layout-yang-diterapkan)

## Jalankan di lokal server

```bash
git clone https://github.com/frhnmubarok/panghegar-bansos-app.git
cd panghegar-bansos-app
yarn install
yarn dev
```

## Tech Stack

Teknologi yang saya gunakan dalam projek ini

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Hosted on Vercel](https://vercel.com/)

## Informasi Jabarcodingcamp 2021

### Data diri

- Nama: Farhan Mubarok
- Kelas belajar: React JS

### Demo

- [Video demo](https://www.youtube.com/watch?v=0TOki97qVuo)

### Web host

- [Panghegar Bansos App](https://panghegar-bansos-app.vercel.app/)

## Alasan layout yang diterapkan

| Halaman  | Alasan                                                                                                                                                                                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage | Di homepage hanya ada elemen title, keterangan, ilustrasi, dan tombol untuk berpindah ke halaman form. Ini saya lakukan untuk membuat homepage menjadi simple.                                                                                                                                 |
| Form     | Tiap input field sudah mengikuti JDS Design System seperti penggunaan label, teks bantuan, dan juga teks error & validasi. Lalu saya susun input field mulai dari bagian data diri, upload, alamat, dan keterangan bantuan. Agar tidak terlalu sempit, tiap input field diberi spacing `2rem`. |
| Success  | Disini terdapat elemen ilustrasi yang menggambarkan data berhasil ditambah, keterangan halaman, dan juga tombol untuk menambah data lagi dan tombol untuk kembali ke halaman utama.                                                                                                            |
