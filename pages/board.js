import React from "react";
import Steps from "../components/steps";

const Board = () => {

    
    function onChange(id){
        if(id <3){
            const input = document.getElementById(''+(id+1));
        input.focus();
        input.select();
        }

    }

    return (
        <div className="font-sans min-w-screen min-h-screen bg-blue-50 py-8 px-4">

            <div className="max-w-md mx-auto">

                <div className="bg-white p-8 shadow-md">

                    <div className="p-5 h-64 flex flex-col items-center justify-center text-center tracking-wide leading-normal bg-gray-100 -mx-8 -mt-8">
                        <img src="/logo.png" width="50%" />
                        <p className="text-lg  font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-red-500 mt-5 animate-gradient-x">Bienvenue au Fabl-o-cker !</p>
                    </div>

                    <div className="space-y-3 py-8 border-b">
                        <p>Bonjour !</p>
                        <p>Bienvenue au Fabl-o-cker. Si vous avez commandé une impression 3D et que celle-ci est marquée comme disponible sur MyFab, vous pouvez venir la retirer ici.</p>
                        <p className="font-bold">Veuillez entrer les trois premières lettres de votre nom:</p>
                        <div className="space-x-5 text-center">
                        <input
                        id="1"
                        type="text"
                        onClick={(e)=>e.target.value = ''}
                        onChange={(e)=>{e.target.value = e.target.value.toUpperCase(); onChange(1)}}
                        maxlength="1"
                        class="border border-gray-300 rounded-full w-20 h-20 text-center text-4xl"
                        />
                        <input
                        onClick={(e)=>e.target.value = ''}
                        onChange={(e)=>{e.target.value = e.target.value.toUpperCase(); onChange(2)}}
                        id="2"
                        type="text"
                        maxlength="1"
                        class="border border-gray-300 rounded-full w-20 h-20 text-center text-4xl"
                        /><input
                        onClick={(e)=>e.target.value = ''}
                        onChange={(e)=>{e.target.value = e.target.value.toUpperCase(); onChange(3)}}
                        id="3"
                        type="text"
                        maxlength="1"
                        class="border border-gray-300 rounded-full w-20 h-20 text-center text-4xl"
                        />
                        </div>

                        <p className="font-light text-sm text-center">Pour tout problèmes, merci de contacter un membre du FabLab.</p>
                    </div>

                    <div className="mt-8 text-center">
                        <button className="bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-500"><a href="/panel/12345">Accéder à mon ticket</a></button>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Board;
