package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

func viewHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("index.html")
	t.Execute(w, nil)
}

func main() {
	http.HandleFunc("/", viewHandler)
	fmt.Println("Servidor iniciado na porta 8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
