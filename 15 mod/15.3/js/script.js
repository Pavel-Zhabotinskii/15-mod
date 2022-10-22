const wsUrl = 'wss://echo-ws-service.herokuapp.com'

const input = document.querySelector('.form__input')
const btnMessage = document.querySelector('.btn__message')
const btnGeo = document.querySelector('.btn__geo')
const screen = document.querySelector('.screen')

let websocket = new WebSocket(wsUrl);

let messages = () => input.value

function showMessage (m){
  let p = document.createElement('p')
  p.classList.add('mes')
  p.innerHTML = m
  screen.appendChild(p) 
}

function getMessage(message){
  let p = document.createElement('p')
  p.classList.add('get__mes')
  p.innerHTML = message
  screen.appendChild(p) 
}

btnMessage.addEventListener('click',()=>{
  showMessage (messages())
  websocket.send(messages())
})

function openСonnection(){
  websocket.onopen = function (event) {
    console.log('websocke open')
  }
  websocket.onclose = function (event){
    console.log('websocke close')
  }
  websocket.onmessage = function (event) {
    getMessage(messages())
  }
  websocket.onerror = function(event){
    getMessage(`<span>ERROR</span>`)
  }
}

btnGeo.addEventListener('click', () => {

  if ("geolocation" in navigator) {
    showMessage('Гео-локация')
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      let a = document.createElement('a')
      a.classList.add('get__mes')
      a.setAttribute('href', '`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`')
      a.setAttribute('target', '_blank')
      a.innerHTML = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`
      screen.appendChild(a) 
   });
  }
})


document.addEventListener('DOMContentLoaded',openСonnection);
