const deleteUser = async (userId) => {
    console.log (userId);
    let users = await axios.post(`/projects/${projectId}/team/${userId}?_method=DELETE`);

    //Delete that user from UI without refreshing page
    const rowDeletedUser = document.querySelector (`#user${userId}`);
    rowDeletedUser.remove();



}