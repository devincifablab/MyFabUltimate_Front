
import { fetchAPIAuth, parseCookies } from "../lib/api";

export default function Rules() {
  return(<head>
    <title>HTML Meta Tag</title>
    <meta httpEquiv = "refresh" content = "3; url = https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
    </head>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  const user = await fetchAPIAuth("/user/me", cookies.jwt);

  return {
    props: { }, // will be passed to the page component as props
  }
}