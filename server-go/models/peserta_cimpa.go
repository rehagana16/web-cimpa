package models

import (
	"server/config"
)

type PesertaCimpa struct {
	Nama         string `json:"nama"`
	Klasis       string `json:"klasis"`
	Runggun      string `json:"runggun"`
	IdPeserta    string `json:"id_peserta"`
	JenisKelamin string `json:"jenis_kelamin"`
	NoTelp       string `json:"no_telp"`
	LinkSosmed   string `json:"link_sosmed"`
	BuktiBayar   string `json:"bukti_bayar"`
	Foto         string `json:"foto"`
	// IsConfirmed  bool   `json:"is_confirmed"`
}

type PesertaCimpaResult struct {
	Nama         string `json:"nama"`
	Klasis       string `json:"klasis"`
	Runggun      string `json:"runggun"`
	IdPeserta    string `json:"id_peserta"`
	JenisKelamin string `json:"jenis_kelamin"`
	NoTelp       string `json:"no_telp"`
	LinkSosmed   string `json:"link_sosmed"`
	Foto         string `json:"foto"`
}

func CreatePeserta(od PesertaCimpa) (PesertaCimpa, error) {
	//insert values
	sqlStr := "INSERT into peserta_cimpa(nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, link_sosmed, bukti_bayar, foto, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)

	_, err = stmt.Exec(od.Nama, od.Klasis, od.Runggun, od.IdPeserta, od.JenisKelamin, od.NoTelp, od.LinkSosmed, od.BuktiBayar, od.Foto, 0)
	checkErr(err)

	return od, nil
}

func GetPesertaCimpaByID(id string) (PesertaCimpaResult, error) {
	//select peserta
	sqlStr := "SELECT nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, link_sosmed, foto FROM peserta_cimpa WHERE id=?"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var peserta PesertaCimpaResult
	err = stmt.QueryRow(id).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.LinkSosmed, &peserta.Foto)
	checkErr(err)

	return peserta, nil
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
