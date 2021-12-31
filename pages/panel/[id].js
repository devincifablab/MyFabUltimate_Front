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
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/solid";
import STLViewer from 'stl-viewer'
import { Dialog, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GestionTicket = ({ params, user, role, ticket, file, message }) => {
  const [open, setOpen] = useState(false);
  const [urlStl, setUrlStl] = useState('');
  const [comment, setComment] = useState('');
  const[response, setResponse] = useState(null);
  const [responseError, setResponseError] = useState(false);

  const router = useRouter();

  const steps = [
    { id: "Etape 1", name: "Validation du fichier STL", status: ticket.step == 0 ? "current" : "complete" },
    { id: "Etape 2", name: "Lancement de l'impression", status: ticket.step == 1 ? "current" : ticket.step < 1 ? "notstarted" : "complete" },
    { id: "Etape 3", name: "Pièce mise à disposition", status: ticket.step == 2 ? "current" : ticket.step < 2 ? "notstarted" : "complete" },
  ];

  async function download(id, name) {
    const cookie = getCookie("jwt");
    await axios({
      method: 'GET',
      responseType: 'blob',
      url: process.env.API+'/api/file/' + id,
      headers: {
        'dvflCookie': cookie
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  async function sendComment(e) {
    e.preventDefault();
    const cookie = getCookie("jwt");
    await axios({
      method: 'PUT',
      url: process.env.API+'/api/ticket/' + params.id+'/setWaitingAnswer/0',
      headers: {
        'dvflCookie': cookie
      },
    });
    await axios({
      method: 'POST',
      url: process.env.API+'/api/ticket/' + params.id+'/message',
      data: {
        content: comment
      },
      headers: {
        'dvflCookie': cookie
      },
    }).then((response) => {
      setResponse(response);
      setResponseError(false);
    }).catch((e)=>{
      setResponse(e);
      setResponseError(true);
    })
    document.getElementById('status').scrollIntoView();
    router.replace(router.asPath);
  }

  async function getUrlSTL(id, name) {
    const cookie = getCookie("jwt");
    await axios({
      method: 'GET',
      responseType: 'blob',
      url: process.env.API+'/api/file/' + id,
      headers: {
        'dvflCookie': cookie
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setUrlStl(url);
    });
  }

  var timeline = [];

  return (
    <LayoutPanel user={user} role={role}>
      {/* Dernières activités */}
      <div id="status" className="px-12 py-8">
        <Steps steps={steps} />
      </div>
      <div className="py-6 px-3">
        <div className="mx-auto sm:px-6 lg:px-8 lg:gap-8">

          <main className="col-span-9">

             {/* Success Alert */}
      {response != null?<div className={`p-4 mb-5 md:p-5 rounded ${responseError?'text-red-700':'text-green-700'} ${responseError?'bg-red-100':'bg-green-100'}`}>
        <div className="flex items-center mb-2">
{responseError?          <ExclamationCircleIcon className={`inline-block w-5 h-5 mr-3 flex-none text-red-500`}/>:
          <CheckCircleIcon className={`inline-block w-5 h-5 mr-3 flex-none text-green-500`}/>
}
          <h3 className="font-semibold">{responseError?'Une erreur est survenue.':'Votre commentaire a été envoyé !'}</h3>
        </div>
        <p className="ml-8">
        {responseError?"Votre commentaire n'a pas pu être envoyé. Si le problème persiste, merci de contacter directement le FabLab.":"Vous recevrez une réponse dès que notre équipe aura traité votre demande."}
        </p>
      </div>:''}
      {/* END Success Alert */}

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
                      {user.firstName + " " + (user.lastName).toString().toUpperCase()}
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
                      {ticket.projectType}
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
                      Fichier(s) stl
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul
                        role="list"
                        className="border border-gray-200 rounded-md divide-y divide-gray-200"
                      >
                        {file.map(r => {
                          return (<div>
                            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <CubeIcon
                                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-2 flex-1 w-0 truncate">
                                  {r.filename}
                                </span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button
                                  onClick={() => download(r.id, r.filename)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Télécharger
                                </button>

                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button onClick={() => { setOpen(true); getUrlSTL(r.id) }}>
                                  Voir le fichier STL
                                </button>
                              </div>
                            </li>
                            {r.comment.length >2?<div className="pl-3 pr-4 flex mb-3 items-center justify-between text-sm">
                              <p><span className="font-medium">Commentaire sur le fichier</span>: {r.comment}</p>
                            </div>:''}
                          </div>
                          )
                        })}
                      </ul>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Commentaires
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul role="list" className="divide-y divide-gray-200">
                        {message.map((r) => (
                          <li
                            key={r.id}
                            className="relative bg-white py-5 px-4 hover:bg-gray-50"
                          >
                            <div className="flex justify-between space-x-3">
                              <div className="min-w-0 flex-1">
                                <a href="#" className="block focus:outline-none">
                                  <span className="absolute inset-0" aria-hidden="true" />
                                  <p className="text-sm font-medium text-gray-900 truncate">{r.userName}</p>
                                  <p className="text-sm text-gray-500 truncate">{r.subject}</p>
                                </a>
                              </div>
                              <Moment format="Do MMM YYYY à HH:mm" locale="fr">
                                {r.creationDate}
                              </Moment>
                            </div>
                            <div className="mt-1">
                              <p className="line-clamp-2 text-sm text-gray-600">{r.content}</p>
                            </div>
                          </li>
                        ))}
                        <div>
                        <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  onChange={(e)=>setComment(e.target.value)}
                  className="mt-5 max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                />
                <button
                onClick={(e)=>{document.getElementById("comment").value = ''; sendComment(e)}}
                className="mt-3 inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700"
                >
                  Envoyer mon commentaire
                </button>
                <p className="mt-2 text-sm text-gray-500">Vous pouvez communiquer avec les membres du FabLab via ce formulaire.</p>

                        </div>
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
                  <p className="text-center font-medium">Aperçu du fichier STL:</p>
                  <center>
                    <STLViewer
                      width={300}
                      height={200}
                      modelColor='#4930b8'
                      backgroundColor='#FFFFFF'
                      rotate={true}
                      orbitControls={true}
                      model={urlStl}
                      lightColor='#ffffff'
                      lights={[1, 1, 1]}
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

export async function getServerSideProps({ req, params }) {
  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/user/me", cookies.jwt);
  const role = await fetchAPIAuth("/user/role", cookies.jwt);
  const ticket = await fetchAPIAuth("/ticket/" + params.id, cookies.jwt);
  const file = await fetchAPIAuth("/ticket/" + params.id + "/file", cookies.jwt);
  const message = await fetchAPIAuth("/ticket/" + params.id + "/message", cookies.jwt);

  return {
    props: { user, params, role, ticket, file, message }, // will be passed to the page component as props
  }
}

export default GestionTicket;
