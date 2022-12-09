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
async function Pay(resp){
    var formdata = new FormData();
    var r
    var XD = resp
    formdata.append("Id_Estado_Pago", 1);
    formdata.append("VALORTOTAL", resp.amount);
    formdata.append("Id_Reserva", resp.buy_order);
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    await fetch(`${apidomain}/pagos/pagarReserva/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));
    resp = JSON.parse(r)
    GlobalMessage.setGlobalSuccessMessage(res.Success)
    console.log(XD)
    var fecha = document.getElementById('fecha')
    var formatfecha = XD.transaction_date
    fecha.innerHTML = formatfecha.split('T')[0]

    var hora = document.getElementById('hora')
    var formathora = XD.transaction_date
    var Horaformat = formathora.split('T')[1]
    var horahora   = Horaformat.split(':')[0]
    var horamin    = Horaformat.split(':')[1]
    var horaseg    = Horaformat.split(':')[0]
    hora.innerHTML = formathora.split('T')[1]


}



window.addEventListener('load' ,(e)=>{
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token_ws");
    verify(token)
});