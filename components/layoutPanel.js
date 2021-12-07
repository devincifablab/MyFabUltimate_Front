import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { HomeIcon, MenuAlt1Icon, XIcon, BeakerIcon, CubeIcon } from "@heroicons/react/outline";
import { SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { fetchAPIAuth, parseCookies } from "../lib/api";
import { removeCookies } from "cookies-next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function LayoutPanel({ children, user }) {
  const router = useRouter();
  const pn = router.pathname;  
  const navigation = [
    { name: "Panel", href: "/panel", icon: HomeIcon, current: pn.split('/')[2] === undefined, show:true },
    { name: "Zone d'administration", href: "/panel/admin", icon: BeakerIcon, current: pn.split('/')[2] == "admin", show: user.flags.filter(r=> r.name == "Superviseur").length>0 },
    { name: "Retourner au site", href: "/", icon: CubeIcon, current: false, show: true },
  ];

  useEffect(function () {
    if( user.flags.filter(r=> r.name == "Superviseur").length == 0 && pn.split('/')[2] == "admin"){
      router.push('/404');
    }
}, []);
if( user.flags.filter(r=> r.name == "Superviseur").length == 0 && pn.split('/')[2] == "admin"){
  return('');}

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const name =  user.name;
  const surname =  user.surname;

  return (
    <div className="relative h-screen flex overflow-hidden bg-white">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://www.devinci.fr/wordpress/wp-content/uploads/2014/10/devincifablab2.jpg"
                  alt="Fablab"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation.map((item) => {
                      if(item.show == true){
                        return(<Link href={item.href}>
                          <a
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>)
                      }
                    }
                    )}
                  </div>
                </nav>
              </div>
              <span className="text-xs text-gray-400 text-center">version 0.1</span>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
          <div className="flex items-center flex-shrink-0 px-6">
            <img
              className="h-8 w-auto"
              src='/logo.png'
              alt="Fablab"
            />
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <Menu
              as="div"
              className="px-3 mt-6 relative inline-block text-left"
            >
              <div>
                <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  <span className="flex w-full justify-between items-center">
                    <span className="flex min-w-0 items-center justify-between space-x-3">

                      <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500">
      {name[0].toString().toUpperCase()+" "+surname[0].toString().toUpperCase()}
    </div>
                      <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-gray-900 text-sm font-medium truncate">
                          {name+" "+surname.toUpperCase()}
                        </span>
                        <span className="text-gray-500 text-sm truncate">
                          ESILV A2
                        </span>
                      </span>
                    </span>
                    <SelectorIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="mt-3 space-x-1 space-y-1 text-center">
                  { user.flags.map(r=>{
                    return(
                      <span className={classNames(r.class,"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ")}>
        {r.name}
      </span>
                    )
                  })}
                   

                  </div>

                </Menu.Button>
                
              </div>
              
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <button
                          onClick={()=>{removeCookies('jwt'); router.push('/')}}
                          >Se déconnecter</button>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                {navigation.map((item) => {
                  if(item.show == true){
                    return(<Link href={item.href}>
                      <a
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>)
                  }
                })}
              </div>
            </nav>
          </div>
          <span className="text-xs text-gray-400 text-center">version 0.1</span>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex"></div>
            <div className="flex items-center">
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    <span className="sr-only">Open user menu</span>
                    <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500">
      {name[0].toString().toUpperCase()+" "+surname[0].toString().toUpperCase()}
    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <button
                          onClick={()=>{removeCookies('jwt'); router.push('/')}}
                          >Se déconnecter</button>
                        </a>
                          
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                Panel de demande d'impression 3D
              </h1>
            </div>
            <div className="mt-4 flex sm:mt-0 sm:ml-4">
              <Link href="/panel/new">
                <button
                  type="button"
                  className={`${pn.split('/')[2] == "new"? 'hidden': 'block'} order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3`}
                >
                  <CubeIcon width="16" height="16" className="mr-1" />
                  Lancer une impression
                </button>
              </Link>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}