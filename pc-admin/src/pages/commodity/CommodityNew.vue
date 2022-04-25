<template>
  <div class="page-detail">
    <h2 class="page-title">商品 - <span class="fw-semi-bold">详情</span></h2>
    <!--    上面的大表-->
    <b-row>
      <b-col>
          <form-wizard
              @onNextStep="nextStep"
              @onPreviousStep="previousStep"
            >
            <tab-content title="商品状态">
              <commodity-status :saveParam="saveParam" :before-change="fillSaveParam"/>
            </tab-content>
            <tab-content title="商品属性">
              <commodity-attribute/>
            </tab-content>
            <tab-content title="商品详情">
              <commodity-description/>
            </tab-content>
          </form-wizard>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Widget from '@/components/widget/Widget';
import Sparklines from '@/components/sparklines/Sparklines'
import TreeSelect from '@riophae/vue-treeselect'
import FormWizard from '@/components/step/FormWizard'
import TabContent from '@/components/step/TabContent'
import CommodityStatus from './components/CommodityStatus';
import CommodityAttribute from './components/CommodityAttribute'
import CommodityDescription from './components/CommodityDescription'

const defaultSaveParam = {
  name: null,
  detailName: null,
  categoryIdList: [],
  sameCommodityList: [],
  publishStatus: null,
  newStatus: null,
  recommendStatus: null,
  verifyStatus: null,
  description: null,
};

export default {
  name: 'commodity',
  components: { Widget, Sparklines, TreeSelect, FormWizard, TabContent, CommodityStatus, CommodityAttribute, CommodityDescription},
  data() {
    return {
      saveParam: Object.assign({}, defaultSaveParam),
    };
  },
  created() {
  },
  methods: {
    fillSaveParam() {

    },
    nextStep() {

    },
    previousStep() {

    },
    submit() {

    },
    handleNext(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('nextStep');
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration:1000
          });
          return false;
        }
      });
    },
  },
};
</script>

<style src="../../styles/page-detail.scss" lang="scss" scoped />