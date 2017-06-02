package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func postHandler(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("Image")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	f, err := os.OpenFile(handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer f.Close()
	io.Copy(f, file)
}

func main() {
	http.HandleFunc("/", postHandler)
	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
