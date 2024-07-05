const currency_types = ['CLP', 'USD', 'EUR']

const selectCurrency = document.querySelector('#currency')

currency_types.forEach(currency => {
  const option = document.createElement('option')
  option.value = currency
  option.textContent = currency
  selectCurrency.appendChild(option)
})

const btnBuscar = document.querySelector('#convert')
const inputAmount = document.querySelector('#amount')

const updateBtnState = () => {
  const amountNumber = inputAmount.value * 1
  if (selectCurrency.value !== 'Seleccione moneda' && (amountNumber > 0)) {
    btnBuscar.disabled = false
    console.log('true', btnBuscar.disabled);
  } else {
    btnBuscar.disabled = true
    console.log('galse', btnBuscar.disabled);
  }
}

selectCurrency.addEventListener('change', updateBtnState)
inputAmount.addEventListener('input', updateBtnState)
