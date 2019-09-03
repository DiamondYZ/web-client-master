<template>
  <el-form-item :label="data.label" :prop="data.name" :rules="data.rules">
    <el-input :placeholder="data.placeholder" v-model="value" @input="handleInput"></el-input>
  </el-form-item>
</template>

<script>
  export default {
    name: 'FormInput',
    data () {
      return {
        value: this.data.value
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleInput (value) {
        this.$emit('change', {name: this.data.name, value: value})
      }
    }
  }
</script>

<style>
</style>