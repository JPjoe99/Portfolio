addLink();

function addLink() {
    let links = document.querySelectorAll(".text");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", viewProject);
    }
}

async function loadingScreen() {
    setTimeout(() => {
    main.innerHTML = "<h1>Loading...</h1>";
    main.className = "fade-in container";
}, 100)
};

async function viewProject(e) {
    let projectData;
    let projectID = e.target.parentElement.parentElement.id;
    main.className = "fade-out container";
    // main.className = "fade-out container";
    // await getProjectData(projectID)
    // .then(data => {
    //     projectData = data;
    // });
    fetch("/snippets/project.html")
    .then(res => {
        return res.text();
    })
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        docBody = doc.querySelector(`#project`);
        main.innerHTML = "";
        main.appendChild(docBody);
        //addDataToPage(projectData);
        main.className = "fade-in container";
    })
    .catch(error => {
        console.log(error);
    })
}

function flipCard() {
    let innerCard = document.getElementById("inner-card");
    let flipCard = document.getElementById("cardFlip");
    if (innerCard.style.transform == "") {
        innerCard.style.transform = "rotateY(180deg)";
        flipCard.style.transform = "rotateY(180deg)"
    }
    else {
        innerCard.style.transform = "";
        flipCard.style.transform = "";
    }
}

async function getProjectData(projectID) {
    console.log(projectID);
    let data = await fetch(`https://h34syawcrl.execute-api.eu-west-2.amazonaws.com/dev/getProjectData`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title: projectID})
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data.body;
    })
    .catch(error => {
        console.log(error);
    })
    return data;
}

function addDataToPage(data) {
    let title = document.querySelector("#project-title");
    let about = document.querySelector("#project-about");
    let technologies = document.querySelector("#technologies")
    let barTitle = document.querySelector("#bar-title");
    let detailsHTML;
    console.log(data.details);
    for (let i = 0; i < data.details.length; i++) {
        detailsHTML += `<li>${data.details[i]}</li>`;
    }

    about.innerHTML = detailsHTML;

    let technologyHTML = ``;
    let techLength = data.technologies.length;
    let gridSize;
    let additional;

    let slides = document.querySelectorAll(".mySlides");
    console.log(slides);
    for (let i = 0; i < slides.length; i++) {
        let source = `project-images/${data.title}-${i+1}.png`;
        console.log(source);
        slides[i].innerHTML = `<img class="project-img" src="../project-images/${data.title}-${i+1}.png">`
    }
        for (let i = 0; i < data.technologies.length; i++) {
            if (i < 4) {
                technologyHTML += `<div class="col-3 col-s-6">
                                    <h3 class="text-center">${data.technologies[i]}</h3>
                                    <img class="logo-img" src="../logos/${data.technologies[i]}.png"/>
                                    </div>`
            }
            else {
                technologyHTML += `<div class="col-${gridSize} col-s-6">
                                    <h3 class="text-center">${data.technologies[i]}</h3>
                                    <img class="logo-img" src="../logos/${data.technologies[i]}.png"/>
                                    </div>`
            }
        }
    title.textContent = data.title;
    barTitle.textContent = data.title.toUpperCase();
    //about.textContent = data.about;
    technologies.innerHTML = technologyHTML;
    showSlides();
}


function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}