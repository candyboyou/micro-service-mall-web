<template>
  <div style="margin-top: 50px">

    <b-form-group
        label-cols-md="auto"
        label="商品分类:"
        label-align-sm="left"
        label-for="isRecommend"
        class="input-group-label"
    >
      <treeselect :options="isRecommendList" :auto-load-root-options="false" :multiple="false" class="input-group-select"/>
    </b-form-group>

    <b-form-group
        label-cols-md="auto"
        label="商品属性:"
        label-align-sm="left"
        label-for="isVerify"
        class="input-group-label"
    >
      <treeselect :options="isVerifyList" :auto-load-root-options="false" :multiple="false" class="input-group-select"/>
    </b-form-group>

    <b-form-group
        label-cols-md="auto"
        label="排序:"
        label-align-sm="left"
        label-for="sort"
        class="input-group-label"
    >
      <b-form-input id="sort" placeholder="输入商品详细名称" class="w-100"></b-form-input>
    </b-form-group>

    <!--      <el-form-item style="text-align: center">-->
    <!--        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>-->
    <!--      </el-form-item>-->
  </div>
</template>

<script>

import TreeSelect from '@riophae/vue-treeselect'

import FormWizard from '@/components/step/FormWizard'
import TabContent from '@/components/step/TabContent'

export default {
  name: "CommodityAttribute",
  components: {TreeSelect, FormWizard, TabContent},
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        detailName: [{required: true, message: '请输入商品详细标题', trigger: 'blur'}],
        description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
        requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}],
      },
      categories:[],
      isPublishList:[],
      isNewList:[],
      isRecommendList:[],
      isVerifyList:[]
    };
  },
  created() {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>
