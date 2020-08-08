const { BCBacked } = require('./blockchainbacked')
const { performance } = require('perf_hooks');
const fs = require('fs')
    // Utility functions for our scenario 17
    // Modeling a scenario
class Coffee extends BCBacked {
    constructor(id, transporterId, grade, weight, humidity, location) {
        super()
        this.id = id
        this.transporterId = transporterId
        this.grade = grade
        this.weight = weight
        this.humidity = humidity
        this.location = location
        this.isloggedin = true
    }

    // A method that invokes a contract - allow coffee grade to be adjusted
    async setGradeContract(newLocation) {
        try {
            if (this.contract != null) {
                // Measure time to build request
                return
                let result = await this.contract.submitTransaction('setLocation', {
                    id: this.id.toString(),
                    location: newLocation
                });
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
    let coffee = new Coffee(1, 0, "A", 12, 15, { lat: 12.4, long: 34.5 })
        // propose to persist the object on the blockchain
    await coffee.session()
    if (coffee.isloggedin == true) {
        // coffee.registerEvent('locationChanged')
        data = JSON.stringify({
                id: 12,
                grade: "A",
                weight: 12,
                humidity: 15,
                location: { lat: 12.4, long: 34.5 }
            })
            // Profile
        const result = []
        var i;
        for (i = 0; i < 33; i++) {
            const start = performance.now()
            const saved = await coffee.save('addCargo', data)
            const finsish = performance.now()
            result.push(100 * (finsish - start))
        }

        // writetofile(result, 'fabric-save')
        fs.writeFileSync('benchmarks/coop/fabric-coop-save.csv', result.join('\n'))

        for (i = 0; i < 33; i++) {
            const start = performance.now()
            await coffee.setGradeContract(JSON.stringify({
                id: coffee.id,
                location: { lat: 12.4, long: 34.95 }
            }))
            const finsish = performance.now()
            result.push(finsish - start)
        }
        fs.writeFileSync('benchmarks/coop/fabric-coop-setgrade.csv', result.join('\n'))

    }
}
test1()

////Total 40
// Connectivity 35
// Contract Mangement 32
// Event Management  10 //
// Business Logic + Glue Code 17 //
// SUM: 99