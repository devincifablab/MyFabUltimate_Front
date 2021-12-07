import React from "react";

const Error = () => {
  return (
    <div className="flex h-screen">
        <div className="text-center m-auto">
        <h1 className="font-medium text-xl text-indigo-700">Oups une erreur est survenue...</h1>
        <p>La page que vous recherchez actuellement n'existe pas.</p>
        <button onClick={() => window.location.href="/"} className="bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-500 mt-5">Retourner sur la page d'accueil</button>
    </div>
    </div>
  );
};


export default Error;
