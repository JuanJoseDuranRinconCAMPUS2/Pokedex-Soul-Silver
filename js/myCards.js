let URL = "https://pokeapi.co/api/v2/pokemon/";




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
            let regionValoe = region.value
            console.log(regionValoe)
            for (let i = 494; i <= 649; i++) {
                fetch(URL + i)
                    .then((response) => response.json())
                    .then(data => mostrarPokemon(data))
            }
          }, 500);
        
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