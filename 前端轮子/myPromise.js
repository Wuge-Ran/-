const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';

class myPromise{
    constructor(excutor){
        try{
            excutor(this.resolve,this.reject)
        }catch(err){
            this.reject(err)
        }
        
    }

    status = PENDING;
    value = undefined;
    successCb = [];
    failCb = [];
    
    resolve = (res) => {
        if(this.status !== PENDING) return;
        this.status = RESOLVE;
        this.value = res;
        while(this.successCb.length){
            this.successCb.shift()()
        }
    }

    reject = (err) => {
        if(this.status !== PENDING) return;
        this.status = REJECT;
        this.value = err;
        while(this.failCb.length){
            this.failCb.shift()()
        }
    }

    then = (successCb,failCb) => {
        const p = new myPromise((res,rej)=>{
                if(this.status === RESOLVE){
                    try{
                        const x = successCb&&successCb(this.value);
                        resolvePromise(x,res,rej)
                    }catch(err){
                        rej(err)
                    }
                    
                }else if(this.status === REJECT){
                    try{
                        const x = failCb&&failCb(this.value);
                        resolvePromise(x,res,rej)
                    }catch(err){
                        rej(err)
                    }
                    
                }else{
                    this.successCb.push(()=>{
                        try{
                            const x = successCb(this.value)
                            resolvePromise(x,res,rej)
                        }catch(err){
                            rej(err)
                        }
                        
                    });
                    this.failCb.push(()=>{
                        try{
                            const x = failCb(this.value)
                            resolvePromise(x,res,rej)
                        }catch(err){
                            rej(err)
                        }
                    });
                }
            })
        return p;
    }
    
    static all = (arr) => {
        const resArr = [];
        let flag = 0;
        return new Promise((resolve,reject)=>{
            arr.forEach((p,i)=>{
                Promise.resolve(p).then((res)=>{
                    resArr[i] = res;
                    flag++;
                    if(flag === arr.length){
                        resolve(resArr);
                    }
                    
                },(rej)=>{
                    reject(rej);
                })
            })
        })
    }
}

function resolvePromise(x,res,rej) {
    if(x instanceof myPromise){
        x.then(res,rej)
    }else{
        res(x)
    }
}

module.exports = myPromise;