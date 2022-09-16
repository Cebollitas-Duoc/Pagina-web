const button_login   = document.getElementById("LoginButton");
const input_email    = document.getElementById("inputEmail");
const input_password = document.getElementById("inputPassword");

button_login.addEventListener("click", async ()=>{
    email = input_email.value
    password = input_password.value
    response = JSON.parse(await login(email, password))

    if (!validateInputs()) return

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
    email = input_email.value
    password = input_password.value

    if (email == ""){
        printErrorMessage("Falta ingresar email"); return false;   
    }
    if (password == ""){
        printErrorMessage("Falta ingresar contraseña"); return false;
    }

    return true
}

function setSessionCookies(sessionData){
    setCookie("SessionKey", sessionData["SessionKey"], 7)
    setCookie("UsrName", sessionData["Nombre"], 7)
    setCookie("UsrImg", sessionData["Foto"], 7)
    setCookie("LogedIn", true, 7)
}
