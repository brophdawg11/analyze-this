<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Analyze This</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat>
                    <router-link to="/">
                        Home
                    </router-link>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content>
            <v-container grid-list-xl>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

