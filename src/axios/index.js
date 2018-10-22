import Jsonp from 'jsonp'
import { Modal } from 'antd'
import axios from 'axios'
import utils from '../util/util'
export default class Axios {
    static requestList(_this,url, params) {
        var data = {
            params: params
        }
        this.ajax({
            url,
            data
        }).then(data=>{
            if(data && data.result) {
                let list = data.result.item_list.map((item, index)=>{
                    item.key = index;
                    return item
                })
                _this.setState({
                    list,
                     pagination:utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }
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
