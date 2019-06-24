console.log("client side js is loaded")

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#p1');
const messageTwo = document.querySelector('#p2');


weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    const location = search.value
    //console.log(location);

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>
    {
        response.json().then((data)=>
        {
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else
            {
                
                messageOne.textContent = data.temp;
                messageTwo.textContent = data.summary;
            }
        })
    });

})