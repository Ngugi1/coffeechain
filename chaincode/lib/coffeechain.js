'use strict';

const { Contract } = require('fabric-contract-api');

class CoffeeChainSupplyChain extends Contract {
    async addCargo(ctx, data) {
        console.log(data)
        const cargo = JSON.parse(data)
        console.log(data)

        // console.info('============= START : Add cargo ===========');
        const result =
            await ctx.stub.putState(cargo.id, Buffer.from(data));
        console.info('============= END : Add cargo ===========');
        // console.info('Result -- ' + result);
        // ctx.stub.setEvent("cargoAdded", JSON.stringify({ "txId": ctx.stub.getTxID().toString(), "data": cargo }))
        // return result;
        return 'OK';
    }

    async queryCargo(ctx, data) {
        const cargoId = JSON.parse(data)
        console.info('============= START : Cargo asset ===========');
        const assetAsBytes = await ctx.stub.getState(cargoId);
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`${cargoId} does not exist`);
        }
        console.log(assetAsBytes.toString());
        console.info('============= END : Cargo asset ===========');
        return assetAsBytes.toString();
    }

    async setLocation(ctx, cargo) {
        const cargo = JSON.parse(cargo)
        console.info('============= START : Set location ===========');
        const keyAsBytes = await ctx.stub.getState(cargo.id);
        if (!keyAsBytes || keyAsBytes.length === 0) {
            throw new Error(`${cargo.id} does not exist`);
        }
        let key = JSON.parse(keyAsBytes.toString());
        key.location = cargo.location;
        let result = await ctx.stub.putState(id, Buffer.from(JSON.stringify(key)));
        console.info('============= END : Set location ===========');
        return result;
    }


    async getHistory(ctx, data) {
        console.log(data)
        id = JSON.parse(data).id
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