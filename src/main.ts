import express from 'express';

const app = express()
const port = 3000

app.get('/products', async (req, appRes) => {
  let res = await fetch('https://dummyjson.com/products/');
  if (res.ok) {
    let data = await res.json();
    const { products, total, limit } = data
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
    appRes.send(products);
    return;
  }
  appRes.status(500).send('Error loading products. Please, try again!');

})

app.listen(port, () => {
  console.log(`Server runing on port ${port}`)
})