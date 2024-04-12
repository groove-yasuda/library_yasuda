<template>
    <v-app>
        <v-navigation-drawer app style="width: 200px;" permanent :clipped="true">
            <side_Component></side_Component>
        </v-navigation-drawer>

        <v-main id="mainContent" style="padding: 0;">
            <v-container class="py-12 px-6" fluid>
                <p class="login-title">利用者情報</p>
                <p class="login-title">編集・削除</p>
                <v-col  class="text-center mt-3"> <!-- 上部からのマージンを追加 -->
                    <br>

                    <p :style="{ color: numberError ? 'red' : 'white' }" class="error-message">入力できない文字が含まれています</p>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>名前</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="0123456789" clearable v-model="inputEmpNumber" @input="checkEmpNumber"
                                counter="10" hint="図書カード番号を入力してください" :rules="[number_Max_Char]" style="width:300px;"
                                single-line :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>電話番号</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="0123456789" clearable v-model="inputEmpNumber" @input="checkEmpNumber"
                                counter="10" hint="図書カード番号を入力してください" :rules="[number_Max_Char]" style="width:300px;"
                                single-line :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                </v-col>

                
                <v-col  class="text-center mt-3"> <!-- 上部からのマージンを追加 -->

                    <p :style="{ color: numberError ? 'red' : 'white' }" class="error-message">入力できない文字が含まれています</p>


                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>郵便番号</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="0123456789" clearable v-model="inputEmpNumber" @input="checkEmpNumber"
                                counter="10" hint="図書カード番号を入力してください" :rules="[number_Max_Char]" style="width:300px;"
                                single-line :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>住所：市区町村</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="0123456789" clearable v-model="inputEmpNumber" @input="checkEmpNumber"
                                counter="10" hint="図書カード番号を入力してください" :rules="[number_Max_Char]" style="width:300px;"
                                single-line :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>住所：番地</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="0123456789" clearable v-model="inputEmpNumber" @input="checkEmpNumber"
                                counter="10" hint="図書カード番号を入力してください" :rules="[number_Max_Char]" style="width:300px;"
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
                                <p class="error-message caveat-title">{{ error_Message }}</p>
                            </v-card-text>

                            <v-row class="mt-8 mb-8">
                                <v-col cols="8"></v-col>
                                <v-col cols="auto">
                                    <v-card-actions>
                                        <v-btn @click="dialog = false" class="btn-same-size" color="black"
                                            dark>戻る</v-btn>
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

.caveat-title {
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
            error_Message: '',
        };
    },
    methods: {
        checkEmpNumber() {
            if (/^[0-9]/.test(this.inputEmpNumber) || this.inputEmpNumber == "" || this.inputEmpNumber == null) {
                this.numberError = false;
            } else {
                this.numberError = true;
            }
        },
        number_Max_Char(value) {
            if (value.length <= 10) {
                return true;
            } else {
                return '10字で入力してください';
            }
        },
        LOGIN() {
            if (this.inputEmpNumber == "" || this.inputEmpNumber == null) {
                this.dialog = true;
                this.error_Message = '図書カード番号を入力してください'
                return;
            } else {
                if (/^[0-9]{10}$/.test(this.inputEmpNumber)) {
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
                                this.error_Message = '入力された番号は登録されていません。'
                                return;

                            }

                        })
                } else {
                    this.dialog = true;
                    this.error_Message = '入力された番号は登録されていません。'
                    return;
                }
            }
        },
        RETURN() {
            this.$router.push({ path: 'terminal_user' });//''にrouter.jsで設定したpathを宣言
        }
    }
};
</script>
