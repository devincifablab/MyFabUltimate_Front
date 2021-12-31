import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import router from 'next/router'
import { useEffect, useState } from 'react'
import LayoutPanel from '../../../components/layoutPanel'
import NavbarAdmin from '../../../components/navbarAdmin'
import TablesAdmin from '../../../components/tablesAdmin'
import UserTablesAdmin from '../../../components/tablesUserAdmin'
import { fetchAPIAuth, parseCookies } from '../../../lib/api'

export default function Settings({ user, role, me }) {

    useEffect(function () {
        if (role.filter(r => r.id == 1 || r.id == 2).length < 1) {
            router.push('/404');
        }
    }, []);

    const originalUser = user;
    const [result, setResult] = useState(user);

    function update(search) {
        if (search.length > 1 && search[0] == '#') {
            setResult(user.filter(r => r.id == search.split('#')[1]));
        } else if (search.length > 1) {
            setResult(user.filter(r => r.firstName.includes(search) || r.lastName.includes(search)));
        }
        if (search.length < 1) {
            setResult(originalUser);
        }
        console.log(result);
    }


    return (
        <LayoutPanel user={me} role={role}>
            <NavbarAdmin role={role} />

            <section className="">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap -mx-4">

                        {/* Tickets à traiter */}
                        <div className="w-full md:px-6 mt-5 mb-8 lg:mb-0">
                            <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                                <div className="mb-3 grow">
                                    <div className="space-x-2">
                                        <div className="relative grow">
                                            <div className="absolute inset-y-0 left-0 w-10 my-px ml-px flex items-center justify-center pointer-events-none rounded-l text-gray-500">
                                                <svg className="hi-solid hi-search inline-block w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                                            </div>
                                            <input
                                                onChange={(e) => update(e.target.value)}
                                                className="block border placeholder-gray-400 pr-3 py-2 leading-6 w-full rounded border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 pl-10" type="text" placeholder="Rechercher un étudiant" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <UserTablesAdmin user={result} />
                        </div>

                    </div>
                </div>
            </section>
        </LayoutPanel>

    )
}

export async function getServerSideProps({ req }) {

    const cookies = parseCookies(req);
    const user = await fetchAPIAuth("/user", cookies.jwt);
    const me = await fetchAPIAuth("/user/me", cookies.jwt);
    const role = await fetchAPIAuth("/user/role", cookies.jwt);


    // Pass the data to our page via props
    return {
        props: { user, role, me }, // will be passed to the page component as props
    }
}
