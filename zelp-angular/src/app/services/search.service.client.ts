export class SearchServiceClient {

  getSearchResult(input) {
    return fetch('yelp search result url/' + input)
      .then(response => response.json());
  }
}
