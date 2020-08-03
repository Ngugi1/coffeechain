const easychain = require('easychain');
@Asset(name = "addCargo")
@Provenance(name = "getHistory")
class Coffee {
    constructor(transporterId, grade, weight, humidity, location) {
        this.transporterId = transporterId
        this.grade = grade
        this.weight = weight
        this.humidity = humidity
        this.location = location
            // Control flow variable
        this.isloggedin = false
    }
    @key("auto") id
    @contract(name = "setGrade") setGradeContract(newGrade) {}
    @event(name = "cargoLocationChanged") locationChanged(newLocData) {
        // Make local effects
    }
}

async function test() {
    // Initialize a local coffee object
    let coffee = new Coffee("A", 12, 15, 10, { lat: 10, long: 20 })
    coffee_proxy = await easychain.init(coffee)
        // propose to persist the object on the blockchain
    if (coffee.isloggedin) {
        const saved = await coffee.save()
        await coffee_proxy.setGradeContract('A-')
        await coffee.provenance().then((data) => {
            // Consume history
        })
    }
}

test()

// Connectivity //
// Contract Mangement ////
// Event Management /
// Initialization //
//  Key Generation /
// Business Logic
// Miscleneaous