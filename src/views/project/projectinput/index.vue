<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          v-permission="['admin','tProjectDetail:add']"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">新增</el-button>
      </div>
      <!-- 导出 -->
      <div style="display: inline-block;">
        <el-button
          :loading="downloadLoading"
          size="mini"
          class="filter-item"
          type="warning"
          icon="el-icon-download"
          @click="download">导出</el-button>
      </div>
    </div>
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="projectId" label="项目编号"/>
      <el-table-column prop="projectName" label="项目名称"/>
      <el-table-column prop="province" label="省份"/>
      <el-table-column prop="city" label="城市"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="startTime" label="开始时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="出差时长"/>
      <el-table-column prop="budget" label="预算"/>
      <el-table-column prop="aggregateAmount" label="总报销金额"/>
      <el-table-column prop="subsidyAmount" label="总补贴金额"/>
      <el-table-column prop="accountState" label="报销状态 0未报销，1已报销"/>
      <el-table-column prop="accountTime" label="报销时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.accountTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subsidyState" label="补贴状态 0未报销，1已报销"/>
      <el-table-column prop="subsidyName" label="补贴报销时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.subsidyName) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdUser" label="创建人"/>
      <el-table-column prop="createdTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedUser" label="更新人"/>
      <el-table-column prop="updatedTime" label="更新时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="差旅状态 0生效，1结束"/>
      <el-table-column prop="vaild" label="是否有效 0有效，1无效"/>
      <el-table-column v-if="checkPermission(['admin','tProjectDetail:edit','tProjectDetail:del'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button v-permission="['admin','tProjectDetail:edit']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
          <el-popover
            v-permission="['admin','tProjectDetail:del']"
            :ref="scope.row.projectId"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.projectId].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.projectId)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del, downloadTProjectDetail } from '@/api/tProjectDetail'
import { parseTime, downloadFile } from '@/utils/index'
import eForm from './form'
export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      delLoading: false
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/tProjectDetail'
      const sort = 'projectId,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      return true
    },
    subDelete(projectId) {
      this.delLoading = true
      del(projectId).then(res => {
        this.delLoading = false
        this.$refs[projectId].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[projectId].doClose()
        console.log(err.response.data.message)
      })
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.form = {
        projectId: data.projectId,
        projectName: data.projectName,
        province: data.province,
        city: data.city,
        address: data.address,
        startTime: data.startTime,
        endTime: data.endTime,
        duration: data.duration,
        budget: data.budget,
        aggregateAmount: data.aggregateAmount,
        subsidyAmount: data.subsidyAmount,
        accountState: data.accountState,
        accountTime: data.accountTime,
        subsidyState: data.subsidyState,
        subsidyName: data.subsidyName,
        createdUser: data.createdUser,
        createdTime: data.createdTime,
        updatedUser: data.updatedUser,
        updatedTime: data.updatedTime,
        state: data.state,
        vaild: data.vaild
      }
      _this.dialog = true
    },
    // 导出
    download() {
      this.beforeInit()
      this.downloadLoading = true
      downloadTProjectDetail(this.params).then(result => {
        downloadFile(result, 'TProjectDetail列表', 'xlsx')
        this.downloadLoading = false
      }).catch(() => {
        this.downloadLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
