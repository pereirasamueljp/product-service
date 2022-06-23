import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import { logger } from './utils/logger';

const loggertest = logger
const swaggerJsonConf = require('./swagger.json')


const app = express()
const port = 3000

app.use(cors())

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJsonConf))
app.get('/products', async (req, appRes) => {
  loggertest.debug(`reciving the filters for products`)
  let url = urlQueryBuilder(req.query);

  let res = await fetch(url);
  if (res.ok) {
    let data = await res.json();

    const { products, total, limit } = data;
    products.forEach((product: any) => {

      product.colors = [
        `#808080`,
        `#228b22`,
        `#f5f5f5`,
        `#ff7c00`
      ];
      product.measureName = "Weight";
      product.measure = [
        "Kg",
        "gm"
      ];
    });
    appRes.send({ products, total, limit });
    return;
  }
  appRes.status(500).send('Error loading products. Please, try again!');

})

function urlQueryBuilder(query: any) {
  const { skip, limit, sortByPrice, sortByAlphabet, sortByLowToHigh, category } = query;
  let mainUrl = 'https://dummyjson.com/products';

  category ? mainUrl += `/category/${category}` : null;
  if (limit) {
    mainUrl += `?limit=${limit}`;
    skip ? mainUrl += `&skip=${skip}` : null;
    return mainUrl;
  }
  if (skip) {
    mainUrl += `?skip=${skip}`;
    return mainUrl;
  }
  return mainUrl
}

app.listen(port, () => {
  console.log(`Server runing on port ${port}`)
})