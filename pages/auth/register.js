import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie, setCookies } from "cookies-next";
import { postAPI } from "../../lib/api";
import axios from "axios";
import router from "next/router";

export default function Register() {
    var jwt;
    var isLogged;

    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastNameName] = useState(null);
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);

   {/* useEffect(function () {
        jwt = getCookie('jwt');
        isLogged = (jwt != null && jwt.length > 1) ? true : false
        if (isLogged) {
            window.location.href = "/";
        }
    }, []);*/}

    const login = async (e) => {
        e.preventDefault();

        await axios({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: process.env.API+'/api/user/register',
            data: {
                firstName,
                lastName,
                email,
                password
            },
          }).then((response)=>{
                setError(null);
                setSucces("Vous êtes inscrits vous pouvez désormais vous connecter.");
          })
          .catch((error) => {
            console.log(error);
            setError("Impossible de vous inscrire. Vérifiez que vous avez remplis tous les champs.");
          })
          
      }


    return (
        <div>
            {/* Page Container */}
            <div id="page-container" className="flex flex-col mx-auto w-full min-h-screen bg-gray-100">
                {/* Page Content */}
                <main id="page-content" className="flex flex-auto flex-col max-w-full">
                    <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
                        {/* Patterns Background */}
                        <div className="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 transform translate-x-16 translate-y-16" />
                        <div className="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 transform -translate-x-16 -translate-y-16" />
                        {/* END Patterns Background */}
                        
                        {/* Sign In Section */}
                        <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                                    <img src="/logo.png" />
                                </h1>
                            </div>
                            {/* END Header */}
                            
      {error != null?<div className="p-4 md:p-5 rounded text-red-700 bg-red-100 mb-5">
        <div className="flex items-center mb-3">
          <svg className="hi-solid hi-x-circle inline-block w-5 h-5 mr-3 flex-none text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          <h3 className="font-semibold">
            {error}
          </h3>
        </div>
      </div>:''}
         {/* Success Alert */}
         {succes != null?<div className="p-4 md:p-5 rounded text-green-700 bg-green-100 mb-5">
        <div className="flex items-center mb-2">
          <svg className="hi-solid hi-check-circle inline-block w-5 h-5 mr-3 flex-none text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          <h3 className="font-semibold">Vous êtes désormais enregistré !</h3>
        </div>
        <p className="ml-8">
          Vous pouvez vous connecter en cliquant sur le bouton ci-dessous pour commencer à envoyer des impressions 3D.
        </p>
      </div>:''}
      {/* END Success Alert */}
                            {/* Sign In Form */}
                            <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                                <div className="p-5 lg:p-6 flex-grow w-full">
                                    <div className="sm:p-5 lg:px-10 lg:py-8">
                                        <div className="space-y-6">
                                            <div className="space-y-1">
                                                <label  className="font-medium">E-mail</label>
                                                <input onChange={(e) => setEmail(e.target.value)} className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" type="email"  placeholder="Entrer votre e-mail devinci" />
                                            </div>
                                            <div className="space-y-1">
                                                <label  className="font-medium">Prénom</label>
                                                <input onChange={(e) => setFirstName(e.target.value)} className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" type="text"  placeholder="Prénom" />
                                            </div>
                                            <div className="space-y-1">
                                                <label  className="font-medium">Nom</label>
                                                <input onChange={(e) => setLastNameName(e.target.value)} className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" type="text"  placeholder="Nom" />
                                            </div>
                                            <div className="space-y-1">
                                                <label  className="font-medium">Mot de passe</label>
                                                <input onChange={(e) => setPassword(e.target.value)} className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" type="password"  placeholder="Mot de passe" />
                                            </div>
                                            <div className="space-y-3">
                                                <button 
                                                onClick={(e)=>login(e)}
                                                type="submit" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                                                    S'inscrire
                                                </button>
                                                <button 
                                                onClick={(e)=>router.push('/auth')}
                                                type="submit" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-3 rounded border-indigo-700 bg-white-700 text-indigo-700 hover:text-indigo-500 hover:bg-gray-50 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                                                    Se connecter
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
                                    <Link href="/"><a class="font-medium text-indigo-600 hover:text-indigo-400" >Revenir sur le site</a></Link>
                                </div>
                            </div>
                            {/* END Sign In Form */}
                        </div>
                        {/* END Sign In Section */}
                    </div>
                </main>
                {/* END Page Content */}
            </div>
            {/* END Page Container */}
        </div>
    );


}