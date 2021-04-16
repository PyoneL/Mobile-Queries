const apiURL = "https://localhost:44329/api/";
const getTypeOneArticleOne = () => {
    return fetch(apiURL+'ExampleOneQueries/queryOne')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const getTypeOneArticleThree = () => {
    return fetch(apiURL+'ExampleOneQueries/queryTree')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };




export {getTypeOneArticleOne, getTypeOneArticleThree};