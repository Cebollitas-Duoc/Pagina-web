async function verify(token){
    var formdata = new FormData();
    var r
    formdata.append("token", token);
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch(`${apidomain}/reservas/transbankverify/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));
    res = JSON.parse(r)
    resp = res.response
    Pay(resp)
}
async function Pay(res){
    var formdata = new FormData();
    var r
    formdata.append("Id_Estado_Pago", 1);
    formdata.append("VALORTOTAL", res.amount);
    formdata.append("Id_Reserva", res.buy_order);
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch(`${apidomain}/pagos/pagarReserva/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));
    res = JSON.parse(r)
    GlobalMessage.setGlobalSuccessMessage(res.Success)
}



window.addEventListener('load' ,(e)=>{
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token_ws");
    verify(token)
});