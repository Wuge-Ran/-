function quickSort(arr,left = 0 ,right = arr.length - 1) {
  const flag = arr[right]
  if(left < right){
    let pos = left - 1;
    for(let i = left;i <= right;i++){
      if(arr[i]<=flag){
        pos++;
        let temp = arr[i];
        arr[i] = arr[pos];
        arr[pos] = temp
      }
    }
    quickSort(arr,left,pos -1)
    quickSort(arr,pos+1,right)
  }
  return arr
}
console.log(quickSort([2,3,1,21,1]))