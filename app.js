// Atribui elementos do html a objetos
const buttonSubmit = document.querySelector('#app form button')
const zipCodeField = document.querySelector('#app form input')
const content = document.querySelector('#app main')

// adiciona um escutador de clicks no botao, que aciona a função 'run'
buttonSubmit.addEventListener('click', run)

// roda sempre que o botão for clicado
function run(event) {
  event.preventDefault()

  // atribui o valor do elemento input ao objeto 'zipCode'
  let zipCode = zipCodeField.value

  // altera partes do input para evitar erros de digitação
  zipCode = zipCode.replace(' ', '')
  zipCode = zipCode.replace('.', '')
  zipCode = zipCode.trim()

  // faz a requisição, que ativa a função 'createLine' se bem-sucedida,
  // e retorna um aviso se algo deu errado
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

// Cria um elemento 'p' no HTML, que adiciona e transmite seu input 'data'
function createLine(data) {
  const line = document.createElement('p')
  const text = document.createTextNode(data)
  line.append(text)
  content.appendChild(line)
}
