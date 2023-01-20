   
const formUploadImages = document.querySelector ("#formUploadImages");

formUploadImages.addEventListener("submit", async function(e) {
    e.preventDefault();
    // Get data from form
    let image = new FormData(formUploadImages);

    // Send data from form and get response
    let res = await axios.post(`/projects/${projectId}/issues/${issueId}?_method=PUT`, image);


    

    
    //draw new project from database
      drawImages (res.data);
    


    })


const drawImages = (images) => {
    const carouselImages = document.querySelector ("#carouselImages");

    while (carouselImages.firstChild) {
        carouselImages.removeChild(carouselImages.firstChild);
      }

    let state="";
    

    for (let i =0; i < images.length; i++) {
        if (i===0) {
            state='active';
        } else {
            state = '';
        }

        carouselImages.insertAdjacentHTML('afterbegin', `

        
        <div class="carousel-item  ${state}">
  
        <a href="${images[i].url}" data-toggle="lightbox"> 
          <img src="${images[i].url}" class="d-block w-50 h-50 mx-auto img-fluid" alt="...">
        </a>
      </div>
            
    
    `);
    }

}
    
    



