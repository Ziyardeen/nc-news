import axios from "axios";
import randomNumberArray from "../src/utils.mjs";
const API = axios.create({
  baseURL: "https://ziyardeen-nc-news-be-project.onrender.com/api",
});

export function fetchAllArticles() {
  return API.get("/articles").then(({ data }) => {
    return data;
  });
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
    // console.log(data.article);
    return data.article;
  });
}

// fetchArticleById(2);
