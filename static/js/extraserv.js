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