

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


    const drawProject = (res) => {
        consoloe.log (res)
    }
