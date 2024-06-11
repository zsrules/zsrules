$(document).ready(function(){

    let matchTime = 120;
    let currentTime = matchTime;
    let display = $('#timer');
    let counting = false;

    let startAudio = new Audio('soundeffects/Start.mp3');
    let stopAudio = new Audio('soundeffects/Stop.wav');
    let endAudio = new Audio('soundeffects/End.wav');

    let redScore = 0;
    let blueScore = 0;

    let redScoreDisplay = $('#red .score p');
    let blueScoreDisplay = $('#blue .score p');

    function count() {
        minutes = parseInt(currentTime / 60, 10);
        seconds = parseInt(currentTime % 60, 10);

        minutes = minutes < 10 ? "" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        (display).text(minutes + ":" + seconds);

        
        if (counting == true) {
            if (--currentTime < 0) {
                currentTime = 0;
                counting = false;
                endAudio.play();
            }
    
            setTimeout(count, 1000);
        }
    }
    
    $('#btn-start').on('click', function() {
        if (counting == false) {
            startAudio.play();
            counting = true;
            count();
        }
    });

    $('#btn-stop').on('click', function() {
        if (counting == true) {
            stopAudio.play();
            currentTime++;
            counting = false;
        }
        count();
    });

    $('#btn-reset').on('click', function() {
        counting = false;
        currentTime = matchTime;
        redScore = 0;
        blueScore = 0;
        scoreUpdate();
        count();
    });

    function scoreUpdate () {
        redScoreDisplay.text(redScore);
        blueScoreDisplay.text(blueScore);
    }

    function addScore(score, color) {
        
        if (color == 'red') {
            redScore += score;
        } else {
            blueScore += score;
        }

        scoreUpdate();
    }

    $(document).on('keydown', function() {
        holdingShift = true;
    })

    $(document).on('keyup', function() {
        holdingShift = false;
    })

    $('#btn-2-blue').on('click', function() {addScore(2, 'blue');});
    $('#btn-5-blue').on('click', function() {addScore(5, 'blue');});
    $('#btn-12-blue').on('click', function() {addScore(12, 'blue');});
    $('#btn-2-blue').bind('contextmenu', function(e){e.preventDefault(); addScore(-2, 'blue');});
    $('#btn-5-blue').bind('contextmenu', function(e){e.preventDefault(); addScore(-5, 'blue');});
    $('#btn-12-blue').bind('contextmenu', function(e){e.preventDefault(); addScore(-12, 'blue');});

    $('#btn-2-red').on('click', function() {addScore(2, 'red');});
    $('#btn-5-red').on('click', function() {addScore(5, 'red');});
    $('#btn-12-red').on('click', function() {addScore(12, 'red');});
    $('#btn-2-red').bind('contextmenu', function(e){e.preventDefault(); addScore(-2, 'red');});
    $('#btn-5-red').bind('contextmenu', function(e){e.preventDefault(); addScore(-5, 'red');});
    $('#btn-12-red').bind('contextmenu', function(e){e.preventDefault(); addScore(-12, 'red');});
});
