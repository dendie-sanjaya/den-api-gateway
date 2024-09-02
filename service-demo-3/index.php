<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

function handleRequest() {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    if ($uri === '/') {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            echo json_encode(["message" => "Hello, World!, Microservice 3 PHP"]);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method Not Allowed"]);
        }
    } elseif ($uri === '/ms-3/welcome') {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            echo json_encode(["message" => "Welcome to Microservice 3"]);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method Not Allowed"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Not Found"]);
    }
}

handleRequest();