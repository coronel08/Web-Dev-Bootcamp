let baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const container = document.querySelector('.container')


for (let i = 1; i <= 151; i++){
    const pokemon = document.createElement('div')
    pokemon.classList.add('pokemonz')
    const label = document.createElement('span')
    label.innerHTML = `#${i}`
    const newImg = document.createElement('img')
    newImg.src = `${baseUrl}${i}.png`
    pokemon.append(newImg, label)
    container.appendChild(pokemon)
}