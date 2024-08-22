package main

import (
	"den/config"
	"den/controller"
	"den/migrate"
	"log"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initDatabase() *gorm.DB {
	dsn := "host=" + config.PostgresHost + " port=" + config.PostgressPort + " user=" + config.PostgresUser + " password=" + config.PostgresPassword + " dbname= " + config.PostgresDB + " sslmode=" + config.PostgresSSLMode

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	return db
}

func main() {
	migrate.Run_db()
	migrate.Run_seed()
	db := initDatabase()
	app := fiber.New()
	controller.UserControler(app, db)
	log.Fatal(app.Listen(":4000"))
}
