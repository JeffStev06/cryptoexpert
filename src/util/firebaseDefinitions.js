/**
 * Este archivo es solamente informativo, con el objetivo de ejemplificar la forma de 
 * la data que se guarda en Firebase, para su utilización.
 * La definición de las colecciones aquí definidas puede que cambien en el futuro.
 * 
 * Ultima modificación 3 nov 2021
 */

/**
 * Aquí se guardarán las criptomonedas en las que el usuario haya invertido, solo habrá un registro por moneda por usuario.
 */
const cryptos = [
  {
    id: 1,
    coin: 'BTC',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    invest: 100,         // Lo que el usuario invirtió
    profit: 35,          // Lo que el usuario vendió y obtuvo de lucro
    holdings: 135,       // El valor actual en cartera de lo invertido, Este estará cambiando según el valor del mercado
    holdingsBTC: 0.0022, // Lo mismo que arriba pero en Bitcoin, este solo cambiará cuando se compre o venda la moneda nuevamente
    id_user: 1
  },
  {
    id: 2,
    coin: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    invest: 20,
    profit: 5,
    holdings: 18.57,
    holdingsBTC: 0.00030,
    id_user: 1
  }
]


// 1 compra
// 2 venta
const trading = [
  {
    id: 1,
    coin: 'BTC',
    invested: 50,
    bought: 0.0011,
    type: 1,
    date: '2021-10-28',
    user_id: 1
  },
  {
    id: 2,
    coin: 'BTC',
    invested: 50,
    bought: 0.0011,
    type: 1,
    date: '2021-10-30',
    user_id: 1
  },
  {
    id: 3,
    coin: 'BTC',
    invested: 10,
    bought: 0.00013,
    type: 2,
    date: '2021-11-2',
    user_id: 1
  }
]
