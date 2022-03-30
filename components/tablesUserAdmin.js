import { MoonIcon } from "@heroicons/react/outline";
import { setZero } from "../lib/function";

export default function UserTablesAdmin({ user, id }) {
  if(user.error) user = [];
  return (
    <div className="border border-gray-200 rounded overflow-x-auto min-w-full bg-white">
      <table className="min-w-full text-sm align-middle whitespace-nowrap">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              Id
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              Prénom
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              Nom
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              E-mail
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-medium text-sm tracking-wider uppercase text-center">
              Ecole et année
            </th>
          </tr>
        </thead>
        <tbody>
          {user.map((r) => {
            return (
              <tr className="border-b border-gray-200 hover:bg-gray-50" onClick={() => { id(r.id) }}>
                <td className="p-3 text-center">
                  <span className="font-medium">#{setZero(r.id)}</span>
                </td>
                <td className="p-3 text-center">
                  <p className="font-medium">{r.firstName}</p>
                </td>
                <td className="p-3 text-center">
                  <div
                    className={`font-medium inline-flex leading-4 rounded-full uppercase`}>
                    {r.lastName}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div
                    className={`font-medium inline-flex py-1 leading-4 rounded-full`}>
                    {r.email}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div
                    className={`font-medium inline-flex py-1 leading-4 rounded-full`}>
                    {r.title ? r.title : "Ancien compte"}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
