var minDepth = function(root) {
    if(!root) return 0;
    let arr = [[root,1]];
    while(arr.length){
        let [r,L] = arr.shift();
        if(!r.left && !r.right){
            return L;
        }
        if(r.left) arr.push([r.left,L+1])
        if(r.right) arr.push([r.right,L+1])
    }
}