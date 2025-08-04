const apiURL= 'https://api.adviceslip.com/advice';
const elementAdviceId = document.querySelector('.adviceId');
const elementAdvice = document.querySelector('p');
const btn = document.querySelector('button')
let adviceIdContent;
let adviceContent;

// función asíncrona (devuelve una promise)
const getAdvices = async () => {

    const response = await fetch(apiURL); //con el await pausamos la función hasta que fetch no devuelva una respuesta, solo continúa cuando la promesa está resuelta
    const data = await response.json(); //cuando obtenemos la respuesta del response fetch, la función espera a que se obtenda la segunda promesa de fetch devoliendo los datos en formato json

    return data;
};


function addAdvice(advice, id){
    elementAdvice.innerHTML = advice;
    elementAdviceId.innerHTML = id;
}


btn.addEventListener("click", (e) => {
        e.preventDefault();
        getAdvices().then((data)=>{
        adviceIdContent = data.slip.id;
        adviceContent = data.slip.advice;
        addAdvice(adviceContent, adviceIdContent);
        console.log(typeof adviceIdContent)
        console.log(typeof adviceContent)
    });
})


