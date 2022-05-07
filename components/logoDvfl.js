function entierAleatoire(max) {
  return Math.floor(Math.random() * (max));
}

function chooseLogo(isEdu){
  return isEdu && entierAleatoire(100) === 0 ? {img:"/logoPaint.png", link:"/youClickedOnTheLogo"} : {img:"/logo.png"};
}

function LogoDvfl({user = null}) {
  const isEdu = user ? user.email.endsWith('@edu.devinci.fr') : false;
  const logo = chooseLogo(isEdu);

  return (
  <a href={logo.link} target="_blank">
    <img className="h-8 w-auto" src={logo.img} alt="Fablab"/>
  </a>)
}

export default LogoDvfl;