console.log("FE is running....");

fetch("http://localhost:9000/products")
    .then(res=>res.json())
    .then(res => {
        if("error" in res.data){
            console.error(res)
        }else {
            console.log(res)
        }
    });