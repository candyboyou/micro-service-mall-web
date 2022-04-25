<template>
  <div class="attribute">
    <h2 class="page-title">属性 - <span class="fw-semi-bold">列表</span></h2>
    <b-row>
      <b-col>
        <Widget>
          <b-row style="padding-top: 5px; padding-bottom: 5px">

            <b-form-group
                label-cols-md="auto"
                label="属性名称:"
                label-align-sm="left"
                label-for="name"
                class="input-group-label"
            >
              <b-form-input id="name" placeholder="输入属性名称" class="w-100" v-model="queryParam.name"></b-form-input>
            </b-form-group>

            <b-form-group
                label-cols-md="auto"
                label="是否销售属性:"
                label-align-sm="left"
                label-for="selectTypeList"
                class="input-group-label"
            >
              <tree-select
                  :options="isSaleList"
                  :auto-load-root-options="false"
                  :multiple="false"
                  placeholder="全部"
                  class="input-group-select"
                  v-model="queryParam.isSale"/>
            </b-form-group>

          </b-row>

          <div class="clearfix">
            <div class="float-right">
              <b-button variant="primary" class="mr-3" size="sm" >重置</b-button>
              <b-button variant="info" class="mr-3" size="sm" right @click="search">查询</b-button>
              <b-button variant="success" class="mr-3" size="sm" right @click="showAttributeDetail">新增属性</b-button>
              <b-button variant="danger" class="mr-3" size="sm" right>批量删除</b-button>
            </div>
          </div>

        </Widget>
        <Widget>
          <div class="table-resposive">
            <table class="table">
              <thead>
              <tr>
                <th>
                  <div class="abc-checkbox">
                    <input type="checkbox"
                           id="checkboxes" :checked="checkboxes[0]"
                           @change="event => checkAll(event, 'checkboxes')"
                    />
                    <label for="checkboxes" />
                  </div>
                </th>
                <th>属性名称</th>
                <th class="hidden-sm-down">是否销售属性</th>
                <th class="hidden-sm-down">录入方式</th>
                <th class="hidden-sm-down">启用状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(attribute, index) in attributes" :key="index">
                <td>
                  <div class="abc-checkbox">
                    <input type="checkbox" :checked="checkboxes[index]"
                           :id="attribute.id"
                           @change="event => changeCheck(event, 'checkboxes', attribute.id)"
                    />
                    <label :for="attribute.id" />
                  </div>
                </td>
                <td>
                  <a class="text-dark" @click="showAttributeEdit(attribute.id)">{{attribute.name}}</a>
                </td>
                <td>
                  <span class="text-dark">{{attribute.isSale}}</span>
                </td>
                <td>
                  <span class="text-dark">{{attribute.inputType}}</span>
                </td>
                <td>
                  <span class="text-dark">{{attribute.isValid}}</span>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="clearfix">
              <div class="float-right">
                <b-pagination
                    v-model="queryParam.pageNum"
                    :total-rows="total"
                    :per-page="queryParam.pageSize"
                    first-text="<<"
                    prev-text="<"
                    next-text=">"
                    last-text=">>"
                    @change="search"
                    @input="search"
                ></b-pagination>
              </div>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>

    <attribute-new/>

    <attribute-edit/>

  </div>
</template>
<script>

import Vue from "vue";
import Widget from '@/components/widget/Widget';
import Sparklines from '../../components/sparklines/Sparklines'
import TreeSelect from '@riophae/vue-treeselect'

import AttributeNew from './AttributeNew'
import AttributeEdit from './AttributeEdit'

import {getAllList, getAttributeList} from "@/api/business/AttributeList";

const defaultQueryParam = {
  name: null,
  isSale: null,
  pageNum: 1,
  pageSize: 10
};

export default {
  name: 'attributes',
  components: {Widget, Sparklines, TreeSelect, AttributeNew, AttributeEdit},
  data() {
    return {
      queryParam: Object.assign({}, defaultQueryParam),
      attributes:[],
      isSaleList:[],
      typeList:[],
      total: null,
      checkboxes: []
    }
  },
  created() {
    getAllList().then(response => {
      let allList = response.data;
      this.isSaleList = this.changeDepsDataName(allList.isSaleList);
    })
    this.search()
  },
  methods: {
    checkAll(ev, checkbox) {
      const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, checkbox, id) {
      // console.log("index : " + id);
      // console.log("ev.target.checked : " + ev.target.checked);
      this[checkbox][id] = ev.target.checked;
      console.log(id);
      if (!ev.target.checked) {
        this[checkbox][0] = false;
      }
    },
    changeDepsDataName(dataArr) {
      let tempArr=[]
      for(let i=0;i<dataArr.length;i++){
        let obj={}
        obj.id = dataArr[i].id
        obj.label = dataArr[i].name
        tempArr.push(obj)
      }
      return tempArr;
    },
    search(){
      getAttributeList(this.queryParam).then(response => {
        if (response.data.list === null) {
          return;
        }
        this.attributes = response.data.list;
        this.pageSize = response.data.pageSize;
        this.total = response.data.total;
        this.pageNum = response.data.pageNum;
      })
    },
    showAttributeDetail() {
      this.$modal.show('attributeDetail')
    },
    showAttributeEdit(id) {
      this.$modal.show('attributeEdit', {id: id})

    }
  }
}
</script>

<style src="./Attribute.scss" lang="scss" scoped />

