<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="项目名称" >
        <el-input v-model="form.projectName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="省份" >
        <el-input v-model="form.province" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="城市" >
        <el-input v-model="form.city" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="地址" >
        <el-input v-model="form.address" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="开始时间" >
        <el-date-picker v-model="form.startTime" type="datetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="结束时间" >
        <el-date-picker v-model="form.endTime" type="datetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="出差时长" >
        <el-input v-model="form.duration" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="预算" >
        <el-input v-model="form.budget" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="总报销金额" >
        <el-input v-model="form.aggregateAmount" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="总补贴金额" >
        <el-input v-model="form.subsidyAmount" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="报销状态 0未报销，1已报销" >
        <el-input v-model="form.accountState" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="报销时间" >
        <el-date-picker v-model="form.accountTime" type="datetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="补贴状态 0未报销，1已报销" >
        <el-input v-model="form.subsidyState" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="补贴报销时间" >
        <el-date-picker v-model="form.subsidyName" type="datetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建人" >
        <el-input v-model="form.createdUser" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-date-picker v-model="form.createdTime" type="datetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="更新人" >
        <el-input v-model="form.updatedUser" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="更新时间" >
        <el-date-picker v-model="form.updatedTime" type="datetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="差旅状态 0生效，1结束" >
        <el-input v-model="form.state" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="是否有效 0有效，1无效" >
        <el-input v-model="form.vaild" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/tProjectDetail'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        projectId: '',
        projectName: '',
        province: '',
        city: '',
        address: '',
        startTime: '',
        endTime: '',
        duration: '',
        budget: '',
        aggregateAmount: '',
        subsidyAmount: '',
        accountState: '',
        accountTime: '',
        subsidyState: '',
        subsidyName: '',
        createdUser: '',
        createdTime: '',
        updatedUser: '',
        updatedTime: '',
        state: '',
        vaild: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        projectId: '',
        projectName: '',
        province: '',
        city: '',
        address: '',
        startTime: '',
        endTime: '',
        duration: '',
        budget: '',
        aggregateAmount: '',
        subsidyAmount: '',
        accountState: '',
        accountTime: '',
        subsidyState: '',
        subsidyName: '',
        createdUser: '',
        createdTime: '',
        updatedUser: '',
        updatedTime: '',
        state: '',
        vaild: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
