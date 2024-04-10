<template>
    <v-app id="inspire">
        <v-sheet color="#a9a9a9" class="pa-4 d-flex justify-center align-center text-center" height="40%">
            <div class="icon-container">
                <v-icon size="50" >mdi-library-outline</v-icon>
                <span class="icon-text">Library</span>
            </div>
        </v-sheet>

        <v-sheet color="#a9a9a9" height="100%">
            <v-list dense>
                <v-list-item-group>
                    <router-link v-for="(link, index) in links" :key="index" :to="`/${link[1].toLowerCase()}`" :exact="true" style="color: black;">
                        <v-list-item class="text-center">
                            <v-list-item-title class="color" v-html="insertLineBreaks(link[0])"></v-list-item-title>
                        </v-list-item>
                    </router-link>
                </v-list-item-group>
            </v-list>
        </v-sheet>
    </v-app>
</template>

<style scoped>
    .v-progress-circular {
        margin: 1rem;
    }
    .color {
        color: black;
    }
    .icon-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .icon-text {
        margin-top: 10px;
    }
</style>

<script>
    export default {
        data() {
            return {
                links: [
                    ['検索', ''],//''にrouter.jsで設定したpathを宣言
                    ['利用者登録編集・削除', ''],
                    ['貸出・返却', ''],
                ],
            };
        },
        props:['param'],
        methods: {
            insertLineBreaks(text) {
                return text.replace('利用者登録', '利用者登録<br>');
            }
        }
    };
</script>

<style>
</style>
