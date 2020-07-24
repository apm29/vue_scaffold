<template>
    <div class="home">
        <v-app-bar color="primary">
            Home
        </v-app-bar>
        <load-more-list @on-load-more="getPagedData" :has-more="pageInfo.hasMore" :loading="pageInfo.loading">
            <v-list>
                <template v-for="(item,index) of pageInfo.data" >
                    <v-list-item :key="index">
                        {{item}}
                    </v-list-item>
                </template>
            </v-list>
        </load-more-list>
        <v-btn fab fixed bottom right color="accent">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
  import { getContentPagedData } from '@/api/users'
  import LoadMoreList from '@/components/list/LoadMoreList'
  const defaultPageSetting = {
    pagenum: 20,
    page: 1,
    app_id: 111111,
    agent_id: 111111,
  }
  const  defaultPageInfo = {
    data: [],
    total: 0,
    hasMore: true,
    loading: false,
  }
  export default {
    name: 'Home',
    components: { LoadMoreList },
    data: function () {
      return {
        pageSetting: defaultPageSetting,
        pageInfo: defaultPageInfo,
      }
    },
    created () {
      this.getPagedData()
    },
    methods: {
      getPagedData: async function (refresh) {
        if (refresh) {
          this.pageSetting = defaultPageSetting
          this.pageInfo = defaultPageInfo
        }
        if(!this.pageInfo.hasMore || this.pageInfo.loading){
          return
        }
        try {
          this.pageInfo.loading = true
          let res = await getContentPagedData({
            url:
              'http://ecmstest.ciih.net/Manager/InformationIssue/informationIssueSearchPage',
            parameters: JSON.stringify(this.pageSetting),
          })
          this.pageInfo.data = res.rows
          this.pageInfo.total = parseInt(res.total)
          this.pageInfo.hasMore = this.pageInfo.total > this.pageInfo.data.length
        } catch (e) {
          console.log(e)
        } finally {
          this.pageInfo.loading = false
        }
      },
    },
  }
</script>
