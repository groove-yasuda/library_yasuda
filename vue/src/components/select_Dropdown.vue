<template>
    <div>
        <label :for="id">{{ label }}</label>
        <select :id="id" v-model="selectedValue" :class="selectClass">
            <option v-for="option in options" :value="option" :key="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: {
            label: String, // ラベル
            id: String, // フォーム要素のID
            selectClass: String, // セレクトボックスに適用するクラス
            options: Array, // プルダウンの選択肢
            value: [String, Number], // プルダウンの選択値 (v-model で受け取ります)
        },
        computed: {
            selectedValue: {
                get() {
                    return this.value;
                },
                set(newValue) {
                    this.$emit("input", newValue);
                },
            },
        },
    };
</script>
