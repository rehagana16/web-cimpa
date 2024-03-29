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
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState("")
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
        if (loginData.password === "" || loginData.username === "") {
            setMessage("DATA TIDAK BOLEH KOSONG")
            setShowModal(true)
            return
        }
        Axios.post("/api/akunCimpa/login", {
            username : loginData.username,
            password : loginData.password
        })
            .then((response) => {
                setCookie('Token', response.data, {
                    path: '/',
                    maxAge: 86400,
                })
                navigate("/dashboard")

            })
            .catch((error) => {
                console.log(error.response.data)
                setMessage(error.response.data)
                setShowModal(true)
            })
        console.log("LOGIN BUTTON PRESSED")
    }

    return(
        <div class="h-screen lg:mx-32">
            <div class="px-6 h-full text-gray-800">
                <div
                class="flex justify-center items-center md:flex-col lg:flex-wrap h-full g-6"
                >
                <div
                    class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <img
                    src="logo.png"
                    class="w-full"
                    alt="Sample image"
                    />
                </div>
                <div class="xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                    <form onSubmit={handleLogin}>

                    <div class="mb-6">
                        <input
                        type="text"
                        name="username"
                        onChange={onChange}
                        class="form-control block w-full px-4 py-2 text-3xl lg:text-xl font-normal text-[#eba110] bg-transparent border border-solid border-2 border-[#eba110] rounded transition ease-in-out m-0 focus:text-white focus:border-[#c2451e]"
                        id="exampleFormControlInput2"
                        placeholder="Username"
                        />
                    </div>

                    <div class="mb-6">
                        <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        class="form-control block w-full px-4 py-2 text-3xl lg:text-xl font-normal text-[#eba110] bg-transparent border border-solid border-2 border-[#eba110] rounded transition ease-in-out m-0 focus:text-white focus:border-[#c2451e]"
                        id="exampleFormControlInput2"
                        placeholder="Password"
                        />
                    </div>

                    <div class="text-center lg:text-left">
                        <button
                        type="submit"
                        class="inline-block px-7 py-3 bg-[#c2451e] text-white font-medium text-3xl lg:text-lg leading-snug uppercase rounded shadow-md hover:bg-transparent hover:text-[#c2451e] border border-solid border-2 border-[#c2451e] hover:rounded transition duration-150 ease-in-out"
                        >
                        Login
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            {showModal ? (
                <>
                    <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 bg-[#c2451e] text-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                            <div className="relative p-6 flex-auto">
                                "{message}"
                            </div>
                            <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Login