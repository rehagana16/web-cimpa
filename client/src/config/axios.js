import axios from "axios"

const Axios = axios.create({
    // baseURL:"http://localhost:8080"

    baseURL:"https://api.cimpa.permatagbkp.org"
})

Axios.defaults.headers.post['Content-Type'] = true;
// Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export {Axios};
