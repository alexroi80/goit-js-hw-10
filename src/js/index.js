import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader-msg');
const catInfoEl = document.querySelector('.cat-info');

loaderEl.hidden = false;

fetchBreeds()
  .then(data => {
    renderBreeds(data);
  })
  .catch(error =>{
    loaderEl.hidden = true;
    Notiflix.Notify.failure(
      ' Oops! Something went wrong! Try reloading the page!', {
        timeout: 6000,
      }
    )
  }
  );

function renderBreeds(data) {
  const optionList = data
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  loaderEl.hidden = true;
  selectEl.hidden = false;
  selectEl.innerHTML = `<option data-placeholder="true"></option>`;
  selectEl.insertAdjacentHTML('beforeend',optionList);

  new SlimSelect({
    select: '.breed-select',
    settings: {
      contentPosition: 'absolute',
      placeholderText: 'Select breed...',
    },
  });
}

selectEl.addEventListener('change', onSelect);

function onSelect(evt) {
  const breedId = evt.target.value;
  loaderEl.hidden = false;
  fetchCatByBreed(breedId)
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      loaderEl.hidden = true;
      Notiflix.Notify.failure(
        ' Oops! Something went wrong! Try reloading the page!', {
          timeout: 6000,
        }
      )
    }
    );
}

function createMarkup(arr) {
  const markup = arr
    .map(({breeds:{[0]: { name, temperament, description }}, url }) => {
      return `<img src="${url}" alt="${name}" width=400px>
  <div class = "cat-descr">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p>
  </div>`;
    })
    .join('');
  loaderEl.hidden = true;
  catInfoEl.innerHTML = '';
  catInfoEl.insertAdjacentHTML('afterbegin', markup);
}
