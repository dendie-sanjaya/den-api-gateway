<?php
// index.php

// Set header untuk mengizinkan akses dari semua origin
header("Access-Control-Allow-Origin: *");
// Set header untuk mengizinkan metode HTTP tertentu
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Set header untuk mengizinkan tipe konten tertentu
header("Content-Type: application/json; charset=UTF-8");

// Fungsi untuk menangani permintaan ke endpoint "/"
function handleRequest() {
    // Periksa metode permintaan
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Kirim respons "Hello, World!" dalam format JSON
        echo json_encode(["message" => "Hello, World!, Miroservei 3 PHP"]);
    } else {
        // Kirim respons metode tidak diizinkan
        http_response_code(405);
        echo json_encode(["message" => "Method Not Allowed"]);
    }
}

// Panggil fungsi untuk menangani permintaan
handleRequest();