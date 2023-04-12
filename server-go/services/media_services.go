package services

import (
	"fmt"
	"server/helper"
	"server/models"

	"github.com/go-playground/validator/v10"
	"github.com/skip2/go-qrcode"
)

var (
	validate = validator.New()
)

type mediaUpload interface {
	FileUpload(file models.File) (string, error)
	RemoteUpload(url models.Url) (string, error)
}

type media struct{}

func NewMediaUpload() mediaUpload {
	return &media{}
}

func (*media) FileUpload(file models.File) (string, error) {
	//validate struct file
	err := validate.Struct(file)
	if err != nil {
		return "", err
	}

	//upload
	uploadUrl, err := helper.ImageUploadHelper(file.File)
	if err != nil {
		return "", err
	}

	return uploadUrl, nil
}

func (*media) RemoteUpload(url models.Url) (string, error) {
	//validate
	err := validate.Struct(url)
	if err != nil {
		return "", err
	}

	//upload
	uploadUrl, errUrl := helper.ImageUploadHelper(url.Url)
	if errUrl != nil {
		return "", err
	}
	return uploadUrl, nil
}

func CreateQRService(pesertaid string, id string) (string, error) {
	link := "http://localhost:3000/profile/" + id

	destination := "/home/permatagbkp/golangapp/qrlist/" + pesertaid + ".png"

	err := qrcode.WriteFile(link, qrcode.High, 256, destination)

	if err != nil {
		panic(err)
	}

	uploadUrl, err := helper.ImageUploadHelper("qr.png")

	if err != nil {
		fmt.Println(err.Error())
	}

	return uploadUrl, err
}
