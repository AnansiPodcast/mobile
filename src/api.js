const API_BASE = 'https://anansi-spider.herokuapp.com'

class API {

  static PodcastList() {
    return fetch(`${API_BASE}/fake`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.podcasts;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

export default API
