<template>
    <v-layout row wrap>
        <v-flex xs12 md6>
            <h2>Add to Cart</h2>
            <EventTable :events="events" type="add-to-cart" />
        </v-flex>
        <v-flex xs12 md6>
            <h2>Rec Tray Click</h2>
            <EventTable :events="events" type="rec-tray-click" />
        </v-flex>
    </v-layout>
</template>

<script>
import { sample } from 'lodash-es';
import io from 'socket.io-client';
import config from '../../../config'
import EventTable from '../components/EventTable.vue'

export default {
    components: {
        EventTable,
    },
    data() {
        return {
            events: [],
        };
    },
    mounted() {
        this.createSocket(config.dashboard.subscriberPort)
    },
    methods: {
        addEvent(event) {
            event.new = true;
            setTimeout(() => event.new = false, 250);
            this.events.push(event);
        },
        createSocket(port) {
            const { protocol, hostname } = window.location;
            const server = `${protocol}//${hostname}:${port}`;
            console.log('Connecting to socket.io server', server);
            const socket = io(server);

            socket.on(config.dashboard.socketEvent, (data) => {
                console.log('Received event from socket', data);
                this.addEvent(data);
            });

            socket.on('connect_error', (error) => {
                console.error('Error connecting to socket.io, mocking events instead');
                socket.close();

                const mockEvents = [{
                    type: 'add-to-cart',
                    tracer: '12345',
                    productSlug: 'jacket',
                }, {
                    type: 'rec-tray-click',
                    tracer: '67890',
                    productSlug: 'pants',
                }];

                setInterval(() => {
                    this.addEvent({
                        type: sample(['add-to-cart', 'rec-tray-click']),
                        tracer: sample(['12345', '67890']),
                        productSlug: sample(['pants', 'shirt', 'dress', 'shoes']),
                        timestamp: new Date().toISOString(),
                    });
                }, 3000);
            });
        },
    },
}
</script>

