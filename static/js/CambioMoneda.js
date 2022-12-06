const valor = document.getElementById('valor');
const xd = document.getElementById('xd');
const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0})

window.addEventListener('load' ,(e)=>{
    valueRaw = valor.getAttribute('value');
    a = formatterPeso.format(parseInt(valueRaw))
    xd.innerHTML = a+" CLP por noche"
});