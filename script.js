let slideIndex = 0;
let main = document.querySelector("#main");

let script = document.createElement("script");
script.id = "script";
document.head.appendChild(script);


fetch(`snippets/home.html`)
.then(res => {
    return res.text();
})
.then(html => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    docBody = doc.querySelector(`#home`);
    main.innerHTML = "";
    main.appendChild(docBody);
    main.className = "fade-in container";
})
.catch(error => {
    console.log("Failed to fetch page");
})


let navbar = document.querySelector("#topnav");
let navbarTabs = navbar.children;
for (let i = 0; i < navbarTabs.length - 1; i++) {
    navbarTabs[i].addEventListener("click", changeSnippet);
}

// window.onscroll = function() {
//     reachedScrollPosition();
// }

// function reachedScrollPosition() {
//     let navbar = document.getElementById("topnav");
//     let sticky = navbar.offsetTop;
//     if (window.pageYOffset >= sticky) {
//         navbar.classList.add("sticky");
//     }
//     else {
//         navbar.classList.remove("sticky");
//     }
// }

// function plusSlide(n) {
//     showSlides(slideIndex += n);
// }

function showSlides() {
    let slides = document.querySelectorAll(".project-slide");
    // var dots = document.querySelectorAll(".dot");      
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].className = "fade-out project-slide";
    }
    slideIndex++;
    //console.log(slideIndex)
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].className = "fade-in project-slide";
    //console.log(slides[slideIndex-1]);
    setTimeout(showSlides, 5000);
}

function makeTabActive(e) {
    let navbarTabs = e.target.parentElement.children;
    for (let i = 0; i < navbarTabs.length; i++) {
        if (navbarTabs[i].className === "active") {
            navbarTabs[i].className = "";
        }
    }
    e.target.classList.add("active");
}

function changeSnippet(e) {
    main.className = "fade-out container";
    makeTabActive(e);
    let tabID = e.target.id;
    fetch(`/snippets/${tabID}.html`)
    .then(res => {
        return res.text();
    })
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        docBody = doc.querySelector(`#${tabID}`);
        main.innerHTML = "";
        main.appendChild(docBody);
        main.className = "fade-in container";
        let script = document.querySelector("#script");
        document.head.removeChild(script);
        let snippetScript = document.createElement("script");
        snippetScript.id = "script";
        snippetScript.src = `../js/${tabID}.js`
        document.head.appendChild(snippetScript);
        //console.log(removed);
        // document.querySelector("#script").src = `../js/${tabID}.js`;
    })
    .catch(error => {
        console.log("Failed to fetch page");
    })
}

function myFunction() {
    let x = document.querySelector("#topnav");
    let icon = document.getElementById("menu");
    if (x.className === "") {
        x.className = "responsive";
        icon.style.backgroundColor = "";
    }
    else {
        x.className = "";
        icon.style.backgroundColor = "#f3f3f3";
        
    }
}