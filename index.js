import axios from "axios";

const getDados = async () => {
  const response = await axios.get(
    `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`
  );
  return response.data;
};

const converter = async (codigo, valor) => {
  const cotacaoDados = await getDados();

  let resultado = {
    conversao: 0,
    cotacao: 0,
  };

  if (codigo === "USD" || codigo === "usd") {
    resultado.conversao = converterMoeda(valor, cotacaoDados.USDBRL.bid);
    resultado.cotacao = cotacaoDados.USDBRL.bid;
  } else if (codigo === "EUR" || codigo === "eur") {
    resultado.conversao = converterMoeda(valor, cotacaoDados.EURBRL.bid);
    resultado.cotacao = cotacaoDados.EURBRL.bid;
  } else if (codigo === "BTC" || codigo === "btc") {
    resultado.conversao = converterMoeda(valor, cotacaoDados.BTCBRL.bid);
    resultado.cotacao = cotacaoDados.BTCBRL.bid;
  }

  return resultado;
};

const minutos = 60 * 2 * 1000; // 2 minutos

setInterval(async () => {
  const arrayCodigos = ["USD", "EUR", "BTC"];
  const escolhaAleatoria = parseInt(Math.random() * arrayCodigos.length);
  const valor = Math.random() * 100;
  const resultado = await converter(arrayCodigos[escolhaAleatoria], valor);

  console.log(
    `Moeada Brasileira: R$ ${valor.toFixed(2)}
    Conversão para ${
      arrayCodigos[escolhaAleatoria]
    }: ${resultado.conversao.toFixed(2)}
    Cotação ${arrayCodigos[escolhaAleatoria]} :  ${resultado.cotacao} \n`
  );
}, minutos);

const converterMoeda = (valor, cotacao) => {
  const valorAtualizado = valor * cotacao;
  return valorAtualizado;
};
