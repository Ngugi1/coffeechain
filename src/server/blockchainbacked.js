const fabricNetwork = require('./fabricNetwork')
module.exports = {
    BCBacked: class BCBacked {
        // Allow a connection to be established
        async session() {
            this.contract = await fabricNetwork.connectNetwork()
        }

        // A method to handle events
        onEvent(event) {
            // Dispatch based on the event type
            switch (event.type) {
                case 0:
                    // Logic
                case 1:
                    // Logic
            }
            //
        }

        // Event Registration
        async registerEvent(event) {
            // Listen to events
            await this.contract.addContractListener('my-contract-listener', event, this.onEvent)
        }

        // Save this object
        async save(method, data) {
            try {
                const result = await this.contract.submitTransaction(method, JSON.stringify(data));
                // consume the results
                x = 10
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
            }
        }

        // Get provenance for this object
        async getHistory(method, data) {
            try {
                const historyCargo = JSON.parse((await this.contract.evaluateTransaction(method, data)))
                    // historyCargo.unshift(actualCargo);
                    // consume historyCargo
            } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
            }
        }

    }
}