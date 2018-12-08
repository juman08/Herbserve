function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var getAllRecords = function() {
$.getJSON('https://api.airtable.com/v0/appSdxV0TdPqnn5DO/Table%201?api_key=keyGo0dmDKHuhvQLS',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var id = record.id;
      var conditions = record.fields['Conditions'];
      var herbs = record.fields['Herbs'];
      var remedy = record.fields['Remedy'];
      var accessibility = record.fields['Accessibility'];
      var pictures = record.fields ['pictures'];
      html.push(listView(id, conditions, herbs, remedy, accessibility, pictures));
    });
    $('body').append(html);
  }
);
}

var getOneRecord = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appSdxV0TdPqnn5DO/Table%201/${id}?api_key=keyGo0dmDKHuhvQLS`,
    function(record){
      var html = [];
      var conditions = record.fields['Conditions'];
      var herbs = record.fields['Herbs'];
      var remedy = record.fields['Remedy'];
      var accessibility = record.fields['Accessibility'];
      var pictures = record.fields['pictures'];
      html.push(detailView(conditions, herbs, remedy, accessibility, pictures));
      $('body').append(html);
    }
  );
}

var listView = function(id, conditions, herbs, remedy, accessibility, pictures) {
  return `
  <div class="card" style="width: 18rem;">
    ${pictures ? `<img src="${pictures[0].url}">` : ``}
    <div class="card-body">
    <h5 class="card-title"><a href="index.html?id=${id}">${conditions}</h5></a>
    </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${herbs}</li>
    <li class="list-group-item">${remedy}</li>
    <li class="list-group-item">${accessibility}</li>
  </ul>
</div>
  `;
}

var detailView = function(conditions, herbs, remedy, accessibility, pictures) {
  return `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" ${picture ? `<img src="${picture[0].url}">` : ``}
    <div class="card-body">
    <h5 class="card-title"><a href="index.html?id=${id}">${conditions}</h5></a>
    </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${herbs}</li>
    <li class="list-group-item">${remedy}</li>
    <li class="list-group-item">${accessibility}</li>
  </ul>
</div>
  `;
}

var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}