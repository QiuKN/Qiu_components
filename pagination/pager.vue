<template>
  <div class="pageContainer">
    <ul class="pagesInner clearfix">
      <li class="page other" @click="prevOrNext(-1)"><span class="fa fa-chevron-left" aria-hidden="true"></span></li>
      <li :class="{'active':internalCurrentPage === 1}" class="page" v-if="internalPageCount>6">
        <a :href="`${!internalUrl?'javascript:;':internalUrl+'1'}`">
          1
        </a>
      </li>
      <li 
        v-if="1 !== pages[0] && internalPageCount!==1 && pages[0]-1!==1"
        class="page"
      >...</li>
      <li class="page" 
        v-for="(item, index) in pages" 
        :key="index"
        :class="{'active': item === internalCurrentPage}" 
        >
        <a :href="`${!internalUrl?'javascript:;':internalUrl+item}`" @click.prevent="select(item)">
          {{item}}
        </a>
      </li>
      <li
        v-if="pages[pages.length - 1] !== internalPageCount && internalPageCount!==1 && internalPageCount-pages[pages.length - 1]!==1"
        class="page"
      >...</li>
      <li :class="{'active':internalCurrentPage === internalPageCount}" class="page"  v-if="internalPageCount!==1&&internalPageCount!==pages[pages.length-1]">
        <a :href="`${!internalUrl?'javascript:;':internalUrl+internalPageCount}`">
          {{internalPageCount}}
        </a>
      </li>
      <li class="page other" @click="prevOrNext(1)"><span class="fa fa-chevron-right" aria-hidden="true"></span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DuuPagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentUrl: { //
      type: String,
      default: ''
    }
  },
  data() {
    return {
      internalPageSize: 0,
      internalCurrentPage: 1,
      internalUrl: '',
    }
  },
  computed: {
    internalPageCount() {
      if (typeof this.total === 'number') {
        return Math.max(1, Math.ceil(this.total / this.internalPageSize));
      }
      return null;
    },
    pages() {
      // 中间五个数
      const c = this.internalCurrentPage
      const t = this.internalPageCount
      if (t >= 7) {
        //  页数超过6页
        if (c > 3 && c < t - 3) {
          return [c - 2, c - 1, c, c + 1, c + 2]
        } else if (c <= 3) {
          return [2, 3, 4, 5, 6]
        } else {
          return [t - 5, t - 4, t - 3, t - 2, t - 1]
        }
      } else {
        // 页数少于7页，直接全部渲染出来
        return [1, 2, 3, 4, 5, 6].filter(item => item <= t)
      }
      
    }
  },
  watch: {
    pageSize: {
      immediate: true,
      handler(val) {
        this.internalPageSize = isNaN(val) ? 10 : val;
      }
    },
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = val;
      }
    },
    currentUrl: {
      immediate: true,
      handler(val) {
        this.internalUrl = val
      }
    },
    internalCurrentPage: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:currentPage', newVal);
      }
    },
  },
  methods: {
    select(n) {
        if (n === this.internalCurrentPage) return 
        if (typeof n === 'string') return 
        this.internalCurrentPage = n
        this.emitChange()
    },
    prevOrNext (n) {
      this.internalCurrentPage += n
      this.internalCurrentPage < 1
      ? this.internalCurrentPage = 1
      : this.internalCurrentPage > this.internalPageCount
        ? this.internalCurrentPage = this.internalPageCount
        : null
      this.emitChange()
    },
    emitChange() {
      this.$nextTick(() => {
          this.$emit('current-change', this.internalCurrentPage);
      });
    }
  }
};
</script>

<style lang="less">
  .pageContainer {
    text-align: center;
    >.pagesInner {
        display: inline-block;
      >.page {
        padding: 8px 2px;
        margin: 0 2px;
        float: left;
        border: none;
        &.other {
          padding: 8px 13px;
          color: #606266;
          background: #f4f4f5;
          cursor: pointer;
        }
        >a {
          padding: 8px 13px;
          cursor: pointer;
          background: #f4f4f5;
          color: #606266;
        }
        &.active {
          >a {
            background: #3c8baa;
            color: #fff;
          }
        }
      }
    }
  }
</style>