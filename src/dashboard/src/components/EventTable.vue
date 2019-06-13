<template>
    <div>
        <h2>{{ title }}</h2>
        <v-data-table
            :headers="headers"
            :items="events"
            :hide-actions="true"
            :must-sort="true"
            class="elevation-1">

            <template v-slot:items="{ item }">

                <tr :key="item.timestamp" class="row" :class="{ 'new': item.new }">

                    <td>{{ item.timestamp }}</td>
                    <td>{{ item.activity_event_name }}</td>
                    <td>{{ item.tracer }}</td>
                    <td>{{ item.productSlug }}</td>

                </tr>

            </template>

        </v-data-table>
    </div>
</template>

<script>
import { sample } from 'lodash-es';
import io from 'socket.io-client';
import config from '../../../config'

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        config: {
            type: Object,
            required: true,
        },
        dataColumn: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            headers: [{
                text: 'Timestamp',
                value: 'timestamp',
            }, {
                text: 'Type',
                value: 'activity_event_name',
            }, {
                text: 'Tracer',
                value: 'tracer',
            }, {
                text: 'Slug',
                value: 'productSlug',
            }],
            events: [],
        };
    },
    mounted() {
        this.createSocket();
    },
    methods: {
        addEvent(event) {
            event.new = true;
            setTimeout(() => event.new = false, 250);
            this.events.push(event);
        },
        createSocket() {
            const { protocol, hostname } = window.location;
            const port = this.config.subscriberPort;
            const server = `${protocol}//${hostname}:${port}`;
            console.log('Connecting to socket.io server', server);
            const socket = io(server);

            socket.on('connect', () => console.log('Connected to socket'));

            socket.on('connect_error', (error) => {
                console.error('Error connecting to socket.io, mocking events instead');
                socket.close();
                //this.sendMockEvents();
            });

            socket.on(this.config.socketEvent, (data) => {
                console.log('Received event from socket', data);
                this.addEvent(data);
            });
        },
        sendMockEvents() {
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
        },
    }
}
</script>

<style lang="scss" scoped>
.row {
    background-color: white;
    transition: background-color 500ms linear;
}

.new {
    background-color: lightgreen;
}
</style>
