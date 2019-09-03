<template>
  <el-form-item :label="data.label" :prop="data.name" :rules="data.rules">
    <el-radio-group v-model="status" @change="handleChange">
      <el-radio v-for="s in availableStatus" :label="s.id" :key="s.id" >{{s.label}}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
  import {fetchAvailableStatus} from '@/api/equipment'
  export default {
    name: 'FormEquipmentAvailableStatus',
    data () {
      return {
        availableStatus: [],
        status: this.data.value
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    created () {
      fetchAvailableStatus().then((resp) => {
        let data = resp.data
        this.availableStatus = data
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