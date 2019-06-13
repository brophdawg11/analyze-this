<template>
    <v-data-table
        :headers="headers"
        :items="filteredEvents"
        :hide-actions="true"
        :must-sort="true"
        class="elevation-1">

        <template v-slot:items="{ item }">

            <tr :key="item.timestamp" class="row" :class="{ 'new': item.new }">

                <td>{{ item.timestamp }}</td>
                <td>{{ item.tracer }}</td>
                <td>{{ item.productSlug }}</td>

            </tr>

        </template>

    </v-data-table>
</template>

<script>
export default {
    props: {
        events: {
            type: Array,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            headers: [{
                text: 'Timestamp',
                value: 'timestamp',
            }, {
                text: 'Tracer',
                value: 'tracer',
            }, {
                text: 'Slug',
                value: 'productSlug',
            }],
        };
    },
    computed: {
        filteredEvents() {
            return this.events.filter(e => e.type === this.type);
        },
    },
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
