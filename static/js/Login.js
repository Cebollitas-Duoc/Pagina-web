const button_login     = document.getElementById("LoginButton");
const input_email      = document.getElementById("inputEmail");
const input_password   = document.getElementById("inputPassword");
const check_rememberMe = document.getElementById("checkRememberMe");

button_login.addEventListener("click", async ()=>{
    if (!validateInputs()) return
    email    = getValue(input_email)
    password = getValue(input_password)
    response = JSON.parse(await login(email, password))

    if (response["ValidPassword"]){
        console.log("Valid user")
        setSessionCookies(response)
        window.location.href = "http://www.mrmeme.cl";
        alert("Logeado correctamente")
    }
    else{
        console.log("Invalid credentials")
        setCookie("LogedIn", false, 7)
        deleteCookie("SessionKey")
        printErrorMessage("Credenciales invalidas")
    }
})

async function login(email, password){
    var formdata = new FormData();
    var r
    formdata.append("Email", email);
    formdata.append("Password", password);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    await fetch("http://api.mrmeme.cl/auth/Login/", requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return r
}

function validateInputs(){
    email    = getValue(input_email)
    password = getValue(input_password)

    if (email == ""){
        printErrorMessage("Falta ingresar email"); return false;   
    }
    if (password == ""){
        printErrorMessage("Falta ingresar contraseña"); return false;
    }

    return true
}

function setSessionCookies(sessionData){
    rememberMe = check_rememberMe.checked
    setCookie("SessionKey", sessionData["SessionKey"], 7, rememberMe)
    setCookie("UsrName", sessionData["Nombre"], 7, rememberMe)
    setCookie("UsrImg", sessionData["Foto"], 7, rememberMe)
    setCookie("LogedIn", true, 7, rememberMe)
}
