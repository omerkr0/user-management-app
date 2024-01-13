package database

import (
	"log"
)

// InitializeDefaultUser inserts a default user into the 'users' table if it does not exist
func InitializeDefaultUser() error {
	// Insert default user if not already present
	_, err := DB.Exec(`
		INSERT OR IGNORE INTO users (username, fullname, email, birthdate) VALUES ('John_user', 'John Doe', 'john_doe@gmail.com', '2001-05-15' );
	`)
	if err != nil {
		log.Println("Failed to insert default user:", err)
		return err
	}

	return nil
}

// InsertUser inserts a new user into the 'users' table
func InsertUser(newUser User) (int64, error) {
	// Insert a new user into the 'users' table
	result, err := DB.Exec("INSERT INTO users (username, fullname, email, birthdate) VALUES (?, ?, ?, ?)",
		newUser.Username, newUser.Fullname, newUser.Email, newUser.Birthdate)
	if err != nil {
		log.Println("Failed to insert user:", err)
		return 0, err
	}

	// Get the ID of the newly inserted user
	userID, _ := result.LastInsertId()
	return userID, nil
}

// GetAllUsers retrieves all users from the 'users' table
func GetAllUsers() ([]User, error) {
	// Retrieve all users from the 'users' table
	rows, err := DB.Query("SELECT id, username, fullname, email, birthdate FROM users ORDER BY id ASC")
	if err != nil {
		log.Println("Failed to query users:", err)
		return nil, err
	}
	defer rows.Close()

	// Create a slice to store users
	var users []User
	for rows.Next() {
		var user User
		// Parse the data from each row into the User struct
		if err := rows.Scan(&user.ID, &user.Username, &user.Fullname, &user.Email, &user.Birthdate); err != nil {
			log.Println("Failed to scan user:", err)
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

// UpdateUser updates an existing user in the 'users' table
func UpdateUser(userID int, updatedUser User) error {
	// Update an existing user in the 'users' table
	_, err := DB.Exec("UPDATE users SET username = ?, fullname = ?, email = ?, birthdate = ? WHERE id = ?",
		updatedUser.Username, updatedUser.Fullname, updatedUser.Email, updatedUser.Birthdate, userID)
	if err != nil {
		log.Println("Failed to update user:", err)
		return err
	}
	return nil
}

// DeleteUser deletes an existing user from the 'users' table
func DeleteUser(userID int) error {
	// Delete an existing user from the 'users' table
	_, err := DB.Exec("DELETE FROM users WHERE id = ?", userID)
	if err != nil {
		log.Println("Failed to delete user:", err)
		return err
	}
	return nil
}
