const fabricNetwork = require('./fabricNetwork')
const BcBacked = require('./blockchainbacked')
const { BCBacked } = require('./blockchainbacked')
    // Utility functions for our scenario
    // Modeling a scenario
class Coffee extends BCBacked {
    constructor(transporterId, grade, weight, humidity, location) {
        super()
            // Establish connection
        this.id = 10
        this.transporterId = transporterId
        this.grade = grade
        this.weight = weight
        this.humidity = humidity
        this.location = location
            // Control flow variable
        this.isloggedin = false
    }

    // A method that invokes a contract - allow coffee grade to be adjusted
    async setGradeContract(newLocation) {
        try {
            if (this.contract != null) {

                let result = await this.contract.submitTransaction('setLocation', { id: this.id.toString(), location: newLocation });
                // consume the results e.g. update UI
            }

        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            // Handle exception
        }
    }
}

async function test1() {
    // Initialize a local coffee object
    let coffee = new Coffee("A", 12, 15, { lat: 12.4, long: 34.5 })
        // propose to persist the object on the blockchain
    await coffee.session()
    if (coffee.isloggedin == false) {
        coffee.registerEvent('locationChanged')
        console.log('register')
        data = JSON.stringify({ id: 12, grade: "A", weight: 12, humidity: 15, location: { lat: 12.4, long: 34.5 } })
        const saved = await coffee.save('addCargo', data)

        await coffee.setGradeContract(JSON.stringify({
            id: coffee.id,
            location: { lat: 12.4, long: 34.95 }
        }))
    }
}
test1()