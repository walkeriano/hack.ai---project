
document.addEventListener('DOMContentLoaded', initApp);


function initApp(){


/* ------- VARIABLES -------- */

const scrollButton = document.querySelector('#welcome a[href="#main_layout"]');
const input = document.querySelector('.input-box #url_input');
const inputBtn = document.querySelector('.input-box #send_request');
const select = document.querySelector('#method_select');
const responseDiv = document.querySelector('#main_layout .response')



let itemEliminado;
let localStorage = window.localStorage;
let historialHTTP = [];
let historialElement;

/* ------------- Event Listeners ------------ */

//scrollButton.addEventListener('click', doSomething);
inputBtn.addEventListener('click', doSomething);

/* -------- EVENT FUNCTIONS -------- */

function doSomething(){

  if(input.value){
    requestHTTP(input.value, select.value);
  }


}


/* ASYNC */

async function requestHTTP(url, method){
  method.toUpperCase();
  let options;

  let post = {
    "tweet": "Ejemplo desde js",
    "id_perfil": 1,
    "date": "ejemplo fecha"
  }



  // PICK DATA FORM INPUT




  // FETCH OPTIONS SETUP BASED ON METHOD VALUE

  if (method === 'GET'){
    options = {
      method: method,
    }
  } else if (method === 'POST' || method === 'PUT'){
    options = {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(post)
    }
  } else if (method === 'DELETE'){
    options = {
      method: method,
    }
  }


  let solicitud = await fetch(url, options);
  let respuesta = solicitud.json();
  

    // OBJECT HISTORIAL

    historialElement = {
      query: {
        method: method,
        url: url,
        options: options,
      },
    }

  if(solicitud.ok){

    respuesta.then(data =>{

      // SET DATA TO HISTORY LOG
      historialElement.data = data;

      pushToLocalStorage();

      // APPEND CONTENT
      if(method === 'GET'){
        data.forEach(element => {
          let p = document.createElement('p');
          p.innerHTML = `${element.tweet}`;
          responseDiv.appendChild(p)
        });
      }


    });

  } else {
    respuesta.then(error => {
      console.log(error);

      // SET ERROR DATA TO HISTORY LOG
      historialElement.error = error;
    });
  }


  // SEND ARRAY LOG TO JSON FILE
  // async function sendToHistory(array){

  //   const objectArray = {
  //     "array": array
  //   }

  //   let postHistory = await fetch('./history.json', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify(objectArray),
  //   });


  //   let result =  await postHistory.json();
  //   console.log(result.message);
  // }


  // sendToHistory(historialHTTP);


  }







  //recieveFromHistory();

  // async function recieveFromHistory(){
  //   let recieveHistory = await fetch('./history.json', {
  //     method: 'GET'
  //   });

  //   let result = await recieveHistory.json();

  //   console.log(result);
  //   result.then(data => {
  //     console.log(data);
  //   });
  // }


  

  // PUSH HISTORY LOG ELEMENT TO HISTORY LOG ARRAY
  
  function pushToLocalStorage(){
    historialHTTP = [...historialHTTP, historialElement];
    const historyId = `id_${historialHTTP.length}`;

    localStorage.setItem(historyId, JSON.stringify(historialElement));

    console.log(localStorage);
  }


}