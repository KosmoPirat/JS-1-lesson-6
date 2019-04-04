"use strict";

let ticTakToe = {
    gameTableElement: document.getElementById('game'),
    mapValues: [],
    phase: 'X',
    status: 'playing',
    dificle: 5,

    generateMapValues() {
      for(let i = 0; i < this.dificle; i++) {
          this.mapValues[i] = new Array(this.dificle).fill('');
      }
    },

    init() {
        this.generateMapValues();
        this.renderMap();
        this.initEventHandlers();
    },

    renderMap() {
        for (let row = 0; row < this.dificle; row++) {
            // Создаем линию.
            const tr = document.createElement('tr');
            // Добавляем линию в таблицу.
            this.gameTableElement.appendChild(tr);
            // Пробегаемся по всем колонкам.
            for (let col = 0; col < this.dificle; col++) {
                // Создаем колонку.
                let td = document.createElement('td');
                // Добавляем в data-аттрибуты данные с номерами этой ячейки.
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                // Добавляем колонку в линию.
                tr.appendChild(td);
            }
        }
    },
    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }
        this.fillCell(event);
        if (this.hasWon()) {
            this.setStatusStopped();
            this.sayWonPhrase();
        }

        this.togglePhase();
    },

    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    },

    setStatusStopped() {
        this.status = 'stopped';
    },

    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    },

    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    isCorrectClick(event) {
        return this.isStatusPlaying(event) && this.isClickByCell(event) && this.isCellEmpty(event);
    },

    isStatusPlaying() {
        return this.status === 'playing';
    },

    isClickByCell(event) {
        return event.target.tagName === 'TD';
    },

    isCellEmpty(event) {
        // Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapValues[row][col] === '';
    },

    hasWon() {
        let rows = new Array(this.dificle).fill('');
        let cols = new Array(this.dificle).fill('');
        let cross = new Array(2).fill('');
        for (let i = 0; i < this.dificle; i++) {
            cross[0] += this.mapValues[i][i];
            cross[1] += this.mapValues[this.dificle - 1 - i][i];
            for (let j = 0; j < this.dificle; j++) {
                cols[i] += this.mapValues[j][i];
                rows[i] += this.mapValues[i][j];
            }
        }

        return rows.some(this.isLineWon) || cols.some(this.isLineWon) || cross.some(this.isLineWon);
    },

    isLineWon(str) {
        let winX = '';
        let winO = '';
        for (let i = 0; i < ticTakToe.dificle; i++) {
            winX += 'X';
            winO += '0';
        }
        return winX === str || winO === str;
    },
};

window.addEventListener('onload', ticTakToe.init());

