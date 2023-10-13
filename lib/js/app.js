
document.addEventListener('DOMContentLoaded', initApp);


function initApp(){


/* ------- VARIABLES -------- */

let itemEliminado;
let localStorage = window.localStorage;
let historialElement;

/* ------------ DOM ELEMENTS ---------- */
    const scrollButton = document.querySelector('#welcome a[href="#main_layout"]');

    const input = document.querySelector('.input-box #url_input');
    const inputBtn = document.querySelector('.input-box #send_request');
    const select = document.querySelector('#method_select');
    const responseDiv = document.querySelector('.content-actions #divCampo');
    const textArea = document.querySelector('.content-actions #divResponse .text-area');
    const historyDiv = document.querySelector('.content-hist');


/* SET INIT DATA */

//printDataToHistory();

/* ------------- Event Listeners ------------ */

inputBtn.addEventListener('click', queryData);


/* -------- EVENT FUNCTIONS -------- */

function queryData(){

  if(input.value){
    requestHTTP(input.value, select.value);
  }

  printDataToHistory();
}


/* ASYNC */

async function requestHTTP(url, method){

  method.toUpperCase();

  // pick data from input and parse that object to a string
  let object = pickDataFromInput();
  let post = JSON.stringify(object);



  // FETCH OPTIONS SETUP BASED ON METHOD VALUE
  const options = setFetchOptions(method, post);


  // HTTP QUERY
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

  console.log(historialElement);


  // DATA OK
  if(solicitud.ok){

    respuesta.then(data =>{
      
      // SET DATA TO HISTORY LOG
      historialElement.data = data;

      pushToLocalStorage();

      // APPEND CONTENT TO RESPONSE DIV
      cleanHTMLContainer(responseDiv);
      const stringData = JSON.stringify(data, null, "  ");
      let pre = document.createElement('pre');
      pre.innerHTML = stringData;
      responseDiv.appendChild(pre);

    });
  
  // DATA ERROR
  } else {
    respuesta.then(error => {
      console.log(error);

      // SET ERROR DATA TO HISTORY LOG
      historialElement.error = error;
    });
  }

  }


  // SET FETCH OPTIONS BASED TO METHOD
  function setFetchOptions(method, body){

    let options;

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
        body: body
      }
    } else if (method === 'DELETE'){
      options = {
        method: method,
      }
    }

    return options;

  }


  // TAKES DATA FROM TEXT AREA INPUT AND CONVERTS IT INTO AN OBJECT

  function pickDataFromInput(){
    const inputString = textArea.value;
    const jsonInputData = JSON.parse(inputString);
    return jsonInputData;
  }


  // DELETE ALL ITEMS INTO A HTML CONTAINER

  function cleanHTMLContainer(container){
    while(container.firstChild){
      container.removeChild(container.firstChild);
    }
  }



  // PRINTS DATA FROM LOCALSTORAGE TO HISTORY DIV CONTAINER

  function printDataToHistory(){

    cleanHTMLContainer(historyDiv);

    for(let i = 0; i < localStorage.length; i++){
      
      const el = document.createElement('div');
      el.classList.add('item-story');
      const elSpan = document.createElement('span');

      const indexItemStorage = `id_${i}`;
      const queryItemStorage = localStorage.getItem(indexItemStorage);
      const objectItem = JSON.parse(queryItemStorage);
      console.log(objectItem);

      elSpan.textContent = `${objectItem.method} -- ${objectItem.url}`;
      el.appendChild(elSpan);

      historyDiv.appendChild(el);

    }
  }




  // PUSH HISTORY LOG ELEMENT TO HISTORY LOG ARRAY
  
  function pushToLocalStorage(){

    const historyId = `id_${localStorage.length}`;
    console.log(historyId);
    localStorage.setItem(historyId, JSON.stringify(historialElement.query));

  }


}



// control de información en button

document.getElementById("button1").addEventListener("click", function () {
  document.getElementById("divCampo").classList.add("cont-campo");
  document.getElementById("divCampo").classList.remove("none");
  document.getElementById("divResponse").classList.add("none");
  document.getElementById("divResponse").classList.remove("cont-response");
  this.classList.add("activado");
  this.classList.remove("desactivado");
  document.getElementById("button2").classList.add("desactivado");
  document.getElementById("button2").classList.remove("activado");
});

document.getElementById("button2").addEventListener("click", function () {
  document.getElementById("divCampo").classList.add("none");
  document.getElementById("divCampo").classList.remove("cont-campo")
  document.getElementById("divResponse").classList.add("cont-response");
  document.getElementById("divResponse").classList.remove("none");
  this.classList.add("activado");
  this.classList.remove("desactivado");
  document.getElementById("button1").classList.add("desactivado");
  document.getElementById("button1").classList.remove("activado");
});

document.getElementById("button1").click();