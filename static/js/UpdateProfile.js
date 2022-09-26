const button_updateProfile = document.getElementById("UpdateProfileButton");
const input_nombres        = document.getElementById("floatingNombres");
const input_apellidos      = document.getElementById("floatingApellidos");
const input_email          = document.getElementById("floatingEmail");
const input_direccion      = document.getElementById("floatingDireccion");
const input_telefono       = document.getElementById("floatingTelefono");

button_updateProfile.addEventListener("click", async ()=>{
    if (!validateInputs()) return

    nombres     = getValue(input_nombres)
    apellidos   = getValue(input_apellidos)
    email       = getValue(input_email)
    direccion   = getValue(input_direccion)
    telefono    = getValue(input_telefono)

    nombre    = nombres.split(" ")[0]
    nombre2   = nombres.split(" ")[1]
    apellido  = apellidos.split(" ")[0]
    apellido2 = apellidos.split(" ")[1]

    var a = await updateProfile(email, nombre, nombre2, apellido, apellido2, direccion, telefono)
    console.log(a);
    response = JSON.parse(a)
    console.log(response);
    if ("Error" in response)
        printErrorMessage(response["Error"]);
    else{
        alert("Perfil actualizado")
    }
})

async function updateProfile(email, nombre, nombre2, apellido, apellido2, direccion, telefono){  
    var formdata = new FormData();
    var r
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("Email", email);
    formdata.append("PrimerNombre", nombre);
    formdata.append("SegundoNombre", nombre2);
    formdata.append("PrimerApellido", apellido);
    formdata.append("SegundoApellido", apellido2);
    formdata.append("Direccion", direccion);
    formdata.append("Telefono", telefono);
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch("http://api.mrmeme.cl/profile/editsessionprofile/", requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return r
}

function validateInputs(){
    nombres   = getValue(input_nombres)
    apellidos = getValue(input_apellidos)
    email     = getValue(input_email)
    direccion = getValue(input_direccion)
    telefono  = getValue(input_telefono)

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

    return true
}