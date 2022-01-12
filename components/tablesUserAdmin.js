import { MoonIcon, DownloadIcon } from "@heroicons/react/outline";
import Link from 'next/link';
import { setZero } from "../lib/function";

const colors = {
  "2274e0": "text-gray-700 bg-gray-200",
  "e9d41d": "text-yellow-700 bg-yellow-200",
  "f30b0b": "text-white bg-gradient-to-r from-yellow-400 to-red-500",
};

export default function UserTablesAdmin({ user, id }) {

  return (
    <div className="border border-gray-200 rounded overflow-x-auto min-w-full bg-white">
      <table className="min-w-full text-sm align-middle whitespace-nowrap">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              Id
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-left">
              Prénom
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-left">
              Nom
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              E-mail
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {user.map((r) => {
            return (
              <tr className="border-b border-gray-200">
                <td className="p-3 text-center">
                  <span className="font-medium">#{setZero(r.id)}</span>
                </td>
                <td className="p-3">
                  <p className="font-medium">{r.firstName}</p>
                </td>
                <td className="p-3">
                  <div
                    className={`font-medium inline-flex leading-4 rounded-full uppercase`}
                  >
                    {r.lastName}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div
                    className={`font-medium inline-flex py-1 leading-4 rounded-ful`}
                  >
                    {r.email}
                  </div>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => { id(r.id) }}
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 border font-medium focus:outline-none px-2 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                  >
                    <MoonIcon className="inline-block w-4 h-4" />
                    <span>Visualiser la fiche</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
