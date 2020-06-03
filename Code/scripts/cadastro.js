function populateUFs(){
    const ufselect = document.querySelector("select[name=uf]")
    //encontra o select[name=uf] no HTML
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //Buscou os Estados

    .then(res => res.json() )
    //tTransformou em .Json

    .then( states => {
        for (const state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}
    // Estrutura de repetição para adicionar no html

populateUFs()
// Executa a função 

function getCities(event){
    const cityselect = document.querySelector("select[name=city]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
    //Buscou os Estados

    .then(res => res.json() )
    //Transformou em .Json

    .then( cities => {
        for (const city of cities){
            cityselect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        cityselect.disabled = false
    } )

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)