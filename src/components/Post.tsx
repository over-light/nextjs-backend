import type { WebDevPost, WebDevComment, WebDevUser } from "@prisma/client";
import { useMemo } from "react";
import CommentList from "./CommentList";
type COMMENTS = (Omit<WebDevComment, "updatedAt" | "userId" | "postId"> & {
  user: WebDevUser;
})[];

type Props = {
  post: WebDevPost;
  comments: COMMENTS;
};
const Post = ({ comments, post }: Props) => {
  const commentsByParentId = useMemo(() => {
    const group: Record<string, COMMENTS> = {};
    comments?.forEach((comment) => {
      if (!comment.parentId) return [];
      if (!group[comment.parentId]) {
        group[comment.parentId] = [comment];
      } else {
        // @ts-expect-error I don't know why this is happening
        group[comment.parentId].push(comment);
      }
    });
    return group;
  }, [comments]);
  const rootComments = comments.filter((comment) => !comment.parentId);
  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <div className="comments-title">Comments</div>
      <section>
        {rootComments && rootComments.length > 0 && (
          <CommentList rootComments={rootComments} />
        )}
      </section>
    </>
  );
};

export default Post;
