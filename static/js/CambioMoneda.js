

const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0})

document.addEventListener('DOMContentLoaded', async () =>{
    const values = document.querySelectorAll(".money")
    values.forEach(value => {
        setCurrencyFormat(value)

        value.addEventListener('change', async () =>{
            setCurrencyFormat(value)
        })

    });
})

function setCurrencyFormat(element){
    valueRaw = element.innerHTML.replaceAll(".","").replace("$","");
    valueRaw = parseInt(valueRaw)
    ValorFormat = formatterPeso.format(parseInt(valueRaw))
    element.innerHTML = ValorFormat
}


