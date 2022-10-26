const button_changePassword = document.getElementById("ChangePasswordButton");
const input_old_password   = document.getElementById("old_password");
const input_new_password   = document.getElementById("new_password");
const input_new_password2  = document.getElementById("new_password2");

button_changePassword.addEventListener("click", async ()=>{
    if (!validateInputs()) return

    old_password  = getValue(input_old_password)
    new_password  = getValue(input_new_password)
    new_password2 = getValue(input_new_password2)

    var a = await ChangePassword(old_password, new_password, new_password2)
    response = JSON.parse(a)
    if ("Error" in response)
        printErrorMessage(response["Error"]);
    else{
        GlobalMessage.setGlobalSuccessMessage("Contraseña actualizada");
        window.location.href = "/user/myprofile";
    }
})

async function ChangePassword(old_password, new_password, new_password2){  
    var formdata = new FormData();
    var r
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("OldPassword", old_password);
    formdata.append("NewPassword", new_password);
    formdata.append("NewPassword2", new_password2);
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch(`${apidomain}/auth/changepassword/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return r
}

function validateInputs(){
    old_password  = getValue(input_old_password)
    new_password  = getValue(input_new_password)
    new_password2 = getValue(input_new_password2)

    if (old_password == ""){
        printErrorMessage("Falta ingresar la vieja contraseña"); return false;   
    }
    if (new_password == ""){
        printErrorMessage("Falta ingresar la nueva contraseña"); return false;   
    }
    if (new_password2 == ""){
        printErrorMessage("Falta ingresar la repeticion de la nueva contraseña"); return false;   
    }
    if (new_password != new_password2){
        printErrorMessage("Las nuevas contraseñas ingresadas tienen que ser iguales"); return false;   
    }
    if (old_password == new_password){
        printErrorMessage("La nueva contraseña y la vieja no pueden ser iguales"); return false;   
    }
    

    return true
}