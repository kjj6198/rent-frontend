const simpleFormat = (str) => {
  return str.split('\n')
    .map(line => `${line}<br/>`)
    .join('');
}
function getHouses(limit = 100) {
  $.getJSON(`https://rent-search.herokuapp.com/search?limit=${limit}`)
    .then((data, status) => {
      document.querySelector('.datas').innerHTML = data.houses
        .map(house => {
          house.photos = house.photos
            .split(',')
            .map(s => s.replace(/"/g, ''))
            .map(src => `<img src="${src}" style="max-width:100%"/>`)
            .join('');
          return house;
        })
        .filter(d => d.details.some(dd => dd.indexOf('性別要求：男女生皆可') > -1))
        .filter(d => d.details.some(dd => dd.indexOf('開伙：可以') > -1))
        .map(data => {
          return `
            <div class="card">
              <h2>${data.title}</h2>
              <div class="card-images owl-carousel owl-theme">
                ${data.photos}
              </div>
              <p>${data.landlordInfo}</p>
              <p><strong class="number">${data.price}</strong></p>
              <p>${simpleFormat(data.houseDetail.join('\n'))}</p>
              <p>${data.details.map(d => d.indexOf('開伙：可以') === -1 ? d : `<strong class="focus">${d}</strong>`).join('\n')}</p>
              <a href="${data.url}" taget="_blank">連結</a>
            </div>
          `;
        })
        .join('')

        $('.card-images').owlCarousel({
          autoplay: true,
          responsive: {
            0: {
              items: 1
            },
            768: {
              items: 3
            },
            1024: {
              items: 4
            }
          },
          lazyLoad: true
        });
    });

}

$.getJSON('https://rent-search.herokuapp.com/search')
  .then((data, status) => {
    document.querySelector('.datas').innerHTML = data.houses
      .map(house => {
        house.photos = house.photos
          .split(',')
          .map(s => s.replace(/"/g, ''))
          .map(src => `<img src="${src}" style="max-width:100%"/>`)
          .join('');
        return house;
      })
      .filter(d => d.details.some(dd => dd.indexOf('性別要求：男女生皆可') > -1))
      .filter(d => d.details.some(dd => dd.indexOf('開伙：可以') > -1))
      .map(data => {
        return `
          <div class="card">
            <h2>${data.title}</h2>
            <div class="card-images owl-carousel owl-theme">
              ${data.photos}
            </div>
            <p>${data.landlordInfo}</p>
            <p><strong class="number">${data.price}</strong></p>
            <p>${simpleFormat(data.houseDetail.join('\n'))}</p>
            <p>${data.details.map(d => d.indexOf('開伙：可以') === -1 ? d : `<strong class="focus">${d}</strong>`).join('\n')}</p>
            <a href="${data.url}" target="_blank">連結</a>
          </div>
        `;
      })
      .join('')

      $('.card-images').owlCarousel({
        autoplay: true,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 3
          },
          1024: {
            items: 4
          }
        },
        lazyLoad: true
      });
  });
