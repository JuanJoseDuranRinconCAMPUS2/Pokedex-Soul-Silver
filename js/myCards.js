
export let Operations = {
    cooldownRegion() {region.disabled = false;},
    cooldownElemental(boton) {boton.disabled = false},
    desactivateElemental(botonesHeader) {botonesHeader.forEach((boton) => {Operations.cooldownElemental(boton)})},
    remover() {var divPokemons = document.querySelectorAll(".pokemon");
        for (var i = 0; i < divPokemons.length; i++) {
            divPokemons[i].remove();
          }
    }
};
import { wsMyCards } from "/wsMyCards/wsMyCards.js";

const removerModal = function removerModal() {
    var divPokemons = document.querySelectorAll(".modalBonito");
    for (var i = 0; i < divPokemons.length; i++) {
        divPokemons[i].remove();
      }         
}

async function getPokemons(pokedexInicial, pokedexFinal) {
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  const promises = [];
  
  for (let i = pokedexInicial; i <= pokedexFinal; i++) {
    const response = await fetch(URL + i);
    const data = await response.json();
    // promises.push(data);
    mostrarPokemon(data)
  }
  setTimeout(() => {
    modalClick();
  }, 100);
  
  // const pokemons = await Promise.all(promises);
  // console.log(pokemons);
  // pokemons.forEach(pokemon =>  mostrarPokemon(pokemon));
}
function getPokemonsPromise(pokedexInicial, pokedexFinal, botonesHeader) {
    return new Promise((resolve, reject) => {
      getPokemons(pokedexInicial, pokedexFinal)
        .then(() => {
          console.log("Terminé de iterar");
          Operations.cooldownRegion();
          Operations.desactivateElemental(botonesHeader);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function mostrarPokemon(poke) {
        
    const ws = new Worker("./wsMyCards/wsMyCards.js", {type: "module"});
    let id = [];
    let count= 0;
    
    ws.postMessage({module: "displaycards", data: poke})
    id = ["#listaPokemon"]
    ws.addEventListener("message", (e)=>{
    
    let doc = new DOMParser().parseFromString(e.data, "text/html");
    document.querySelector(id[count]).append(...doc.body.children);
    (id.length-1==0) ? ws.terminate(): count++;
    });
}


function typePokemonsPromise(pokedexInicial, pokedexFinal, botonId, botonesHeader) {
  return new Promise((resolve, reject) => {
    typePokemons(pokedexInicial, pokedexFinal, botonId, botonesHeader)
      .then(() => {
  
        Operations.cooldownRegion();
        Operations.desactivateElemental(botonesHeader);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function typePokemons(pokedexInicial, pokedexFinal, botonId) {
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  for (let i = pokedexInicial; i <= pokedexFinal; i++) {
      fetch(URL + i)
      const response = await fetch(URL + i);
      const data = await response.json();

      if(botonId === "ver-todos") {
          mostrarPokemon(data);
      } else {
          const tipos = data.types.map(type => type.type.name);
          if (tipos.some(tipo => tipo.includes(botonId))) {
              mostrarPokemon(data);
          }
      }
  }
}
async function getBusqueda(pokemon) {
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  const response = await fetch(URL + pokemon);
  const data = await response.json();
  mostrarPokemonSearch(data);
  setTimeout(() => {
    modalClick();
  }, 100);
    
}

function mostrarPokemonSearch(poke) {
        
  const ws = new Worker("./wsMyCards/wsMyCards.js", {type: "module"});
  let id = [];
  let count= 0;
  
  ws.postMessage({module: "displaycardsSearch", data: poke})
  id = ["#pokeSearch"]
  ws.addEventListener("message", (e)=>{
  
  let doc = new DOMParser().parseFromString(e.data, "text/html");

  document.querySelector(id[count]).append(...doc.body.children);
  (id.length-1==0) ? ws.terminate(): count++;
  });
}

async function modalClick() {
  const openModal = document.querySelectorAll(".modalBtn");
  console.log(openModal);
  openModal.forEach(boton => boton.addEventListener("click", (event) => {
      const botonId = event.currentTarget.id;
      modalPokemons(botonId);
  }));
}

async function modalPokemons(pokemon) {
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  const response = await fetch(URL + pokemon);
  const data = await response.json();   
  const URL2 = "https://pokeapi.co/api/v2/pokemon-species/";
  const response2 = await fetch(URL2 + pokemon);
  const data2 = await response2.json();
  const pokemonData = {
      ...data,
      ...data2,
    };  
  console.log(pokemonData);
  mostrarModal(pokemonData);
  setTimeout(() => {
      let modal = document.getElementById("myModal");
      let pokeball = document.querySelector(".pokeball");
      pokeball.classList.add("open");
      modal.style.display = "block";
      pokeball.classList.remove("open");
      let closeButton = document.querySelector(".close");
      closeButton.addEventListener("click", (e)=>{
          modal.style.display = "none";
      })
      window.onclick = function(event) {
      if (event.target == modal) {
      modal.style.display = "none";}
      }
  }, 300);
}
function mostrarModal(poke) {
  removerModal();
  const ws = new Worker("./wsMyCards/wsMyCards.js", {type: "module"});
  let id = [];
  let count= 0;

  ws.postMessage({module: "displayModal", data: poke})
  id = ["#myModal"]
  ws.addEventListener("message", (e)=>{

  let doc = new DOMParser().parseFromString(e.data, "text/html");

  document.querySelector(id[count]).append(...doc.body.children);
  (id.length-1==0) ? ws.terminate(): count++;
  });
}

export default{
    getPokemonsPromise,
    typePokemonsPromise,
    getBusqueda,
    showHeader(){
        const wsHeaderPromise = new Promise((resolve)=>{
            const ws = new Worker("./wsMyCards/wsMyCards.js", {type: "module"});
            let id = [];
            let count= 0;
            ws.postMessage({module: "displayHeader", data: this.data})
            ws.postMessage({module: "displaySearch", data: this.data})
            id = ["#header", "#mySearch"]
            ws.addEventListener("message", (e)=>{
            
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector(id[count]).append(...doc.body.children);
            (id.length-1==0) ? ws.terminate(): count++;
            if (count == 2) {
              resolve();
            }
            });
        });
    
        wsHeaderPromise.then(() => {
            console.log("Carga completa");
            wsMyCards.accionesDeBusqueda();
            wsMyCards.busquedaPokemons();
          }).catch((error) => {
            console.error(error);
          });
    },
    ShowCards(){
            
    

        /* Apartado para el modo noche y dia*/
        
        const imageSection = document.getElementById('fondo');
        const headerSection = document.getElementById('header');
        const btnLunala = document.getElementById('btn-lunala');
        const btnSolgaleo = document.getElementById('btn-solgaleo');
        intercambio.addEventListener('click',()=>{
            panel.classList.toggle('active');
        })

        btnSolgaleo.addEventListener('click',()=>{
            imageSection.style.backgroundImage = "url('./css/fondosolgaleo.jpg')";
            headerSection.style.backgroundImage = "url('./css/ultrasol.jpg')";
            
        })

        btnLunala.addEventListener('click',()=>{
            imageSection.style.backgroundImage = "url('./css/fondolunala.jpg')";
            headerSection.style.backgroundImage = "url('./css/ultraluna.jpg')";
        })
    }
}
