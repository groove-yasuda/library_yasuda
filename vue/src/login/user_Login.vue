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

                    <p :style="{ color: numberError ? 'red' : 'white' }" class="error-message">入力できない文字が含まれています</p>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>図書カード番号</v-subheader>
                        </v-col>
                        <v-col cols="8">
                            
                            <v-text-field label="0123456789" clearable v-model="inputEmpNumber" @input="checkEmpNumber" counter="10"
                                hint="図書カード番号を入力してください" :rules="[number_Max_Char]" style="width:300px;"
                                single-line :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                </v-col>

                <br><br><br><br><br>

                <v-row class="mt-8 mb-8">
                    
                    <v-col cols="8"></v-col>
                    <v-col cols="auto">
                        <v-btn v-on:click="LOGIN" class="btn-same-size" color="black" dark>ログイン</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn v-on:click="RETURN" class="btn-same-size" color="black" dark>戻る</v-btn>
                    </v-col>
                </v-row>

                <v-dialog v-model="dialog" max-width="1300px" :persistent="true">
                    <v-card class="d-flex flex-column">
                        <v-container class="py-12 px-6" fluid>
                        <v-card-title class="error-message login-title ">エラー</v-card-title>
                        <v-col cols="12" class="text-center mt-6"></v-col>
                        <v-card-text class="text-center" style="height:180px">
                                <p class="error-message caveat-title">入力された番号は登録されていません。</p>
                        </v-card-text>

                            <v-row class="mt-8 mb-8">
                            <v-col cols="8"></v-col>
                            <v-col cols="auto">
                                <v-card-actions>
                                    <v-btn @click="dialog = false" class="btn-same-size" color="black" dark>戻る</v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                        
                    </v-container>
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
    width: 80px;
    height: 40px;
}

.caveat-title{
    font-size: 18px;
}
</style>

<script>
import side_Component from '@/components/sideComponent.vue';
import axios from 'axios';

export default {
    components: {
        side_Component
    },
    data() {
        return {
            inputEmpNumber: '',
            dialog: false,
            numberError: false,
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
        checkEmpNumber() {
                if (/^[0-9]/.test(this.inputEmpNumber) || this.inputEmpNumber == "") {
                    this.numberError = false;
                } else {
                    this.numberError = true;
                }
            },
        number_Max_Char(value) {
            if (value.length <= 10) {
                return true;
            } else {
                return '図書カード番号は10文字で入力してください';
            }
        },
        LOGIN() {
            if (/^[0-9]{10}/.test(this.inputEmpNumber)) {
                this.dialog = false;
                axios
                    .request({
                        method: 'POST',
                        url: 'http://localhost:8080/numberCheck',
                        data: {
                            libraryNumberOver: this.inputEmpNumber,
                        }
                    })
                    .then((response) => {
                        if (response.data === true) {
                            this.$router.push({ path: 'user_edit' });
                        }
                        else if (response.data === false) {
                            this.dialog = true;
                            return;

                        }

                    })
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
