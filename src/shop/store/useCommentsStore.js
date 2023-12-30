import { create } from "zustand";
import { getComment, addComment } from "../controllers/commentsController";

const useCommentStore = create((set) => ({
  comments: [],
  isCommentsLoading: false,
  showMore: false,
  limit: 5,
  totalComments: 0,

  fetchComments: async (productId) => {
    set({ isCommentsLoading: true });
    const { comments, totalComments } = await getComment(productId, 5); // Get the first 5 comments
    set({
      comments,
      totalComments,
      isCommentsLoading: false,
      showMore: totalComments > 5,
    });
  },

  loadMoreComments: async (productId) => {
    set({ isCommentsLoading: true });
    const { comments, totalComments } = await getComment(productId);
    set((state) => ({
      comments,
      totalComments,
      isCommentsLoading: false,
      showMore: totalComments > state.comments.length + state.limit,
    }));
  },

  addComment: async (comment, productId, commentFeildRef) => {
    await addComment(comment, productId)
      .then((newComment) => {
        set((state) => ({ comments: [...state.comments, newComment] }));
      })
      .finally(() => {
        commentFeildRef.current.value = "";
      });
  },
}));

export default useCommentStore;
