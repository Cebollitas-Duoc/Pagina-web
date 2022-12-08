async function cancelar(Id_Reserva){
    const response = await cancelRequest(Id_Reserva)
    if ("reserva_cancelada" in response && response["reserva_cancelada"]){
        GlobalMessage.setGlobalSuccessMessage("Su reserva se ha cancelado exitosamente")
        location.reload();
    }
    else if ("Error" in response) 
        GlobalMessage.printGlobalErrorMessage(response["Error"])
    else
        GlobalMessage.printGlobalErrorMessage("Error desconocido al crear reserva")
}

async function cancelRequest(Id_Reserva){
    var formdata = new FormData();
    var r
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
    
    return JSON.parse(r);
}
