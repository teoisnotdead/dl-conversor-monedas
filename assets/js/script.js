const getIndicadores = async () => {
  const message = document.createElement('p')
  try {
    const resp = await fetch('https://mindicador.cl/api')
    const data = await resp.json()
    return data
  } catch (error) {
    message.className = 'text-center text-red-500 font-bold'
    message.textContent = 'Error en la petición intente nuevamente.'
  }
}

const getCurrencyValue = async (currency) => {
  const data = await getIndicadores()
  let exchangeRate
  switch (currency) {
    case 'USD':
      exchangeRate = data.dolar.valor
      console.log({ exchangeRate });
      break;
    case 'EUR':
      exchangeRate = data.euro.valor
      console.log({ exchangeRate });
      break;
  }

  return exchangeRate
}

const convertCurrency = async (amount, currency) => {
  console.log('amount', amount);
  console.log('currency', currency);
  const exchangeRate = await getCurrencyValue(currency)
  console.log('exchangeRate', exchangeRate);
  const convertedAmount = amount / exchangeRate
  return convertedAmount
}

const currency_types = ['USD', 'EUR']

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
    console.log('true', btnBuscar.disabled);
  } else {
    btnBuscar.disabled = true
    console.log('galse', btnBuscar.disabled);
  }
}

selectCurrency.addEventListener('change', updateBtnState)
inputAmount.addEventListener('input', updateBtnState)
btnBuscar.addEventListener('click', async () => {
  const amount = inputAmount.value * 1
  console.log('amountamount', amount);
  const currency = selectCurrency.value

  result.innerHTML = ''

  const convertedAmount = await convertCurrency(amount, currency)
  const message = document.createElement('p')
  message.className = 'text-center text-white font-bold'
  message.textContent = `Resultado: ${convertedAmount.toFixed(2)}`
  result.appendChild(message)
  console.log('convertedAmount', convertedAmount);
})
