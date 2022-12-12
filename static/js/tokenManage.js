function volver(){
    var url = document.URL;
    window.location.replace(url.split('/p')[0])
}
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
    var respuesta = resp
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
    GlobalMessage.setGlobalSuccessMessage(resp.Success)
    var fechaRaw = respuesta.transaction_date
    const date = new Date(fechaRaw);
    var fecha = document.getElementById('fecha')
    var hora = document.getElementById('hora')
    var ordencompra = document.getElementById('ordencompra')
    var total = document.getElementById('total')
    fecha.innerHTML = date.getDate()+'-'+parseInt(date.getMonth()+1)+'-'+date.getFullYear()
    hora.innerHTML = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds()
    ordencompra.innerHTML = respuesta.buy_order
    total.innerHTML = respuesta.amount
    setCurrencyFormat(total)


}
function setCurrencyFormat(element){
    valueRaw = element.innerHTML.replaceAll(".","").replace("$","");
    valueRaw = parseInt(valueRaw)
    ValorFormat = formatterPeso.format(parseInt(valueRaw))
    element.innerHTML = ValorFormat
}
window.addEventListener('load' ,(e)=>{
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token_ws");
    verify(token)
});
