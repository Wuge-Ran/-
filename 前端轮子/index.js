const myPromise = require("./myPromise.js");

const p = new myPromise((res,rej) => {
    setTimeout(()=>{
        res('成功11')
    },2000)
    
    // rej('失败')
})

const p2 = new myPromise((res,rej)=>{
    rej(1232)
})

myPromise.all([p2,'1',p,'2']).then((item)=>{
    console.log('====item',item)
},(err)=>{
    console.log('====err',err)
})