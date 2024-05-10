import axios from "axios";
import randomNumberArray from "../src/utils.mjs";
const API = axios.create({
  baseURL: "https://ziyardeen-nc-news-be-project.onrender.com/api",
});

export function fetchAllArticles(topic, selectedOrder, selectedSort) {
  if (topic) {
    return API.get(`articles/?topic=${topic}`).then(({ data }) => {
      return data;
    });
  } else if (selectedOrder && selectedSort) {
    return API.get(
      `/articles?sort_by=${selectedSort}&order=${selectedOrder}`
    ).then(({ data }) => {
      console.log(data);
      return data;
    });
  } else {
    return API.get(`/articles`).then(({ data }) => {
      console.log(data);
      return data;
    });
  }
}

export function fetchRandomArticles() {
  return API.get("/articles")
    .then(({ data }) => {
      return data;
    })
    .then((articles) => {
      const num = articles.length - 1;
      const randomIndexes = randomNumberArray(num);

      return articles.filter((article, index) => {
        return randomIndexes.includes(index);
      });
    })
    .then((random) => {
      return random;
    });
}

export function fetchArticleById(article_id) {
  return API.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
}

export function fetchCommentsByArticleId(article_id) {
  return API.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
}

export function updateVotesById(article_id, vote) {
  return API.patch(`/articles/${article_id}`, { inc_votes: vote }).then(
    ({ data }) => {
      return data;
    }
  );
}

export function postCommentsById(article_id, name, comment) {
  return API.post(`/articles/${article_id}/comments`, {
    username: name,
    body: comment,
  }).then(({ data }) => {
    return data;
  });
}

export function deleteCommentById(comment_id) {
  return API.delete(`/comments/${comment_id}`)
    .then(() => {
      console.log("Post deleted successfully");
      return;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function fetchUserNames() {
  return API.get("/users").then(({ data }) => {
    return data;
  });
}

export function fetchTopics() {
  return API.get("/topics").then(({ data }) => {
    return data;
  });
}
