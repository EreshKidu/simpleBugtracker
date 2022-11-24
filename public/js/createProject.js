
    
const formCreateProject = document.querySelector ("#formCreateProject");


const drawProject = (res) => {
    
    // clear and close form for new project
    const buttonNewProject = document.querySelector ("#buttonNewProject");
    const titleNewProject = document.querySelector ("#title");
    const descriptionNewProject = document.querySelector ("#description");

    titleNewProject.value = "";
    descriptionNewProject.value = "";
    buttonNewProject.click();

    // Find div with all projects and insert new project at top
    const firstCard = document.querySelector ("#cards");

    const project = res.data;
    const createdData = new Date (project.createdAt);

    firstCard.insertAdjacentHTML('afterbegin', `
    <div class="card mb-3" id="card">
            <div class="row">
            <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title"> <a href="/projects/${project._id}">${project.title}</a> </h5>
                        <p class="card-text">${project.description}</p>
                        <p class="card-text">
                            <small class="text-muted">${createdData.toDateString() }</small>
                        </p>
                    
                    </div>
                </div>
            </div>
        </div>
    
    `);

}

formCreateProject.addEventListener("submit", async function(e) {
    e.preventDefault();
    // Get data from form
    let project = new FormData(formCreateProject);
    console.log ([...project]);

    // Send data from form
    let res = await axios.post(`/projects`, project);
    
    //draw new project from database
     drawProject (res);
    


    })

    

