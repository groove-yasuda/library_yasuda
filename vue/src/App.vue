<template>
    <v-app id="inspire" class="d-flex justify-center">
        <v-main>
            <router-view style="background-color: white"></router-view>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        
        data() {
            return {
                
            };
        },
        
    };
</script>

<style>
    .custom-drawer {
        background-color: grey;
        color: white;
    }
</style>
