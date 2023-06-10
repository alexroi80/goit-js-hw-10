const API_KEY= 'live_3P9UwArsHSOsxwN1ezuHD9KJ5BrD65DXxb07hU6UxNobVO19bP5UDiUIbFKKBEoG';

function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`).then(resp => {
  if (!resp.ok) {
      throw new Error(`Oops! Something went wrong! Try reloading the page!`);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(`Oops! Something went wrong! Try reloading the page!`);
      }
      return resp.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
