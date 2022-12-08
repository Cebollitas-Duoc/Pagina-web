async function pagar(Id_Reserva){
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
    console.log(res.link)
    window.location.replace(res.link);

    return r
}