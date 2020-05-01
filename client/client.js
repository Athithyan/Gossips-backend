



console.log('hello world');

const form= document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const gossipsElement = document.querySelector('.gossips');
const API_URL = 'http://localhost:5000/gossips';

loadingElement.style.display='';




form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const formData= new FormData(form);
    const title = formData.get('title');
    const content = formData.get('gossip');

    const gossip = {
title,
content
    };
    form.style.display='none';
    loadingElement.style.display='';


    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(gossip),
        headers:{
            'content-type':'application/json'
        }
    }).then(response=>response.json())
      .then(createdGossip=>{
          form.reset();
          form.style.display='';
          listAllGossips();
      });

});

listAllGossips();

function listAllGossips() {
    gossipsElement.innerHTML='';
    fetch(API_URL)
       .then(response => response.json())
       .then (gossips=>{
           gossips.reverse();
         gossips.forEach(gossip => {
             const div = document.createElement('div');

             const header=document.createElement('h3');
             header.textContent=gossip.name;

             const contents=document.createElement('p');
             contents.textContent=gossip.content;
             
             const date= document.createElement('small');
             date.textContent=new Date(gossip.created);

             div.appendChild(header);
             div.appendChild(contents);
             div.appendChild(date);

             gossipsElement.appendChild(div);
         });
         loadingElement.style.display='none'
       });
}