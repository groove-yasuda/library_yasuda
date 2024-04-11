<template>
    <v-app>
        <v-main>
            <v-container>
                <v-icon>mdi-account-plus</v-icon>
                <p>社員情報登録</p>
                <p>確認画面</p>
                <p>以下の内容で登録します。</p>
                <p>間違いがなければ確認ボタンを押してください</p>
                <p v-if="error_Message" class="error_Message">{{ error_Message }}</p>
                <p class="text-center" :style="{'color': 'black'}">社員ID : {{ emp_Id }}</p>
                <p class="text-center" :style="{'color': 'black'}">社員名 : {{ emp_Name }}</p>
                <p class="text-center" :style="{'color': 'black'}">生年月日 : {{ birth }}</p>
                <p class="text-center" :style="{'color': 'black'}">年齢 : {{ age }}</p>
                <p class="text-center" :style="{'color': 'black'}">性別 : {{ gender }}</p>
                <p class="text-center" :style="{'color': 'black'}">子供の人数 : {{ child }}</p>
                <p class="text-center" :style="{'color': 'black'}">住宅手当 : {{ house }}</p>
                <p class="text-center" :style="{'color': 'black'}">役職 : {{ position }}</p>
                <p class="text-center" :style="{'color': 'black'}">基本給 : {{ basic_Salary }}円</p>
                <p class="text-center" :style="{'color': 'black'}">交通費 : {{ transport_Expens }}円</p>


            </v-container>

            <v-row justify="center">
                <v-col cols="auto">
                    <v-btn v-on:click="RETURN">戻る</v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-spacer></v-spacer>
                </v-col>
                <v-col cols="auto">
                    <v-btn v-on:click="CONFI">確認</v-btn>
                </v-col>
            </v-row>


        </v-main>
    </v-app>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                error_Message: '',
                emp_Id: '', 
                emp_Name: '',
                birth: '',
                age: '',
                gender: '',
                child: '',
                house: '',
                position: '',
                basic_Salary: '',
                transport_Expens:'',
            };
        },
        created() {

            this.emp_Id = this.$route.params.emp_Id;
            this.emp_Name = this.$route.params.emp_Name;
            this.birth = this.$route.params.birth;
            this.age = this.$route.params.age;
            this.gender = this.$route.params.gender;
            this.child = this.$route.params.child;
            this.house = this.$route.params.house;
            this.position = this.$route.params.position;
            this.basic_Salary = this.$route.params.basic_Salary;
            this.transport_Expens = this.$route.params.transport_Expens;
        },
        methods: {
            RETURN() {
                this.$router.push({ name: 'ins_Inp' });
            },
            CONFI() {
                axios
                    .request({
                        method: 'POST',
                        url: 'http://localhost:8080/insert_Func',
                        data: {
                            id_Over: this.emp_Id,
                            name_Over: this.emp_Name,
                            birth: this.birth,
                            age: this.age,
                            gender: this.gender,
                            child: this.child,
                            house: this.house,
                            position: this.position,
                            basic_Salary: this.basic_Salary,
                            transport_Expens: this.transport_Expens,
                        }
                    })
                    .then((response) => {
                        if (response.data === true) {
                            this.$router.push({ name: 'ins_Comp' });
                        }
                        else if (response.data === false) {
                            const error_Message = '入力された社員IDはすでに登録されています。';
                            this.$router.push({ name: 'ins_Inp', params: { error_Message: error_Message } });
                        }

                    })
            },
        }
    };
</script>