let inp=document.querySelector('#infield');
let sve=document.querySelector('button');
let list=document.querySelector('ul');
const todo=()=> {
    let l=Array.from(document.querySelectorAll('li'));
    if(l.length>4) { inp.disabled=true; sve.disabled=true; }
    let chk=document.createElement('input');
    chk.type='checkbox';
    let text=document.createTextNode(`${inp.value}`);
    let lbtxt=document.createElement('label');
    lbtxt.appendChild(chk);
    lbtxt.appendChild(text);
    let listitem=document.createElement('li');
    listitem.append(lbtxt);
    list.appendChild(listitem);
}
sve.addEventListener('click',todo);
