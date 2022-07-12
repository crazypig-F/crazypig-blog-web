<script setup>
import { ElCard, ElRow, ElCol, ElButton, ElTable, ElTableColumn, ElAvatar } from "element-plus";
import { ref, reactive } from "vue";
let userList = reactive([])
let search = ref("")
</script>

<template>
    <div>
        <el-card shadow="never">
            <el-row :gutter="5">
                <el-col :span="8">
                    <el-input placeholder="请输入用户名或用户昵称" v-model="search"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="searchUser()">查找用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="头像" prop="avatar" min-width="60px">
                    <template slot-scope="scope">
                        <el-avatar :src="scope.row.avatar"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="nickname"></el-table-column>
                <el-table-column label="账号" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email" min-width="100px"></el-table-column>
                <el-table-column label="注册时间" prop="createTime" min-width="100px">
                    <template slot-scope="scope">{{ scope.row.createTime | dataFormat }}</template>
                </el-table-column>
                <el-table-column label="最近登录" prop="loginTime">
                    <template slot-scope="scope">{{ scope.row.lastLoginTime === null ? scope.row.createTime :
                            scope.row.lastLoginTime
                            | dataFormat3
                    }}</template>
                </el-table-column>
                <el-table-column label="地址">
                    <template slot-scope="scope">{{ scope.row.loginProvince + ' ' + scope.row.loginCity }}</template>
                </el-table-column>
                <el-table-column label="管理员" min-width="70px">
                    <template slot-scope="scope">
                        <el-switch active-value="1" inactive-value="0" v-model="scope.row.type"
                            :disabled="userInfo.id == scope.row.id || scope.row.id == 1"
                            @change="userStateChanged(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="60px">
                    <template slot-scope="scope">
                        <el-button size="mini" circle type="danger" icon="el-icon-delete"
                            @click="deleteUser(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

</template>