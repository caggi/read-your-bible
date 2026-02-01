document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        });
    }, observerOptions);

    items.forEach(el => io.observe(el));

    // Pequeno log (pode remover depois)
    console.log('Read Your Bible website carregado com sucesso! 📖');
});

(function () {
    // Sistema de calendário com múltiplos meses
    const now = new Date();
    const year = now.getFullYear();
    
    const calendarEl = document.getElementById("janCalendar");
    const detailEl = document.getElementById("planDetail");
    const monthBadge = document.getElementById("monthBadge");
    const monthChips = document.querySelectorAll(".month-chip");

    if (!calendarEl || !detailEl) return;

    // Estado atual
    let currentMonth = 0; // 0=Janeiro, 1=Fevereiro

    // Nomes dos meses
    const monthNames = [
        "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
        "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
    ];

    // Leituras por mês
    const readingsByMonth = {
        0: { // Janeiro
            1: { vt: "Gênesis 1–2", sl: "Salmo 1", nt: "Mateus 1–2" },
            2: { vt: "Gênesis 3–4", sl: "Salmo 2", nt: "Mateus 3–4" },
            3: { vt: "Gênesis 5–6", sl: "Salmo 3", nt: "Mateus 5" },
            4: { vt: "Gênesis 7–8", sl: "Salmo 4", nt: "Mateus 6" },
            5: { vt: "Gênesis 9–10", sl: "Salmo 5", nt: "Mateus 7" },
            6: { vt: "Gênesis 11–12", sl: "Salmo 6", nt: "Mateus 8" },
            7: { vt: "Gênesis 13–15", sl: "Salmo 7", nt: "Mateus 9" },
            8: { vt: "Gênesis 16–17", sl: "Salmo 8", nt: "Mateus 10" },
            9: { vt: "Gênesis 18–19", sl: "Salmo 9", nt: "Mateus 11" },
            10: { vt: "Gênesis 20–21", sl: "Salmo 10", nt: "Mateus 12" },
            11: { vt: "Gênesis 22–23", sl: "Salmo 11", nt: "Mateus 13" },
            12: { vt: "Gênesis 24", sl: "Salmo 12", nt: "Mateus 14" },
            13: { vt: "Gênesis 25–26", sl: "Salmo 13", nt: "Mateus 15" },
            14: { vt: "Gênesis 27", sl: "Salmo 14", nt: "Mateus 16–17" },
            15: { vt: "Gênesis 28–29", sl: "Salmo 15", nt: "Mateus 18" },
            16: { vt: "Gênesis 30", sl: "Salmo 16", nt: "Mateus 19" },
            17: { vt: "Gênesis 31", sl: "Salmo 17", nt: "Mateus 20" },
            18: { vt: "Gênesis 32–33", sl: "Salmo 18:1–24", nt: "Mateus 21" },
            19: { vt: "Gênesis 34–35", sl: "Salmo 18:25–50", nt: "Mateus 22" },
            20: { vt: "Gênesis 36", sl: "Salmo 19:1–6", nt: "Mateus 23" },
            21: { vt: "Gênesis 37–38", sl: "Salmo 19:7–14", nt: "Mateus 24" },
            22: { vt: "Gênesis 39–40", sl: "Salmo 20", nt: "Mateus 25" },
            23: { vt: "Gênesis 41", sl: "Salmo 21", nt: "Mateus 26" },
            24: { vt: "Gênesis 42–43", sl: "Salmo 22:1–18", nt: "Mateus 27" },
            25: { vt: "Gênesis 44–45", sl: "Salmo 22:19–31", nt: "Mateus 28 – Marcos 1" },
            26: { vt: "Gênesis 46–47", sl: "Salmo 23", nt: "Marcos 2" },
            27: { vt: "Gênesis 48–49", sl: "Salmo 24", nt: "Marcos 3" },
            28: { vt: "Gênesis 50 – Êxodo 1", sl: "Salmo 25", nt: "Marcos 4" },
            29: { vt: "Êxodo 2–3", sl: "Salmo 26", nt: "Marcos 5" },
            30: { vt: "Êxodo 4–5", sl: "Salmo 27", nt: "Marcos 6" },
            31: { vt: "Êxodo 6–7", sl: "Salmo 28", nt: "Marcos 7" }
        },
        1: { // Fevereiro
            1:  { vt: "Êxodo 8–9",  sl: "Salmo 29", nt: "Marcos 8" },
            2:  { vt: "Êxodo 10–11", sl: "Salmo 30", nt: "Marcos 9" },
            3:  { vt: "Êxodo 12", sl: "Salmo 31", nt: "Marcos 10" },
            4:  { vt: "Êxodo 13–14", sl: "Salmo 32", nt: "Marcos 11" },
            5:  { vt: "Êxodo 15–16", sl: "Salmo 33", nt: "Marcos 12" },
            6:  { vt: "Êxodo 17–19", sl: "Salmo 34", nt: "Marcos 13" },
            7:  { vt: "Êxodo 20–21", sl: "Salmo 35", nt: "Marcos 14" },
            8:  { vt: "Êxodo 22–23", sl: "Salmo 36", nt: "Marcos 15" },
            9:  { vt: "Êxodo 24–25", sl: "Salmo 37", nt: "Marcos 16" },
            10: { vt: "Êxodo 26–27", sl: "Salmo 37", nt: "Lucas 1" },
            11: { vt: "Êxodo 28", sl: "Salmo 38", nt: "Lucas 2" },
            12: { vt: "Êxodo 29", sl: "Salmo 39", nt: "Lucas 3" },
            13: { vt: "Êxodo 30–31", sl: "Salmo 40", nt: "Lucas 4" },
            14: { vt: "Êxodo 32–33", sl: "Salmo 41", nt: "Lucas 5" },
            15: { vt: "Êxodo 34–35", sl: "Salmo 42", nt: "Lucas 6" },
            16: { vt: "Êxodo 36–37", sl: "Salmo 43", nt: "Lucas 7" },
            17: { vt: "Êxodo 38–39", sl: "Salmo 44", nt: "Lucas 8" },
            18: { vt: "Êxodo 40 – Levítico 1", sl: "Salmo 45", nt: "Lucas 9" },
            19: { vt: "Levítico 2–4", sl: "Salmo 46", nt: "Lucas 10" },
            20: { vt: "Levítico 5–6", sl: "Salmo 47", nt: "Lucas 11" },
            21: { vt: "Levítico 7", sl: "Salmo 48", nt: "Lucas 12" },
            22: { vt: "Levítico 8–9", sl: "Salmo 49", nt: "Lucas 13" },
            23: { vt: "Levítico 10–11", sl: "Salmo 50", nt: "Lucas 14" },
            24: { vt: "Levítico 12–13", sl: "Salmo 51", nt: "Lucas 15" },
            25: { vt: "Levítico 14", sl: "Salmo 52", nt: "Lucas 16" },
            26: { vt: "Levítico 15–16", sl: "Salmo 53", nt: "Lucas 17" },
            27: { vt: "Levítico 17–18", sl: "Salmo 54", nt: "Lucas 18" },
            28: { vt: "Levítico 19–20", sl: "Salmo 55", nt: "Lucas 19" }
        }
    };


    function renderDetail(day) {
        const readings = readingsByMonth[currentMonth];
        const r = readings[day];
        const monthName = monthNames[currentMonth];
        const title = `${monthName} · Dia ${day}`;

        const body = !r
            ? `<div class="plan-detail__items muted">Leituras ainda não cadastradas para este dia.</div>`
            : `
        <div class="plan-detail__items">
            <div class="plan-item"><strong>Velho Testamento</strong><span>${r.vt}</span></div>
            <div class="plan-item"><strong>Salmo</strong><span>${r.sl}</span></div>
            <div class="plan-item"><strong>Novo Testamento</strong><span>${r.nt}</span></div>
        </div>
        `;

        detailEl.innerHTML = `
        <div class="plan-detail__title">${title}</div>

        <div class="plan-detail__body">
        ${body}
        </div>

        <div class="plan-footer muted">
        @read.your.bible · Bíblia em 365 dias
        </div>
    `;
    }


    function buildCalendar() {
        calendarEl.innerHTML = "";

        const firstDay = new Date(year, currentMonth, 1);
        const lastDay = new Date(year, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();

        // 0=Dom ... 6=Sáb
        const startDow = firstDay.getDay();

        // espaços vazios antes do dia 1
        for (let i = 0; i < startDow; i++) {
            const empty = document.createElement("div");
            empty.className = "cal__cell cal__cell--empty";
            calendarEl.appendChild(empty);
        }

        // dias 1..N
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement("button");
            cell.type = "button";
            cell.className = "cal__cell";
            cell.textContent = day;

            const isToday =
                now.getFullYear() === year &&
                now.getMonth() === currentMonth &&
                now.getDate() === day;

            if (isToday) cell.classList.add("cal__cell--today");

            cell.addEventListener("click", () => {
                const prev = calendarEl.querySelector(".cal__cell--selected");
                if (prev) prev.classList.remove("cal__cell--selected");

                cell.classList.add("cal__cell--selected");
                renderDetail(day);
            });

            calendarEl.appendChild(cell);
        }
    }

    function switchMonth(monthIndex) {
        currentMonth = monthIndex;
        
        // Atualiza badge
        if (monthBadge) {
            monthBadge.textContent = monthNames[monthIndex];
        }

        // Atualiza chips
        monthChips.forEach((chip, idx) => {
            chip.classList.toggle("is-active", idx === monthIndex);
        });

        // Reconstrói calendário
        buildCalendar();

        // Auto-seleciona dia
        const defaultDay = (now.getMonth() === currentMonth) ? now.getDate() : 1;
        const buttons = calendarEl.querySelectorAll("button.cal__cell");
        const btn = Array.from(buttons).find(b => Number(b.textContent) === defaultDay);
        if (btn) btn.click();
    }

    // Adiciona event listeners aos chips dos meses
    monthChips.forEach((chip, idx) => {
        // Só habilita Janeiro (0) e Fevereiro (1)
        if (idx <= 1) {
            chip.disabled = false;
            chip.classList.remove("is-disabled");
            chip.addEventListener("click", () => switchMonth(idx));
        }
    });

    // Inicializa com o mês atual ou Janeiro
    const initialMonth = (now.getMonth() <= 1) ? now.getMonth() : 0;
    switchMonth(initialMonth);
})();

(function () {
    const calendarView = document.getElementById("planCalendarView");
    const tableView = document.getElementById("planTableView");
    const switchButtons = document.querySelectorAll(".plan365__switch .switch-btn");

    if (!calendarView || !tableView || !switchButtons.length) return;

    function setView(view) {
        const isCalendar = view === "calendar";

        // alterna visibilidade (duplo: hidden + display)
        calendarView.hidden = !isCalendar;
        tableView.hidden = isCalendar;

        calendarView.style.display = isCalendar ? "" : "none";
        tableView.style.display = isCalendar ? "none" : "";

        // estado visual dos botões
        switchButtons.forEach(btn => {
            btn.classList.toggle("is-active", btn.dataset.view === view);
        });
    }

    switchButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            setView(btn.dataset.view);
        });
    });

    // estado inicial
    setView("calendar");
})();

// Sistema de tabela dinâmica
(function() {
    const tableContainer = document.querySelector("#planTableView .reading-plan");
    const tableBadge = document.querySelector("#planTableView .badge");
    const monthChips = document.querySelectorAll(".month-chip");

    if (!tableContainer || !tableBadge) return;

    // Estado atual
    let currentTableMonth = 0;

    // Nomes dos meses
    const monthNames = [
        "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
        "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
    ];

    // Leituras por mês (mesma estrutura do calendário)
    const readingsByMonth = {
        0: { // Janeiro
            1: { vt: "Gênesis 1–2", sl: "Salmo 1", nt: "Mateus 1–2" },
            2: { vt: "Gênesis 3–4", sl: "Salmo 2", nt: "Mateus 3–4" },
            3: { vt: "Gênesis 5–6", sl: "Salmo 3", nt: "Mateus 5" },
            4: { vt: "Gênesis 7–8", sl: "Salmo 4", nt: "Mateus 6" },
            5: { vt: "Gênesis 9–10", sl: "Salmo 5", nt: "Mateus 7" },
            6: { vt: "Gênesis 11–12", sl: "Salmo 6", nt: "Mateus 8" },
            7: { vt: "Gênesis 13–15", sl: "Salmo 7", nt: "Mateus 9" },
            8: { vt: "Gênesis 16–17", sl: "Salmo 8", nt: "Mateus 10" },
            9: { vt: "Gênesis 18–19", sl: "Salmo 9", nt: "Mateus 11" },
            10: { vt: "Gênesis 20–21", sl: "Salmo 10", nt: "Mateus 12" },
            11: { vt: "Gênesis 22–23", sl: "Salmo 11", nt: "Mateus 13" },
            12: { vt: "Gênesis 24", sl: "Salmo 12", nt: "Mateus 14" },
            13: { vt: "Gênesis 25–26", sl: "Salmo 13", nt: "Mateus 15" },
            14: { vt: "Gênesis 27", sl: "Salmo 14", nt: "Mateus 16–17" },
            15: { vt: "Gênesis 28–29", sl: "Salmo 15", nt: "Mateus 18" },
            16: { vt: "Gênesis 30", sl: "Salmo 16", nt: "Mateus 19" },
            17: { vt: "Gênesis 31", sl: "Salmo 17", nt: "Mateus 20" },
            18: { vt: "Gênesis 32–33", sl: "Salmo 18:1–24", nt: "Mateus 21" },
            19: { vt: "Gênesis 34–35", sl: "Salmo 18:25–50", nt: "Mateus 22" },
            20: { vt: "Gênesis 36", sl: "Salmo 19:1–6", nt: "Mateus 23" },
            21: { vt: "Gênesis 37–38", sl: "Salmo 19:7–14", nt: "Mateus 24" },
            22: { vt: "Gênesis 39–40", sl: "Salmo 20", nt: "Mateus 25" },
            23: { vt: "Gênesis 41", sl: "Salmo 21", nt: "Mateus 26" },
            24: { vt: "Gênesis 42–43", sl: "Salmo 22:1–18", nt: "Mateus 27" },
            25: { vt: "Gênesis 44–45", sl: "Salmo 22:19–31", nt: "Mateus 28 – Marcos 1" },
            26: { vt: "Gênesis 46–47", sl: "Salmo 23", nt: "Marcos 2" },
            27: { vt: "Gênesis 48–49", sl: "Salmo 24", nt: "Marcos 3" },
            28: { vt: "Gênesis 50 – Êxodo 1", sl: "Salmo 25", nt: "Marcos 4" },
            29: { vt: "Êxodo 2–3", sl: "Salmo 26", nt: "Marcos 5" },
            30: { vt: "Êxodo 4–5", sl: "Salmo 27", nt: "Marcos 6" },
            31: { vt: "Êxodo 6–7", sl: "Salmo 28", nt: "Marcos 7" }
        },
        1: { // Fevereiro
            1:  { vt: "Êxodo 8–9",  sl: "Salmo 29", nt: "Marcos 8" },
            2:  { vt: "Êxodo 10–11", sl: "Salmo 30", nt: "Marcos 9" },
            3:  { vt: "Êxodo 12", sl: "Salmo 31", nt: "Marcos 10" },
            4:  { vt: "Êxodo 13–14", sl: "Salmo 32", nt: "Marcos 11" },
            5:  { vt: "Êxodo 15–16", sl: "Salmo 33", nt: "Marcos 12" },
            6:  { vt: "Êxodo 17–19", sl: "Salmo 34", nt: "Marcos 13" },
            7:  { vt: "Êxodo 20–21", sl: "Salmo 35", nt: "Marcos 14" },
            8:  { vt: "Êxodo 22–23", sl: "Salmo 36", nt: "Marcos 15" },
            9:  { vt: "Êxodo 24–25", sl: "Salmo 37", nt: "Marcos 16" },
            10: { vt: "Êxodo 26–27", sl: "Salmo 37", nt: "Lucas 1" },
            11: { vt: "Êxodo 28", sl: "Salmo 38", nt: "Lucas 2" },
            12: { vt: "Êxodo 29", sl: "Salmo 39", nt: "Lucas 3" },
            13: { vt: "Êxodo 30–31", sl: "Salmo 40", nt: "Lucas 4" },
            14: { vt: "Êxodo 32–33", sl: "Salmo 41", nt: "Lucas 5" },
            15: { vt: "Êxodo 34–35", sl: "Salmo 42", nt: "Lucas 6" },
            16: { vt: "Êxodo 36–37", sl: "Salmo 43", nt: "Lucas 7" },
            17: { vt: "Êxodo 38–39", sl: "Salmo 44", nt: "Lucas 8" },
            18: { vt: "Êxodo 40 – Levítico 1", sl: "Salmo 45", nt: "Lucas 9" },
            19: { vt: "Levítico 2–4", sl: "Salmo 46", nt: "Lucas 10" },
            20: { vt: "Levítico 5–6", sl: "Salmo 47", nt: "Lucas 11" },
            21: { vt: "Levítico 7", sl: "Salmo 48", nt: "Lucas 12" },
            22: { vt: "Levítico 8–9", sl: "Salmo 49", nt: "Lucas 13" },
            23: { vt: "Levítico 10–11", sl: "Salmo 50", nt: "Lucas 14" },
            24: { vt: "Levítico 12–13", sl: "Salmo 51", nt: "Lucas 15" },
            25: { vt: "Levítico 14", sl: "Salmo 52", nt: "Lucas 16" },
            26: { vt: "Levítico 15–16", sl: "Salmo 53", nt: "Lucas 17" },
            27: { vt: "Levítico 17–18", sl: "Salmo 54", nt: "Lucas 18" },
            28: { vt: "Levítico 19–20", sl: "Salmo 55", nt: "Lucas 19" }
        }
    };

    function buildTable(monthIndex) {
        const readings = readingsByMonth[monthIndex];
        
        // Limpa o conteúdo anterior (exceto o header)
        const header = tableContainer.querySelector('.reading-plan__header');
        const footer = document.querySelector("#planTableView .plan-footer");
        
        tableContainer.innerHTML = '';
        
        // Re-adiciona o header
        tableContainer.appendChild(header);
        
        // Gera as linhas
        const now = new Date();
        const year = now.getFullYear();
        const lastDay = new Date(year, monthIndex + 1, 0).getDate();
        
        for (let day = 1; day <= lastDay; day++) {
            const r = readings[day];
            if (!r) continue;
            
            const row = document.createElement('div');
            row.className = 'reading-plan__row';
            
            // Verifica se é o dia atual
            const isToday = 
                now.getFullYear() === year &&
                now.getMonth() === monthIndex &&
                now.getDate() === day;
            
            if (isToday) {
                row.classList.add('is-today');
            }
            
            row.innerHTML = `
                <span class="day">${day}</span>
                <span>${r.vt}</span>
                <span>${r.sl}</span>
                <span>${r.nt}</span>
            `;
            
            tableContainer.appendChild(row);
        }
    }

    function switchTableMonth(monthIndex) {
        currentTableMonth = monthIndex;
        tableBadge.textContent = monthNames[monthIndex];
        buildTable(monthIndex);
    }

    // Sincroniza com os chips de mês
    monthChips.forEach((chip, idx) => {
        if (idx <= 1) { // Só Janeiro e Fevereiro habilitados
            chip.addEventListener("click", () => {
                switchTableMonth(idx);
            });
        }
    });

    // Inicializa com Janeiro
    const now = new Date();
    const initialMonth = (now.getMonth() <= 1) ? now.getMonth() : 0;
    switchTableMonth(initialMonth);
})();

