// objetos.js

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

// HABILIDADES BASE DE CLASSE
const habilidadesBaseEspecializacao = {
    lutador: [
        { nome: "Mestre de Luta", descricao: `Um lutador é um mestre da luta, dedicando-se ao seu corpo` }, 
        { nome: "Empolgação", descricao: `Uma boa luta é empolgante e te motiva a se arriscar mais e mais, permitindo movimentos mais fortes e únicos.`},
    ],

    especialista_em_combate: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`},
    ],

    especialista_em_tecnicas: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`},
    ],

    controlador: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`},
    ],

    suporte: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`},
    ],

    restringido: [
        { nome: "Teste", descricao: `teste de descricao`},
        { nome: "Teste 2", descricao: `teste de descricao 2`},
    ]
}

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
}
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
}

const Talentos = [
    {nome: "Talento 1", 
    descricao: `Descricao`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "Talento 2", 
    descricao: `Descricao`,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

    {nome: "", 
    descricao: ``,
    requisito_nivel: 1, requistio_atributo: 0, requisito_habilidade: false},

]

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

]

