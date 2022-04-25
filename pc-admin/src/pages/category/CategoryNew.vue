<template>
  <div class="page-detail">
    <h2 class="page-title">分类 - <span class="fw-semi-bold">新增</span></h2>
    <!--    上面的大表-->
    <b-row>
      <b-col>
        <Widget>
          <b-row style="padding-top: 10px; padding-bottom: 5px">
            <b-form-group
              label-cols-md="auto"
              label="分类名称:"
              label-align-sm="left"
              label-for="name"
              class="input-group-label"
            />
            <b-form-input id="name" placeholder="输入分类名称" class="input-group-content" v-model="name"/>
          </b-row>

          <b-row style="padding-top: 10px; padding-bottom: 5px">
            <b-form-group
              label-cols-md="auto"
              label="分类级别:"
              label-align-sm="left"
              label-for="levelList"
              class="input-group-label"
            />
            <tree-select
              :options="levelList"
              :auto-load-root-options="false"
              :multiple="false"
              placeholder="全部"
              class="input-group-select"
              v-model="saveParam.level"
              @select="getParentListByLevel"
              />

            <b-form-group
              label-cols-md="auto"
              label="上级分类:"
              label-align-sm="left"
              label-for="name"
              class="input-group-label"
            />
            <tree-select
              :options="parentList"
              :auto-load-root-options="false"
              :multiple="false"
              placeholder="上级分类不存在"
              class="input-group-select"
              v-model="saveParam.parentId"
              @select="getSubCategoryListByNode"
            />
          </b-row>

          <div>
            <draggable class="options sub-option-draggable" v-model="saveParam.sameLevelCategoryList" animation="300" role="group" :move="sort">
              <div class="single-option" v-for="category in saveParam.sameLevelCategoryList" :key="category.id">
                <div class="internal-single-option " >
                  {{category.label}}
                </div>
              </div>
            </draggable>
          </div>

          <b-row style="padding-top: 10px; padding-bottom: 5px">
            <b-form-group
              label-cols-md="auto"
              label="分类同级中的排序:"
              label-align-sm="left"
              label-for="sort"
              class="input-group-label"
            >
              <div style="margin-top: 3px">{{saveParam.sort}}</div>
            </b-form-group>
          </b-row>

          <b-row style="padding-top: 10px; padding-bottom: 5px">
            <b-form-group
              label-cols-md="auto"
              label="是否启用:"
              label-align-sm="left"
              label-for="isShowList"
              class="input-group-label"
            />
            <tree-select
              :options="isShowList"
              :auto-load-root-options="false"
              :multiple="false"
              placeholder=""
              class="input-group-select"
              v-model="saveParam.isShow"/>
          </b-row>

          <b-row style="padding-top: 5px; padding-bottom: 5px">

            <b-form-group
              label-cols-md="auto"
              label="分类位置:"
              label-align-sm="left"
              label-for="placeList"
              class="input-group-label"/>
            <tree-select
              :options="placeList"
              :auto-load-root-options="false"
              :multiple="false"
              placeholder=""
              class="input-group-select"
              v-model="saveParam.place"/>
          </b-row>

          <b-row style="padding-top: 10px; padding-bottom: 5px">
            <b-form-group
                label-cols-md="auto"
                label="分类图标:"
                label-align-sm="left"
                label-for="icon"
                class="input-group-label"
            />
            <b-form-file v-model="tempIconUrl" class="upload-button" plain></b-form-file>
          </b-row>

          <b-row style="padding-top: 10px; padding-bottom: 5px; " class="row">
            <b-form-group
              label-cols-md="auto"
              label="分类属性:"
              label-align-sm="left"
              label-for="attributeList"
              class="input-group-label"
            />
            <tree-select
              :options="notRelationAttributes"
              :auto-load-root-options="false"
              :multiple="true"
              placeholder="请选择"
              class="input-group-select"
              v-model="tempNewAttributes"
            />
            <b-button variant="primary" size="sm" pill @click="addNewAttribute" class="add-option-button">新增属性</b-button>
          </b-row>

          <div class="options">
            <div v-if="saveParam.relationAttributes.length === 0">
              <div class="placeholder-options">分类属性空</div>
            </div>
            <div v-for="(attribute, index) in saveParam.relationAttributes" style="display: inline-block" class="single-option" :key="index">
              <div class="internal-single-option">
                {{attribute.label}}
              </div>
            </div>
          </div>

          <b-row style="padding-top: 10px; padding-bottom: 5px">
            <b-form-group
              label-cols-md="auto"
              label="关键词:"
              label-align-sm="left"
              label-for="keyWord"
              class="input-group-label"
            />
            <b-form-input id="keyWord" placeholder="输入分类关键词" class="input-group-content" v-model="newKeyWord"/>
            <b-button variant="primary" size="sm" pill @click="addKeyWords" class="add-option-button">新增关键字</b-button>
          </b-row>

          <div class="options">
            <div v-if="saveParam.keyWords.length === 0">
              <div class="placeholder-options">分类的关键字为空</div>
            </div>
            <div v-for="(value, index) in saveParam.keyWords" style="display: inline-block" class="single-option" :key="index">
              <div class="internal-single-option">
                {{value}}
                <span class="close" @click="deleteKeyWords(index)"></span>
              </div>
            </div>
          </div>

          <b-row style="padding-top: 10px; padding-bottom: 5px">
            <b-form-group
                label-cols-md="auto"
                label="分类描述:"
                label-align-sm="left"
                label-for="description"
                class="input-group-label"
            />
            <b-form-textarea id="description" placeholder="输入分类描述" class="textarea" v-model="saveParam.description" />
          </b-row>
          <div class="clearfix">
            <div class="float-xl-right">
              <b-button variant="info" class="mr-3" size="sm" right @click="checkAndSave">提交</b-button>
              <b-button variant="success" class="mr-3" size="sm" right @click="back">返回</b-button>
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
import draggable from 'vuedraggable'

import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import {getAllList} from '@/api/business/CategoryList'
import {
  getCategoryListByLevel,
  getParentCategoryListByLevel,
  getSubCategoryListById,
  getAllAttributes,
  save
} from '@/api/business/CategoryDetail'

const defaultSaveParam = {
  name: null,
  parentId: null,
  level: null,
  sort: null,
  isShow: null,
  place: null,
  sameLevelCategoryList: [],
  iconUrl: null,
  relationAttributes: [],
  keyWords: [],
  description: null
};

let notRelationAttributesMap = new Map();

export default {
  name: 'categoryDetail',
  components: { Widget, Sparklines, TreeSelect, draggable},
  data() {
    return {
      saveParam: Object.assign({}, defaultSaveParam),
      levelList:[],
      isShowList:[],
      placeList:[],
      parentList:[],
      categoryList:[],
      notRelationAttributes:[],
      oldRelationAttributes:[],
      newAttributes:[],
      tempNewAttributes:[],
      tempNewAttributeLength: 0,
      tempIconUrl: null,
      newKeyWord: null,
      name:null
    };
  },
  created() {
    getAllList().then(response => {
      let allList = response.data;
      this.levelList = allList.levelList;
      this.isShowList = allList.isShowList;
      this.placeList = allList.placeList;
    });
    this.getAllAttributes();
  },
  watch: {
    tempNewAttributes(newValue) {
      if (newValue != null && newValue.length > 0) {
        this.fillNewAttribute(newValue);
        if (newValue.length < this.tempNewAttributeLength) {
          this.addNewAttribute()
        }
        this.tempNewAttributeLength = newValue.length;
      } else {
        this.newAttributes = [];
        this.addNewAttribute();
      }
    },
    name(newName) {
      this.saveParam.name = newName;
      let sameLevelCategoryList = this.saveParam.sameLevelCategoryList;
      for (let i in sameLevelCategoryList)  {
        let curCategory = sameLevelCategoryList[i];
        if (curCategory.id === "-1") {
          if (newName === "") {
            sameLevelCategoryList.splice(i,1);
            return;
          }
          curCategory.label = newName;
          return;
        }
      }
      let newCategory = {}
      newCategory.id = "-1";
      newCategory.label = newName;
      sameLevelCategoryList.push(newCategory);
    },

  },
  methods: {
    getParentListByLevel(node) {
      this.getParentCategoryListByLevel(node.id);
    },
    getParentCategoryListByLevel(id) {
      getParentCategoryListByLevel({level: id}).then(response => {
        this.parentList = response.data;
        if (this.parentList === null || this.parentList === undefined || this.parentList.length === 0) {
          this.getSameCategoryListByLevel(id);
        }
      })
    },
    getSameCategoryListByLevel(id) {
      getCategoryListByLevel({level: id}).then(response => {
        this.saveParam.sameLevelCategoryList = response.data;
        this.fillCategoryName(this.saveParam.sameLevelCategoryList);
      })
    },
    getSubCategoryListByNode(node) {
      this.getSubCategoryListById(node.id);
    },
    getSubCategoryListById(id) {
      this.saveParam.sameLevelCategoryList = [];
      getSubCategoryListById({id: id}).then(response => {
        this.saveParam.sameLevelCategoryList = response.data;
        this.fillCategoryName(this.saveParam.sameLevelCategoryList);
      })
    },
    fillCategoryName() {
      if (this.name !== null && this.name !== "") {
        let newCategory = {};
        newCategory.id = "-1";
        newCategory.label = this.name;
        this.saveParam.sameLevelCategoryList.push(newCategory);
      }
    },
    sort(e) {
      let draggedContext = e.draggedContext;
      let element = draggedContext.element;
      if (element.label === this.name) {
        this.saveParam.sort = draggedContext.futureIndex;
      }
    },
    getAllAttributes() {
      getAllAttributes().then(response => {
        this.notRelationAttributes = response.data;
        this.fillAttributeIdToNameMap();
      })
    },
    fillAttributeIdToNameMap() {
      // 将一维数组转为二维数组，然后转为map
      if (this.notRelationAttributes !== 0) {
        notRelationAttributesMap = new Map(this.notRelationAttributes.map(attribute => [attribute.id, attribute.label]));
      }
    },
    fillNewAttribute(newValue) {
      this.newAttributes = [];
      for (let key of newValue) {
        let obj = {}
        obj.id = key;
        obj.label = notRelationAttributesMap.get(key.toString());
        this.newAttributes.push(obj);
      }
    },
    addNewAttribute() {
      this.saveParam.relationAttributes = this.oldRelationAttributes.concat(this.newAttributes);
    },
    addKeyWords() {
      this.saveParam.keyWords.push(this.newKeyWord);
    },
    deleteKeyWords(index) {
      this.saveParam.keyWords.splice(index, 1);
    },
    checkAndSave() {
      let saveParam = this.saveParam;
      console.log(saveParam);
      if (saveParam.name === null) {
        this.makeToast('注意⚠️', '分类名称不能为空！');
        return;
      }
      if (saveParam.level === null) {
        this.makeToast('注意⚠️', '分类级别不能为空！');
        return;
      }
      if (saveParam.level !== "0" && saveParam.parentId === null) {
        this.makeToast('注意⚠️', '当分类不为一级分类时，父级分类不能为空！');
        return;
      }
      if (saveParam.relationAttributes === null || saveParam.relationAttributes.length === 0) {
        this.makeToast('注意⚠️', '分类关联属性不能为空！');
        return;
      }
      this.save(saveParam);
    },
    save() {
      if (this.saveParam.parentId === null) {
        this.saveParam.parentId = 0;
      }
      save(this.saveParam).then(response => {
        if (response.code === 200) {
          this.makeToast('info', '保存成功')
          location.reload();
        } else {
          this.makeToast('danger', response.message);
        }
      }).catch(error => {
        this.makeToast('danger', error + '保存失败！');
      })
    },
    back() {
      this.$router.push({path: '/app/category/list'});
    },
    makeToast(title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: title,
        solid: false
      })
    },
  }
};
</script>

<style src="../../styles/page-detail.scss" lang="scss" scoped />
