const button_reserva = document.getElementById("ButtonReserva");
const modalreserva   = document.getElementById("modalreserva");
const reservar       = document.getElementById("reservar");
const Id_Dpto        = document.getElementById("Id_Dpto");
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
    if (getCookie("LogedIn") != "true"){
      location.href = '/user/login'; 
      return;
    }
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
  const idDpto    = Id_Dpto.value
  const startDate = parseInt(new Date(inicio.value).getTime())
  const endDate   = parseInt(new Date(final.value).getTime())

  const response = await this.CreateReserveQuery(idDpto, startDate, endDate, selectedExtraServices.toString())
  if ("reserva_creada" in response && response["reserva_creada"]){
    GlobalMessage.setGlobalSuccessMessage("Se ha realizado con exito su reserva")
    location.href = '/reservas/mireserva'; 
  }
  else if ("Error" in response) 
    GlobalMessage.printGlobalErrorMessage(response["Error"])
  else
    GlobalMessage.printGlobalErrorMessage("Error desconocido al crear reserva")
})

async function CreateReserveQuery(idDpto, startDate, endDate, extraServices){
    var r
    var formdata = new FormData();
    formdata.append("SessionKey", getCookie("SessionKey"));
    formdata.append("Id_Departamento", idDpto);
    formdata.append("StartDate",       startDate);
    formdata.append("EndDate",         endDate + 86399000);
    formdata.append("extraServices",   extraServices);
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    await fetch(`${apidomain}/reservas/createreserve/`, requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return JSON.parse(r);
}