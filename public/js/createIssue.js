


const formCreateIssue = document.querySelector ("#formCreateIssue");


formCreateIssue.addEventListener("submit", async function(e) {
    e.preventDefault();
    // Get data from form
    let issue = new FormData(formCreateIssue);
    // let blob = new Blob([project], {
    //     type: 'application/json'
    //   });
    // issue.append("projectID", project._id);

    // console.log ([...issue]);
    
    // Send data from form
    let res = await axios.post(`/projects/${projectId}/issues`, issue);
    
    //draw new issue from database
     drawIssue (res);
    


    })


    const drawIssue = (res) => {

         // clear and close form for new issue
    const buttonCloseNewIssue = document.querySelector ("#buttonCloseNewIssue");
    const descriptionNewIssue = document.querySelector ("#description");
    const titleNewIssue = document.querySelector ("#title");


    descriptionNewIssue.value = "";
    titleNewIssue.value = "";
    buttonCloseNewIssue.click();

    // Find first row and insert new issue above that card
    const firstIssue = document.querySelector ("tbody");

    const issue = res.data;
    const createdDate = new Date (issue.createdAt);
    firstIssue.insertAdjacentHTML('afterbegin', `
        <tr>
        <td><a href="/projects/${projectId}/issues/${issue._id}">${issue._id}</a></td>
        <td>${issue.description}</td>
        <td>${createdDate.toDateString()}</td>
        <td>${issue.status}</td>
        <td>${issue.priority }</td>
        <td>${issue.issueType }</td>
    </tr>

    `);
    }
