export const EDITOR_EMPTY_STATE = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

export const getPageRoute = ({ storyId, pageId }:{ storyId: string, pageId:string }) => `/stories/${storyId}/edit/${pageId}`