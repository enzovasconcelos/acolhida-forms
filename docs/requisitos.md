# Requisitos

1. Eu, como coordenador, devo poder cadastrar missas que se repetem baseado num 
dia específico do mês selecionado, que se repetem semanalmente ou uma vez. 
É informado uma estratégia de repetição, um horário (hora e minuto) e um nome (opcional).

    1.1 Estratégia semanal: escolhe o dia da semana, e quando o formulário é publicado
        a estratégia preenche os dias na missa.
    1.2 Estratégia do dia específico: escolhe o dia do mês fixo. Quando o formulário é
        publicado a missa fica com esse dia fixo.
    1.3 Estratégia do dia da semana específico: escolhe o dia da semana na ordinária
        semana escolhida. Quando o formulário é publicado a missa fica com esse dia fixo.
    1.4 Estratégia de uma vez: uma missa que ocorre no dia selecionado só uma vez.

2. Eu, como coordenador, devo poder publicar um formulário para aquele mês específico
para os integrantes da acolhida.

3. Eu, como coordenador, devo pode cadastrar integrantes com um nickname (ou é melhor email), 
nome e informando se é um integrante casal ou não.

4. Eu, como integrante, devo poder responder o formulário com dias específicos de missa
e não em toda repetição, informando meu nome e um nickname.

5. Eu, como coordenador, poder gerar uma escalação automática para cada dia de missa. 
Respeitando as restrições: quatro integrantes em cada missa, de modo a priorizar o maior 
número de missas completas (com quatro integrantes). Cada integrante deve servir no máximo 
duas vezes.
E deve se evitar um integrante de servir em missas de dias seguidos. 
No futuro: evitar pessoas que tem laços de família. Um integrante casal conta duas
vezes, mas é como um integrante só.
Deve ser retornado também as pessoas que ficaram sem servir e quais serviram mais de uma
vez.

6. Eu, como coordenador, posso editar uma escalação, onde o sistema mostrar as restrições ao 
coordenador durante a edição.


## Backend Routes

### Mass

- POST /api/masses
- GET /api/masses
- PUT /api/mass/:id

### Coordinator

- POST /api/coordinators
- GET /api/coordinators
- PUT /api/coordinator/:id

### Integrant

- POST /api/integrants
- GET /api/integrants
- PUT /api/integrant/:id

### Form

- POST /api/forms
- PATCH /api/forms/:id

### Answer

- POST /api/integrant/:integrantId/answer
- GET /api/integrant/:integrantId/answer

### Lineup

- GET /api/lineup/:formid
