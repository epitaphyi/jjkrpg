    // DEFINIR E ESCREVER PERÍCIAS
    let objetoPericias1 = {
        "Atletismo": (Math.floor((atributosFinais['Força']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Luta": (Math.floor((atributosFinais['Força']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Pontaria": (Math.floor((atributosFinais['Força']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Acrobacia": (Math.floor((atributosFinais['Destreza']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Furtividade": (Math.floor((atributosFinais['Destreza']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Prestidigitação": (Math.floor((atributosFinais['Destreza']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Reflexos": (Math.floor((atributosFinais['Destreza']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Fortitude": (Math.floor((atributosFinais['Constituição']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Integração": (Math.floor((atributosFinais['Integridade']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Asstúcia": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Feitiçaria": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Investigação": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "História": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Alfaiate)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Alquimia)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Armeiro)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Canlizador)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Cozinheiro)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Entalhador)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Ferreiro)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ofício (Médico)": (Math.floor((atributosFinais['Inteligência']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Intuição": (Math.floor((atributosFinais['Sabedoria']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Medicina": (Math.floor((atributosFinais['Sabedoria']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Percepção": (Math.floor((atributosFinais['Sabedoria']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Ocultismo": (Math.floor((atributosFinais['Sabedoria']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Persuasão": (Math.floor((atributosFinais['Carisma']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Enganação": (Math.floor((atributosFinais['Carisma']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Intimidação": (Math.floor((atributosFinais['Carisma']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Persuasão": (Math.floor((atributosFinais['Carisma']) - 10) / 2) + (Math.floor(nivelAtual / 2)),
        "Vontade": (Math.floor((atributosFinais['Carisma']) - 10) / 2) + (Math.floor(nivelAtual / 2))
    };

    function EscreverPericias() {
        // MODIFICAR AS PERICIAS
        if ((Math.floor(atributosFinais['Destreza'])) > (Math.floor(atributosFinais['Força']))) {
            objetoPericias["Luta"] = (Math.floor((atributosFinais['Destreza']) - 10) / 2) + (Math.floor(nivelAtual / 2))
            objetoPericias["Pontaria"] = (Math.floor((atributosFinais['Destreza']) - 10) / 2) + (Math.floor(nivelAtual / 2))
        };
        
        // ESCREVER AS PERICIAS
        periciasFichaHTML = "<h2>Perícias</h2>"
        for (let chave in objetoPericias) {
            if (Math.floor(objetoPericias[chave]) >= 0) {
                periciasFichaHTML += `<p>${chave} +${Math.floor(objetoPericias[chave])}</p>`;
            }
        }

        for (let item of objetoPericias) {
            console.log(item.nome);
            if (Math.floor(objetoPericias[chave]) >= 0) {
            }
        }        
        document.getElementById("fichaPericiasAuto").innerHTML = periciasFichaHTML;
    }
