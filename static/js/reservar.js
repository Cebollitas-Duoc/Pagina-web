const button_reserva     = document.getElementById("ButtonReserva");
const Id_Dpto     = document.getElementById("Id_Dpto");
const Id_State     = document.getElementById("Id_State");
const Value     = document.getElementById("Value");
button_reserva.addEventListener("click", async ()=>{
    var formdata = new FormData();
    var r
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("Id_Departamento", Id_Dpto.value);
    formdata.append("Id_Estado", Id_State.value);
    formdata.append("Valor", Value.value);
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    await fetch(`${apidomain}/reservas/createreserve/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return r

})