import Link from "next/link";
import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  TrashIcon
} from "@heroicons/react/solid";
import 'moment/locale/fr'

import LayoutPanel from "../../components/layoutPanel";
import { fetchAPIAuth, parseCookies } from "../../lib/api";
import { useRouter } from 'next/router'
import Moment from "react-moment";
import { getColor, getState, setZero } from "../../lib/function";
import { getCookie } from "cookies-next";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import Seo from "../../components/seo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Rules() {

  return(
      <div className="flex h-screen bg-gray-50">
        <div className="max-w-3xl m-auto text-center space-y-3 ">
          <h1 className="font-semibold leading-6 text-xl">Avant d'accéder à MyFab, vous devez accepter notre règlement.</h1>
          <p className="font-light text-md text-gray-500">L'utilisation de MyFab étant réglementer, l'acceptation de ces règles est obligatoire. Vous pouvez à tout moment nous contacter à fablab@devinci.fr si vous souhaitez faire valoir vos droits.</p>
          
          <div className="prose max-w-xl overflow-y-auto h-56 m-auto p-5 shadow-sm block w-full ring-indigo-500 border-indigo-500 sm:text-sm border rounded-md">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet laoreet pulvinar. Pellentesque varius mauris lectus, ac accumsan quam maximus eget. Mauris quam lorem, commodo a dui eu, semper tristique sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus dolor eget nisi pharetra, et suscipit sapien hendrerit. Fusce consequat arcu velit, ullamcorper elementum tortor ultrices et. Vestibulum a varius turpis, in auctor eros. Donec metus tortor, porttitor id sagittis non, euismod eu ex. Nunc imperdiet tempus magna ut scelerisque.

Fusce sed enim ac lacus laoreet pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla volutpat porttitor interdum. In placerat pulvinar mollis. Sed at luctus ante, et venenatis ante. Suspendisse potenti. Pellentesque tempus lorem eget sem ultrices imperdiet.

Integer laoreet tristique lectus, id viverra mauris rhoncus sed. Aliquam erat volutpat. Nulla lacinia sapien a fermentum consectetur. Vestibulum luctus nibh arcu, eu sodales tellus accumsan at. Donec tincidunt diam ut efficitur sodales. Curabitur id ullamcorper elit. Phasellus faucibus tincidunt odio id tincidunt. Suspendisse a augue lacinia, feugiat elit ut, finibus turpis.

Donec aliquam finibus ex at pellentesque. Sed nec pretium leo, vel sodales nibh. Praesent pulvinar non nulla id maximus. Duis eget ultrices arcu, ut mollis mauris. Aenean turpis sapien, gravida eget neque eget, tempus convallis massa. Morbi lacinia ante non feugiat aliquet. Cras nulla erat, mattis consequat aliquam non, congue non dolor. Aenean et urna consectetur purus vehicula commodo eget quis enim. Nullam faucibus vulputate nibh, ac cursus dui varius in. Etiam pellentesque urna justo, sit amet vestibulum neque ullamcorper id. Morbi iaculis dui sapien. Duis nec augue imperdiet, faucibus mi vitae, sagittis enim. Duis eleifend consequat accumsan. Integer mauris nisl, ultricies eu facilisis malesuada, gravida ut ante. Aliquam nec sapien vel ipsum cursus tempus at in lacus.

Ut vitae faucibus massa. Integer at porta purus. Nam ut convallis ligula. Suspendisse potenti. In eget tempus nulla. Nulla nec leo sapien. Praesent non consectetur orci, vitae tempor elit. Nullam ut dolor eu tellus condimentum consequat. Phasellus sem neque, mollis vitae dapibus vel, accumsan nec lacus. Proin lobortis condimentum diam, vitae sodales velit consectetur lacinia. Nullam ut tincidunt mauris, quis porttitor nisl.

</p>
          </div>
          <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        J'accepte le règlement
      </button>
      </div>
      </div>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/user/me", cookies.jwt);

  if(user.acceptedRule == 1 || user.error){
    return {
      redirect: {
        permanent: false,
        destination: "/panel",
      },
      props:{},
    };  
  }

  return {
    props: { }, // will be passed to the page component as props
  }
}