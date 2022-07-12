<script setup>
import { ElCard, ElButton, ElUpload, ElDialog } from "element-plus";
import { ref, reactive } from "vue";
let pictureList = reactive([])
let renderList = reactive([])
let waterfall_box_width = ref(0)
let waterfall_box_height = ref(0)
let waterfall_col_num = ref(0)
let waterfall_col_height_list = reactive(null) //每列最大高度
let img_width = ref(250)
let img_margin_right = ref(20)
let img_margin_bottom = ref(20)
let dialogVisible = ref(false)
let dialogImageUrl = ref('')
</script>
<template>
    <div>
        <el-upload class="upload-demo" drag action="http://hikari.top:8090/upload" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <waterfall id="waterfall_box" :width="itemWidth" :gutterWidth="gutterWidth" :col="col" :data="pictureList">
            <template>
                <div v-for="(pic, idx) in pictureList" class="waterfall_item" :key="pic">
                    <el-card class="imgs">
                        <div style="width: 100%;height: 100%">
                            <img class="images" v-if="pic" :lazy-src="pic" @click="showImg(pic)" />
                            <span>{{ pic }}</span>
                            <el-button size="mini" type="danger" circle @click="deletePic(pic, idx)">
                                <i class="el-icon-delete"></i>
                            </el-button>
                        </div>
                    </el-card>
                </div>
            </template>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </waterfall>
    </div>

</template>

<style scoped lang="less">
  .el-card /deep/ .el-card__body{
    padding: 0;
  }
  #waterfall_box {
    width: 100%;
    position: relative;
    margin: 20px auto;

    .waterfall_item {

      .imgs {
        position: relative;
        margin-bottom: 20px;

        img {
          width: 100%;
        }

        span {
          position: absolute;
          bottom: 0;
          left: 0;
          line-height: 18px;
          font-size: small;
          color: #eee;
          background-color: rgba(0, 0, 0, 0.3);
          visibility: hidden;
        }

        button {
          position: absolute;
          top: 0;
          right: 0;
          visibility: hidden;
        }
      }

    }

    .waterfall_item:hover {
      cursor: pointer;
      overflow: hidden;


      span {
        color: white;
        transition: all .3s;
        visibility: visible;
      }

      button {
        visibility: visible;
      }

      img{
        transform: scale(1.1);
        width: 100%;
        transition: .6s;
      }
    }
  }

</style>