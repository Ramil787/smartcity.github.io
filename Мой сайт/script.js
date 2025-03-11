
DG.then(function () {
  var map = DG.map('map', {
    center: [42.873340, 74.557440], // Замените на координаты вашего города
    zoom: 10
  });

  var searchButton = document.getElementById('search-button');
  var searchInput = document.getElementById('search-input');
  var resultsDiv = document.getElementById('results');

  searchButton.addEventListener('click', function () {
    var query = searchInput.value;
    DG.ajax({
      url: 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full',
      data: {
        q: query,
        type: 'branch',
        fields: 'items.point',
        key: 'YOUR_2GIS_API_KEY' // Замените на ваш API ключ
      },
      success: function (data) {
        resultsDiv.innerHTML = '';
        if (data.result && data.result.items) {
          data.result.items.forEach(function (item) {
            var resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = item.name;
            resultsDiv.appendChild(resultItem);

            DG.marker([item.point.lat, item.point.lon]).addTo(map);

            resultItem.addEventListener('click', function () {
              // Построение маршрута
              DG.directions({
                from: DG.userLocation,
                to: [item.point.lat, item.point.lon]
              }).addTo(map);
            });
          });
        } else {
          resultsDiv.innerHTML = 'Ничего не найдено';
        }
      }
    });
  });
});

