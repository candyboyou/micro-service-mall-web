<template>
  <div class="list">
    <h2 class="page-title">分类 - <span class="fw-semi-bold">列表</span></h2>
    <b-row>
      <b-col>
        <Widget>
          <div class="search-form-group">
            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="分类名称:"
                  label-align-sm="left"
                  label-for="name"
                  class="input-group-label"
              >
              <b-form-input id="name" placeholder="输入分类名称"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="父级分类名称:"
                  label-align-sm="left"
                  label-for="parentName"
                  class="input-group-label"
              >
              <b-form-input id="parentName" placeholder="输入分类名称"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="分类级别:"
                  label-align-sm="left"
                  label-for="levelList"
                  class="input-group-label"
              >
              <tree-select
                  :options="levelList"
                  :auto-load-root-options="false"
                  :multiple="false"
                  placeholder="全部"
                v-model="listQuery.level"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="启用状态:"
                  label-align-sm="left"
                  label-for="isShowList"
                  class="input-group-label"
              >
              <tree-select
                  :options="isShowList"
                  :auto-load-root-options="false"
                  :multiple="false"
                  placeholder="全部"
                  v-model="listQuery.isShow"/>
              </b-form-group>
            </div>

            <div class="single-form-group">
              <b-form-group
                  label-cols-md="auto"
                  label="分类位置:"
                  label-align-sm="left"
                  label-for="typeList"
                  class="input-group-label"
              >
              <tree-select
                  :options="typeList"
                  :auto-load-root-options="false"
                  :multiple="false"
                  placeholder="全部"
                  v-model="listQuery.type"/>
              </b-form-group>
            </div>

          </div>
          <div class="clearfix">
            <div class="float-right">
              <b-button variant="primary" class="mr-3" size="sm" >重置</b-button>
              <b-button variant="info" class="mr-3" size="sm" right @click="search">查询</b-button>
              <b-button variant="success" class="mr-3" size="sm" right @click="jumpToCategoryNew">新增分类</b-button>
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
                <th>编号</th>
                <th>分类名称</th>
                <th class="hidden-sm-down">父级分类</th>
                <th class="hidden-sm-down">分类级别</th>
                <th class="hidden-sm-down">分类位置</th>
                <th class="hidden-sm-down">显示状态</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(category, index) in categories" :key="index">
                  <td>
                    <div class="abc-checkbox">
                      <input type="checkbox" :checked="checkboxes[index]"
                            :id="category.id"
                             @change="event => changeCheck(event, 'checkboxes', category.categoryId)"
                      />
                      <label :for="category.id" />
                    </div>
                  </td>
                  <td>
                    <span class="text-dark">{{index}}</span>
                  </td>
                  <td>
                    <a class="text-dark" @click="jumpToCategoryEdit(category.id)">{{category.name}}</a>
                  </td>
                  <td>
                    <span class="text-dark">{{category.parentName}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{category.level}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{category.place}}</span>
                  </td>
                  <td>
                    <span class="text-dark">{{category.showStatus}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="clearfix">
              <div class="float-right">
                <b-pagination
                    v-model="listQuery.pageNum"
                    :total-rows="total"
                    :per-page="listQuery.pageSize"
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
  </div>
</template>
<script>

import Widget from '@/components/widget/Widget';
import Sparklines from '@/components/sparklines/Sparklines'
import TreeSelect from '@riophae/vue-treeselect'
import Vue from "vue";

import {getAllList, getCategoryList} from "@/api/business/CategoryList";

const defaultListQuery = {
  name: null,
  parentId: null,
  level: null,
  isShow: null,
  type: null,
  pageNum: 1,
  pageSize: 10
};

export default {
  name: 'categoryList',
  components: {Widget, Sparklines, TreeSelect},
  data() {
    return {
      productParam: Object.assign({}, defaultListQuery),
      listQuery: Object.assign({}, defaultListQuery),
      categories:[],
      levelList:[],
      isShowList:[],
      typeList:[],
      total: null,
      checkboxes: []
    };
  },
  created() {
    getAllList().then(response => {
      let allList = response.data;
      this.levelList = allList.levelList;
      this.isShowList = allList.isShowList;
      this.typeList = allList.typeList;
    })
    this.search();
  },
  methods: {
    search(){
      getCategoryList(this.listQuery).then(response => {
        this.categories = response.data.list;
        this.pageSize = response.data.pageSize;
        this.total = response.data.total;
        this.pageNum = response.data.pageNum;
      })
    },
    jumpToCategoryEdit(id) {
      this.$router.push({path: '/app/category/edit', query:{id:id}});
    },
    jumpToCategoryNew() {
      this.$router.push({path: '/app/category/new'});
    },
    checkAll(ev, checkbox) {
      const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, checkbox, id) {
      this[checkbox][id] = ev.target.checked;
      if (!ev.target.checked) {
        this[checkbox][0] = false;
      }
    }
  }
}
</script>

<style src="../../styles/list.scss" lang="scss" scoped />

