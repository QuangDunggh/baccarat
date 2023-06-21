let tbodyDairo = document.querySelector("#tbl-dairo");
let tbodyCompact = document.querySelector("#tbl-compact");
let tbodyHorrow = document.querySelector("#tbl-horrow");
let tbodyRain = document.querySelector("#tbl-rain");
// console.log(tbodyDairo);
function drawTablePlay(idElement, trQuantity, tdQuantity) {
    for (let i = 0; i < trQuantity; i++) {
        let tr = document.createElement('tr');
        for (let i = 0; i < tdQuantity; i++) {
            let td = document.createElement('td');
            td.classList.add('td-hover')
            tr.appendChild(td);
        }
        idElement.appendChild(tr);
    }
}
console.log($('#tbl-dairo'));
drawTablePlay(tbodyDairo, 6 , 95);
drawTablePlay(tbodyCompact, 6 , 95);
drawTablePlay(tbodyHorrow, 6 , 95);
drawTablePlay(tbodyRain, 6 , 95);


$('#banker').on('click', () => {
    console.log($('#banker'));
});
