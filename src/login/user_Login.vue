<template>
    <v-app>
        <v-navigation-drawer app class="custom-drawer">
            <side_Component></side_Component>
        </v-navigation-drawer>

        <v-main id="mainContent">
            <v-container class="py-12 px-6" fluid>
                <p class="login-title">ログイン</p>
                <v-col cols="12" class="text-center mt-6"> <!-- 上部からのマージンを追加 -->
                    <br>
                    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-list-subheader>図書カード番号</v-list-subheader>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field label="0123456789" clearable v-model="inputEmpId" counter="10"
                            hint="図書カード番号を入力してください" :rules="[id_Max_Char]" style="width:250px;" 
                            single-line></v-text-field>

                        </v-col>
                    </v-row>
                </v-col>


                <v-row class="mt-8 mb-8">
                    <v-col cols="8"></v-col> <!-- ログインボタンの右にスペースを作成 -->
                    <v-col cols="auto">
                        <v-btn v-on:click="LOGIN" class="btn-same-size" color="black" dark>ログイン</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn v-on:click="RETURN" class="btn-same-size" color="black" dark>戻る</v-btn>
                    </v-col>
                </v-row>

                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>エラー</v-card-title>
                        <v-card-text>
                            <p>有効な図書カード番号を入力してください。</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-container>
        </v-main>
    </v-app>
</template>

<style type="text/css">
p {
    font-family: 'Century', Times, serif;
    color: black;
}

.error-message {
    color: red;
}

.login-title {
    font-size: 24px;
}

.btn-same-size {
    width: 80px; /* ボタンの幅を指定 */
    height: 40px; /* ボタンの高さを指定 */
}
</style>

<script>
import side_Component from '@/components/sideComponent.vue';

export default {
    components: {
        side_Component
    },
    data() {
        return {
            inputEmpId: '',
            errorMessage: '',
            dialog: false,
        };
    },
    mounted() {
        // v-main の幅を計算して、中央に配置するマージンを設定
        const mainContent = document.getElementById('mainContent');
        const mainWidth = mainContent.offsetWidth;
        mainContent.style.marginLeft = `calc(50% - ${mainWidth / 2}px)`;
        mainContent.style.marginRight = `calc(50% - ${mainWidth / 2}px)`;
    },
    methods: {
        id_Max_Char(value) {
            if (value.length <= 10) {
                return true;
            } else {
                return '図書カード番号は10文字で入力してください';
            }
        },
        LOGIN() {
            if (/^[0-9]{10}/.test(this.inputEmpId)) {
                this.dialog = false;
            } else {
                this.dialog = true;
                return;
            }
        },
        RETURN() {
            this.$router.push({ path: '' });//''にrouter.jsで設定したpathを宣言
        }
    }
};
</script>
