<template>
  <el-form-item :label="data.label" :prop="data.name" :rules="data.rules">
    <el-select v-model="value" :placeholder="data.placeholder" @change="handleChange">
      <el-option v-for="option in options" :key="option.id" :label="option.label" :value="option.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  import {fetchCategory} from '@/api/equipment'
  export default {
    name: 'FormEquipmentCategory',
    data () {
      return {
        options: [],
        value: this.data.value
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    created () {
      fetchCategory().then((resp) => {
        let data = resp.data
        this.options = data
      })
    },
    methods: {
      handleChange (value) {
        this.$emit('change', {name: this.data.name, value: value})
      }
    }
  }
</script>

<style>
</style>