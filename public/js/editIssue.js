
const toggleEditable = (obj) => {

    if (obj.nodeName == 'SELECT') {
        obj.toggleAttribute('disabled');

    } else {
        obj.toggleAttribute('contenteditable');

    }
    obj.classList.toggle('border');
    obj.classList.toggle('border-info');

}

const editIssue = async (e) => {
    // Find title and descrition and make it editable

    for (let info of issueInfo) {
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

const issueInfo = [titleIssue, descriptionIssue, selectStatus, selectPriority, selectIssueType];

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

    const editedIssue = {
        title: editedTitle,
        description: editedDescription,
        status: editedStatus,
        priority: editedPriority,
        issueType: editedIssueType
    }

    let res = await axios.put(`/projects/${projectId}/issues/${issueId}`, editedIssue);

    for (let info of issueInfo) {
        toggleEditable (info)
    }


    buttonSaveEdit.classList.add ("d-none");
    buttonCancelEdit.classList.add ("d-none");
    buttonEditIssue.classList.remove ("d-none");
    buttonEditIssue.addEventListener("click", editIssue);

    buttonSaveEdit.removeEventListener("click", saveIssue);

}