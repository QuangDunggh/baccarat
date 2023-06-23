let tbodyDairo = document.querySelector("#tbl-dairo");
let tbodyCompact = document.querySelector("#tbl-compact");
let tbodyHollow = document.querySelector("#tbl-hollow");
let tbodyRain = document.querySelector("#tbl-rain");
let count_i = 0;
let count_j = 0;
let count_i_hollow = 0;
let count_j_hollow = 0;
let count_i_compact = 0;
let count_j_compact = 0;
let count_i_rain = 0;
let count_j_rain = 0;
let currentColumnMain = [];
let previousColumnMain = [];
let doublePreviousColumnMain = [];
let triplePreviousColumnMain = [];
let quadaPreviousColumnMain = [];
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
drawTablePlay(tbodyDairo, 12, 120, 'main');
drawTablePlay(tbodyHollow, 12, 95, 'hollow');
drawTablePlay(tbodyCompact, 12, 95, 'compact');
drawTablePlay(tbodyRain, 12, 95, 'rain');


$('#banker').on('click', (e) => {


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

    if (checkListMain(currentColumnMain, 'player')) {
        quadaPreviousColumnMain = triplePreviousColumnMain;
        triplePreviousColumnMain = doublePreviousColumnMain;
        doublePreviousColumnMain = previousColumnMain;
        previousColumnMain = currentColumnMain;
        console.log('double previous: ');
        console.log(doublePreviousColumnMain);
        console.log('previous: ');
        console.log(previousColumnMain);
        currentColumnMain = [];
        currentColumnMain.push(`banker ${count_i} ${count_j}`);

    } else {
        currentColumnMain.push(`banker ${count_i} ${count_j}`);
    }
    handleHollowTable(count_i, count_j);
    handleCompactTable(count_i, count_j);
    handleRainTable(count_i, count_j);
    // console.log('current: ' + currentColumnMain);
});

$('#player').on('click', (e) => {
    // console.log($('#player'));

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
    if (checkListMain(currentColumnMain, 'banker')) {
        quadaPreviousColumnMain = triplePreviousColumnMain;
        triplePreviousColumnMain = doublePreviousColumnMain;
        doublePreviousColumnMain = previousColumnMain;
        previousColumnMain = currentColumnMain;
        console.log('double previous: ');
        console.log(doublePreviousColumnMain);
        console.log('previous: ');
        console.log(previousColumnMain);
        currentColumnMain = [];
        currentColumnMain.push(`player ${count_i} ${count_j}`);
    } else {
        currentColumnMain.push(`player ${count_i} ${count_j}`);
    }
    handleHollowTable(count_i, count_j);
    handleCompactTable(count_i, count_j);
    handleRainTable(count_i, count_j);
    // console.log('current: ' + currentColumnMain);

});

$('#tie').on('click', (e) => {
    let previous_i = count_i;
    if (count_i != 0) {
        previous_i = count_i - 1;
    }
    let previousTd = document.querySelector(`#tr${previous_i}td${count_j}_main`);
    if (previousTd.classList.contains('banker') || previousTd.classList.contains('tieBanker')) {
        addPointToMainTable(count_i, count_j, 'tieHollow', 'tieBanker');
        count_i++;
    } else {
        addPointToMainTable(count_i, count_j, 'tieHollow', 'tiePlayer');
        count_i++;
    }


});

// HOLLOW
function handleHollowTable(count_i, count_j) {

    if (count_j == 0) {
        return;
    }

    if (count_j == 1 && count_i == 1) {
        return;
    }
    if (currentColumnMain.length == 1) {
        if (previousColumnMain.length == doublePreviousColumnMain.length) {
            let previous_i_hollow = count_i_hollow;
            if (count_i_hollow != 0) {
                previous_i_hollow = count_i_hollow - 1;
            }
            let previousTd = document.querySelector(`#tr${previous_i_hollow}td${count_j_hollow}_hollow`);
            handleAddPointToHollowTable(previousTd, 'bankerHollow', 'player', 'banker');
        } else {
            let previous_i_hollow = count_i_hollow;
            if (count_i_hollow != 0) {
                previous_i_hollow = count_i_hollow - 1;
            }
            let previousTd = document.querySelector(`#tr${previous_i_hollow}td${count_j_hollow}_hollow`);
            handleAddPointToHollowTable(previousTd, 'playerHollow', 'banker', 'player');
        }
    } else if (previousColumnMain.length >= currentColumnMain.length) {
        let previous_i_hollow = count_i_hollow;
        if (count_i_hollow != 0) {
            previous_i_hollow = count_i_hollow - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_hollow}td${count_j_hollow}_hollow`);
        handleAddPointToHollowTable(previousTd, 'bankerHollow', 'player', 'banker');
    } else if (currentColumnMain.length - previousColumnMain.length == 1) {
        let previous_i_hollow = count_i_hollow;
        if (count_i_hollow != 0) {
            previous_i_hollow = count_i_hollow - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_hollow}td${count_j_hollow}_hollow`);
        handleAddPointToHollowTable(previousTd, 'playerHollow', 'banker', 'player');
    } else {
        let previous_i_hollow = count_i_hollow;
        if (count_i_hollow != 0) {
            previous_i_hollow = count_i_hollow - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_hollow}td${count_j_hollow}_hollow`);
        handleAddPointToHollowTable(previousTd, 'bankerHollow', 'player', 'banker');
    }

}

function addPointToMainTable(count_i, count_j, stringPoint, stringPlay) {
    let td = document.querySelector(`#tr${count_i}td${count_j}_main`);
    td.innerHTML = `<div class="pointTiny">
                <span class="dotTiny ${stringPoint}"></span>
                </div>`;
    td.classList.add(stringPlay);
    td.style.padding = 0;

}

function addPointToHollowTable(count_i_hollow, count_j_hollow, stringPoint, stringPlay) {
    let td = document.querySelector(`#tr${count_i_hollow}td${count_j_hollow}_hollow`);
    td.innerHTML = `<div class="pointTiny">
                    <span class="dotTiny ${stringPoint}"></span>
                    </div>`;
    td.classList.add(stringPlay);
    td.style.padding = 0;

}

function handleAddPointToHollowTable(previousTd, stringPoint, checkStringPlay, stringPlay) {
    if (previousTd.classList.contains(checkStringPlay)) {
        count_i_hollow = 0;
        count_j_hollow += 1;
        addPointToHollowTable(count_i_hollow, count_j_hollow, stringPoint, stringPlay);
        count_i_hollow++;
    } else {
        addPointToHollowTable(count_i_hollow, count_j_hollow, stringPoint, stringPlay);
        count_i_hollow++;
    }
}

function checkListMain(list, string) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(string)) {
            return true;
        }
    }
    return false;
}

//COMPACT

function handleCompactTable(count_i, count_j) {
    if (count_j <= 1) {
        return;
    }

    if (count_j <= 2 && count_i <= 1) {
        return;
    }
    if (currentColumnMain.length == 1) {
        if (previousColumnMain.length == triplePreviousColumnMain.length) {
            let previous_i_compact = count_i_compact;
            if (count_i_compact != 0) {
                previous_i_compact = count_i_compact - 1;
            }
            let previousTd = document.querySelector(`#tr${previous_i_compact}td${count_j_compact}_compact`);
            handleAddPointToCompactTable(previousTd, 'bankerCompact', 'player', 'banker');
        } else {
            let previous_i_compact = count_i_compact;
            if (count_i_compact != 0) {
                previous_i_compact = count_i_compact - 1;
            }
            let previousTd = document.querySelector(`#tr${previous_i_compact}td${count_j_compact}_compact`);
            handleAddPointToCompactTable(previousTd, 'playerCompact', 'banker', 'player');
        }


    } else if (doublePreviousColumnMain.length >= currentColumnMain.length) {
        let previous_i_compact = count_i_compact;
        if (count_i_compact != 0) {
            previous_i_compact = count_i_compact - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_compact}td${count_j_compact}_compact`);
        handleAddPointToCompactTable(previousTd, 'bankerCompact', 'player', 'banker');
    } else if (currentColumnMain.length > doublePreviousColumnMain.length && currentColumnMain.length - doublePreviousColumnMain.length == 1) {
        let previous_i_compact = count_i_compact;
        if (count_i_compact != 0) {
            previous_i_compact = count_i_compact - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_compact}td${count_j_compact}_compact`);
        handleAddPointToCompactTable(previousTd, 'playerCompact', 'banker', 'player');
    } else {
        let previous_i_compact = count_i_compact;
        if (count_i_compact != 0) {
            previous_i_compact = count_i_compact - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_compact}td${count_j_compact}_compact`);
        handleAddPointToCompactTable(previousTd, 'bankerCompact', 'player', 'banker');
    }

}

function addPointToCompactTable(count_i_compact, count_j_compact, stringPoint, stringPlay) {
    let td = document.querySelector(`#tr${count_i_compact}td${count_j_compact}_compact`);
    td.innerHTML = `<div class="pointTiny">
                    <span class="dotTiny ${stringPoint}"></span>
                    </div>`;
    td.classList.add(stringPlay);
    td.style.padding = 0;

}

function handleAddPointToCompactTable(previousTd, stringPoint, checkStringPlay, stringPlay) {
    if (previousTd.classList.contains(checkStringPlay)) {
        count_i_compact = 0;
        count_j_compact += 1;
        addPointToCompactTable(count_i_compact, count_j_compact, stringPoint, stringPlay);
        count_i_compact++;
    } else {
        addPointToCompactTable(count_i_compact, count_j_compact, stringPoint, stringPlay);
        count_i_compact++;
    }
}

//Rain

function handleRainTable(count_i, count_j) {
    if (count_j <= 2) {
        return;
    }
    if (count_j <= 3 && count_i <= 1) {
        return;
    }
    if (currentColumnMain.length == 1) {
        if (previousColumnMain.length == quadaPreviousColumnMain.length) {
            let previous_i_rain = count_i_rain;
            if (count_i_rain != 0) {
                previous_i_rain = count_i_rain - 1;
            }
            let previousTd = document.querySelector(`#tr${previous_i_rain}td${count_j_rain}_rain`);
            handleAddPointToRainTable(previousTd, 'playerRain', 'banker', 'player');
        } else {
            let previous_i_rain = count_i_rain;
            if (count_i_rain != 0) {
                previous_i_rain = count_i_rain - 1;
            }
            let previousTd = document.querySelector(`#tr${previous_i_rain}td${count_j_rain}_rain`);
            handleAddPointToRainTable(previousTd, 'playerRain', 'banker', 'player');
        }
    } else if (triplePreviousColumnMain.length >= currentColumnMain.length) {
        let previous_i_rain = count_i_rain;
        if (count_i_rain != 0) {
            previous_i_rain = count_i_rain - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_rain}td${count_j_rain}_rain`);
        handleAddPointToRainTable(previousTd, 'bankerRain', 'player', 'banker');
    } else if (currentColumnMain.length > triplePreviousColumnMain.length && currentColumnMain.length - triplePreviousColumnMain.length == 1) {
        let previous_i_rain = count_i_rain;
        if (count_i_rain != 0) {
            previous_i_rain = count_i_rain - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_rain}td${count_j_rain}_rain`);
        handleAddPointToRainTable(previousTd, 'playerRain', 'banker', 'player');
    } else {
        let previous_i_rain = count_i_rain;
        if (count_i_rain != 0) {
            previous_i_rain = count_i_rain - 1;
        }
        let previousTd = document.querySelector(`#tr${previous_i_rain}td${count_j_rain}_rain`);
        handleAddPointToRainTable(previousTd, 'bankerRain', 'player', 'banker');
    }

}

function addPointToRainTable(count_i_rain, count_j_rain, stringPoint, stringPlay) {
    let td = document.querySelector(`#tr${count_i_rain}td${count_j_rain}_rain`);
    td.innerHTML = `<div class="pointTiny">
                    <span class="${stringPoint}">/</span>
                    </div>`;
    td.classList.add(stringPlay);
    td.style.padding = 0;

}

function handleAddPointToRainTable(previousTd, stringPoint, checkStringPlay, stringPlay) {
    if (previousTd.classList.contains(checkStringPlay)) {
        count_i_rain = 0;
        count_j_rain += 1;
        addPointToRainTable(count_i_rain, count_j_rain, stringPoint, stringPlay);
        count_i_rain++;
    } else {
        addPointToRainTable(count_i_rain, count_j_rain, stringPoint, stringPlay);
        count_i_rain++;
    }
}
