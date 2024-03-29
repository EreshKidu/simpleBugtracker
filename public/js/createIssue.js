


const formCreateIssue = document.querySelector ("#formCreateIssue");


// formCreateIssue.addEventListener("submit", async function(e) {
    const createIssue = async (e) => {
    e.preventDefault();
    // Get data from form
    let issue = new FormData(formCreateIssue);
    
    // Send data from form
    let res = await axios.post(`/projects/${projectId}/issues`, issue);
    
    //draw new issue from database
     drawIssue (res);
    


    }


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
        <td>${issue.title}</td>
        <td>${createdDate.toDateString()}</td>
        <td>${issue.status}</td>
        <td>${issue.priority }</td>
        <td>${issue.issueType }</td>
    </tr>

    `);
    }


const buttonCreateIssue = document.querySelector ("#buttonCreateIssue");


buttonCreateIssue.addEventListener("click", async function(e) {
    
   
    // Get assigned users from database
    let users = await axios.get(`/projects/${projectId}/team`);
    users = users.data;
    
    // Clear the list of users from initial load
    const userSelect = document.querySelector ("#userSelect");
    while (userSelect.firstChild) {
        userSelect.removeChild(userSelect.firstChild);
      }

    //Populate list of users from database
    for (let user of users) {
        userSelect.insertAdjacentHTML('afterbegin', `

        
            <option value="${user._id}">${user.email}</option>
            
    
    `);
    }

    
    //draw new issue from database

    


    })