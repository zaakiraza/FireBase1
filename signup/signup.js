import { signUp } from "../firebase.js";

let SignUpName=document.getElementById('SignUpName');
let SignUpEmail=document.getElementById('SignUpEmail');
let SignUpCountry=document.getElementById('SignUpCountry');
let SignUpPassword=document.getElementById('SignUpPassword');
let SubmitSignIn=document.getElementById('SubmitSignIn');

SubmitSignIn.addEventListener("click",(event)=>{
    event.preventDefault();
    signUp({
        firstName: SignUpName.value,
        email: SignUpEmail.value,
        country: SignUpCountry.value,
        password: SignUpPassword.value
    });
});