package main

import (
	"log"
	"net/http"
	"server/controllers"

	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
)

func main() {
	router := httprouter.New()

	//get controllers
	pc := controllers.NewPesertaCimpaController()
	mc := controllers.NewMediaController()

	router.POST("/api/pesertaCimpa", pc.CreatePesertaCimpa)
	router.POST("/api/pesertaCimpa/UploadFoto", mc.FileUpload)
	router.GET("/api/pesertaCimpa/:id", pc.GetPesertaCimpaWithID)

	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", handler))
}
