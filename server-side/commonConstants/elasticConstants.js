const routeMapping = {
    properties: {
        destination: {
            type: "text",
        },
        inBetweenStops: {
            properties: {
                distanceFromSource: {
                    type: "long"
                },
                stopName: {
                    type: "text",
                },
                timeFromSource: {
                    type: "text",
                }
            }
        },
        source: {
            type: "text",
        }
    }
}

const joinedMapping = {

}
module.exports = { routeMapping,joinedMapping };