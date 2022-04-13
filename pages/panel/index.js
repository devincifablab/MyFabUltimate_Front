import Link from "next/link";
import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  TrashIcon
} from "@heroicons/react/solid";
import 'moment/locale/fr'

import LayoutPanel from "../../components/layoutPanel";
import { fetchAPIAuth, parseCookies } from "../../lib/api";
import { useRouter } from 'next/router'
import Moment from "react-moment";
import { getColor, getState, setZero } from "../../lib/function";
import { getCookie } from "cookies-next";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import Seo from "../../components/seo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewPanel({ data, user, ticket, role, authorizations }) {

  const faqs = [
    {
      question: "Le fichier STL ne s'ouvre pas.",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "La demande n'est pas claire, que dois-je faire ?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "J'ai validé une impression alors que j'aurais dû la refuser.",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    // More questions...
  ]

  const router = useRouter();
  useEffect(function () {
    if (user.error != undefined) {
      router.push('/404');
    }
  }, []);

  const deleteTicket = async (id) => {
    await axios({
      method: 'DELETE',
      url: process.env.API + '/api/ticket/' + id,
      data,
      headers: {
        'dvflCookie': `${getCookie('jwt')}`
      },
    }).then(() => {
      toast.success("Le ticket #" + setZero(id) + " a été supprimé.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(() => {
      toast.error("Une erreur est survenue lors de la suppression du ticket #" + setZero(id) + ".", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    router.replace(router.asPath)
  }

  if (user.error == undefined) {

    return (
      <LayoutPanel user={user} role={role} authorizations={authorizations} titleMenu="Panel de demande d'impression 3D">
        <Seo title={"Panel"} />

        {/* Dernières activités */}
        <div className="py-6 px-3">
          <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="col-span-3">
              <nav
                aria-label="Sidebar"
                className="sticky top-6 divide-y divide-gray-300"
              >
                {/* FAQ */}
                <div className="w-full">
                  <div className="relative pb-6 bg-white rounded">
                    <div className="">
                      <h3 className="text-xl font-bold">FAQ</h3>
                      <p className="text-sm text-gray-500">Un trou de mémoire ? Vous n'êtes pas sûr de ce que vous allez faire ? Consultez d'abord cette mini FAQ avant de demander à un membre du staff.</p>
                    </div>
                    <dl className="divide-y divide-gray-200">
                      {faqs.map((faq) => (
                        <Disclosure as="div" key={faq.question} className="pt-6">
                          {({ open }) => (
                            <>
                              <dt className="text-sm">
                                <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                  <span className="font-medium text-gray-900">{faq.question}</span>
                                  <span className="ml-6 h-7 flex items-center">
                                    <ChevronDownIcon
                                      className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Disclosure.Button>
                              </dt>
                              <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                <p className="text-sm text-gray-500">{faq.answer}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </dl>
                  </div>
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
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <span className="lg:pl-2">Type de projet</span>
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dernière mise à jour
                        </th>
                        <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {ticket.map((project) => (
                        <tr key={project.id} onClick={() => router.push('/panel/' + project.id)} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center space-x-3 lg:pl-2">

                              {getColor(project.step, project.waitingAnswer) == 10 ? <span className="flex h-3 w-3">
                                <span className={classNames(
                                  project.step == 0 ? 'bg-indigo-200' : project.step == 1 ? 'bg-amber-300' : project.step == 2 ? 'bg-emerald-400' : project.step == 3 ? 'bg-emerald-600' : project.step == 4 ? 'bg-red-600' : '',
                                  "animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75"
                                )}></span>
                                <span className={classNames(
                                  project.step == 0 ? 'bg-indigo-200' : project.step == 1 ? 'bg-amber-300' : project.step == 2 ? 'bg-emerald-400' : project.step == 3 ? 'bg-emerald-600' : project.step == 4 ? 'bg-red-600' : '',
                                  "relative inline-flex rounded-full h-3 w-3"
                                )}></span>
                              </span> : <div
                                className={classNames(
                                  getColor(project.step, project.waitingAnswer) == 0 ? 'bg-indigo-200' : getColor(project.step, project.waitingAnswer) == 1 ? 'bg-amber-200' : getColor(project.step, project.waitingAnswer) == 2 ? 'bg-emerald-300' : getColor(project.step, project.waitingAnswer) == 3 ? 'bg-emerald-500' : getColor(project.step, project.waitingAnswer) == 4 ? 'bg-red-500' : '',
                                  "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                                )}
                                aria-hidden="true"
                              />}

                              <a className="truncate hover:text-gray-600">
                                <span>
                                  <Link href={`/panel/${project.id}`}>
                                    {"#" + setZero(project.id)}
                                  </Link>
                                  {" "}
                                </span>
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center space-x-3 lg:pl-2">
                              <a className="truncate hover:text-gray-600">
                                <span>
                                  {project.statusName}
                                </span>

                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center space-x-3 lg:pl-2">
                              <a className="truncate hover:text-gray-600">
                                <span>
                                  {project.projectType}
                                </span>

                              </a>
                            </div>
                          </td>
                          <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            <Moment format="Do MMM YYYY à HH:mm" locale="fr">
                              {project.modificationDate}
                            </Moment>
                          </td>
                          <td className="pr-6">
                            <Menu
                              as="div"
                              className="relative flex justify-end items-center"
                            >
                              <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
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

                                        <a
                                          onClick={() => deleteTicket(project.id)}
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "group flex items-center px-4 py-2 text-sm"
                                          )}
                                        >
                                          <TrashIcon
                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-hover:cursor-pointer"
                                            aria-hidden="true"
                                          />
                                          Supprimer
                                        </a>
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
              {/*<h2 className="text-sm font-medium leading-6 text-gray-900 sm:truncate">
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
                ))}*/}
            </main>
          </div>
        </div>
      </LayoutPanel>
    )
  } else {
    return ('');
  }
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/user/me", cookies.jwt);
  const ticket = await fetchAPIAuth("/ticket/me", cookies.jwt);
  const role = await fetchAPIAuth("/user/role", cookies.jwt);
  const authorizations = await fetchAPIAuth("/user/authorization/", cookies.jwt);

  if(user.acceptedRule == 0){
    return {
      redirect: {
        permanent: false,
        destination: "/panel/rules",
      },
      props:{},
    };  }

  return {
    props: { user, ticket, role, authorizations }, // will be passed to the page component as props
  }
}