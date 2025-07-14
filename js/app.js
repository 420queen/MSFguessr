function startGame() {
    // Setup
    var round = 1;
    var points = 0;
    var roundScore = 0;
    var totalScore = 0;
    var distance;
    var detailPic = '';
    var explainerText = '';
    var locationsPool = [];

    // Init maps and load locations
    window.fetch('locations.json')
        .then(function(response){ return response.json(); })
        .then(function(data){
            locationsPool = shuffleArray(data).slice(0,5);
            svinitialize();
            mminitialize();
        })
        .catch(function(err){
            console.warn('Fetch Error :-S', err);
        });

    // Event bindings
    $('#guessButton').click(function (){
        doGuess();
    });

    $('#roundEnd').on('click', '.detailBtn', function () {
        $('#roundEnd').addClass('show-details');
    });

    $('#roundEnd').on('click', '.backBtn', function () {
        $('#roundEnd').removeClass('show-details');
    });

    $('#roundEnd').on('click', '.nextBtn', function () {
        proceedToNextRound();
    });

    $('#endGame').on('click', '.playAgain', function () {
        window.location.reload();
    });

    function proceedToNextRound(){
        $('#roundEnd').fadeOut(500, function(){
            $('#roundEnd').removeClass('show-details').css('height', 'auto');
        });
        $('#overlay').fadeOut();
        $('#scoreBoard').show();

        if (round < 5){
            round++;
            roundScore = points;
            totalScore += roundScore;

            $('.round').html('Manche en cours: <b>'+round+'/5</b>');
            $('.roundScore').html('Score précédent: <b>'+roundScore+'</b>');
            $('.totalScore').html('Score total: <b>'+totalScore+'</b>');

            document.getElementById('image').src = "";

            svinitialize();
            guess2.setLatLng({lat: -999, lng: -999});
            // clear previous guess so player must click again
            window.guessLatLng = undefined;
            mymap.setView([0, 0], 2);

        } else {
            endGame();
        }
    }

    function calcDistance(lat1, lng1, lat2, lng2) {
        var R = 6371; // km
        var dLat = toRad(lat2-lat1);
        var dLng = toRad(lng2-lng1);
        var rLat1 = toRad(lat1);
        var rLat2 = toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(rLat1) * Math.cos(rLat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    function doGuess(){
        if (!window.guessLatLng || !('lat' in window.guessLatLng) || !window.actualLatLng || !('lat' in window.actualLatLng)) {
    	console.warn("Missing guess or actual location");
  	console.log("GuessLatLng:", window.guessLatLng);
    	console.log("ActualLatLng:", window.actualLatLng);
    	return;
	}


        distance = Math.ceil(
            calcDistance(
                window.actualLatLng.lat,
                window.actualLatLng.lng,
                window.guessLatLng.lat,
                window.guessLatLng.lng
            )
        );

        var earthCircumference = 40075.16;
        var x = 2.00151 - (distance / (earthCircumference / 4));
        points = Math.round(
            2100 * (
                (1 / (1 + Math.exp(-4 * x + 5.2))) +
                (1 / (Math.exp(-8 * x + 17.5))) +
                (1 / (Math.exp(-30 * x + 61.2))) +
                (500 / (Math.exp(-250 * x + 506.7)))
            )
        );

        roundScore = points;

        endRound();
    }

    function endRound(){
        var content = '';
        if (typeof distance === 'undefined') {
            content = '<div class="slider">'+
                      '<div id="resultContent" class="pane"><p>You didn\'t make a guess!<br/><br/><button class="btn btn-primary detailBtn" type="button">Continue</button></p></div>'+
                      '<div id="detailContent" class="pane"><h2>'+window.locName+'</h2><img src="'+detailPic+'" class="detailPic"/><p>'+explainerText+'</p><button class="btn btn-secondary backBtn" type="button">Retour</button><button class="btn btn-primary nextBtn" type="button">prochaine manche</button></div>'+
                      '</div>';
            points = 0;
        } else {
            content = '<div class="slider">' +
  '<div id="resultContent" class="pane">' +
    '<p>Ton estimation est à<br/>'+
    '<h1><strong><span class="highlight">' + distance + ' km</span></strong></h1></p>' +
    '<p>du lieu recherché :</p>' +
    '<h2>' + window.locName + '</h2>' +
    '<div id="roundMap"></div><br/>' +
    '<p>Tu remportes</p>' +
    '<h1>' + roundScore + ' points</h1>' +
    '<p>pour ce round !</p><br/>' +
    '<button class="btn btn-primary detailBtn" type="button">Continuer</button>' +
  '</div>' +
  '<div id="detailContent" class="pane">' +
    '<h2>' + window.locName + '</h2>' +
    '<img src="' + detailPic + '" class="detailPic"/>' +
    '<p>' + explainerText + '</p>' +
    '<button class="btn btn-secondary backBtn" type="button">Retour</button>' +
    '<button class="btn btn-primary nextBtn" type="button">Prochaine manche</button>' +
  '</div>' +
'</div>';
        }

        $('#roundEnd').html(content);
        rminitialize();

        setTimeout(function(){
            $('#roundEnd').css({display: 'block', opacity: 0});
            var h = $('#resultContent').outerHeight();
            $('#roundEnd').height(h).animate({opacity: 1}, 200, function(){
                if (typeof roundmap !== 'undefined') {
                    roundmap.invalidateSize();
                    roundmap.fitBounds(L.latLngBounds(guess.getLatLng(), actual.getLatLng()), {padding: [50, 50]});
                }
            });
        }, 50);

        $('#overlay').fadeIn();
        $('#scoreBoard').hide();
    }

    function endGame(){
        roundScore = points;
        totalScore += points;

        $('#miniMap, #pano, #guessButton, #scoreBoard').hide();
        $('#endGame').html(
 	 '<h1>Félicitations !</h1>' +
 	 '<h2>Voici ton score final:</h2>' +
 	 '<h1><span class="highlight">' + totalScore + ' points</span></h1>' +
 	 '<br/>' +
 	 '<button class="btn btn-large btn-success playAgain" type="button">Nouvelle partie ?</button>'
	);

	$('#endGame').fadeIn(500); 

        window.finished = true;
    }

    function svinitialize() {
        if (locationsPool.length === 0) {
            console.warn('No locations available');
            return;
        }

        var place = locationsPool.shift();

        document.getElementById('image').src = place.image;
        window.actualLatLng = {
            lat: place.lat,
            lng: place.lng
        };
        window.locName = place.label;
        detailPic = place["detail-picture"] || '';
        explainerText = place.explainer || '';
    }

    function shuffleArray(arr){
        for(var i = arr.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }
}

$(document).ready(function(){
    $('#startButton').on('click', function(){
        $('#welcomeScreen').fadeOut(500, function(){
            startGame();
        });
    });
});