const toggleEditable = (objects) => {
    for (let object of objects) {
        if (object.nodeName == 'SELECT') {
            object.toggleAttribute('disabled');

        } else {
            object.toggleAttribute('contenteditable');

        }
        object.classList.toggle('border');
        object.classList.toggle('border-info');
    }

}

const readProjectInfo = (objects) => {
    let currentProjectInfo = [];
    for (let object of objects) {
        
        if (object.nodeName == 'SELECT') {
            currentProjectInfo.push([object.getAttribute('name'), object.value]);
    
        } else {
            currentProjectInfo.push([object.getAttribute('name'), object.innerText]);
            
    
        }
    }
    //Create object from array
    let result = Object.fromEntries(currentProjectInfo);
    return result;
}

const revertProjectInfo = (objects) => {
    for (let object of objects) {
        objName = object.getAttribute('name');
        
        if (object.nodeName == 'SELECT') {
            object.value = projectInfoInitial[objName];
    
        } else {
            object.innerText = projectInfoInitial[objName];
            
    
        }
    }
}


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

const projectInfoObjects = [titleProject, descriptionProject];
let projectInfoInitial = readProjectInfo (projectInfoObjects);

const buttonEditProject = document.querySelector ("#buttonEditProject");
const buttonSaveEdit = document.querySelector ("#buttonSaveEdit");
const buttonCancelEdit = document.querySelector ("#buttonCancelEdit");

buttonEditProject.addEventListener("click", editProject);

const saveProject = async (e) => {

    //Read new title and description

    const editedProject = readProjectInfo (projectInfoObjects);
    console.log (editedProject);

    let res = await axios.put(`/projects/${projectId}`, editedProject);

    toggleEditable (projectInfoObjects);

    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditProject.classList.remove ("d-none");

    buttonSaveEdit.removeEventListener("click", saveProject);

}

const cancelEdit = () => {
    
    revertProjectInfo (projectInfoObjects);
    toggleEditable (projectInfoObjects);

    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditProject.classList.remove ("d-none");
    buttonEditProject.addEventListener("click", editProject);

    buttonSaveEdit.removeEventListener("click", saveProject);
}

buttonCancelEdit.addEventListener("click", cancelEdit);
