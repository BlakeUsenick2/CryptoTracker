const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (upd) {
    clearTimeout(upd);
  }

  const coinType = form.elements.coinType.value;
  const targetCurrency = form.elements.targetCurrency.value;

  fetchPrice(coinType, targetCurrency);
});

const fetchPrice = async (coinType, targetCurrency) => {
  const currencyLower = targetCurrency.toLowerCase();
  const r = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinType}&vs_currencies=${currencyLower}&include_24hr_vol=true&include_24hr_change=true`);
  const coinData = r.data[coinType];
  const price = coinData[currencyLower];
  const volume = coinData[`${currencyLower}_24h_vol`];
  const change = coinData[`${currencyLower}_24h_change`];
  const base = coinType.charAt(0).toUpperCase() + coinType.slice(1);


  res.innerHTML = `
    <thead>
        <tr>
            <th class="table-header-primary" scope="col">Property</th>
            <th class="table-header-secondary" scope="col">Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th class="table-row-header" scope="row">${base}</th>
            <td class="table-row-data">${price} <b>${targetCurrency}</b></td>
        </tr>
        <tr>
            <th class="table-volume-header" scope="row">Volume</th>
            <td class="table-volume-data">${volume}</td>
        </tr>
        <tr>
            <th class="table-change-header" scope="row">Change</th>
            <td class="table-change-data">${change}%</td>
        </tr>
    </tbody>
  `;
  upd = setTimeout(() => fetchPrice(coinType, targetCurrency), 10000);
}
