import React from "react";
import { useState } from "react";
import { CubeIcon } from "@heroicons/react/solid";
import LayoutPanel from "../../components/layoutPanel";
import { fetchAPIAuth, parseCookies } from "../../lib/api";

export default function NewPanel({user}) {
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState(false);
  const [name, setName] = useState(null);
  const [realName, setRealName] = useState(null);

  const onDragEnter = (event) => {
    setStatus(true);
    event.preventDefault();
  };

  const onDragOver = (event) => {
    setStatus(true);
    event.preventDefault();
  };

  const onDragLeave = (event) => {
    setStatus(false);
    event.preventDefault();
  };

  const onChange = (event) => {
    {
      /* const supportedFilesTypes = ['model/stl']; */
    }
    const { type } = event.target.files[0];
    {
      /*if (supportedFilesTypes.indexOf(type) > -1) {*/
    }
    // Begin Reading File
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    setRealName(event.target.files[0].name);
    // Create Form Data
    const payload = new FormData();
    payload.append("file", event.target.files[0]);
    // XHR - New XHR Request
    const xhr = new XMLHttpRequest();
    setStatus(false);
    // XHR - Upload Progress
    xhr.upload.onprogress = (e) => {
      const done = e.position || e.loaded;
      const total = e.totalSize || e.total;
      const perc = Math.floor((done / total) * 1000) / 10;
      setPercentage(perc);
    };
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        setName(JSON.parse(xhr.response).file);
      }
    };

    // XHR - Make Request
    xhr.open("POST", "http://localhost:5000/upload");
    xhr.send(payload);
    {
      /*}*/
    }
    event.preventDefault();
  };

  const onDrop = (event) => {
    {
      /* const supportedFilesTypes = ['model/stl']; */
    }
    const { type } = event.dataTransfer.files[0];
    {
      /*if (supportedFilesTypes.indexOf(type) > -1) {*/
    }
    // Begin Reading File
    const reader = new FileReader();
    reader.readAsDataURL(event.dataTransfer.files[0]);
    // Create Form Data
    const payload = new FormData();
    payload.append("file", event.dataTransfer.files[0]);
    setRealName(event.dataTransfer.files[0].name);

    // XHR - New XHR Request
    const xhr = new XMLHttpRequest();
    setStatus(false);
    // XHR - Upload Progress
    xhr.upload.onprogress = (e) => {
      const done = e.position || e.loaded;
      const total = e.totalSize || e.total;
      const perc = Math.floor((done / total) * 1000) / 10;
      setPercentage(perc);
    };
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        setName(JSON.parse(xhr.response).file);
      }
    };

    // XHR - Make Request
    xhr.open("POST", "http://localhost:5000/upload");
    xhr.send(payload);
    {
      /*}*/
    }
    event.preventDefault();
  };

  handleSubmit = (e) =>{
    e.preventDefault();
    console.log("submitted");

  }

  handleChange = (e) =>{
    console.log(e.target.files);

  }

  return (
    <LayoutPanel user={user}>
      <div className="px-10 py-10">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Informations
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Ces informations permettront de traiter aux mieux votre
                  impression. Merci de les remplir correctement.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={this.handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Commentaires
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Bonjour, pourriez-vous l'imprimer avec du PLA lila ? Merci."
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Description détaillée de la demande d'impression du
                        fichier.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Type de projet
                      </label>
                      <select
                        id="location"
                        name="location"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        defaultValue="Canada"
                      >
                        <option>PIX 1</option>
                        <option>PIX 2</option>
                        <option>PING</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        N° de groupe
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="64"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Fichier STL
                      </label>
                      <div
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                      >
                        <div
                          className={`${status ? "border-gray-800" : "border-gray-300"
                            } ${percentage != 0 ? "hidden" : "block"
                            } dropzone mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md`}
                        >
                          <div className="space-y-1 text-center">
                            <CubeIcon
                              className={`mx-auto h-12 w-12 ${status ? "text-indigo-700" : "text-gray-400"
                                }`}
                            />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Choisir un fichier</span>
                                <input
                                  onChange={onChange}
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1 hidden md:block">
                                ou déposez-le
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">
                              STL jusqu'à 64MB
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* progress bar */}
                      <div
                        className={`${percentage == 0 ? "hidden" : "block mt-3"
                          }`}
                      >
                        <p className="text-md font-semibold text-gray-700">
                          {realName}
                        </p>
                        <div className="flex items-center w-full h-5 bg-indigo-100 rounded-lg overflow-hidden">
                          <div
                            role="progressbar"
                            aria-valuenow={percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="flex items-center justify-center self-stretch transition-all duration-500 ease-out bg-indigo-500 text-white text-sm font-semibold"
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage}%
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPercentage(0);
                          }}
                          class="mt-3 inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200"
                        >
                          Supprimer le fichier
                        </button>
                      </div>

                      <div className="text-center mt-5"></div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Valider et envoyer mon fichier
                </button>
              </div>
              </form>
              
            </div>

          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        {/*<div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Recevez des notifications dès que votre fichier STL a été
                  approuvé, quand son impression est terminée ou encore quand il
                  a été déposé dans un casier.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <div>
                        <legend className="text-base font-medium text-gray-900">
                          Type de notification
                        </legend>
                        <p className="text-sm text-gray-500">
                          Recevez des notifications par SMS ou e-mail, comme
                          pour votre colis chronopost.
                        </p>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Par e-mail
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Par SMS
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="both"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="both"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            SMS et e-mail
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="push-nothing"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Aucune notification
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Valider et envoyer mon fichier
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>*/}
      </div>
    </LayoutPanel>
  );
}

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/api/users/me/?populate=*", cookies.jwt);

  return {
    props: { user }, // will be passed to the page component as props
  }
}