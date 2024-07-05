const renderMessage = (messageText, className, container) => {
  container.innerHTML = ''
  const message = document.createElement('p')
  message.className = className
  message.textContent = messageText
  container.appendChild(message)

}

const getIndicadores = async () => {
  try {
    const resp = await fetch('https://mindicador.cl/api')
    const data = await resp.json()
    return data
  } catch (error) {
    renderMessage('Error en la petición intente nuevamente.', errorClasses, result)
    throw error
  }
}

const getCurrencyValue = async (currency) => {
  const data = await getIndicadores()
  let exchangeRate
  switch (currency) {
    case 'USD':
      exchangeRate = data.dolar.valor
      break;
    case 'EUR':
      exchangeRate = data.euro.valor
      break;
    default:
      renderMessage('Tipo de moneda no soportado.', errorClasses, result)
      throw new Error('Tipo de moneda no soportado.')
  }

  return exchangeRate
}

const convertCurrency = async (amount, currency) => {
  const exchangeRate = await getCurrencyValue(currency)
  const convertedAmount = amount / exchangeRate
  return convertedAmount
}

const currency_types = ['USD', 'EUR']
const errorClasses = 'text-center text-red-500 font-bold'

const selectCurrency = document.querySelector('#currency')
currency_types.forEach(currency => {
  const option = document.createElement('option')
  option.value = currency
  option.textContent = currency
  selectCurrency.appendChild(option)
})

const btnBuscar = document.querySelector('#convert')
const inputAmount = document.querySelector('#amount')
const result = document.querySelector('#result')

const updateBtnState = () => {
  const amountNumber = inputAmount.value * 1
  if (selectCurrency.value !== 'Seleccione moneda' && (amountNumber > 0)) {
    btnBuscar.disabled = false
  } else {
    btnBuscar.disabled = true
  }
}

const handleConversion = async () => {
  const amount = inputAmount.value * 1
  const currency = selectCurrency.value

  const convertedAmount = await convertCurrency(amount, currency)

  renderMessage(`Resultado: ${convertedAmount.toFixed(2)}`, 'text-center text-white font-bold', result)
}

selectCurrency.addEventListener('change', updateBtnState)
inputAmount.addEventListener('input', updateBtnState)
btnBuscar.addEventListener('click', handleConversion)
