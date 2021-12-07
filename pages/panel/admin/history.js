import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import LayoutPanel from '../../../components/layoutPanel'
import NavbarAdmin from '../../../components/navbarAdmin'
import TablesAdmin from '../../../components/tablesAdmin'
import { fetchAPIAuth, parseCookies } from '../../../lib/api'

export default function OverviewAdmin({tickets, user}) {
  return (
    <LayoutPanel user={user}>
    <NavbarAdmin />

    <section className="">
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap -mx-4">

          {/* Tickets à traiter */}
        <div className="w-full md:px-6 mt-5 mb-8 lg:mb-0">
          <TablesAdmin tickets={tickets} isDone={false}/>
        </div>

      </div>
    </div>
  </section>
  </LayoutPanel>

  )
}

export async function getServerSideProps({req}) {

    const cookies = parseCookies(req);
    const tickets = await fetchAPIAuth("/api/tickets", cookies.jwt);
    const user = await fetchAPIAuth("/api/users/me/?populate=*", cookies.jwt);

    // Pass the data to our page via props
    return {
      props: { tickets, user }, // will be passed to the page component as props
    }
  }
  