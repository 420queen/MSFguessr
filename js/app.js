function startGame() {
    let round = 1;
    let points = 0;
    let roundScore = 0;
    let totalScore = 0;
    let distance;
    let detailPic = '';
    let explainerText = '';
    let locationsPool = [];

    // Load locations and initialize maps
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

    // Button bindings
    $('#guessButton').click(() => doGuess());

    $('#roundEnd').on('click', '.detailBtn', () => {
        $('#roundEnd').addClass('show-details');
    });

    $('#roundEnd').on('click', '.backBtn', () => {
        $('#roundEnd').removeClass('show-details');
    });

    $('#roundEnd').on('click', '.nextBtn', () => {
        proceedToNextRound();
    });

    $('#endGame').on('click', '.playAgain', () => {
        window.location.reload();
    });

    function proceedToNextRound() {
        $('#roundEnd').fadeOut(500, function () {
            $('#roundEnd').removeClass('show-details').css('height', 'auto');
        });
        $('#overlay').fadeOut();
        $('#scoreBoard').show();

        if (round < 5) {
            round++;
            roundScore = points;
            totalScore += roundScore;

            $('.round').html(`Manche en cours: <b>${round}/5</b>`);
            $('.roundScore').html(`Score précédent: <b>${roundScore}</b>`);
            $('.totalScore').html(`Score total: <b>${totalScore}</b>`);

            document.getElementById('image').src = "";

            svinitialize();
            guess2.setLatLng([-999, -999]);
            window.guessLatLng = undefined;
            mymap.setView([0, 0], 2);
        } else {
            endGame();
        }
    }

    function calcDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const rLat1 = toRad(lat1);
        const rLat2 = toRad(lat2);

        const a = Math.sin(dLat / 2) ** 2 +
                  Math.sin(dLng / 2) ** 2 * Math.cos(rLat1) * Math.cos(rLat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function toRad(val) {
        return val * Math.PI / 180;
    }

    function doGuess() {
        if (!window.guessLatLng || !('lat' in window.guessLatLng) ||
            !window.actualLatLng || !('lat' in window.actualLatLng)) {
            console.warn("Coordonnées manquantes");
            console.log("guessLatLng:", window.guessLatLng);
            console.log("actualLatLng:", window.actualLatLng);
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

        const earthCircumference = 40075.16;
        const x = 2.00151 - (distance / (earthCircumference / 4));

        points = Math.round(
            2100 * (
                1 / (1 + Math.exp(-4 * x + 5.2)) +
                1 / Math.exp(-8 * x + 17.5) +
                1 / Math.exp(-30 * x + 61.2) +
                500 / Math.exp(-250 * x + 506.7)
            )
        );

        roundScore = points;

        endRound();
    }

    function endRound() {
        let content = '';

        if (typeof distance === 'undefined') {
            content = `
                <div class="slider">
                    <div id="resultContent" class="pane">
                        <p>Tu n'as pas fait de localisation !<br/><br/>
                        <button class="btn btn-primary detailBtn" type="button">Continuer</button></p>
                    </div>
                    <div id="detailContent" class="pane">
                        <h2>${window.locName}</h2>
                        <img src="${detailPic}" class="detailPic"/>
                        <p>${explainerText}</p>
                        <button class="btn btn-secondary backBtn" type="button">Retour</button>
                        <button class="btn btn-primary nextBtn" type="button">Prochaine manche</button>
                    </div>
                </div>`;
            points = 0;
        } else {
            content = `
                <div class="slider">
                    <div id="resultContent" class="pane">
                        <p>Ton estimation est à</p>
                        <h1><strong><span class="highlight">${distance} km</span></strong></h1>
                        <p>du lieu recherché :</p>
                        <h2>${window.locName}</h2>
                        <div id="roundMap"></div><br/>
                        <p>Tu remportes</p>
                        <h1>${roundScore} points</h1>
                        <p>pour ce round !</p><br/>
                        <button class="btn btn-primary detailBtn" type="button">Continuer</button>
                    </div>
                    <div id="detailContent" class="pane">
                        <h2>${window.locName}</h2>
                        <img src="${detailPic}" class="detailPic"/>
                        <p>${explainerText}</p>
                        <button class="btn btn-secondary backBtn" type="button">Retour</button>
                        <button class="btn btn-primary nextBtn" type="button">Prochaine manche</button>
                    </div>
                </div>`;
        }

        $('#roundEnd').html(content);
        rminitialize();

        setTimeout(() => {
            $('#roundEnd').css({ display: 'block', opacity: 0 });
            const h = $('#resultContent').outerHeight();
            $('#roundEnd').height(h).animate({ opacity: 1 }, 200, () => {
                if (typeof roundmap !== 'undefined') {
                    roundmap.invalidateSize();
                    roundmap.fitBounds(L.latLngBounds(guess.getLatLng(), actual.getLatLng()), { padding: [50, 50] });
                }
            });
        }, 50);

        $('#overlay').fadeIn();
        $('#scoreBoard').hide();
    }

    function endGame() {
        roundScore = points;
        totalScore += points;

        $('#miniMap, #pano, #guessButton, #scoreBoard').hide();
        $('#endGame').html(`
            <h1>Félicitations !</h1>
            <h2>Voici ton score final :</h2>
            <h1><span class="highlight">${totalScore} points</span></h1><br/>
            <button class="btn btn-large btn-success playAgain" type="button">Nouvelle partie ?</button>
        `);
        $('#endGame').fadeIn(500);
        window.finished = true;
    }

    function svinitialize() {
        if (locationsPool.length === 0) {
            console.warn('Plus de lieux à afficher');
            return;
        }

        const place = locationsPool.shift();
        document.getElementById('image').src = place.image;
        window.actualLatLng = {
            lat: place.lat,
            lng: place.lng
        };
        window.locName = place.label;
        detailPic = place["detail-picture"] || '';
        explainerText = place.explainer || '';
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

$(document).ready(function () {
    $('#startButton').on('click', function () {
        $('#welcomeScreen').fadeOut(500, function () {
            startGame();
        });
    });
});
