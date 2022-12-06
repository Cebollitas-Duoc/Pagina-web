var modal = document.getElementById('detalle');


function abrirDetalle(){
    console.log(modal.style.display)
    modal.style.display = 'flex';
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }