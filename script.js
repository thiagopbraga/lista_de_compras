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
        <div class="itemListRemove">
            <button class="removeItem">Remover</button>
        </div>
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
    return total;
}