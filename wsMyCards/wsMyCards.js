export let wsMyCards = {

    displayHeader(p1){
        return`
        <nav class="nav">
        <img src="./img/Pokédex_3D.png" alt="Logo Pokédex">
    
        <select id="region">
            <option value="seleciona">Selecciona una region</option>
            <option value="Kanto">Kanto</option>
            <option value="Johto">Johto</option>
            <option value="Hoenn">Hoenn</option>
            <option value="Sinnoh">Sinnoh</option>
            <option value="Teselia">Teselia</option>
            <option value="Kalos">Kalos</option>
            <option value="Alola">Alola</option>
            <option value="Galar">Galar</option>
            <option value="Hisui">Hisui</option>
            <option value="Paldea">Paldea</option>



        </select>
        <ul class="nav-list">
            
            <li class="nav-item"><button class="btn btn-header" id="ver-todos">Ver todos</button></li> 
            <li class="nav-item"><button class="btn btn-header normal" id="normal"><img src="./img/unnamed.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header fire" id="fire"><img src="./img/fire.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header water" id="water"><img src="./img/water.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header grass" id="grass"><img src="./img/grass.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header electric" id="electric"><img src="./img/electric.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header ice" id="ice"><img src="./img/ice.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header fighting" id="fighting"><img src="./img/fighting.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header poison" id="poison"><img src="./img/poison.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header ground" id="ground"><img src="./img/ground.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header flying" id="flying"><img src="./img/flying.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header psychic" id="psychic"><img src="./img/psychic.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header bug" id="bug"><img src="./img/bug.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header rock" id="rock"><img src="./img/rock.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header ghost" id="ghost"><img src="./img/ghost.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header dark" id="dark"><img src="./img/dark.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header dragon" id="dragon"><img src="./img/dragon.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header steel" id="steel"><img src="./img/acero.png" id="icon"></button></li>
            <li class="nav-item"><button class="btn btn-header fairy" id="fairy"><img src="./img/fairy.png" id="icon"></button></li>
        </ul>
    </nav>
        `
    },

    displaycards(p1){
        

        return `
        <div class="pokemon">
            <p class="pokemon-id-back">#${p1.id}</p>
            <div class="pokemon-imagen">
            <img src="${(p1.id >= 650 && p1.id <= 905) ? p1.sprites.other.home.front_default :  (p1.id <= 649 ? p1.sprites.versions["generation-v"]["black-white"].animated.front_default : p1.sprites.other["official-artwork"].front_default)}" alt="${p1.name}" width="50px">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${p1.id}</p>
                    <h2 class="pokemon-nombre">${p1.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${p1.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${(p1.height)/10}m</p>
                    <!--Dato curioso de Un friky del pokemon: la pokeApi tiene un error con el peso y altura de los pokemons, el verdadero peso se consigue al dividir la data proporcionada por la api en 10 :4-->
                    <p class="stat">${(p1.weight)/10}kg</p>
                </div>
            </div>
        <div>
        `
    }
}


self.addEventListener("message", (e)=>{
    postMessage(wsMyCards[`${e.data.module}`](e.data.data));
    
})
