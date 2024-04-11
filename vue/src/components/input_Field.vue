<template>
    <div>
        <v-text-field :label="label"
                      v-model="inputValue"
                      @input="emitInput"
                      type="input" clearable
                      :hint="hint"></v-text-field>
        <p v-if="error" class="error-Message">有効な{{ label }}を入力してください。</p>
    </div>
</template>

<script>
    export default {
        props: {
            label: String,
            hint: String,
            error: Boolean,
            value: String,
        },
        data() {
            return {
                inputValue: this.value
            };
        },
        methods: {
            emitInput(newValue) {
                this.inputValue = newValue;
                this.$emit("input", newValue);
            },
        },
    };
</script>