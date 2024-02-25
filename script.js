// REAJUSTAR O TAMANHO DE TEXTOS PARA A DESCRIÇÃO DO PERSONAGEM
function resizeTextarea() {
    var textareas = document.getElementsByName("textoResponsivo"); // pega cada descrição do "rosto" da ficha pelo nome
    textareas.forEach(function(textarea) { // para cada descrição de rosto, realiza a função abaixo
      textarea.style.height = ""; // Redefine a altura para calcular a altura real
      textarea.style.height = textarea.scrollHeight + "px"; // Define a altura conforme o conteúdo
    });
}

document.getElementsByName("textoResponsivo").forEach(function(textarea) {
    textarea.addEventListener("input", resizeTextarea);
});

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
let objetoAtributosBase = { // objeto 1
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

// LER ATRIBUTOS

function lerAtributos() {
    const atributosLidos = objetoAtributosBase;

    for (let atributoLido in atributosLidos) {
        
        console.log(`${atributoLido}: ${atributosLidos[atributoLido]}`);
    }
    console.log("Leitura de atributos finalizada."); 

}

// HABILIDADES DE ORIGEM, ESPECIALIZAÇÃO E TALENTOS

const habilidadesOrigem = {
    inato: [
        { nome: "Bônus de Atributo", descricao: `Um Inato recebe 3 pontos de atributos adicionais para distribuir entre os seus atributos.` },
        { nome: "Talento Natural", descricao: `Um inato é talentoso, tendo a energia 
        amaldiçoada como algo natural. Você recebe um Talento a sua
        escolha no 1° nível e outro no 6° nível.`}, // o template literals (o acento grave) permite a quebra de linhas em um mesmo texto
        { nome: "Marca Registrada", descricao: `Sua habilidade é inata e exclusiva para si, 
        o que o deixa ainda mais familiar com ela. Sendo assim, você já é
        naturalmente mais capaz de usá-la de diferentes formas, e em uma delas você se destaca ainda mais: você recebe uma
        habilidade de técnica gratuita, a qual terá o seu custo reduzido em 1 ponto de energia amaldiçoada. 
        Essa habilidade adicional não conta para o seu máximo de habilidades de técnica.`} 
    ], 

    herdado: [
        { nome: "Bônus de Atributo", descricao: `Um herdeiro recebe bônus em atributos baseados no seu clã escolhido.`},
        { nome: "Maestrias de Clã", descricao: `Cada clã dá Maestria/Especialização em perícias específicas.`},
        { nome: "Herança de Clã", descricao: `Um herdeiro tem técnicas e capacidades herdadas a partir da sua linhagem,
        destacando os valores e foco dela. Tal herança depende do clã escolhido para o personagem. 
        Todos os clãs disponíveis estão istados logo após a seção de Origens, em "Heranças de Clãs".`}
    ],

    derivado: [
        {nome: "Bônus de Atributo", descricao: `Um derivado recebe 3 pontos adicionais para distribuir entre os seus atributos.`},
        {nome: "Energia Antinatural", descricao: `Sua energia deriva de uma fonte anormal e por isso, tem traços únicos próprios dela.
        Você recebe uma Habilidade Amaldiçoada de Aura, a qual você deve atender os requisitos. 
        Além disso, você possui uma pequena reserva oculta de energia no seu âmago, da qual pode extrair quando necessário:
        como uma ação bÔnus, dentro de combate, você pode recuperar um valor de energia amaldiçoada igual ao dobro do seu bônus de maestria.
        Você pode usar essa característica uma vez por dia.`},
        {nome: "Desenvolvimento Inesperado", descricao: `O desenvolvimento de um
        Derivado é inesperado, podendo surpreender. A cada 4
        níveis, você pode escolher aumentar o valor máximo natural de
        um atributo em 2, até um limite de 30.`}

    ],

    restringido: [
        {nome: "Bônus de Atributo", descricao: `. Um restringido recebe 2 pontos adicionais para distribuir
        entre os seus atributos, além de ter os seus valores de Força, Destreza e
        Constituição aumentados em 1. `},
        {nome: "Restrição Celeste", descricao: `Você teve a energia
        amaldiçoada completamente tirada de você e,
        em troca, seu corpo é único, capaz de se
        desenvolver além do limite humano, com força,
        destreza e constituição absurdas. Você recebe
        acesso a especialização Restringido; seu
        movimento aumenta em 3 metros; em um
        descanso curto, você adiciona metade do seu
        modificador de maestria a quantidade de
        dados curados, além de todos os benefícios da
        habilidade base do Restringido. `}
    ],

    feto_amaldicoado: [
        {nome: "Bônus de Atributo", descricao: `Um feto amaldiçoado recebe 3 pontos adicionais para distribuir entre seus atributos.`},
        {nome: "Formado de Energia", descricao: `Você é parcialmente formado de energia amaldiçoada.
        Você é vulnerável a dano de energia reversa, e não pode ser curado por ela,
        apenas por energia amaldiçoada. Caso obtenha uma habilidade de energia
        reversa de cura, você pode a utilizar tratando a energia reversa como energia
        amaldiçoada. Por exemplo, ao invés de 1 ponto de energia reversa, você gasta
        diretamente 2 pontos de energia amaldiçoada. `},
        {nome: "Físico Amaldiçoado", descricao: `Sendo meio maldição, o seu físico é único,
        desenvolvendo um corpo com propriedades especiais. Você
        escolhe uma perícia para receber um bônus de +2 em,
        representando o seu corpo se especializando nisso.
        Você também recebe uma Característica de
        Anatomia, entre as listadas na próxima página. A
        cada 5 níveis, seu corpo desenvolve mais, dando-o
        outra característica de anatomia.`},
        {nome: "Vigor Maldito", descricao: `Uma quantidade de vezes por
        descanso curto ou longo, igual ao seu bônus de
        maestria, você pode se curar em 2d6 + modificador de
        constituição como uma ação bônus.`}
    ],

    sem_tecnica: [
        {nome: "Bônus de Atributo", descricao: `Um sem técnica recebe 4 pontos adicionais para distribuir
        entre seus atributos, com um máximo de 3 pontos colocados no mesmo
        atributo.`},
        {nome: "Estudos Dedicados", descricao: `Um sem técnica se dedica muito em seus estudos,
        recebendo maestria em 2 perícias a sua escolha`},
        {nome: "Empenho Implacável", descricao: `Para compensar pela falta de uma técnica, você se
        empenha de maneira implacável, sempre buscando evoluir na dedicação e no
        treino. Conforme sobe de nível, um sem técnica recebe os seguintes benefícios:
        - No nível 1, recebe um talento ou habilidade amaldiçoada, a sua
        escolha.
        - No nível 3, recebe um bônus de +2 em 3 perícias a sua escolha.
        - No nível 6 recebe uma habilidade de especialização adicional.
        - No nível 10, recebe um talento ou habilidade amaldiçoada, a sua
        escolha.
        - No nível 13 recebe um bônus de +3 em 2 perícias a sua escolha.
        - No nível 15, recebe uma habilidade de especialização adicional.
        - No nível 17, recebe um bônus de +5 em 2 perícias a sua escolha.
        - No nível 19, recebe uma habilidade de especialização e um
        talento adicional.`},

    ],

    corpo_amaldicoado_mutante: [
        {nome: "Bônus de Atributo", descricao: `Um corpo amaldiçoado mutante recebe 2 pontos
        adicionais para distribuir entre seus atributos.`},
        {nome: "Forma de Vida Sintética", descricao: `Você é uma forma de vida artificial, o que afeta
        grandemente o funcionamento de seu corpo e organismo: você é imune a dano
        venenoso e a condição envenenado, mas você não recebe os efeitos de
        refeições nem de itens do tipo Medicina.`},
        {nome: "Mutação Abrupta", descricao: `Como um corpo amaldiçoado, você passou por uma abrupta
        mutação que o concedeu capacidade de produzir energia, ser consciente e ter
        sua essência dividida em diferentes núcleos. Você inicia com dois núcleos, e
        pode receber mais um a cada 10 níveis. Sua integridade da alma é dividida
        igualmente entre a quantidade de núcleos que você possui; como uma
        ação completa, você pode alternar o núcleo ativo; cada núcleo
        ativo possui seus próprios valores de atributos, pontos de vida,
        energia e habilidades de especialização, com a mesma
        quantidade de níveis do primário. Outros núcleos além do
        primário não podem realizar Multiclasse, devido a
        necessidade de ter um foco. Com exceção do seu núcleo
        primário, os núcleos são imediatamente desativados caso
        seus pontos de vida desçam para 0 e, caso haja dano excedente
        o suficiente para ultrapassar metade do máximo de vida do
        núcleo como vida negativa, ele é permanentemente destruído.
        Um núcleo desativado se recupera após um descanso longo`},

    ],

    modelo: [
        {nome: "Bônus de Atributo", descricao: ``},
        {nome: "", descricao: ``},
        {nome: "", descricao: ``},
        {nome: "", descricao: ``}

    ]

}

const habilidadesEspecializacao = {
    lutador: [
        { nome: "Mestre de Luta", descricao: `Um lutador é um mestre da luta, dedicando-se ao seu corpo` },
        { nome: "Empolgação", descricao: `Uma boa luta é empolgante e te motiva a se arriscar mais e mais, permitindo movimentos mais fortes e únicos.`}
    ],

    especialista_em_combate: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`}
    ]
}

// APARECER OPÇÃO DE CLÃS PARA HERDADO
document.getElementById("ficha_origem").addEventListener("change", function() { // o addEventListener("change") funciona toda vez que o selecionado for alterado
    const origemSelecionada = document.getElementById("ficha_origem").value; // pega exatamente qual a origem escolhida
    const divClas = document.getElementById("ficha_clas"); // pega examaente o div onde tá as opções de clãs

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
    const divAtributosBonus = document.getElementById("ficha_atributos_bonus");

    if (origemSelecionada === "restringido") {
        document.getElementById("forca_bonus").value = 1;
        document.getElementById("destreza_bonus").value = 1;
        document.getElementById("constituicao_bonus").value = 1;
    };
};

AtributoBonus(); // ativa o evento uma vez
document.getElementById("ficha_origem").addEventListener("change", AtributoBonus); // ativa o evento toda vez que a (nesse caso) origem mudar

const objetoAtributosBonus = {}; // segundo objeto do codigo

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

function SalvarAtributosBonus() {
    // nada por enquanto
}

// SALVAR ATRIBUTOS FINAIS
function SalvarAtributosFinais() { // ACHO QUE TENHO QUE REFAZER TODO ESSE CÓDIGO, ESTÁ SOMANDO A 0 E PODE SER ADICIONADO BONUS INFINITAMENTE
    let atributosBase = objetoAtributosBase;
    let atributosBonus = objetoAtributosBonus;

    let atributosFinais = {
        Força: atributosBase.forca + parseInt(atributosBonus.forca),
        Destreza: atributosBase.destreza + parseInt(atributosBonus.destreza),
        Constituição: atributosBase.constituicao + parseInt(atributosBonus.constituicao),
        Inteligência: atributosBase.inteligencia + parseInt(atributosBonus.inteligencia),
        Sabedoria: atributosBase.sabedoria + parseInt(atributosBonus.sabedoria),
        Carisma: atributosBase.carisma + parseInt(atributosBonus.carisma)
    };

    // ESCREVER ATRIBUTOS FINAIS NA FICHA
    function EscreverAtributos() {
        let atributosFichaHTML = "<p><h2>Atributos</h2>";

        for (let chave in atributosFinais) { // as chaves são as propriedades (no caso o nome dos atributos), então o atributosFinais[chave] mostra o valor da chave em questão
            console.log(`${chave}: ${atributosFinais[chave]}`);
            if ((atributosFinais[chave] - 10)/2 >= 0) {
                atributosFichaHTML += `<p>${chave}  ${atributosFinais[chave]} (+${Math.floor((atributosFinais[chave] - 10) / 2)})</p>`
            } else {
                atributosFichaHTML += `<p>${chave}  ${atributosFinais[chave]} (${((atributosFinais[chave] - 10) / 2)})</p>`
            }
          }
    
        document.getElementById("fichaAtributosAuto").innerHTML = atributosFichaHTML;
    }

    EscreverAtributos();
};

function mostrarMensagemAtributosFinais(mensagemAtributosFinais) {
    document.getElementById('mensagemAtributosFinais').textContent = mensagemAtributosFinais;
};

// MOSTRAR OS ATRIBUTOS FINAIS NA FICHA

//function SalvarEscreverAtributos() {
//    salvarAtributosFinais();
//    escreverAtributos();
//}

// ESCREVER HABILIDADES DE ORIGENS E ESPECIALIZAÇÕES NA FICHA

function escreverFicha() {
    const origem = document.getElementById("ficha_origem").value;
    const origemHabilidadesBase = habilidadesOrigem[origem];

    const especializacao = document.getElementById("ficha_especializacao").value;
    const especializacaoHabilidadesBase = habilidadesEspecializacao[especializacao];
    
    let personagemFichaHTML = "<p><h2>Habilidades de Origem:</h2><ul>";

    origemHabilidadesBase.forEach(habilidade => {
        personagemFichaHTML += `<li><strong>${habilidade.nome}</strong>: ${habilidade.descricao}</li>`;
    });
    personagemFichaHTML += "</ul>";

    personagemFichaHTML += "<h2><b>Habilidades Base de Especialização</b></h2><ul>";
    especializacaoHabilidadesBase.forEach(habilidadeBase => {
        personagemFichaHTML += `<li><strong>${habilidadeBase.nome}</strong>: ${habilidadeBase.descricao}</li>`;
    });
    personagemFichaHTML += "</ul>";
    personagemFichaHTML += "</ul>";

    document.getElementById("fichaAutomatizada").innerHTML = personagemFichaHTML;

}

document.getElementById("ficha_origem").addEventListener("change", escreverFicha);
document.getElementById("ficha_especializacao").addEventListener("change", escreverFicha);

escreverFicha();