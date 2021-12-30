import cookie from "cookie"

export function getStrapiURL(path = "") {
  return `${
    "http://localhost:5000/api"
  }${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl)
  const data = await response.json()
  return data
}

export async function fetchAPIAuth(path, jwt) {
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl
    , { 
      method: 'get', 
      headers: new Headers({
        'dvflCookie': ''+jwt, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }), 
    });

    var data;
  if(response.status != 200){
    data = {
      error: "unauthorized"
    }
  } else {
    data = await response.json();
  }
  
  return data
}

export function getTimeline(ticket) {
 
  var timeline = [];
  for(let i = 0;i<ticket.length;i++){
    for(let j = 0;j<ticket[i].timeline.length;j++){
      const time = {...ticket[i].timeline[j], ticket: ticket[i].id}
      timeline.push(time);
    }
  }
  timeline.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return b.id-a.id;
  });
  
  if(timeline.length>0){
    timeline= timeline.slice(0,5);
  }
  timeline.reverse();
  return timeline
}

export function parseCookies(req){
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

