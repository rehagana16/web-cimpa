package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"server/services"

	"github.com/julienschmidt/httprouter"
)

type (
	MediaController struct{}
)

func NewMediaController() *MediaController {
	return &MediaController{}
}

type MediaResp struct {
	RespCode string `json:"response_code"`
	RespDesc string `json:"response_description"`
	Data     string `json:"response_url"`
}

func (mc MediaController) FileUpload(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	// b, err := io.ReadAll(r.Body)
	// if err != nil {
	// 	log.Fatalln(err)
	// }
	// fmt.Println(string(b))
	// u := models.File{}
	// //populate data file
	// json.NewDecoder(r.Body).Decode(&u)
	// fmt.Printf("%+v\n", u)
	fmt.Println("MASUK FILE UPLOAD")
	file, _, err := r.FormFile("file")
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println("masuk service")
	uploadUrl, err := services.NewMediaUpload().FileUpload(models.File{File: file})
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println("keluar service")

	d := MediaResp{"1", "success", uploadUrl}

	uj, _ := json.Marshal(d)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)

}

// func (mc MediaController) PostFileHandler(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
// 	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
// 	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
// 	mr, err := r.MultipartReader()
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	for {
// 		part, err := mr.NextPart()

// 		// This is OK, no more parts
// 		if err == io.EOF {
// 			break
// 		}

// 		// Some error
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}

// 		// PDF 'file' part
// 		if part.FormName() == "file" {
// 			fmt.Println("URL:", part.FileName())
// 			uploadUrl, err := services.NewMediaUpload().FileUpload(models.File{File: part.})
// 			if err != nil {
// 				fmt.Println(err.Error())
// 			}
// 		}
// 	}
// }
