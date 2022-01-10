import { MoonIcon, DownloadIcon } from "@heroicons/react/outline";
import Link from 'next/link';
import { setZero } from "../lib/function";

const colors = {
  "2274e0": "text-gray-700 bg-gray-200",
  "e9d41d": "text-yellow-700 bg-yellow-200",
  "f30b0b": "text-white bg-gradient-to-r from-yellow-400 to-red-500",
};

export default function TablesAdmin({tickets, isDone}) {

  var ticket;
  if(isDone){
    ticket = tickets.filter(r => r.step < 3);
  } else {
    ticket = tickets;
  }
  return (
    <div className="border border-gray-200 rounded overflow-x-auto min-w-full bg-white">
      <table className="min-w-full text-sm align-middle whitespace-nowrap">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Id
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left">
              Nom
            </th>
            {/*<th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left">
              Email
  </th>*/}
  <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left">
              Priorité
  </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Type
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Etat
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {ticket.map((r) => {
            return (
              <tr className="border-b border-gray-200">
                <td className="p-3 text-center">
                  <span className="font-medium">#{setZero(r.id)}</span>
                </td>
                <td className="p-3">
                  <p className="font-medium">{r.userName}</p>
                  <p className="text-gray-500">ESILV A2</p>
                </td>
                <td className="p-3">
                  <div
                    className={`font-semibold inline-flex px-2 py-1 leading-4 text-xs rounded-full ${colors[r.priorityColor]}`}
                  >
                    {r.priorityName}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div
                    className={`font-semibold inline-flex px-2 py-1 leading-4 text-xs rounded-ful`}
                  >
                    {r.projectType}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div
                    className={`font-semibold inline-flex px-2 py-1 leading-4 text-xs rounded-ful`}
                  >
                    {r.step == 0?'Fichier STL':r.step == 1?'Impression pas commencé':r.step == 2?"Impression terminée":r.step >2?"Ticker fermé":''}
                  </div>
                </td>
                <td className="p-3 text-center space-x-2">
                  <Link href={`/panel/admin/${r.id}`}>
                  <button
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                  >
                    <MoonIcon className="inline-block w-4 h-4" />
                    <span>Visualiser</span>
                  </button>
                  </Link>
{/*
                  <button
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-1 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                  >
                    <DownloadIcon className="inline-block w-4 h-4" />
</button>*/}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
