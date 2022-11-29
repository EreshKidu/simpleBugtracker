
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

const readIssueInfo = (objects) => {
    let currentIssueInfo = [];
    for (let object of objects) {
        
        if (object.nodeName == 'SELECT') {
            currentIssueInfo.push([object.getAttribute('name'), object.value]);
    
        } else {
            currentIssueInfo.push([object.getAttribute('name'), object.innerText]);
            
    
        }
    }
    //Create object from array
    let result = Object.fromEntries(currentIssueInfo);
    return result;
}

const revertIssueInfo = (objects) => {
    for (let object of objects) {
        objName = object.getAttribute('name');
        
        if (object.nodeName == 'SELECT') {
            object.value = issueInfoInitial[objName];
    
        } else {
            object.innerText = issueInfoInitial[objName];
            
    
        }
    }
}


const editIssue = async (e) => {
    // Find title and descrition and make it editable


    toggleEditable (issueInfoObjects);


    // Hide Edit button, add enable cancel button and Save button to the left of all buttons

    buttonEditIssue.classList.add ("d-none");
    buttonSaveEdit.classList.remove ("d-none");
    buttonSaveEdit.addEventListener("click", saveIssue);
    buttonCancelEdit.classList.remove ("d-none");


    buttonEditIssue.removeEventListener('click', editIssue);

}

const titleIssue = document.querySelector ("#titleIssue");
const descriptionIssue = document.querySelector ("#descriptionIssue");
const selectIssueType = document.querySelector ("#selectIssueType"); 
const selectPriority = document.querySelector ("#selectPriority");
const selectStatus = document.querySelector ("#selectStatus");
const selectUser = document.querySelector ("#selectUser");


const issueInfoObjects = [titleIssue, descriptionIssue, selectStatus, selectPriority, selectIssueType, selectUser];
let issueInfoInitial = readIssueInfo (issueInfoObjects);





const buttonEditIssue = document.querySelector ("#buttonEditIssue");
const buttonSaveEdit = document.querySelector ("#buttonSaveEdit");
const buttonCancelEdit = document.querySelector ("#buttonCancelEdit");

buttonEditIssue.addEventListener("click", editIssue);

const saveIssue = async (e) => {

    //Read new title and description

    const editedIssue = readIssueInfo (issueInfoObjects);


    let res = await axios.put(`/projects/${projectId}/issues/${issueId}`, editedIssue);

    toggleEditable (issueInfoObjects);

    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditIssue.classList.remove ("d-none");
    buttonEditIssue.addEventListener("click", editIssue);

    buttonSaveEdit.removeEventListener("click", saveIssue);

}


const cancelEdit = () => {
    
    revertIssueInfo (issueInfoObjects);
    toggleEditable (issueInfoObjects);

    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditIssue.classList.remove ("d-none");
    buttonEditIssue.addEventListener("click", editIssue);

    buttonSaveEdit.removeEventListener("click", saveIssue);
}

buttonCancelEdit.addEventListener("click", cancelEdit);
