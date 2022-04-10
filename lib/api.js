import cookie from "cookie"
import GhostContentAPI from "@tryghost/content-api";

export function getURL(path = "") {
  return `${process.env.API + "/api"
    }${path}`
}

export async function fetchAPIAuth(path, jwt) {
  const requestUrl = getURL(path)
  const response = await fetch(requestUrl
    , {
      method: 'get',
      headers: new Headers({
        'dvflCookie': '' + jwt,
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
    });

  var data;
  if (response.status != 200) {
    data = {
      error: "unauthorized"
    }
  } else {
    data = await response.json();
  }

  return data
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_KEY,
  version: "v3"
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
      include: "tags,authors"
    })
    .catch(err => {
      console.error("ERROR GET posts : " + err.code);
    });
}


export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
      include: "tags,authors"
    })
    .catch(err => {
      console.error("ERROR GET post " + postSlug + " : " + err.code);
    });
}
