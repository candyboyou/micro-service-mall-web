<template>
  <modal
      name="attributeEdit"
      width="45%"
      height="auto"
      @before-open="beforeOpen"
      @before-close="beforeClose"
  >
    <b-col class="attribute" style="padding-top: 50px; padding-bottom: 50px" :rules="rules">
      <h4 class="page-title" style="padding-left: 30px">属性 - <span class="fw-semi-bold">编辑</span></h4>
      <hr/>

      <b-row style="padding-left: 30px">
        <b-form-group
            label-cols-md="auto"
            label="属性名称:"
            label-align-sm="left"
            label-for="name"
        >
          <b-form-input id="name" placeholder="输入属性名称" class="w-100" v-model="saveParam.name"></b-form-input>
        </b-form-group>
      </b-row>

      <b-row style="padding-left: 30px; padding-bottom: 5px">
        <b-form-group
            label-cols-md="auto"
            label="属性录入方式:"
            label-align-sm="left"
            label-for="inputTypeList"
        >
          <b-form-radio-group
              v-model="saveParam.inputType"
              :options="inputTypeList"
              id="inputTypeList"
              value-field="id"
              text-field="name"
              class="col-form-label"
              @change="showOptionsOfAttr"
          ></b-form-radio-group>
        </b-form-group>

        <div v-show="isShowOptionsOfAttr" class="row" style="padding-left: 5%; height: 34px" >
          <b-form-input placeholder="输入属性值" class="w-50" style="margin-right: 10px;" v-model="newAttributeValue"></b-form-input>
          <b-button variant="primary" size="sm" pill @click="addAttributeValue" >新增属性值</b-button>
        </div>
      </b-row>

      <div v-show="isShowOptionsOfAttr" class="optionsOfAttr">
        <div v-for="(value, index) in saveParam.valuesOfAttribute" style="display: inline-block" class="singleOption" :key="index">
          <div class="internalOfSingleOption">
            {{value}}
            <span class="close" @click="clearValue(index)"></span>
          </div>
        </div>
      </div>

      <b-row style="padding-left: 30px; padding-bottom: 5px">
        <b-form-group
            label-cols-md="auto"
            label="销售属性:"
            label-align-sm="left"
            label-for="isSaleList"
        >
          <b-form-radio-group
              v-model="saveParam.isSale"
              :options="isSaleList"
              id="isSaleList"
              value-field="id"
              text-field="name"
              class="col-form-label"
              @change="changeIsShowSelectType"
          ></b-form-radio-group>
        </b-form-group>

        <b-form-group
            label-cols-md="auto"
            label="选择类型:"
            label-align-sm="left"
            label-for="selectTypeList"
            v-show="isShowSelectType"
            style="padding-left: 15%"
        >
          <b-form-radio-group
              v-model="saveParam.selectType"
              :options="selectTypeList"
              id="selectTypeList"
              value-field="id"
              text-field="name"
              class="col-form-label"
          ></b-form-radio-group>
        </b-form-group>
      </b-row>

      <b-row style="padding-left: 30px; padding-bottom: 5px">
        <b-form-group
            label-cols-md="auto"
            label="检索类型:"
            label-align-sm="left"
            label-for="isShowList"
        >
          <b-form-radio-group
              v-model="saveParam.searchType"
              :options="searchTypeList"
              class="col-form-label"
              value-field="id"
              text-field="name"
          ></b-form-radio-group>
        </b-form-group>
      </b-row>

      <b-row style="padding-left: 30px; padding-bottom: 5px">
        <b-form-group
            label-cols-md="auto"
            label="启用状态:"
            label-align-sm="left"
            label-for="isShowList"
        >
          <b-form-radio-group
              v-model="saveParam.isValid"
              :options="isValidList"
              class="col-form-label"
              value-field="id"
              text-field="name"
          ></b-form-radio-group>
        </b-form-group>
      </b-row>

      <div class="clearfix">
        <div class="float-xl-right">
          <b-button variant="info" class="mr-3" size="sm" right @click="save">修改</b-button>
          <b-button variant="success" class="mr-3" size="sm" right @click="back">返回</b-button>
        </div>
      </div>
    </b-col>
  </modal>
</template>

<script>

import {getAllList, getAttributeDetailById, saveOrUpdateAttribute} from "@/api/business/AttributeDetail";

const defaultSaveParam = {
  id: null,
  name: null,
  inputType: null,
  isSale: null,
  selectType: null,
  valuesOfAttribute: [],
  searchType: null,
  isValid: null
}

export default {
  name: 'attributeEdit',
  data() {
    return {
      saveParam: Object.assign({}, defaultSaveParam),
      inputTypeList:[],
      isSaleList:[],
      selectTypeList:[],
      searchTypeList:[],
      isValidList:[],
      isShowOptionsOfAttr: false,
      isShowSelectType: false,
      valuesOfAttribute:[],
      newAttributeValue: null,
      rules:{
        name: [
          {required: true, message: '请输入属性名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        inputType: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
        isSale: [{required: true, message: '请选择属性的销售属性', trigger: 'blur'}],
        selectType: [{required: true, message: '请选择属性的选择类型', trigger: 'blur'}],
        searchType: [{required: true, message: '请输入属性的搜索类型', trigger: 'blur'}]
      }
    }
  },
  created() {
    getAllList().then(response => {
      let allList = response.data
      this.inputTypeList = allList.inputTypeList
      this.isSaleList = allList.isSaleList
      this.selectTypeList = allList.selectTypeList
      this.searchTypeList = allList.searchTypeList
      this.isValidList = allList.isValidList
      this.valuesOfAttribute = allList.valuesOfAttribute
    })
  },
  methods: {
    beforeOpen(event) {
      console.log("23232")

      let params = event.params;
      if (params === null) {
        return;
      }
      let id = params.id;
      if (id === null) {
        return;
      }
      getAttributeDetailById({attributeId:id}).then(response => {
        let data = response.data;
        let saveParam = this.saveParam;
        saveParam.id = data.id;
        saveParam.name = data.name;
        saveParam.inputType = data.inputType;
        saveParam.isSale = data.isSale;
        saveParam.selectType = data.selectType;
        saveParam.valuesOfAttribute = data.valuesOfAttribute;
        saveParam.searchType = data.searchType;
        saveParam.isValid = data.isValid;
        console.log("saveParam.isSale" + saveParam.isSale)
      })
    },
    beforeClose() {
    },
    changeIsShowSelectType() {
      if (this.saveParam.isSale === '1') {
        this.isShowSelectType = true;
      } else {
        this.isShowSelectType = false;
      }
    },
    showOptionsOfAttr() {
      if (this.saveParam.inputType === '1') {
        this.isShowOptionsOfAttr = true;
      } else {
        this.isShowOptionsOfAttr = false;
      }
    },
    addAttributeValue() {
      if (this.newAttributeValue == null || this.newAttributeValue === '') {
        this.makeToast('danger', '属性值不能为空！');
        return;
      }
      if (this.saveParam.valuesOfAttribute !== undefined && this.saveParam.valuesOfAttribute.indexOf(this.newAttributeValue) !== -1) {
        this.makeToast('danger', '属性值不能重复！');
        return;
      }
      this.saveParam.valuesOfAttribute.push(this.newAttributeValue);
      this.newAttributeValue = null;
    },
    clearValue(index) {
      this.saveParam.valuesOfAttribute.splice(index, 1);
    },
    save() {
      console.log(this.saveParam);
      saveOrUpdateAttribute(this.saveParam).then(response => {
        if (response.code === 200) {
          this.makeToast('info', '提交成功！');
        } else {
          this.makeToast('danger', response.message);
        }
      }).catch(error => {
        this.makeToast('danger', error + '提交失败！');
      })
    },
    makeToast(title, message) {
      this.$bvToast.toast(message, {
        title: `info`,
        variant: title,
        solid: false
      })
    },
    back() {
      console.log('closed', event)
      this.$modal.hide('attributeEdit');
    }
  }
}

</script>

<style src="./Attribute.scss" lang="scss" scoped />