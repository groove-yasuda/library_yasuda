<template>
    <v-app>
        <v-navigation-drawer app style="width: 200px;" permanent :clipped="true">
            <side_component></side_component>
        </v-navigation-drawer>

        <v-main id="mainContent" style="padding: 0;">
            <v-container class="py-12 px-6" fluid>
                <p class="login-title">利用者情報</p>
                <p class="login-title">編集・削除</p>
                <v-col class="text-center mt-3"> <!-- 上部からのマージンを追加 -->
                    <br>

                    <p :style="{ color: numberError ? 'red' : 'white' }" class="error-message">入力できない文字が含まれています</p>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>名前</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="図書太郎" clearable v-model="inputName" counter="64"
                                :rules="[maxChar, checkInput]" style="width:300px;" single-line
                                :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>電話番号</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="09012345678" clearable v-model="inputPhoneNumber"
                                hint="ハイフンは除いて入力してください" :rules="[phoneNumberMaxChar]" style="width:300px;" single-line
                                :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                </v-col>


                <v-col class="text-center mt-3"> <!-- 上部からのマージンを追加 -->

                    <p :style="{ color: numberError ? 'red' : 'white' }" class="error-message">入力できない文字が含まれています</p>


                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>郵便番号</v-subheader>
                        </v-col>
                        <v-col cols="auto">

                            <v-text-field label="0123456" clearable v-model="inputPostCode" counter="7"
                                @input="inputAll" hint="ハイフンは除いて入力してください" :rules="[postCodeMaxChar]"
                                style="width:300px;" single-line :error="numberError"></v-text-field>

                        </v-col>

                        <v-col cols="auto">
                            <v-btn v-on:click="SEARCH" class="btn-same-size" color="black" dark>住所検索</v-btn>
                            <!-- 後でイベントの変更 -->
                        </v-col>
                    </v-row>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>都道府県</v-subheader>
                        </v-col>

                        <v-col cols="auto">
                            <select v-model="selectedPrefecture" class="select-Dropdown" id="prefectureSelect">
                                <option v-for="prefecture in prefectures" :key="prefecture.id" :value="prefecture.name"
                                    :selected="prefecture.id === prefectureId">{{ prefecture.name }}</option>
                            </select>

                        </v-col>

                    </v-row>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>市区町村</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="新宿区西新宿" clearable v-model="inputMunicipalities" style="width:300px;"
                            :rules="[checkInput]" single-line :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>番地</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="0-0-0" clearable v-model="inputStreetAddress" style="width:300px;"
                            :rules="[checkStreetAddress]" single-line :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>

                    <v-row align="center">
                        <v-col cols="4">
                            <v-subheader>マンション名 部屋番号等</v-subheader>
                        </v-col>
                        <v-col cols="8">

                            <v-text-field label="〇〇〇マンション 〇号室" clearable v-model="inputApartment" counter="64"
                                :rules="[maxChar, checkEscapeSequence]" style="width:300px;" single-line
                                :error="numberError"></v-text-field>

                        </v-col>
                    </v-row>
                </v-col>

                <br><br><br><br><br>

                <v-row class="mt-8 mb-8">

                    <v-col cols="12"></v-col>
                    <v-col cols="0">
                        <v-btn @click="deletePopup = true" class="btn-same-size" color="black"
                            :disabled="!buttonEnabled" :dark="buttonEnabled">削除</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn @click="registPopup = true" class="btn-same-size" color="black"
                            :disabled="!buttonEnabled" :dark="buttonEnabled">更新</v-btn>
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

                <v-dialog v-model="registPopup" max-width="600px" :persistent="true">
                    <v-card align="center">
                        <v-card-title>更新内容確認</v-card-title>
                        <v-card-text>
                            <p>名前: {{ inputName }}</p>
                            <p>電話番号: {{ inputPhoneNumber }}</p>
                            <p>郵便番号: {{ inputPostCode }}</p>
                            <p>都道府県: {{ selectedPrefecture }}</p>
                            <p>市区町村 {{ inputMunicipalities }}</p>
                            <p>番地: {{ inputStreetAddress }}</p>
                            <p>マンション名: {{ inputApartment }}</p>
                        </v-card-text>
                        <v-card-actions>

                            <v-row class="mt-8 mb-8">
                                <v-col cols="8"></v-col>
                                <v-col cols="auto">
                                    <v-btn @click="REGIST" color="black" dark>更新</v-btn>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn @click="registPopup = false" color="black" dark>戻る</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="deletePopup" max-width="1300px" :persistent="true">
                    <v-card class="d-flex flex-column">
                        <v-container class="py-12 px-6" fluid>
                            <v-col cols="12" class="text-center mt-6"></v-col>
                            <v-card-text class="text-center" style="height:180px">
                                <p class="error-message caveat-title">本当に削除しますか</p>
                            </v-card-text>

                            <v-row class="mt-8 mb-8">
                                <v-col cols="8"></v-col>
                                <v-col cols="auto">
                                    <v-btn @click="DELETE" color="black" dark>削除</v-btn>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn @click="deletePopup = false" color="black" dark>戻る</v-btn>
                                </v-col>
                            </v-row>

                        </v-container>
                    </v-card>
                </v-dialog>


                <v-dialog v-model="completionPopup" max-width="1300px" :persistent="true">
                    <v-card class="d-flex flex-column">
                        <v-container class="py-12 px-6" fluid>
                            <v-col cols="12" class="text-center mt-6"></v-col>
                            <v-card-text class="text-center" style="height:180px">
                                <p>{{ messageCompletion }}が完了しました</p>
                            </v-card-text>

                            <v-row class="mt-8 mb-8">
                                <v-col cols="8"></v-col>

                                <v-col cols="auto">
                                    <v-btn @click="submitData" color="black" dark>戻る</v-btn>
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

.select-Dropdown {
    padding: 5px;
    border: 1px solid #000000;
    border-radius: 4px;
    background-color: white;
    font-size: 18px;
    width: 80px;
}
</style>

<script>
import side_component from '@/components/side_component.vue';
import axios from 'axios';

export default {
    components: {
        side_component,
    },
    data() {
        return {
            prefectureId: 1,
            dialog: false,
            numberError: false,
            error_Message: '',
            inputName: '',
            inputPostCode: '',
            inputMunicipalities: '',
            inputPhoneNumber: '',
            inputStreetAddress: '',
            inputApartment: '',
            registrationPopup: true,
            buttonEnabled: false,
            registPopup: false,
            deletePopup: false,
            completionPopup: false,
            libraryNumber: '',
            selectedPrefecture: '',
            messageCompletion: '',
            prefectures: [],
            storageName: '',
            storagePhoneNumber: '',
            storageMunicipalities: '',
            storageStreetAddress: '',
        };
    },
    created() {
        // ルーターからパラメータを取得してデータに代入
        this.libraryNumber = this.$route.params.libraryNumber;

        try {
            axios
                .request({
                    method: 'POST',
                    url: 'http://localhost:8080/prefectureAcquisition',
                    data: {

                    }
                })
                .then((response) => {
                    if (response.data) {

                        let n = 0;

                        while (n < 47) {
                            this.prefectures.push({
                                id: response.data[n].prefecture_id,
                                name: response.data[n].prefecture_name
                            });

                            n = n + 1;
                        }


                    } else {
                        this.dialog = true;
                        this.error_Message = '都道府県情報が取得できません。';
                    }
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    this.dialog = true;
                    this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
                });
        } catch (error) {
            console.error('An error occurred:', error);
            this.dialog = true;
            this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
        }
    },
    mounted() {
        try {
            axios
                .request({
                    method: 'POST',
                    url: 'http://localhost:8080/dataAcquisition',
                    data: {
                        libraryNumberOver: this.libraryNumber,
                    }
                })
                .then((response) => {
                    if (response.data) {
                        const userData = response.data[0];
                        this.inputName = userData.user_Name;
                        this.inputPhoneNumber = userData.phone_number;
                        this.prefectureId = userData.prefecture_id;
                        this.inputMunicipalities = userData.city;
                        this.inputStreetAddress = userData.block;
                        this.inputApartment = userData.building;
                        this.selectedPrefecture = this.prefectures.find(prefecture => prefecture.id === this.prefectureId).name;
                        this.storageName = userData.user_Name;
                        this.storagePhoneNumber = userData.phone_number;
                        this.storageMunicipalities = userData.city;
                        this.storageStreetAddress = userData.block;

                    } else {
                        this.dialog = true;
                        this.error_Message = '利用者登録情報が存在しません。';
                    }
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    this.dialog = true;
                    this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
                });
        } catch (error) {
            console.error('An error occurred:', error);
            this.dialog = true;
            this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
        }
    },
    watch: {
        selectedPrefecture(newVal) {
            this.selectedPrefectureChange(newVal);
        },
        inputName(newValue) {
            this.inputAll(newValue);
            this.differenceCheck();
        },
        inputMunicipalities(newValue) {
            this.inputAll(newValue);
            this.differenceCheck();
        },
        inputPhoneNumber(newValue) {
            this.inputAll(newValue);
            this.differenceCheck();
        },
        inputStreetAddress(newValue) {
            this.inputAll(newValue);
            this.differenceCheck();
        },
    },

    methods: {
        selectedPrefectureChange(newVal) {
            const selectedPrefectureObject = this.prefectures.find(prefecture => prefecture.name === newVal);
            if (selectedPrefectureObject) {
                this.prefectureId = selectedPrefectureObject.id;
            }
        },
        maxChar(value) {
            if (value == ''  || value === null) {
                return false;
            } else if(value.length <= 64){
                return true;
            } else {
                return '64字以内で入力してください';
            }
        },
        postCodeMaxChar(value) {
            if (!value) { // 値が空の場合
                return true;
            } else if (!/^\d+$/.test(value)) { // 数字以外が含まれている場合
                return '規程の入力ではありません。';
            } else if (value.length <= 7) {
                return true;
            } else {
                return '規程の入力ではありません。';
            }
        },
        checkEscapeSequence(value) {
            if (/\\/.test(value)) {
                return '入力できない文字が含まれています。';
            } else {
                return true;
            }
        },
        checkInput(value) {
            if (value == '' || value == null) {
                return false;
            } else if(/^[ぁ-んァ-ン一-龠a-zA-Z]+$/.test(value)){
                return true;
            } else {
                return '入力できない文字が含まれています。';
            }
        },
        checkStreetAddress(value) {
            if(value == '' || value == null){
                return false;
            } else {
                return true;
            }
        },
        phoneNumberMaxChar(value) {
            if (!value) { // 値が空の場合
                return false;
            } else if (/^(0120|010|020|030|040|050|060)/.test(value)) {
                return '規程の入力ではありません。';
            } else if (!/^\d+$/.test(value)) {
                return '規程の入力ではありません。';
            } else if (value.length <= 11) {
                return true;
            } else if (value.length === 10) {
                if (/^\d{9}$/.test(value)) {
                    return true;
                } else {
                    return '規程の入力ではありません。';
                }
            } else if (value.length > 11) {
                return '規程の入力ではありません。';
            }
        },
        inputAll() {
            const isValidName = this.checkInput(this.inputName) === true;
            const isValidNameChar = this.maxChar(this.inputName) === true;
            const isValidPhoneNumber = this.phoneNumberMaxChar(this.inputPhoneNumber) === true;
            const isValidMunicipalities = this.checkInput(this.inputMunicipalities) === true;
            const isValidStreetAddress = this.checkStreetAddress(this.inputStreetAddress) === true;

            console.log(isValidName);
            console.log(isValidNameChar);
            console.log(isValidPhoneNumber);
            console.log(isValidStreetAddress);
            console.log(isValidMunicipalities);
            console.log('OK');


            if (isValidName && isValidPhoneNumber && isValidStreetAddress && isValidNameChar && isValidMunicipalities) {
                this.buttonEnabled = true;
            } else {
                this.buttonEnabled = false;
            }
        },
        differenceCheck() {
            
            if(this.storageName == this.inputName && this.storagePhoneNumber == this.inputPhoneNumber &&
                this.storageMunicipalities == this.inputMunicipalities && this.storageStreetAddress == this.inputStreetAddress)
                {
                    this.buttonEnabled = false;
                }
        },
        REGIST() {
            try {
                axios
                    .request({
                        method: 'POST',
                        url: 'http://localhost:8080/dataUpdate',
                        data: {
                            libraryNumberOver: this.libraryNumber,//図書カード番号
                            userNameOver: this.inputName,//利用者名
                            phoneNumberOver: this.inputPhoneNumber,//電話番号
                            prefectureIdOver: this.prefectureId,//都道府県番号
                            municipalitiesOver: this.inputMunicipalities,//市区町村
                            streetAddressOver: this.inputStreetAddress,//番地
                            apartmentOver: this.inputApartment,//マンション名
                        }
                    })
                    .then((response) => {
                        if (response.data) {
                            //登録が完了したポップアップ
                            this.completionPopup = true;
                            this.messageCompletion = '更新';

                        } else if (response.data === false) {
                            this.dialog = true;
                            this.error_Message = '利用者登録情報が存在しません。';
                        }
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                        this.dialog = true;
                        this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
                    });
            } catch (error) {
                console.error('An error occurred:', error);
                this.dialog = true;
                this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
            }
        },
        DELETE() {
            try {
                axios
                    .request({
                        method: 'POST',
                        url: 'http://localhost:8080/dataDelete',
                        data: {
                            libraryNumberOver: this.libraryNumber,//図書カード番号
                            userNameOver: this.inputName,//利用者名
                            phoneNumberOver: this.inputPhoneNumber,//電話番号
                            prefectureIdOver: this.prefectureId,//都道府県番号
                            municipalitiesOver: this.inputMunicipalities,//市区町村
                            streetAddressOver: this.inputStreetAddress,//番地
                            apartmentOver: this.inputApartment,//マンション名
                        }
                    })
                    .then((response) => {
                        if (response.data) {

                            //登録が完了したポップアップ
                            this.completionPopup = true;
                            this.messageCompletion = '削除';

                        } else if (response.data === false) {
                            this.dialog = true;
                            this.error_Message = '利用者登録情報が存在しません。';
                        }
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                        this.dialog = true;
                        this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
                    });
            } catch (error) {
                console.error('An error occurred:', error);
                this.dialog = true;
                this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
            }
        },
        SEARCH() {
            try {
                axios
                    .request({
                        method: 'POST',
                        url: 'http://localhost:8080/postCodeSearch',
                        data: {
                            postCodeOver: this.inputPostCode,//郵便番号
                        }
                    })
                    .then((response) => {
                        if (response.data) {
                            const addressData = response.data.results[0]
                            this.prefectureId = addressData.prefcode;//都道府県番号
                            this.inputMunicipalities = addressData.address2 + addressData.address3; //市区町村
                            this.selectedPrefecture = addressData.address1;

                        } else if (response.data === false) {
                            this.dialog = true;
                            this.error_Message = '住所が存在しません。';
                        }
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                        this.dialog = true;
                        this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
                    });
            } catch (error) {
                console.error('An error occurred:', error);
                this.dialog = true;
                this.error_Message = 'システムエラーが発生しました。係員にお知らせください';
            }
        },
        submitData() {
            this.$router.push({ name: 'terminal_User' });//''にrouter.jsで設定したpathを宣言
        },
        RETURN() {
            this.$router.push({ name: 'terminal_User' });//''にrouter.jsで設定したpathを宣言
        }
    },
};
</script>
