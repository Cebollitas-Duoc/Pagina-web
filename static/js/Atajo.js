const botonlogin = document.getElementById("LoginButton")
const botonCreateUser = document.getElementById("CreateUserButton")
const botonUpdate = document.getElementById("UpdateProfileButton")
const botonUpdatePassword = document.getElementById("ChangePasswordButton")


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

window.addEventListener('keypress', (e) => {
  console.log(e.key)
  if(e.key === 'Enter'){
    console.log("*le clickea UWU")
    botonUpdatePassword.click()
  }
});