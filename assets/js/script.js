const getIndicadores = async () => {
  const message = document.createElement('p')
  try {
    const resp = await fetch('https://mindicador.cl/api')
    const data = await resp.json()
    console.log(data);
    const resultado = data.dolar.valor
    message.className = 'text-center text-green-500 font-bold'
    message.textContent = `Resultado: ${resultado}`
  } catch (error) {
    console.log('error', error);
    message.className = 'text-center text-red-500 font-bold'
    message.textContent = 'Error en la petición intente nuevamente.'
  }
  result.appendChild(message)
}

getIndicadores()

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
