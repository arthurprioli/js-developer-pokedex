const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.querySelector('.content')
const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
            <li id=${pokemon.number} class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
    `
}

function convertPokemonToDetailLi(pokemon) {
    return `
            <div class="detail-content ${pokemon.type}">
                <div class="main-info">
                    <div class="identification">
                        <h1 class="name">${pokemon.name}</h1>
                        <span class="number">#${pokemon.number}</span>
                    </div>
                    <ul class="detail-types">
                        ${pokemon.types.map((type) => `<li class="detail-type ${type}">${type}</li>`).join('')}
                    </ul>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>

                <div class="details">
                    <h2>About</h2>
                    <ul class="data">
                        <li>Species <span class="info">${pokemon.species}</span></li>
                        <li>Height <span class="info">${pokemon.height} ft</span></li>
                        <li>Weight <span class="info">${pokemon.weight} lbs</span></li>
                        <li>Abilities <span class="info">${pokemon.abilities.map((ability) => ` ${ability}`)}</span></li>
                    </ul>
                </div>
            </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonList.addEventListener("click", (e) => {
    const selecionado = e.target.closest('.pokemon');
    if (selecionado) { 
        pokeApi.getPokemonById(selecionado.id).then((pokeDetail) => {
            content.innerHTML = convertPokemonToDetailLi(pokeDetail);
        });
    }
})