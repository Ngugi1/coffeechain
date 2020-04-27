var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fabricNetwork = require('./fabricNetwork')
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/api/cargo/add', async function (req, res) {

  try {
    const contract = await fabricNetwork.connectNetwork('connection-cooperative.json', 'wallet/wallet-cooperative');
    let cargo = {
      id: req.body.id,
      location: req.body.location,
      grade: req.body.grade,
      weight: req.body.weight,
      status: req.body.status,
      delivered: req.body.delivered
    }

    console.log(cargo)
    console.log(contract)
    let tx = await contract.submitTransaction('addCargo', JSON.stringify(cargo));
    res.json({
      status: 'OK - Transaction has been submitted',
      txid: tx.toString()
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }

});

app.get('/api/cargo/:id', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork('connection-miller.json', 'wallet/wallet-miller');
    const result = await contract.evaluateTransaction('queryCargo', req.params.id.toString());
    let response = JSON.parse(result.toString());
    res.json({result:response});
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }
})


app.post('/api/cargo/location', async function (req, res) {

  try {
    const contract = await fabricNetwork.connectNetwork('connection-cooperative.json', 'wallet/wallet-cooperative');

    console.log("-----------------" + req.body)
    let tx = await contract.submitTransaction('setLocation', req.body.id.toString(), req.body.location);
    res.json({
      status: 'OK - Transaction has been submitted',
      txid: tx.toString()
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }

});


app.get('/api/history/:id', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork('connection-insurance.json', 'wallet/wallet-insurance');
    const historyCargo = JSON.parse((await contract.evaluateTransaction('getHistory', req.params.id.toString())).toString());
    const actualCargo = JSON.parse((await contract.evaluateTransaction('queryCargo', req.params.id.toString())).toString());
    historyCargo.unshift(actualCargo);
    res.json({
      historyCargo: historyCargo
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }
})

app.post('/api/cargo/status', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork('connection-insurance.json', 'wallet/wallet-insurance');
    const result = await contract.evaluateTransaction('setStatus', req.body.id, req.body.status);
    console.log(result.toString());
    let response = { "txId": result.toString() };
    res.json(response);
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error
    });
  }
})


app.listen(3000, ()=>{
  console.log("***********************************");
  console.log("API server listening at localhost:3000");
  console.log("***********************************");
});