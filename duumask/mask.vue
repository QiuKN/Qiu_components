<template>
    <div id="duumask" v-if="showviwer">
        <div class="mask">

        </div>
        <!-- CLOSE -->
        <span class="duu_btn duu_close" @click="hide">
            <i class="el-icon-circle-close"></i>
        </span>
        <span class="duu_btn duu_prev" @click="prev">
            <i class="el-icon-arrow-left"></i>
        </span>
        <span class="duu_btn duu_next" @click="next">
            <i class="el-icon-arrow-right"></i>
        </span>
        <div class="duu_canvas">
            <img
                v-for="(url, i) in urlList"
                v-if="i == urlItem.index"
                class="duu_img"
                :src="currentImg"
            >
        </div>
    </div>
</template>

<script>
    import './mask.less'
    import axios from 'axios'
    export default {
        name: 'duu-mask',
        props: {
            urlList: {
                type: Array,
                default: () => []
            },
            urlItem: {
                type: Object,
                default: () => {}
            },
            urlAll: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                showviwer: false,
                currentImg: '',
                infinite: true,
            }
        },
        mounted() {
        },
        methods: {
            async showbigurl(item) {
                const _this = this
                this.currentImg = require('@/assets/images/status/loading.gif')
                let change = () => {
                    return new Promise(resolve => {
                        axios.get(`${__URL.API_ADDR}aliyun/oss/download/url?type=chat&filename=${item}/1920x1080`)
                        .then(res => {
                            if (res.data.code == 200) {
                                resolve(res.data.data)
                            }
                        })
                    })
                }
                this.currentImg = await change();
            },
            showmask() {
                this.showviwer = true
            },
            hide() {
                this.showviwer = false
            },
            next() {
                const len = this.urlList.length;
                this.urlItem.index = (this.urlItem.index - 1 + len) % len;
                this.showbigurl(this.urlAll[this.urlItem.index]['bigurl'])
            },
            prev() {
                const len = this.urlList.length;
                this.urlItem.index = (this.urlItem.index + 1) % len;
                this.showbigurl(this.urlAll[this.urlItem.index]['bigurl'])
            }
        }
    }
</script>