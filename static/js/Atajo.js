const botonlogin = document.getElementById("LoginButton")
const botonCreateUser = document.getElementById("CreateUserButton")
const botonUpdate = document.getElementById("UpdateProfileButton")


window.addEventListener('keypress', (e) => {
  console.log(e.key)
  if(e.key === 'Enter'){
    console.log("*le clickea UWU")
    botonlogin.click()
  }
});

window.addEventListener('keypress', (e) => {
  console.log(e.key)
  if(e.key === 'Enter'){
    console.log("*le clickea UWU")
    botonCreateUser.click()
  }
});

window.addEventListener('keypress', (e) => {
  console.log(e.key)
  if(e.key === 'Enter'){
    console.log("*le clickea UWU")
    botonUpdate.click()
  }
});