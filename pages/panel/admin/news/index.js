import LayoutPanel from "../../../../components/layoutPanel";
import NavbarAdmin from "../../../../components/navbarAdmin";
import { MoonIcon, DownloadIcon, AnnotationIcon } from "@heroicons/react/outline";
import Link from 'next/link'
const colors = {
  "PIX A1": "text-red-700 bg-red-200",
  "PIX A2": "text-yellow-700 bg-yellow-200",
  PING: "text-indigo-700 bg-indigo-200",
  FABLAB: "text-white bg-gradient-to-r from-yellow-400 to-red-500",
};

const todo = [
  {
    name: "Les beaux flocons",
    id: "Noémie LE MOIGNE",
    email: "Le 23 octobre 2021 à 13h45",
    type: "Vie du fablab",
    color: colors["PIX A1"],
  },
];
export default function NewsAdmin() {
  return (
    <LayoutPanel>
      <NavbarAdmin />
      <div className="border border-gray-200 rounded overflow-x-auto min-w-full bg-white md:px-8">
      <div>
        {/* Page Heading with Actions */}
        <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:border-b-2 sm:border-gray-200 mb-4 lg:mb-8">
          <h2 className="text-2xl font-bold py-3">
            Panneau d'éditions des actualités
            <span className="block text-lg text-gray-600 font-normal">Ajouter, éditer ou supprimer un article</span>
          </h2>
          {/* Actions */}
          <div className="flex items-center justify-between sm:justify-end space-x-2 py-3 bg-gray-50 rounded sm:bg-transparent px-2 sm:px-0">
            <Link href="/panel/admin/news/add">
            <button type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-transparent text-indigo-600 hover:text-indigo-400 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:text-indigo-600">
<AnnotationIcon className="inline-block w-5 h-5 opacity-75" />
              <span>Créer un article</span>
            </button></Link>
          </div>
          {/* END Actions */}
        </div>
        {/* END Page Heading with Actions */}
        {/* Bordered Table */}
      <table className="min-w-full text-sm align-middle whitespace-nowrap">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Auteur.e
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Nom
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left">
              Dernière mise à jour
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Catégorie
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
        {/* END Table Header */}
        {/* Table Body */}
        <tbody>
          {todo.map((r) => {
            return (
              <tr className="border-b border-gray-200">
                <td className="p-3 text-center">
                  <span className="font-medium">{r.id}</span>
                </td>
                <td className="p-3 text-center">
                  <p className="font-medium">{r.name}</p>
                </td>
                <td className="p-3 text-gray-500 truncate">{r.email}</td>
                <td className="p-3 text-center">
                  <div
                    className={`font-semibold inline-flex px-2 py-1 leading-4 text-xs rounded-full ${r.color}`}
                  >
                    {r.type}
                  </div>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                  >
                    <MoonIcon className="inline-block w-4 h-4" />
                    <span>Editer</span>
                  </button>

                  
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* END Table Body */}
      </table>
      {/* END Bordered Table */}
      </div>
    </div>
    </LayoutPanel>
  );
}
