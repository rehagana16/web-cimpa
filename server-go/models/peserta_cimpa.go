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
	Email        string `json:"email"`
	SizeBaju     string `json:"size_baju"`
	LinkSosmed   string `json:"link_sosmed"`
	Foto         string `json:"foto"`
	BuktiBayar   string `json:"bukti_bayar"`
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
	Email        string `json:"email"`
	SizeBaju     string `json:"size_baju"`
	LinkSosmed   string `json:"link_sosmed"`
	Foto         string `json:"foto"`
	BuktiBayar   string `json:"bukti_bayar"`
	IsConfirmed  bool   `json:"is_confirmed"`
}

type PesertaCimpaResult struct {
	Nama         string `json:"nama"`
	Klasis       string `json:"klasis"`
	Runggun      string `json:"runggun"`
	IdPeserta    string `json:"id_peserta"`
	JenisKelamin string `json:"jenis_kelamin"`
	NoTelp       string `json:"no_telp"`
	Email        string `json:"email"`
	SizeBaju     string `json:"size_baju"`
	LinkSosmed   string `json:"link_sosmed"`
	Foto         string `json:"foto"`
	BuktiBayar   string `json:"bukti_bayar"`
}

type BuktiBayarResult struct {
	Id         string `json:"id"`
	BuktiBayar string `json:"bukti_bayar"`
	Klasis     string `json:"klasis"`
	Status     string `json:"status"`
}

type ConfirmPesertaInput struct {
	Id               string `json:"id"`
	KlasisCode       string `json:"klasisCode"`
	RunggunCode      string `json:"runggunCode"`
	JenisKelaminCode string `json:"jenisKelaminCode"`
	Email            string `json:"email"`
}

type BuktiBayarInput struct {
	Id      string `json:"id"`
	Message string `json:"message"`
}

type ChangeBuktiBayarInput struct {
	Id  string `json:"id"`
	Url string `json:"url"`
}

type SendEmailInput struct {
	Email string `json:"email"`
	Id    string `json:"id"`
}

type CreateQRInput struct {
	Id string `json:"id"`
}

func CreatePeserta(od PesertaCimpa) (PesertaCimpa, error) {

	//insert values
	sqlStr := "INSERT into peserta_cimpa(nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, email, size_baju, link_sosmed, foto, bukti_bayar, is_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	_, err = stmt.Exec(od.Nama, od.Klasis, od.Runggun, od.IdPeserta, od.JenisKelamin, od.NoTelp, od.Email, od.SizeBaju, od.LinkSosmed, od.Foto, od.BuktiBayar, 0)
	checkErr(err)

	return od, nil
}

func UpdateStatusKonfirmasiPeserta(id string) error {
	//update value
	sqlStr := "UPDATE peserta_cimpa SET is_confirmed=is_confirmed^1 WHERE id=?"
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

func UpdatePesertaId(pesertaId string, id string) error {
	//update value
	sqlStr := "UPDATE peserta_cimpa SET id_peserta=? WHERE id=?"
	stmt, err := config.DB.Prepare(sqlStr)
	if err != nil {
		fmt.Println(err)
		return err
	}
	_, err = stmt.Exec(pesertaId, id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func ChangeBuktiBayar(id string, url string) error {
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

func UpdateBuktiBayar(url string, klasis string) error {
	//update value
	sqlStr := "INSERT INTO bukti_bayar (bukti_bayar, klasis, status) VALUES(?,?,?)"
	stmt, err := config.DB.Prepare(sqlStr)
	if err != nil {
		fmt.Println(err)
		return err
	}
	_, err = stmt.Exec(url, klasis, "MENUNGGU KONFIRMASI")
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

// func DeleteBuktiBayarID(id string) error {
// 	//delete value
// 	sqlStr := "DELETE FROM bukti_bayar WHERE id=?"
// 	stmt, err := config.DB.Prepare(sqlStr)
// 	if err != nil {
// 		fmt.Println(err)
// 		return err
// 	}
// 	_, err = stmt.Exec(id)
// 	if err != nil {
// 		fmt.Println(err)
// 		return err
// 	}

// 	return nil

// }

func GetPesertaCimpaByID(id string) (PesertaCimpaResult, error) {
	//select peserta
	sqlStr := "SELECT nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, email, size_baju, link_sosmed, foto, bukti_bayar FROM peserta_cimpa WHERE id=?"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var peserta PesertaCimpaResult
	err = stmt.QueryRow(id).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.Email, &peserta.SizeBaju, &peserta.LinkSosmed, &peserta.Foto, &peserta.BuktiBayar)
	checkErr(err)

	return peserta, nil
}

func GetAllPesertaCimpa() ([]PesertaCimpaDetail, error) {
	//select peserta
	sqlStr := "SELECT id, nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, email, size_baju, link_sosmed, foto, bukti_bayar, is_confirmed FROM peserta_cimpa"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var allPeserta []PesertaCimpaDetail
	// err = stmt.Query(klasis).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.LinkSosmed, &peserta.Foto)
	rows, err := stmt.Query()
	checkErr(err)
	for rows.Next() {
		var peserta PesertaCimpaDetail
		if err := rows.Scan(&peserta.Id, &peserta.Nama, &peserta.Klasis, &peserta.Runggun,
			&peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.Email, &peserta.SizeBaju,
			&peserta.LinkSosmed, &peserta.Foto, &peserta.BuktiBayar, &peserta.IsConfirmed); err != nil {
			panic(err)
		}
		allPeserta = append(allPeserta, peserta)
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}

	return allPeserta, nil
}

func GetAllBuktiBayar() ([]BuktiBayarResult, error) {
	//select peserta
	sqlStr := "SELECT id, bukti_bayar, klasis, status FROM bukti_bayar"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var allBukti []BuktiBayarResult
	// err = stmt.Query(klasis).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.LinkSosmed, &peserta.Foto)
	rows, err := stmt.Query()
	checkErr(err)

	for rows.Next() {
		var bukti BuktiBayarResult
		if err := rows.Scan(&bukti.Id, &bukti.BuktiBayar, &bukti.Klasis, &bukti.Status); err != nil {
			panic(err)
		}
		allBukti = append(allBukti, bukti)
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}

	return allBukti, nil
}

func GetAllPesertaCimpaByKlasis(klasis string) ([]PesertaCimpaDetail, error) {
	//select peserta
	sqlStr := "SELECT id, nama, klasis, runggun, id_peserta, jenis_kelamin, no_telp, email, size_baju, link_sosmed, foto, bukti_bayar, is_confirmed FROM peserta_cimpa WHERE klasis=?"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var allPeserta []PesertaCimpaDetail
	// err = stmt.Query(klasis).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.LinkSosmed, &peserta.Foto)
	rows, err := stmt.Query(klasis)
	checkErr(err)

	for rows.Next() {
		var peserta PesertaCimpaDetail
		if err := rows.Scan(&peserta.Id, &peserta.Nama, &peserta.Klasis, &peserta.Runggun,
			&peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.Email, &peserta.SizeBaju,
			&peserta.LinkSosmed, &peserta.Foto, &peserta.BuktiBayar, &peserta.IsConfirmed); err != nil {
			panic(err)
		}
		allPeserta = append(allPeserta, peserta)
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}

	return allPeserta, nil
}

func GetBuktiBayarByKlasis(klasis string) ([]BuktiBayarResult, error) {
	//select peserta
	sqlStr := "SELECT id, bukti_bayar, klasis, status FROM bukti_bayar WHERE klasis=?"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)
	var allBukti []BuktiBayarResult
	// err = stmt.Query(klasis).Scan(&peserta.Nama, &peserta.Klasis, &peserta.Runggun, &peserta.IdPeserta, &peserta.JenisKelamin, &peserta.NoTelp, &peserta.LinkSosmed, &peserta.Foto)
	rows, err := stmt.Query(klasis)
	checkErr(err)

	for rows.Next() {
		var bukti BuktiBayarResult
		if err := rows.Scan(&bukti.Id, &bukti.BuktiBayar, &bukti.Klasis, &bukti.Status); err != nil {
			panic(err)
		}
		allBukti = append(allBukti, bukti)
	}

	if err = rows.Err(); err != nil {
		panic(err)
	}

	return allBukti, nil
}

func ChangeStatusBuktiBayar(id string, message string) error {
	//update value
	sqlStr := "UPDATE bukti_bayar SET status=? WHERE id=?"
	stmt, err := config.DB.Prepare(sqlStr)
	if err != nil {
		fmt.Println(err)
		return err
	}
	_, err = stmt.Exec(message, id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
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
