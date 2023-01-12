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
	router.GET("/api/buktibayar/", pc.GetBuktiBayarWithKlasis)
	router.DELETE("/api/pesertaCimpa/deleteAll", pc.DeleteAll)
	router.PUT("/api/pesertaCimpa/UpdateKonfirmasi", pc.ConfirmPeserta)
	router.PUT("/api/pesertaCimpa/ChangeStatusBuktiBayar", pc.GantiStatusBuktiBayar)
	router.POST("/api/pesertaCimpa/UpdateBuktiBayar", pc.UpdateBuktiBayar)
	router.PUT("/api/pesertaCimpa/ChangeBuktiBayar/:id", pc.ChangeBuktiBayar)

	router.POST("/api/akunCimpa", ac.CreateAkunCimpa)
	router.DELETE("/api/akunCimpa", ac.DeleteAllAkunCimpa)
	router.POST("/api/akunCimpa/login", ac.Login)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPut},
		AllowCredentials: true,
	})

	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", handler))
}
