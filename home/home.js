import { editDetails, getSingleData, stateObserver, logout, documentShowingOnPlaceholder } from "../firebase.js";

// Get modal and buttons
const editProfileBtn = document.getElementById("editProfileBtn");
const modal = document.getElementById("editProfileUpModal");
const closeModalBtn = document.getElementsByClassName("close-btn")[0];

const homelogoutBtn = document.getElementById('homelogoutBtn');
const editBtn = document.getElementById('editBtn');
let imgUserFeild = document.getElementById('img');
let nameUserFeild = document.getElementById('name');
let desUserFeild = document.getElementById('des');
let emailUserFeild = document.getElementById('email');
let editName = document.getElementById('editName');
let editDes = document.getElementById('editDes');
let editImg = document.getElementById('editImg');
let editEmail = document.getElementById('editEmail');

async function starter() {
    uid = await stateObserver();
    userDetails = await getSingleData(uid);
    let { name, email, description, imgURL } = userDetails;
    nameUserFeild.innerText = name.toUpperCase();
    desUserFeild.innerText = description || "No Description";
    imgUserFeild.src = imgURL || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";
    emailUserFeild.innerText = email;
}
starter();

// Open Modal
editProfileBtn.onclick = async function () {
    modal.style.display = "block";
    let data = await documentShowingOnPlaceholder(uid);
    let { description, email, imgURL, name } = data;
    editName.value = name;
    editEmail.value = email;
    editDes.value = description;
    editImg.value = imgURL;
}

// Close Modal when clicking on "X"
closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

// Close Modal if clicking outside of it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

let uid;
let userDetails;

editBtn.onclick = function (e) {
    e.preventDefault();
    console.log(emailUserFeild.value)
    editDetails({
        name: editName.value,
        email: editEmail.value,
        imgURL: editImg.value || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
        description: editDes.value || ""
    }, uid);
}

homelogoutBtn.onclick = function (e) {
    e.preventDefault();
    logout();
}