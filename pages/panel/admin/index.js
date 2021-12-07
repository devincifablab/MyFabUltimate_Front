import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import LayoutPanel from "../../../components/layoutPanel";
import NavbarAdmin from "../../../components/navbarAdmin";
import OverviewAdmin from "../../../components/overviewAdmin";
import { fetchAPIAuth, parseCookies } from "../../../lib/api";

export default function Admin({tickets, user}) {
  const router = useRouter()

  useEffect(function () {
    if(user.error != undefined || user.flags.filter(r=> r.name == "Superviseur").length == 0){
      router.push('/404');
    }
}, []);
if(user.error == undefined && user.flags.filter(r=> r.name == "Superviseur").length != 0){
  return (
    <LayoutPanel user={user}>
      <NavbarAdmin />
      <div className="md:py-8 md:px-6">
        <div className="container px-8 md:px-16 py-8 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500">
          <h2 className="text-2xl font-bold text-white">Bonjour, {user.name} 👋{" "}</h2>
          <h3 className="text-md font-medium text-white">Il y a {tickets.filter(r => r.isDone == false).length} impression{tickets.filter(r => r.isDone == false).length>1?'s':''} à traiter. N'hésitez pas à vous en occuper !</h3>
        </div>
      </div>
      <OverviewAdmin tickets={tickets}/>
    </LayoutPanel>
  );}
  else{
    return('')
  }
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

