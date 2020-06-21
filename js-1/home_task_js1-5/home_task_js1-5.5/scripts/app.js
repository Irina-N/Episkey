"use strict"

function generateBoard() {
        let board = "";
        for (let y = 0; y < config.rowsCount; y++) {
            board += "<tr>";
            for (let x = 0; x < config.colsCount; x++) {
                board += `<td data-x="${x}" data-y="${y}"></td>`;
            }
            board += "</tr>";
        }
        return `<table><tbody>${board}</tbody></table>`;
    }

let config = {
    rowsCount: 9,
    colsCount: 9,
};

//вставляем поле
document.querySelector("body").insertAdjacentHTML("afterbegin", generateBoard());
	
const cells = document.querySelectorAll("td");

//Расскрашиваем поле
//наверное, логика для выбора цвета ячейки сложновата, но зато компактно. 
cells.forEach(function(cell) {
		if (cell.dataset.y == 0 || cell.dataset.x == 0) {
			cell.classList.add("text");
		} else if ((cell.dataset.y - cell.dataset.x) % 2 == 0) {
			cell.classList.add("black");
		} else {
			cell.classList.add("white");
		}
	});


	
cells.forEach(function(cell) {
		const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
		if (cell.dataset.y == 0 && cell.dataset.x != 0) {
		cell.insertAdjacentHTML("afterbegin", letters[cell.dataset.x - 1]);
		}

		if (cell.dataset.x == 0 && cell.dataset.y != 0) {
		cell.insertAdjacentHTML("afterbegin", cell.dataset.y);
		}
	});

