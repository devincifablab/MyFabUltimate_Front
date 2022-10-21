import { MoonIcon } from "@heroicons/react/outline";
import Link from "next/link";
import router from "next/router";
import { setZero } from "../lib/function";

const colors = {
  "2274e0": "text-gray-700 bg-gray-200",
  e9d41d: "text-amber-700 bg-amber-200",
  f30b0b: "text-white bg-gradient-to-r from-amber-400 to-red-500",
};

function dateDiff(date1, date2) {
  var diff = {}; // Initialisation du retour
  var tmp = date2 - date1;
  tmp = Math.floor(tmp / 1000); // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60; // Extraction du nombre de secondes

  tmp = Math.floor((tmp - diff.sec) / 60); // Nombre de minutes (partie entière)
  diff.min = tmp % 60; // Extraction du nombre de minutes
  if (!diff.min) return `${diff.sec} seconde${diff.sec > 1 ? "s" : ""}`;

  tmp = Math.floor((tmp - diff.min) / 60); // Nombre d'heures (entières)
  diff.hour = tmp % 24; // Extraction du nombre d'heures
  if (!diff.hour) return `${diff.min} minute${diff.min > 1 ? "s" : ""}`;

  tmp = Math.floor((tmp - diff.hour) / 24); // Nombre de jours restants
  diff.day = tmp % 365;
  if (!diff.day) return `${diff.hour} heure${diff.hour > 1 ? "s" : ""}`;

  tmp = Math.floor((tmp - diff.day) / 24); // Nombre d'années
  diff.year = tmp;
  if (!diff.year) return `${diff.day} jour${diff.day > 1 ? "s" : ""}`;
  return `${diff.year} année${diff.year > 1 ? "s" : ""}`;
}

export default function TablesAdmin({ tickets, maxPage, actualPage, nextPrevPage }) {
  const dateNow = new Date();
  return (
    <div>
      <div className="border border-gray-200 rounded overflow-x-auto min-w-full bg-white">
        <table className="min-w-full text-sm align-middle whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">Id</th>
              <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">Nom</th>
              <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">Créé il y a</th>
              {/*<th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-left">
              Email
            </th>*/}
              <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">Priorité</th>
              <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">Type</th>
              <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">Etat</th>
              {/*
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              Actions
            </th>*/}
            </tr>
          </thead>
          <tbody>
            {tickets.map((r) => {
              return (
                <tr className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/panel/${r.id}`)}>
                  <td className="p-3 text-center">
                    <span className="font-medium">#{setZero(r.id)}</span>
                  </td>
                  <td className="p-3 text-center">
                    <p className="font-medium">{r.userName}</p>
                    <p className="text-gray-500">{r.title || "Ancien compte"}</p>
                  </td>
                  <td className="p-3 text-center">
                    <div className={`font-medium inline-flex px-2 py-1 leading-4 text-md rounded-ful`}>{dateDiff(new Date(r.creationDate), dateNow)}</div>
                  </td>
                  <td className="p-3 text-center">
                    <div className={`font-medium inline-flex px-2 py-1 leading-4 text-md rounded-full ${colors[r.priorityColor]}`}>{r.priorityName}</div>
                  </td>
                  <td className="p-3 text-center">
                    <div className={`font-medium inline-flex px-2 py-1 leading-4 text-md rounded-ful`}>{r.projectType}</div>
                  </td>
                  <td className="p-3 text-center">
                    <div className={`font-medium inline-flex px-2 py-1 leading-4 text-md rounded-ful`}>{r.statusName}</div>
                  </td>
                  {/*
                <td className="p-3 text-center space-x-2">
                  <Link href={`/panel/admin/${r.id}`}>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center space-x-2 border font-medium focus:outline-none px-2 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                      <MoonIcon className="inline-block w-4 h-4" />
                      <span>Visualiser</span>
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 border font-medium focus:outline-none px-1 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                    <DownloadIcon className="inline-block w-4 h-4" />
                  </button>
                </td>*/}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div class="grid place-items-center mb-10">
        <div class="inline-flex mt-3">
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l rounded-r mr-2" onClick={() => nextPrevPage(-1)}>
            &lt;
          </button>
          <p class="inline-flex py-2 px-4">
            Pages&nbsp;<p class="font-bold">{actualPage + 1}</p>&nbsp;sur&nbsp;<p class="font-bold">{maxPage != 0 ? maxPage : 1}</p>
          </p>
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l rounded-r ml-2 mr-6" onClick={() => nextPrevPage(1)}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
