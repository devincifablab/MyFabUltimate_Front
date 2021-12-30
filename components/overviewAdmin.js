import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import TablesAdmin from './tablesAdmin'
import Link from 'next/link'

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function OverviewAdmin({tickets}) {
  return (
    <section className="">
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap -mx-4">

          {/* Tickets à traiter */}
        <div className="w-full lg:w-2/3 md:px-6 mt-5 mb-8 lg:mb-0">
          {tickets.filter(r => r.step <3).length >0?<TablesAdmin tickets={tickets} isDone={true}/>:
          <div className="p-4 md:p-5 rounded flex justify-between text-gray-700 bg-gray-100">
            <p>
              Il n'y a aucun ticket à traiter. Vous pouvez accéder à l'historique des tickets déjà traités en cliquant sur le bouton suivant.
            </p>
            <Link href="/panel/admin/history"><a className="inline-flex items-center space-x-1 font-semibold ml-2 text-indigo-600 hover:text-indigo-400" >
              <span>Accéder à l'historique</span>
              <svg className="hi-solid hi-arrow-right inline-block w-4 h-4" fillName="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </a>
            </Link>
          </div>
          }
        </div>

        {/* FAQ */}
        <div className="w-full lg:w-1/3 px-4">
          <div className="relative px-6 pb-6 py-4 bg-white rounded">
            <div className="">
              <h3 className="text-xl font-bold" data-config-id="header2">FAQ</h3>
              <p className="text-sm text-gray-500" data-config-id="desc02">Un trou de mémoire ? Vous n'êtes pas sûr de ce que vous allez faire ? Consultez d'abord cette mini FAQ avant de demander à un membre du staff.</p>
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
      </div>
    </div>
  </section>
  )
}
