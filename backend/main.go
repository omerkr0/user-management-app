//package main

//import (
//	"database/sql"  // SQL veritabanı işlemleri için gerekli paket
//	"encoding/json" // JSON veri formatını kodlamak ve çözmek için gerekli paket
//	"log"           // Loglama (günlük tutma) işlemleri için gerekli paket
//	"net/http"      // HTTP istekleri ve sunucu işlemleri için gerekli paket
//	"strconv"       // Sayıları string'e dönüştürme veya string'i sayıya dönüştürme işlemleri için gerekli paket

//	"github.com/gorilla/mux"        // HTTP yönlendirmesi ve yönlendirme özellikleri sağlayan paket
//	_ "github.com/mattn/go-sqlite3" // SQLite veritabanı
//)

//// Veritabanı tablosundaki bir kullanıcıyı temsil eden struct.
//type User struct {
//	ID        int    `json:"id"`        // Kullanıcı ID'si
//	Username  string `json:"username"`  // Kullanıcı adı
//	Fullname  string `json:"fullname"`  // Tam adı
//	Email     string `json:"email"`     // E-posta adresi
//	Birthdate string `json:"birthdate"` // Doğum tarihi
//}

//func main() {
//	// SQLite veritabanına bağlanma
//	db, err := sql.Open("sqlite3", "./users.db")
//	if err != nil {
//		log.Fatal(err)
//	}
//	defer db.Close()

//	// Eğer "users" tablosu yoksa, oluştur
//	_, err = db.Exec(`
//		CREATE TABLE IF NOT EXISTS users (
//			id INTEGER PRIMARY KEY AUTOINCREMENT,
//			username TEXT,
//			fullname TEXT,
//			email TEXT,
//			birthdate TEXT
//		)
//	`)
//	if err != nil {
//		log.Fatal(err)
//	}

//	// CORS (Cross-Origin Resource Sharing) middleware'ini oluştur
//	corsMiddleware := func(next http.Handler) http.Handler {
//		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//			// HTTP başlıklarını ayarla
//			w.Header().Set("Access-Control-Allow-Origin", "*")
//			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

//			// Eğer gelen istek bir OPTIONS isteği ise 200 OK yanıtı gönder
//			if r.Method == http.MethodOptions {
//				w.WriteHeader(http.StatusOK)
//				return
//			}

//			// Diğer durumlarda middleware zincirine devam et
//			next.ServeHTTP(w, r)
//		})
//	}

//	// Varsayılan bir kullanıcı eklenir (örnek veri)
//	_, err = db.Exec(`
//		INSERT OR IGNORE INTO users (username, fullname, email, birthdate) VALUES ('John_user', 'John Doe', 'john_doe@gmail.com', '2001-05-15' );
//	`)
//	if err != nil {
//		log.Fatal(err)
//	}

//	// Kullanıcı ekleme handler'ı
//	addUserHandler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
//		// Sadece HTTP POST isteklerini kabul et
//		if req.Method != http.MethodPost {
//			rw.WriteHeader(http.StatusMethodNotAllowed)
//			return
//		}

//		// Gelen JSON verisini User struct'ına çözümle
//		var newUser User
//		decoder := json.NewDecoder(req.Body)
//		if err := decoder.Decode(&newUser); err != nil {
//			rw.WriteHeader(http.StatusBadRequest)
//			return
//		}

//		// Yeni kullanıcıyı veritabanına ekle ve sonucu al
//		result, err := db.Exec("INSERT INTO users (username, fullname, email, birthdate) VALUES (?, ?, ?, ?)",
//			newUser.Username, newUser.Fullname, newUser.Email, newUser.Birthdate)
//		if err != nil {
//			log.Println("Failed to insert user:", err)
//			rw.WriteHeader(http.StatusInternalServerError)
//			return
//		}

//		// Eklenen kullanıcının ID'sini al
//		userID, _ := result.LastInsertId()

//		// Başarılı yanıtı oluştur
//		resp := struct {
//			Message string `json:"message"`
//			UserID  int64  `json:"userID"`
//		}{
//			Message: "User added successfully",
//			UserID:  userID,
//		}

//		// JSON formatında yanıtı gönder
//		rw.Header().Set("Content-Type", "application/json")
//		rw.WriteHeader(http.StatusCreated)
//		json.NewEncoder(rw).Encode(resp)
//	})

//	// Kullanıcıları listeleme handler'ı
//	listUsersHandler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
//		// Sadece HTTP GET isteklerini kabul et
//		if req.Method != http.MethodGet {
//			rw.WriteHeader(http.StatusMethodNotAllowed)
//			return
//		}

//		// Tüm kullanıcıları veritabanından al ve sıralı bir şekilde sakla
//		rows, err := db.Query("SELECT id, username, fullname, email, birthdate FROM users ORDER BY id ASC")
//		if err != nil {
//			log.Println("Failed to query users:", err)
//			rw.WriteHeader(http.StatusInternalServerError)
//			return
//		}
//		defer rows.Close()

//		// Kullanıcıları saklamak için bir dilim (slice) oluştur
//		var users []User
//		for rows.Next() {
//			var user User
//			// Her bir satırdaki verileri User struct'ına çözümle
//			if err := rows.Scan(&user.ID, &user.Username, &user.Fullname, &user.Email, &user.Birthdate); err != nil {
//				log.Println("Failed to scan user:", err)
//				rw.WriteHeader(http.StatusInternalServerError)
//				return
//			}
//			users = append(users, user)
//		}

//		// JSON formatında kullanıcıları yanıt olarak gönder
//		rw.Header().Set("Content-Type", "application/json")
//		json.NewEncoder(rw).Encode(users)
//	})

//	// Kullanıcı düzenleme handler'ı
//	editUserHandler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
//		// Sadece HTTP PUT isteklerini kabul et
//		if req.Method != http.MethodPut {
//			rw.WriteHeader(http.StatusMethodNotAllowed)
//			return
//		}

//		// URL'den kullanıcı kimliğini al
//		params := mux.Vars(req)
//		userID, err := strconv.Atoi(params["id"])
//		if err != nil {
//			log.Println("Invalid user ID:", err)
//			rw.WriteHeader(http.StatusBadRequest)
//			return
//		}

//		// Güncellenmiş kullanıcı verisini saklamak için bir User struct'ı oluştur
//		var updatedUser User

//		// Gelen JSON verisini çözümle
//		decoder := json.NewDecoder(req.Body)
//		if err := decoder.Decode(&updatedUser); err != nil {
//			log.Println("Failed to decode user:", err)
//			rw.WriteHeader(http.StatusBadRequest)
//			return
//		}

//		// Veritabanında kullanıcıyı güncelle
//		_, err = db.Exec("UPDATE users SET username = ?, fullname = ?, email = ?, birthdate = ? WHERE id = ?",
//			updatedUser.Username, updatedUser.Fullname, updatedUser.Email, updatedUser.Birthdate, userID)
//		if err != nil {
//			log.Println("Failed to update user:", err)
//			rw.WriteHeader(http.StatusInternalServerError)
//			return
//		}

//		// Başarılı yanıtı gönder
//		rw.WriteHeader(http.StatusOK)
//	})

//	// Kullanıcı silme handler'ı
//	deleteUserHandler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
//		// Sadece HTTP DELETE isteklerini kabul et
//		if req.Method != http.MethodDelete {
//			rw.WriteHeader(http.StatusMethodNotAllowed)
//			return
//		}

//		// URL'den kullanıcı kimliğini al
//		params := mux.Vars(req)
//		userID, err := strconv.Atoi(params["id"])
//		if err != nil {
//			log.Println("Invalid user ID:", err)
//			rw.WriteHeader(http.StatusBadRequest)
//			return
//		}

//		// Veritabanından kullanıcıyı sil
//		_, err = db.Exec("DELETE FROM users WHERE id = ?", userID)
//		if err != nil {
//			log.Println("Failed to delete user:", err)
//			rw.WriteHeader(http.StatusInternalServerError)
//			return
//		}

//		// Başarılı yanıtı gönder
//		rw.WriteHeader(http.StatusOK)
//	})

//	// API router'ı oluştur
//	apiRouter := mux.NewRouter()
//	apiRouter.Handle("/adduser", corsMiddleware(addUserHandler)).Methods(http.MethodPost)
//	apiRouter.Handle("/listusers", corsMiddleware(listUsersHandler)).Methods(http.MethodGet)
//	apiRouter.Handle("/edituser/{id:[0-9]+}", corsMiddleware(editUserHandler)).Methods(http.MethodPut)
//	apiRouter.Handle("/deleteuser/{id:[0-9]+}", corsMiddleware(deleteUserHandler)).Methods(http.MethodDelete)

//	// HTTP sunucusunu başlat
//	log.Println("Server is available at http://localhost:8000")
//	log.Fatal(http.ListenAndServe(":8000", corsMiddleware(apiRouter)))
//}

package main

import (
	"log"
	"net/http"

	"backend/database"
	"backend/handlers"

	"github.com/gorilla/mux"
)

func main() {
	// Veritabanını başlat
	database.InitDatabase()
	defer database.CloseDatabase()

	// CORS (Cross-Origin Resource Sharing) middleware'ini oluştur
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// HTTP başlıklarını ayarla
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			// Eğer gelen istek bir OPTIONS isteği ise 200 OK yanıtı gönder
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusOK)
				return
			}

			// Diğer durumlarda middleware zincirine devam et
			next.ServeHTTP(w, r)
		})
	}

	// Kullanıcı ekleme handler'ı
	addUserHandler := http.HandlerFunc(handlers.AddUserHandler)

	// Kullanıcıları listeleme handler'ı
	listUsersHandler := http.HandlerFunc(handlers.ListUsersHandler)

	// Kullanıcı düzenleme handler'ı
	editUserHandler := http.HandlerFunc(handlers.EditUserHandler)

	// Kullanıcı silme handler'ı
	deleteUserHandler := http.HandlerFunc(handlers.DeleteUserHandler)

	// API router'ı oluştur
	apiRouter := mux.NewRouter()
	apiRouter.Handle("/adduser", corsMiddleware(addUserHandler)).Methods(http.MethodPost)
	apiRouter.Handle("/listusers", corsMiddleware(listUsersHandler)).Methods(http.MethodGet)
	apiRouter.Handle("/edituser/{id:[0-9]+}", corsMiddleware(editUserHandler)).Methods(http.MethodPut)
	apiRouter.Handle("/deleteuser/{id:[0-9]+}", corsMiddleware(deleteUserHandler)).Methods(http.MethodDelete)

	// HTTP sunucusunu başlat
	log.Println("Server is available at http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", corsMiddleware(apiRouter)))
}
