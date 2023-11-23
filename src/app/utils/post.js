import { Pool } from "pg";

import { getLikes } from "@app/utils/like";
import { getDislikes } from "@app/utils/dislike";
import { getSaves } from "@app/utils/save";

export async function getPosts(user_id) {
  const client = new Pool();
  const posts = (
    await client.query(
      "SELECT p.id, p.user_id, u.email, u.firstname, u.lastname, p.content, p.create_date, p.anonymous FROM public.post AS p JOIN public.user AS u ON p.user_id = u.id ORDER BY p.create_date DESC;"
    )
  ).rows;
  await Promise.all(
    posts.map(async (post, index) => {
      posts[index] = {
        ...post,
        likes: (await getLikes(post.id)).map((like) => like.user_id),
        dislikes: (await getDislikes(post.id)).map(
          (dislike) => dislike.user_id
        ),
        saves: (await getSaves(post.id)).map((save) => save.user_id),
      };
    })
  );
  await client.end();

  return posts.map((post) =>
    user_id === post.user_id
      ? {
          id: post.id,
          user_id: post.user_id,
          email: post.email,
          firstname: post.firstname,
          lastname: post.lastname,
          content: post.content,
          date: post.create_date,
          anonymous: post.anonymous,
          likes: post.likes,
          dislikes: post.dislikes,
          saves: post.saves,
        }
      : post.anonymous
      ? {
          id: post.id,
          content: post.content,
          date: post.create_date,
          anonymous: post.anonymous,
          likes: post.likes,
          dislikes: post.dislikes,
          saves: post.saves,
        }
      : {
          id: post.id,
          user_id: post.user_id,
          email: post.email,
          firstname: post.firstname,
          lastname: post.lastname,
          content: post.content,
          date: post.create_date,
          anonymous: post.anonymous,
          likes: post.likes,
          dislikes: post.dislikes,
          saves: post.saves,
        }
  );
}
