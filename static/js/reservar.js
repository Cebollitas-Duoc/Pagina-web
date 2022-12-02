const button_reserva = document.getElementById("ButtonReserva");
const modalreserva   = document.getElementById("modalreserva");
const reservar       = document.getElementById("reservar");
const Id_Dpto        = document.getElementById("Id_Dpto");
const Id_State       = document.getElementById("Id_State");
const Value          = document.getElementById("Value");
const inicio         = document.getElementById("inicio");
const final          = document.getElementById("final");
selectedExtraServices = []

function actualizarfecha(elem){
    final.min = elem.value
    final.value = elem.value
}
function actualizarfechacobro(){
    const total = document.getElementById("total")

    d1 = new Date(inicio.value);
    d2 = new Date(final.value);
    diffTime = Math.abs(d2 - d1);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    totaldia = parseInt(Value.value) * (diffDays+ 1);
    total.innerHTML = totaldia;
    total.setAttribute("total", totaldia)

}

function actualizarprecio(){
    const total = document.getElementById("total")

    let valorTotal = parseInt(total.getAttribute("total"))

    for (const selectedServiceId of selectedExtraServices){
      const selectedService = document.getElementById(`extraSrv-${selectedServiceId}`)
      const valor = selectedService.querySelector(".valor").innerHTML
      valorTotal += parseInt(valor)
    }    
    total.innerHTML =  valorTotal
}

function selectExtraService(id, elem){
  if (selectedExtraServices.includes(id)){
    elem.classList.remove("selected")
    selectedExtraServices = selectedExtraServices.filter(function(e) { return e != id })
  }
  else{
    elem.classList.add("selected")
    selectedExtraServices.push(id)
  }
  actualizarprecio();
}

button_reserva.addEventListener("click", async ()=>{
    hoy = new Date().toISOString().slice(0, 10)
    inicio.value= hoy
    inicio.min = hoy
    final.value= hoy
    final.min = hoy
    modalreserva.style.display = "flex";
})
window.onclick = function(event) {
    if (event.target == modalreserva) {
        modalreserva.style.display = "none";
    }
}
reservar.addEventListener("click", async ()=>{
    const total = document.getElementById("total")
    var formdata = new FormData();
    var r
    d1 = new Date(inicio.value).getTime();
    d2 = new Date(final.value).getTime();
    console.log(d1)
    console.log(d2)
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("Id_Departamento", Id_Dpto.value);
    formdata.append("Id_Estado", Id_State.value);
    formdata.append("FechaDesde", parseInt(d1));
    formdata.append("FechaHasta", parseInt(d2));
    formdata.append("extraServices", selectedExtraServices.toString());
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    await fetch(`${apidomain}/reservas/createreserve/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    GlobalMessage.setGlobalSuccessMessage("Se ha realizado con exito su reserva")
    location.href = '/'; 

    return r

})