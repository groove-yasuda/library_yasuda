<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app class="custom-drawer">
            <side_Component v-bind:param="Name"></side_Component>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>社員情報管理画面</v-toolbar-title>
        </v-app-bar>

            <v-main>
                <router-view  style="background-color: white"></router-view>
            </v-main>
    </v-app>
</template>

<script>
    import side_Component from './components/sideComponent.vue'
    export default {
        name: 'App',
        components: {
            side_Component
        },
        data() {
            return {
                drawer: null,
                Name: '',
                
            };
        },
        methods: {
            get_LoggeIn(loggeIn_Judge,syainName) {
                this.Name = syainName;

            },
            LOGOUT() {
                this.$router.push({ name: 'user_Login' });
            },
        },
    };
</script>

<style>
    .custom-drawer {
        background-color: grey;
        color: white;
    }
</style>