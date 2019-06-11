class NodeHid {
    constructor() {

    }

    getDevices() {
        return Promise.resolve([
            {
                id: 1,
                name: 'mouse'
            },
            {
                id: 2,
                name: 'keyboard'
            }
        ])
    }
}

module.exports = { nodeHid: new NodeHid() }