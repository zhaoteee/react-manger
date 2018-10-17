import Jsonp from 'jsonp'
import { Modal } from 'antd'
import axios from 'axios'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            Jsonp(options.url, {
                param: 'callback'
            }, function (err, res) {
                if(res) {
                    resolve(res)
                }
            })
        })
    }
    static ajax(options) {
        let base_url = 'https://www.easy-mock.com/mock/5ad430cacdecd20f040889cd/htgl'
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        return new Promise((resolve, reject)=>{
            axios({
                url: options.url,
                method: 'get',
                baseURL: base_url,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(res=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                }
                if(res.status == 200) {
                    if(res.data.code == 0) {
                        resolve(res.data)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.data.message
                        })
                    }
                } else {
                    reject(res.data)
                }
            })
        });
    }
}
