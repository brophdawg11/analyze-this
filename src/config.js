module.exports = {
    redis: {
        hostName: 'redis',
        post: 3001,
        channel: 'analytics-events',
    },
    publisher: {
        port: 3000,
    },
    dashboard: {
        port: 3003,
        socketEvent: 'analytics-event',
    },
    all: {
        subscriberPort: 3002,
        socketEvent: 'analytics-event',
    },
    dy: {
        subscriberPort: 3004,
        socketEvent: 'analytics-event',
    },
    sessionm: {
        subscriberPort: 3005,
        socketEvent: 'analytics-event',
    },
    sitespect: {
        subscriberPort: 3006,
        socketEvent: 'analytics-event',
    },
};
