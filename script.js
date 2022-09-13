const newOneOnList = document.querySelector('#newOneOnList');
const lista = document.querySelector('#list');
const valorTotal = document.querySelector('.valorTotal');

/* adicionar item na lista */
const addItem = () => {
    const item = document.createElement('div');
    item.classList.add('rowDivList');
    item.innerHTML = `
        <div class="itemListName">
            ${newOneOnList.value}
        </div>
        <input type="number" placeholder="Valor..." class="itemListValue">
        <button class="removeItem" onclick="removeItemFromList(${document.querySelectorAll('.rowDivList').length})">Remover</button>
    `;
    lista.appendChild(item);
    newOneOnList.value = null;
}

const rowDivList = document.querySelectorAll('.rowDivList');
const itemListValue = document.querySelectorAll('.itemListValue');

/* calcular valor total */
const calcValorTotal = () => {
    let total = 0;
    for (let i = 0; i < document.querySelectorAll('.itemListValue').length; i++) {
        total += Number(document.querySelectorAll('.itemListValue')[i].value);
    }
    valorTotal.innerHTML = total;
    saveList();
    return total;
}

/* salvar lista em localStorage */
const saveList = () => {
    let list = [];
    for (let i = 0; i < document.querySelectorAll('.itemListName').length; i++) {
        list.push({
            name: document.querySelectorAll('.itemListName')[i].innerHTML,
            value: document.querySelectorAll('.itemListValue')[i].value
        });
    }
    console.log(list)
    localStorage.setItem('list', JSON.stringify(list));
}

/* carregar lista do localStorage */
const loadList = () => {
    let list = JSON.parse(localStorage.getItem('list'));
    for (let i = 0; i < list.length; i++) {
        const item = document.createElement('div');
        item.classList.add('rowDivList');
        item.innerHTML = `
            <div class="itemListName">
                ${list[i].name}
            </div>
            <input type="number" value="${list[i].value}" class="itemListValue">
            <button class="removeItem" onclick="removeItemFromList(${i})">Remover</button>
        `;
        lista.appendChild(item);
    }
}

/* limpar lista */
const clearList = () => {
    lista.innerHTML = '';
    valorTotal.innerHTML = '0';
}

/* remover item da lista no localStorage */
const removeItemFromList = (index) => {
    let list = JSON.parse(localStorage.getItem('list'));
    list.splice(index, 1);
    localStorage.setItem('list', null);
    localStorage.setItem('list', JSON.stringify(list));
    lista.innerHTML = '';
    loadList();
    calcValorTotal();
}

/* verificar se existe lista no localStorage */
if (localStorage.getItem('list')) {
    loadList();
}