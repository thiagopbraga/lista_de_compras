const newOneOnList = document.querySelector('#newOneOnList');
const lista = document.querySelector('#list');
const valorTotal = document.querySelector('.valorTotal');
const form = document.querySelector('form');
const calcular = document.querySelector('.calcular');

/* adicionar item na lista */
const addItem = () => {
    /* prevent default form */
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    const item = document.createElement('div');
    item.classList.add('rowDivList');
    item.innerHTML = `
        <div class="itemListName">
            ${newOneOnList.value}
        </div>
        <div class="itemList">
            <input type="number" placeholder="Quantidade..." class="qntItemListValue">
            <input type="number" placeholder="Valor..." class="itemListValue">
        </div>
        <button class="removeItem" onclick="removeItemFromList(${document.querySelectorAll('.rowDivList').length})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg></button>
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
        total += Number(document.querySelectorAll('.itemListValue')[i].value * document.querySelectorAll('.qntItemListValue')[i].value);
    }
    valorTotal.innerHTML = parseFloat(total).toFixed(2);
    saveList();
    return total;
}

/* salvar lista em localStorage */
const saveList = () => {
    let list = [];
    for (let i = 0; i < document.querySelectorAll('.itemListName').length; i++) {
        list.push({
            name: document.querySelectorAll('.itemListName')[i].innerHTML,
            quant: document.querySelectorAll('.qntItemListValue')[i].value,
            value: document.querySelectorAll('.itemListValue')[i].value
        });
    }
    console.log(list.length)
    document.addEventListener('click', () => {
        if(list == null || list.length == 0) {
            calcular.innerHTML = 'Salvar';
        } else {
            calcular.innerHTML = 'Calcular';
        }
    })
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
            <div class="itemList">
                <input type="number"value="${list[i].quant}" class="qntItemListValue">
                <input type="number" value="${list[i].value}"class="itemListValue">
            </div>
            <button class="removeItem" onclick="removeItemFromList(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg></button>
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
    localStorage.setItem('list', JSON.stringify(list));
    clearList();
    loadList();
    calcValorTotal();
}

/* verificar se existe lista no localStorage */
if (localStorage.getItem('list')) {
    loadList();
    calcValorTotal();
}

/* guardar compra para criar outra compra */

const saveCompra = () => {
    nomeCompra = prompt('Nome da compra');
    let compra = {
        list: JSON.parse(localStorage.getItem('list')),
        total: valorTotal.innerHTML
    }
    localStorage.setItem(nomeCompra, JSON.stringify(compra));
    clearList();
}
