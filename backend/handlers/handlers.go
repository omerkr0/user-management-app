package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"backend/database"

	"github.com/gorilla/mux"
)

func AddUserHandler(rw http.ResponseWriter, req *http.Request) {
	// Sadece HTTP POST isteklerini kabul et
	if req.Method != http.MethodPost {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var newUser database.User
	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&newUser); err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	userID, err := database.InsertUser(newUser)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp := struct {
		Message string `json:"message"`
		UserID  int64  `json:"userID"`
	}{
		Message: "User added successfully",
		UserID:  userID,
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(http.StatusCreated)
	json.NewEncoder(rw).Encode(resp)
}

func ListUsersHandler(rw http.ResponseWriter, req *http.Request) {
	// Sadece HTTP GET isteklerini kabul et
	if req.Method != http.MethodGet {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	users, err := database.GetAllUsers()
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Content-Type", "application/json")
	json.NewEncoder(rw).Encode(users)
}

func EditUserHandler(rw http.ResponseWriter, req *http.Request) {
	// Sadece HTTP PUT isteklerini kabul et
	if req.Method != http.MethodPut {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// URL'den kullanıcı kimliğini al
	params := mux.Vars(req)
	userID, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Println("Invalid user ID:", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Güncellenmiş kullanıcı verisini saklamak için bir User struct'ı oluştur
	var updatedUser database.User

	// Gelen JSON verisini çözümle
	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&updatedUser); err != nil {
		log.Println("Failed to decode user:", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Veritabanında kullanıcıyı güncelle
	err = database.UpdateUser(userID, updatedUser)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Başarılı yanıtı gönder
	rw.WriteHeader(http.StatusOK)
}

func DeleteUserHandler(rw http.ResponseWriter, req *http.Request) {
	// Sadece HTTP DELETE isteklerini kabul et
	if req.Method != http.MethodDelete {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// URL'den kullanıcı kimliğini al
	params := mux.Vars(req)
	userID, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Println("Invalid user ID:", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Veritabanından kullanıcıyı sil
	err = database.DeleteUser(userID)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Başarılı yanıtı gönder
	rw.WriteHeader(http.StatusOK)
}
