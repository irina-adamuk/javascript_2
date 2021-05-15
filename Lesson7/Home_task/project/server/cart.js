
/**
* API Корзины
*/
app.get('/api/cart', (req, res) => {
   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
      if (err) {
         res.sendStatus(404, JSON.stringify({result: 0, text: err}));
      } else {
            res.send(data);
      }
   });
});

 // Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
      if (err) {
         res.sendStatus(404, JSON.stringify({result: 0, text: err}));
      } else {
      // парсим текущую корзину
         const cart = JSON.parse(data);
       // добавляем новый товар
         cart.contents.push(req.body);
       // пишем обратно
         fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
            if (err) {
               res.send('{"result": 0}');
            } else {
               res.send('{"result": 1}');
            }
         })
      }
   });
});

 // Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {
   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
      if (err) {
         res.sendStatus(404, JSON.stringify({result: 0, text: err}));
      } else {
       // парсим текущую корзину
         const cart = JSON.parse(data);
       // ищем товар по id
         const find = cart.contents.find(el => el.id_product === +req.params.id);
       // изменяем количество
       if (req.params.option === "plus") {
                   find.quantity += req.body.quantity;
       } else if (req.params.option === "minus") {
         find.quantity -= req.body.quantity;
       }

       // пишем обратно
         fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
            if (err) {
               res.send('{"result": 0}');
            } else {
            res.send('{"result": 1}');
            }
         })
      }
   });
});

app.delete('/api/cart/:id', (req, res) => {
   fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
      if (err) {
         res.sendStatus(404, JSON.stringify({result: 0, text: err}));
      } else {
       // парсим текущую корзину
         const cart = JSON.parse(data);
       // ищем товар по id
         const find = cart.contents.find(el => el.id_product === +req.params.id);
       // изменяем количество
         find.quantity -= req.body.quantity;
       // пишем обратно
         fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
            if (err) {
               res.send('{"result": 0}');
            } else {
            res.send('{"result": 1}');
            }
         })
      }
   });
});
