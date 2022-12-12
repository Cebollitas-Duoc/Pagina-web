document.addEventListener('DOMContentLoaded', async () =>{
    const validationResult = await isSessionValid();
    
    if ("Valid" in validationResult){
        setCookie("LogedIn", validationResult.Valid, 7)
        setCookie("UsrName", validationResult.nombre, 7)
    }
    else 
        setCookie("LogedIn", false, 7)
})


async function isSessionValid(){  
    var formdata = new FormData();
    var r
    formdata.append("SessionKey", getCookie("SessionKey"));
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch(`${apidomain}/auth/ValidateSession/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return JSON.parse(r)
}