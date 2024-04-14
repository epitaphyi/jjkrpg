// TROCAR ABAS
function openTab(tabName) {
    var i, tabContent;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
  }


document.getElementsByName("textoResponsivo").forEach(function(textarea) {
    textarea.addEventListener("input", resizeTextarea);
});

// SCROLLAR PARA CIMA E BAIXO
function scrollToTop() {
    window.scrollTo(0, 0);
}

function scrollToBottom() {
    window.scrollTo(10000, 10000);
}

// VALIDAR ATRIBUTOS BASE
const attributeValues = [15, 14, 13, 12, 10, 8]; // atributos base

function validarAtributosBase() { // validar os atributos base
    const attributes = document.querySelectorAll('.atributosBase input');
    const chosenValues = [];

    attributes.forEach(attribute => {
        chosenValues.push(parseInt(attribute.value));
    });

    const uniqueValues = [...new Set(chosenValues)];

    if (uniqueValues.length !== chosenValues.length) {
        showMessage("Os atributos base são 15, 14, 13, 12, 10 e 8.");
        return;
    }

    const invalidValue = chosenValues.find(value => !attributeValues.includes(value));
    if (invalidValue) {
        showMessage("Os atributos base são 15, 14, 13, 12, 10 e 8.");
        return;
    }

    showMessage(""); // caso essa mensagem não seja vazia, mesmo se o usuário colocar correto irá ficar aparecendo "os atributos base são 15, 14, etc", tentar melhorar depois
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}

// SALVAR ATRIBUTOS BASE
let objetoAtributosBase = { 
    forca: 0,
    destreza: 0,
    constituicao: 0,
    inteligencia: 0,
    sabedoria: 0,
    carisma: 0
};

function salvarAtributosBase() {
    const attributes = document.querySelectorAll('.atributosBase input');

    attributes.forEach(attribute => {
        const attributeName = attribute.id;
        const attributeValue = parseInt(attribute.value);
        objetoAtributosBase[attributeName] = attributeValue;
    });

    mostrarMensagemSalvar("Atributos base salvos com sucesso!");
};

function mostrarMensagemSalvar(mensagemSalvar) {
    document.getElementById('mensagemSalvar').textContent = mensagemSalvar;
};

// APARECER OPÇÃO DE CLÃS PARA HERDADO
document.getElementById("ficha_origem").addEventListener("change", function() { // o addEventListener("change") funciona toda vez que o selecionado for alterado
    const origemSelecionada = document.getElementById("ficha_origem").value; // pega exatamente qual a origem escolhida
    const divClas = document.getElementById("fichaClas"); // pega examaente o div onde tá as opções de clãs

    // Se a origem selecionada for "Herdado", exibir a seção de clãs; caso contrário, ocultá-la
    if (origemSelecionada === "herdado") { // se a origem escolhida for herdada, então
        divClas.style.display = "block"; // muda o display do estilo do div clas para block, ou seja, ele aparece na página
    } else { // caso contrário
        divClas.style.display = "none"; // muda o display para none, fazendo com que sua linha não apareça, e por ventura, nem o texto em si por conta do hidden no div
    }
});

// SELECIONAR OS BONUS DE ATRIBUTOS E SALVAR OS BONUS
function AtributoBonus() {
    const origemSelecionada = document.getElementById("ficha_origem").value;

    if (origemSelecionada === "restringido") {
        document.getElementById("forca_bonus").value = 1;
        document.getElementById("destreza_bonus").value = 1;
        document.getElementById("constituicao_bonus").value = 1;
    };
};

AtributoBonus(); // ativa o evento uma vez
document.getElementById("ficha_origem").addEventListener("change", AtributoBonus); // ativa o evento toda vez que a (nesse caso) origem mudar

let objetoAtributosBonus = {}; // segundo objeto do codigo

function definirAtributosBonusOrigem() { // validar os atributos base
    const origemSelecionada = document.getElementById("ficha_origem").value;
    
    const atributosBonusOrigem = document.querySelectorAll('.ficha_atributos_bonus_origem input'); // pega os atributos bonus na ficha conforme o input do usuário
    let arrayAtributosBonus = Array.from(atributosBonusOrigem); // transforma o nodelist do querySelectorAll em cima em um array

    // VARIAVEIS PARA COLOCAR OS ATRIBUTOS E FORMAR O OBJETO
    let soma = 0; // define a variavel da soma
    let indice = 0;
    const arrayAtributosNome = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
    const valoresAtributosBonus = [0, 0, 0, 0, 0, 0];

    // COLOCA OS ATRIBUTOS BONUS 
    arrayAtributosBonus.forEach(atributoBonus => { // cria um loop, verificando cada atributo individual
        soma += parseInt(atributoBonus.value); // então soma o valor do atributo na variavel soma (o int parse é necessário, caso contrário irá somar como string, como 00102)
        valoresAtributosBonus[indice] = atributoBonus.value; // adiciona o atributo de indice atual (ex: 0 = forçca, 1 = destreza, etc) a variavel valores
        indice += 1; // aumenta o indice para que possa ser lido de 1 por 1
      });
  
    // FORMA O OBJETO DOS ATRIBUTOS BONUS
    for (let i = 0; i < arrayAtributosNome.length; i++) { // coloca os valores da const array e da const valores ao objeto vazio chamado
          const chave = arrayAtributosNome[i]; // pega o nome do atributo
          const valor = valoresAtributosBonus[i]; // pega o valor númerico do atributo
          objetoAtributosBonus[chave] = valor; // no objeto de chave x (ex forca) adiciona o valor do bonus de x
    }

    // VERIFICA SE A DISTRIBUIÇÃO ESTÁ CORRETA POR ORIGEM
    let mensagem = "";
    switch (origemSelecionada) {
        case "inato":
        case "feto_amaldicoado":
        case "derivado":
        case "herdado":
            if (soma !== 3) {
                mensagem = "A distribuição está incorreta.";
            }
            break;
        case "sem_tecnica":
            if (soma !== 4) {
                mensagem = "A distribuição está incorreta.";
            }
            break;
        case "restringido":
            if (soma !== 5) {
                mensagem = "A distribuição está incorreta.";
            }
            break;
        case "corpo_amaldicoado_mutante":
            if (soma !== 2) {
                mensagem = "A distribuição está incorreta.";
            }
            break;
        default:
            mensagem = "Origem inválida.";
      }
  
    if (mensagem === "") {
        mensagem = "";
    }

    mostrarMensagemAtributosBonusOrigem(mensagem);

}; 

function mostrarMensagemAtributosBonusOrigem(mensagemAtributoBonusOrigem) {
    document.getElementById('mensagemAtributoBonusOrigem').textContent = mensagemAtributoBonusOrigem;
}

let maximoTecnicas = 0;
let PVfinal = 0;
        
// SALVAR E ESCREVER ATRIBUTOS FINAIS
function SalvarAtributosFinais() { 
    let atributosBase = objetoAtributosBase;
    let atributosBonus = objetoAtributosBonus;

    atributosFinais = {
        Força: atributosBase.forca + parseInt(atributosBonus.forca),
        Destreza: atributosBase.destreza + parseInt(atributosBonus.destreza),
        Constituição: atributosBase.constituicao + parseInt(atributosBonus.constituicao),
        Inteligência: atributosBase.inteligencia + parseInt(atributosBonus.inteligencia),
        Sabedoria: atributosBase.sabedoria + parseInt(atributosBonus.sabedoria),
        Carisma: atributosBase.carisma + parseInt(atributosBonus.carisma)
    };

    // ESCREVER ATRIBUTOS FINAIS NA FICHA
    function EscreverAtributos() {
        let atributosFichaHTML = "<h2>Atributos</h2>";

        for (let chave in atributosFinais) { // as chaves são as propriedades (no caso o nome dos atributos), então o atributosFinais[chave] mostra o valor da chave em questão
            //console.log(`${chave}: ${atributosFinais[chave]}`);
            if ((atributosFinais[chave] - 10)/2 >= 0) {
                atributosFichaHTML += `<p>${chave}  ${atributosFinais[chave]} (+${Math.floor((atributosFinais[chave] - 10) / 2)})</p>`;
            } else {
                atributosFichaHTML += `<p>${chave}  ${atributosFinais[chave]} (${((atributosFinais[chave] - 10) / 2)})</p>`;
            }
          }
    
        document.getElementById("fichaAtributosAuto").innerHTML = atributosFichaHTML;
    }

    // CALCULAR E ESCREVER OS VALORES DA FICHA
    const especializacaoSelecionada = document.getElementById("ficha_especializacao").value;
    const nivelAtual = document.getElementById("ficha_nivel").value;

    let PVInicial = 0; 
    let PVNivel = 0;

    // CALCULAR VALORES
    function EscreverValores() {    
        switch (especializacaoSelecionada) {
            case "especialista_em_tecnicas":
                PVInicial = 10 + (atributosFinais['Constituição'] - 10) / 2;
                PVNivel = nivelAtual > 1 ? (5 + (atributosFinais['Constituição'] - 10) / 2) * (nivelAtual - 1): 0; // é um if em uma unica linha, se a condição (nivel atual maior que 1) for true, então faz esse calculo, caso contrario pvnivel vale 0
                Valores["Pontos de Vida"] = PVInicial + PVNivel;
                Valores["Pontos de Energia Amaldiçoada"] = 6 * nivelAtual;
                Valores["Pontos de Vida Atual"] = Valores["Pontos de Vida"];
                Valores["Pontos de Energia Amaldiçoada Atual"] = Valores["Pontos de Energia Amaldiçoada"];
                break;
            case "controlador":
            case "suporte":
                PVInicial = 10 + (atributosFinais['Constituição'] - 10) / 2;
                PVNivel = nivelAtual > 1 ? (5 + (atributosFinais['Constituição'] - 10) / 2) * (nivelAtual - 1): 0;
                Valores["Pontos de Vida"] = PVInicial + PVNivel;
                Valores["Pontos de Energia Amaldiçoada"] = 5 * nivelAtual;
                Valores["Pontos de Vida Atual"] = Valores["Pontos de Vida"];
                Valores["Pontos de Energia Amaldiçoada Atual"] = Valores["Pontos de Energia Amaldiçoada"];
                break;
            case "lutador":
            case "especialista_em_combate":
                PVInicial = 12 + (atributosFinais['Constituição'] - 10) / 2;
                PVNivel = nivelAtual > 1 ? (6 + (atributosFinais['Constituição'] - 10) / 2) * (nivelAtual - 1): 0;
                Valores["Pontos de Vida"] = PVInicial + PVNivel;
                Valores["Pontos de Energia Amaldiçoada"] = 3 * nivelAtual;
                Valores["Pontos de Vida Atual"] = Valores["Pontos de Vida"];
                Valores["Pontos de Energia Amaldiçoada Atual"] = Valores["Pontos de Energia Amaldiçoada"];
                break;
            case "restringido":
                PVInicial = 16 + (atributosFinais['Constituição'] - 10) / 2;
                PVNivel = nivelAtual > 1 ? (7 + (atributosFinais['Constituição'] - 10) / 2) * (nivelAtual - 1): 0;
                Valores["Pontos de Vida"] = PVInicial + PVNivel;
                Valores["Pontos de Energia Amaldiçoada"] = 3 * nivelAtual;
                Valores["Pontos de Vida Atual"] = Valores["Pontos de Vida"];
                Valores["Pontos de Energia Amaldiçoada Atual"] = Valores["Pontos de Energia Amaldiçoada"];
                break;
        };
    
        if (nivelAtual >= 5 && nivelAtual <= 8) {
            Valores["Bônus de Maestria"] = 3;
        } else if (nivelAtual >= 9 && nivelAtual <= 12) {
            Valores["Bônus de Maestria"] = 4;
        } else if (nivelAtual >= 13 && nivelAtual <= 16) {
            Valores["Bônus de Maestria"] = 5;
        } else if (nivelAtual >= 17 && nivelAtual <= 20) {
            Valores["Bônus de Maestria"] = 6;
        };
    
        Valores["Iniciativa"] = (atributosFinais['Destreza'] - 10) / 2;
        Valores["Classe de Armadura"] = 10 +  (atributosFinais['Destreza'] - 10) / 2;
        Valores["Atenção"] = 10;
        Valores["Especialização em Perícias"] = Valores["Bônus de Maestria"] + (Valores["Bônus de Maestria"]/2);

          // ESPAÇOS DE EQUIPAMENTOS
        let espacosEquipamentosHTML = `Limite de carregamento: `;
        let espacosEquipamentos = 0;
        if (((atributosFinais['Força'] - 10) / 2) >= 0) {
            espacosEquipamentos = Math.floor(8 + ((atributosFinais['Força'] - 10) / 2) * 2);
        } else {
            espacosEquipamentos = Math.floor(8 + ((atributosFinais['Força'] - 10) / 2));
        }
        espacosEquipamentosHTML += `${espacosEquipamentos}`
        espacosEquipamentosHTML += ` espaços`;

        document.getElementById("espacosEquipamentos").innerHTML = espacosEquipamentosHTML;

        // MÁXIMO DE HABILIDADES DE TÉCNICAS
        switch (especializacaoSelecionada) {
            case "lutador":
            case "especialista_em_combate":
                if (atributosFinais['Força'] > atributosFinais['Destreza']) {
                    maximoTecnicas = (atributosFinais['Força'] - 10) / 2 + Valores["Bônus de Maestria"];
                } else {
                    maximoTecnicas = (atributosFinais['Destreza'] - 10) / 2 + Valores["Bônus de Maestria"];
                }
                break;
            case "controlador":
            case "suporte":
                if (atributosFinais['Sabedoria'] > atributosFinais['Carisma']) {
                    maximoTecnicas = (atributosFinais['Sabedoria'] - 10) / 2 + Math.round(nivelAtual);
                } else {
                    maximoTecnicas = (atributosFinais['Carisma'] - 10) / 2 + Math.round(nivelAtual);
                }                
                break;
            case "especialista_em_tecnicas":
                if (atributosFinais['Inteligência'] > atributosFinais['Sabedoria']) {
                    maximoTecnicas = ((atributosFinais['Inteligência'] - 10) / 2 + nivelAtual);
                } else {
                    maximoTecnicas = (atributosFinais['Sabedoria'] - 10) / 2 + nivelAtual;
                }                
                break;
            case "restringido":
                break;
        };

        PVatual = Valores["Pontos de Vida Atual"];
        PEatual = Valores["Pontos de Energia Amaldiçoada Atual"]; 

        alterarPV = function() { // função para modificar pe
            PVmodificado = parseInt(document.getElementById("modificarPV").value);
            PVatual += PVmodificado;
            let percentualPV = Math.floor(PVatual) * 100 / Math.floor(Valores["Pontos de Vida"]);
            document.getElementById("pontosVidaAtual").innerText = Math.floor(PVatual);

            let cor;
            if (percentualPV > 100) {
                cor = "Blueviolet";
            } else if (percentualPV >= 76) {
                cor = "DarkOliveGreen";
            } else if (percentualPV >= 51) {
                cor = "Chartreuse";
            } else if (percentualPV >= 26) {
                cor = "Khaki";
            } else if (percentualPV >= 0) {
                cor = "LightCoral";
            } else {
                cor = "Crimson";
            }
            document.getElementById("pontosVidaAtual").style.color = cor;
            document.getElementById("pontosVidaTotal").style.color = cor;
        }

        alterarPE = function() { // função para modificar pe
            PEmodificado = parseInt(document.getElementById("modificarPE").value);
            PEatual += PEmodificado; 
            let percentualPE = Math.floor(PEatual) * 100 / Math.floor(Valores["Pontos de Energia Amaldiçoada"]);
            document.getElementById("pontosEnergiaAtual").innerText = Math.floor(PEatual);

            let cor;
            if (percentualPE > 100) { // altera as cores dependendo da percentual atual, se for maior que 100%
                cor = "Blueviolet"; // roxo 
            } else if (percentualPE >= 76) { // se não for maior que 100, então igual ou maior que 76
                cor = "DarkOliveGreen"; // verde escuro
            } else if (percentualPE >= 51) { // se não for maior que 76, então igual ou maior que 51
                cor = "Chartreuse"; // verde claro 
            } else if (percentualPE >= 26) { // se não for maior que 51, então igual ou maior que 26
                cor = "Khaki"; // amarelo desaturado
            } else if (percentualPE >= 0) { // se não for maior que 26, então igual ou maior que 0
                cor = "LightCoral"; // vermelho claro
            } else { // // se não for maior que 0
                cor = "Crimson"; // vermelho escuro
            }
            document.getElementById("pontosEnergiaAtual").style.color = cor; // isso que muda a cor
            document.getElementById("pontosEnergiaTotal").style.color = cor;
        }

        reiniciarPV = function() { // função para reiniciar pv
            PVatual = Valores["Pontos de Vida Atual"];
            PVmodificado = parseInt(document.getElementById("modificarPV").value);
            document.getElementById("pontosVidaAtual").innerText = Math.floor(Valores["Pontos de Vida"]);
            document.getElementById("pontosVidaAtual").style.color = "DarkOliveGreen"; // reinicia a cor para a "padrão" 
            document.getElementById("pontosVidaTotal").style.color = "DarkOliveGreen";
        }

        reiniciarPE = function() { // função para reiniciar pe
            PEatual = Valores["Pontos de Energia Amaldiçoada Atual"]; 
            PEmodificado = parseInt(document.getElementById("modificarPE").value);
            document.getElementById("pontosEnergiaAtual").innerText = Math.floor(Valores["Pontos de Energia Amaldiçoada"]);
            document.getElementById("pontosEnergiaAtual").style.color = "DarkOliveGreen";
            document.getElementById("pontosEnergiaTotal").style.color = "DarkOliveGreen";
        }

        // ESCREVER OS VALORES
        let valoresFichaHTML = "<h2>Valores</h2>";
        for (let chave in Valores) { // as chaves são as propriedades (no caso o nome dos atributos), então o atributosFinais[chave] mostra o valor da chave em questão
            if (chave === "Pontos de Vida Atual" || chave === "Pontos de Energia Amaldiçoada Atual" || chave === "Especialização em Perícias") {
                continue; // Ignora essas chaves e continua para a próxima iteração do loop
            }
            switch (chave) { // roxo > 100
                case "Pontos de Vida": // verde escuro = 100 > 75 // verde claro = 75 > 50 // amarelo = 50 > 25 > // vermelho = 25 > 0 //  
                    valoresFichaHTML += `<p>${chave} <span id="pontosVidaAtual">${Math.floor(PVatual)}</span>`;
                    valoresFichaHTML += `<span id="pontosVidaTotal">/${Math.floor(Valores[chave])}</span></p>`;
                    valoresFichaHTML += `<input type="number" id="modificarPV" value="0"></input>`;
                    valoresFichaHTML += `<button type="button" onclick="alterarPV()">Modificar PV</button>`;
                    valoresFichaHTML += `<button type="button" onclick="reiniciarPV()">Reiniciar PV</button>`
                    break;
                case "Pontos de Energia Amaldiçoada": // dps pensar em pe temporarios
                    valoresFichaHTML += `<p>${chave} <span id="pontosEnergiaAtual">${Math.floor(PEatual)}</span>`;
                    valoresFichaHTML += `<span id="pontosEnergiaTotal">/${Math.floor(Valores[chave])}</span></p>`;
                    valoresFichaHTML += `<input type="number" id="modificarPE" value="0" size="10"></input>`;
                    valoresFichaHTML += `<button type="button" onclick="alterarPE()">Modificar PE</button>`;
                    valoresFichaHTML += `<button type="button" onclick="reiniciarPE()">Reiniciar PE</button>`
                    break;
                case "Bônus de Maestria":
                case "Iniciativa":
                    valoresFichaHTML += `<p>${chave} +${Math.floor(Valores[chave])}</p>`;
                    break;
                case "Movimento":
                    valoresFichaHTML += `<p>${chave} ${Math.floor(Valores[chave])} metros</p>`;
                    break;
                case "Movimento de Voo": // dps programar as habilidades e talentos que permitem voo
                    if (Valores["Movimento de Voo"] > 0) {
                        valoresFichaHTML += `<p>${chave} ${Math.floor(Valores[chave])} metros</p>`;
                    }
                    break;
                default:
                    valoresFichaHTML += `<p>${chave} ${Math.floor(Valores[chave])}</p>`;
            }
        }
        document.getElementById("fichaValoresAuto").innerHTML = valoresFichaHTML;
        alterarPV(), alterarPE();
        
    };

    arrayPericias = [ // array das pericias com modificadores, outros bonus, bonus de maestria e especialização
            { nome: "Atletismo", modificador:Math.floor((atributosFinais['Força'] - 10) / 2), atributo: "Força", outros: 0, maestria: false, especializacao: false },
            { nome: "Luta", modificador:Math.floor((atributosFinais['Força'] - 10) / 2), atributo: "Força", outros: 0, maestria: false, especializacao: false },
            { nome: "Pontaria", modificador:Math.floor((atributosFinais['Força'] - 10) / 2), atributo: "Força", outros: 0, maestria: false, especializacao: false },
            { nome: "Acrobacia", modificador:Math.floor((atributosFinais['Destreza'] - 10) / 2), atributo: "Destreza", outros: 0, maestria: false, especializacao: false },
            { nome: "Reflexos", modificador:Math.floor((atributosFinais['Destreza'] - 10) / 2), atributo: "Destreza", outros: 0, maestria: false, especializacao: false },
            { nome: "Prestidigitação", modificador:Math.floor((atributosFinais['Destreza'] - 10) / 2), atributo: "Destreza", outros: 0, maestria: false, especializacao: false },
            { nome: "Furtividade", modificador:Math.floor((atributosFinais['Destreza'] - 10) / 2), atributo: "Destreza", outros: 0, maestria: false, especializacao: false },
            { nome: "Fortitude", modificador: Math.floor((atributosFinais['Constituição'] - 10) / 2), atributo: "Constituição", outros: 0, maestria: false, especializacao: false },
            { nome: "Integridade", modificador: Math.floor((atributosFinais['Constituição'] - 10) / 2), atributo: "Constituição", outros: 0, maestria: false, especializacao: false },
            { nome: "Astúcia", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Feitiçaria", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Investigação", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "História", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Alfaiate)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Alquimia)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Armeiro)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Canalizador)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Cozinheiro)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Entalhador)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Ferreiro)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Ofício (Médico)", modificador:Math.floor((atributosFinais['Inteligência'] - 10) / 2), atributo: "Inteligência", outros: 0, maestria: false, especializacao: false },
            { nome: "Intuição", modificador:Math.floor((atributosFinais['Sabedoria'] - 10) / 2), atributo: "Sabedoria", outros: 0, maestria: false, especializacao: false },
            { nome: "Medicina", modificador:Math.floor((atributosFinais['Sabedoria'] - 10) / 2), atributo: "Sabedoria", outros: 0, maestria: false, especializacao: false },
            { nome: "Percepção", modificador:Math.floor((atributosFinais['Sabedoria'] - 10) / 2), atributo: "Sabedoria", outros: 0, maestria: false, especializacao: false },
            { nome: "Ocultismo", modificador:Math.floor((atributosFinais['Sabedoria'] - 10) / 2), atributo: "Sabedoria", outros: 0, maestria: false, especializacao: false },
            { nome: "Persuasão", modificador:Math.floor((atributosFinais['Carisma'] - 10) / 2), atributo: "Carisma", outros: 0, maestria: false, especializacao: false },
            { nome: "Enganação", modificador:Math.floor((atributosFinais['Carisma'] - 10) / 2), atributo: "Carisma", outros: 0, maestria: false, especializacao: false },
            { nome: "Intimidação", modificador:Math.floor((atributosFinais['Carisma'] - 10) / 2), atributo: "Carisma", outros: 0, maestria: false, especializacao: false },
            { nome: "Performance", modificador:Math.floor((atributosFinais['Carisma'] - 10) / 2), atributo: "Carisma", outros: 0, maestria: false, especializacao: false },
            { nome: "Vontade", modificador:Math.floor((atributosFinais['Carisma'] - 10) / 2), atributo: "Carisma", outros: 0, maestria: false, especializacao: false }]

    function periciasDestrezaForca() {
        arrayPericias.forEach(item => {
            if (atributosFinais['Destreza'] > atributosFinais['Força']) {
                    if (item.nome === "Luta" || item.nome === "Pontaria") {
                        item.modificador = Math.floor((atributosFinais['Destreza'] - 10) / 2);
                    } 
                } 
        })
    }

    // Função para gerar a tabela
    function gerarTabelaPericias() { 
        const tabela = document.getElementById('tabelaPericias');

        // Limpa a tabela para não ser escrita novamente caso o usuário atualize os dados
        while (tabela.rows.length > 0) { 
            tabela.deleteRow(0); 
        }
        
        const cabecalho = tabela.createTHead(); // Cria o cabeçalho
        const cabecalhoRow = cabecalho.insertRow(); // Cria as linhas do cabeçalho
        cabecalhoRow.insertCell(0).textContent = "Nome"; // Insere a coluna de nome
        cabecalhoRow.insertCell(1).textContent = "Modificador"; // Etc.
        cabecalhoRow.insertCell(2).textContent = "Outros";
        cabecalhoRow.insertCell(3).textContent = "Maestria";
        cabecalhoRow.insertCell(4).textContent = "Especialização";
        cabecalhoRow.insertCell(5).textContent = "Total";
        
        arrayPericias.forEach((item) => { // Loop para cada item (nome, modificador, etc) do objeto perícias
            const row = tabela.insertRow(); // Insere uma linha na tabela
            const nomeCell = row.insertCell(0); // Na linha da tabela 0, define como nomeCell
            const modificadorCell = row.insertCell(1); // Mesma lógica para as outras células
            const outrosCell = row.insertCell(2);
            const maestriaCell = row.insertCell(3);
            const especializacaoCell = row.insertCell(4);
            const totalCell = row.insertCell(5);
        
            if (atributosFinais['Destreza'] > atributosFinais['Força']) { 
                if (item.nome === "Luta" || item.nome === "Pontaria") {
                    item.atributo = "Destreza";
                    nomeCell.textContent = `${item.nome} [${item.atributo}]`;
                    periciasDestrezaForca();
                } 
            } 
        
            nomeCell.textContent = `${item.nome} [${item.atributo}]`; 
            modificadorCell.textContent = item.modificador; 
            outrosCell.textContent = item.outros;
        
            if (item.nome != "Luta" && item.nome != "Pontaria") {
                const checkboxMaestria = document.createElement('input');
                checkboxMaestria.type = 'checkbox';
                checkboxMaestria.id = 'pericia_checkbox_maestria_' + item.nome; 
                checkboxMaestria.checked = item.maestria;
                checkboxMaestria.addEventListener('change', function() {
                    item.maestria = this.checked;
                    calcularEAtualizarTotais(arrayPericias);
                    if (this.checked) {
                        arrayMaestriasPericias.push(item.nome);
                    } else {
                        arrayMaestriasPericias = arrayMaestriasPericias.filter(nome => nome !== item.nome);
                    }
                });
                
                maestriaCell.appendChild(checkboxMaestria);
        
                const checkboxEspecializacao = document.createElement('input');
                checkboxEspecializacao.type = 'checkbox';
                checkboxEspecializacao.id = 'pericia_checkbox_especializacao_' + item.nome; 
                checkboxEspecializacao.checked = item.especializacao;
                checkboxEspecializacao.addEventListener('change', function() {
                    item.especializacao = this.checked;
                    calcularEAtualizarTotais(arrayPericias);
                    if (this.checked) {
                        arrayEspecializacoesPericias.push(item.nome);
                    } else {
                        arrayEspecializacoesPericias = arrayEspecializacoesPericias.filter(nome => nome !== item.nome);
                    }
                });
                
                especializacaoCell.appendChild(checkboxEspecializacao);
            }
        
            totalCell.id = item.nome + '-total'; 
            totalCell.textContent = item.modificador + item.outros; 
        });
        
}
    EscreverAtributos();
    EscreverValores();
    gerarTabelaPericias();

    // CARREGA AS PERICIAS NO DOCUMENTO
    document.getElementById("carregar-btn").addEventListener("click", gerarTabelaPericias);  // se botão de carregar for clicado, gera a tabela com as maestrias e especializacoes marcadas
    const carregar_btn = document.getElementById("carregar-btn"); // necessário para
    carregar_btn.addEventListener('click', function() { // isso, que precisa ser uma função porque caso contrário irá começar com arrayPericias vazio (já que ele não é definido com o carregamento do documento, até então)
        document.getElementById("carregar-btn").addEventListener("click", calcularEAtualizarTotais(arrayPericias)); 
    }); 
};

function calcularEAtualizarTotais(arrayUsada) { //calcula e atualiza os valores de total, bonus de maestria e especialização das pericias
    arrayUsada.forEach(item => {
        const nivelAtual = document.getElementById("ficha_nivel").value;
        item.outros = Math.floor(nivelAtual / 2);
        let total = item.modificador + item.outros;

        // Adicionar bônus de especialização, apenas se não houver maestria
        if (item.especializacao && !item.maestria) {
            total += Valores["Bônus de Maestria"] + Math.floor(Valores["Bônus de Maestria"] / 2);
        } else if (item.maestria) {
            // Adicionar bônus de maestria, se não houver especialização
            if (!item.especializacao) {
                total += Valores["Bônus de Maestria"];
            } else {
                total += Valores["Especialização em Perícias"];
            }
            // Se houver especialização e maestria, apenas o bônus de especialização é adicionado
            // pois já inclui o bônus da maestria
        }
        let totalCell = "";
        
        // Atualizar a tabela
        if (arrayUsada === arrayPericias) {
            totalCell = document.getElementById(item.nome + '-total');
        } else {
            totalCell = document.getElementById(item + '-total');
        }
        totalCell.textContent = total;
    });
} 

function mostrarMensagemAtributosFinais(mensagemAtributosFinais) {
    document.getElementById('mensagemAtributosFinais').textContent = mensagemAtributosFinais;
};

// ESCREVER HABILIDADES DE ORIGENS E ESPECIALIZAÇÕES NA FICHA
function escreverHabilidadesBase() {
    const origem = document.getElementById("ficha_origem").value;
    const origemHabilidadesBase = habilidadesOrigem[origem];

    const especializacao = document.getElementById("ficha_especializacao").value;
    const especializacaoHabilidadesBase = habilidadesBaseEspecializacao[especializacao];
    
    let habilidadesOrigemFichaHTML = "<p><h2>Habilidades de Origem:</h2><ul>";
    origemHabilidadesBase.forEach(habilidade => {
        habilidadesOrigemFichaHTML += `<li><strong>${habilidade.nome}</strong>: ${habilidade.descricao}</li>`;
    });
    
    if (origem != "feto_amaldicoado") {
        habilidadesOrigemFichaHTML += "</ul>";
    }

    let habilidadesEspecializacaoBaseHTML = "<h2><b>Habilidades Base de Especialização</b></h2><ul>";
    especializacaoHabilidadesBase.forEach(habilidadeBase => {
        habilidadesEspecializacaoBaseHTML += `<li><strong>${habilidadeBase.nome}</strong>: ${habilidadeBase.descricao}</li>`;
    });
    habilidadesEspecializacaoBaseHTML += "</ul>";

    document.getElementById("fichaHabilidadesOrigem").innerHTML = habilidadesOrigemFichaHTML;
    document.getElementById("fichaEspecializacaoBase").innerHTML = habilidadesEspecializacaoBaseHTML;

}

document.getElementById("ficha_origem").addEventListener("change", escreverHabilidadesBase);
document.getElementById("ficha_especializacao").addEventListener("change", escreverHabilidadesBase);

escreverHabilidadesBase();

// ESCREVER AS MAESTRIAS
function escreverMaestrias() {
    const especializacao = document.getElementById("ficha_especializacao").value;
    const especializacaoSelecionada = maestriasEspecializacao[especializacao];
    
    let maestriasFichaHTML = "<h2>Maestrias</h2>";
    especializacaoSelecionada.forEach(classe => {
        maestriasFichaHTML += `<textarea class="fichaDescricaoMaestrias" name="textoResponsivo" placeholder="Maestrias">Perícias: ${classe.pericias}
Armas, Armaduras e Escudos: ${classe.armas_armaduras_escudos}
Kit de Ferramentas: ${classe.kit_de_ferramentas}</textarea>`;
    });

    document.getElementById("fichaMaestriasAuto").innerHTML = maestriasFichaHTML;

    resizeTextarea(); // chamar o resizeTextarea para iniciar na página como texto responsivo (sem input do usuário)
    document.querySelectorAll(".fichaDescricaoMaestrias").forEach(textarea => { // transforma essa BOSTA em texto resposnvio
        textarea.addEventListener("input", resizeTextarea); // Sério porque algumas coisas tão simples são tão dificeis de fazer? 
    });
}

document.getElementById("ficha_especializacao").addEventListener("change", escreverMaestrias);
escreverMaestrias();


// CRIAR E DELETAR HABILIDADES DE TÉCNICAS
let textareaCount = 0; // basicamente serve como um indice.

function adicionarTecnica() {
    textareaCount++; // incrementa um valor, que irá servir como o índice base dos ids
    const container = document.getElementById('fichaAdicionarHabilidadesTecnicas'); // pega onde está 

    const HabilidadesTecnicasDiv = document.createElement('div'); 
    HabilidadesTecnicasDiv.classList.add('fichaAdicionarHabilidadesTecnicas');

    const nomeTecnicaInput = document.createElement('input');
    nomeTecnicaInput.type = 'text';
    nomeTecnicaInput.placeholder = `Nome da Técnica ${textareaCount}`;
    nomeTecnicaInput.id = 'nome_' + textareaCount;
    HabilidadesTecnicasDiv.appendChild(nomeTecnicaInput);

    const descricaoTecnicaTextarea = document.createElement('textarea');
    descricaoTecnicaTextarea.name = "textoResponsivo";
    descricaoTecnicaTextarea.textContent = `Habilidade Nível ? 
Conjuração: 
Alcance: 
Alvo: 
Duração: 
Descrição: `;
    descricaoTecnicaTextarea.id = 'descricao_' + textareaCount;
    descricaoTecnicaTextarea.setAttribute('data-original-height', descricaoTecnicaTextarea.clientHeight); // salva a altura do textarea (supostamente)
    HabilidadesTecnicasDiv.appendChild(descricaoTecnicaTextarea);

    const botaoApagar = document.createElement('button'); // fazer um talvez um pop-up que confirma o delete ou não, para não apagar uma técnica acidentalmente
    botaoApagar.textContent = 'Apagar';
    botaoApagar.id = 'apagar_' + textareaCount
    var confirmarApagar = false;
    botaoApagar.onclick = function() {
        confirmarApagar = confirm("Você quer apagar essa técnica?");
        if (confirmarApagar) {
            container.removeChild(HabilidadesTecnicasDiv);
        }
    };
    HabilidadesTecnicasDiv.appendChild(botaoApagar);

    container.appendChild(HabilidadesTecnicasDiv);
    descricaoTecnicaTextarea.addEventListener("input", resizeTextarea); 
    // sem isso o texto não é responsivo pq o código do resize de textarea roda uma vez no programa, 
    // mas eu jurava que eu tava tentando fazer isso e não dava certo, programar é minha paixão ou eu sou estupido mesmo (provavelmente isso
}

// SALVAR AS HABILIDADES DE TÉCNICAS E ESCREVER NO HTML

function salvarTecnicas() {
    nomesTecnicas = []; 
    descricoesTecnicas = [];
    descricoesTecnicasAltura = [];
    
    const container = document.getElementById('fichaAdicionarHabilidadesTecnicas');
    const tecnicaDivs = container.getElementsByClassName('fichaAdicionarHabilidadesTecnicas');
    for (let i = 0; i < tecnicaDivs.length; i++) {
        const nomeInput = tecnicaDivs[i].querySelector('input');
        const descricaoTextarea = tecnicaDivs[i].querySelector('textarea');
        nomesTecnicas.push(nomeInput.value);
        descricoesTecnicas.push(descricaoTextarea.value);
        descricoesTecnicasAltura.push(descricaoTextarea.style.height); 
    }

    console.log(nomesTecnicas);
    console.log(descricoesTecnicas);
    console.log(descricoesTecnicasAltura);

    let habilidadesTecnicasHTML = "<h2>Habilidades de Técnicas</h2>";
    habilidadesTecnicasHTML += `Máximo de Habilidades de Técnicas: ${Math.floor(maximoTecnicas)} <p>`;
    nomesTecnicas.forEach((nomeTecnica, index) => {
        habilidadesTecnicasHTML += `<li>${nomeTecnica}</li>`;
    });
    habilidadesTecnicasHTML += `</p>`;
    document.getElementById("fichaHabilidadesTecnicas").innerHTML = habilidadesTecnicasHTML;
}

// ESCREVER A TABELA BASE DE EQUIPAMENTOS

let countEquipamentos = 0;
let inputIds = [];

function gerarTabelaEquipamentos() { // gerada somente uma vez
    const tabela = document.getElementById('tabelaEquipamentos');

    while (tabela.rows.length > 0) {
        tabela.deleteRow(0);
    }

    const cabecalho = tabela.createTHead();
    const cabecalhoRow = cabecalho.insertRow();
    cabecalhoRow.insertCell(0).textContent = "Nome do Item";
    cabecalhoRow.insertCell(1).textContent = "Quantidade";
    cabecalhoRow.insertCell(2).textContent = "Espaços";
    cabecalhoRow.insertCell(3).textContent = "Custo";
}

// MODIFICAR A TABELA
function modificarTabelaEquipamentos() {
    const tabela = document.getElementById('tabelaEquipamentos');

    const row = tabela.insertRow();
    const nomeCell = row.insertCell(0);
    const quantidadeCell = row.insertCell(1);
    const espacosCell = row.insertCell(2);
    const custoCell = row.insertCell(3);

    countEquipamentos++;

    //var rowIndex = tabela.rows.length - 1; acho que serve pra definir id, mas ver isso dps
    var nomeInputId = 'equipament_nome_id_' + countEquipamentos;
    var quantidadeInputId = 'equipament_quantidade_id_' + countEquipamentos;
    var espacosInputId = 'equipament_espacos_id_' + countEquipamentos;
    var custoInputId = 'equipament_custo_id_' + countEquipamentos;

    inputIds.push({
        nomeInputId: nomeInputId,
        quantidadeInputId: quantidadeInputId,
        espacosInputId: espacosInputId,
        custoInputId: custoInputId
    });

    var nomeInput = document.createElement('input');
    var quantidadeInput = document.createElement('input');
    var espacosInput = document.createElement('input');
    var custoInput = document.createElement('input');

    nomeInput.id = nomeInputId;
    nomeInput.type = 'text';
    nomeInput.classList.add('clean-border');

    quantidadeInput.id = quantidadeInputId;
    quantidadeInput.type = 'number';
    quantidadeInput.classList.add('clean-border');

    espacosInput.id = espacosInputId;
    espacosInput.type = 'number';
    espacosInput.classList.add('clean-border');

    custoInput.id = custoInputId;
    custoInput.type = 'number';
    custoInput.classList.add('clean-border');

    nomeCell.appendChild(nomeInput);
    quantidadeCell.appendChild(quantidadeInput);
    espacosCell.appendChild(espacosInput);
    custoCell.appendChild(custoInput);

    // Adicionando o botão de exclusão
    if (countEquipamentos > 15) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function() {
            const rowIndex = row.rowIndex;
            
            tabela.deleteRow(rowIndex);
    
            // Removendo o objeto correspondente do array de IDs
            inputIds.splice(rowIndex - 1, 1);
    
            // Atualizando os IDs restantes
            for (let i = rowIndex - 1; i < inputIds.length; i++) {
                inputIds[i].nomeInputId = 'equipament_nome_id_' + (i + 1);
                inputIds[i].quantidadeInputId = 'equipament_quantidade_id_' + (i + 1);
                inputIds[i].espacosInputId = 'equipament_espacos_id_' + (i + 1);
                inputIds[i].custoInputId = 'equipament_custo_id_' + (i + 1);
    
                document.getElementById('equipament_nome_id_' + (i + 1)).id = inputIds[i].nomeInputId;
                document.getElementById('equipament_quantidade_id_' + (i + 1)).id = inputIds[i].quantidadeInputId;
                document.getElementById('equipament_espacos_id_' + (i + 1)).id = inputIds[i].espacosInputId;
                document.getElementById('equipament_custo_id_' + (i + 1)).id = inputIds[i].custoInputId;
            }
        };
        row.appendChild(deleteButton);
    }
}

for (let i = 0; i < 15; i++) {
    modificarTabelaEquipamentos();
}

// SALVAR HABILIDADES DE ESPECIALIZAÇÃO (ESCOLHA)
let countEspecializacao = 0;

function escreverHabilidadesEspecializacao() {
    const especializacao = document.getElementById("ficha_especializacao").value;
    const especializacaoSelecionada = habilidadesEspecializacao[especializacao];

    const selectHabilidadesEspecializacao = document.getElementById("selectHabilidadesEspecializacao"); // escreve aqui
    
    countEspecializacao++;

    var novoParagrafo = document.createElement("p"); // Cria um novo parágrafo
    var novoSelect = document.createElement("select");
    novoSelect.id = 'select_especializacao_' + countEspecializacao;
    novoSelect.classList.add('especializacao');
    novoParagrafo.appendChild(novoSelect); // Adiciona o select ao novo parágrafo

    especializacaoSelecionada.forEach(habilidade => {
        var novaOpcao = document.createElement("option");
        novaOpcao.value = habilidade.nome;
        novaOpcao.textContent = habilidade.nome;
        novoSelect.appendChild(novaOpcao);
    });

    const botaoApagar = document.createElement('button');
    botaoApagar.textContent = 'Apagar';
    botaoApagar.onclick = function() {
        const index = Array.from(selectHabilidadesEspecializacao.children).indexOf(novoParagrafo);
        if (index !== -1) {
            selectHabilidadesEspecializacao.removeChild(novoParagrafo); // Remove o parágrafo inteiro
            removerElementoHabilidadesEspecializacao(index);
        }
    };
    novoParagrafo.appendChild(botaoApagar); // Adiciona o botão "Apagar" ao novo parágrafo
    selectHabilidadesEspecializacao.appendChild(novoParagrafo); // Adiciona o novo parágrafo ao elemento div
}

let repetido = 0;

function salvarArrayHabilidadesEspecializacao() {
    const especializacao = document.getElementById("ficha_especializacao").value;
    const especializacaoSelecionada = habilidadesEspecializacao[especializacao];

    if (infoCarregada == 0) {
        arrayHabilidadesEspecializacaoSalvas = []; // Limpa o array antes de salvar novamente
    }
    const selects = document.querySelectorAll('select.especializacao');
    selects.forEach(select => {
            arrayHabilidadesEspecializacaoSalvas.push(select.value);
    });
    if (infoCarregada > 0) {
        arrayHabilidadesEspecializacaoSalvas.pop();
    }
    if (infoCarregada == 0) {
        arrayHabilidadesEspecializacaoSalvas.shift();
    }
    console.log('Habilidades de Especialização Salvas:', arrayHabilidadesEspecializacaoSalvas);

    let habilidadesEspecializacaoHTML = "";
    
    arrayHabilidadesEspecializacaoSalvas.forEach(nomeHabilidade => { // isso foi dificil (pro chagpt) fazer. as vezes o problema tá na raiz mesmo.
        const habilidade = especializacaoSelecionada.find(hab => hab.nome === nomeHabilidade);
        if (habilidade) {
            habilidadesEspecializacaoHTML += `<p><b>${habilidade.nome}. </b>`; 
            habilidadesEspecializacaoHTML += `${habilidade.descricao}</p>`;
        }
    });

    document.getElementById("descricoesHabilidadesEspecializacao").innerHTML = habilidadesEspecializacaoHTML; // escreve na ficha
}

function adicionarElementoHabilidadesEspecializao(elemento) {
        const index = arrayHabilidadesEspecializacaoSalvas.indexOf(elemento);

        if (index !== -1) {
            // Se o elemento já existe no array, atualiza-o
            arrayHabilidadesEspecializacaoSalvas[index] = elemento;
        } else {
            // Se o elemento não existe no array, adiciona-o
            arrayHabilidadesEspecializacaoSalvas.push(elemento);
        }

        console.log(`Elemento adicionado/atualizado com sucesso.`);
}

function removerElementoHabilidadesEspecializacao(index) {
        console.log(`Elemento removido com sucesso.`);
}

// SALVAR TALENTOS 
let countTalentos = 0;

function escreverTalentos() {
    const selectTalentos = document.getElementById("selectTalentos"); // escreve aqui
    
    countTalentos++;

    var novoParagrafo = document.createElement("p"); // Cria um novo parágrafo
    var novoSelect = document.createElement("select");
    novoSelect.id = 'select_talentos_' + countTalentos;
    novoSelect.classList.add('talento');
    novoParagrafo.appendChild(novoSelect); // Adiciona o select ao novo parágrafo

    Talentos.forEach(talento => {
        var novaOpcao = document.createElement("option");
        novaOpcao.value = talento.nome;
        novaOpcao.textContent = talento.nome;
        novoSelect.appendChild(novaOpcao);
    });

    const botaoApagar = document.createElement('button');
    botaoApagar.textContent = 'Apagar';
    botaoApagar.onclick = function() {
        const index = Array.from(selectTalentos.children).indexOf(novoParagrafo);
        if (index !== -1) {
            selectTalentos.removeChild(novoParagrafo); // Remove o parágrafo inteiro
            removerElementoTalentos(index);
        }
    };
    novoParagrafo.appendChild(botaoApagar); // Adiciona o botão "Apagar" ao novo parágrafo
    selectTalentos.appendChild(novoParagrafo); // Adiciona o novo parágrafo ao elemento div
}

function salvarArrayTalentos() {
        console.log(nomesTecnicas);
    console.log(descricoesTecnicas);
    if (infoCarregada == 0) {  
        arrayTalentosSalvos = []; 
    }
    const selects = document.querySelectorAll('select.talento');
    selects.forEach(select => {
            arrayTalentosSalvos.push(select.value);
    });
    if (infoCarregada > 0) {
        arrayTalentosSalvos.pop();
    }
    if (infoCarregada == 0) {
        arrayTalentosSalvos.shift();
    }
    console.log('Talentos salvos:', arrayTalentosSalvos);

    let TalentosHTML = "";
    
    arrayTalentosSalvos.forEach(nomeTalento => { // isso foi dificil (pro chagpt) fazer. as vezes o problema tá na raiz mesmo.
        const talento = Talentos.find(tal => tal.nome === nomeTalento);
        if (talento) {
            TalentosHTML += `<p><b>${talento.nome}. </b>`; 
            TalentosHTML += `${talento.descricao}</p>`;
        }
    });

    document.getElementById("descricoesTalentos").innerHTML = TalentosHTML; // escreve na ficha
}

function adicionarElementoTalentos(elemento) {
        const index = arrayTalentosSalvos.indexOf(elemento);

        if (index !== -1) {
            arrayTalentosSalvos[index] = elemento;
        } else {
            arrayTalentosSalvos.push(elemento);
        }

        console.log(`Elemento adicionado/atualizado com sucesso.`);
}

function removerElementoTalentos(index) {
        const elementoRemovido = arrayTalentosSalvos.splice(index, 1);
        const elemento = elementoRemovido[0];
        console.log(`Elemento removido com sucesso.`);
}

// SALVAR HABILIDADES AMALDIÇOADAS 
let countHabilidadesAmaldicoadas = 0;

function escreverHabilidadesAmaldicoadas() {
    const selectHabilidadesAmaldicoadas = document.getElementById("selectHabilidadesAmaldicoadas"); // escreve aqui
    
    countHabilidadesAmaldicoadas++;

    var novoParagrafo = document.createElement("p"); // Cria um novo parágrafo
    var novoSelect = document.createElement("select");
    novoSelect.id = 'select_amaldicoadas_' + countHabilidadesAmaldicoadas;
    novoSelect.classList.add('habilidade_amaldicoada');
    novoParagrafo.appendChild(novoSelect); // Adiciona o select ao novo parágrafo

    habilidadesAmaldicoadas.forEach(habilidadeAmaldicoada => {
        var novaOpcao = document.createElement("option");
        novaOpcao.value = habilidadeAmaldicoada.nome;
        novaOpcao.textContent = habilidadeAmaldicoada.nome;
        novoSelect.appendChild(novaOpcao);
    });

    const botaoApagar = document.createElement('button');
    botaoApagar.textContent = 'Apagar';
    botaoApagar.onclick = function() {
        const index = Array.from(selectHabilidadesAmaldicoadas.children).indexOf(novoParagrafo);
        if (index !== -1) {
            selectHabilidadesAmaldicoadas.removeChild(novoParagrafo); // Remove o parágrafo inteiro
            removerElementoHabilidadesAmaldicoadas(index);
        }
    };
    novoParagrafo.appendChild(botaoApagar); // Adiciona o botão "Apagar" ao novo parágrafo
    selectHabilidadesAmaldicoadas.appendChild(novoParagrafo); // Adiciona o novo parágrafo ao elemento div
}

function salvarArrayHabilidadesAmaldicoadas() {
    if (infoCarregada == 0) {
        arrayHabilidadesAmaldicoadasSalvas = []; 
    }
    const selects = document.querySelectorAll('select.habilidade_amaldicoada');
    selects.forEach(select => {
            arrayHabilidadesAmaldicoadasSalvas.push(select.value);
    });
    if (infoCarregada > 0) { 
        arrayHabilidadesAmaldicoadasSalvas.pop();
    }
    if (infoCarregada == 0) { 
        arrayHabilidadesAmaldicoadasSalvas.shift();
    }
    console.log('Habilidades Amaldiçoadas salvas:', arrayHabilidadesAmaldicoadasSalvas);

    let habilidadesAmaldicoadasHTML = "";
    
    arrayHabilidadesAmaldicoadasSalvas.forEach(nomeHabilidadeAmaldicoada => { // isso foi dificil (pro chagpt) fazer. as vezes o problema tá na raiz mesmo.
        const habilidadeAmaldicoada = habilidadesAmaldicoadas.find(ha => ha.nome === nomeHabilidadeAmaldicoada);
        if (habilidadeAmaldicoada) {
            habilidadesAmaldicoadasHTML += `<p><b>${habilidadeAmaldicoada.nome}. </b>`; 
            habilidadesAmaldicoadasHTML += `${habilidadeAmaldicoada.descricao}</p>`;
        }
    });

    document.getElementById("descricoesHabilidadesAmaldicoadas").innerHTML = habilidadesAmaldicoadasHTML; // escreve na ficha
}

function adicionarElementoHabilidadesAmaldicoadas(elemento) {
        const index = arrayHabilidadesAmaldicoadasSalvas.indexOf(elemento);

        if (index !== -1) {
            arrayHabilidadesAmaldicoadasSalvas[index] = elemento;
        } else {
            arrayHabilidadesAmaldicoadasSalvas.push(elemento);
        }

        console.log(`Elemento adicionado/atualizado com sucesso.`);
}

function removerElementoHabilidadesAmaldicoadas(index) {
        arrayHabilidadesAmaldicoadasSalvas.splice(index, 1);
}

// APARECER OPÇÕES DE ESPECIALIZACAO DO FETO AMALDICOADO
document.getElementById("ficha_origem").addEventListener("change", function() {
    const origemSelecionada = document.getElementById("ficha_origem").value; // pega exatamente qual a origem escolhida
    const divFeto = document.getElementById("fichaFetoAmaldicoado"); // pega examaente o div onde tá as opções de clãs

    if (origemSelecionada === "feto_amaldicoado") { 
        divFeto.style.display = "block"; 
    } else { // caso contrário
        divFeto.style.display = "none"; // muda o display para none, fazendo com que sua linha não apareça, e por ventura, nem o texto em si por conta do hidden no div
    }
});

let countCaracteristicasAnatomia = 0;

function escreverAnatomia() {
    const selectCaracteristicasAnatomia = document.getElementById("selectCaracteristicasAnatomia"); // escreve aqui
    
    countCaracteristicasAnatomia++;

    var novoParagrafo = document.createElement("p"); // Cria um novo parágrafo
    var novoSelect = document.createElement("select");
    novoSelect.id = 'select_caracteristicas_anatomia_' + countCaracteristicasAnatomia;
    novoSelect.classList.add('anatomia');
    novoParagrafo.appendChild(novoSelect); // Adiciona o select ao novo parágrafo

    caracteristicasAnatomia.forEach(caracteristicaAnatomia => {
        var novaOpcao = document.createElement("option");
        novaOpcao.value = caracteristicaAnatomia.nome;
        novaOpcao.textContent = caracteristicaAnatomia.nome;
        novoSelect.appendChild(novaOpcao);
    });

    const botaoApagar = document.createElement('button');
    botaoApagar.textContent = 'Apagar';
    botaoApagar.onclick = function() {
        const index = Array.from(selectCaracteristicasAnatomia.children).indexOf(novoParagrafo);
        if (index !== -1) {
            selectCaracteristicasAnatomia.removeChild(novoParagrafo); // Remove o parágrafo inteiro
            removerElementoAnatomia(index);
        }
    };
    novoParagrafo.appendChild(botaoApagar); // Adiciona o botão "Apagar" ao novo parágrafo
    selectCaracteristicasAnatomia.appendChild(novoParagrafo); // Adiciona o novo parágrafo ao elemento div
}

function salvarArrayAnatomia() {
    if (infoCarregada == 0) {
        arrayAnatomia = []; 
    }
    const selects = document.querySelectorAll('select.anatomia');
    selects.forEach(select => {
        arrayAnatomia.push(select.value);
    });
    if (infoCarregada > 0) {
        arrayAnatomia.pop();
    }
    if (infoCarregada == 0) {
        arrayAnatomia.shift();    
    }
    console.log('Características de Anatomia salvas:', arrayAnatomia);

    let anatomiaHTML = "";

    if (arrayAnatomia.length > 0) {
        anatomiaHTML += "<b>Características de Anatomia:</b><ul>";
    }
    arrayAnatomia.forEach(nomeAnatomia => { 
        const habilidadeAnatomia = caracteristicasAnatomia.find(ca => ca.nome === nomeAnatomia);
            anatomiaHTML += `<li><p><strong>${habilidadeAnatomia.nome}</strong>: ${habilidadeAnatomia.descricao}</p></li>`;
    });

    document.getElementById("fichaCaracteristicasAnatomia").innerHTML = anatomiaHTML; // escreve na ficha
}

function adicionarElementoAnatomia(elemento) {
        const index = arrayAnatomia.indexOf(elemento);

        if (index !== -1) {
            arrayAnatomia[index] = elemento;
        } else {
            arrayAnatomia.push(elemento);
        }
        console.log(`Elemento adicionado/atualizado com sucesso.`);
}

function removerElementoAnatomia(index) {
        arrayAnatomia.splice(index, 1);
}

// REAJUSTAR O TAMANHO DE TEXTOS PARA A DESCRIÇÃO DO PERSONAGEM
function resizeTextarea() {
    var textareas = document.getElementsByName("textoResponsivo");
    Array.from(textareas).forEach(function(textarea) {
        textarea.style.height = "";
        textarea.style.height = textarea.scrollHeight + "px";
    });
}

// ROLAR DADOS
// mesmo sistema de select options dos talentos e pá
// usuário seleciona entre as opções (d4, d6, d8, d10, d12, d20, d100)
// pra cada dado, aparece do lado da opção o dado
// usuário pode digitar um valor para servir como modificador
// quando o usuário clica em salvar, os dados rolam
// pega os resultados (todos com ids diferentes), o modificador e soma eles
// mostra o resultado na tela
var d6 = {
    lados: 6,
    roll: function () {
      var randomNumber_d6 = Math.floor(Math.random() * this.lados) + 1;
      return randomNumber_d6;
    }
  }

function printNumber(number) {
    var dado6 = document.getElementById('dado6');
    dado6.innerHTML = number;
}
  
var button_dado6 = document.getElementById('button_dado6');
  
button_dado6.onclick = function() {
    var result = d6.roll();
    printNumber(result);
};

// ARSENAL AMALDIÇOADO
document.getElementById("ficha_nome").addEventListener("change", function() {
    if (document.getElementById("ficha_nome").value == "Natanael Negrini") {
        const div = document.getElementById("NatanaelNegrini");
        div.style.display = "block"; 
    }
})
    
const select_maldicoes = document.getElementById('select_escolher_maldicao');
const p_maldicao_escolhida = document.getElementById('p_maldicao_escolhida');
const maldicoes = ["Lírica", "Devorador", "Maripanso"];
let maldicao_escolhida = "";

var turnos = 0;
let turnos_transformacaoHTML = ``;

function usar_arsenal() {
    var roll_d6 = Math.floor(Math.random() * 6) + 1;
    turnos = Math.floor(Math.random() * 4) + 1 + 1;
    if (roll_d6 != 1) {
        maldicao_escolhida = select_maldicoes.value;
    } else {
        var maldicao_aleatoria = maldicoes[Math.floor(Math.random()*maldicoes.length)]; // a variavel pode ser entendida assim: array[indice sorteado aleatoriamente]
        while (maldicao_aleatoria == select_maldicoes.value) {
            maldicao_aleatoria = maldicoes[Math.floor(Math.random()*maldicoes.length)];
        }
        maldicao_escolhida = maldicao_aleatoria;
    } 
    p_maldicao_escolhida.textContent = `Maldição escolhida: ${maldicao_escolhida}`;
    turnos_transformacaoHTML = `Turnos disponíveis: ${turnos}`;
    document.getElementById('p_turnos_transformacao').innerHTML = turnos_transformacaoHTML;
}

function alterar_turnos(modificador) {
    turnos += modificador;
    turnos_transformacaoHTML = `Turnos disponíveis: ${turnos}`;
    document.getElementById('p_turnos_transformacao').innerHTML = turnos_transformacaoHTML;
    modificador = 0;
}
  
// SALVAR TUDO
function salvar() {
    const nome = document.getElementById('ficha_nome').value;
    const nivel = document.getElementById('ficha_nivel').value;
    const origem = document.getElementById('ficha_origem').value;
    if (ficha_origem == "herdado") {
        const clas = document.getElementById('ficha_clas').value;
        userInfo.clas = clas;
    }
    const especializacao = document.getElementById('ficha_especializacao').value;
    const tipo_de_mulher = document.getElementById('ficha_tipo_de_mulher').value;
    const exp = document.getElementById('ficha_exp').value;
    const pv_atual = PVatual;
    const pe_atual = PEatual;

    const maestrias = [];
    document.querySelectorAll('.fichaDescricaoMaestrias').forEach(textarea => {
        maestrias.push(textarea.value);
    });

    const aparencia = document.getElementById('fichaDescricaoAparencia').value;
    const personalidade = document.getElementById('fichaDescricaoTracosPersonalidade').value;
    const historico = document.getElementById('fichaDescricaoHistorico').value;
    const tecnica_inata = document.getElementById('fichaDescricaoTecnicaInata').value;

    const pericias = arrayPericias.map(item => ({ // ser sincero champ, n sei como isso funciona
        nome: item.nome,
        maestria: item.maestria,
        especializacao: item.especializacao
    }));

    const habilidades_especializacao = arrayHabilidadesEspecializacaoSalvas;
    const talentos = arrayTalentosSalvos;
    const habilidades_amaldicoadas = arrayHabilidadesAmaldicoadasSalvas;
    const anatomia = arrayAnatomia;

    const nomes_tecnicas = nomesTecnicas;
    const descricoes_tecnicas = descricoesTecnicas;
    const descricoes_tecnicas_altura = descricoesTecnicasAltura;

    //const maldicao_escolhida = maldicao_escolhida;
    //const turnos = turnos;
    
    userInfo.nome = nome;
    userInfo.nivel = nivel;
    userInfo.origem = origem;
    userInfo.especializacao = especializacao;
    userInfo.tipo_de_mulher = tipo_de_mulher;
    userInfo.exp = exp
    userInfo.atributos_base = objetoAtributosBase;
    userInfo.bonus_de_atributos_racial = objetoAtributosBonus;
    userInfo.pv_atual = pv_atual;
    userInfo.pe_atual = pe_atual;
    userInfo.maestrias = maestrias;
    userInfo.aparencia = aparencia;
    userInfo.personalidade = personalidade;
    userInfo.historico = historico;
    userInfo.tecnica_inata = tecnica_inata;
    userInfo.pericias = pericias;
    userInfo.habilidades_especializacao = habilidades_especializacao;
    userInfo.talentos = talentos;
    userInfo.habilidades_amaldicoadas = habilidades_amaldicoadas;
    userInfo.anatomia = anatomia;
    userInfo.nomes_tecnicas = nomes_tecnicas;
    userInfo.descricoes_tecnicas = descricoes_tecnicas;
    userInfo.descricoes_tecnicas_altura = descricoes_tecnicas_altura;
    //userInfo.maldicao_escolhida = maldicao_escolhida;
    //userInfo.turnos = turnos;
    
    const jsonString = JSON.stringify(userInfo);
    document.getElementById('infoSalva').value = jsonString;
}

function carregar() {
    const jsonString = document.getElementById('infoCarregada').value;
    //try {
        const userInfo = JSON.parse(jsonString);

        // básico
        document.getElementById('ficha_nome').value = userInfo.nome || '';
        document.getElementById('ficha_nivel').value = userInfo.nivel || '';
        document.getElementById('ficha_origem').value = userInfo.origem || '';
        document.getElementById('ficha_especializacao').value = userInfo.especializacao || '';
        document.getElementById('ficha_tipo_de_mulher').value = userInfo.tipo_de_mulher || '';
        document.getElementById('ficha_exp').value = userInfo.exp || '';

        // atributos base
        objetoAtributosBase = userInfo.atributos_base;
        document.getElementById('forca').value = objetoAtributosBase['forca'] || '';
        document.getElementById('destreza').value = objetoAtributosBase['destreza'] || '';
        document.getElementById('constituicao').value = objetoAtributosBase['constituicao'] || '';
        document.getElementById('inteligencia').value = objetoAtributosBase['inteligencia'] || '';
        document.getElementById('sabedoria').value = objetoAtributosBase['sabedoria'] || '';
        document.getElementById('carisma').value = objetoAtributosBase['carisma'] || '';
        salvarAtributosBase();

        // atributos bonus de origem
        objetoAtributosBonus = userInfo.bonus_de_atributos_racial;
        document.getElementById('forca_bonus').value = objetoAtributosBonus['forca'] || '';
        document.getElementById('destreza_bonus').value = objetoAtributosBonus['destreza'] || '';
        document.getElementById('constituicao_bonus').value = objetoAtributosBonus['constituicao'] || '';
        document.getElementById('inteligencia_bonus').value = objetoAtributosBonus['inteligencia'] || '';
        document.getElementById('sabedoria_bonus').value = objetoAtributosBonus['sabedoria'] || '';
        document.getElementById('carisma_bonus').value = objetoAtributosBonus['carisma'] || '';
        definirAtributosBonusOrigem();

        // salva os atributos finais "automaticamente"
        SalvarAtributosFinais();

        // pv e pe modificados, atualmente não funciona
        document.querySelectorAll('#pontosVidaAtual').forEach(element => {
            if (element.tagName.toLowerCase() === 'input') {
                element.value = PVatual; // Use value para definir o valor de um elemento de entrada
            } else {
                element.textContent = PVatual; // Use textContent para definir o conteúdo de um elemento de texto
            }
         });

        // maestrias (de especialização)
        const maestrias = userInfo.maestrias || []; // Obtém as maestrias do objeto userInfo
        const textareaElements = document.querySelectorAll('.fichaDescricaoMaestrias'); // Seleciona todos os elementos com a classe 'fichaDescricaoMaestrias'
    
        // Itera sobre cada elemento e atribui o valor correspondente de maestrias, se existir
        textareaElements.forEach((textarea, index) => {
            textarea.value = maestrias[index] || ""; // Atribui o valor da maestria ou uma string vazia se não houver valor
        });

        // rosto
        document.getElementById('fichaDescricaoAparencia').value = userInfo.aparencia || '';
        document.getElementById('fichaDescricaoTracosPersonalidade').value = userInfo.personalidade || '';
        document.getElementById('fichaDescricaoHistorico').value = userInfo.historico || '';
        document.getElementById('fichaDescricaoTecnicaInata').value = userInfo.tecnica_inata || '';

        // pericias estão salvas na função de gerarTabelaPericias

        // arsenal amaldiçoado - sim eu perdi tempo na "ultima" semana antes da primeira sessão pra beneficiar meu personagem >:)
        //document.getElementById('p_maldicao_escolhida').value = userInfo.maldicao_escolhida || '';
        
        // habilidades de escolha
        infoCarregada += 1; // isso garante que o programa leia que em vez do usuário estar escrevendo coisas novas, ele está carregando as info

        // a maneira que todos estão sendo salvos é simplesmente salvar o array das habilidades respectivas no 
        // userInfo, e então passar do userInfo para as arrays do programa
        arrayHabilidadesEspecializacaoSalvas = userInfo.habilidades_especializacao || [];
        salvarArrayHabilidadesEspecializacao();

        arrayTalentosSalvos = userInfo.talentos || [];
        salvarArrayTalentos();

        arrayHabilidadesAmaldicoadasSalvas = userInfo.habilidades_amaldicoadas || [];
        salvarArrayHabilidadesAmaldicoadas();

        arrayAnatomia = userInfo.anatomia || [];
        document.getElementById("fichaFetoAmaldicoado").style.display = "block"; // mostra as escolhas de anatomia na ficha
        salvarArrayAnatomia();

        // habilidadse de técnicas
        nomesTecnicas = userInfo.nomes_tecnicas || [];
        descricoesTecnicas = userInfo.descricoes_tecnicas || [];
        descricoesTecnicasAltura = userInfo.descricoes_tecnicas_altura || [];

        // Limpa o container antes de adicionar novas técnicas carregadas
        const container = document.getElementById('fichaAdicionarHabilidadesTecnicas');
        container.innerHTML = '';

        // Adiciona as técnicas carregadas ao container
        for (let i = 0; i < nomesTecnicas.length; i++) {
            adicionarTecnica(); // Adiciona um novo campo de técnica
            const nomeInput = document.getElementById('nome_' + (i + 1));
            const descricaoTextarea = document.getElementById('descricao_' + (i + 1));
            nomeInput.value = nomesTecnicas[i];
            descricaoTextarea.value = descricoesTecnicas[i];
            console.log(descricoesTecnicasAltura[i]);
            descricaoTextarea.style.height = descricoesTecnicasAltura[i]; // pega a alatura do textarea salvo e reajusta a altura do textarea carreagado
            // odeio texto responsivo odeio texto responsivo odeio texto responsivo
            // ta consegui aparentemente e é aquele negocio: se tentar fazer coisa A não dá certo, tente fazer coisa B, pois em programação pode ter várias soluções para um único problema
        }
    //} catch (error) {
    //    alert('Erro ao carregar informações. Certifique-se de que o código está no formato JSON válido.');
    //}
}

function baixar() {
    const savedInfo = document.getElementById('infoSalva').value;
    const blob = new Blob([savedInfo], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_info.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

salvarAtributosBase();
definirAtributosBonusOrigem();
SalvarAtributosFinais();
