'use strict';

const { Contract } = require('fabric-contract-api');

class CoffeeChainSupplyChain extends Contract {


  async addCargo(ctx, cargo) {
    console.info('============= START : Add cargo ===========');
    const id = ctx.stub.getTxID().toString()
    await ctx.stub.putState(id, Buffer.from(cargo));
    console.info('============= END : Add cargo ===========');
    ctx.stub.setEvent("cargoAdded", JSON.stringify({"txId": id, "data": cargo}))
    return id
  }

  async queryCargo(ctx, cargoId) {
    console.info('============= START : Cargo asset ===========');
    const assetAsBytes = await ctx.stub.getState(cargoId); 
    if (!assetAsBytes || assetAsBytes.length === 0) {
      throw new Error(`${cargoId} does not exist`);
    }
    console.log(assetAsBytes.toString());
    console.info('============= END : Cargo asset ===========');
    return assetAsBytes.toString();
  }

  async setLocation(ctx, id, location) {
    console.info('============= START : Set location ===========');
    const keyAsBytes = await ctx.stub.getState(id); 
    if (!keyAsBytes || keyAsBytes.length === 0) {
      throw new Error(`${id} does not exist`);
    }
    let key = JSON.parse(keyAsBytes.toString());
    console.log(key)
    key.location = location;
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(key)));
    console.info('============= END : Set location ===========');
    return ctx.stub.getTxID();
  }


    async setStatus(ctx, id, status) {
      console.info('============= START : Set status ===========');
      const keyAsBytes = await ctx.stub.getState(id); 
      if (!keyAsBytes || keyAsBytes.length === 0) {
        throw new Error(`${id} does not exist`);
      }
      let key = JSON.parse(keyAsBytes.toString());
      console.log("------- before ---------" + key.toString())
      key.status = status;
      console.log("------- after ---------" + key.status.toString())
      console.log("New object " + key.status.toString())
      await ctx.stub.putState(id, Buffer.from(JSON.stringify(key)));
      console.info('============= END : Set status ===========');
      return ctx.stub.getTxID();
  }

  async getHistory(ctx, id) {
    console.info('============= START : Query History ===========');
    let iterator = await ctx.stub.getHistoryForKey(id);
    let result = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value) {
        console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
        const obj = JSON.parse(res.value.value.toString('utf8'));
        result.push(obj);
      }
      res = await iterator.next();
    }
    await iterator.close();
    console.info('============= END : Query History ===========');
    return result;
  }


}

module.exports = CoffeeChainSupplyChain;