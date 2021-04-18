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
    return fetch(apiURL+'ExampleOneQueries/queryThree')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getTypeOneArticleTwo = (distance) => {
    return fetch(apiURL+"ExampleOneQueries/queryTwo", {
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({distance: distance})
    }).then((response) => response.json())
    .then((json) => {
      return  json;
    }).catch((error) => {
      console.log(error);
    });
  }


  const getTypeThreeArticleThree = () => {
    return fetch(apiURL+'ExampleThreeQueries/queryThree')
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };




export {getTypeOneArticleOne,getTypeOneArticleTwo, getTypeOneArticleThree,getTypeThreeArticleThree};