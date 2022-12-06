window.addEventListener('load', function(){
    const btnElems = document.getElementsByClassName("btn");
    const yesElems = document.getElementsByClassName("yes");
    const noElems = document.getElementsByClassName("no");

    const socket = io();

    Array.prototype.forEach.call(btnElems, function(btnElem,index){
        btnElem.addEventListener("click",function(){
            const yesElem = yesElems[index];
            const noElem = noElems[index];

            yesElem.classList.toggle("unvisible");
            noElem.classList.toggle("unvisible");

            socket.emit('sendMessage', "testmessage");
            socket.on('receiveMessage', (message) => {
                // messageには受信したメッセージが入る
                console.log(message);
              });
        })
    })





});
