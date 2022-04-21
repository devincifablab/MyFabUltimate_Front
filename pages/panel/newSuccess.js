import Link from "next/link";
import React from "react";
import LayoutPanel from "../../components/layoutPanel";
import { fetchAPIAuth, parseCookies } from "../../lib/api";
import { setZero, isUserConnected } from "../../lib/function";
import Seo from "../../components/seo";
import { toast } from "react-toastify";

export default function NewPanel({ user, role, ticket, file, authorizations, inviteLink}) {
  const inviteAvaible = (inviteLink.error == null);
  const ticketLink = "/panel/" + ticket.id;
  return (
    <LayoutPanel user={user} role={role} authorizations={authorizations} titleMenu="Récapitulatif de la demande">
      <Seo title={"Nouvelle demande créé"} />

      <div className="py-6 px-3">
        <div className="mx-auto sm:px-6 lg:px-8 lg:gap-8">

          <main className="col-span-9">
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full lg:w-2/3 px-4">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      La demande {"#" + setZero(ticket.id)} à été créé
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <p className="p-5">Les membres du DeVinci FabLab traiteons la demande le dès que possible. Vous pouvez suivre l'avancé de la demande sur cette plateforme ou sur le discord.</p>
                    <div className="flex justify-center">
                      { inviteAvaible ? (<Link href={inviteLink.result ? inviteLink.result : ""} passHref rel="noopener noreferrer">
                        <a target="_blank">
                          <button
                            type="button"
                            className={`order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:order-1 sm:ml-3`}>
                            Rejoindre le serveur discord
                          </button>
                        </a>
                      </Link>):(<button
                          type="button"
                          onClick={()=>{
                            toast.error("L'invitation à discord n'est pas disponible pour le moment. Veillez réessayer plus tard.", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          }}
                          className={`order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:order-1 sm:ml-3`}>
                          Rejoindre le serveur discord
                        </button>)}
                    </div>
                    <p className="p-5">Après avoir rejoint le discord, n'oubliez pas de lier votre compte MyFab à Discord, pour avoir accès au demande sur le serveur. 😉</p>
                    <div className="flex justify-center">
                      <Link href={ticketLink}>
                        <button
                          type="button"
                          className={`order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:order-1 sm:ml-3`}>
                          Continuer
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/3 px-4 space-y-4">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Détails de la demande d'impression
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Ticket n° {ticket.id}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Utilisateur</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            <div>
                              {user.firstName + " " + (user.lastName).toString().toUpperCase()}
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                {user.title || "Ancien compte"}
                              </p>
                            </div>
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Numéro de groupe</dt>                          
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            { ticket.groupNumber }
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Type</dt>                          
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            <div>
                              { ticket.projectType }
                            </div>
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            <div>
                              { ticket.statusName }
                            </div>
                          </dd>
                        </div>
                        { authorizations.myFabAgent ? (<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Priorité</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className={`font-medium inline-flex px-2 py-1 leading-4 text-md rounded-full`}>
                              {ticket.priorityName}
                            </div>
                          </dd>
                        </div>) : ""}
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Fichiers</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                            <div>
                              Ce ticket comporte {file.length} fichier{file.length > 1 ? "s" : ""} :
                                {file.map(r => {
                                return (<p className="mt-1 max-w-2xl text-sm text-gray-500">- {r.filename}</p>
                                  )
                                })}
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </LayoutPanel>
  );
}

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/user/me", cookies.jwt);
  const resUserConnected = isUserConnected(user);
  if(resUserConnected) return resUserConnected;
  const idTicket = req["__NEXT_INIT_QUERY"].id;
  const ticket = await fetchAPIAuth("/ticket/" + idTicket, cookies.jwt);
  const file = await fetchAPIAuth("/ticket/" + idTicket + "/file", cookies.jwt);
  const inviteLink = await fetchAPIAuth("/user/discord/serverInvite/");

  const role = await fetchAPIAuth("/user/role", cookies.jwt);
  const authorizations = await fetchAPIAuth("/user/authorization/", cookies.jwt);

  return {
    props: { user, role, ticket, file, authorizations, inviteLink }, // will be passed to the page component as props
  }
}
