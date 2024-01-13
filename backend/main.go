package main

import (
	"log"
	"net/http"

	"backend/database"
	"backend/handlers"

	"github.com/gorilla/mux"
)

func main() {
	// Initialize the database
	database.InitDatabase()
	defer database.CloseDatabase()

	// Create CORS (Cross-Origin Resource Sharing) middleware
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Set HTTP headers
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			// If the incoming request is an OPTIONS request, respond with 200 OK
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusOK)
				return
			}

			// Continue to the next middleware in other cases
			next.ServeHTTP(w, r)
		})
	}

	// Define the user addition handler
	addUserHandler := http.HandlerFunc(handlers.AddUserHandler)

	// Define the user listing handler
	listUsersHandler := http.HandlerFunc(handlers.ListUsersHandler)

	// Define the user editing handler
	editUserHandler := http.HandlerFunc(handlers.EditUserHandler)

	// Define the user deletion handler
	deleteUserHandler := http.HandlerFunc(handlers.DeleteUserHandler)

	// Create the API router
	apiRouter := mux.NewRouter()
	apiRouter.Handle("/adduser", corsMiddleware(addUserHandler)).Methods(http.MethodPost)
	apiRouter.Handle("/listusers", corsMiddleware(listUsersHandler)).Methods(http.MethodGet)
	apiRouter.Handle("/edituser/{id:[0-9]+}", corsMiddleware(editUserHandler)).Methods(http.MethodPut)
	apiRouter.Handle("/deleteuser/{id:[0-9]+}", corsMiddleware(deleteUserHandler)).Methods(http.MethodDelete)

	// Start the HTTP server
	log.Println("Server is available at http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", corsMiddleware(apiRouter)))
}
