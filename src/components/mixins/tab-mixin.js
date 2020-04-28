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
        },
        downloadTip() {
            this.$message.info('请长按图片保存到相册')
        },
        downloadQrcode() {
            const qrCode = document.querySelector('#qrCode').children[0]
            const url = qrCode.toDataURL('image/png')
            const filename = `${Date.now()}.png`
            const formData = new FormData()
            formData.append('upload-file', this.dataURLToFile(url, filename))
            this.$axios({
                method: 'POST',
                url: `/upload`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: formData
            }).then(() => {
                this.downLoadImg(`http://2592b637o3.wicp.vip:24681/file/${filename}`)
            })
        },
        // iframe打开图片地址
        downLoadImg(src) {
            // const iframe = document.createElement('iframe')
            // iframe.style.display = 'none'
            // iframe.src = "javascript: '<script>location.href=\"" + src + "\"</script>'"
            // document.getElementsByTagName('body')[0].appendChild(iframe)
            // window.open(src, '_blank')
            // const newWindow = window.open()
            window.location.href = src
        },
        // base64转为Blob类型
        dataURLtoBlob(dataurl) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new Blob([u8arr], { type: mime })
        },
        // base64转为文件
        dataURLToFile(dataurl, filename) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], filename, { type: mime })
        },
        // PC端下载方式
        downloadFile(url, name='What\'s the fuvk') {
            const a = document.createElement('a')
            a.setAttribute('href', url)
            a.setAttribute('download', name)
            a.setAttribute('target', '_blank')
            let clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('click', true, true)
            a.dispatchEvent(clickEvent)
        },
        downloadFileByBase64(base64, name) {
            const myBlob = this.dataURLtoBlob(base64)
            const myUrl = URL.createObjectURL(myBlob)
            this.downloadFile(myUrl, name)
        }
    }
}