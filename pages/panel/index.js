import Link from "next/link";
import { Fragment, useContext, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  TrashIcon,
  PlusIcon,
  CursorClickIcon,
  ExclamationCircleIcon,
  CheckIcon,
  ThumbUpIcon,
  CubeIcon
} from "@heroicons/react/solid";

import LayoutPanel from "../../components/layoutPanel";
import { fetchAPIAuth, getTimeline, parseCookies } from "../../lib/api";
import { useRouter } from 'next/router'
import Moment from "react-moment";
import { setZero } from "../../lib/function";
import { getCookie } from "cookies-next";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewPanel({ data, user }) {
  const labels = [
    { name: "En attente de validation du fichier STL", color: "bg-gray-400" },
    { name: "Impression initiée", color: "bg-yellow-400" },
    { name: "Impression terminée", color: "bg-green-500" },
    { name: "Nouveau commentaire", color: "bg-blue-500" },
    { name: "Ticket fermé", color: "bg-red-500" },
  ];
 
  const router = useRouter();
  useEffect(function () {
    if(user.error != undefined){
      router.push('/404');
    }
}, []);

const deleteTicket = async (id) =>{
  await axios({
    method: 'DELETE',
    url: 'https://api.myfab.eliasto.me/api/tickets/'+id,
    data,
    headers: {
      'Authorization': `Bearer ${getCookie('jwt')}`
    },
  });
  router.push('/panel')
}


    if(user.error == undefined){

      const timeline = getTimeline(user.tickets);
      return (
        <LayoutPanel user={user}>
          {/* Dernières activités */}
          <div className="py-6 px-3">
            <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="col-span-3">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate mb-5">
                  Vos dernières activités
                </h1>
                <nav
                  aria-label="Sidebar"
                  className="sticky top-6 divide-y divide-gray-300"
                >
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {timeline.length >0?timeline.slice(0).reverse().map((event, eventIdx) => (
                        <li key={event.id}>
                          <div className="relative pb-8">
                            {eventIdx !== timeline.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3 place-items-center text-left">

                              <div>
                              <span
                              className={classNames(
                                event.color,
                                "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                              )}
                            >
                              {(event.icon == "ThumbUpIcon") ? <ThumbUpIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              /> : (event.icon == "CursorClickIcon") ? <CursorClickIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              /> : (event.icon == "CheckIcon") ? <CheckIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              /> : (event.icon == "CubeIcon") ? <CubeIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              /> : ''}
                            </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 place-items-center">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    {event.name}{" "}
                                    <Link
                                      href={`/panel/${event.ticket}`}
                                    >
                                      <a className="font-medium text-gray-900">
                                        #{setZero(event.ticket)}
                                      </a>
                                    </Link>
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <Moment format="Do MMM" locale="fr">
                                {event.date}
                              </Moment>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      )):"Il n'y a aucune activité."}
                    </ul>
                  </div>
                </nav>
              </div>
              <hr className="mb-5 mt-5 block lg:hidden" />
              <main className="col-span-9">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  Vos demandes d'impressions 3D
                </h1>
                <div className="block mt-5">
                  <div className="sm:hidden">
                    <div className="px-4 sm:px-6">
                      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                        Ticket
                      </h2>
                    </div>
                    <ul
                      role="list"
                      className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
                    >
                      {user.tickets.slice(0).reverse().map((project) => (
                        <li key={project.id}>
                          <Link href={"/panel/"+project.id}>
                          <a
                            className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                          >
                            <span className="flex items-center truncate space-x-3">
                              <span
                                className={classNames(
                                  project.timeline[project.timeline.length-1] != null ?project.timeline[project.timeline.length-1].color:'bg-gray-500',
                                  "w-2.5 h-2.5 flex-shrink-0 rounded-full"
                                )}
                                aria-hidden="true"
                              />
                              <span className="font-medium truncate text-sm leading-6">
                              <Link href={`/panel/${project.id}`}>
                                    {"#"+setZero(project.id)}
                                    </Link>{" "}
                                <span className="truncate font-normal text-gray-500">
                                  {" "}
                                  {project.type}
                                </span>
                              </span>
                            </span>
                            <ChevronRightIcon
                              className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
    
                  {/* big projects */}
                  <div className="align-middle inline-block min-w-full border-b border-gray-200 hidden sm:block">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-t border-gray-200">
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <span className="lg:pl-2">Ticket</span>
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <span className="lg:pl-2">Dernier état</span>
                          </th>
                          <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dernière mise à jour
                          </th>
                          <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {user.tickets.slice(0).reverse().map((project) => (
                          <tr key={project.id}>
                            <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                              <div className="flex items-center space-x-3 lg:pl-2">
                                <div
                                  className={classNames(
                                    project.timeline[project.timeline.length-1] != null ?project.timeline[project.timeline.length-1].color:'bg-gray-500',
                                    "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                                  )}
                                  aria-hidden="true"
                                />
                                <a className="truncate hover:text-gray-600">
                                  <span>
                                    <Link href={`/panel/${project.id}`}>
                                    {"#"+setZero(project.id)}
                                    </Link>
                                    {" "}
                                    <span className="text-gray-500 font-normal">
                                      {" "}
                                      {project.type}
                                    </span>
                                  </span>
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              <div className="flex items-center space-x-3 lg:pl-2">
                                <a className="truncate hover:text-gray-600">
                                  <span>
                                    {project.timeline[project.timeline.length-1] == null?'En attente de la validation du fichier STL':project.timeline[project.timeline.length-1].name}
                                  </span>
                                </a>
                              </div>
                            </td>
                            <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            <Moment format="Do MMM YYYY HH:MM" locale="fr">
                            {project.updatedAt}
            </Moment>
                            </td>
                            <td className="pr-6">
                              <Menu
                                as="div"
                                className="relative flex justify-end items-center"
                              >
                                <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                  <span className="sr-only">Open options</span>
                                  <DotsVerticalIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                          onClick={()=>deleteTicket(project.id)}
                                          >
                                          <a
                                            href="#"
                                            className={classNames(
                                              active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                              "group flex items-center px-4 py-2 text-sm"
                                            )}
                                          >
                                            <TrashIcon
                                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                              aria-hidden="true"
                                            />
                                            Supprimer
                                          </a>
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <h2 className="text-sm font-medium leading-6 text-gray-900 sm:truncate">
                  Légende:
                </h2>
                {labels.map((label) => (
                  <div className="flex items-center space-x-3">
                    <div
                      className={classNames(
                        label.color,
                        "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                      )}
                      aria-hidden="true"
                    />
                    <span className="text-gray-500 font-normal">{label.name} </span>
                  </div>
                ))}
              </main>
            </div>
          </div>
        </LayoutPanel>
      )
    } else {
      return('');
    }


  
}

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req);
  var user = await fetchAPIAuth("/api/users/me/?populate=*", cookies.jwt);

  return {
    props: { user }, // will be passed to the page component as props
  }
}