
    
const formCreateProject = document.querySelector ("#formCreateProject");


const drawProject = (res) => {
    
    // clear and close form for new project
    
    const buttonCloseNewProject = document.querySelector ("#buttonCloseNewProject");
    const titleNewProject = document.querySelector ("#title");
    const descriptionNewProject = document.querySelector ("#description");

    titleNewProject.value = "";
    descriptionNewProject.value = "";

    buttonCloseNewProject.click();

    // Find div with all projects and insert new project at top
    const firstProject = document.querySelector ("tbody");

    const project = res.data;
    const createdData = new Date (project.createdAt);

    firstProject.insertAdjacentHTML('afterbegin', `
        <tr>
            <td><a href="/projects/${project._id}">${project._id} </a> </td>
            <td class="" >${project.title}</td>
            <td class="" >${project.author.email}</td>
            <td>${createdData.toLocaleString() }</td>

        </tr>
    
    `);

}


const createProject = async (e) => {
    e.preventDefault();
    // Get data from form
    let project = new FormData(formCreateProject);
 
    // Send data from form
    let res = await axios.post(`/projects`, project);
    
    //if project is created - draw new project from database. Otherwise - Alert
    
    if (res.data._id) {
     drawProject (res);
    } else {
        
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        const alert = (message, type) => {
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
        
          alertPlaceholder.append(wrapper)
        }
        

        alert('Something went wrong! Login with appropriate permissons', 'danger');




    }



    }



