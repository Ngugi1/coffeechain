const fabricNetwork = require('./fabricNetwork')
const { BCBacked } = require('./blockchainbacked')
    // Utility functions for our scenario
    // Modeling a scenario
class Cargo extends BCBacked {
    constructor(coopId, grade, weight, humidity, location) {
        // Establish connection
        super()
        this.id;
        this.coopId = coopId
        this.grade = grade
        this.weight = weight
        this.humidity = humidity
        this.location = location
            // Control flow variable
        this.isloggedin = false
        this.contract = null;
        this.status = "Transit"
    }

    // A method that invokes a contract broadcast location every 10 mins
    async broadcastLocation(loc) {
        setInterval(async() => {
            try {
                const result = await this.contract.submitTransaction('setLocation', JSON.stringify({ id: id.toString(), location: loc }));
                // consume the results e.g. update UI
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                // Handle exception
            }
        }, 10 * 60 * 1000);
    }

    async broadcastHumidity(humidity) {
        setInterval(async() => {
            try {
                let result = await this.contract.submitTransaction('setHumidity', JSON.stringify({ id: id.toString(), humidity: humidity }));
                // consume the results e.g. update UI
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                // Handle exception
            }
        }, 10 * 60 * 1000);
    }
}

// Initialize a local coffee object
async function test() {
    const cargo = new Cargo(1, "A", 12, 15, { lat: 12, long: 15 }) // ("A", 12, 15, { lat: 12.4, long: 34.5 })
    await cargo.session()

    // propose to persist the object on the blockchain
    // await cargo.registerEvent('locationChanged')
    const saved = await cargo.save('addCargo', JSON.stringify({
        id: 1,
        grade: 'A',
        weight: 13,
        humidity: 12,
        location: { lat: 12, long: 15 }
    }))


    // invoke contracts
    await cargo.broadcastLocation({ lat: 12.5, lat: 15 })
}

test()