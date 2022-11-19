

const formCreateIssue = document.querySelector ("#formCreateIssue");


formCreateIssue.addEventListener("submit", async function(e) {
    e.preventDefault();
    // Get data from form
    let issue = new FormData(formCreateIssue);

    // Send data from form
    let res = await axios.post(`/projects/${project._id}`, issue);
    
    //draw new issue from database
     drawIssue (res);
    


    })


    const drawIssue = (res) => {

         // clear and close form for new issue
    const buttonNewIssue = document.querySelector ("#buttonNewIssue");
    const descriptionNewIssue = document.querySelector ("#description");


    descriptionNewIssue.value = "";
    buttonNewIssue.click();

    // Find first row and insert new issue above that card
    const firstIssue = document.querySelector ("tbody");

    const issue = res.data;
    const createdDate = new Date (issue.createdAt);
    firstIssue.insertAdjacentHTML('beforebegin', `
        <tr>
        <td>${issue._id}</td>
        <td>${issue.description}</td>
        <td>${createdDate.toDateString()}</td>
        <td>${issue.status}</td>
        <td>${issue.priority }</td>
        <td>${issue.issueType }</td>
    </tr>

    `);
    }
