import { CHANGE_HOMEDATA, FETCH_MYDATA } from '@/store'

export default {
    methods: {
        getBanner() {
            this.$axios({
                url: '/api/banner'
            }).then(res => {
                if (res.code === 0) {
                    if (this.$route.name === 'My') {
                        const data = (res.data || [])
                        this.banner = { ...(data[0] || {}) }
                        this.$store.dispatch({
                            type: CHANGE_HOMEDATA,
                            data
                        })
                    } else {
                        this.banner = res.data || []
                        this.$store.dispatch({
                            type: CHANGE_HOMEDATA,
                            data: this.banner
                        })
                    }
                }
            })
        },
        getTacticList() {
            this.$axios({
                url: '/api/tactics/list',
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const data = res.data || []
                    this.listData = [ ...data ]
                    this.$store.dispatch({
                        type: FETCH_MYDATA,
                        res: {
                            listData: this.listData
                        }
                    })
                }
            })
        }
    }
}