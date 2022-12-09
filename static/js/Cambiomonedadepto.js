
const valordepto = document.getElementById('valordepto');

if (valordepto) {
  const valueRaw = valordepto.getAttribute('value');
  if (valueRaw) {
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
    const valordeptoFormat = formatterPeso.format(parseInt(valueRaw));
    valordepto.innerText = ` ${valordeptoFormat} CLP Por Noche`;
  }
}
