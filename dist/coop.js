function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const easychain = require('easychain');

class Coffee {
    constructor(transporterId, grade, weight, humidity, location) {
        _defineProperty(this, "id", void 0);

        _defineProperty(this, "isloggedin", void 0);

        this.transporterId = transporterId;
        this.grade = grade;
        this.weight = weight;
        this.humidity = humidity;
        this.location = location; // Control flow variable

        this.isloggedin = false;
    }

    setGradeContract(id, newGrade) {}

    locationChanged(newLocData) { // Make local effects
    }

    __decorators__() {
        return ["{\"type\":\"class\",\"decorator\":\"Asset\",\"key\":\"name\",\"value\":\"addCargo\"}", "{\"type\":\"class\",\"decorator\":\"Provenance\",\"key\":\"name\",\"value\":\"getHistory\"}", "{\"type\":\"method\",\"decorator\":\"contract\",\"contract\":\"setGrade\",\"method\":\"setGradeContract\"}", "{\"type\":\"method\",\"decorator\":\"event\",\"contract\":\"locationChanged\",\"method\":\"locationChanged\"}", "{\"type\":\"property\",\"name\":\"id\",\"decorator\":\"key\",\"args\":[\"auto\"]}", "{\"type\":\"property\",\"name\":\"isloggedin\",\"decorator\":\"transient\",\"args\":[]}"];
    }

}

async function test() {
    // Initialize a local coffee object
    let coffee = new Coffee(12, "A", 12, 1.5, {
        lat: 10,
        long: 20
    });
    coffee_proxy = await easychain.init(coffee); // propose to persist the object on the blockchain

    if (coffee.isloggedin) {
        // Profile
        coffee_proxy.save();
        // Profile
        await coffee_proxy.setGradeContract({
            grade: 'A-'
        });
        // Profile
        await coffee_proxy.provenance().then(data => { // Consume history
        });
    }
}

test(); // Connectivity 1
// Contract Mangement 7
// Event Management  2 //
// Business Logic + Glue Code 19 //
//29