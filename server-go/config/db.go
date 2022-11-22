package config

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func init() {
	var err error
	DB, err = sql.Open("mysql", "rehagana16:32rkcsembiring@tcp(127.0.0.1:3306)/pesertacimpa")
	checkErr(err)
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
