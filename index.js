
const third = document.getElementById('third')
const second = document.getElementById('second')



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