//============================ Backend Logic =====================
  function Movie(title, genre, age, poster) {
    this.title = title;
    this.genre = genre;
    this.age = age;
    this.times = [];
    this.poster = poster;
  }

  var dieHard = new Movie("Die Hard", "action", 17, "<img src='img/dieHard.jpg' class='poster img-responsive'>");
  dieHard.times.push("5pm", "7pm", "9pm");
  var findingNemo = new Movie("Finding Nemo", "kids", 0, "<img src='img/findingNemo.jpg' class='poster img-responsive'>");
  findingNemo.times.push("12pm", "3pm", "6pm");
  var princessBride = new Movie("The Princess Bride", "comedy", 0, "<img src='img/princessBride.jpg' class='poster img-responsive'>");
  princessBride.times.push("2pm", "4pm", "6pm", "8pm");

  var movies = [];
  movies.push(dieHard, findingNemo, princessBride);

  //================ Filter functions ===============================
  function filterAge(userInput, moviesList) {
    var suggestions = [];
    if(userInput === "") {
      userInput = 18;
    }
  	moviesList.forEach(function(movie) {
    	if(movie.age < parseInt(userInput)) {
      	suggestions.push(movie);
      }
    });
    return suggestions;
  }

  function convertTime(time) {
    var timeNumber = parseInt(time);
    var timeSuffix = time.charAt(time.length-2) + time.charAt(time.length-1);
    if(time.length >= 5 || timeNumber > 12) {
      timeNumber = "error";
    }
    else if(time.length >= 1) {
      if(timeNumber === 12) {
        timeNumber = 0;
      }
      if(timeSuffix === "pm") {
        timeNumber+=12;
      }
      else if(timeSuffix === "am") {
        timeNumber = timeNumber;
      }
      else {
        timeNumber = "error";
      }
    }
    else if(time.length === 0) {
      timeNumber = timeNumber;
    }
    return timeNumber;
  }

  function filterTime(startTime, endTime, moviesList) {
    var suggestions = [];
    if(startTime === "") {
      startTime = "0am";
    }
    if(endTime === "") {
      endTime = "11pm";
    }
    moviesList.forEach(function(movie) {
      var times = [];
      movie.times.forEach(function(time){
        if(convertTime(time) >= convertTime(startTime) && convertTime(time) <= convertTime(endTime)) {
          times.push(" " + time);
        }
      })
      if(times.length > 0) {
        suggestions.push({title:movie.title, times:times, poster:movie.poster});
      }
    })
    return suggestions;
  }

  function filterGenre(genre, moviesList) {
    var suggestions = [];
    moviesList.forEach(function(movie) {
      if(genre === "") {
        suggestions.push(movie);
      }
      else if(movie.genre === genre) {
        suggestions.push(movie);
      }
    });
    return suggestions;
  }


//==================== Front End ===============================
$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    $('#movies').children().remove();
    var startTime = $('input#startTime').val();
    var endTime = $('input#endTime').val();
    var genre = $('input#genre').val();
    var age = $('input#age').val();
    var suggestedMovies = filterTime(startTime, endTime, filterAge(age,filterGenre(genre, movies)));

    suggestedMovies.forEach(function(movie) {
      $('#movies').append("<div class='col-md-4'>" + movie.poster +"<li class='title'>" + movie.title + ": " + movie.times + "</li></div>");
    });
    $('#endTime').parent().removeClass('has-error');
    $('#startTime').parent().removeClass('has-error');
    $('#endTimeError').hide();
    $('#startTimeError').hide();
    $('input#startTime').val('');
    $('input#endTime').val('');
    $('input#genre').val('');
    $('input#age').val('');
    if(convertTime(endTime) === "error") {
      $('#endTime').parent().addClass('has-error');
      $('#endTimeError').show();
    }
    if(convertTime(startTime) === "error") {
      $('#startTime').parent().addClass('has-error');
      $('#startTimeError').show();
    }
  });


  // inputs.forEach(function(input) {
  //   var input = $("'input#"+input+"'").val();
  // });











});
