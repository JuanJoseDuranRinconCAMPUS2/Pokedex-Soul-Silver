let URL = "https://pokeapi.co/api/v2/pokemon/";
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
                                calculo();
                            }, 100);
                    break;
                    case "Johto":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 152;
                                pokedexFinal = 251;
                                calculo();
                            }, 100);   
                    break;
                    case "Hoenn":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 252;
                                pokedexFinal = 386;
                                calculo();
                            }, 100);      
                    break;
                     case "Sinnoh":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 387;
                                pokedexFinal = 493;
                                calculo();
                            }, 100);
                     break; 
                     case "Teselia":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 494;
                                pokedexFinal = 649;
                                calculo();
                            }, 100);
                     break;
                     case "Kalos":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 650;
                                pokedexFinal = 721;
                                calculo();
                            }, 100);
                     break; 
                     case "Alola":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 722;
                                pokedexFinal = 809;
                                calculo();
                            }, 100);
                     break;
                     case "Galar":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 810;
                                pokedexFinal = 898;
                                calculo();
                            }, 100);
                     break;
                     case "Hisui":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 899;
                                pokedexFinal = 905;
                                calculo();
                            }, 100);
                     break;
                     case "Paldea":
                        remover();
                            setTimeout(() => {
                                pokedexInicial = 906;
                                pokedexFinal = 1009;
                                calculo();
                            }, 100);
                     break;
                }
                function remover() {
                    var divPokemons = document.querySelectorAll(".pokemon");
                    for (var i = 0; i < divPokemons.length; i++) {
                        divPokemons[i].remove();
                      }
                };
            })
          }, 500);
          function calculo() {

            for (let i = pokedexInicial; i <= pokedexFinal; i++) {
                fetch(URL + i)
                    .then((response) => response.json())
                    .then(data => mostrarPokemon(data))
            }
        };

        
        
        function mostrarPokemon(poke) {
            console.log(poke);
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



const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

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