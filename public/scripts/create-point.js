// console.log("Hello")

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //Função anônima que está retornando um valor
    .then( states => {

        states.sort((estadoA, estadoB) => estadoA.nome.localeCompare(estadoB.nome))

        states.forEach(state => {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            
        });

    })
}

populateUFs();

//Pegando o Evento AddEventListener
function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    //console.log(event.target);.value

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    // console.log(indexOfSelectedState)
    stateInput.value = event.target.options[indexOfSelectedState].text
    // console.log(stateInput)

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) //Função anônima que está retornando um valor
    .then( cities => {
        
        cities.forEach(city => {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        })
            
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    ?.addEventListener("change", getCities) //Passando por referencia, sem (), apenas quando mudar, será executada

    // Itens de coleta
    // Pegar todos os li's
    const itensToCollect = document.querySelectorAll(".itens-grid li")

    for(const item of itensToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=items]")
    // Itens selecionados para enviar pelo form 
    let selectedItems = []

    // Toda vez que o evento é disparado, para para essa função o parâmetro event
    function handleSelectedItem(event){
        const itemLi = event.target

        // Adicionar ou remover uma classe com JavaScript com toggle
        itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id;

        
        // verificar se existem itens selecionados, se sim
        // pegar os itens selecionados
        const alreadySelected = selectedItems.findIndex( item => {
            const itemFound = item == itemId; //Isso será true ou false
            return itemFound;
        });

        // se já estiver selecionado, remover da seleção
        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter( item => {
                const itemIsDifferent = item != itemId; // False
                return itemIsDifferent;
            });

            selectedItems = filteredItems;
        }else{
            // se não estiver selecionado, adicionar seleção
            selectedItems.push(itemId)
        }
        
        // console.log(selectedItems)
        // atualizar o campo escondido com os itens selecionados
        // document.querySelector("input[name=items]")
        collectedItems.value = selectedItems;
    }