const deleteComment = async (commentId) => {
    console.log (commentId);
    let comments = await axios.post(`/projects/${projectId}/issues/${issueId}/comments/${commentId}?_method=DELETE`);

    const rowDeletedComment = document.querySelector (`#comment${commentId}`);
    rowDeletedComment.remove();



}