import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from "../../Firebase/Firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    })

  }

  const logInUser = async () => {
    const { email, password } = newUser
    try {
      const userSignIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userSignIn.user
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log("Successfully signed in with Google:", user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Successfully");
      setTimeout(() => navigate("/"), 1000)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-900 px-10 py-10 rounded-md">
          <div>
            <h1 className="text-center text-blue-200 text-3xl mb-6 font-bold">
              Login
            </h1>
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>
          <div className=" flex justify-center items-center flex-col mb-3">
            <button
              className=" bg-gega-red w-full text-blue-200 font-bold  px-4 py-2 rounded-sm text-xl 
              flex justify-center hover:opacity-90 transition duration-300"
              onClick={logInUser}
            >
              <AiOutlineMail size={35} />
            </button>
            <button
              className="bg-blue-300 w-full text-white font-bold px-4 py-2 rounded-sm text-xl mt-4 flex justify-center hover:opacity-90 transition duration-300"
              onClick={loginWithGoogle}
            >
              <FcGoogle size={35} />
            </button>
          </div>
          <div>
            <h2 className="text-white">


              <Link
                className=" text-gega-melon font-bold mt-3 text-xl py-1 hover:opacity-90 transition duration-300 "
                to={"/signup"}
              >
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login