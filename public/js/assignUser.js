const formAssignUser = document.querySelector ("#formAssignUser");


formAssignUser.addEventListener("submit", async function(e) {
    e.preventDefault();
    // Get data from form
    let assignedUser = new FormData(formAssignUser);
    // console.log ([...assignedUser]);
    // let blob = new Blob([project], {
    //     type: 'application/json'
    //   });
    // issue.append("projectID", project._id);

    // console.log ([...issue]);
    
    // Send data from form
    let res = await axios.post(`/projects/${projectId}/team`, assignedUser);

    
    //draw new issue from database
    renderAssignedUser (res);
    

    })

    const renderAssignedUser = (res) => {

    // clear and close form for assign user
    const buttonCloseAssignUser = document.querySelector ("#buttonCloseAssignUser");
    const emailAssignedUser = document.querySelector ("#emailAssignedUser");

    emailAssignedUser.value = "";
    buttonCloseAssignUser.click();

    // Find first row and insert new issue above that card
    const firstIssue = document.querySelector ("#tableAssignedUsers");

    const assignedUser = res.data;
    
    firstIssue.insertAdjacentHTML('afterbegin', `
        <tr>

            <td>${assignedUser.username} </td>
            <td>${assignedUser.email } </td>
            <td>${assignedUser.role } </td>
        </tr>

    `);

    }