import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../config/axios";
import { useCookies } from "react-cookie";

const user = {
    username: "", 
    password: "",
}

function Login() {
    const [loginData, setLoginData] = useState(user)
    const [cookies, setCookie] = useCookies(['user'])
    const navigate = useNavigate();

    const onChange = (event) => {
        if (event.target.name === "username") {
            setLoginData({
                username: event.target.value,
                password: loginData.password
            })
        } else {
            setLoginData({
                username: loginData.username,
                password: event.target.value
            })
        }
        // console.log(loginData)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        Axios.post("/api/akunCimpa/login", {
            username : loginData.username,
            password : loginData.password
        })
            .then((response) => {
                setCookie('Token', response.data, {
                    path: '/',
                    maxAge: 86400,
                })
                navigate("/listPeserta")

            })
            .catch((error) => {
                console.log(error)
            })
        console.log("LOGIN BUTTON PRESSED")
    }

    return(
        <div class="h-screen mx-32">
            <div class="px-6 h-full text-gray-800">
                <div
                class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                <div
                    class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="w-full"
                    alt="Sample image"
                    />
                </div>
                <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    <form onSubmit={handleLogin}>

                    <div class="mb-6">
                        <input
                        type="text"
                        name="username"
                        onChange={onChange}
                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Email address"
                        />
                    </div>

                    <div class="mb-6">
                        <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Password"
                        />
                    </div>

                    <div class="text-center lg:text-left">
                        <button
                        type="submit"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                        Login
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login