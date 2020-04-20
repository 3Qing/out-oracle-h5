import axios from 'axios'

const formatUrl = (url) => {
    const api = 'http://2592b637o3.wicp.vip:24681'
    return `${api}${url}`
}

export default (params) => {
    const options = {
        url: formatUrl(params.url),
        method: 'GET'
    }

    // 设置Token
    if (sessionStorage.getItem('TK')) {
        if (options.headers) {
            options.headers['X-Token'] = sessionStorage.getItem('TK')
        } else {
            options.headers = {
                'X-Token': sessionStorage.getItem('TK')
            }
        }
    } else {
        options.headers = {}
    }
    
    const { vm } = params.custom || {}

    if (params.method && params.method.toLocaleUpperCase() === 'POST') {
        options.method = 'POST'
        options.data = params.params || {}
    } else {
        options.params = params.params || {}
    }

    return axios(options).then(res => {
        if (res.status === 200 && res.data) {
            if (res.data.code !== 0) {
                if (res.data.code === 222) {
                    // vm && vm.$message.warning('请重新登录')
                    sessionStorage.removeItem('TK')
                    vm.$router.push({ name: 'Login' })
                } else {
                    vm && vm.$message.warning(res.data.msg)
                }
            }
        } else {
            vm && vm.loading && (vm.loading = false)
            vm && vm.$message.warning('接口开小差了，没有返回信息')
        }
        return res.data
    }).catch(() => {
        vm && vm.$message.warning('接口开小差了，没有返回信息')
    })
}