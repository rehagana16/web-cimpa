package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/models"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/julienschmidt/httprouter"
)

var jwtKey = []byte("my_secret_key")

type (
	AkunCimpaController struct{}
)

func NewAkunCimpaController() *AkunCimpaController {
	return &AkunCimpaController{}
}

type AkunCimpaResp struct {
	RespCode string `json:"response_code"`
	RespDesc string `json:"response_description"`
	Data     CustomMessage
}

type AkunCimpaBody struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Klasis string `json:"klasis"`
	jwt.RegisteredClaims
}

func (ac AkunCimpaController) CreateAkunCimpa(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")

	u := models.AkunCimpa{}

	//populate akun cimpa data
	json.NewDecoder(r.Body).Decode(&u)
	fmt.Printf("%+v\n", u)
	_, err := models.CreateAkun(u)
	if err != nil {
		fmt.Println(err.Error())
	}

	d := AkunCimpaResp{"1", "success", CustomMessage{"Akun Cimpa Created"}}

	uj, _ := json.Marshal(d)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}

func (ac AkunCimpaController) Login(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	var akunBody AkunCimpaBody
	json.NewDecoder(r.Body).Decode(&akunBody)
	// fmt.Printf("%+v\n", akunBody)
	u, err := models.GetAkunByUsername(akunBody.Username, akunBody.Password)
	if err != nil {
		fmt.Println(err.Error())
		// w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "%s", err)
		return
	}

	// uj, _ := json.Marshal(u)

	// fmt.Printf("%+v\n", u.Username)

	expirationTime := time.Now().Add(1 * time.Hour)

	claims := &Claims{
		Klasis: u.Klasis,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// http.SetCookie(w, &http.Cookie{
	// 	Name:    "token",
	// 	Value:   tokenString,
	// 	Expires: expirationTime,
	// 	Path:    "/",
	// })

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", tokenString)
}

func (ac AkunCimpaController) DeleteAllAkunCimpa(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Methods", w.Header().Get("Allow"))
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	err := models.DeleteAllAkun()

	if err != nil {
		fmt.Println(err.Error())
	}

	d := AkunCimpaResp{"1", "success", CustomMessage{"All Akun Deleted"}}

	uj, _ := json.Marshal(d)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}
