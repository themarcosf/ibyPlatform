#  <img width="28px" height="28px" src="https://user-images.githubusercontent.com/99203402/206941522-7b780bfb-2be8-4012-a748-48f1e5ca7a95.png" alt="ibyplatform-logo"/> Plataforma Iby
## Plataforma Iby - HACKATHON WEB3 - Tokenização do Patrimônio da União - 2022

## Trailer


<img src="https://user-images.githubusercontent.com/99203402/206941612-a2241827-ba5a-4627-9844-50d0a3ca7afe.png" alt="app-screens-mockup"/>

## Nosso Time
- Bianca Cassemiro Lima
- Luiz Felipe Kama Alencar
- Marcos Aurélio Florêncio da Silva


## Quem Somos
Somos alunos do primeiro ano de Engenharia de Software e de Computação no INTELI - Instituto de Tecnologia e Liderança. Acreditamos no potencial do blockchain para gerar impactos positivos sociais e econômicos.

## Nossa Solução

- Nossa solução busca facilitar a destinação de imóveis da União através da venda de NFTs para empresas e fundos de investimento imobiliário por um período fixo de 10 anos. Cada NFT dá direito ao uso semestral do imóvel a que faz referência e podem ser revendidas para pessoas físicas ou empresas que queiram alugar residências ou imóveis comerciais.<br/>
- Acreditamos que a proposta de valor esteja direcionada para empresas do setor imobiliário e fundos que adotem um modelo de negócios de reforma e valorização de imóveis. Como possui valor de revenda, as pessoas físicas ou empresas que comprarem tais NFT poderão observar ganhos em seus investimentos no momento da revenda. Propõe-se que os FIIs possam adquirir tokens ESG mediante a destinação de 1% a 3% do valor dos tokens para um fundo indicado pela SPU, com igual contrapartida do Governo Federal - essa iniciativa ESG é viabilizada pela plataforma e pode se beneficiar o segmento de green finance, que investe preferencialmente em iniciativas que gerem efeitos positivos ao ambiente.


## Proposta de Valor

### Atribuições do cliente
- Venda de non-fungible tokens atrelados aos imóveis da União, por meio da Secretaria do Patrimônio da União, que poderiam ser objeto de revenda do início ao término da cadeia imobiliária, na medida em que os fundos e empresas adquirentes podem adotar modelos de valorização imobiliários (i.e. retrofit) em propriedades mais degradadas e obter retorno adequado ao capital empregado nessa operação. Por sua vez, pessoas físicas podem eventualmente observar ganhos de capital sobre suas NFTs, caso o aluguel do imóvel na região em que se encontre se valorize.

### Ganhos
- Geração livre positiva de caixa para a União sem aumento de carga tributária
- Ganho de eficiência do mercado imobiliário devido ao aumento da oferta
- Efeitos positivos de compliance e segurança de dados

### Dores
- Dificuldade de obtenção de dados históricos da fontes primárias
- Inviabiliadade de acompanhamento por limitações de recursos

### Aliviadores de dor
- Digitalização de processos e imutabilidade de dados
- Possibilidade de alugar imóveis por períodos mais customizados
- Possibilidade de ganhos de capital para o comprador final

### Criadores de ganhos
- Transparência das transações
- Imutabilidade da informação
- Redução de custos

### Produtos e Serviços
- Plataforma de gestão de imobiliária Iby, que permite a realização de leilões de venda primária e secundária de tokens que dão direito ao uso de imóvel por período determinado.
 
## Tecnologias

 Esse projeto foi desenvolvido em Javascript e Solidity e utilizou as seguintes tecnologias:
 
 Blockchain:
 - alfajores
 - ethers
 - hardhat
 - openZeppelin
 - IPFS
 
 Frontend:
 - React
 - Next
 - SaaS
 
 Backend:
 - node.js
 - express
 - mongodb

## Orientações
 - instalar bibliotecas node.js usando npm i nas pastas root, alfajores e source
 - assegurar que o engine utilizado é node versão 18 ou superior
 - gerar os arquivos binários e de interface através do comando npx hardhat compile
 - deployar os contratos na rede de testes ALFAJORES
 - iniciar o servidor de back end por meio do comando npm run start:dev
 - iniciar o servidor de front end por meio do comando npm run dev
 - configurar arquivo de variaveis de ambiente na pasta root (config.env)
      NODE_ENV=development

      MNEMONIC=...
      ACCOUNT_ADDRESS=0x...
      PRIVATE_KEY=...
      PUBLIC_KEY=...

      IBY_FACTORY_ADDRESS=0x
      IBY_REALTY_ID=0x
      IBY_REALTY_TRADABLE=0x

      PORT=8000
      HOST=127.0.0.1

      DATABASE_LOCAL=mongodb://127.0.0.1:27017/ibyPlatform-api
      DATABASE_REMOTE=mongodb+srv://<USER>:<PASSWORD>@...
      DATABASE_PASSWORD=...

## Licença

Distributed under the MIT License. See  `LICENSE`  for more information.
