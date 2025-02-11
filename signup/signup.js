import { signUp } from "../firebase.js";

// toggle button
const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;
let theme = localStorage.getItem('theme') || 'light';
if (theme == 'dark') {
    body.classList.add('dark');
    themeSwitcher.querySelector('i').classList.replace('fa-solid', 'fa-regular');
}

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark');

    const icon = themeSwitcher.querySelector('i');
    if (body.classList.contains('dark')) {
        icon.classList.replace('fa-solid', 'fa-regular');
    } else {
        icon.classList.replace('fa-regular', 'fa-solid');
    }

    // Save theme state
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// input Feilds
const signUpName = document.getElementById('signUpName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpDes = document.getElementById('signUpDes');
const signUpImg = document.getElementById('signUpImg');
const signUpPassword = document.getElementById('signUpPassword');
const signUpSubmit = document.getElementById('signUpSubmit');
const loaderImg = document.querySelector('.loaderImg');
signUpSubmit.addEventListener("click",function (e){
    e.preventDefault();
    signUp({
        name: signUpName.value,
        email: signUpEmail.value,
        description: signUpDes.value || "",
        imgURL: signUpImg.value || "",
        password: signUpPassword.value
    },loaderImg)
})