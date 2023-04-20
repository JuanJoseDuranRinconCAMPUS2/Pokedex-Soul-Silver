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

                remover();
                regionValoe = region.value;

                switch (regionValoe) {
                    case "Kanto":
                            pokedexInicial = 1;
                            pokedexFinal = 151;
                            console.log("gsf");
                            calculo();

                        break;
                    case "Johto":
                            remover();
                            pokedexInicial = 152;
                            pokedexFinal = 251;
                            calculo();
                        break; 
                }
                function remover() {
                    var divPokemons = document.querySelectorAll(".pokemon");
                    console.log(divPokemons);
                    divPokemons.remove;
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
const region = document.querySelector("#region");


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