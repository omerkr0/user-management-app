package database

import (
	"log"
)

// User tablosuna ait veritabanı işlemleri

func InitializeDefaultUser() error {
	// Varsayılan kullanıcıyı ekleme işlemi
	_, err := DB.Exec(`
		INSERT OR IGNORE INTO users (username, fullname, email, birthdate) VALUES ('John_user', 'John Doe', 'john_doe@gmail.com', '2001-05-15' );
	`)
	if err != nil {
		log.Println("Failed to insert default user:", err)
		return err
	}

	return nil
}

func InsertUser(newUser User) (int64, error) {
	// Kullanıcı ekleme işlemi
	result, err := DB.Exec("INSERT INTO users (username, fullname, email, birthdate) VALUES (?, ?, ?, ?)",
		newUser.Username, newUser.Fullname, newUser.Email, newUser.Birthdate)
	if err != nil {
		log.Println("Failed to insert user:", err)
		return 0, err
	}

	// Eklenen kullanıcının ID'sini al
	userID, _ := result.LastInsertId()
	return userID, nil
}

func GetAllUsers() ([]User, error) {
	// Tüm kullanıcıları getirme işlemi
	rows, err := DB.Query("SELECT id, username, fullname, email, birthdate FROM users ORDER BY id ASC")
	if err != nil {
		log.Println("Failed to query users:", err)
		return nil, err
	}
	defer rows.Close()

	// Kullanıcıları saklamak için bir dilim (slice) oluştur
	var users []User
	for rows.Next() {
		var user User
		// Her bir satırdaki verileri User struct'ına çözümle
		if err := rows.Scan(&user.ID, &user.Username, &user.Fullname, &user.Email, &user.Birthdate); err != nil {
			log.Println("Failed to scan user:", err)
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func UpdateUser(userID int, updatedUser User) error {
	_, err := DB.Exec("UPDATE users SET username = ?, fullname = ?, email = ?, birthdate = ? WHERE id = ?",
		updatedUser.Username, updatedUser.Fullname, updatedUser.Email, updatedUser.Birthdate, userID)
	if err != nil {
		log.Println("Failed to update user:", err)
		return err
	}
	return nil
}

func DeleteUser(userID int) error {
	_, err := DB.Exec("DELETE FROM users WHERE id = ?", userID)
	if err != nil {
		log.Println("Failed to delete user:", err)
		return err
	}
	return nil
}
