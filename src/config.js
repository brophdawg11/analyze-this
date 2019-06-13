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
        subscriberPort: 3002,
        port: 3003,
        socketEvent: 'analytics-event',
    },
};
