//TODO :
//** Make delete bukti bayar api
//** Make COnfirmation for admin
//** make loading when upload bukti bayar

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
	w.Header().Set("Access-Control-Allow-Origin", "*")
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	u, err := models.GetPesertaCimpaByID(p.ByName("id"))
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	klasis := r.URL.Query().Get("klasis")
	fmt.Println(klasis)
	fmt.Printf("klasis data type %T\n", klasis)
	if klasis == "Admin" {
		fmt.Println("TEST")
		u, err := models.GetAllPesertaCimpa()
		if err != nil {
			fmt.Println(err.Error())
		}

		uj, _ := json.Marshal(u)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		fmt.Fprintf(w, "%s", uj)
	} else {
		u, err := models.GetAllPesertaCimpaByKlasis(klasis)
		if err != nil {
			fmt.Println(err.Error())
		}

		uj, _ := json.Marshal(u)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		fmt.Fprintf(w, "%s", uj)
	}

}

func (cc PesertaCimpaController) GetBuktiBayarWithKlasis(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "*")
	klasis := r.URL.Query().Get("klasis")
	fmt.Println(klasis)
	fmt.Printf("klasis data type %T\n", klasis)
	if klasis == "Admin" {
		fmt.Println("TEST")
		u, err := models.GetAllBuktiBayar()
		if err != nil {
			fmt.Println(err.Error())
		}

		uj, _ := json.Marshal(u)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		fmt.Fprintf(w, "%s", uj)
	} else {
		u, err := models.GetBuktiBayarByKlasis(klasis)
		if err != nil {
			fmt.Println(err.Error())
		}

		uj, _ := json.Marshal(u)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		fmt.Fprintf(w, "%s", uj)
	}

}

func (cc PesertaCimpaController) ConfirmPeserta(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "*")

	u := models.IdPeserta{}

	json.NewDecoder(r.Body).Decode(&u)
	// fmt.Printf("%+v\n", u)
	// fmt.Printf("%s\n", u.Id)

	err := models.UpdateStatusKonfirmasiPeserta(u.Id)

	if err != nil {
		fmt.Println(err.Error())
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "Status Konfirmasi Peserta dengan id %s berhasil di update", u.Id)

}

func (cc PesertaCimpaController) GantiStatusBuktiBayar(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "*")

	u := models.BuktiBayarInput{}

	json.NewDecoder(r.Body).Decode(&u)
	// fmt.Printf("%+v\n", u)
	// fmt.Printf("%s\n", u.Id)

	err := models.ChangeStatusBuktiBayar(u.Id, u.Message)

	if err != nil {
		fmt.Println(err.Error())
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "Status Bukti Bayar dengan id %s berhasil di update", u.Id)

}

func (cc PesertaCimpaController) UpdateBuktiBayar(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "*")

	fmt.Println("MASUK UPDATE BUKTI BAYAR")

	file, _, err := r.FormFile("file")
	if err != nil {
		fmt.Println("FORM FILE ERROR")
	}
	form_klasis := r.PostFormValue("klasis")
	if err != nil {
		fmt.Println("FORM ID ERROR")
	}

	uploadUrl, err := services.NewMediaUpload().FileUpload(models.File{File: file})
	if err != nil {
		fmt.Println("Upload URL services error")
	}
	// fmt.Printf("%+v\n", u)
	// fmt.Printf("%s\n", u.Id)

	err = models.UpdateBuktiBayar(uploadUrl, form_klasis)

	if err != nil {
		fmt.Println(err.Error())
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "%s", "fails run sql query")
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "Bukti bayarPeserta dengan klasis %s berhasil di tambah", form_klasis)

}

func (cc PesertaCimpaController) ChangeBuktiBayar(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, HEAD, PATCH, OPTIONS, GET, PUT")

	err := models.DeleteBuktiBayarID(p.ByName("id"))

	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "%s", "FAIL TO DELETE BUKTI BAYAR")
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", "Bukti bayar deleted")

}

func (cc PesertaCimpaController) DeleteAll(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "*")
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
