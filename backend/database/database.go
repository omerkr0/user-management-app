package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Fullname  string `json:"fullname"`
	Email     string `json:"email"`
	Birthdate string `json:"birthdate"`
}

func InitDatabase() {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		log.Fatal(err)
	}
	DB = db

	createTableIfNotExists()
	initializeDefaultUser()
}

func createTableIfNotExists() {
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT,
			fullname TEXT,
			email TEXT,
			birthdate TEXT
		)
	`)
	if err != nil {
		log.Fatal(err)
	}
}

func initializeDefaultUser() {
	// Varsayılan kullanıcıyı ekleme işlemi
	_, err := DB.Exec(`
		INSERT OR IGNORE INTO users (username, fullname, email, birthdate) VALUES ('John_user', 'John Doe', 'john_doe@gmail.com', '2001-05-15' );
	`)
	if err != nil {
		log.Fatal(err)
	}
}

func CloseDatabase() {
	if DB != nil {
		DB.Close()
	}
}
