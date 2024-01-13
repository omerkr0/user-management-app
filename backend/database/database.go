package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// DB represents the database connection pool
var DB *sql.DB

// User represents the structure of a user in the database
type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Fullname  string `json:"fullname"`
	Email     string `json:"email"`
	Birthdate string `json:"birthdate"`
}

// InitDatabase initializes the SQLite database and performs necessary setup
func InitDatabase() {
	// Open the SQLite database
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		log.Fatal(err)
	}
	DB = db

	// Create the 'users' table if it does not exist
	createTableIfNotExists()

	// Initialize the database with a default user
	initializeDefaultUser()
}

// createTableIfNotExists creates the 'users' table if it does not exist
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

// initializeDefaultUser inserts a default user into the 'users' table if it does not exist
func initializeDefaultUser() {
	// Insert default user if not already present
	_, err := DB.Exec(`
		INSERT OR IGNORE INTO users (username, fullname, email, birthdate) VALUES ('John_user', 'John Doe', 'john_doe@gmail.com', '2001-05-15' );
	`)
	if err != nil {
		log.Fatal(err)
	}
}

// CloseDatabase closes the database connection
func CloseDatabase() {
	if DB != nil {
		DB.Close()
	}
}
