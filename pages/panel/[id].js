import { fetchAPIAuth, parseCookies } from "../../lib/api";
import LayoutPanel from "../../components/layoutPanel";
import {
  CursorClickIcon,
  CheckIcon,
  ThumbUpIcon,
  CubeIcon,
} from "@heroicons/react/outline";
import Steps from "../../components/steps";
import { Fragment, useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import { InformationCircleIcon } from "@heroicons/react/solid";
import STLViewer from 'stl-viewer'
import { Dialog, Transition } from "@headlessui/react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GestionTicket = ({ params, user }) => {
  const [open, setOpen] = useState(false);
  const [urlStl, setUrlStl] = useState('');

  const ticket = user.tickets.find(r => r.id == params.id);
  const steps = [
    { id: "Etape 1", name: "Validation du fichier STL", status: ticket.step == 0 ? "current" : "complete" },
    { id: "Etape 2", name: "Lancement de l'impression", status: ticket.step == 1 ? "current" : ticket.step < 1 ? "notstarted" : "complete" },
    { id: "Etape 3", name: "Pièce mise à disposition", status: ticket.step == 2 ? "current" : ticket.step < 2 ? "notstarted" : "complete" },
  ];

  var timeline = ticket.timeline.slice(0).reverse();
  if(timeline.length>5){
    timeline = timeline.slice(0,5);
  }

  return (
    <LayoutPanel user={user}>
      {/* Dernières activités */}
      <div className="px-12 py-8">
        <Steps steps={steps} />
      </div>
      <div className="py-6 px-3">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="col-span-3 mt-5 text-center">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate mb-5">
              Activités du ticket
            </h1>

            <nav
              aria-label="Sidebar"
              className="sticky top-6 divide-y divide-gray-300"
            >
              <div className="flow-root">
                <ul role="list" className="-mb-8">
                  {timeline.map((event, eventIdx) => (
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
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <Moment format="Do MMM HH:mm" locale="fr">
                                {event.date}
                              </Moment>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <hr className="mb-5 mt-5 block lg:hidden" />
          <main className="col-span-9">

          {ticket.comments.length >0?<div className="mb-5">
             
             <div className="p-4 md:p-5 rounded text-blue-700 bg-blue-100">
               <div className="flex items-center mb-2">
                 <InformationCircleIcon className="inline-block w-5 h-5 mr-3 flex-none text-blue-500" />
                 <h3 className="font-semibold">Commentaire(s) sur votre ticket: </h3>
               </div>
                <div className="space-y-5">
                  {/* Card */}
                {ticket.comments.slice(0).reverse().map(r=>{
                  return(<div className="flex flex-col rounded bg-blue-50 p-3 overflow-hidden">
                  <div className="py-2 flex-grow w-full">
                    <div className="flex space-x-4">
                      <div className="flex-grow text-sm">
                        <p className="mb-1">
                          <span href="" className="font-semibold text-indigo-600 hover:text-indigo-400">{r.operator} - FabLab </span>
                          {r.description}
                        </p>
                        <p class="space-x-2">
                          <p class="text-gray-500 hover:text-gray-400">
                          <Moment format="Do MMM YYYY HH:MM" locale="fr">
              {r.date}
            </Moment>
                          </p>
  
                        </p>
                      </div>
                    </div>
                  </div>
                </div>)
                })}
                     
                     {/* END Card */}
                </div>
             </div>
          </div>:''}

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
                    <dt className="text-sm font-medium text-gray-500">
                      Nom et prénom
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.name + " " + (user.surname).toString().toUpperCase()}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Ecole et année
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      ESILV A2
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {ticket.type}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Adresse e-mail
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Commentaires
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {ticket.description}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Fichier(s) stl
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul
                        role="list"
                        className="border border-gray-200 rounded-md divide-y divide-gray-200"
                      >
                        {ticket.stl.map(r => {
                          return (<div>
                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <CubeIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 flex-1 w-0 truncate">
                                {r.name}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={"https://api.myfab.eliasto.me" + r.url}
                                download={r.name}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Télécharger
                              </a>
                              
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <button onClick={()=>{setOpen(true); setUrlStl(r.url)}}>
                                Voir le fichier STL
                              </button>
                            </div>
                          </li>
                          </div>
                          )
                        })}
                      </ul>
                    </dd>
                  </div>
                
                </dl>
              </div>
              
            </div>
          </main>
        </div>
      </div>

      {/* modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <p className="text-center font-medium">Apperçu du fichier STL:</p>
                <center>
                <STLViewer
	width={300}
	height={200}
	modelColor='#B92C2C'
	backgroundColor='#FFFFFF'
	rotate={true}
	orbitControls={true}
  model={"https://api.myfab.eliasto.me" + urlStl}
  lightColor= '#ffffff'
  lights={[1,1,1]}
/>
                </center>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Retourner au ticket
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      
    </LayoutPanel>
  );
};

export async function getServerSideProps({req, params}) {
  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/api/users/me/?populate=*", cookies.jwt);

  return {
    props: { user, params }, // will be passed to the page component as props
  }
}

export default GestionTicket;
