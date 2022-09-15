const button_createUser = document.getElementById("CreateUserButton");
const input_nombres     = document.getElementById("floatingNombres");
const input_apellidos   = document.getElementById("floatingApellidos");
const input_email       = document.getElementById("floatingEmail");
const input_direccion   = document.getElementById("floatingDireccion");
const input_telefono    = document.getElementById("floatingTelefono");
const input_password    = document.getElementById("floatingPassword");
const input_password2   = document.getElementById("floatingPassword2");

button_createUser.addEventListener("click", async ()=>{
    nombres     = input_nombres.value      
    apellidos   = input_apellidos.value    
    email       = input_email.value        
    direccion   = input_direccion.value    
    telefono    = input_telefono.value     
    password    = input_password.value     
    password2   = input_password2.value    

    nombre    = nombres.split(" ")[0]
    nombre2   = nombres.split(" ")[1]
    apellido  = apellidos.split(" ")[0]
    apellido2 = apellidos.split(" ")[1]

    response = JSON.parse(await createUser(email, nombre, nombre2, apellido, apellido2, password, password2))
    console.log(response)
})

async function createUser(email, nombre, nombre2, apellido, apellido2, password, password2){
    var formdata = new FormData();
    var r
    formdata.append("Email",     email);
    formdata.append("Name",      nombre);
    formdata.append("Name2",     nombre2);
    formdata.append("LastName",  apellido);
    formdata.append("LastName2", apellido2);
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