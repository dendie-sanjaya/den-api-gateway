package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Membuat instance Fiber
	app := fiber.New()

	// Mendefinisikan route untuk endpoint "/"
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World! - Microservice 1 - Go")
	})

	// Menjalankan server pada port 3000
	log.Fatal(app.Listen(":4000"))
}
