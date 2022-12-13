const button_reserva = document.getElementById("ButtonReserva");
const modalreserva   = document.getElementById("modalreserva");
const reservar       = document.getElementById("reservar");
const Id_Dpto        = document.getElementById("Id_Dpto");
const Value          = document.getElementById("Value");
const ValorTotal     = document.getElementById("ValorTotal");

selectedExtraServices = []

document.addEventListener('DOMContentLoaded', async () =>{
  datePicker = new HotelDatepicker(document.getElementById("datePicker"), {
    format: 'DD-MM-YYYY',
    disabledDates: await getReservedDates()
  });
  
  document.getElementById("datePicker").addEventListener("afterClose", async () =>{
      actualizarprecio();
      if(datePicker.getNights() !== 0){
        ValorTotal.classList.remove('d-none');
        reservar.disabled=false;
      }
      if(datePicker.getNights() === 0){
        if(ValorTotal.classList.contains('d-none')){
        }
        else{
          ValorTotal.classList.add('d-none');
        }
        reservar.disabled=true;
      }
  });
})

function actualizarprecio(){
    const dailyValue = document.getElementById("total")

    let valorTotal = parseInt(dailyValue.getAttribute("total")) * datePicker.getNights()

    for (const selectedServiceId of selectedExtraServices){
      const selectedService = document.getElementById(`extraSrv-${selectedServiceId}`)
      const valor = selectedService.querySelector(".valor").innerHTML
      valorTotal += parseInt(valor)
    }    
    total.innerHTML =  valorTotal
    total.dispatchEvent(new Event("change"))
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
    modalreserva.style.display = "flex";
})
window.onclick = function(event) {
    if (event.target == modalreserva) {
        modalreserva.style.display = "none";
    }
}

reservar.addEventListener("click", async ()=>{
  const idDpto    = Id_Dpto.value
  const startDate = datePicker.start
  const endDate   = datePicker.end

  const response = await this.CreateReserveQuery(idDpto, startDate, endDate, selectedExtraServices.toString())
  if ("reserva_creada" in response && response["reserva_creada"]){
    GlobalMessage.setGlobalSuccessMessage("Se ha realizado con exito su reserva")
    location.href = '/reservas/misreservas'; 
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
    formdata.append("EndDate",         endDate);
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

async function getReservedDates(){
  var r;
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  await fetch(`${apidomain}/reservas/getreserveddates/${Id_Dpto.value}/`, requestOptions)
  .then(response => response.text())
  .then(result => r=result)
  .catch(error => console.log('error', error));

  return JSON.parse(r);
}