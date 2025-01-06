export const fetchChapter = () => {
    // const response = await axios.get(`/api/chapters/${chapterId}`);
    // return response.data;
    return  {
        "id": "chapter_1",
        "title": "Chapter 1: Beginnings",
        "pages": ["page_1", "page_2"]
    }
};

export const fetchPage = () => {
    // const response = await axios.get(`/api/pages/${pageId}`);
    // return response.data;
    return {
        "id": "page_1",
        "content": "Once upon a time..."
    }
}