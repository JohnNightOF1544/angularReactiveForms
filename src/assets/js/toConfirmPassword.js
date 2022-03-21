

document.querySelector('#button').onclick = function(){

    var password = document.querySelector('#password').value,
        confirmPassword = document.querySelector('#confirmPassword').value;

        if(password == ""){
            alert("Field cannot be empty");
        }
        else if(password != confirmPassword){
            alert("Password didn't match try again.");
            return false
        }
        return true
}
