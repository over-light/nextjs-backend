import { WebDevPost } from "@prisma/client";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { RTQ_VARIABLES } from "../constant";
import { trpc } from "../utils/trpc";
type COMMENT_TYPE = {
  id: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
  message: string;
  parentId: string | null;
};
type ContextProps = {
  post: {
    title: string | undefined;
    comments: COMMENT_TYPE[] | undefined;
    body: string | undefined;
    id: string;
  };
  rootComments: COMMENT_TYPE[] | undefined;
  getReplies: (parentId: number) => COMMENT_TYPE[] | undefined;
  createLocalComment: (comment: COMMENT_TYPE) => void;
  updateLocalComment: (id: string, message: string) => void;
  deleteLocalComment: (id: string) => void;
  toggleLocalCommentLike: (id: string, addLike: boolean) => void;
};

export const PostContext = createContext<ContextProps>({} as ContextProps);

export function usePost() {
  return useContext(PostContext);
}
type Props = {
  children: ReactNode;
};
export function PostProvider({ children }: Props) {
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: post,
    isLoading,
    error,
  } = trpc.comments.getPostById.useQuery(
    { id: id as string },
    { ...RTQ_VARIABLES, enabled: !!id }
  );
  const [comments, setComments] = useState<COMMENT_TYPE[]>([]);
  const commentsByParentId = useMemo(() => {
    const group: Record<string, COMMENT_TYPE[]> = {};
    comments.forEach((comment) => {
      group[comment.parentId ?? "-1"] ||= [];
      group[comment.parentId ?? "-1"].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    if (post?.comments == null) return;
    setComments(post.comments);
  }, [post?.comments]);

  function getReplies(parentId: number): COMMENT_TYPE[] | undefined {
    return commentsByParentId[parentId];
  }

  function createLocalComment(comment: COMMENT_TYPE) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(id: string, message: string) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(id: string) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== id);
    });
  }

  function toggleLocalCommentLike(id: string, addLike: boolean) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (id === comment.id) {
          if (addLike) {
            return {
              ...comment,
              likeCount: comment.likeCount + 1,
              likedByMe: true,
            };
          } else {
            return {
              ...comment,
              likeCount: comment.likeCount - 1,
              likedByMe: false,
            };
          }
        } else {
          return comment;
        }
      });
    });
  }

  return (
    <PostContext.Provider
      value={{
        post: { id, ...post },
        rootComments: commentsByParentId["-1"],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
      }}
    >
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1 className="error-msg">{error.message}</h1>
      ) : (
        children
      )}
    </PostContext.Provider>
  );
}
