module.exports = {
    redis: {
        hostName: 'redis',
        post: 3002,
        channel: 'analytics-events',
    },
    publisher: {
        port: 3000,
    },
    subscriber: {
        port: 3001,
    },
    dashboard: {
        port: 3003,
    },
};
