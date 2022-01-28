class Compile{
    constructor(){
        this.data = {
            aaa:"123123"
        }
        this.compile(document.getElementById('app').childNodes)
    }
    compile(node){
        
        Array.from(node).forEach(item => {
            if(item.nodeType === 3){
                const exp = /\{\{(.+?)\}\}/
                if(exp.test(item.textContent)){
                   const key  = RegExp.$1.trim()
                   item.textContent = this.data[key]
                }
            }
            if(item.childNodes&&item.childNodes.length){
                this.compile(item.childNodes)
            }
        })
    }
}

new Compile();