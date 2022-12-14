package models

import (
	"fmt"
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

type PesertaCimpaDetail struct {
	Id           string `json:"id"`
	Nama         string `json:"nama"`
	Klasis       string `json:"klasis"`
	Runggun      string `json:"runggun"`
	IdPeserta    string `json:"id_peserta"`
	JenisKelamin string `json:"jenis_kelamin"`
	NoTelp       string `json:"no_telp"`
	LinkSosmed   string `json:"link_sosmed"`
	BuktiBayar   string `json:"bukti_bayar"`
	Foto         string `json:"foto"`
	IsConfirmed  bool   `json:"is_confirmed"`
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

type IdPeserta struct {
	Id string `json:"id"`
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

func UpdateStatusKonfirmasiPeserta(id string) error {
	//update value
	sqlStr := "UPDATE peserta_cimpa SET is_confirmed=1 WHERE id=?"
	stmt, err := config.DB.Prepare(sqlStr)
	if err != nil {
		fmt.Println(err)
		return err
	}
	_, err = stmt.Exec(id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func UpdateBuktiBayar(url string, id string) error {
	//update value
	sqlStr := "UPDATE peserta_cimpa SET bukti_bayar=? WHERE id=?"
	stmt, err := config.DB.Prepare(sqlStr)
	if err != nil {
		fmt.Println(err)
		return err
	}
	_, err = stmt.Exec(url, id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
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

func GetAllPesertaCimpa() ([]PesertaCimpaDetail, error) {
	//select peserta
	sqlStr := "SELECT id, nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, bukti_bayar, link_sosmed, foto, is_confirmed FROM peserta_cimpa"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var allPeserta []PesertaCimpaDetail
	// err = stmt.Query(klasis).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.LinkSosmed, &peserta.Foto)
	rows, err := stmt.Query()
	checkErr(err)

	for rows.Next() {
		var peserta PesertaCimpaDetail
		if err := rows.Scan(&peserta.Id, &peserta.Nama, &peserta.Klasis, &peserta.Runggun,
			&peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp,
			&peserta.BuktiBayar, &peserta.LinkSosmed, &peserta.Foto, &peserta.IsConfirmed); err != nil {
			panic(err)
		}
		allPeserta = append(allPeserta, peserta)
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}

	return allPeserta, nil
}

func GetAllPesertaCimpaByKlasis(klasis string) ([]PesertaCimpaDetail, error) {
	//select peserta
	sqlStr := "SELECT id, nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, bukti_bayar, link_sosmed, foto, is_confirmed FROM peserta_cimpa WHERE klasis=?"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var allPeserta []PesertaCimpaDetail
	// err = stmt.Query(klasis).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.LinkSosmed, &peserta.Foto)
	rows, err := stmt.Query(klasis)
	checkErr(err)

	for rows.Next() {
		var peserta PesertaCimpaDetail
		if err := rows.Scan(&peserta.Id, &peserta.Nama, &peserta.Klasis, &peserta.Runggun,
			&peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp,
			&peserta.BuktiBayar, &peserta.LinkSosmed, &peserta.Foto, &peserta.IsConfirmed); err != nil {
			panic(err)
		}
		allPeserta = append(allPeserta, peserta)
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}

	return allPeserta, nil
}

func DeleteAllPeserta() error {
	//delete all peserta
	sqlStr := "Truncate TABLE peserta_cimpa"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)

	stmt.Exec()
	checkErr(err)

	return nil
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
