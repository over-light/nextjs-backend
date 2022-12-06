import type { WebDevComment, WebDevUser } from "@prisma/client";
const dateFormatter = Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "long",
});
type COMMENTS = (Omit<WebDevComment, "updatedAt" | "userId" | "postId"> & {
  user: WebDevUser;
})[];
type Props = {
  rootComments: COMMENTS;
};
const CommentList = ({ rootComments }: Props) => {
  return (
    <>
      {rootComments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="header">
            <span className="name">{comment.user.name}</span>
            <span className="date">
              {dateFormatter.format(Date.parse(comment.createdAt))}
            </span>
          </div>
          <div className="comment-body">{comment.message}</div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
