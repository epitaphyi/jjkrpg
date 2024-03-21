let arrayAnatomia = [];
let objAnatomia = {};
let countAnatomia = 0;

function escreverAnatomia() {
    const selectHabilidadesAmaldicoadas = document.getElementById("selectHabilidadesAmaldicoadas"); // escreve aqui
    
    countHabilidadesAmaldicoadas++;

    var novoParagrafo = document.createElement("p"); // Cria um novo parágrafo
    var novoSelect = document.createElement("select");
    novoSelect.id = 'select_amaldicoadas_' + countHabilidadesAmaldicoadas;
    novoSelect.classList.add('talento');
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
    arrayHabilidadesAmaldicoadasSalvas = []; // Limpa o array antes de salvar novamente
    const selects = document.querySelectorAll('select.talento');
    selects.forEach(select => {
            arrayHabilidadesAmaldicoadasSalvas.push(select.value);
    });
    arrayHabilidadesAmaldicoadasSalvas.shift();
    console.log('Array salvo:', arrayHabilidadesAmaldicoadasSalvas);

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
        const elementoRemovido = arrayHabilidadesAmaldicoadasSalvas.splice(index, 1);
        const elemento = elementoRemovido[0];
        console.log(`Elemento removido com sucesso.`);
}