window.addEventListener('keypress', (e) => {
  const boton = document.querySelector(".submit")

  if(e.key === 'Enter'){
    boton.click()
  }
});