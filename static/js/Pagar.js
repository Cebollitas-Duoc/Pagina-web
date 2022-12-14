async function pagar(Id_Reserva){
    console.log(Id_Reserva)
    var estado = await verificar(Id_Reserva);
    if(parseInt(estado) === 0){
        var formdata = new FormData();
        var r
        formdata.append("Id_Reserva", parseInt(Id_Reserva));
        
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        
        await fetch(`${apidomain}/reservas/transbankpay/`, requestOptions)
        .then(response => response.text())
        .then(result => r=result)
        .catch(error => console.log('error', error));
        res = JSON.parse(r)
        window.location.replace(res.link);
    
        return r
    }
    else if(parseInt(estado) === 1){
        location.reload();
        GlobalMessage.setGlobalSuccessMessage('La Reserva ya ha sido Pagada')
    }
    else if(parseInt(estado) === 2){
        location.reload();
        GlobalMessage.setGlobalSuccessMessage('La Reserva ya ha Finalizado')
    }
    else if(parseInt(estado) === 3){
        location.reload();
        GlobalMessage.setGlobalSuccessMessage('La Reserva ha sido Cancelada, por lo que no puede ser Pagada')
    }
}

async function verificar(Id_Reserva){
    var formdata = new FormData();
    var r
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch(`${apidomain}/reservas/getuserreservebyid/`+Id_Reserva+'/', requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));
    res = JSON.parse(r)
    return res.ID_ESTADORESERVA
}