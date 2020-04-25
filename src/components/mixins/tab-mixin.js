import { CHANGE_HOMEDATA, FETCH_MYDATA } from '@/store'
import moment from 'moment'

export default {
    data() {
        return {
            incomeData: {
                total: 0,
                today: 0,
                yesterday: 0,
                years: 0
            },
            listData: []
        }
    },
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
        getTacticList(cb) {
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
                    cb && cb()
                }
            })
        },
        getIncomeData(cb) {
            const sdate = moment(new Date('2020-04-18')).format('YYYY-MM-DD')
            const edate = moment(new Date()).format('YYYY-MM-DD')
            this.$axios({
                method: 'POST',
                url: '/api/order/income',
                params: {
                    sdate,
                    edate
                },
                custom: {
                    vm: this
                }
            }).then(res => {
                if (res.code === 0) {
                    const yesterday = Date.now() - 1000 * 3600 * 24
                    const data = res.data || {}
                    let total = 0
                    let incomeData = {}
                    let result = 0
                    data.forEach(item => {
                        total += Number(item.gain)
                        if (item.date === edate) {
                            incomeData.today = parseInt(item.gain)
                        } else if (item.date === moment(yesterday).format('YYYY-MM-DD')) {
                            incomeData.yesterday = parseInt(item.gain)
                        }
                        if (item.capital) {
                            result += (Number(item.gain) / Number(item.capital)) / 1
                        } else {
                            result += 0
                        }
                    })
                    incomeData.years = Number(Number((result / data.length) * 365 * 0.1).toFixed(2))
                    incomeData.total = parseInt(total)
                    this.incomeData = { ...incomeData }
                    cb && cb()
                }
            })
        }
    }
}