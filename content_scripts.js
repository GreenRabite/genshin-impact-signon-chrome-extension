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
  await sleep(2000)
  if(!isLoggedin()){
    alert("You are not signed in. Please log in and claim normally")
  }else{
    const verificationLoginContainer = document.querySelector('.mhy-account-flow');
    if (!verificationLoginContainer){
      claimLoginBonus()
    }else{
      const inputsButtons = verificationLoginContainer.querySelectorAll(".mhy-account-flow-form-input input");
      if(isVerificationPrefilled([...inputsButtons])){
        const loginButton = document.querySelector('.mhy-login-button button');
        loginButton.click();
        await sleep(1000);
        claimLoginBonus();
      }else{
        alert("Please log in to Mihoyo verification form. Otherwise use a password manager to prefilled to skip this part next time")
      }
    }
  }
}

const isVerificationPrefilled = (elements) => {
  return elements.filter(input => input.value.length > 0).length === 2
}

const claimLoginBonus = async () => {
  const activeComponent = document.querySelector('[class*=--active]')
  if(activeComponent){
    activeComponent.click()
    await sleep(1000);
    const closeButton = document.querySelector('[class*=---dialog-close]')
    if(closeButton){
      closeButton.click()
    }
    alert("Successfully claimed your bonus!")
  }else{
    alert("Already claimed for the day! See you tomorrow")
  }
}

window.addEventListener('load', () => {
  checkForSignOnBonus()
})