import { fetchAPI, fetchAPIAuth, parseCookies } from "../../../lib/api";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { Dialog } from "@headlessui/react";

import LayoutPanel from "../../../components/layoutPanel";
import NavbarAdmin from "../../../components/navbarAdmin";
import {
  CursorClickIcon,
  ExclamationCircleIcon,
  CheckIcon,
  ThumbUpIcon,
  CubeIcon,
} from "@heroicons/react/outline";
import Steps from "../../../components/steps";
import { ChevronDownIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { setCookies, getCookie, removeCookies } from 'cookies-next';
import axios from "axios";
import router from "next/router";
import Moment from "react-moment";
import STLViewer from "stl-viewer";
import { comment } from "postcss";

const items = [
  {}
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GestionTicket = ({ ticket, user }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [description, setDescription] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');


  const timelines = ticket.data.attributes.timeline;
  const comments = ticket.data.attributes.comments;
  const timeline = ticket.data.attributes.timeline.slice(0).reverse();
  const steps = [
    { id: "Etape 1", name: "Validation du fichier STL", status: ticket.data.attributes.step == 0 ? "current" : "complete" },
    { id: "Etape 2", name: "Lancement de l'impression", status: ticket.data.attributes.step == 1 ? "current" : ticket.data.attributes.step < 1 ? "notstarted" : "complete" },
    { id: "Etape 3", name: "Pièce mise à disposition", status: ticket.data.attributes.step == 2 ? "current" : ticket.data.attributes.step < 2 ? "notstarted" : "complete" },
  ];

  const buttonStep = [
    { name: "Valider le fichier STL" },
    { name: "Lancer l'impression" },
    { name: "Pièce mise à disposition" }
  ]
  const closeTicket = async (e) => {
    e.preventDefault();
    timelines.push({
      name: "Ticket fermé",
      icon: "ThumbUpIcon",
      color: "bg-red-500",
      date: Date.now()
    });
    const data = new FormData();
    const datas = {
      isDone: true,
      step: 3,
      timeline: timelines
    }
    data.append('data', JSON.stringify(datas));

    const jwt = getCookie('jwt');
    const close = await axios({
      method: 'PUT',
      url: 'https://api.myfab.eliasto.me/api/tickets/' + ticket.data.id,
      data,
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
    });
    setStatus(close);
    setAlertTitle('Succès !');
    setAlertDescription("Le ticket a bien été fermé. Merci de vous en être occupé !")
    document.getElementById('status').scrollIntoView();
    router.push('/panel/admin/' + ticket.data.id)
  }

  const validateCurrentStep = async (e) => {
    e.preventDefault();
    switch (ticket.data.attributes.step) {
      case 0:
        timelines.push({
          name: "Fichier STL validé",
          icon: "CubeIcon",
          color: "bg-blue-500",
          date: Date.now()
        });
        break;
      case 1:
        timelines.push({
          name: "Impression initiée",
          icon: "CursorClickIcon",
          color: "bg-yellow-500",
          date: Date.now()
        });
        break;
      case 2:
        timelines.push({
          name: "Pièce disponible",
          icon: "CheckIcon",
          color: "bg-green-500",
          date: Date.now()
        });
        break;
    }
    const data = new FormData();
    var datas = {
      step: ticket.data.attributes.step + 1 > 2 ? 3 : ticket.data.attributes.step + 1,
      timeline: timelines
    }
    if (ticket.data.attributes.step == 2) {
      datas = {
        ...datas,
        isDone: true
      }
    }
    data.append('data', JSON.stringify(datas));

    const jwt = getCookie('jwt');
    const send = await axios({
      method: 'PUT',
      url: 'https://api.myfab.eliasto.me/api/tickets/' + ticket.data.id,
      data,
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
    });
    setStatus(send);
    setAlertTitle('Succès !');
    setAlertDescription('Votre étape a bien été validé et enregistré.')
    document.getElementById('status').scrollIntoView();
    router.push('/panel/admin/' + ticket.data.id)
  }

  const sendComment = async (e) => {
    e.preventDefault();
    timelines.push({
      name: "Nouveau commentaire",
      icon: "CursorClickIcon",
      color: "bg-blue-500",
      date: Date.now()
    });
    comments.push({
      description: description,
      operator: user.name,
      date: Date.now()
    });
    const data = new FormData();
    const datas = {
      comments,
      timeline: timelines
    }
    data.append('data', JSON.stringify(datas));

    const jwt = getCookie('jwt');
    const close = await axios({
      method: 'PUT',
      url: 'https://api.myfab.eliasto.me/api/tickets/' + ticket.data.id,
      data,
      headers: {
        'Authorization': `Bearer ${jwt}`
      },
    });
    setStatus(close);
    setAlertTitle('Succès !');
    setAlertDescription('Votre commentaire a été correctement envoyé.')
    document.getElementById('status').scrollIntoView();
    router.push('/panel/admin/' + ticket.data.id)
  }
  return (
    <LayoutPanel user={user}>
      <div id="status"></div>
      <NavbarAdmin />
      {/* Dernières activités */}
      <div className="px-12 py-8">
        <Steps steps={steps} />
      </div>
      <div className="px-12">
        {/* Success Alert */}
        {status != null ? <div className="p-4 md:p-5 rounded text-green-700 bg-green-100 mb-5">
          <div className="flex items-center mb-2">
            <svg className="hi-solid hi-check-circle inline-block w-5 h-5 mr-3 flex-none text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <h3 className="font-semibold">{alertTitle}</h3>
          </div>
          <p className="ml-8">
            {alertDescription}
          </p>
        </div> : ''}
        {/* END Success Alert */}
      </div>
      <div className="py-6 px-3">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="col-span-3 mt-5 text-center">
            <div className=" ">
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
            <div className="space-x-2">
              {(ticket.data.attributes.step < 3 || ticket.data.attributes.isDone == false) ? <span className="mt-5 relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  onClick={(e) => validateCurrentStep(e)}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {buttonStep[ticket.data.attributes.step].name}
                </button>
                <Menu as="span" className="-ml-px relative block">
                  <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <span className="sr-only">Open options</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {items.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </span> : ''}

              <div className="text-left mt-5">
                <label
                  htmlFor="comments"
                  className="block text-sm font-medium text-gray-700"
                >
                  Soumettre un commentaire
                </label>
                <div className="mt-1">
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="comments"
                    id="comments"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Bonjour, ton fichier n'est pas valide."
                  />
                </div>
              </div>
              <div className="inline-flex space-x-2">
                <button
                  onClick={(e) => sendComment(e)}
                  type="button"
                  className="mt-5 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Envoyer le commentaire
                </button>
              </div>
            </div>
          </div>

          <hr className="mb-5 mt-5 block lg:hidden" />
          <main className="col-span-9">
            <div className="px-4 mb-5">
             
      {comments.length >0?<div className="p-4 md:p-5 rounded text-blue-700 bg-blue-100">
        <div className="flex items-center mb-2">
          <InformationCircleIcon className="inline-block w-5 h-5 mr-3 flex-none text-blue-500" />
          <h3 className="font-semibold">Commentaire(s) sur le ticket: </h3>
        </div>
         <div className="space-y-5">
           {/* Card */}
           {comments.slice(0).reverse().map(r=>{
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
      </div>:''}
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">

              <div className="px-4 py-5 sm:px-6 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Détails de la demande d'impression
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Ticket n° {ticket.data.id}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  {ticket.data.attributes.isDone == false ? <button
                    type="button"
                    onClick={(e) => closeTicket(e)}
                    className="text-right mt-5 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <ExclamationCircleIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Fermer le ticket
                  </button> : ''}
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Nom et prénom
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {ticket.data.attributes.user.data.attributes.name + " " + (ticket.data.attributes.user.data.attributes.surname).toString().toUpperCase()}
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
                      {ticket.data.attributes.type}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Adresse e-mail
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {ticket.data.attributes.user.data.attributes.email}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Commentaires
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {ticket.data.attributes.description}
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
                        {ticket.data.attributes.stl.data.map(r => {
                          return (<div>
                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <CubeIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 flex-1 w-0 truncate">
                                {r.attributes.name}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={"https://api.myfab.eliasto.me" + r.attributes.url}
                                download={r.attributes.name}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Télécharger
                              </a>
                            </div>
                          </li>
                          <STLViewer
	width={300}
	height={200}
	modelColor='#B92C2C'
	backgroundColor='#FFFFFF'
	rotate={true}
	orbitControls={true}
  model={"https://api.myfab.eliasto.me" + r.attributes.url}
  lightColor= '#ffffff'
  lights={[1,1,1]}
/>
                          </div>)
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
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Fichier STL validé
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Vous pouvez désormais lancer l'impression de la pièce
                        dès qu'une imprimante sera disponible.
                      </p>
                    </div>
                  </div>
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



export async function getServerSideProps({ params, req }) {
  const cookies = parseCookies(req);
  const tickets = await fetchAPIAuth(`/api/tickets/${params.id}/?populate=*`, cookies.jwt);
  const user = await fetchAPIAuth("/api/users/me/?populate=*", cookies.jwt);

  if (tickets.error != undefined) {
    return {
      notFound: true,
    };
  }
  return {
    props: { ticket: tickets, user },
  };
}

export default GestionTicket;
