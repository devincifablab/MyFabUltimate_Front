import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LayoutPanel from "../../../components/layoutPanel";
import NavbarAdmin from "../../../components/navbarAdmin";
import OverviewAdmin from "../../../components/overviewAdmin";
import OverviewSTLAdmin from "../../../components/overviewSTLAdmin";
import { fetchAPIAuth, parseCookies } from "../../../lib/api";

export default function Admin({ tickets, user, role }) {
  const router = useRouter()

  const [toggle, setToggle] = useState(true);

  useEffect(function () {
    if (user.error != undefined || role.length == 0) {
      router.push('/404');
    }
  }, []);
  if (user.error == undefined && role.length != 0) {
    return (
      <LayoutPanel user={user} role={role}>
        <NavbarAdmin />
        <div className="md:py-8 md:px-6">
          <div className="container px-8 md:px-16 py-8 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500">
            <h2 className="text-2xl font-bold text-white">Bonjour, {user.firstName} 👋{" "}</h2>
            <h3 className="text-md font-medium text-white">Il y a {tickets.filter(r => r.step < 3).length} impression{tickets.filter(r => r.step < 3).length > 1 ? 's' : ''} à traiter. N'hésitez pas à vous en occuper !</h3>
          </div>
        </div>
        <div>

        </div>
        {toggle?<OverviewAdmin tickets={tickets} />:<OverviewSTLAdmin tickets={tickets} />}
      </LayoutPanel>
    );
  }
  else {
    return ('')
  }
}

export async function getServerSideProps({ req }) {

  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/user/me", cookies.jwt);
  const tickets = await fetchAPIAuth("/ticket", cookies.jwt);
  const role = await fetchAPIAuth("/user/role", cookies.jwt);

  return {
    props: { tickets, user, role }, // will be passed to the page component as props
  }
}

