import { login } from "../firebase.js";

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

const loginEmail=document.getElementById('loginEmail');
const loginPassword=document.getElementById('loginPassword');
const loginSubmit=document.getElementById('loginSubmit');
const loaderImg = document.querySelector('.loaderImg');

loginSubmit.addEventListener('click',function (e){
    e.preventDefault();
    login({
        email: loginEmail.value,
        password: loginPassword.value
    },loaderImg)
})