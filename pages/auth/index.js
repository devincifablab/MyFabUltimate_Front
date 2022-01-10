import axios from "axios";
import { setCookies } from "cookies-next";
import { useState } from "react"
import { ExclamationIcon } from '@heroicons/react/solid'
import router from "next/router";
import { toast } from "react-toastify";
import Link from 'next/link';

export default function Auth() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  async function login(){
    await axios({
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: process.env.API+'/api/user/login',
        data: {
            email,
            password
        },
      }).then((response)=>{
        if(response.status == 200){
            if(checked){
              setCookies('jwt', response.data.dvflCookie, {expires: new Date(Date.now()+2592000)});
            } else {
              setCookies('jwt', response.data.dvflCookie);
            }
            router.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setTimeout(()=>setError(false), 5000);
        toast.error("Impossible de vous connecter. Vérifiez votre mot de passe ou votre e-mail.", {
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
      <div className="min-h-screen bg-white flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="/logo.png"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Connectez-vous à MyFab</h2>
            </div>
  
            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Se connecter avec</p>
  
                  <div className="mt-1">
                    <div className="">
                      <a
                        href="#"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Mon compte LéoID</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="h-5 w-5" />
                        <p className="ml-2">Mon compte LéoID</p>
                      </a>
                    </div>
                  </div>
                </div>
  
                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="space-y-6">
                  <div className="">
                    <label htmlFor="email" className={`block text-sm font-medium ${error?'text-red-500':'text-gray-700'}`}>
                      Adresse e-mail
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e)=>setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`appearance-none block w-full px-3 py-2 border ${error?'border-red-300 ':'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                    </div>
                  </div>
  
                  <div className="space-y-1">
                    <label htmlFor="password" className={`block text-sm font-medium ${error?'text-red-500':'text-gray-700'}`}>
                      Mot de passe
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e)=>setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={`appearance-none block w-full px-3 py-2 border ${error?'border-red-300':'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} 
                      />
                    </div>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        onChange={()=>setChecked(!checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Se souvenir de moi
                      </label>
                    </div>
  
                    <div className="text-sm">
                      <Link href="/auth/forget"><a className="font-medium text-indigo-600 hover:text-indigo-500">
                        Mot de passe oublié ?
                      </a></Link>
                      
                    </div>
                  </div>
  
                  <div>
                    <button
                      onClick={()=>login()}
                      onSubmit={()=>login()}
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Se connecter
                    </button>
                    {/*<p className="text-sm text-center text-gray-500 p-1">La connexion par adresse e-mail est réservé aux anciens comptes MyFab.</p>*/}
                    <Link href="/auth/register">
                    <p className="text-sm text-center text-gray-500 p-1 hover:cursor-pointer">S'inscrire</p>
                    </Link>
                    <Link href="/">
                    <p className="text-sm text-center font-medium text-indigo-600 hover:text-indigo-500 mt-5 hover:cursor-pointer">Retourner sur MyFab</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://media.lesechos.com/api/v1/images/view/5d9c7a8c3e45463dde1e2ad6/1280x720/0602009053500-web-tete.jpg"
            alt=""
          />
        </div>
      </div>
    )
  }
  