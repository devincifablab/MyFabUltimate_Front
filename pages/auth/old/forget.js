import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie, setCookies } from "cookies-next";
import { postAPI } from "../../lib/api";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";

export default function Forget() {
    var jwt;
    var isLogged;

    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);

    const login = async (e) => {
        e.preventDefault();

        await axios({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: process.env.API+'/api/user/forgottenPassword',
            data: {
                email
            },
          }).then((response)=>{
            if(response.status == 200){
                toast.success("Si un compte existe à l'adresse e-mail "+email+", vous receverez votre lien de récupération d'ici quelques minutes. Pensez à vérifier vos spams.", {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                router.push('/auth');
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Une erreur s'est produite. Veuillez réessayer dans quelques instants.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
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
                            {/* Sign In Form */}
                            <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                                <div className="p-5 lg:p-6 flex-grow w-full">
                                    <div className="sm:p-5 lg:px-10 lg:py-8">
                                        <div className="space-y-6">
                                            <div className="space-y-1">
                                                <label  className="font-medium">E-mail</label>
                                                <input onChange={(e) => setEmail(e.target.value)} className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" type="email" placeholder="Entrer votre e-mail devinci" />
                                            </div>
                                            <div className="space-y-3">
                                                <button 
                                                onClick={(e)=>login(e)}
                                                type="submit" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                                                    Récupérer mon mot de passe
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
                                    <Link href="/auth"><a class="font-medium text-indigo-600 hover:text-indigo-400" >Revenir sur la page précédente</a></Link>
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