
document.addEventListener('DOMContentLoaded', initApp);


function initApp(){


/* ------- VARIABLES -------- */

let itemEliminado;
let localStorage = window.localStorage;
let historialHTTP = [];
let historialElement;

/* ------------ DOM ELEMENTS ---------- */
    const scrollButton = document.querySelector('#welcome a[href="#main_layout"]');
    const input = document.querySelector('.input-box #url_input');
    const inputBtn = document.querySelector('.input-box #send_request');
    const select = document.querySelector('#method_select');
    const responseDiv = document.querySelector('.content-actions #divCampo');
    const inputResponseDiv = document.querySelector('#main_layout .content-actions #divResponse .resp-campo')
    const textArea = document.querySelector('.content-actions #divResponse .text-area');


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

  // pick data form input

  let object = pickDataFromInput();
  let post = JSON.stringify(object);



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
      //body: JSON.stringify(post)
      body: post
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
        cleanHTMLContainer(responseDiv);
        const stringData = JSON.stringify(data, null, "  ");
        let pre = document.createElement('pre');
        pre.innerHTML = stringData;
        responseDiv.appendChild(pre);
      } else{
        cleanHTMLContainer(responseDiv);
        const stringData = JSON.stringify(data, null, "  ");
        let pre = document.createElement('pre');
        pre.innerHTML = stringData;
        responseDiv.appendChild(pre);
      }

    });

  } else {
    respuesta.then(error => {
      console.log(error);

      // SET ERROR DATA TO HISTORY LOG
      historialElement.error = error;
    });
  }


  }



  function pickDataFromInput(){
    const inputString = textArea.value;
    const jsonInputData = JSON.parse(inputString);
    return jsonInputData;
  }


  function cleanHTMLContainer(container){
    while(container.firstChild){
      container.removeChild(container.firstChild);
    }
  }





  

  // PUSH HISTORY LOG ELEMENT TO HISTORY LOG ARRAY
  
  function pushToLocalStorage(){
    historialHTTP = [...historialHTTP, historialElement];
    const historyId = `id_${historialHTTP.length}`;
    
    localStorage.setItem(historyId, JSON.stringify(historialElement.query));

    console.log(localStorage);
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