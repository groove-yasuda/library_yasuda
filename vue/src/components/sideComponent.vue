<template>
    <v-app id="inspire">
        <v-sheet color="#a9a9a9" class="pa-4 d-flex justify-center align-center text-center" height="40%">
            <div class="icon-container">
                <v-btn v-btn height="60" width="50" text v-on:click="HOME">
                    <v-icon size="50">mdi-library-outline</v-icon>
                </v-btn>
                <span class="icon-text">Library</span>
            </div>
        </v-sheet>

        <v-sheet color="#a9a9a9" height="100%">
            <v-list dense>
                <v-list-item-group>
                    <router-link v-for="(link, index) in links" :key="index" :to="`/${link[1].toLowerCase()}`"
                        :exact="true" style="color: black;">
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
.btn-same-size {
    width: 100px;
    height: 100px;
}
</style>

<script>
export default {
    data() {
        return {
            links: [
                ['検索', 'search_process'],//''にrouter.jsで設定したpathを宣言
                ['利用者登録編集・削除', 'user_edit'],
                ['貸出・返却', 'lend_process'],
            ],
        };
    },
    props: ['param'],
    methods: {
        insertLineBreaks(text) {
            return text.replace('利用者登録', '利用者登録<br>');
        },
        HOME(){
            this.$router.push({ path: 'terminal_home' });//''にrouter.jsで設定したpathを宣言
        },
    }
};
</script>

<style></style>
