package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"

	"github.com/julienschmidt/httprouter"
)

type (
	PesertaCimpaController struct{}
)

func NewPesertaCimpaController() *PesertaCimpaController {
	return &PesertaCimpaController{}
}

type PesertaCimpaResp struct {
	RespCode string `json:"response_code"`
	RespDesc string `json:"response_description"`
	Data     CustomMessage
}

type PesertaCimpaGetResp struct {
	RespCode string `json:"response_code"`
	RespDesc string `json:"response_description"`
	Data     models.PesertaCimpa
}

type CustomMessage struct {
	CustomMessage string `json:"custom_message"`
}

func (cc PesertaCimpaController) CreatePesertaCimpa(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	u := models.PesertaCimpa{}

	//populate peserta cimpa data
	json.NewDecoder(r.Body).Decode(&u)
	fmt.Printf("%+v\n", u)
	_, err := models.CreatePeserta(u)
	if err != nil {
		fmt.Println(err.Error())
	}

	d := PesertaCimpaResp{"1", "success", CustomMessage{"Peserta Cimpa Created"}}

	uj, _ := json.Marshal(d)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}

func (cc PesertaCimpaController) GetPesertaCimpaWithID(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	u, err := models.GetPesertaCimpaByID(p.ByName("id"))
	fmt.Printf("%+v\n", u)
	if err != nil {
		fmt.Println(err.Error())
	}

	uj, _ := json.Marshal(u)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}

func (cc PesertaCimpaController) GetAllPesertaCimpaWithKlasis(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	klasis := r.URL.Query().Get("klasis")
	fmt.Println(klasis)
	fmt.Printf("klasis data type %T\n", klasis)
	u, err := models.GetAllPesertaCimpaByKlasis(klasis)
	fmt.Printf("%+v\n", u)
	if err != nil {
		fmt.Println(err.Error())
	}

	uj, _ := json.Marshal(u)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}

func (cc PesertaCimpaController) DeleteAll(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	err := models.DeleteAllPeserta()

	if err != nil {
		fmt.Println(err.Error())
	}

	d := PesertaCimpaResp{"1", "success", CustomMessage{"All Peserta Deleted"}}

	uj, _ := json.Marshal(d)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}
