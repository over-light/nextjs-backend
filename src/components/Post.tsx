import { type WebDevComment } from "@prisma/client";

type Props = {
  comments: Omit<
    WebDevComment,
    | "id"
    | "message"
    | "createdAt"
    | "updatedAt"
    | "userId"
    | "parentId"
    | "postId"
  >[];
};
const Post = ({ comments }: Props) => {
  return <div>Post</div>;
};

export default Post;
