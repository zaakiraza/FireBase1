import { login } from "../firebase";

let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let SubmitlogIn = document.getElementById('SubmitlogIn');

SubmitlogIn.addEventListener('click', (event) => {
    event.preventDefault();
    login({
        email: loginEmail.value,
        password: loginPassword.value
    })
})