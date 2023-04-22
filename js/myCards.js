let pokedexInicial = 0;
let pokedexFinal = 0;

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
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);
                    break;
                    case "Johto":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 152;
                                pokedexFinal = 251;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);   
                    break;
                    case "Hoenn":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 252;
                                pokedexFinal = 386;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);      
                    break;
                     case "Sinnoh":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 387;
                                pokedexFinal = 493;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);
                     break; 
                     case "Teselia":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 494;
                                pokedexFinal = 649;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);
                     break;
                     case "Kalos":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 650;
                                pokedexFinal = 721;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);
                     break; 
                     case "Alola":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 722;
                                pokedexFinal = 809;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);
                     break;
                     case "Galar":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 810;
                                pokedexFinal = 898;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);
                     break;
                     case "Hisui":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 899;
                                pokedexFinal = 905;
                                getPokemons(pokedexInicial, pokedexFinal);
                                region.disabled = false;
                            }, 100);
                     break;
                     case "Paldea":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 906;
                                pokedexFinal = 1009;
                                getPokemons(pokedexInicial, pokedexFinal);
                                setTimeout(() => {region.disabled = false;}, 3000);
                            }, 100);
                     break;
                }
                region.disabled = true;
                function remover() {
                    var divPokemons = document.querySelectorAll(".pokemon");
                    for (var i = 0; i < divPokemons.length; i++) {
                        divPokemons[i].remove();
                      }
                };
            })
          }, 300);
         

            async function getPokemons(pokedexInicial, pokedexFinal) {
                const URL = "https://pokeapi.co/api/v2/pokemon/";
                for (let i = pokedexInicial; i <= pokedexFinal; i++) {
                  const response = await fetch(URL + i);
                  const data = await response.json();
                  mostrarPokemon(data);
                }
              }
        
        
        function mostrarPokemon(poke) {
            let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
            tipos = tipos.join('');

        
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
        
       
    } 
       
}



const botonesHeader = document.querySelectorAll(".btn-header");


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    console.log(boton);
    listaPokemon.innerHTML = "";

    for (let i = 494; i <= 649; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))