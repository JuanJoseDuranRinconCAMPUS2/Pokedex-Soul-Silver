let pokedexInicial = 0;
let pokedexFinal = 0;
const remover = function remover() {
    var divPokemons = document.querySelectorAll(".pokemon");
    for (var i = 0; i < divPokemons.length; i++) {
        divPokemons[i].remove();
      }
}
const cooldownRegion = function cooldownRegion() {setTimeout(() => {region.disabled = false;}, 5000)};
const cooldownElemental = function cooldownElemental(boton) {setTimeout(() => {boton.disabled = false;}, 5000)};
const desactivateElemental = function desactivateElemental(botonesHeader) {botonesHeader.forEach((boton) => {boton.disabled = true;setTimeout(() => {cooldownElemental(boton); }, 100);});
}
export default{
    showHeader(){
        const ws = new Worker("./wsMyCards/wsMyCards.js", {type: "module"});
        let id = [];
        let count= 0;
        ws.postMessage({module: "displayHeader", data: this.data})
        id = ["#header"]
        ws.addEventListener("message", (e)=>{
        
        let doc = new DOMParser().parseFromString(e.data, "text/html");
        document.querySelector(id[count]).append(...doc.body.children);
        (id.length-1==0) ? ws.terminate(): count++;
        });
    },
    ShowCards(){
        
        setTimeout(() => {
            const region = document.querySelector("#region");
            const botonesHeader = document.querySelectorAll(".btn-header");
            var regionValoe = region.value;
            addEventListener("change", (e)=>{ 
                regionValoe = region.value;
                switch (regionValoe) {
                    
                    case "Kanto":
                            remover();
                            setTimeout(() => {
                                pokedexInicial = 1;
                                pokedexFinal = 151;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);
                    break;
                    case "Johto":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 152;
                                pokedexFinal = 251;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);   
                    break;
                    case "Hoenn":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 252;
                                pokedexFinal = 386;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);      
                    break;
                     case "Sinnoh":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 387;
                                pokedexFinal = 493;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);
                     break; 
                     case "Teselia":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 494;
                                pokedexFinal = 649;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);
                     break;
                     case "Kalos":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 650;
                                pokedexFinal = 721;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);
                     break; 
                     case "Alola":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 722;
                                pokedexFinal = 809;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);
                     break;
                     case "Galar":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 810;
                                pokedexFinal = 898;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);
                     break;
                     case "Hisui":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 899;
                                pokedexFinal = 905;
                                getPokemons(pokedexInicial, pokedexFinal);
                                region.disabled = false;
                                desactivateElemental(botonesHeader);
                            }, 0);
                     break;
                     case "Paldea":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 906;
                                pokedexFinal = 1009;
                                getPokemons(pokedexInicial, pokedexFinal);
                                cooldownRegion();
                                desactivateElemental(botonesHeader);
                            }, 0);
                     break;
                }
                region.disabled = true;
                
            })
            
            botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
                
                const botonId = event.currentTarget.id;
                botonesHeader.forEach((boton) => {
                    boton.disabled = true;
                    region.disabled = true;
                    setTimeout(() => {
                        cooldownElemental(boton);  
                        
                    }, 100);
                  });
                remover();
                setTimeout(() => {
                    typePokemons(pokedexInicial, pokedexFinal, botonId);
                    cooldownRegion();         
                }, 100);
            
               
            }))

                
                const mybusqueda = document.querySelector("#busqueda");
                mybusqueda.addEventListener("submit",(e)=>{
                    e.preventDefault();
                    remover();
                    let data = Object.fromEntries(new FormData(e.target));
                    getBusqueda(data.pokemonSelect);
                    cooldownRegion();
                    
                });
                
          }, 90);
         

            async function getPokemons(pokedexInicial, pokedexFinal) {
                const URL = "https://pokeapi.co/api/v2/pokemon/";
                for (let i = pokedexInicial; i <= pokedexFinal; i++) {
                  const response = await fetch(URL + i);
                  const data = await response.json();
                  mostrarPokemon(data);
                }
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
                  mostrarPokemon(data);
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






