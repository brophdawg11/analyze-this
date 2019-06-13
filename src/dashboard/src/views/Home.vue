<template>
    <v-layout row wrap>
        <v-flex xs12 md6>
            <EventTable title="All Events (Firebase)" :config="allConfig" />
        </v-flex>
        <v-flex xs12 md6>
            <v-layout row wrap>
                <v-flex xs12>
                    <EventTable title="DY Events" :config="dyConfig" />
                </v-flex>
                <v-flex xs12>
                    <EventTable title="SessionM Events" :config="sessionmConfig" />
                </v-flex>
                <v-flex xs12>
                    <EventTable title="SiteSpect Events" :config="sitespectConfig" />
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import config from '../../../config'
import EventTable from '../components/EventTable.vue'

export default {
    components: {
        EventTable,
    },
    data() {
        return {
            allConfig: config.all,
            dyConfig: config.dy,
            sessionmConfig: config.sessionm,
            sitespectConfig: config.sitespect,
        };
    },
}
</script>

