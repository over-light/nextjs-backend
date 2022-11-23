import type { WebDevComment, WebDevUser } from "@prisma/client";

type COMMENTS = (Omit<
  WebDevComment,
  "createdAt" | "updatedAt" | "userId" | "postId"
> & { user: WebDevUser })[];
type Props = {
  rootComments: COMMENTS;
};
const CommentList = ({ rootComments }: Props) => {
  return (
    <>
      {rootComments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-body">{comment.message}</div>
          <div className="comment-author">{comment.user.name}</div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
