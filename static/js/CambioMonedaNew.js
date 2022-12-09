const element = document.querySelector('.InfoDepto2');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const formattedNumber = formatter.format(element);

if (element) {
  element.innerText = formattedNumber;
}
