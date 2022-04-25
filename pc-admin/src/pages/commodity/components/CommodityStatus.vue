<template>
  <div style="margin-top: 50px">

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="商品名称:"
          label-align-sm="left"
          label-for="name"
          class="input-group-label"
      />
      <b-form-input id="name" placeholder="输入商品名称" class="input-group-content" v-model="saveParam.name"/>
    </b-row>

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="详细名称:"
          label-align-sm="left"
          label-for="detailName"
          class="input-group-label"
      />
      <b-form-input id="detailName" placeholder="输入商品详细名称" class="input-group-content" v-model="saveParam.detailName"/>
    </b-row>

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="上架状态:"
          label-align-sm="left"
          label-for="publishStatusList"
      >
        <b-form-radio-group
            v-model="saveParam.publishStatus"
            :options="publishStatusList"
            id="publishStatusList"
            value-field="id"
            text-field="name"
            class="col-form-label"
        ></b-form-radio-group>
      </b-form-group>
    </b-row>

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="新品状态:"
          label-align-sm="left"
          label-for="newStatusList"
      >
        <b-form-radio-group
            v-model="saveParam.newStatus"
            :options="newStatusList"
            id="newStatusList"
            value-field="id"
            text-field="name"
            class="col-form-label"
        ></b-form-radio-group>
      </b-form-group>
    </b-row>

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="推荐状态:"
          label-align-sm="left"
          label-for="recommendStatusList"
      >
        <b-form-radio-group
            v-model="saveParam.recommendStatus"
            :options="recommendStatusList"
            id="recommendStatusList"
            value-field="id"
            text-field="name"
            class="col-form-label"
        ></b-form-radio-group>
      </b-form-group>
    </b-row>

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="审核状态:"
          label-align-sm="left"
          label-for="verifyStatusList"
      >
        <b-form-radio-group
            v-model="saveParam.verifyStatus"
            :options="verifyStatusList"
            id="verifyStatusList"
            value-field="id"
            text-field="name"
            class="col-form-label"
        ></b-form-radio-group>
      </b-form-group>
    </b-row>

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="排序:"
          label-align-sm="left"
          label-for="sort"
          class="input-group-label"
      >
        <b-form-input id="sort" placeholder="输入商品详细名称" class="w-100"></b-form-input>
      </b-form-group>
    </b-row>

    <b-row style="padding-top: 10px; padding-bottom: 5px">
      <b-form-group
          label-cols-md="auto"
          label="商品介绍:"
          label-align-sm="left"
          label-for="description"
          class="input-group-label"
      />
      <b-form-input id="description" placeholder="请输入内容" class="textarea" type="textarea"/>
    </b-row>

<!--      <el-form-item style="text-align: center">-->
<!--        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>-->
<!--      </el-form-item>-->
  </div>
</template>

<script>

import TreeSelect from '@riophae/vue-treeselect'

import FormWizard from '@/components/step/FormWizard'
import TabContent from '@/components/step/TabContent'
import {getAllParamList} from "@/api/business/CommodityList";

export default {
  name: "CommodityStatus",
  components: {TreeSelect, FormWizard, TabContent},
  props: {
    saveParam: Object
  },
  data() {
    return {
      categories:[],
      publishStatusList:[],
      newStatusList:[],
      recommendStatusList:[],
      verifyStatusList:[]
    };
  },
  created() {
    this.getAllParamList();
  },
  watch: {

  },
  methods: {
    getAllParamList() {
      getAllParamList().then(response => {
        let allParamList = response.data;
        this.categoryList = allParamList.categoryList;
        this.publishStatusList = allParamList.publishStatusList;
        this.newStatusList = allParamList.newStatusList;
        this.recommendStatusList = allParamList.recommendStatusList;
        this.verifyStatusList = allParamList.verifyStatusList;
      })
    }
  }
}
</script>

<!--<style src="../CommodityDetail.scss" lang="scss" scoped />-->
<style src="../../../styles/page-detail.scss" lang="scss" scoped />
