import LayoutPanel from "../../../../components/layoutPanel";
import NavbarAdmin from "../../../../components/navbarAdmin";
import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

const colors = {
  "PIX A1": "text-red-700 bg-red-200",
  "PIX A2": "text-yellow-700 bg-yellow-200",
  PING: "text-indigo-700 bg-indigo-200",
  FABLAB: "text-white bg-gradient-to-r from-yellow-400 to-red-500",
};

export default function AddNewsAdmin() {
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // Finish!
  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
  }

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

  const onChangeFile = (event) => {
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

  return (
    <LayoutPanel>
      <NavbarAdmin role={role} />
      <div className="max-w-3xl mx-auto mt-5 mb-5 px-3">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Nouvelle article
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Attention, cette article ne sera pas automatiquement
                  sauvegardé. Veillez à bien l'avoir valider, et même à
                  l'enregistrer sur Word par exemple avant toute publication
                  pour prévenir aux potentiels erreurs.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lien de l'article
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      fablab.fr/blog/
                    </span>
                    <input
                      type="text"
                      name="link"
                      id="link"
                      autoComplete="link"
                      className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Titre de l'article
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Super article"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Votre article
                  </label>
                  <div className="mt-1">
                    <MdEditor
                      style={{ height: "500px" }}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={handleEditorChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image de couverture
                  </label>
                  <div
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                  >
                    <div
                      className={`${
                        status ? "border-gray-800" : "border-gray-300"
                      } ${
                        percentage != 0 ? "hidden" : "block"
                      } dropzone mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md`}
                    >
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Choisir un fichier</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={onChangeFile}
                            />
                          </label>
                          <p className="pl-1">ou déposez-le</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF jusqu'à 10Mo
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* progress bar */}
                  <div
                    className={`${percentage == 0 ? "hidden" : "block mt-3"}`}
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
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Publier
              </button>
            </div>
          </div>
        </form>
      </div>
    </LayoutPanel>
  );
}
