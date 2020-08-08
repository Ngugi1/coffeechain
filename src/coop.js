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
    @transient isloggedin
    @contract(name = "setGrade") setGradeContract(id, newGrade) {}
    @event(name = "locationChanged") locationChanged(newLocData) {
        // Make local effects
    }
}

async function test() {
    // Initialize a local coffee object
    let coffee = new Coffee(12, "A", 12, 1.5, { lat: 10, long: 20 })
    coffee_proxy = await easychain.init(coffee)
        // propose to persist the object on the blockchain
    if (coffee_proxy.isloggedin) {
        coffee_proxy.save()
        await coffee_proxy.setGradeContract({ grade: 'A-' })
        await coffee_proxy.provenance().then((data) => {
            // Consume history
        })
    }
}

test()

// Connectivity 1
// Contract Mangement 7
// Event Management  2 //
// Business Logic + Glue Code 19 //
//29