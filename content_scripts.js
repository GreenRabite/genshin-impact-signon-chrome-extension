const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const isLoggedin = () => {
  return getCookie("account_id").length > 0
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const checkForSignOnBonus = async () => {
  if(!isLoggedin()){
    alert("You are not signed in. Please log in and claim normally")
  }else{
    const activeComponent = document.querySelector('[class*=--active]')
    if(activeComponent){
      activeComponent.click()
      await sleep(1000);
      document.querySelector('[class*=---dialog-close]').click()
      alert("Successfully claimed your bonus!")
    }else{
      alert("Already claimed for the day! See you tomorrow")
    }
  }
}

window.addEventListener('load', setTimeout(() => checkForSignOnBonus(), 1000))