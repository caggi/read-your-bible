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
    let currentMonth = 0; // 0=Janeiro, 1=Fevereiro, 2=Março, 3=Abril, etc.

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
        },
        2: { // Março
            1:  { vt: "Levítico 21–22", sl: "Salmo 56", nt: "Lucas 20", verse: "Em Deus ponho a minha confiança e não temerei.", ref: "Salmo 56:11" },
            2:  { vt: "Levítico 23–24", sl: "Salmo 57", nt: "Lucas 21", verse: "Sê exaltado, ó Deus, acima dos céus.", ref: "Salmo 57:5" },
            3:  { vt: "Levítico 25", sl: "Salmo 58", nt: "Lucas 22", verse: "O justo se alegrará quando vir a vingança.", ref: "Salmo 58:10" },
            4:  { vt: "Levítico 26", sl: "Salmo 59", nt: "Lucas 23", verse: "Deus é o meu alto refúgio.", ref: "Salmo 59:9" },
            5:  { vt: "Levítico 27", sl: "Salmo 60", nt: "Lucas 24", verse: "Dá-nos auxílio contra o adversário.", ref: "Salmo 60:11" },
            6:  { vt: "Números 1", sl: "Salmo 61", nt: "João 1", verse: "Leva-me para a rocha que é mais alta do que eu.", ref: "Salmo 61:2" },
            7:  { vt: "Números 2", sl: "Salmo 62", nt: "João 2", verse: "Só em Deus espera, ó minha alma.", ref: "Salmo 62:5" },
            8:  { vt: "Números 3", sl: "Salmo 63", nt: "João 3", verse: "A minha alma tem sede de ti.", ref: "Salmo 63:1" },
            9:  { vt: "Números 4", sl: "Salmo 64", nt: "João 4", verse: "O justo se alegrará no Senhor.", ref: "Salmo 64:10" },
            10: { vt: "Números 5–6", sl: "Salmo 65", nt: "João 5", verse: "Tu ouves a oração.", ref: "Salmo 65:2" },
            11: { vt: "Números 7", sl: "Salmo 66", nt: "João 6", verse: "Bendito seja Deus, que não rejeitou a minha oração.", ref: "Salmo 66:20" },
            12: { vt: "Números 8–9", sl: "Salmo 67", nt: "João 7", verse: "Deus tenha misericórdia de nós e nos abençoe.", ref: "Salmo 67:1" },
            13: { vt: "Números 10–11", sl: "Salmo 68:1-18", nt: "João 8", verse: "Levante-se Deus, e sejam dissipados os seus inimigos.", ref: "Salmo 68:1" },
            14: { vt: "Números 12–13", sl: "Salmo 68:19-36", nt: "João 9", verse: "Bendito seja o Senhor, que de dia em dia nos carrega de benefícios.", ref: "Salmo 68:19" },
            15: { vt: "Números 14", sl: "Salmo 69:1-18", nt: "João 10", verse: "Salva-me, ó Deus, porque as águas entraram até à minha alma.", ref: "Salmo 69:1" },
            16: { vt: "Números 15", sl: "Salmo 69:19-36", nt: "João 11", verse: "Louvarei o nome de Deus com cântico.", ref: "Salmo 69:30" },
            17: { vt: "Números 16", sl: "Salmo 70", nt: "João 12", verse: "Apressa-te, ó Deus, em me livrar.", ref: "Salmo 70:1" },
            18: { vt: "Números 17–18", sl: "Salmo 71", nt: "João 13", verse: "Em ti, Senhor, confio.", ref: "Salmo 71:1" },
            19: { vt: "Números 19–20", sl: "Salmo 72", nt: "João 14", verse: "Bendito seja o Senhor Deus, o Deus de Israel.", ref: "Salmo 72:18" },
            20: { vt: "Números 21–22", sl: "Salmo 73", nt: "João 15", verse: "Quanto a mim, bom é aproximar-me de Deus.", ref: "Salmo 73:28" },
            21: { vt: "Números 23–24", sl: "Salmo 74", nt: "João 16", verse: "Levanta-te, ó Deus, pleiteia a tua causa.", ref: "Salmo 74:22" },
            22: { vt: "Números 25–26", sl: "Salmo 75", nt: "João 17", verse: "Exaltarei o teu nome, porque está perto.", ref: "Salmo 75:1" },
            23: { vt: "Números 27–28", sl: "Salmo 76", nt: "João 18", verse: "Tu és tremendo.", ref: "Salmo 76:7" },
            24: { vt: "Números 29–30", sl: "Salmo 77", nt: "João 19", verse: "Lembro-me das obras do Senhor.", ref: "Salmo 77:11" },
            25: { vt: "Números 31", sl: "Salmo 78:1-39", nt: "João 20", verse: "Contaremos à geração vindoura os louvores do Senhor.", ref: "Salmo 78:4" },
            26: { vt: "Números 32", sl: "Salmo 78:40-72", nt: "João 21 – Atos 1", verse: "Escolheu a Davi, seu servo.", ref: "Salmo 78:70" },
            27: { vt: "Números 33", sl: "Salmo 79", nt: "Atos 2", verse: "Ajuda-nos, ó Deus da nossa salvação.", ref: "Salmo 79:9" },
            28: { vt: "Números 34–35", sl: "Salmo 80", nt: "Atos 3", verse: "Restaura-nos, ó Deus.", ref: "Salmo 80:3" },
            29: { vt: "Números 36 – Deuteronômio 1", sl: "Salmo 81", nt: "Atos 4", verse: "Eu sou o Senhor teu Deus.", ref: "Salmo 81:10" },
            30: { vt: "Deuteronômio 2–3", sl: "Salmo 82", nt: "Atos 5", verse: "Levanta-te, ó Deus, julga a terra.", ref: "Salmo 82:8" },
            31: { vt: "Deuteronômio 4", sl: "Salmo 83", nt: "Atos 6", verse: "Não te cales, ó Deus.", ref: "Salmo 83:1" }
        },
        3: { // Abril
            1:  { vt: "Deuteronômio 5–6", sl: "Salmo 84", nt: "Atos 7", verse: "Quão amáveis são os teus tabernáculos, Senhor.", ref: "Salmo 84:1" },
            2:  { vt: "Deuteronômio 7–8", sl: "Salmo 85", nt: "Atos 8", verse: "Mostra-nos, Senhor, a tua misericórdia.", ref: "Salmo 85:7" },
            3:  { vt: "Deuteronômio 9–10", sl: "Salmo 86", nt: "Atos 9", verse: "Ensina-me o teu caminho, Senhor.", ref: "Salmo 86:11" },
            4:  { vt: "Deuteronômio 11–12", sl: "Salmo 87", nt: "Atos 10", verse: "O Senhor ama as portas de Sião.", ref: "Salmo 87:2" },
            5:  { vt: "Deuteronômio 13–14", sl: "Salmo 88", nt: "Atos 11", verse: "Chegue à tua presença a minha oração.", ref: "Salmo 88:2" },
            6:  { vt: "Deuteronômio 15–17", sl: "Salmo 89:1–29", nt: "Atos 12", verse: "Cantarei para sempre as misericórdias do Senhor.", ref: "Salmo 89:1" },
            7:  { vt: "Deuteronômio 18–20", sl: "Salmo 89:30–52", nt: "Atos 13", verse: "Bem-aventurado o povo que conhece o som festivo.", ref: "Salmo 89:15" },
            8:  { vt: "Deuteronômio 21–22", sl: "Salmo 90", nt: "Atos 14", verse: "Ensina-nos a contar os nossos dias.", ref: "Salmo 90:12" },
            9:  { vt: "Deuteronômio 23–24", sl: "Salmo 91", nt: "Atos 15", verse: "Aquele que habita no esconderijo do Altíssimo.", ref: "Salmo 91:1" },
            10: { vt: "Deuteronômio 25–27", sl: "Salmo 92", nt: "Atos 16", verse: "Bom é render graças ao Senhor.", ref: "Salmo 92:1" },
            11: { vt: "Deuteronômio 28", sl: "Salmo 93", nt: "Atos 17", verse: "O Senhor reina, está vestido de majestade.", ref: "Salmo 93:1" },
            12: { vt: "Deuteronômio 29–30", sl: "Salmo 94", nt: "Atos 18", verse: "O Senhor não desampara o seu povo.", ref: "Salmo 94:14" },
            13: { vt: "Deuteronômio 31", sl: "Salmo 95", nt: "Atos 19", verse: "Vinde, cantemos ao Senhor.", ref: "Salmo 95:1" },
            14: { vt: "Deuteronômio 32", sl: "Salmo 96", nt: "Atos 20", verse: "Cantai ao Senhor um cântico novo.", ref: "Salmo 96:1" },
            15: { vt: "Deuteronômio 33 – Josué 1", sl: "Salmo 97", nt: "Atos 21", verse: "O Senhor reina; alegre-se a terra.", ref: "Salmo 97:1" },
            16: { vt: "Josué 2–4", sl: "Salmo 98", nt: "Atos 22", verse: "Cantai ao Senhor um cântico novo.", ref: "Salmo 98:1" },
            17: { vt: "Josué 5–7", sl: "Salmo 99", nt: "Atos 23", verse: "Exaltai ao Senhor nosso Deus.", ref: "Salmo 99:5" },
            18: { vt: "Josué 8–9", sl: "Salmo 100", nt: "Atos 24–25", verse: "Celebrai com júbilo ao Senhor.", ref: "Salmo 100:1" },
            19: { vt: "Josué 10–11", sl: "Salmo 101", nt: "Atos 26", verse: "Cantarei a bondade e a justiça.", ref: "Salmo 101:1" },
            20: { vt: "Josué 12–13", sl: "Salmo 102", nt: "Atos 27", verse: "O Senhor ouviu a oração do desamparado.", ref: "Salmo 102:17" },
            21: { vt: "Josué 14–15", sl: "Salmo 103", nt: "Atos 28", verse: "Bendize, ó minha alma, ao Senhor.", ref: "Salmo 103:1" },
            22: { vt: "Josué 16–18", sl: "Salmo 104", nt: "Romanos 1", verse: "Bendize, ó minha alma, ao Senhor.", ref: "Salmo 104:1" },
            23: { vt: "Josué 19–20", sl: "Salmo 105:1–25", nt: "Romanos 2", verse: "Rendei graças ao Senhor.", ref: "Salmo 105:1" },
            24: { vt: "Josué 21", sl: "Salmo 105:26–45", nt: "Romanos 3–4", verse: "Ele se lembrou da sua santa promessa.", ref: "Salmo 105:42" },
            25: { vt: "Josué 22–23", sl: "Salmo 106:1–23", nt: "Romanos 5–6", verse: "Rendei graças ao Senhor, porque ele é bom.", ref: "Salmo 106:1" },
            26: { vt: "Josué 24 – Juízes 1", sl: "Salmo 106:24–48", nt: "Romanos 7", verse: "Salva-nos, Senhor nosso Deus.", ref: "Salmo 106:47" },
            27: { vt: "Juízes 2–3", sl: "Salmo 107:1–22", nt: "Romanos 8", verse: "Deem graças ao Senhor por sua bondade.", ref: "Salmo 107:1" },
            28: { vt: "Juízes 4–5", sl: "Salmo 107:23–43", nt: "Romanos 9–10", verse: "Ele acalma a tempestade.", ref: "Salmo 107:29" },
            29: { vt: "Juízes 6–7", sl: "Salmo 108", nt: "Romanos 11", verse: "Firme está o meu coração, ó Deus.", ref: "Salmo 108:1" },
            30: { vt: "Juízes 8", sl: "Salmo 109", nt: "Romanos 12–13", verse: "Socorre-me, Senhor meu Deus.", ref: "Salmo 109:26" }
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

        const generateButton = r ? `
        <button class="btn-share-story" onclick="generateInstaImage(${day}, ${currentMonth})" title="Baixar leitura do dia" aria-label="Baixar leitura do dia">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
        </button>
        ` : '';

        detailEl.innerHTML = `
        <div class="plan-detail__title">${title}</div>

        <div class="plan-detail__body">
        ${body}
        ${generateButton}
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
        // Só habilita Janeiro (0), Fevereiro (1), Março (2) e Abril (3)
        if (idx <= 3) {
            chip.disabled = false;
            chip.classList.remove("is-disabled");
            chip.addEventListener("click", () => switchMonth(idx));
        }
    });

    // Inicializa com o mês atual (até Março) ou Janeiro
    const initialMonth = (now.getMonth() <= 2) ? now.getMonth() : 0;
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
            1:  { vt: "Êxodo 8–9",  sl: "Salmo 29", nt: "Marcos 8",  verse: "O Senhor troveja sobre as muitas águas.", ref: "Salmo 29:3" },
            2:  { vt: "Êxodo 10–11", sl: "Salmo 30", nt: "Marcos 9",  verse: "O choro pode durar uma noite, mas a alegria vem pela manhã.", ref: "Salmo 30:5" },
            3:  { vt: "Êxodo 12", sl: "Salmo 31", nt: "Marcos 10", verse: "Em ti, Senhor, confio; jamais serei envergonhado.", ref: "Salmo 31:1" },
            4:  { vt: "Êxodo 13–14", sl: "Salmo 32", nt: "Marcos 11", verse: "Tu és o meu esconderijo.", ref: "Salmo 32:7" },
            5:  { vt: "Êxodo 15–16", sl: "Salmo 33", nt: "Marcos 12", verse: "O Senhor ama a justiça.", ref: "Salmo 33:5" },
            6:  { vt: "Êxodo 17–19", sl: "Salmo 34", nt: "Marcos 13", verse: "Busquei o Senhor, e ele me respondeu.", ref: "Salmo 34:4" },
            7:  { vt: "Êxodo 20–21", sl: "Salmo 35", nt: "Marcos 14", verse: "Contende, Senhor, com os que contendem comigo.", ref: "Salmo 35:1" },
            8:  { vt: "Êxodo 22–23", sl: "Salmo 36", nt: "Marcos 15", verse: "A tua misericórdia, Senhor, está nos céus.", ref: "Salmo 36:5" },
            9:  { vt: "Êxodo 24–25", sl: "Salmo 37", nt: "Marcos 16", verse: "O Senhor sustenta os justos.", ref: "Salmo 37:17" },
            10: { vt: "Êxodo 26–27", sl: "Salmo 37", nt: "Lucas 1",  verse: "Agrada-te do Senhor, e ele satisfará os desejos do teu coração.", ref: "Salmo 37:4" },
            11: { vt: "Êxodo 28", sl: "Salmo 38", nt: "Lucas 2",  verse: "Não me abandones, Senhor.", ref: "Salmo 38:21" },
            12: { vt: "Êxodo 29", sl: "Salmo 39", nt: "Lucas 3",  verse: "Ensina-nos a contar os nossos dias.", ref: "Salmo 39:4" },
            13: { vt: "Êxodo 30–31", sl: "Salmo 40", nt: "Lucas 4",  verse: "Esperei confiantemente pelo Senhor, e ele se inclinou para mim.", ref: "Salmo 40:1" },
            14: { vt: "Êxodo 32–33", sl: "Salmo 41", nt: "Lucas 5",  verse: "Bem-aventurado o que põe no Senhor a sua confiança.", ref: "Salmo 40:4" },
            15: { vt: "Êxodo 34–35", sl: "Salmo 42", nt: "Lucas 6",  verse: "A minha alma tem sede de Deus, do Deus vivo.", ref: "Salmo 42:2" },
            16: { vt: "Êxodo 36–37", sl: "Salmo 43", nt: "Lucas 7",  verse: "Espera em Deus, pois ainda o louvarei.", ref: "Salmo 43:5" },
            17: { vt: "Êxodo 38–39", sl: "Salmo 44", nt: "Lucas 8",  verse: "Em Deus faremos proezas.", ref: "Salmo 44:5" },
            18: { vt: "Êxodo 40 – Levítico 1", sl: "Salmo 45", nt: "Lucas 9", verse: "Tu és o mais formoso dos filhos dos homens.", ref: "Salmo 45:2" },
            19: { vt: "Levítico 2–4", sl: "Salmo 46", nt: "Lucas 10", verse: "Deus é o nosso refúgio e fortaleza.", ref: "Salmo 46:1" },
            20: { vt: "Levítico 5–6", sl: "Salmo 47", nt: "Lucas 11", verse: "Cantai louvores a Deus, cantai louvores.", ref: "Salmo 47:6" },
            21: { vt: "Levítico 7", sl: "Salmo 48", nt: "Lucas 12", verse: "Grande é o Senhor e mui digno de louvor.", ref: "Salmo 48:1" },
            22: { vt: "Levítico 8–9", sl: "Salmo 49", nt: "Lucas 13", verse: "Por que temer nos dias maus?", ref: "Salmo 49:5" },
            23: { vt: "Levítico 10–11", sl: "Salmo 50", nt: "Lucas 14", verse: "Oferece a Deus sacrifício de gratidão.", ref: "Salmo 50:14" },
            24: { vt: "Levítico 12–13", sl: "Salmo 51", nt: "Lucas 15", verse: "Cria em mim, ó Deus, um coração puro.", ref: "Salmo 51:10" },
            25: { vt: "Levítico 14", sl: "Salmo 52", nt: "Lucas 16", verse: "Eu confio na misericórdia de Deus.", ref: "Salmo 52:8" },
            26: { vt: "Levítico 15–16", sl: "Salmo 53", nt: "Lucas 17", verse: "A salvação vem de Deus.", ref: "Salmo 53:6" },
            27: { vt: "Levítico 17–18", sl: "Salmo 54", nt: "Lucas 18", verse: "Eis que Deus é o meu ajudador.", ref: "Salmo 54:4" },
            28: { vt: "Levítico 19–20", sl: "Salmo 55", nt: "Lucas 19", verse: "Entrega os teus cuidados ao Senhor.", ref: "Salmo 55:22" }
        },
        2: { // Março
            1:  { vt: "Levítico 21–22", sl: "Salmo 56", nt: "Lucas 20", verse: "Em Deus ponho a minha confiança e não temerei.", ref: "Salmo 56:11" },
            2:  { vt: "Levítico 23–24", sl: "Salmo 57", nt: "Lucas 21", verse: "Sê exaltado, ó Deus, acima dos céus.", ref: "Salmo 57:5" },
            3:  { vt: "Levítico 25", sl: "Salmo 58", nt: "Lucas 22", verse: "O justo se alegrará quando vir a vingança.", ref: "Salmo 58:10" },
            4:  { vt: "Levítico 26", sl: "Salmo 59", nt: "Lucas 23", verse: "Deus é o meu alto refúgio.", ref: "Salmo 59:9" },
            5:  { vt: "Levítico 27", sl: "Salmo 60", nt: "Lucas 24", verse: "Dá-nos auxílio contra o adversário.", ref: "Salmo 60:11" },
            6:  { vt: "Números 1", sl: "Salmo 61", nt: "João 1", verse: "Leva-me para a rocha que é mais alta do que eu.", ref: "Salmo 61:2" },
            7:  { vt: "Números 2", sl: "Salmo 62", nt: "João 2", verse: "Só em Deus espera, ó minha alma.", ref: "Salmo 62:5" },
            8:  { vt: "Números 3", sl: "Salmo 63", nt: "João 3", verse: "A minha alma tem sede de ti.", ref: "Salmo 63:1" },
            9:  { vt: "Números 4", sl: "Salmo 64", nt: "João 4", verse: "O justo se alegrará no Senhor.", ref: "Salmo 64:10" },
            10: { vt: "Números 5–6", sl: "Salmo 65", nt: "João 5", verse: "Tu ouves a oração.", ref: "Salmo 65:2" },
            11: { vt: "Números 7", sl: "Salmo 66", nt: "João 6", verse: "Bendito seja Deus, que não rejeitou a minha oração.", ref: "Salmo 66:20" },
            12: { vt: "Números 8–9", sl: "Salmo 67", nt: "João 7", verse: "Deus tenha misericórdia de nós e nos abençoe.", ref: "Salmo 67:1" },
            13: { vt: "Números 10–11", sl: "Salmo 68:1-18", nt: "João 8", verse: "Levante-se Deus, e sejam dissipados os seus inimigos.", ref: "Salmo 68:1" },
            14: { vt: "Números 12–13", sl: "Salmo 68:19-36", nt: "João 9", verse: "Bendito seja o Senhor, que de dia em dia nos carrega de benefícios.", ref: "Salmo 68:19" },
            15: { vt: "Números 14", sl: "Salmo 69:1-18", nt: "João 10", verse: "Salva-me, ó Deus, porque as águas entraram até à minha alma.", ref: "Salmo 69:1" },
            16: { vt: "Números 15", sl: "Salmo 69:19-36", nt: "João 11", verse: "Louvarei o nome de Deus com cântico.", ref: "Salmo 69:30" },
            17: { vt: "Números 16", sl: "Salmo 70", nt: "João 12", verse: "Apressa-te, ó Deus, em me livrar.", ref: "Salmo 70:1" },
            18: { vt: "Números 17–18", sl: "Salmo 71", nt: "João 13", verse: "Em ti, Senhor, confio.", ref: "Salmo 71:1" },
            19: { vt: "Números 19–20", sl: "Salmo 72", nt: "João 14", verse: "Bendito seja o Senhor Deus, o Deus de Israel.", ref: "Salmo 72:18" },
            20: { vt: "Números 21–22", sl: "Salmo 73", nt: "João 15", verse: "Quanto a mim, bom é aproximar-me de Deus.", ref: "Salmo 73:28" },
            21: { vt: "Números 23–24", sl: "Salmo 74", nt: "João 16", verse: "Levanta-te, ó Deus, pleiteia a tua causa.", ref: "Salmo 74:22" },
            22: { vt: "Números 25–26", sl: "Salmo 75", nt: "João 17", verse: "Exaltarei o teu nome, porque está perto.", ref: "Salmo 75:1" },
            23: { vt: "Números 27–28", sl: "Salmo 76", nt: "João 18", verse: "Tu és tremendo.", ref: "Salmo 76:7" },
            24: { vt: "Números 29–30", sl: "Salmo 77", nt: "João 19", verse: "Lembro-me das obras do Senhor.", ref: "Salmo 77:11" },
            25: { vt: "Números 31", sl: "Salmo 78:1-39", nt: "João 20", verse: "Contaremos à geração vindoura os louvores do Senhor.", ref: "Salmo 78:4" },
            26: { vt: "Números 32", sl: "Salmo 78:40-72", nt: "João 21 – Atos 1", verse: "Escolheu a Davi, seu servo.", ref: "Salmo 78:70" },
            27: { vt: "Números 33", sl: "Salmo 79", nt: "Atos 2", verse: "Ajuda-nos, ó Deus da nossa salvação.", ref: "Salmo 79:9" },
            28: { vt: "Números 34–35", sl: "Salmo 80", nt: "Atos 3", verse: "Restaura-nos, ó Deus.", ref: "Salmo 80:3" },
            29: { vt: "Números 36 – Deuteronômio 1", sl: "Salmo 81", nt: "Atos 4", verse: "Eu sou o Senhor teu Deus.", ref: "Salmo 81:10" },
            30: { vt: "Deuteronômio 2–3", sl: "Salmo 82", nt: "Atos 5", verse: "Levanta-te, ó Deus, julga a terra.", ref: "Salmo 82:8" },
            31: { vt: "Deuteronômio 4", sl: "Salmo 83", nt: "Atos 6", verse: "Não te cales, ó Deus.", ref: "Salmo 83:1" }
        },
        3: { // Abril
            1:  { vt: "Deuteronômio 5–6", sl: "Salmo 84", nt: "Atos 7", verse: "Quão amáveis são os teus tabernáculos, Senhor.", ref: "Salmo 84:1" },
            2:  { vt: "Deuteronômio 7–8", sl: "Salmo 85", nt: "Atos 8", verse: "Mostra-nos, Senhor, a tua misericórdia.", ref: "Salmo 85:7" },
            3:  { vt: "Deuteronômio 9–10", sl: "Salmo 86", nt: "Atos 9", verse: "Ensina-me o teu caminho, Senhor.", ref: "Salmo 86:11" },
            4:  { vt: "Deuteronômio 11–12", sl: "Salmo 87", nt: "Atos 10", verse: "O Senhor ama as portas de Sião.", ref: "Salmo 87:2" },
            5:  { vt: "Deuteronômio 13–14", sl: "Salmo 88", nt: "Atos 11", verse: "Chegue à tua presença a minha oração.", ref: "Salmo 88:2" },
            6:  { vt: "Deuteronômio 15–17", sl: "Salmo 89:1–29", nt: "Atos 12", verse: "Cantarei para sempre as misericórdias do Senhor.", ref: "Salmo 89:1" },
            7:  { vt: "Deuteronômio 18–20", sl: "Salmo 89:30–52", nt: "Atos 13", verse: "Bem-aventurado o povo que conhece o som festivo.", ref: "Salmo 89:15" },
            8:  { vt: "Deuteronômio 21–22", sl: "Salmo 90", nt: "Atos 14", verse: "Ensina-nos a contar os nossos dias.", ref: "Salmo 90:12" },
            9:  { vt: "Deuteronômio 23–24", sl: "Salmo 91", nt: "Atos 15", verse: "Aquele que habita no esconderijo do Altíssimo.", ref: "Salmo 91:1" },
            10: { vt: "Deuteronômio 25–27", sl: "Salmo 92", nt: "Atos 16", verse: "Bom é render graças ao Senhor.", ref: "Salmo 92:1" },
            11: { vt: "Deuteronômio 28", sl: "Salmo 93", nt: "Atos 17", verse: "O Senhor reina, está vestido de majestade.", ref: "Salmo 93:1" },
            12: { vt: "Deuteronômio 29–30", sl: "Salmo 94", nt: "Atos 18", verse: "O Senhor não desampara o seu povo.", ref: "Salmo 94:14" },
            13: { vt: "Deuteronômio 31", sl: "Salmo 95", nt: "Atos 19", verse: "Vinde, cantemos ao Senhor.", ref: "Salmo 95:1" },
            14: { vt: "Deuteronômio 32", sl: "Salmo 96", nt: "Atos 20", verse: "Cantai ao Senhor um cântico novo.", ref: "Salmo 96:1" },
            15: { vt: "Deuteronômio 33 – Josué 1", sl: "Salmo 97", nt: "Atos 21", verse: "O Senhor reina; alegre-se a terra.", ref: "Salmo 97:1" },
            16: { vt: "Josué 2–4", sl: "Salmo 98", nt: "Atos 22", verse: "Cantai ao Senhor um cântico novo.", ref: "Salmo 98:1" },
            17: { vt: "Josué 5–7", sl: "Salmo 99", nt: "Atos 23", verse: "Exaltai ao Senhor nosso Deus.", ref: "Salmo 99:5" },
            18: { vt: "Josué 8–9", sl: "Salmo 100", nt: "Atos 24–25", verse: "Celebrai com júbilo ao Senhor.", ref: "Salmo 100:1" },
            19: { vt: "Josué 10–11", sl: "Salmo 101", nt: "Atos 26", verse: "Cantarei a bondade e a justiça.", ref: "Salmo 101:1" },
            20: { vt: "Josué 12–13", sl: "Salmo 102", nt: "Atos 27", verse: "O Senhor ouviu a oração do desamparado.", ref: "Salmo 102:17" },
            21: { vt: "Josué 14–15", sl: "Salmo 103", nt: "Atos 28", verse: "Bendize, ó minha alma, ao Senhor.", ref: "Salmo 103:1" },
            22: { vt: "Josué 16–18", sl: "Salmo 104", nt: "Romanos 1", verse: "Bendize, ó minha alma, ao Senhor.", ref: "Salmo 104:1" },
            23: { vt: "Josué 19–20", sl: "Salmo 105:1–25", nt: "Romanos 2", verse: "Rendei graças ao Senhor.", ref: "Salmo 105:1" },
            24: { vt: "Josué 21", sl: "Salmo 105:26–45", nt: "Romanos 3–4", verse: "Ele se lembrou da sua santa promessa.", ref: "Salmo 105:42" },
            25: { vt: "Josué 22–23", sl: "Salmo 106:1–23", nt: "Romanos 5–6", verse: "Rendei graças ao Senhor, porque ele é bom.", ref: "Salmo 106:1" },
            26: { vt: "Josué 24 – Juízes 1", sl: "Salmo 106:24–48", nt: "Romanos 7", verse: "Salva-nos, Senhor nosso Deus.", ref: "Salmo 106:47" },
            27: { vt: "Juízes 2–3", sl: "Salmo 107:1–22", nt: "Romanos 8", verse: "Deem graças ao Senhor por sua bondade.", ref: "Salmo 107:1" },
            28: { vt: "Juízes 4–5", sl: "Salmo 107:23–43", nt: "Romanos 9–10", verse: "Ele acalma a tempestade.", ref: "Salmo 107:29" },
            29: { vt: "Juízes 6–7", sl: "Salmo 108", nt: "Romanos 11", verse: "Firme está o meu coração, ó Deus.", ref: "Salmo 108:1" },
            30: { vt: "Juízes 8", sl: "Salmo 109", nt: "Romanos 12–13", verse: "Socorre-me, Senhor meu Deus.", ref: "Salmo 109:26" }
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
        if (idx <= 2) { // Só Janeiro, Fevereiro e Março habilitados
            chip.addEventListener("click", () => {
                switchTableMonth(idx);
            });
        }
    });

    // Inicializa com o mês atual (até Março) ou Janeiro
    const now = new Date();
    const initialMonth = (now.getMonth() <= 2) ? now.getMonth() : 0;
    switchTableMonth(initialMonth);
})();

// Sistema de geração de imagem para Instagram
function generateInstaImage(day, monthIndex) {
    // Nomes dos meses
    const monthNames = [
        "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
        "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
    ];

    // Leituras por mês (mesma estrutura)
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
            1:  { vt: "Êxodo 8–9",  sl: "Salmo 29", nt: "Marcos 8", verse: "O Senhor troveja sobre as muitas águas.", ref: "Salmo 29:3" },
            2:  { vt: "Êxodo 10–11", sl: "Salmo 30", nt: "Marcos 9", verse: "O choro pode durar uma noite, mas a alegria vem pela manhã.", ref: "Salmo 30:5" },
            3:  { vt: "Êxodo 12", sl: "Salmo 31", nt: "Marcos 10", verse: "Em ti, Senhor, confio; jamais serei envergonhado.", ref: "Salmo 31:1" },
            4:  { vt: "Êxodo 13–14", sl: "Salmo 32", nt: "Marcos 11", verse: "Tu és o meu esconderijo.", ref: "Salmo 32:7" },
            5:  { vt: "Êxodo 15–16", sl: "Salmo 33", nt: "Marcos 12", verse: "O Senhor ama a justiça.", ref: "Salmo 33:5" },
            6:  { vt: "Êxodo 17–19", sl: "Salmo 34", nt: "Marcos 13", verse: "Busquei o Senhor, e ele me respondeu.", ref: "Salmo 34:4" },
            7:  { vt: "Êxodo 20–21", sl: "Salmo 35", nt: "Marcos 14", verse: "Entrega o teu caminho ao Senhor.", ref: "Salmo 37:5" },
            8:  { vt: "Êxodo 22–23", sl: "Salmo 36", nt: "Marcos 15", verse: "A tua misericórdia, Senhor, está nos céus.", ref: "Salmo 36:5" },
            9:  { vt: "Êxodo 24–25", sl: "Salmo 37", nt: "Marcos 16", verse: "O Senhor é quem sustenta a minha vida.", ref: "Salmo 54:4" },
            10: { vt: "Êxodo 26–27", sl: "Salmo 37", nt: "Lucas 1", verse: "Agrada-te do Senhor, e ele satisfará os desejos do teu coração.", ref: "Salmo 37:4" },
            11: { vt: "Êxodo 28", sl: "Salmo 38", nt: "Lucas 2", verse: "Senhor, não me abandones.", ref: "Salmo 38:21" },
            12: { vt: "Êxodo 29", sl: "Salmo 39", nt: "Lucas 3", verse: "Esperei confiantemente pelo Senhor.", ref: "Salmo 40:1" },
            13: { vt: "Êxodo 30–31", sl: "Salmo 40", nt: "Lucas 4", verse: "O Senhor tem prazer naqueles que o temem.", ref: "Salmo 147:11" },
            14: { vt: "Êxodo 32–33", sl: "Salmo 41", nt: "Lucas 5", verse: "Bem-aventurado o que põe no Senhor a sua confiança.", ref: "Salmo 40:4" },
            15: { vt: "Êxodo 34–35", sl: "Salmo 42", nt: "Lucas 6", verse: "Minha alma espera somente em Deus.", ref: "Salmo 62:1" },
            16: { vt: "Êxodo 36–37", sl: "Salmo 43", nt: "Lucas 7", verse: "Confia no Senhor e faze o bem.", ref: "Salmo 37:3" },
            17: { vt: "Êxodo 38–39", sl: "Salmo 44", nt: "Lucas 8", verse: "Não há saúde nos meus ossos por causa do meu pecado.", ref: "Salmo 38:3" },
            18: { vt: "Êxodo 40 – Levítico 1", sl: "Salmo 45", nt: "Lucas 9", verse: "Sacrifícios agradáveis a Deus são o espírito quebrantado.", ref: "Salmo 51:17" },
            19: { vt: "Levítico 2–4", sl: "Salmo 46", nt: "Lucas 10", verse: "Eis que venho; no rolo do livro está escrito a meu respeito.", ref: "Salmo 40:7" },
            20: { vt: "Levítico 5–6", sl: "Salmo 47", nt: "Lucas 11", verse: "O Senhor está comigo; não temerei.", ref: "Salmo 118:6" },
            21: { vt: "Levítico 7", sl: "Salmo 48", nt: "Lucas 12", verse: "Esperei confiantemente pelo Senhor.", ref: "Salmo 40:1" },
            22: { vt: "Levítico 8–9", sl: "Salmo 49", nt: "Lucas 13", verse: "Assim como o cervo anseia pelas águas.", ref: "Salmo 42:1" },
            23: { vt: "Levítico 10–11", sl: "Salmo 50", nt: "Lucas 14", verse: "Envia a tua luz e a tua verdade.", ref: "Salmo 43:3" },
            24: { vt: "Levítico 12–13", sl: "Salmo 51", nt: "Lucas 15", verse: "Deus é o nosso refúgio e fortaleza.", ref: "Salmo 46:1" },
            25: { vt: "Levítico 14", sl: "Salmo 52", nt: "Lucas 16", verse: "Tu és o mais formoso dos filhos dos homens.", ref: "Salmo 45:2" },
            26: { vt: "Levítico 15–16", sl: "Salmo 53", nt: "Lucas 17", verse: "Deus é o nosso refúgio.", ref: "Salmo 46:1" },
            27: { vt: "Levítico 17–18", sl: "Salmo 54", nt: "Lucas 18", verse: "O Senhor dos Exércitos está conosco.", ref: "Salmo 46:7" },
            28: { vt: "Levítico 19–20", sl: "Salmo 55", nt: "Lucas 19", verse: "Cantai louvores a Deus.", ref: "Salmo 47:6" }
        },
        2: { // Março
            1:  { vt: "Levítico 21–22", sl: "Salmo 56", nt: "Lucas 20", verse: "Em Deus ponho a minha confiança e não temerei.", ref: "Salmo 56:11" },
            2:  { vt: "Levítico 23–24", sl: "Salmo 57", nt: "Lucas 21", verse: "Sê exaltado, ó Deus, acima dos céus.", ref: "Salmo 57:5" },
            3:  { vt: "Levítico 25", sl: "Salmo 58", nt: "Lucas 22", verse: "O justo se alegrará quando vir a vingança.", ref: "Salmo 58:10" },
            4:  { vt: "Levítico 26", sl: "Salmo 59", nt: "Lucas 23", verse: "Deus é o meu alto refúgio.", ref: "Salmo 59:9" },
            5:  { vt: "Levítico 27", sl: "Salmo 60", nt: "Lucas 24", verse: "Dá-nos auxílio contra o adversário.", ref: "Salmo 60:11" },
            6:  { vt: "Números 1", sl: "Salmo 61", nt: "João 1", verse: "Leva-me para a rocha que é mais alta do que eu.", ref: "Salmo 61:2" },
            7:  { vt: "Números 2", sl: "Salmo 62", nt: "João 2", verse: "Só em Deus espera, ó minha alma.", ref: "Salmo 62:5" },
            8:  { vt: "Números 3", sl: "Salmo 63", nt: "João 3", verse: "A minha alma tem sede de ti.", ref: "Salmo 63:1" },
            9:  { vt: "Números 4", sl: "Salmo 64", nt: "João 4", verse: "O justo se alegrará no Senhor.", ref: "Salmo 64:10" },
            10: { vt: "Números 5–6", sl: "Salmo 65", nt: "João 5", verse: "Tu ouves a oração.", ref: "Salmo 65:2" },
            11: { vt: "Números 7", sl: "Salmo 66", nt: "João 6", verse: "Bendito seja Deus, que não rejeitou a minha oração.", ref: "Salmo 66:20" },
            12: { vt: "Números 8–9", sl: "Salmo 67", nt: "João 7", verse: "Deus tenha misericórdia de nós e nos abençoe.", ref: "Salmo 67:1" },
            13: { vt: "Números 10–11", sl: "Salmo 68:1-18", nt: "João 8", verse: "Levante-se Deus, e sejam dissipados os seus inimigos.", ref: "Salmo 68:1" },
            14: { vt: "Números 12–13", sl: "Salmo 68:19-36", nt: "João 9", verse: "Bendito seja o Senhor, que de dia em dia nos carrega de benefícios.", ref: "Salmo 68:19" },
            15: { vt: "Números 14", sl: "Salmo 69:1-18", nt: "João 10", verse: "Salva-me, ó Deus, porque as águas entraram até à minha alma.", ref: "Salmo 69:1" },
            16: { vt: "Números 15", sl: "Salmo 69:19-36", nt: "João 11", verse: "Louvarei o nome de Deus com cântico.", ref: "Salmo 69:30" },
            17: { vt: "Números 16", sl: "Salmo 70", nt: "João 12", verse: "Apressa-te, ó Deus, em me livrar.", ref: "Salmo 70:1" },
            18: { vt: "Números 17–18", sl: "Salmo 71", nt: "João 13", verse: "Em ti, Senhor, confio.", ref: "Salmo 71:1" },
            19: { vt: "Números 19–20", sl: "Salmo 72", nt: "João 14", verse: "Bendito seja o Senhor Deus, o Deus de Israel.", ref: "Salmo 72:18" },
            20: { vt: "Números 21–22", sl: "Salmo 73", nt: "João 15", verse: "Quanto a mim, bom é aproximar-me de Deus.", ref: "Salmo 73:28" },
            21: { vt: "Números 23–24", sl: "Salmo 74", nt: "João 16", verse: "Levanta-te, ó Deus, pleiteia a tua causa.", ref: "Salmo 74:22" },
            22: { vt: "Números 25–26", sl: "Salmo 75", nt: "João 17", verse: "Exaltarei o teu nome, porque está perto.", ref: "Salmo 75:1" },
            23: { vt: "Números 27–28", sl: "Salmo 76", nt: "João 18", verse: "Tu és tremendo.", ref: "Salmo 76:7" },
            24: { vt: "Números 29–30", sl: "Salmo 77", nt: "João 19", verse: "Lembro-me das obras do Senhor.", ref: "Salmo 77:11" },
            25: { vt: "Números 31", sl: "Salmo 78:1-39", nt: "João 20", verse: "Contaremos à geração vindoura os louvores do Senhor.", ref: "Salmo 78:4" },
            26: { vt: "Números 32", sl: "Salmo 78:40-72", nt: "João 21 – Atos 1", verse: "Escolheu a Davi, seu servo.", ref: "Salmo 78:70" },
            27: { vt: "Números 33", sl: "Salmo 79", nt: "Atos 2", verse: "Ajuda-nos, ó Deus da nossa salvação.", ref: "Salmo 79:9" },
            28: { vt: "Números 34–35", sl: "Salmo 80", nt: "Atos 3", verse: "Restaura-nos, ó Deus.", ref: "Salmo 80:3" },
            29: { vt: "Números 36 – Deuteronômio 1", sl: "Salmo 81", nt: "Atos 4", verse: "Eu sou o Senhor teu Deus.", ref: "Salmo 81:10" },
            30: { vt: "Deuteronômio 2–3", sl: "Salmo 82", nt: "Atos 5", verse: "Levanta-te, ó Deus, julga a terra.", ref: "Salmo 82:8" },
            31: { vt: "Deuteronômio 4", sl: "Salmo 83", nt: "Atos 6", verse: "Não te cales, ó Deus.", ref: "Salmo 83:1" }
        },
        3: { // Abril
            1:  { vt: "Deuteronômio 5–6", sl: "Salmo 84", nt: "Atos 7", verse: "Quão amáveis são os teus tabernáculos, Senhor.", ref: "Salmo 84:1" },
            2:  { vt: "Deuteronômio 7–8", sl: "Salmo 85", nt: "Atos 8", verse: "Mostra-nos, Senhor, a tua misericórdia.", ref: "Salmo 85:7" },
            3:  { vt: "Deuteronômio 9–10", sl: "Salmo 86", nt: "Atos 9", verse: "Ensina-me o teu caminho, Senhor.", ref: "Salmo 86:11" },
            4:  { vt: "Deuteronômio 11–12", sl: "Salmo 87", nt: "Atos 10", verse: "O Senhor ama as portas de Sião.", ref: "Salmo 87:2" },
            5:  { vt: "Deuteronômio 13–14", sl: "Salmo 88", nt: "Atos 11", verse: "Chegue à tua presença a minha oração.", ref: "Salmo 88:2" },
            6:  { vt: "Deuteronômio 15–17", sl: "Salmo 89:1–29", nt: "Atos 12", verse: "Cantarei para sempre as misericórdias do Senhor.", ref: "Salmo 89:1" },
            7:  { vt: "Deuteronômio 18–20", sl: "Salmo 89:30–52", nt: "Atos 13", verse: "Bem-aventurado o povo que conhece o som festivo.", ref: "Salmo 89:15" },
            8:  { vt: "Deuteronômio 21–22", sl: "Salmo 90", nt: "Atos 14", verse: "Ensina-nos a contar os nossos dias.", ref: "Salmo 90:12" },
            9:  { vt: "Deuteronômio 23–24", sl: "Salmo 91", nt: "Atos 15", verse: "Aquele que habita no esconderijo do Altíssimo.", ref: "Salmo 91:1" },
            10: { vt: "Deuteronômio 25–27", sl: "Salmo 92", nt: "Atos 16", verse: "Bom é render graças ao Senhor.", ref: "Salmo 92:1" },
            11: { vt: "Deuteronômio 28", sl: "Salmo 93", nt: "Atos 17", verse: "O Senhor reina, está vestido de majestade.", ref: "Salmo 93:1" },
            12: { vt: "Deuteronômio 29–30", sl: "Salmo 94", nt: "Atos 18", verse: "O Senhor não desampara o seu povo.", ref: "Salmo 94:14" },
            13: { vt: "Deuteronômio 31", sl: "Salmo 95", nt: "Atos 19", verse: "Vinde, cantemos ao Senhor.", ref: "Salmo 95:1" },
            14: { vt: "Deuteronômio 32", sl: "Salmo 96", nt: "Atos 20", verse: "Cantai ao Senhor um cântico novo.", ref: "Salmo 96:1" },
            15: { vt: "Deuteronômio 33 – Josué 1", sl: "Salmo 97", nt: "Atos 21", verse: "O Senhor reina; alegre-se a terra.", ref: "Salmo 97:1" },
            16: { vt: "Josué 2–4", sl: "Salmo 98", nt: "Atos 22", verse: "Cantai ao Senhor um cântico novo.", ref: "Salmo 98:1" },
            17: { vt: "Josué 5–7", sl: "Salmo 99", nt: "Atos 23", verse: "Exaltai ao Senhor nosso Deus.", ref: "Salmo 99:5" },
            18: { vt: "Josué 8–9", sl: "Salmo 100", nt: "Atos 24–25", verse: "Celebrai com júbilo ao Senhor.", ref: "Salmo 100:1" },
            19: { vt: "Josué 10–11", sl: "Salmo 101", nt: "Atos 26", verse: "Cantarei a bondade e a justiça.", ref: "Salmo 101:1" },
            20: { vt: "Josué 12–13", sl: "Salmo 102", nt: "Atos 27", verse: "O Senhor ouviu a oração do desamparado.", ref: "Salmo 102:17" },
            21: { vt: "Josué 14–15", sl: "Salmo 103", nt: "Atos 28", verse: "Bendize, ó minha alma, ao Senhor.", ref: "Salmo 103:1" },
            22: { vt: "Josué 16–18", sl: "Salmo 104", nt: "Romanos 1", verse: "Bendize, ó minha alma, ao Senhor.", ref: "Salmo 104:1" },
            23: { vt: "Josué 19–20", sl: "Salmo 105:1–25", nt: "Romanos 2", verse: "Rendei graças ao Senhor.", ref: "Salmo 105:1" },
            24: { vt: "Josué 21", sl: "Salmo 105:26–45", nt: "Romanos 3–4", verse: "Ele se lembrou da sua santa promessa.", ref: "Salmo 105:42" },
            25: { vt: "Josué 22–23", sl: "Salmo 106:1–23", nt: "Romanos 5–6", verse: "Rendei graças ao Senhor, porque ele é bom.", ref: "Salmo 106:1" },
            26: { vt: "Josué 24 – Juízes 1", sl: "Salmo 106:24–48", nt: "Romanos 7", verse: "Salva-nos, Senhor nosso Deus.", ref: "Salmo 106:47" },
            27: { vt: "Juízes 2–3", sl: "Salmo 107:1–22", nt: "Romanos 8", verse: "Deem graças ao Senhor por sua bondade.", ref: "Salmo 107:1" },
            28: { vt: "Juízes 4–5", sl: "Salmo 107:23–43", nt: "Romanos 9–10", verse: "Ele acalma a tempestade.", ref: "Salmo 107:29" },
            29: { vt: "Juízes 6–7", sl: "Salmo 108", nt: "Romanos 11", verse: "Firme está o meu coração, ó Deus.", ref: "Salmo 108:1" },
            30: { vt: "Juízes 8", sl: "Salmo 109", nt: "Romanos 12–13", verse: "Socorre-me, Senhor meu Deus.", ref: "Salmo 109:26" }
        }
    };

    const readings = readingsByMonth[monthIndex];
    const r = readings[day];
    
    if (!r) {
        alert('Leituras não disponíveis para este dia.');
        return;
    }

    // Atualiza o card oculto com os dados
    const instaCard = document.getElementById('instaCard');
    const instaCardDate = document.getElementById('instaCardDate');
    const instaVT = document.getElementById('instaVT');
    const instaSL = document.getElementById('instaSL');
    const instaNT = document.getElementById('instaNT');
    const instaQuote = document.querySelector('.insta-card__quote');
    const instaQuoteRef = document.querySelector('.insta-card__quote-ref');

    instaCardDate.textContent = `${monthNames[monthIndex]} · DIA ${day}`;
    instaVT.textContent = r.vt;
    instaSL.textContent = r.sl;
    instaNT.textContent = r.nt;
    
    // Atualiza versículo se disponível, senão usa o padrão
    if (r.verse && r.ref) {
        instaQuote.textContent = `"${r.verse}"`;
        instaQuoteRef.textContent = r.ref;
    } else {
        instaQuote.textContent = '"Lâmpada para os meus pés é a tua palavra e luz para o meu caminho."';
        instaQuoteRef.textContent = 'Salmos 119:105';
    }

    // Torna o card visível temporariamente
    instaCard.hidden = false;
    instaCard.style.display = 'block';

    // Aguarda um momento para garantir que o DOM está renderizado
    setTimeout(() => {
        // Gera a imagem usando html2canvas
        html2canvas(instaCard, {
            width: 1080,
            height: 1920,
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: true,
            useCORS: false
        }).then(canvas => {
            // Converte para data URL e faz download
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `leitura-dia-${day}-${monthNames[monthIndex].toLowerCase()}.png`;
            link.href = dataURL;
            link.click();

            // Esconde o card novamente
            instaCard.hidden = true;
            instaCard.style.display = 'none';
        }).catch(error => {
            console.error('Erro ao gerar imagem:', error);
            alert('Erro ao gerar imagem. Tente novamente.');
            instaCard.hidden = true;
            instaCard.style.display = 'none';
        });
    }, 100);
}

