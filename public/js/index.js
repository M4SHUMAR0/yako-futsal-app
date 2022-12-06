window.addEventListener('load', function(){
    const btnElems = document.getElementsByClassName("btn");
    const yesElems = document.getElementsByClassName("yes");
    const noElems = document.getElementsByClassName("no");

    Array.prototype.forEach.call(btnElems, function(btnElem,index){
        btnElem.addEventListener("click",function(){
            const yesElem = yesElems[index];
            const noElem = noElems[index];

            yesElem.classList.toggle("unvisible");
            noElem.classList.toggle("unvisible");

        })
    })

});
