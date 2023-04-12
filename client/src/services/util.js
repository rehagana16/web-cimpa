import axios from "axios";
import codeKlasis from "../data/codeKlasis";
import codeRunggun from "../data/codeRunggun";

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const getUtusanCode = (value) => {
    if (value.utusan === "Utusan Klasis") {
        return "K";
    } return "R";
}

const getStatusCode = (value) => {
    if (value.status === "Peserta") {
        return "PS"
    } return "PN"
}

const getJenisKelaminCode = (value) => {
    console.log(value)
    if (value === "Laki-laki") {
        return "1"
    } return "2"
}


const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const getKlasisCode = (klasis) => {
    return codeKlasis[klasis]
}

const getRunggunCode = (klasis, runggun) => {
    return codeRunggun[klasis][runggun]
}

const util = {
    getCookie,
    getUtusanCode,
    getStatusCode,
    getJenisKelaminCode,
    pad,
    getKlasisCode,
    getRunggunCode,
}


export default util;