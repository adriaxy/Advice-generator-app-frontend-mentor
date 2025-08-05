const apiURL= 'https://api.adviceslip.com/advice';
const adviceIdElement = document.querySelector('.adviceId');
const adviceTextElement = document.querySelector('.adviceText');
const btn = document.querySelector('button');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error-message');

//se recomienda este evento en lugar de window.onload para asegurar que el DOM está listo sin esperar a que se carguen otros recursos
document.addEventListener('DOMContentLoaded', async ()=> {
    //el siguiente código es correcto pero es más legible usar una estructura try...catch (y hace lo mismo)
     
    // getAdvices()
    // .then((data)=>{
    //     assignContentToElements(data, addAdvice);
    // })
    // .catch((err)=>{
    //     errorMessage.classList.remove('hidden');
    //     console.error('Error fetching', err);
    // })
    // .finally(()=>hideLoader());

    try {
        const data = await getAdvices();
        assignContentToElements(data, addAdvice);
    } catch(err) {
        errorMessage.classList.remove('hidden');
        console.error('Error fetching', err);
    } finally {
        hideLoader();
    }
})


// función asíncrona (devuelve una promise)
const getAdvices = async () => {

    const response = await fetch(apiURL); //con el await pausamos la función hasta que fetch no devuelva una respuesta, solo continúa cuando la promesa está resuelta
    const data = await response.json(); //cuando obtenemos la respuesta del response fetch, la función espera a que se obtenda la segunda promesa de fetch devoliendo los datos en formato json

    return data;
};


function addAdvice(advice, id){
    adviceTextElement.textContent = advice;
    adviceIdElement.textContent = id;
}


btn.addEventListener("click", async (e) => {
        e.preventDefault();
        errorMessage.classList.add('hidden');
        showLoader();
        hideTextAdviceElements();
        //el siguiente código es correcto pero es más legible usar una estructura try...catch (y hace lo mismo)

        // getAdvices()
        // .then((data)=>{
        //     showTextAdviceElements();
        //     hideLoader();
        //     assignContentToElements(data, addAdvice);
        // })
        // .catch((err)=>{
        // errorMessage.classList.remove('hidden');
        // console.error('Error fetching', err);
        // })
        // .finally(()=>hideLoader());

        try {
            const data = await getAdvices();
            showTextAdviceElements();
            assignContentToElements(data, addAdvice);
        } catch (err) {
            errorMessage.classList.remove('hidden');
            console.error('Error fetching', err);
        } finally {
            hideLoader();
        }
})


function assignContentToElements (data, callback){
    let adviceContent = data.slip.advice;
    let idContent = ` #${data.slip.id}`;
    callback(adviceContent, idContent);
}

function showLoader () {
    loader.classList.remove('hidden');
}

function hideLoader () {
    loader.classList.add('hidden');
}

function showTextAdviceElements() {
  adviceIdElement.classList.remove('max-h-0', 'opacity-0', 'hidden');
  adviceIdElement.classList.add('max-h-40', 'opacity-100');
  
  adviceTextElement.classList.remove('max-h-0', 'opacity-0');
  adviceTextElement.classList.add('max-h-40', 'opacity-100');
}

function hideTextAdviceElements() {
  adviceIdElement.classList.remove('max-h-40', 'opacity-100');
  adviceIdElement.classList.add('max-h-0', 'opacity-0', 'hidden');

  adviceTextElement.classList.remove('max-h-40', 'opacity-100');
  adviceTextElement.classList.add('max-h-0', 'opacity-0');
}
