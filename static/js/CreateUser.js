const button_createUser = document.getElementById("CreateUserButton");
const input_nombres     = document.getElementById("floatingNombres");
const input_apellidos   = document.getElementById("floatingApellidos");
const input_email       = document.getElementById("floatingEmail");
const input_direccion   = document.getElementById("floatingDireccion");
const input_telefono    = document.getElementById("floatingTelefono");
const input_password    = document.getElementById("floatingPassword");
const input_password2   = document.getElementById("floatingPassword2");

button_createUser.addEventListener("click", async ()=>{
    if (!validateInputs()) return

    nombres     = getValue(input_nombres)
    apellidos   = getValue(input_apellidos)
    email       = getValue(input_email)
    direccion   = getValue(input_direccion)
    telefono    = getValue(input_telefono)
    password    = getValue(input_password)
    password2   = getValue(input_password2)

    nombre    = nombres.split(" ")[0]
    nombre2   = nombres.split(" ")[1]
    apellido  = apellidos.split(" ")[0]
    apellido2 = apellidos.split(" ")[1]

    response = JSON.parse(await createUser(email, nombre, nombre2, apellido, apellido2, direccion, telefono, password, password2))
    console.log(response);
    if ("Error" in response)
        printErrorMessage(response["Error"]);
    else{
        alert("Usuario creado correctamente")
        window.location.href = "/user/login";
    }
})

async function createUser(email, nombre, nombre2, apellido, apellido2, direccion, telefono, password, password2){
    var formdata = new FormData();
    var r
    formdata.append("Email",     email);
    formdata.append("Name",      nombre);
    formdata.append("Name2",     nombre2);
    formdata.append("LastName",  apellido);
    formdata.append("LastName2", apellido2);
    formdata.append("Address",   direccion);
    formdata.append("Phone",     telefono);
    formdata.append("Password",  password);
    formdata.append("Password2", password2);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    await fetch("http://api.mrmeme.cl/auth/CreateUser/", requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return r
}

function validateInputs(){
    nombres     = getValue(input_nombres)
    apellidos   = getValue(input_apellidos)
    email       = getValue(input_email)
    direccion   = getValue(input_direccion)
    telefono    = getValue(input_telefono)
    password    = getValue(input_password)
    password2   = getValue(input_password2)

    if (nombres == ""){
        printErrorMessage("Falta ingresar su nombre"); return false;   
    }
    if (apellidos == ""){
        printErrorMessage("Falta ingresar su apellido"); return false;
    }
    if (email == ""){
        printErrorMessage("Falta ingresar su email"); return false;
    }
    if (direccion == ""){
        printErrorMessage("Falta ingresar su direccion"); return false;
    }
    if (telefono == ""){
        printErrorMessage("Falta ingresar su telefono"); return false;
    }
    if (password == ""){
        printErrorMessage("Falta ingresar su contraseña"); return false;
    }
    if (password2 == ""){
        printErrorMessage("Falta ingresar la validacion de su contraseña"); return false;
    }
    if (password != password2){
        printErrorMessage("La segunda contraseña no es igual a la primera"); return false;
    }

    return true
}