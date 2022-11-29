const deleteUser = async (userId) => {
    console.log (userId);
    let users = await axios.post(`/projects/${projectId}/team/${userId}?_method=DELETE`);

    const rowDeletedUser = document.querySelector (`#user${userId}`);
    rowDeletedUser.remove();



}