$(document).ready(function() {
  $('.modal').modal();
  $('input#title').characterCounter();
  $('#publicarMessage').on('click', function() {
    let title = $('#title').val();
    let message = $('#message').val();
    if (title.length !== 0 && message.length !== 0) {
      let output = ` <div class="row">
    <div class="col s12 offset-l3 l6">
      <div class="card grey lighten-5">
        <div class="card-content black-text">
          <span class="card-title">${title}</span>
          <p>${message}</p>
        </div>
      </div>
    </div>
  </div>`;
      $('.containerPublish').prepend(output);
    } else {
      alert('No hay registro');
    } $('#title').val('');
    $('#message').val('');
  });
  function handleFileSelect(evt) {
    var files = evt.target.files; 
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb responsive-img" src="', e.target.result,
            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  $('#publishImage').on('click', function() {
    let titleImage = $('#titleImage').val();
    let image = $('.thumb').attr('src');
    let output = '';
    if (titleImage.length !== 0 && image.length !== 0) {
      let output = ` <div class="row">
      <div class="col s12 offset-l3 l6">
        <div class="card grey lighten-5">
          <div class="card-content black-text">
            <span class="card-title">${titleImage}</span>
            <img class="thumb responsive-img" src="${image}">
          </div>
        </div>
      </div>
    </div>`;
      $('.containerPublish').prepend(output);
    } else {
      alert('No hay registro');
    }$('#titleImage').val('');
    $('#files').val('');
  });
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  function geoFindMe() {
    let container = $('#map');
    if (!navigator.geolocation) {
      alert('Su navegador no soporta geolocalización');
      return;
    }
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var img = new Image();
      img.src = 'http://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zoom=13&size=300x300&sensor=false';
      $('.imgMap').attr('src', `${img.src}`);
    };
    function error() {
      alert('No se pudo Ubicar evento');
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }
  $('#publicarEvent').on('click', function() {
    let date = $('#date').val();
    let titleEvent = $('#titleEvent').val();
    geoFindMe();
    if (date.length !== 0 && titleEvent.length !== 0) {
      let output = ` <div class="row">
      <div class="col s12 offset-l3 l6">
        <div class="card grey lighten-5">
          <div class="card-content black-text">
            <p><span class="card-title">${titleEvent}</span></p>
            <p>${date}</p>
            <p id="map"><img class="imgMap" src=""></p>
         </div>
        </div>
      </div>
    </div>`;
      $('.containerPublish').prepend(output);
    } else {
      alert('No hay registro');
    }
  });
  $('#fileMultimedia').on('change', function() {
    if (this.files && this.files[0]) {
      if (this.files[0].type.match('audio/*')) {
        var archivo = new FileReader();
        archivo.onload = function(e) {
          $('#publishMultimedia').on('click', function() {
            let multimedia = e.target.result;
            let output = ` <div class="row">
          <div class="col s12 offset-l3 l6">
            <div class="card grey lighten-5">
              <div class="card-content black-text">
              <audio controls>
              <source src="${multimedia}" type="audio/ogg">
              </audio>
                <p id="map"><img class="imgMap" src=""></p>
             </div>
            </div>
          </div>
        </div>`;
            $('.containerPublish').prepend(output);
          });
        };
      } else if (this.files[0].type.match('video/*')) {
        var archivo = new FileReader();
        archivo.onload = function(e) {
          $('#publishMultimedia').on('click', function() {
            let multimedia = e.target.result;
            let titleMultimedia = $('#titleMultimedia').val();
            let output = `<div class="row">
            <div class="col s12 offset-l3 l6">
              <div class="card grey lighten-5">
                <div class="card-content black-text">
                <p><span class="card-title">${titleMultimedia}</span></p>
                <video width="320" height="240" controls>
                <source src="${multimedia}" type="video/mp4">
                </video>
               </div>
              </div>
            </div>
          </div>`;
            $('.containerPublish').prepend(output);
          });
        };
      }
    }
    archivo.readAsDataURL(this.files[0]);
  });
});