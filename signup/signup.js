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
const signUpImg = document.getElementById('SignUpImg');
const signUpPassword = document.getElementById('signUpPassword');
const signUpSubmit = document.getElementById('signUpSubmit');
const loaderImg = document.querySelector('.loaderImg');
signUpSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    async function uploadImage() {
        const fileInput = signUpImg.files[0];

        if (!fileInput) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput);
        formData.append('upload_preset', 'fireBase1');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dvo8ftbqu/image/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            signUp({
                name: signUpName.value,
                email: signUpEmail.value,
                description: signUpDes.value || "",
                imgURL: data.secure_url || "",
                password: signUpPassword.value
            }, loaderImg)

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
    uploadImage();
})