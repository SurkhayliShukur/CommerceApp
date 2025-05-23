import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth,fireDB} from "../../Firebase/Firebase"
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const navigate = useNavigate()
  const [newUser,setNewUser] = useState({
    name:"",
    email:"",
    password:"",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try{
      const result = await signInWithPopup(auth,provider)
      const user = result.user
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Successfully");
      setTimeout(() => navigate("/"), 1000);
    }catch(error){
      toast.error(`Google Sign-In Error:, ${error}`)
    }
  }

  const signUpUser = async () => {
      const {email,name,password} = newUser
      if(name.trim() === "" || email.trim() === "" || password.trim() === "" ){
            return toast.error("All fields are required")
      }

      try{
          const userSignIn = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = {
            name: name,
            uid: userSignIn.user.uid,
            email: userSignIn.user.email,
            time: Timestamp.now(),
          }
          const userRef = collection(fireDB ,"users")
          await addDoc(userRef,user)
          toast.success("Sign up successfully")
          setNewUser({
            name:"",
            email:"",
            password:""
          })
          setTimeout(() => navigate("/login"),1000)
      } catch(error){
        toast.error(error)
      }  
  }

 
  return (
    <>
        <div className=" flex justify-center items-center h-screen">
        <div className="  bg-gray-900 px-10 py-10 rounded-md">
          <div className="">
            <h1 className="text-center text-blue-200 text-3xl mb-4 font-bold">
              Signup
            </h1>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>

          <div className=" flex justify-center items-center flex-col mb-3">
            <button
              className=" bg-gega-red w-full text-blue-200 font-bold  px-4 py-2 rounded-sm text-xl 
              flex justify-center hover:opacity-90 transition duration-300"
              onClick={signUpUser}
            >
              <AiOutlineMail size={35} />
            </button>
            <button
              className="bg-blue-300 w-full text-white font-bold px-4 py-2 rounded-sm text-xl mt-4 flex justify-center hover:opacity-90 transition duration-300"
              onClick={googleSignUp}
            >
              <FcGoogle size={35}/>
            </button>
          </div>

          <div>
            <h2 className="text-white">
              <span className="text-blue-200 ml-1">
                You already have an account
              </span>
              <Link
                className="text-gega-melon font-bold ml-3 text-xl hover:opacity-90 transition duration-300"
                to={"/login"}
              >
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp