package models

import (
	"errors"
	"server/config"
)

type AkunCimpa struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Klasis   string `json:"klasis"`
	Role     string `json:"role"`
}

type AkunCimpaResult struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Klasis   string `json:"klasis"`
}

func CreateAkun(od AkunCimpa) (AkunCimpa, error) {
	//insert values
	sqlStr := "INSERT into akun_cimpa(username, password, klasis, role) VALUES (?,?,?,?)"

	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)

	_, err = stmt.Exec(od.Username, od.Password, od.Klasis, od.Role)
	checkErr(err)

	return od, nil
}

func GetAkunByUsername(username string, password string) (AkunCimpaResult, error) {
	var akun AkunCimpaResult
	//select akun
	sqlStr := "SELECT username, password, klasis from akun_cimpa WHERE username=?"
	stmt, err := config.DB.Prepare(sqlStr)
	if err != nil {
		return akun, err
	}

	err = stmt.QueryRow(username).Scan(&akun.Username, &akun.Password, &akun.Klasis)
	if err != nil {
		err := errors.New("USERNAME TIDAK DITEMUKAN")
		return akun, err
	}

	if akun.Password != password {
		err := errors.New("PASSWORD SALAH")
		return akun, err
	}

	return akun, nil

}

func DeleteAllAkun() error {
	//delete all akun
	sqlStr := "Truncate TABLE akun_cimpa"
	stmt, err := config.DB.Prepare(sqlStr)
	checkErr(err)

	stmt.Exec()
	checkErr(err)

	return nil
}
