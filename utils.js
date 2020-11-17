function compara_rewards (array1, array2) {
    if (array1.length != array2.length){
        return false
    }
    else{
        for (let index=0; index<array1.length;index++){
            if (array1[index] != array2[index]){
                return false
            }
        }
        return true
    }
}