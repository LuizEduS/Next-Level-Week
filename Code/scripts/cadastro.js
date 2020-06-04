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
    const stateinput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text



    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    cityselect.innerHTML = ""
    
    cityselect.disabled = true
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

 // itens de coleta 

const collectedItems = document.querySelector("input[name=items]")

 let selectedItems = []
 const itemscoleta = document.querySelectorAll(".itensgrid li")
 for (const item of itemscoleta){
     item.addEventListener("click",handleSelectedItem)
 }

 function handleSelectedItem(event){
     const itemli = event.target
     itemli.classList.toggle("selected")
     const itemid = itemli.id

     const alreadyselected = selectedItems.findIndex(function(item){
        const itemfound = item == itemid
        return itemfound

     })

     if (alreadyselected >= 0){
         const filtereditens = selectedItems.filter(function(item){
            const itemisdifferent = item != itemid
            return itemisdifferent
         })
         selectedItems = filtereditens
     } else{
         selectedItems.push(itemid)
     }
     collectedItems = selectedItems
}