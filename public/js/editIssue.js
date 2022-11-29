
const toggleEditable = (obj) => {

    if (obj.nodeName == 'SELECT') {
        obj.toggleAttribute('disabled');

    } else {
        obj.toggleAttribute('contenteditable');

    }
    obj.classList.toggle('border');
    obj.classList.toggle('border-info');

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
    console.log (currentIssueInfo);
    let result = Object.fromEntries(currentIssueInfo);
    return result;
}


const editIssue = async (e) => {
    // Find title and descrition and make it editable

    for (let info of issueInfoObjects) {
        toggleEditable (info)
    }

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
console.log (issueInfoInitial);




const buttonEditIssue = document.querySelector ("#buttonEditIssue");
const buttonSaveEdit = document.querySelector ("#buttonSaveEdit");
const buttonCancelEdit = document.querySelector ("#buttonCancelEdit");

buttonEditIssue.addEventListener("click", editIssue);

const saveIssue = async (e) => {

    //Read new title and description
    const editedDescription = descriptionIssue.innerText;
    const editedTitle = titleIssue.innerText;
    const editedIssueType = selectIssueType.value; 
    const editedPriority = selectPriority.value;
    const editedStatus = selectStatus.value ;
    const editedUser = selectUser.value ;


    const editedIssue = {
        title: editedTitle,
        description: editedDescription,
        status: editedStatus,
        priority: editedPriority,
        issueType: editedIssueType,
        assignedUser: editedUser
    }

    let res = await axios.put(`/projects/${projectId}/issues/${issueId}`, editedIssue);

    for (let info of issueInfoObjects) {
        toggleEditable (info)
    }


    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditIssue.classList.remove ("d-none");
    buttonEditIssue.addEventListener("click", editIssue);

    buttonSaveEdit.removeEventListener("click", saveIssue);

}


const cancelEdit = () => {

    for (let info of issueInfoObjects) {
        toggleEditable (info)
    }
    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditIssue.classList.remove ("d-none");
    buttonEditIssue.addEventListener("click", editIssue);

    buttonSaveEdit.removeEventListener("click", saveIssue);
}

buttonCancelEdit.addEventListener("click", cancelEdit);
