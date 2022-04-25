<template>
  <div class="list">
    <h2 class="page-title">商品 - <span class="fw-semi-bold">列表</span></h2>
    <b-row>
      <b-col>
        <Widget>
          <div class="search-form-group">
            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="商品名称:"
                  label-align-sm="left"
                  label-for="name"
                  class="input-group-label"
              >
              <b-form-input id="name" placeholder="输入商品名称" />
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="上架状态:"
                  label-align-sm="left"
                  class="input-group-label"
              >
                <tree-select :options="publishStatusList" :auto-load-root-options="false" :multiple="false" placeholder="全部" class="input-group-select"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="新品状态:"
                  label-align-sm="left"
                  class="input-group-label"
              >
                <tree-select :options="newStatusList" :auto-load-root-options="false" :multiple="false" placeholder="全部" class="input-group-select"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="推荐状态:"
                  label-align-sm="left"
                  label-for="isRecommend"
                  class="input-group-label"
              >
                <tree-select :options="recommendStatusList" :auto-load-root-options="false" :multiple="false" placeholder="全部" class="input-group-select"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="审核状态:"
                  label-align-sm="left"
                  label-for="isVerify"
                  class="input-group-label"
              >
                <tree-select :options="verifyStatusList" :auto-load-root-options="false" :multiple="false" placeholder="全部" class="input-group-select"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                label="商品分类:"
                label-align-sm="left"
                label-for="category"
                class="input-group-label"
                >
                <tree-select :options="categoryList" :multiple="true" :flatten-search-results="true" placeholder="全部类别" class="input-group-select"/>
              </b-form-group>
            </div>
          </div>
          <div class="clearfix">
            <div class="float-right">
              <b-button variant="primary" class="mr-3" size="sm" >重置</b-button>
              <b-button variant="info" class="mr-3" size="sm" right>查询</b-button>
              <b-button variant="success" class="mr-3" size="sm" right @click="jumpToCommodityNew">新增商品</b-button>
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
                  <th>商品图片</th>
                  <th>商品名称</th>
                  <th class="hidden-sm-down">分类</th>
                  <th class="hidden-sm-down">SKU库存</th>
                  <th class="hidden-sm-down">销量
                  <th class="hidden-sm-down">上架状态</th>
                  <th class="hidden-sm-down">新品状态</th>
                  <th class="hidden-sm-down">推荐状态</th>
                  <th class="hidden-sm-down">审核状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(commodity, index) in commodityList" :key="commodity.id">
                  <td>
                    <div class="abc-checkbox">
                      <input type="checkbox" :checked="checkboxes[index]"
                             :id="commodity.id"
                             @change="event => changeCheck(event, 'checkboxes', commodity.id)"
                      />
                    </div>
                  </td>
                  <td>
                    <img class="img-rounded" :src="commodity.picture" alt="" height="50" />
                  </td>
                  <td>
                    <span class="text-dark" @click="jumpToCommodityEdit(commodity.id)">{{commodity.name}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{commodity.category}}</span>
                  </td>
                  <td>
                    <span class="text-dark">sku库存</span>
                  </td>
                  <td>
                    <span class="text-dark">{{commodity.stock}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{commodity.publishStatus}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{commodity.newStatus}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{commodity.recommendStatus}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{commodity.verifyStatus}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Vue from 'vue';
import Widget from '@/components/widget/Widget';
import Sparklines from '../../components/sparklines/Sparklines'
import TreeSelect from '@riophae/vue-treeselect'

import {getAllParamList, getCommodityList} from "@/api/business/CommodityList";

const defaultQueryParam = {
  name: null,
  categoryList: [],
  publishStatus: null,
  newStatus: null,
  recommendStatus: null,
  verifyStatus: null,
  pageNum: 1,
  pageSize: 10
};

export default {
  name: 'commodity',
  components: {Widget, Sparklines, TreeSelect},

  data() {
    return {
      queryParam: Object.assign({}, defaultQueryParam),
      categoryList: [],
      publishStatusList: [],
      newStatusList: [],
      recommendStatusList: [],
      verifyStatusList: [],
      checkboxes: [],
      commodityList: []
    };
  },
  created() {
    getAllParamList().then(response => {
      let allParamList = response.data;
      this.categoryList = allParamList.categoryList;
      this.publishStatusList = allParamList.publishStatusList;
      this.newStatusList = allParamList.newStatusList;
      this.recommendStatusList = allParamList.recommendStatusList;
      this.verifyStatusList = allParamList.verifyStatusList;
    })
    this.search()
  },
  methods: {
    // parseDate(date) {
    //   const dateSet = date.toDateString().split(' ');
    //   return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
    // },

    jumpToCommodityNew() {
      this.$router.push({path: '/app/commodity/new'});
    },
    jumpToCommodityEdit() {
      this.$router.push({path: '/app/commodity/edit', query:{id:id}});
    },
    checkAll(ev, checkbox) {
      const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
      console.log("ev.target.checked: " + ev.target.checked);
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, checkbox, id) {
      this[checkbox][id] = ev.target.checked;
      if (!ev.target.checked) {
        this[checkbox][0] = false;
      }
    },
    search() {
      this.listLoading = true;
      getCommodityList(this.queryParam).then(response => {
        // console.log(response.data);
        this.listLoading = false;
        this.commodityList = response.data.list;
        this.pageSize = response.data.pageSize;
        this.total = response.data.total;
        this.pageNum = response.data.pageNum;
      });
    }
  }
}

</script>

<style src="../../styles/list.scss" lang="scss" scoped />
