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
	ac := controllers.NewAkunCimpaController()

	router.POST("/api/pesertaCimpa", pc.CreatePesertaCimpa)
	router.POST("/api/pesertaCimpa/UploadFoto", mc.FileUpload)
	router.GET("/api/pesertaCimpa/:id", pc.GetPesertaCimpaWithID)
	router.GET("/api/pesertaCimpa/", pc.GetAllPesertaCimpaWithKlasis)
	router.DELETE("/api/pesertaCimpa/deleteAll", pc.DeleteAll)
	router.PUT("/api/pesertaCimpa/UpdateKonfirmasi", pc.ConfirmPeserta)
	router.POST("/api/pesertaCimpa/UpdateBuktiBayar", pc.UpdateBuktiBayar)

	router.POST("/api/akunCimpa", ac.CreateAkunCimpa)
	router.DELETE("/api/akunCimpa", ac.DeleteAllAkunCimpa)
	router.POST("/api/akunCimpa/login", ac.Login)

	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", handler))
}
