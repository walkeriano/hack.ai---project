
document.addEventListener('DOMContentLoaded', initApp);


function initApp(){


/* ------- VARIABLES -------- */

const scrollButton = document.querySelector('#welcome a[href="#main_layout"]');
const input = document.querySelector('#main_layout #url');
const inputBtn = document.querySelector('#main_layout #send_request');

/* ------------- Event Listeners ------------ */

//scrollButton.addEventListener('click', doSomething);
inputBtn.addEventListener('click', doSomething);

/* -------- EVENT FUNCTIONS -------- */

function doSomething(){

  if(input.value){
    getContent(input.value);
  }

}


/* ASYNC */

async function getContent(url, method){
  let solicitud = await fetch(url);
  let respuesta = solicitud.json();

  if(solicitud.ok){
    console.log(respuesta);
    respuesta.then(data =>{
      console.log(data);
    });

  } else{
    console.log("ERROR Código: " + respuesta.status);

    respuesta.then(error => {
      console.log(error);
    });
  }

}

// const traeContenido = fetch()
//   .then()
//   .then()


// 

}



// control de información en button

document.getElementById("button1").addEventListener("click", function () {
  document.getElementById("divCampo").style.display = "block";
  document.getElementById("divResponse").style.display = "none";
  this.classList.add("activado");
  this.classList.remove("desactivado");
  document.getElementById("button2").classList.add("desactivado");
  document.getElementById("button2").classList.remove("activado");
});

document.getElementById("button2").addEventListener("click", function () {
  document.getElementById("divCampo").style.display = "none";
  document.getElementById("divResponse").style.display = "block";
  this.classList.add("activado");
  this.classList.remove("desactivado");
  document.getElementById("button1").classList.add("desactivado");
  document.getElementById("button1").classList.remove("activado");
});

document.getElementById("button1").click();