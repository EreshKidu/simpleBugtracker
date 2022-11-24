

const editProject = async (e) => {
    // Find title and descrition and make it editable


    titleProject.setAttribute('contenteditable', "true");
    titleProject.classList.add ('border', 'border-info');

    descriptionProject.setAttribute('contenteditable', "true");
    descriptionProject.classList.add ('border', 'border-info');


    // Hide Edit button, add enable cancel button and Save button to the left of all buttons



    buttonEditProject.classList.add ("d-none");
    buttonSaveEdit.classList.remove ("d-none");
    buttonSaveEdit.addEventListener("click", saveProject);
    buttonCancelEdit.classList.remove ("d-none");


    buttonEditProject.removeEventListener('click', editProject);

}

const titleProject = document.querySelector ("#titleProject");
const descriptionProject = document.querySelector ("#descriptionProject");
const buttonEditProject = document.querySelector ("#buttonEditProject");
const buttonSaveEdit = document.querySelector ("#buttonSaveEdit");
const buttonCancelEdit = document.querySelector ("#buttonCancelEdit");

buttonEditProject.addEventListener("click", editProject);

const saveProject = async (e) => {

    //Read new title and description
    const editedDescription = descriptionProject.innerText;
    const editedTitle = titleProject.innerText;
    const editedProject = {
        title: editedTitle,
        description: editedDescription
    }

    let res = await axios.put(`/projects/${projectId}`, editedProject);

    
    titleProject.setAttribute('contenteditable', "false");
    titleProject.classList.remove ('border', 'border-info');

    descriptionProject.setAttribute('contenteditable', "false");
    descriptionProject.classList.remove ('border', 'border-info');

    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditProject.classList.remove ("d-none");

    buttonSaveEdit.removeEventListener("click", saveProject);

}