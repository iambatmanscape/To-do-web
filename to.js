let inp = document.querySelector('#infield');
let sve = document.querySelector('.save');
let list = document.querySelector('ul');

getdata();

const todo = () => {
  if (inp.value === '') {
    alert("Please enter a valid task!");
  } else {
    let l = Array.from(document.querySelectorAll('li'));
    if (l.length >= 4) {
      sve.disabled = true;
    }
    let chk = document.createElement('input');
    chk.type = 'checkbox';
    let btn = document.createElement('button');
    btn.innerText = 'del';
    let text = document.createTextNode(`${inp.value}`);
    let lbtxt = document.createElement('label');
    lbtxt.appendChild(chk);
    lbtxt.appendChild(text);
    let listitem = document.createElement('li');
    listitem.append(lbtxt);
    listitem.append(btn);
    list.appendChild(listitem);
    savedata(`${inp.value}`, chk.checked);
    inp.value = '';

    chk.addEventListener('change', () => {
      updateStatus(text.textContent, chk.checked);
    });

    btn.addEventListener('click', () => {
      list.removeChild(listitem);
      removeData(text.textContent);
      l = Array.from(document.querySelectorAll('li'));
      if (l.length < 4) {
        sve.disabled = false;
      }
    });
  }
}

sve.addEventListener('click', todo);

function savedata(text, status) {
  const obj = {
    data: text,
    stat: status
  }
  const ol = JSON.stringify(obj);
  localStorage.setItem(text, ol);
}

function getdata() {
  if (localStorage.length !== 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const data = localStorage.getItem(key);
      const { data: text, stat: status } = JSON.parse(data);
      let chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.checked = status;
      let btn = document.createElement('button');
      btn.innerText = 'del';
      let lbtxt = document.createElement('label');
      lbtxt.appendChild(chk);
      lbtxt.appendChild(document.createTextNode(text));
      let listitem = document.createElement('li');
      listitem.append(lbtxt);
      listitem.append(btn);
      list.appendChild(listitem);

      chk.addEventListener('change', () => {
        updateStatus(text, chk.checked);
      });

      btn.addEventListener('click', () => {
        list.removeChild(listitem);
        removeData(text);
      });
    }
  }
}

function removeData(data) {
  localStorage.removeItem(data);
}

function updateStatus(text, status) {
  const data = localStorage.getItem(text);
  const { data: taskText } = JSON.parse(data);
  const updatedData = JSON.stringify({ data: taskText, stat: status });
  localStorage.setItem(text, updatedData);
}
