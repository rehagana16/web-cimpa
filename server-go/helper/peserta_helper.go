package helper

func CreateIDPeserta(id string, klasisCode string, runggunCode string, jenisKelamin string) string {

	pesertaCode := PaddingZero(id)

	return klasisCode + runggunCode + jenisKelamin + pesertaCode
}

func PaddingZero(id string) string {
	length := len(id)

	diff := 5 - length

	result := ""

	for i := 0; i < diff; i++ {
		result += "0"
	}

	result += id
	return result
}
