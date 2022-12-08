const valor = document.getElementById('valor');
const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0})

window.addEventListener('load' ,(e)=>{
    
    valueRaw = valor.getAttribute('value');
    ValorFormat = formatterPeso.format(parseInt(valueRaw))
    valor.innerHTML = "Costo Final " + ValorFormat + " CLP "
});
