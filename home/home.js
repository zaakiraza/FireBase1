import { editDetails, getSingleData, stateObserver, logout, documentShowingOnPlaceholder, postInDB, showAllPost, showOnlyPosts } from "../firebase.js";

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
let logedInUserProfilePost = document.getElementById('logedInUserProfilePost');
let postText = document.getElementById('postText');
let postImg = document.getElementById('postImg');
let postBtn = document.getElementById('postBtn');
let allPosts = document.getElementById('AllPosts');
let loaderImg = document.querySelector('.loaderImg');
let Allpostsbtn = document.getElementById('Allpostsbtn');
let yourPostbtn = document.getElementById('yourPostbtn');
let uid;
let userDetails;

async function starter() {
    uid = await stateObserver();
    userDetails = await getSingleData(uid);
    let { name, email, description, imgURL } = userDetails;
    nameUserFeild.innerText = name.toUpperCase();
    desUserFeild.innerText = description || "No Description";
    imgUserFeild.src = imgURL || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";
    emailUserFeild.innerText = email;
    logedInUserProfilePost.src = imgURL || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";
    let postData = await showAllPost();
    allPosts.innerHTML = postData;
}
starter();

editProfileBtn.onclick = async function () {
    modal.style.display = "block";
    let data = await documentShowingOnPlaceholder(uid);
    let { description, email, name } = data;
    editName.value = name;
    editEmail.value = email;
    editDes.value = description;
}

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

editBtn.onclick = function (e) {
    e.preventDefault();
    async function uploadImage() {
        const fileInput = editImg.files[0];

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
            editDetails({
                name: editName.value,
                email: editEmail.value,
                imgURL: data.secure_url,
                description: editDes.value || ""
            }, uid);

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
    uploadImage();
}

homelogoutBtn.onclick = function (e) {
    e.preventDefault();
    logout();
}

postBtn.onclick = () => {
    if (postText.value == "") {
        alert("Write some text to post");
        return;
    }
    async function uploadImage() {
        const fileInput = postImg.files[0] || "";
        if (!fileInput) {
            let { name, email, imgURL } = userDetails;
            postInDB({
                text: postText.value,
                user: {
                    userName: name,
                    userEmail: email,
                    userProfilePic: imgURL || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
                    uerid: uid
                }
            }, loaderImg);
            return;
        }
        loaderImg.display = "flex";
        const formData = new FormData();
        formData.append('file', fileInput);
        formData.append('upload_preset', 'fireBase1');
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dvo8ftbqu/image/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            loaderImg.display = "none";
            let { name, email, imgURL } = userDetails;
            postInDB({
                text: postText.value,
                img: data.secure_url,
                user: {
                    userName: name,
                    userEmail: email,
                    userProfilePic: imgURL || "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
                    uerid: uid
                }
            }, loaderImg);

        } catch (error) {
            alert("Post not upload");
            console.error("Error uploading image:", error);
        }
    }
    uploadImage();
}

Allpostsbtn.onclick = async () => {
    let postData = await showAllPost();
    allPosts.innerHTML = postData;
}

yourPostbtn.onclick = async () => {
    let postFilterData = await showOnlyPosts(uid);
    allPosts.innerHTML = postFilterData;
}