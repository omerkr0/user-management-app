package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"backend/database"

	"github.com/gorilla/mux"
)

// AddUserHandler handles the HTTP POST request to add a new user
func AddUserHandler(rw http.ResponseWriter, req *http.Request) {
	// Only accept HTTP POST requests
	if req.Method != http.MethodPost {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// Decode the JSON data from the request body into a User struct
	var newUser database.User
	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&newUser); err != nil {
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Insert the new user into the database
	userID, err := database.InsertUser(newUser)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Send a JSON response with the success message and the user ID
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

// ListUsersHandler handles the HTTP GET request to list all users
func ListUsersHandler(rw http.ResponseWriter, req *http.Request) {
	// Only accept HTTP GET requests
	if req.Method != http.MethodGet {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// Retrieve all users from the database
	users, err := database.GetAllUsers()
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Send a JSON response with the list of users
	rw.Header().Set("Content-Type", "application/json")
	json.NewEncoder(rw).Encode(users)
}

// EditUserHandler handles the HTTP PUT request to edit an existing user
func EditUserHandler(rw http.ResponseWriter, req *http.Request) {
	// Only accept HTTP PUT requests
	if req.Method != http.MethodPut {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// Extract the user ID from the URL
	params := mux.Vars(req)
	userID, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Println("Invalid user ID:", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Create a User struct to store the updated user data
	var updatedUser database.User

	// Decode the JSON data from the request body into the updatedUser struct
	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&updatedUser); err != nil {
		log.Println("Failed to decode user:", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Update the user in the database
	err = database.UpdateUser(userID, updatedUser)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Send a success response
	rw.WriteHeader(http.StatusOK)
}

// DeleteUserHandler handles the HTTP DELETE request to delete an existing user
func DeleteUserHandler(rw http.ResponseWriter, req *http.Request) {
	// Only accept HTTP DELETE requests
	if req.Method != http.MethodDelete {
		rw.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// Extract the user ID from the URL
	params := mux.Vars(req)
	userID, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Println("Invalid user ID:", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	// Delete the user from the database
	err = database.DeleteUser(userID)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Send a success response
	rw.WriteHeader(http.StatusOK)
}
