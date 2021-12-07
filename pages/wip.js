import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";

const WIP = ({ }) => {
  return (
      <div className="flex justify-center items-center h-screen">
          <div className="text-center m-auto space-x-5">
          <center><img src="/wip.gif" /></center>
          <h2 className="text-xl">Oups, ça travaille toujours dur pour vous offrir un super beau site !</h2>
          <button onClick={() => window.location.href="/panel"} className="bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-500 mt-5">Accéder au panel</button>
          <button onClick={() => window.location.href="/auth"} className="border-2 border-indigo-700 text-indigo-700 p-2 rounded-md hover:bg-indigo-100 mt-5">Se connecter</button>

          </div>
          
      </div>
      
  );
};

export default WIP;
