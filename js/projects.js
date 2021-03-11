let links = document.querySelectorAll(".text");
console.log(links);

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", viewProject);
}

function viewProject(e) {
    let projectID = e.target.parentElement.parentElement.id;
    main.className = "fade-out container";
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
        main.className = "fade-in container";
        getProjectData(projectID);
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

function getProjectData(projectID) {
    console.log(projectID);
    fetch(`http://localhost:3000/projects/${projectID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        addDataToPage(data);
    })
    .catch(error => {
        console.log(error);
    })
}

function addDataToPage(data) {
    let title = document.querySelector("#project-title");
    let about = document.querySelector("#project-about");
    let technologies = document.querySelector("#technologies")

    let technologyHTML = ``;
    console.log(data);
    let techLength = data.technologies.length;
    let gridSize;
    let additional;
    console.log(techLength);
    if (techLength <= 4) {
        gridSize = 12 / techLength
    }
    else if (techLength > 4) {
        additional = data.technologies.length - 4;
        gridSize = 12 / additional;
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

    }
    // for (let i = 0; i < data.technologies.length; i++) {
    //     technologyHTML += `<div class="col-${gridSize} col-s-6">
    //                          <h3 class="text-center">${data.technologies[i]}</h3>
    //                          <img class="logo-img" src="../logos/${data.technologies[i]}.png"/>
    //                        </div>`
    // }
    console.log(data);
    title.textContent = data.title;
    about.textContent = data.about;
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