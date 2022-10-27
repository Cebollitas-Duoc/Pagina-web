async function cancelar(Id_Reserva){
    var formdata = new FormData();
    var r
    console.log(Id_Reserva);
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("Id_Reserva", parseInt(Id_Reserva));
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch(`${apidomain}/reservas/cancelreserve/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));
    GlobalMessage.setGlobalSuccessMessage("Su reserva se ha cancelado exitosamente")
    location.reload();

    return r
}
