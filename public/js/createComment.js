
    
const formCreateComment = document.querySelector ("#formCreateComment");


const drawComment = (res) => {
    
    // clear and close form for new Comment

    const bodyComment = document.querySelector ("#bodyComment");

    bodyComment.value = "";

    // Find first card and insert new comment at top
    const firstCard = document.querySelector ("#divComments");

    const comment = res.data;
    const createdData = new Date (comment.createdAt);

    firstCard.insertAdjacentHTML('afterbegin', `
            <div class="card mb-3" id="commentCard">
            <div class="card-body">
            <h5 class="card-title">
                ${userEmail} on ${createdData.toLocaleString()} 
                
            </h5>
            <p class="card-text">${comment.body}</p>
            <div class="text-start" id="buttonsComment">
                 
                  <form
                  class="d-inline"
                  action='/projects/${projectId}/issues/${issueId}/comments/${comment._id}?_method=DELETE'
                  method="POST"
                  >
                  <button class="btn btn-danger btn-sm" id="buttonDeleteIssue">Delete</button>
                  </form>
              
              </div>
            </div>
        </div>
    
    `);

}

formCreateComment.addEventListener("submit", async function(e) {
    e.preventDefault();
    // Get data from form
    let comment = new FormData(formCreateComment);

    // Send data from form
    let res = await axios.post(`/projects/${projectId}/issues/${issueId}/comments`, comment);
    
    //draw new project from database
     drawComment (res);
    


    })

    

