let tbodyDairo = document.querySelector("#tbl-dairo");
let tbodyCompact = document.querySelector("#tbl-compact");
let tbodyHollow = document.querySelector("#tbl-hollow");
let tbodyRain = document.querySelector("#tbl-rain");
let count_i = 0;
let count_j = 0;
let count_i_hollow = 0;
let count_j_hollow = 0;
let currentColumnMain = [];
let currentColumnHollow = [];
let currentColumnCompact = [];
let currentColumnRain = [];
// console.log(tbodyDairo);
function drawTablePlay(idElement, trQuantity, tdQuantity, nameTable) {
    for (let i = 0; i < trQuantity; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < tdQuantity; j++) {
            let td = document.createElement('td');
            td.classList.add('td-hover');
            td.setAttribute('id', `tr${i}td${j}_${nameTable}`);
            td.style.width = 15;
            td.style.height = 15;
            tr.appendChild(td);
        }
        idElement.appendChild(tr);
    }
}
// console.log($('#tbl-dairo'));
drawTablePlay(tbodyDairo, 10, 120, 'main');
drawTablePlay(tbodyHollow, 6, 95, 'hollow');
drawTablePlay(tbodyCompact, 6, 95, 'compact');
drawTablePlay(tbodyRain, 6, 95, 'rain');


$('#banker').on('click', (e) => {
    addPointToHollowTable(count_i, count_j);

    let previous_i = count_i;
    if (count_i != 0) {
        previous_i = count_i - 1;
    }
    let previousTd = document.querySelector(`#tr${previous_i}td${count_j}_main`);
    if (previousTd.classList.contains('player') || previousTd.classList.contains('tiePlayer')) {
        count_i = 0;
        count_j++;
        addPointToMainTable(count_i, count_j, 'bankerHollow', 'banker');
        count_i++;
    } else {
        addPointToMainTable(count_i, count_j, 'bankerHollow', 'banker');
        count_i++;
    }

    if (currentColumnMain.includes('player')) {
        currentColumnMain = [];
        currentColumnMain.push(`banker_${count_i}_${count_j}`);

    } else {
        currentColumnMain.push(`banker_${count_i}_${count_j}`);
    }
    console.log(currentColumnMain);
});

$('#player').on('click', (e) => {
    // console.log($('#player'));
    addPointToHollowTable(count_i, count_j);

    let previous_i = count_i;
    if (count_i != 0) {
        previous_i = count_i - 1;
    }
    let previousTd = document.querySelector(`#tr${previous_i}td${count_j}_main`);
    if (previousTd.classList.contains('banker') || previousTd.classList.contains('tieBanker')) {
        count_i = 0;
        count_j++;
        addPointToMainTable(count_i, count_j, 'playerHollow', 'player');
        count_i++;
    } else {
        addPointToMainTable(count_i, count_j, 'playerHollow', 'player');
        count_i++;
    }
    if (currentColumnMain.includes('banker')) {
        currentColumnMain = [];
        currentColumnMain.push(`player_${count_i}_${count_j}`);

    } else {
        currentColumnMain.push(`player_${count_i}_${count_j}`);
    }
    console.log(currentColumnMain);

});

$('#tie').on('click', (e) => {
    let previous_i = count_i;
    if (count_i != 0) {
        previous_i = count_i - 1;
    }
    let previousTd = document.querySelector(`#tr${previous_i}td${count_j}_main`);
    if (previousTd.classList.contains('banker')) {
        addPointToMainTable(count_i, count_j, 'tieHollow', 'tieBanker');
        count_i++;
    } else {
        addPointToMainTable(count_i, count_j, 'tieHollow', 'tiePlayer');
        count_i++;
    }


});

function addPointToHollowTable(count_i, count_j) {
    console.log(count_i + '' + count_j);
    if (count_j == 0) {
        return;
    }

    if (count_j == 1 && count_i == 0) {
        return;
    }

    let td = document.querySelector(`#tr${count_i_hollow}td${count_j_hollow}_hollow`);
    td.innerHTML = `<div class="pointTiny">
                    <span class="dotHollow bankerHollow"></span>
                    </div>`;
    count_i_hollow++;
    td.style.padding = 0;
}

function addPointToMainTable(count_i, count_j, stringPoint, stringPlay) {
    let td = document.querySelector(`#tr${count_i}td${count_j}_main`);
    td.innerHTML = `<div class="pointTiny">
                <span class="dotHollow ${stringPoint}"></span>
                </div>`;
    td.classList.add(stringPlay);
    td.style.padding = 0;

}
