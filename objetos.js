// objetos.js
// objetos = {}
// arrays = []

// INFO SALVA
let userInfo = {
    nome : "", // propriedade e valor, nesse caso a propriedade é nome e o valor é vazio
    nivel : "",
    origem : "",
    clas : "",
    especializacao : "",
    tipo_de_mulher : "",
    exp : "",
    atributos_base: "",
    bonus_de_atributos_racial: "",
    pv_atual: "", 
    pe_atual: "",
    maestrias: "",
    pericias: "",
    equipamentos: "",
    habilidades_especializacao: "",
    talentos: "",
    habilidades_amaldicoadas: "",
    anatomia: "",
    aparencia: "",
    personalidade: "",
    historico: "",
    tecnica_inata: "",
    nomes_tecnicas: "",
    descricoes_tecnicas: "",
    descricoes_tecnicas_altura: "",
    maldicao_escolhida: "",
    turnos: ""
};

let infoCarregada = 0; // se tiver valor 0, é a mesma coisa que "Informação foi carregada pelo usuário? Não"
                       // se tiver valor 1, é a mesma coisa que "Informação foi carregada pelo usuário? Sim"

// ATRIBUTOS FINAIS
let atributosFinais = {
    Força: 0, 
    Destreza: 0, 
    Constituição: 0, 
    Inteligência: 0, 
    Sabedoria: 0,
    Carisma: 0,
};

// PERICIAS
let arrayPericias = [];

//let arrayEquipamentosID = [];
//let arrayTalentosID = [];

// VALORES DA FICHA
let Valores = {
    "Pontos de Vida": 0,
    "Pontos de Energia Amaldiçoada": 0,
    "Bônus de Maestria": 2,
    "Iniciativa": 0,
    "Movimento": 9,
    "Movimento de Voo": 0,
    "Integridade da Alma": 100,
    "Classe de Armadura": 0,
    "Atenção": 0,
    "Especialização em Perícias": 0,
};

let PVatual = 0;
let PEatual = 0;

// HABILIDADES BASE DE ORIGEM
const habilidadesOrigem = {
    inato: [
        { nome: "Bônus de Atributo", descricao: `Um Inato recebe 3 pontos de atributos adicionais para distribuir entre os seus atributos.<br><br>` },
        { nome: "Talento Natural", descricao: `Um inato é talentoso, tendo a energia 
        amaldiçoada como algo natural. Você recebe um Talento a sua
        escolha no 1° nível e outro no 6° nível.<br><br>`}, // o template literals (o acento grave) permite a quebra de linhas em um mesmo texto
        { nome: "Marca Registrada", descricao: `Sua habilidade é inata e exclusiva para si, 
        o que o deixa ainda mais familiar com ela. Sendo assim, você já é
        naturalmente mais capaz de usá-la de diferentes formas, e em uma delas você se destaca ainda mais: você recebe uma
        habilidade de técnica gratuita, a qual terá o seu custo reduzido em 1 ponto de energia amaldiçoada. 
        Essa habilidade adicional não conta para o seu máximo de habilidades de técnica.`} 
    ], 

    herdado: [
        { nome: "Bônus de Atributo", descricao: `Um herdeiro recebe bônus em atributos baseados no seu clã escolhido.<br><br>`},
        { nome: "Maestrias de Clã", descricao: `Cada clã dá Maestria/Especialização em perícias específicas.<br><br>`},
        { nome: "Herança de Clã", descricao: `Um herdeiro tem técnicas e capacidades herdadas a partir da sua linhagem,
        destacando os valores e foco dela. Tal herança depende do clã escolhido para o personagem. 
        Todos os clãs disponíveis estão istados logo após a seção de Origens, em "Heranças de Clãs".`}
    ],

    derivado: [
        {nome: "Bônus de Atributo", descricao: `Um derivado recebe 3 pontos adicionais para distribuir entre os seus atributos.<br><br>`},
        {nome: "Energia Antinatural", descricao: `Sua energia deriva de uma fonte anormal e por isso, tem traços únicos próprios dela.
        Você recebe uma Habilidade Amaldiçoada de Aura, a qual você deve atender os requisitos. 
        Além disso, você possui uma pequena reserva oculta de energia no seu âmago, da qual pode extrair quando necessário:
        como uma ação bônus, dentro de combate, você pode recuperar um valor de energia amaldiçoada igual ao dobro do seu bônus de maestria.
        Você pode usar essa característica uma vez por dia.<br><br>`},
        {nome: "Desenvolvimento Inesperado", descricao: `O desenvolvimento de um
        Derivado é inesperado, podendo surpreender. A cada 4
        níveis, você pode escolher aumentar o valor máximo natural de
        um atributo em 2, até um limite de 30.`}

    ],

    restringido: [
        {nome: "Bônus de Atributo", descricao: `. Um restringido recebe 2 pontos adicionais para distribuir
        entre os seus atributos, além de ter os seus valores de Força, Destreza e
        Constituição aumentados em 1. <br><br>`},
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
        habilidade base do Restringido.`}
    ],

    feto_amaldicoado: [
        {nome: "Bônus de Atributo", descricao: `Um feto amaldiçoado recebe 3 pontos adicionais para distribuir entre seus atributos.<br><br>`},
        {nome: "Formado de Energia", descricao: `Você é parcialmente formado de energia amaldiçoada.
        Você é vulnerável a dano de energia reversa, e não pode ser curado por ela,
        apenas por energia amaldiçoada. Caso obtenha uma habilidade de energia
        reversa de cura, você pode a utilizar tratando a energia reversa como energia
        amaldiçoada. Por exemplo, ao invés de 1 ponto de energia reversa, você gasta
        diretamente 2 pontos de energia amaldiçoada. <br><br>`},
        {nome: "Físico Amaldiçoado", descricao: `Sendo meio maldição, o seu físico é único,
        desenvolvendo um corpo com propriedades especiais. Você
        escolhe uma perícia para receber um bônus de +2 em,
        representando o seu corpo se especializando nisso.
        Você também recebe uma Característica de
        Anatomia, entre as listadas na próxima página. A
        cada 5 níveis, seu corpo desenvolve mais, dando-o
        outra característica de anatomia.<br><br>`},
        {nome: "Vigor Maldito", descricao: `Uma quantidade de vezes por
        descanso curto ou longo, igual ao seu bônus de
        maestria, você pode se curar em 2d6 + modificador de
        constituição como uma ação bônus.`}
    ],

    sem_tecnica: [
        {nome: "Bônus de Atributo", descricao: `Um sem técnica recebe 4 pontos adicionais para distribuir
        entre seus atributos, com um máximo de 3 pontos colocados no mesmo
        atributo.<br><br>`},
        {nome: "Estudos Dedicados", descricao: `Um sem técnica se dedica muito em seus estudos,
        recebendo maestria em 2 perícias a sua escolha<br><br>`},
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
        adicionais para distribuir entre seus atributos.<br><br>`},
        {nome: "Forma de Vida Sintética", descricao: `Você é uma forma de vida artificial, o que afeta
        grandemente o funcionamento de seu corpo e organismo: você é imune a dano
        venenoso e a condição envenenado, mas você não recebe os efeitos de
        refeições nem de itens do tipo Medicina.<br><br>`},
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

};

// HABILIDADES BASE DE CLASSE
const habilidadesBaseEspecializacao = {
    lutador: [
        { nome: "Mestre de Luta", descricao: `Um lutador é um mestre da luta, dedicando-se ao seu corpo e
        ao manejo de armas marciais que se encaixem em seu estilo intenso e
        adaptável, além de saber aproveitar bem a empolgação e o sangue fervendo.
        Sendo um lutador, você recebe as seguintes capacidades:
        
        <p>• Você sabe desferir golpes rápidos com o seu corpo. Ao realizar um
        ataque desarmado ou com uma arma marcial, você pode gastar 1 ponto
        de energia amaldiçoada para realizar um ataque desarmado como uma
        ação bônus.</p>
        <p>• Você treinou e se dedicou a fazer com que seu corpo fosse uma arma por
        si só. Seus punhos passam a contar como armas marciais e o dano do seu
        ataque desarmado se torna 1d6. Nos níveis 4, 9, 14 e 18 seu dano corpoa-corpo desarmado aumenta para 2d6, 3d8, 4d8 e 4d12,
        respectivamente.</p>
        <p>• Versatilidade e adaptabilidade são importantes. Você pode usar tanto
        força quanto destreza nos seus ataques desarmados e ataques com
        armas marciais.</p>` }, 
        { nome: "Empolgação", descricao: `Uma boa luta é empolgante e te motiva a se arriscar mais e mais,
        permitindo movimentos mais fortes e únicos. Para isso, você precisa continuar
        acertando golpes: você começa um combate com Nível de Empolgação 1 e, se
        no seu turno você acertar pelo menos um ataque, no começo do seu próximo
        turno você sobe um nível de empolgação, até um máximo de 5 níveis.
        A empolgação te permite realizar certas manobras especiais, as quais
        normalmente são fortalecidas por um bônus, que é o Dado de Empolgação, cujo
        valor varia com o nível, seguindo a tabela abaixo.
        <br><br><table>
        <tr><th>Nível de Empolgação</th> <th>Dado de Empolgação</th></tr>
        <tr><td>Nível 2</td> <td>1d4</td></tr>
        <tr><td>Nível 3</td> <td>1d6</td></tr>
        <tr><td>Nível 4</td> <td>2d4</td></tr>
        <tr><td>Nível 5</td> <td>2d6</td></tr>
        </table><br>
        Sempre que realizar uma manobra, você desce um nível de empolgação. Caso
        passe um turno sem acertar um ataque, você também desce um nível de
        empolgação. <br><br>
        Você aprende duas das manobras abaixo, aprendendo outras no nível 6, 12 e
        18.
        <p>• Ajuste. Às vezes um bom golpe só precisa de um ajuste. Ao realizar um
        ataque, você pode adicionar seu dado de empolgação na rolagem de
        acerto e no dano. Você pode escolher o fazer antes ou depois da rolagem
        de acerto.</p>
        <p>• Comando. Sua empolgação pode acabar contagiando seus aliados. Ao
        realizar um ataque, você comanda um aliado dentro de 1,5 metros a
        realizar um ataque corpo-a-corpo o acompanhando no mesmo alvo,
        como uma reação dele. Você ou aliado deve pagar 1 ponto de energia
        amaldiçoada para realizar o ataque. Caso use essa habilidade, você não
        pode utilizar ataque extra.</p>
        <p>• Desarme. Uma boa luta não deve ser contida pelo porte de uma arma.
        Ao acertar uma criatura com um ataque você aproveita para tentar a
        desarmar. Você adiciona seu dado de empolgação ao dano desse ataque
        e o alvo deve fazer um teste de Luta contra o resultado do seu ataque.
        Em uma falha ele larga um item à sua escolha que esteja manejando.</p>
        <p>• Esquiva. Com o sangue fervendo, é mais fácil se esquivar de ataques.
        Ao ser acertado por um ataque corpo-a-corpo você pode usar sua reação
        para diminuir o dano em um valor igual a uma rolagem do seu dado de
        empolgação + modificador de destreza + bônus de maestria.</p>
        <p>• Trabalho de Pés. Você usa da sua empolgação para trabalhar o seu
        movimento. Como uma ação comum, você pode escolher aumentar sua
        CA em um valor igual ao seu dado de empolgação, até o começo do seu
        próximo turno.</p>`},

        { nome: "Reflexo Evasico", descricao: `Em busca de uma boa luta, e conseguir durar nela, você
        começa a desenvolver um reflexo para evitar danos. Você recebe
        redução de dano a todo tipo, exceto alma, igual a metade do seu nível de
        Lutador.`}
    ],

    especialista_em_combate: [
        { nome: "Repertório do Especialista", descricao: `Repertório do Especialista. Como um Especialista em Combate, você pode
        escolher um estilo principal para seguir em sua especialização. No primeiro
        nível, você recebe um dos estilos de combate abaixo:
        <p>• Estilo Defensivo: Você foca em aprimorar a sua defesa. Sua Classe de
        Armadura aumenta em 2 e, nos níveis 4, 8, 12, 16 e 20 aumenta em +1.</p>
        <p>• Estilo do Arremessador: Você se versa em armas de arremesso. Você
        pode sacar uma arma de arremesso como parte do ataque, além de
        receber +2 em rolagens de dano com elas, o qual aumenta em +2 nos
        níveis 4, 8, 12, 16 e 20.</p>
        <p>• Estilo do Duelista: Você foca em duelar com uma única arma em mãos.
        Ao usar uma arma em uma mão e ter a outra livre, você recebe +2 em
        rolagens de acerto e dano, o qual aumenta em +1 nos níveis 4, 8, 12, 16 e
        20.</p>
        <p>• Estilo do Interceptador: Você se dedica a interceptar ataques em seus
        aliados. Quando um aliado dentro de 1,5 metros de você receber um
        ataque, você pode usar sua reação para reduzir o dano causado em Xd6 +
        seu modificador de força, destreza ou sabedoria, onde X é igual ao seu
        bônus de maestria.</p>
        <p>• Estilo do Protetor: Você se dedica a proteger seus aliados, buscando
        evitar um acerto. Quando uma criatura ataca um alvo além de você, que
        esteja dentro de 1,5 metros, você pode usar sua reação para impor
        desvantagem.</p>
        <p>• Estilo Distante: Você sabe como usar armas que focam em atingir de
        maneira distante. Você recebe +2 em rolagens de acerto e dano com
        armas a distância, o qual aumenta em +1 nos níveis 4, 8, 12, 16 e 20.</p>
        <p>• Estilo Duplo: Você sabe a maneira perfeita de manejar duas armas.
        Enquanto estiver lutando com duas armas, você pode adicionar o seu
        bônus de atributo no dano do ataque com a segunda arma, além de
        receber +2 na sua Classe de Armadura, o qual aumenta em +1 nos níveis
        5, 10, 15 e 20.</p>
        <p>• Estilo Massivo: Você domina armas pesadas e massivas. Quando rolar
        um 1 ou 2 em um dado na rolagem de dano com uma arma de duas mãos
        ou pesada, você pode rolar novamente esse dado, ficando com o novo
        resultado.</p>
        Você recebe um novo estilo de combate no nível 6 e outro no 12.<br><br>`},
        { nome: "Arte do Combate", descricao: `Arte do Combate. Levando o combate como uma arte a se estudar e
        aperfeiçoar, você sabe como se preparar e usar desse preparo para o
        possibilitar realizar ações especiais dentro de um combate. Você recebe uma
        quantidade de Pontos de Preparo igual ao seu nível de Especialista em Combate
        + Bônus de Maestria, os quais são usados para realizar artes de combate. Você
        sabe as seguintes artes de combate:
        <p>• Arremesso Ágil. Ao realizar um ataque corpo-a-corpo, você pode gastar 1
        ponto de preparo para, como uma ação bônus, realizar também um
        ataque com uma arma de arremesso.</p>
        <p>• Distração Letal. Ao realizar um ataque, você pode gastar 1 ponto de
        preparo para fazer com que ele foque em distrair o alvo. Caso o ataque
        acerte, a criatura atingida tem a sua Classe de Armadura reduzida em um
        valor igual ao seu bônus de maestria por uma rodada.</p>
        <p>• Execução Silenciosa. Ao realizar um ataque em uma criatura
        desprevenida, você pode gastar 1 ponto de preparo para aumentar a
        letalidade do ataque, adicionando 2d8 de dano. A cada 4 níveis, o dano
        aumenta em 1d8.</p>
        <p>• Golpe Descendente. Ao realizar um ataque corpo-a-corpo, você pode
        gastar 1 ponto de preparo para fazer com que ele venha por cima. Ao
        acertar um golpe descendente, sua Classe de Armadura aumenta em um
        valor igual ao seu bônus de maestria até o começo do seu próximo turno.
        <p>• Investida Imediata. Ao realizar a ação de ataque, você pode gastar 2
        pontos de preparo para substituir esse ataque por uma investida
        imediata, se aproximando até 4,5 metros de um alvo e realizando o
        ataque. Esse movimento não causa ataques de oportunidade.
        Sempre que eliminar um inimigo, você recupera um Ponto de Preparo; você
        pode usar sua ação comum para analisar o campo de batalha, recuperando dois
        Pontos de Preparo. Em um descanso curto, você recupera metade do seu
        máximo, enquanto em um descanso longo os recupera por completo.</p>
        Sempre que eliminar um inimigo, você recupera um Ponto de Preparo; você
        pode usar sua ação comum para analisar o campo de batalha, recuperando dois
        Pontos de Preparo. Em um descanso curto, você recupera metade do seu
        máximo, enquanto em um descanso longo os recupera por completo.`},
    ],

    especialista_em_tecnicas: [
        { nome: "Domínio dos Fundamentos", descricao: `Domínio dos Fundamentos. Como um especialista em técnicas, você tem uma
        maior dominância sobre os fundamentos da energia amaldiçoada e das suas
        habilidades. Você aprende duas das Mudanças de Fundamento abaixo:
        <p>• Técnica Cruel: Quando usar uma habilidade de técnica que força um teste
        de resistência você pode gastar 1 pontos de energia amaldiçoada para
        aumentar a CD do teste em 3 ou 2 pontos para aumentar em 5.</p>
        <p>• Técnica Cuidadosa: Quando usar uma habilidade de técnica em área você
        pode prevenir certas criaturas de serem afetadas. Você pode gastar uma
        quantidade de pontos igual ao seu modificador de Inteligência ou
        Sabedoria para fazer com que o dobro da quantidade de criaturas não
        seja afetado.</p>
        <p>• Técnica Distante: Quando usar uma habilidade a distância, você pode
        gastar 2 pontos de energia amaldiçoada para dobrar seu alcance. Caso
        seja uma habilidade corpo-a-corpo, você pode gastar 2 pontos de energia
        para a dar um alcance de 9 metros.</p>
        <p>• Técnica Duplicada: Uma vez por rodada, quando usar uma habilidade
        cujo alvo seja apenas uma criatura, você pode gastar pontos de energia
        para dar um segundo alvo a habilidade. O custo depende do nível da
        habilidade: 1 para habilidades nível zero e nível um, 2 para habilidades
        nível dois, 4 para habilidades nível três, 6 para habilidades nível quatro e
        10 para habilidades nível cinco.</p>
        <p>• Técnica Potente: Quando usar uma habilidade de dano, você pode gastar
        3 pontos de energia amaldiçoada e rolar novamente uma quantidade de
        dados de dano igual ao seu modificador de Inteligência ou Sabedoria,
        utilizando os melhores resultados.</p>
        <p>• Técnica Rápida: Uma vez por rodada, quando usar uma habilidade cujo
        tempo de conjuração seja de uma ação comum, você pode gastar pontos
        de energia amaldiçoada para a transformar em uma ação bônus. O custo
        depende do nível da habilidade: 1 para habilidades nível zero e nível um,
        3 para habilidades nível dois, 5 para habilidades nível três, 8 para
        habilidades nível quatro e 12 para habilidades nível cinco. Pré-Requisito:
        Nível 6.</p>
        Você aprende mais uma no nível 6, no nível 12 e no nível 18.<br><br>`},
    ],

    controlador: [
        { nome: "Treinamento em Controle", descricao: `Você é treinado para controlar maldições -
        shikigamis - ou criações - corpos amaldiçoados - em combate, administrando
        uma quantidade maior do que o comum para um feiticeiro conforme sua
        maestria cresce. Um controlador começa com dois shikigamis ou corpos
        amaldiçoados, à sua escolha. Além disso, ele é capaz de controlar suas
        invocações, seguindo as seguintes regras:
        <p>• Você deve comandar as suas invocações a utilizarem as ações delas.
        Pode-se usar sua ação bônus para as comandar a usar ações simples ou a
        sua ação comum para as comandar a usar ações complexas. Reações das
        invocações podem ser realizadas sem necessidade de as comandar,
        desde que o gatilho seja atendido e você deseje que usem, e fazer com
        que as invocações se movam não consome nenhum tipo de ação.</p>
        <p>• Cada comando só pode afetar uma certa quantidade de invocações por
        vez, a qual aumenta conforme o seu nível. Pode-se usar o comando de
        ação comum para uma invocação e o de ação bônus para outra. Do nível
        1 ao 4, seu comando afeta uma invocação; do nível 5 ao 9, afeta duas; do
        nível 10 ao 14, afeta três; do nível 15 ao 19 afeta quatro e, no nível 20,
        afeta cinco.</p>
        <p>• Você pode manter uma quantidade de invocações ativas ao mesmo
        tempo igual a 1 + o seu bônus de maestria.</p>
        <p>• Invocar ou ativar invocações é uma ação bônus, enquanto dissipá-las ou
        desativá-las é uma ação livre. Você pode invocar/ativar até duas
        invocações com a sua ação, enquanto não há limite para quantas pode
        dissipar ou desativar de uma vez.</p>
        O máximo de invocações que um Controlador pode ter é igual ao seu bônus de
        maestria somado ao seu modificador de Sabedoria ou Carisma. Um Invocador
        recebe uma nova invocação nos níveis 3, 6, 9, 12, 15 e 18, além de receber uma
        adicional no nível 10. As ações das invocações, assim como os seus atributos e
        características, estão registradas nas suas fichas de invocação.`                                                                                   },
    ],

    suporte: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`},
    ],

    restringido: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`},
    ]
};

// HABILIDADES DE CLASSE
let arrayHabilidadesEspecializacaoSalvas = [];
let objHabilidadesEspecializacaoSalvas = {};

const habilidadesEspecializacao = {
    lutador: [
        {nome: "Aparar Projéteis", 
        descricao: `Quando receber um ataque a distância, você pode gastar 1 ponto de energia e usar sua reação para tentar aparar o projétil, diminuindo o seu dano em 2d6 + Modificador de Destreza + Nível de Lutador`, 
        },
        
        {nome: "Ataque Inconsequente", 
        descricao: `Ataque Inconsequente. Você pode sacrificar sua defesa em troca de ataques mais poderosos. Ao realizar um ataque no seu turno, você pode decidir atacar inconsequentemente, recebendo +2 para acertar e somando +4 no dano, mas recebe em troca uma penalidade de 5 na sua Classe de Armadura, até o começo do seu próximo turno. `, 
        }, 
     
        {nome: "Atacar e Recuar", 
        descricao: `Uma vez por turno, ao realizar a ação de Ataque e acertar o alvo, você pode gastar 1 ponto de energia amaldiçoada para usar a ação Esquivar como uma reação.`,
        requisito_habilidade: true},
    
        {nome: "Fluxo", 
        descricao: `Conforme se empolga, você cada vez mais se aproxima de entrar “na zona”, um estado de completo foco e imersão na luta. A cada nível de empolgação que você subir, você recebe +1 em rolagens de acerto e +2 em rolagens de dano, até um máximo de +4 e +8, com nível de empolgação 5. `,
        requisito_nivel: 4},
    
        {nome: "", 
        descricao: ``,
        requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},
    
        {nome: "", 
        descricao: ``,
        requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},
    
        {nome: "", 
        descricao: ``,
        requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},
        
    ],

    especialista_em_combate: [
        {nome: "Arremesos Potentes", 
        descricao: `Você se torna capaz de extrair o máximo de potencial das armas de arremesso. 
        Sempre que realizar um ataque com uma arma de arremesso, ela conta como um nível de dano acima. 
        Além disso, no começo do seu turno você pode gastar 1 ponto de energia amaldiçoada para fazer com que seus ataques com armas de arremesso ignorem RD igual ao seu bônus de maestria.`},

        {nome: "Arremesos Rápido", 
        descricao: `Uma vez por rodada, quando faz um ataque com uma arma de arremesso, 
        você pode gastar 1 ponto de energia amaldiçoada para realizar um ataque adicional contra outro alvo, 
        arremessando outra arma ou uma mesma arma, desde que ela possua a propriedade Retorno.`}
    
    ]
};

// MAESTRIAS DE CLASSE, pq não juntar nas habilidadesEspecializacao?
const maestriasEspecializacao = {
    lutador: [
        {pericias: `Fortitude, Luta e três entre Atletismo, Acrobacia, Integridade, Intuição, Percepção, Pontaria e Reflexos.`, 
        armas_armaduras_escudos: `Armas Marciais, Armadura Leve, Média e Escudo Leve.`, 
        kit_de_ferramentas: `Um kit de ferramentas`}
    ],

    especialista_em_combate: [
        {pericias: `Luta, Pontaria e Fortitude. Atletismo ou Acrobacia e três outras quaisquer.`, 
        armas_armaduras_escudos: `Todas as armas, armaduras e escudos.`, 
        kit_de_ferramentas: `Dois kits de ferramentas`}
    ],

    especialista_em_tecnicas: [
        {pericias: `Astúcia, Feitiçaria, Ocultismo, Vontade e outras três quaisquer.`, 
        armas_armaduras_escudos: `Armas simples e armas a distância.`, 
        kit_de_ferramentas: `Dois kits de ferramentas`}    
    ],

    controlador: [
        {pericias: `Astúcia, Persuasão, Percepção, Vontade e outras duas quaisquer`, 
        armas_armaduras_escudos: `Armas Simples. Armadura Leve e Escudo Leve.`, 
        kit_de_ferramentas: `Um kit de ferramentas`}    
    ],

    suporte: [
        {pericias: `Astúcia, Medicina, Prestidigitação, Vontade e outras três quaisquer.`, 
        armas_armaduras_escudos: `Armas Simples, Armadura Leve a Robusta e Escudos. `, 
        kit_de_ferramentas: `Dois kits de ferramentas`}
    ],

    restringido: [
        {pericias: `Fortitude, Luta, Pontaria, Reflexos, e quatro quaisquer, exceto Feitiçaria.`, 
        armas_armaduras_escudos: `Todas as armas, armaduras e escudos.`, 
        kit_de_ferramentas: `Um kit de ferramentas`}
    ],

    escolhas: [
        {pericias: ``,
        armas_armaduras_escudos: ``,
        kit_de_ferramentas: ``}
    ]
};

// TALENTOS
let arrayTalentosSalvos = [];
let objTalentosSalvos = {};

const Talentos = [
    {nome: "Adepto de Combate", 
    descricao: `Você se torna adepto a um estilo de
    combate específico. Ao obter esse
    talento você aprende um dos estilos
    de combate da especialização
    Especialista em Combate.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Afinidade com Técnica", 
    descricao: `Com uma afinidade superior com a
    sua técnica amaldiçoada, você
    consegue a desenvolver melhor,
    criando mais extensões dela. Ao
    obter esse talento, você recebe uma
    habilidade de técnica a mais e tem o
    seu máximo aumentado em uma
    quantidade igual a metade do seu
    bônus de maestria. No nível 10, você
    recebe outra habilidade de técnica a
    mais.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Arremessos Debilitatentes", 
    descricao: `Ao arremessar armas, você sabe
    focar exatamente nos lugares em
    que é capaz de debilitar o alvo.
    Sempre que realizar um ataque com
    arma de arremesso, você pode optar
    por focar em debilitar o alvo,
    recebendo -5 no acerto, devido à
    dificuldade, mas caso acerte, o
    inimigo receberá -5 na próxima
    rolagem que realizar.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Artesão Amaldiçoado", 
    descricao: `A criação de ferramentas
    amaldiçoadas é um ofício no qual
    você busca se especializar por
    completo. Sempre que for realizar
    uma rolagem para criar ou melhorar
    uma ferramenta amaldiçoada, você a
    realiza com vantagem. Além disso,
    você recebe maestria em Ofício
    (Ferreiro) ou Feitiçaria, caso não
    possua; caso já possua em ambas,
    você se torna especialista em uma
    delas, a sua escolha.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Ataque Infalível", 
    descricao: `Ao rolar o dano de um ataque com
    arma, quando rolar 1 ou 2, você
    pode rolar novamente, ficando com
    o novo resultado, mesmo se for
    igual. Você também não pode ter os
    níveis de dano da sua arma
    reduzidos.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Atenção Infalível", 
    descricao: `Você não pode ser surpreendido, se
    consciente, e ataques de inimigos
    que você não possa ver não te
    deixam desprevenido. Você recebe
    um bônus de +5 em Atenção.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Atirador Preciso", 
    descricao: `Atacar a uma distância grande não
    impõe desvantagem no seu ataque a
    distância. Sua arma a distância ignora
    meia cobertura e 3/4 de cobertura.
    Antes de fazer um ataque com uma
    arma a distância você pode escolher
    receber uma penalidade de -5 para
    acertar em troca de infligir +10 de
    dano.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Dedicação Recompensadora", 
    descricao: `Você se dedica mais do que o
    normal em suas missões, imagem e
    desempenho, e recebe melhores
    recompensas, em troca. No quarto
    grau, você recebe dois itens de custo
    1 a mais; no terceiro grau, você
    recebe dois itens de custo 2 a mais;
    no segundo grau, você recebe um
    item de custo 2 a mais e 2 de custo 3
    a mais; no primeiro grau, você
    recebe dois itens de custo 3 a mais e
    um item de custo 4 a mais e, no grau
    especial, você recebe dois itens de
    custo 4 a mais.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Favorecido pela Sorte", 
    descricao: `Você tem uma sorte inexplicável, a
    qual o favorece nos momentos mais
    críticos. Você tem 3 pontos de sorte.
    Sempre que fizer uma rolagem, você
    pode gastar um ponto de sorte para
    rolar outro d20, podendo escolher
    usar qualquer um dos dois
    resultados. Você pode escolher rolar
    o outro dado após ver o resultado da
    primeira rolagem, mas antes de ver
    as consequências. Você também
    pode gastar 1 ponto de sorte quando
    é atacado, rolando um d20 e
    escolhendo se o inimigo usará o seu
    resultado ou o resultado dele. Você
    recupera seus pontos de sorte após
    um descanso longo.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Feiticeiro Companheiro", 
    descricao: `Em busca de garantir o sucesso,
    você recruta um feiticeiro para ser
    seu companheiro. Você recebe um
    aliado de um tipo a sua escolha:
    entre o nível 1 a 5, ele é iniciante;
    entre o nível 6 e 10, ele é veterano e,
    a partir do nível 11, ele se torna um
    mestre. Nos níveis 10 e 15 você
    recebe outro aliado.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Guarda Infalível", 
    descricao: `Você nunca baixa a sua guarda,
    mesmo em uma situação que pode
    ser vista como catastrófica. Em caso
    de um desastre, você não causa um
    ataque como reação. Caso um efeito
    imposto sobre você tente reduzir sua
    classe de armadura ou impor
    modificadores negativos em testes
    de resistência, você terá +4 para
    resistir.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Incremento de Atributo", 
    descricao: `Ao obter esse talento, você aumenta
    o valor de um atributo em 2,
    podendo superar até mesmo o limite
    natural. Você pode pegar este
    talento várias vezes, mas apenas
    uma vez para cada atributo.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Investida Aprimorada", 
    descricao: `Você domina a arte de realizar uma
    investida, otimizando-a para extrair o
    potencial máximo da ação. Ao
    realizar uma ação de investida, seu
    movimento aumenta em 3 metros
    durante ela; o bônus de acerto
    aumenta de +2 para um valor igual
    ao seu bônus de maestria e, caso
    acerte o ataque, o alvo deve realizar
    um teste de Atletismo contra o seu,
    sendo derrubado em uma falha.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Maldiçao de Bolso", 
    descricao: `Você possui uma maldição pequena
    capaz de armazenar itens para você.
    Ela deve estar próxima de você. O
    inventário da maldição de bolso
    possui 8 espaços. Retirar um item
    dela conta como uma ação livre.
    Itens com energia amaldiçoada
    armazenados no interior dela não
    são detectáveis.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Mestre das Armas", 
    descricao: `Aumenta a Força ou Destreza em 1.
    Você recebe maestria em quatro
    armas quaisquer a sua escolha.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Mestre Defensivo", 
    descricao: `Aumenta a Força ou Constituição em
    1. Você recebe maestria em dois
    tipos de armadura a sua escolha e
    em escudos.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Provocação Desafiadora", 
    descricao: `Não só provocar, mas você é capaz
    de se transformar no centro da
    atenção daquele que você deseja
    desafiar. Uma criatura que seja
    afetada por uma ação de Provocar
    sua, ao invés de receber
    desvantagem para atacar outras
    criaturas, só pode realizar ataques
    contra você, até que suceda em um
    teste para escapar da provocação.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Resiliência Melhorada", 
    descricao: `Você recebe maestria em uma
    perícia usada para testes de
    resistência a sua escolha e, caso já
    possua maestria, se torna
    especialista. O valor do atributo
    usado na perícia escolhida aumenta
    em 2.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas Agressivas de Escudo", 
    descricao: `Você aperfeiçoa o uso do seu escudo
    para colocá-lo no seu ataque. Ao
    atacar no seu turno, você pode usar
    sua ação bônus para empurrar o alvo
    do ataque, usando seu escudo. Caso
    ele seja empurrado com sucesso, ela
    recebe Xd4, onde X é igual ao seu
    modificador de força, de dano de
    impacto, somando seu modificador
    de força. Ela também fica caída e
    pode ser empurrada em até 4,5
    metros ao invés de 1,5 metros.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas de Arremesso", 
    descricao: `Você se aprofunda em técnicas para
    manusear armas de arremesso no
    seu potencial máximo e evitar
    desperdiçar uma delas. Sempre que
    atacar com uma arma de arremesso,
    você recebe um bônus de +2 para
    acertar e +3 no dano. Caso erre um
    ataque com uma arma de arremesso,
    ela imediatamente volta para a sua
    mão, a menos que algo na trajetória
    impeça.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas de Reação Rápida", 
    descricao: `Você recebe +5 de Iniciativa. Após a
    rolagem de iniciativa, caso você não
    seja o primeiro, você pode rolar
    novamente, ficando com o melhor
    resultado.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas Defensivas de Escudo", 
    descricao: `Você aperfeiçoa o uso do seu escudo
    para colocá-lo por completo na sua
    defesa. Ao invés de receber
    penalidade, você passa a adicionar o
    bônus do escudo em testes de
    resistência de reflexos para resistir a
    efeitos e ataques. Caso você seja
    submetido a um efeito que o permita
    realizar um teste de resistência para
    receber apenas metade do dano, e
    suceda, você pode usar sua reação
    para não receber nenhum dano,
    utilizando do seu escudo para anular
    os efeitos do ataque em você.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Tempestade de Ideias", 
    descricao: `Você decide extrair ao máximo o seu
    potencial, obtendo melhorias e
    novas maestrias. Aumenta um
    atributo a sua escolha em 1. Você
    recebe maestria em duas perícias e
    duas ferramentas a sua escolha.
    Escolha uma das suas maestrias,
    exceto Luta e Pontaria, para ter o seu
    bônus de maestria adicionado em
    toda rolagem que a utilize, desde
    que não seja para ataques.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnica de Empunhadora Dupla [Pré-Requisito: Força ou Destreza 14]", 
    descricao: `Você recebe um bônus de +1 na sua
    classe de armadura quando estiver
    empunhando uma arma em cada
    mão. Você pode lutar com duas
    armas mesmo que as armas não
    sejam leves, desde que não possuam
    a propriedade pesada ou duas mãos.
    Você pode sacar ou guardar duas
    armas ao invés de uma.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas de Imobilização [Pré-Requisito: Força ou Constituição 16]", 
    descricao: `Você tem vantagem para atacar uma
    criatura que estiver agarrando e
    causa Xd6 de dano adicional, onde X
    é igual ao seu bônus de maestria.
    Você pode usar sua ação para tentar
    imobilizar a criatura que estiver
    agarrando, para tal, faça outro teste
    de Agarrar, em um sucesso você a
    imobiliza e a criatura fica
    Incapacitada e tem a classe de
    armadura reduzida em um valor igual
    ao seu bônus de maestria. Uma
    criatura imobilizada pode tentar
    escapar no começo do turno dela,
    repetindo o mesmo teste do agarrão.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Alma Inquebrável [Pré-Requisito: Constituição 14]", 
    descricao: `Sua alma é mais resistente do que o
    normal, com sua consciência e
    perseverança tornando-a difícil de se
    quebrar. Você recebe um bônus de
    +5 em rolagens de Integridade e
    redução de dano na alma igual a
    metade do seu nível de personagem.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Robustez Aprimorada [Pré-Requisito: Constituição 14]", 
    descricao: `Seus pontos de vida máximos
    aumentam em um valor igual ao
    dobro do seu nível ao obter esse
    talento. Sempre que subir de nível e
    tiver esse talento, você recebe +2
    pontos de vida máximos.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Determinado a Viver [Pré-Requisito: Constituição 17 ou Nível 10]", 
    descricao: `Uma vez por dia, na primeira vez
    que fosse para os testes de morte,
    você pode escolher ficar com 1 de
    vida ao invés disso. Todo teste de
    morte que você realiza, a partir do
    segundo, possui vantagem.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Correr e Atirar [Pré-Requisito: Destreza 14]", 
    descricao: `Um movimento rápido pode ser bem
    acompanhado pelos seus tiros,
    deixando-o mais seguro e letal. Ao
    realizar a ação Disparar enquanto
    maneja uma arma de fogo, você
    recebe RD igual ao seu modificador
    de Destreza e todos os seus ataques
    com armas de fogo, até o final do
    turno, causam um dado de dano
    adicional.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas de Esquiva [Pré-Requisito: Destreza 14]", 
    descricao: `Você recebe um bônus de +2 na sua
    Classe de Armadura e em Testes de
    Reflexos. Uma quantidade de vezes
    igual ao seu modificador de Destreza,
    você pode usar Esquivar como uma
    ação bônus. [Pré-Requisito: Destreza
    14]<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas de Mobilidade [Pré-Requisito: Destreza 14]", 
    descricao: `Seu movimento aumenta em 4,5
    metros. Quando usar Disparar,
    terreno difícil não te custa
    movimento adicional. Ao atacar uma
    criatura, você não causa ataques de
    oportunidade para ela pelo resto do
    seu turno, acertando o ataque ou
    não.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Discurso Motivador [Pré-Requisito: Maestria em alguma perícia de Carisma]", 
    descricao: `Você pode gastar 10 minutos
    inspirando seus aliados: todas as
    criaturas amigáveis próximas de você
    recebem HP temporário igual ao
    dobro do seu nível + seu modificador
    de carisma multiplicado pela metade
    do seu bônus de maestria,
    arredondado para cima. Uma
    criatura só pode receber esse bônus
    uma vez por descanso curto ou
    longo.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas de Ocultamento [Pré-Requisito: Maestria em Furtividade]", 
    descricao: `Você passa a aplicar o dobro do
    bônus de maestria em rolagens de
    furtividade. Se estiver escondido,
    você pode se mover até 4,5 metros
    sem se revelar, a menos que termine
    seu turno em um lugar onde sua
    presença é óbvia. Além de ficar
    desprevenido, o alvo de um ataque
    surpresa passa a receber -5 em todos
    os testes de resistência contra você,
    e não só Reflexos, enquanto
    desprevenido.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Especialista em Armaduras Pesadas [Pré-Requisito: Maestria em Armaduras Robuas ou Acima", 
    descricao: `Você sabe exatamente como vestir
    uma armadura pesada da maneira
    mais efetiva, protegendo-se.
    Enquanto estiver usando uma
    armadura robusta ou acima, você
    recebe redução de dano contra
    todos os tipos, exceto Dano na Alma,
    igual ao seu modificador de
    Constituição.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Disparos Perfurantes [Pré-Requisito: Nível 4]", 
    descricao: `Buscando valorizar ao máximo cada
    disparo, você consegue encontrar
    sempre o ângulo perfeito para que
    um bom tiro não seja desperdiçado
    em um único alvo. Ao realizar um
    ataque com uma arma de fogo
    contra um alvo ao qual haja uma
    criatura adjacente, a criatura
    adjacente deve realizar um TR de
    Reflexos e, caso falhe, recebe
    metade do dano causado ao alvo do
    ataque.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Mestre da Criação [Pré-Requisitos: Nível 4 e Maestria em dois Ofícios]", 
    descricao: `Praticando e estudando, você
    consegue otimizar o seu tempo para
    poder produzir mais itens em menos
    tempo. Quando for criar itens
    durante um interlúdio, você pode
    criar 2 itens adicionais; quando for
    criar itens durante um interlúdio em
    que optar por Criação de Itens, você
    pode criar 4 itens adicionais. Além
    disso, você recebe um bônus de +3
    em duas perícias de ofício a sua
    escolha.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Mestre dos Chicotes [Pré-Requisito: Nível 5]", 
    descricao: `Os chicotes são um tipo de arma
    exótico e único, recompensando
    aqueles que dominam o seu manejo
    com um novo potencial. Suas
    rolagens de ataque com chicotes
    causam +4 de dano e o alcance
    aumenta em 1,5 metros. Além disso,
    uma vez ao turno, quando acertar
    uma criatura com um ataque com
    chicote, você pode a forçar a realizar
    um TR de Fortitude e, caso falhe,
    você pode a puxar até 3 metros para
    sua direção.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas do Sentinela [Pré-Requisito: Nível 5]", 
    descricao: `Ao acertar uma criatura com um
    ataque de oportunidade, o
    movimento dela se torna 0. Criaturas
    provocam ataques de oportunidade
    para você até se elas usarem
    Desengajar. Quando uma criatura a
    1,5 metros de você faz um ataque
    contra um alvo além de você, você
    pode como uma reação realizar um
    ataque contra essa criatura.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Rápido no Gatilho [Pré-Requisito: Destreza 16 e Nível 6]", 
    descricao: `Você ignora a propriedade Recarga
    de armas a distância cujo custo seja
    ação bônus para recarregar. Estar a
    curta distância não o faz receber
    desvantagem em ataques com armas
    a distância.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Especialista em Concussão [Pré-Requisito: Nível 8]", 
    descricao: `Seu valor de força ou constituição
    aumenta em 1. Sempre que estiver
    usando uma arma que causa dano de
    impacto, considere o dano dela como
    um nível superior. Uma vez por
    turno, ao acertar uma criatura e
    infligir dano de impacto, você pode
    mover ela até 3 metros para um
    espaço desocupado, desde que o
    alvo não seja muito maior do que
    você. Ao acertar um ataque crítico,
    ataques contra o alvo recebem um
    bônus de +5 até o começo do seu
    próximo turno.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Especialista em Cortes [Pré-Requisito: Nível 8]", 
    descricao: `Seu valor de força ou destreza
    aumenta em 1. Sempre que estiver
    usando uma arma que causa dano
    cortante, considere o dano dela
    como um nível superior. Uma vez
    por turno, ao acertar uma criatura e
    infligir dano cortante, você pode
    reduzir o movimento dela em 4,5
    metros até o começo do seu próximo
    turno. Ao acertar um ataque crítico,
    o alvo receberá -5 em todas as
    rolagens de ataque até o seu
    próximo turno.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Especialista em Perfuração [Pré-Requisito: Nível 8]", 
    descricao: `Seu valor de força ou destreza
    aumenta em 1. Sempre que estiver
    usando uma arma que causa dano
    perfurante, considere o dano dela
    como um nível superior. Uma vez por
    turno, ao acertar uma criatura e
    infligir dano perfurante você pode
    rolar novamente os dados de dano,
    usando o melhor resultado total. Ao
    acertar um ataque crítico com dano
    perfurante, você adiciona mais um
    dado de dano da arma no total.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Mestre do Arremeso [Pré-Requisito: Nível 8, Técnicas de Arremesso]", 
    descricao: `Dominando ainda mais as armas de
    arremesso, você consegue as levar
    até o seu limite, tornando-se um
    efetivo mestre dos arremessos. Toda
    arma de arremesso que você utilizar
    tem o seu dano aumentado em um
    dado; o seu bônus em ataques com
    armas de arremesso se torna +4 para
    acertar e +6 no dano, e o alcance de
    ataques com armas de arremesso
    aumenta em 6 metros.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Segredos do Artesão da Alma [Pré-Requisito: Nível 10 e Maestria em Integridade]", 
    descricao: `Se aventurando por conhecimentos
    proibidos, você desvenda uma parte
    considerável dos segredos da alma,
    além de os implementar como um
    artesão, na arte da criação e do
    reparo. Você passa a adicionar o
    dobro do seu bônus de maestria em
    rolagens de Integridade, recebe 5 de
    RD a dano na alma e se torna capaz
    de reparar um núcleo destruído de
    um Corpo Amaldiçoado Mutante, o
    qual requer um teste de Ofício
    (Canalizador) e um teste de
    Integridade, ambos com CD igual a
    20 + nível do corpo amaldiçoado
    mutante + 2 para cada dia que se
    passou desde que o núcleo foi
    destruído.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Técnicas de Camuflagem [Pré-Requisito: Destreza 20, Nível 10 e Técnicas de Ocultamento]", 
    descricao: `Você amplia nas suas capacidades
    de se esconder, conseguindo não só
    ocultar, mas também camuflar,
    dando chances de que golpes errem:
    enquanto estiver escondido, você
    recebe camuflagem de 10% (1 em
    1d10 e o ataque erra). Você pode
    também optar por focar
    completamente em se camuflar,
    realizando um teste de Furtividade
    contra a Percepção/Atenção dos
    inimigos: você recebe camuflagem
    de 30% (1 a 3 em 1d10 e o ataque
    erra) contra todos que falharem no
    teste.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Familiaridade com Técnica [Pré-Requisito: Origem Inato, Nível 12]", 
    descricao: `Com a sua técnica amaldiçoada sendo parte da sua individualidade, você se
    torna cada vez mais e mais familiar com ela, otimizando-a em custo ou poder.
    Você pode escolher duas habilidades de técnica para ou reduzir o custo em um
    valor igual a metade do seu bônus de maestria ou aumentar o seu dano em dois
    dados.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Ideias Originais [Pré-Requisito: Origem Inato, Nível 5]", 
    descricao: `Decifrando cada mistério da sua técnica, você consegue ter mais ideias de
    como aplica-la. Ao obter este talento, você recebe uma habilidade de técnica
    adicional, a qual não conta para o seu máximo de habilidades. No 10° nível, você
    recebe mais uma habilidade de técnica, a qual também não conta para o seu
    máximo.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Conhecimentos Sigilosos [Pré-Requisito: Origem Herdado, Nível 6", 
    descricao: `Sendo herdeiro de um clã, você recebe acesso a conhecimentos sigilosos e
    importantes sobre as habilidades transmitidas na sua linhagem. Você recebe
    maestria na perícia que não escolheu em Maestrias de Clã, além de se tornar
    especialista nas duas perícias que você escolheu receber.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Manual de Técnica [Pré-Requisito: Origem Herdado, Nível 5]", 
    descricao: `Sua técnica já está registrada há muito tempo, com direito a um manual
    explicando seu funcionamento e uso. Ao obter este talento, você recebe uma
    habilidade de técnica adicional, a qual não conta para o seu máximo de
    habilidades. Além disso, o seu máximo de habilidades de técnica aumenta em 2.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Expansão de Reserva [Pré-Requisito: Origem Derivado, Nível 8]", 
    descricao: `Você expande a sua reserva de energia, a qual fica oculta em seu ser, apenas
    aguardando seu uso. Sua característica energia antinatural recebe as seguintes
    melhorias: recuperar energia da sua reserva se torna uma ação livre e, além
    disso, você recebe uma quantidade de pontos de energia temporários igual a
    metade do seu bônus de maestria, juntamente da recuperação.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Quebra de Limites [Pré-Requisito: Origem Derivado, Nível 6]", 
    descricao: `Você continua quebrando os seus limites a partir de um desenvolvimento fora
    da curva ordinária. Ao obter este talento, você recebe 2 pontos de atributo e
    pode escolher aumentar o valor máximo de dois atributos em 2, até um limite
    de 30.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Desarme Oportunista [Pré-Requisito: Origem Restringido, Nível 4]", 
    descricao: `Como um restringido, as armas são quase extensões do seu corpo, e um
    desarme é uma oportunidade de destruir seus inimigos. Ao suceder em
    desarmar um alvo, você pode gastar 2 pontos de vigor para, como uma reação,
    realizar um ataque com a arma desarmada contra o mesmo alvo do desarme.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Regeneração Maior [Pré-Requisito: Origem Restringido, Nível 10]", 
    descricao: `Seu corpo se regenera com mais agilidade e eficiência, dando-o mais
    disposição. Durante um descanso curto, você pode maximizar uma quantidade
    de dados de cura igual ao seu modificador de Constituição. Além disso, após um
    descanso longo, você pode rolar uma quantidade de dados de vida igual a
    metade do seu modificador de Constituição, ganhando-os como pontos de vida
    temporários.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Físico Aperfeiçoado [Pré-Requisito: Origem Feto Amaldiçoado, Nível 6]", 
    descricao: `O seu corpo específico e desenvolvido para uma área continua se 
    aperfeiçoando, ligando-se mais firmemente a certos aspectos. O bônus de
    perícia recebido pela característica Físico Amaldiçoado aumenta de +2 para +4,
    e você pode escolher mais uma perícia para receber um bônus de +2.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Reposição Sanguínea [Pré-Requisito: Origem Feto Amaldiçoada, Nível 6]", 
    descricao: `Além de um vigor maldito, ele se desenvolve para uma capacidade única de
    repor o seu sangue e saúde. Sua cura do Vigor Maldito passa a poder ser
    utilizada tanto como ação bônus quanto reação, além de aumentar para 3d10.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},
    
    {nome: "Coleta de Talismãs [Pré-Requisito: Origem Sem Técnica]", 
    descricao: `Em busca de novas maneiras de compensar pela sua falta de técnica, você
    passa a buscar coletar talismãs com shikigamis imbuídos. Ao obter este talento,
    você recebe o talismã de um shikigami de 4° grau, o qual você pode criar
    conforme as regras padrão de invocações. No nível 5, você recebe um shikigami
    de 3° grau; no nível 10 você recebe um shikigami de 2° grau e, no nível 15, você
    recebe um shikigami de 1° grau. Caso não seja um Controlador, você segue as
    regras de controle geral.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Estudo Amaldiçoado [Pré-Requisito: Origem Sem Técnica]", 
    descricao: `Você estuda sobre a energia amaldiçoada ao máximo, conseguindo descobrir
    uma nova maneira de a utilizar. Ao obter este talento, você recebe uma
    habilidade amaldiçoada a sua escolha, desde que atenda os requisitos. Você
    pode pegar este talento uma quantidade de vezes igual ao seu bônus de
    maestria.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Noção e Preparação [Pré-Requisito: Origem Sem Técnica, Nível 4]", 
    descricao: `Embora você esteja privado do acesso a uma técnica e certas aplicações da
    energia, você tem noção e preparação suficiente para o proteger diante certos
    problemas. Você recebe um bônus de +2 para testes de resistências contra
    efeitos de habilidades amaldiçoadas. Nos níveis 9, 14 e 19 o bônus aumenta em
    +1.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Núcleos Especializados [Pré-Requisito: Origem Corpo Amaldiçoado, Nível 10]", 
    descricao: `Cada um dos seus núcleos tem uma mutação peculiar, especializando-os em
    algo. Para cada núcleo, você pode escolher um tipo de dano para ser imune a e
    uma perícia para aplicar o dobro do bônus de maestria em rolagens usando ela.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Núcleos Reforçados [Pré-Requisito: Origem Corpo Amaldiçoado, Nível 10]", 
    descricao: `Seus núcleos passam por outra mutação, reforçando-se. Uma vez por missão,
    caso um dos seus núcleos fosse ser destruído, essa destruição é prevenida e
    você fica com 1 ponto de vida. Além disso, todos os seus núcleos têm o valor de
    integridade da alma aumentado em 15.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},
];

// HABILIDADES AMALDIÇOADAS
let arrayHabilidadesAmaldicoadasSalvas = [];
let objHabilidadesAmaldicoadasSalvas = {};

const habilidadesAmaldicoadas = [
    {nome: "Habilidade Amaldiçoada 1", 
    descricao: `Descricao`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Habilidade Amaldiçoada 2", 
    descricao: `Descricao`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "", 
    descricao: ``,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

];

// CARACTERISTICAS DE ANATOMIA DE FETO AMALDIÇOADO
let arrayAnatomia = [];
let objAnatomia = {};

const caracteristicasAnatomia = [
    {nome: "Alma Maldita", 
    descricao: `Sua alma é impregnada com energia amaldiçoada, assumindo um aspecto maldito e difícil de se alterar. 
    Sempre que uma criatura for causar dano na sua alma, ela precisa suceder em um teste de Vontade com CD igual a 12 + 
    seu bônus de maestria + modificador de constituição. 
    Em um sucesso, ele causa dano normalmente, em uma falha, você anula o dano. 
    Essa habilidade funciona 1 vez por dia, 2 no nível 6, 3 no nível 12 e 4 no nível 18.`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Anatomia Incompreensível", 
    descricao: `O seu corpo tem uma forma
    que é difícil de compreender.
    Você tem 25% de chance
    (resultado “1” em 1d4) de
    ignorar o dano adicional de
    um ataque crítico ou um
    ataque furtivo.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Armadura Natural", 
    descricao: `Com uma
    fisionomia estranha, seu
    corpo recebe uma arma
    natural. Ela pode usar tanto
    força quanto destreza, tem
    como dano Xd4, onde X é
    igual ao seu bônus de
    maestria, crítico 2x e você
    escolhe entre um dos 3 danos
    físicos para causar.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Capacidade de Voo", 
    descricao: `No seu
    corpo, repousa uma
    capacidade de voo, que com
    um estímulo de energia se
    torna ativa. Você pode gastar
    1 ponto de energia para
    receber 9 metros de
    movimento de voo até o final
    do seu turno.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Carapaça Mutante", 
    descricao: `Uma
    carapaça cobre o seu corpo,
    sendo uma mutação bizarra,
    mas resistente. Você recebe
    redução de dano contra
    danos físicos igual ao seu
    bônus de maestria; no nível
    10, você recebe imunidade a
    um tipo de dano físico a sua
    escolha.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Desenvolvimento Exagerado", 
    descricao: `Seu físico se desenvolve de
    maneira exagerada,
    ultrapassando o formato e a
    constituição padrão. Você
    conta como uma criatura
    uma categoria de tamanho
    acima e recebe 1 ponto de
    vida máximo adicional por
    nível.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Devorador de Energia", 
    descricao: `Tendo
    surgido da própria energia,
    você pode a devorar quando
    resiste a uma habilidade
    originada dela. Quando passa
    em um teste de resistência
    para resistir a uma habilidade
    de técnica ou amaldiçoada,
    você recebe 1 ponto de
    energia temporário. Você
    pode receber energia
    temporária igual ao seu
    bônus de maestria, por cena.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Instinto Sanguinário", 
    descricao: `Em sua
    essência há um instinto por
    sangue e violência. Você
    adiciona o seu bônus de
    maestria na sua iniciativa;
    enquanto em uma cena de
    combate, você também
    adiciona seu bônus de
    maestria na sua atenção e
    recebe 1,5 metros de
    movimento adicionais.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Membros Extras", 
    descricao: `Você
    recebe um par de braços ou
    de pernas extra, o que afeta
    as suas capacidades. Com um
    par adicional de braços, você
    recebe um bônus de +2 em
    Atletismo, Acrobacia e
    Prestidigitação e você pode
    usar armas de duas mãos e
    um escudo. Com um par
    adicional de pernas, o seu
    movimento aumenta em 3
    metros e você ignora terreno
    difícil.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Olhos Sombrios", 
    descricao: `Seus olhos
    guardam escuridão, sendo
    sombrios por natureza e
    aguçados. Você ignora efeitos
    de qualquer tipo de escuridão; você recebe
    maestria em percepção, se
    não possuir, e um bônus de
    +2 em rolagens com a perícia,
    o qual aumenta em +1 a cada
    4 níveis.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Presença Nefasta", 
    descricao: `Com um
    semblante vil, a sua própria
    presença é nefasta. Toda
    criatura hostil, ao vê-lo pela
    primeira vez, deve realizar
    um teste de Vontade com CD
    10 + seu bônus de maestria +
    metade do nível de
    personagem. Em uma falha,
    ela fica amedrontada por 3
    rodadas. Em um sucesso, ela
    consegue lidar com a sua
    presença quase por
    completo, recebendo apenas
    -1 em testes de perícia.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Sangue Tóxico", 
    descricao: `O seu sangue
    é tóxico, capaz de corroer o
    que entra em contato com.
    Sempre que sofrer danos de
    um ataque corpo-a-corpo, o
    atacante recebe dano
    venenoso igual ao seu
    modificador de constituição.<br>`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false}
];

// HABILIDADES DE TÉCNICAS
let nomesTecnicas = [];
let descricoesTecnicas = [];
let descricoesTecnicasAltura = [];