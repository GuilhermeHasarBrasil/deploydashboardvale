This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dashboard VALE

Modo de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## FIGMA

Acesso ao [figma](https://www.figma.com/file/akb9vQu9u5KiPGZHzR6kUI/Tablet%2FWEB---HSD?type=design&node-id=53-2&mode=design&t=VUxVzj41KPM4hlFF-0)

## Documentação - Instruções de uso e manutenção:

Apenas duas Pages registradas para o uso no navegador: Index (/) e a página de Login (/login). O funcionamento é semelhante a uma SPA.

Na página "Index", são feitas as buscas no banco de dados dos Furos, Caixas, Paletes, WhiteBox, entre outras. As consultas foram mantidas em apenas um arquivo para poupar consultas ao Firebase Firestore, visto que a cobrança é feita em cima de leituras no banco de dados. Caso fossem buscados em cada tela, seria custoso financeiramente. Por isso foi feito a opção pela busca uma única vez e usando o snapshot, o que garante o tempo real.

Na página "Index", são feitos buscas por ordem alfabética dos *furos* (orderby 'numero', onde número é referente ao nome do furo), e as *chipBoxes* ordenadas por furo (orderby 'furo', onde furo é referente ao nome do furo). Com isso, são feitos arrays de arrays com as **chipBoxes**. O index 1 desse array de array de **chipBoxes** é referente ao index 1 do furo buscado no banco de dados, ou seja, é possível filtrar por esse método as caixas do furo [valor do index] no array.

Ainda na página "Index", são feitos filtros de informações para alguns componentes da aplicação. Outros filtros também foram feitos em componentes individualmente, mas os principais estão presentes na page index (/).

## Estrutura do código:

## Componentes: 

### Todas as opções do menu lateral são nomeadas em pastas levando o nome da opção. O mesmo acontece na seleção dessa opção ao ser visualizada no index. Abaixo, eles são listados:

### index:  

Na página index, estão componentes que são usados em praticamente todas as outras "páginas", como o menu de navegação lateral e o rowFuros, que permite selecionar o furo que se deseja filtrar as informações (variável furoSelecionado, que possui o furo.furo e o furo.index, onde o index é usado para filtrar o array de array de *chipBoxes*);

### Dashboard (opção 'Dashboard') :

Principal "página" da aplicação, o componente concentra os gráficos que mostram diversos tipos de gráficos para informação. 

Possui um componente denominado "topDashboard.jsx", que de 30 em 30 segundos (configurável em parâmetros) alterna entre informações sobre furos e caixas "processados(as)", "não iniciados(as)", "em processamento", e "com observação". No ícone de informação "(i)", é possível verificar a lista de furos ou caixas contidos nos números demonstrados.

Possui uma aba de rolagem denomidada filtros (feita no index.js). Lá, se pode alternar entre a opção "Quantidade de caixas finalizadas (total de furos)" que contém o gráfico horizontal (CustomBarChartHorizontal.jsx e infoBarCharHorizontal.jsx).

Na opção "Tempo de processamento de cada caixa por processo" (relatorio.jsx) têm-se o gráfico vertical (BarChartRelatório.jsx) que mostra o tempo de cada caixa nos processo de conferencia, marcação, fotografia e arquivamento (que pode ser filtrado por data, selecionando a data de início e fim do filtro no calendar disponível).  

Possui ainda a opção de "Caixas processadas por dia na semana", onde ao selecionar os processos de conferencia, marcação, fotografia ou arquivamento, pode-se verificar quantas caixas foram finalizadas nas segundas-feiras, terças-feiras, quartas-feiras, quintas-feiras ou sextas-feiras (WeekWorkBarChart.jsx).  

A última opção, "Processamento por período em metros (todas as caixas)", é possível filtrar o período entre datas e verificar quantos metros foram processados no total nos dias filtrados (BarChartMes.jsx), e filtrar pelos processos de conferencia, marcação, fotografia ou arquivamento.

### Relatorios (opção 'Relatórios'): 

Possui uma tabela geral sobre os furos importados, status de processamento, importação e quantidade de caixas. Ao selecionar o furo no dropdown, bem como os processos de conferência, marcação, fotografia, geologia, densidade, serragem, amostragem, despacho e ou arquivamento, pode-se baixar um pdf com as informações do processamento das etapas selecionadas. Também é enviado automaticamente o pdf ao grupo do telegram pelo HasarBot.

### ImpressaoEtiquetas (opção 'Impressão Etiquetas'): 

Possui o selecionador de furo e qual o tipo de etiqueta que se deseja imprimir. É possível imprimir etiquetas das caixas (chip-box), amostras (sample bag), caixa de amostra (white-box) ou de palete.

### ImportarArquivo (opção 'Importar Arquivo'): 

Serve para importar a planilha no sistema, registrando no banco de dados o furo e as caixas presentes na planilha. [Clique para ver o modelo da planilha (mesmo do aplicativo móvel) ](https://docs.google.com/spreadsheets/d/1rjqskL95KTCrcfsyAMugl08d7Npfgxsu/edit?usp=sharing&ouid=104652659696758900846&rtpof=true&sd=true)

### DadosProcessamento (opção 'Dados Processamento'): 

Serve para verificar o status de cada etapa do processamento. Possui informação de percentual executado nos processos de conferência, marcação, fotografia e arquivamento, e o tempo de execução dos processos de geologia (geológico, geotécnico e estrutural), densidade, serragem, amostragem e despacho.

### ConfigImpressora (opção 'Config. Impressora'): 

Componente para verificar o status da impressora conectada. Caso não apareça nenhuma, mostra o link para download do [Zebra Browser Printer](https://www.zebra.com/content/dam/zebra_new_ia/en-us/solutions-verticals/product/Software/Printer%20Software/Link-OS/browser-print/zebra-browser-print-windows-v132489.exe).

### PauseTopDashboard (opção 'Parâmetros'): 

Componente que configura e comunica com o contexto do PauseContext, onde pode-se configurar o pause e play da alteração das informações de *furos* e *caixas* do topDashboard.jsx, além de selecionar o tempo de alternância entre a mudança das informações. O padrão é 30 segundos. 

### Usuarios (opção 'Usuários'): 

Permite verificação dos usuários cadastrados e cadastro de novos usuários.

### MensagensAvisos (opção 'Mensagens/Avisos'): 

Permite verificar quais caixas passaram do tempo de execução determinado. Esse tempo de execução determinado pode ser filtrado pelo dropdown, que contém opções de tempo. Caso selecione 5 minutos, por exemplo, trás a informação de cada processo que levou mais de 5 minutos para ser concluído. Ao clicar em "Enviar o aviso", envia a mensagem no chat do telegram, pelo HasarBot.

### Mensagens : 

desabilitado, ignorar.

## Contextos

### contexts/BrowserPrintContext.jsx e PauseContext.js

Contexto da impressora (impressora conectada e função de impressão) e contexto do pause (usado em parâmetros para controlar a alternância entre as informações de furo e caixas no topDashboard). Permite acesso a essas funções e variáveis por toda a aplicação.

## Configuração do banco de dados firebase firestore

### firebase/auth.s: 

Arquivo para configuração do usuário logado.

### firebase/firebase.js: 

Arquivo para configuração do banco de dados, não alterar.

## hooks/sendMessage.js

SendMessage.js -> Por enquanto, o único hook é para o envio de mensagens do componente MensagensAvisos. Faz a comunicação com a api /api/message.js

## Comunicação socket para impressão

### impressao/printModule.ts: 

Arquivo antigo para impressão por websocket. Desabilitado por agora, pois optou-se pela impressão com o [Zebra Browser Printer](https://www.zebra.com/content/dam/zebra_new_ia/en-us/solutions-verticals/product/Software/Printer%20Software/Link-OS/browser-print/zebra-browser-print-windows-v132489.exe).

## API

### pages/api : 

/imprimir.ts possui apenas uma camada para tratamento de erro de impressões, fazendo a comunicação da impressão pelo socket. Por enquanto não é mais usado.  

/message.js é a rota da api que realiza o envio de mensagem pelo bot do telegram para o grupo do telegram (chat ID).  

/sendPdf rota da api que realiza o envio de mensagem pelo bot do telegram, onde é buscado o pdf salvo no storage do firebase e enviado para o grupo do telegram (chat ID).  

/telegram.js é a rota da api que realiza o envio de mensagem pelo bot do telegram, mas por enquanto foi apenas para teste. Não remover, é útil para testar novas funções do bot.
