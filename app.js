// Atribui
const buttonSubmit = document.querySelector('#app form button')
const zipCodeField = document.querySelector('#app form input')
const content = document.querySelector('#app main')

buttonSubmit.addEventListener('click', run)

function run(event) {
  event.preventDefault()

  let zipCode = zipCodeField.value

  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.trim()

  axios
    .get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then((response) => {
      if (response.data.error) {
        throw new Error('Cep inválido!')
      }
      content.innerHTML = ''
      createLine(response.data.logradouro)
      createLine(response.data.localidade + '/' + response.data.uf)
      createLine(response.data.bairro)
    })
    .catch((reject) => {
      console.log(reject)
      content.innerHTML = ''
      createLine('Ops, algo deu errado!')
    })
}

function createLine(data) {
  const line = document.createElement('p')
  const text = document.createTextNode(data)
  line.append(text)
  content.appendChild(line)
}
