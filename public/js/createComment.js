
    
const formCreateComment = document.querySelector ("#formCreateComment");


const drawComment = (res) => {
    
    // clear and close form for new Comment

    const bodyComment = document.querySelector ("#bodyComment");

    bodyComment.value = "";

    // Find first card and insert new project above that card
    const firstCard = document.querySelector ("#cardComment");

    const comment = res.data;
    const createdData = new Date (comment.createdAt);

    firstCard.insertAdjacentHTML('beforebegin', `
            <div class="card mb-3" id="commentCard">
            <div class="card-body">
            <h5 class="card-title">
                Author on ${createdData.toLocaleString()} 
                
            </h5>
            <p class="card-text">${comment.body}</p>
            
            </div>
        </div>
    
    `);

}

formCreateComment.addEventListener("submit", async function(e) {
    e.preventDefault();
    // Get data from form
    let comment = new FormData(formCreateComment);
    console.log([...comment]);
   

    // Send data from form
    let res = await axios.post(`/projects/${projectId}/issues/${issueId}/comments`, comment);
    
    //draw new project from database
     drawComment (res);
    


    })

    

