var smile = $(".smile");
var size = 8;
var firstClick = true;
var time = 0;
var timer;
var flagsNumber = 0;
var bombsNumber = 10;

var finish = false;



var closeButton = document.getElementById('closeButton');
var popup = document.getElementById('popup');
// var closeButton1 = document.getElementById('closeButton1');
// var popup1 = document.getElementById('popup1');
var closeButton2 = document.getElementById('closeButton2');
var popup2 = document.getElementById('popup2');
var closeButton3 = document.getElementById('closeButton3');
var popup3 = document.getElementById('popup3');
var closeButton4 = document.getElementById('closeButton4');
var popup4 = document.getElementById('popup4');
let currentIndexOfPop = 0

let listOfPop = [popup, popup2, popup3, popup4]


closeButton.addEventListener('click', function() {
  popup.style.display = 'none';
});
// closeButton1.addEventListener('click', function() {
//   popup1.style.display = 'none';
// });

closeButton2.addEventListener('click', function() {
  popup2.style.display = 'none';
});
closeButton3.addEventListener('click', function() {
  popup3.style.display = 'none';
});
closeButton4.addEventListener('click', function() {
  popup4.style.display = 'none';
});

var check = function(i) {
  // todo сделать функию проверки
  if (i >= 0 && i < size ** 2) {
    var cCell = $("[index='" + i + "']");

    var count =
      (+i % size > 0 ? checkFlag(+i - 9) : 0) +
      checkFlag(+i - 8) +
      ((+i + 1) % size > 0 ? checkFlag(+i - 7) : 0) +
      (+i % size > 0 ? checkFlag(+i - 1) : 0) +
      ((+i + 1) % size > 0 ? checkFlag(+i + 1) : 0) +
      (+i % size > 0 ? checkFlag(+i + 7) : 0) +
      checkFlag(+i + 8) +
      ((+i + 1) % size > 0 ? checkFlag(+i + 9) : 0);

    if (cCell.find(".hint").attr("hint") == count) {
      if (+i % size > 0) open(+i - 9);
      open(+i - 8);
      if ((+i + 1) % size > 0) open(+i - 7);
      if (+i % size > 0) open(+i - 1);
      if ((+i + 1) % size > 0) open(+i + 1);
      if (+i % size > 0) open(+i + 7);
      open(+i + 8);
      if ((+i + 1) % size > 0) open(+i + 9);
    }
  }
};

var setFlag = function(i) {
  var cCell = $("[index='" + i + "']");
  switch (cCell.attr("status")) {
    case "0":
      cCell.attr("status", 2);
      flagsNumber--;
      $(".bombs_number").html(pad(flagsNumber));
      break;
    case "2":
      cCell.attr("status", 0);
      flagsNumber++;
      $(".bombs_number").html(pad(flagsNumber));
      break;
  }
};

var setBomb = function(cells, empty) {
  var position = Math.floor(Math.random() * cells.length);
  if (empty != position && cells[position] != "bomb") {
    cells[position] = "bomb";
    return;
  }
  setBomb(cells, empty);
};

var boom = function() {
  for (var i = 0; i < size ** 2; i++) {
    var acCell = $("[index='" + i + "']");
    if (acCell.attr("status") == 0) {
      acCell.attr("status", acCell.attr("chrd") == "true" ? 3 : 1);
    }
  }
  finish = true;
};

var open = function(i) {
  if (i >= 0 && i < size ** 2) {
    var cCell = $("[index='" + i + "']");

    if (cCell.attr("status") != 2) {
      if (cCell.attr("chrd") == "true") {
        console.log("boom2-" + cCell.attr("index"));
        boom();
        return;
      }
      cCell.attr("status", 1);
    }

    if (cCell.find(".hint").attr("hint") == "") {
      cCell.find(".hint").attr("hint", "x");
      if (+i % size > 0) open(+i - 9);
      open(+i - 8);
      if ((+i + 1) % size > 0) open(+i - 7);
      if (+i % size > 0) open(+i - 1);
      if ((+i + 1) % size > 0) open(+i + 1);
      if (+i % size > 0) open(+i + 7);
      open(+i + 8);
      if ((+i + 1) % size > 0) open(+i + 9);
    }
  }
};

var checkBomb = function(cells, index) {
  if (index >= 0 && index < cells.length && cells[index] == "bomb") {
    return 1;
  }
  return 0;
};

var checkFlag = function(index) {
  console.log(index);
  if (
    index >= 0 &&
    index < size ** 2 &&
    $("[index='" + index + "']").attr("status") == 2
  ) {
    return 1;
  }
  return 0;
};

var fillField = function(index = 0) {
  time = 0;
  $(".timer").html(pad(time));

  flagsNumber = bombsNumber;
  $(".bombs_number").html(pad(flagsNumber));

  var cell = $(".tmp > .cell")[0];
  var field = $(".field");
  field.empty();

  var cells = [];
  cells.length = size ** 2;

  for (var i = 0; i < bombsNumber; i++) {
    setBomb(cells, index);
  }

  for (var i = 0; i < cells.length; i++) {
    if (cells[i] != "bomb") {
      var count =
        (+i % size > 0 ? checkBomb(cells, +i - 9) : 0) +
        checkBomb(cells, +i - 8) +
        ((+i + 1) % size > 0 ? checkBomb(cells, +i - 7) : 0) +
        (+i % size > 0 ? checkBomb(cells, +i - 1) : 0) +
        ((+i + 1) % size > 0 ? checkBomb(cells, +i + 1) : 0) +
        (+i % size > 0 ? checkBomb(cells, +i + 7) : 0) +
        checkBomb(cells, i + 8) +
        ((+i + 1) % size > 0 ? checkBomb(cells, +i + 9) : 0);
      cells[i] = count > 0 ? count : "";
    }
  }

  for (var i = 0; i < size ** 2; i++) {
    var currentCell = $(cell).clone();
    currentCell.attr("index", i);
    /* currentCell.attr("status", cells[i]=="bomb" ?'3':'1');*/

    if (cells[i] != "bomb") {
      var hint = currentCell.find(".hint");
      hint.attr("hint", cells[i]);
      hint.html(cells[i]);
    } else {
      currentCell.attr("chrd", cells[i] == "bomb");
    }
    currentCell.appendTo(field);
  }

  /**** события ***/
  $(".cell").contextmenu(function() {
    return false;
  });

  $(".cell").mousedown(function(e) {
    
    if(finish)
      return;
    
    var cell = $(this);

    console.log("click-" + cell.attr("index"));

    if (firstClick) {
      fillField(cell.attr("index"));
      cell = $("[index='" + cell.attr("index") + "']");
      firstClick = false;
      startTimer();
    }

    if (e.button == 0) {
      if (cell.attr("chrd") == "true") {
        //alert("boom!!");
        //cell.attr("status", 3);
        console.log("boom1-" + cell.attr("index") + cell.attr("chrd"));
        currentIndexOfPop = 0
        boom();
      } else {
        console.log("HERE")
        if (listOfPop.length > currentIndexOfPop){
          let pop = listOfPop[currentIndexOfPop]
          pop.style.display = 'block';
          currentIndexOfPop += 1
        }
        //cell.attr("status", 1);
        open(cell.attr("index"));
      }
      checkWin();
      return false;
    }

    if (e.button == 2) {
      //2  - правый клик, 3 - средний клик
      if (cell.attr("status") == 1) {
        check(cell.attr("index"));
      }
      {
        setFlag(cell.attr("index"));
      }
      checkWin();
      return false;
    }
    
    return true;
  });
};

var startTimer = function() {
  if (typeof timer != "undefined") {
    clearInterval(timer);
  }
  //выводим время
  timer = setInterval(function() {
    time++;
    $(".timer").html(pad(time));
  }, 1000);
};

var checkWin = function() {
  if(finish)
    return;
  setTimeout(function(){
  if (flagsNumber == 0) {
   
    var bombsFound = 0;
    var pure =0;
    for (var i = 0; i < size ** 2; i++) {
      var cell = $("[index='" + i + "']");
      if (cell.attr("chrd") == "true" && cell.attr("status") == 2) {
        bombsFound++;
      }
      if (cell.attr("status") == 0) {
        pure++;
      }
    }

    if (bombsFound == bombsNumber && pure == 0 && !finish) {
      $(".result").html("YOU WIN!!!"+"\n"+"YOUR TIME - " + time + "s");
      clearInterval(timer);
      finish = true;
      writeStat("Player", time);
       $('.stat').toggleClass("rotated");
       $('.game_field').toggleClass("rotated");
    }
  }
    }, 200);
};

var pad = function(n) {
  var s = "00" + n;
  return s.substr(s.length - 3);
};


var writeStat = function(name, value){
  
  var stat =  JSON.parse(localStorage.getItem('stat')); 
  if(stat == null)
    stat = [];
  stat.push(stat.length+1+ ". "+ name + " - " + value + "s");
  localStorage.setItem('stat', JSON.stringify(stat));
  renewStat();
}

var renewStat = function(){
  var stat =  JSON.parse(localStorage.getItem('stat'));
  if(stat != null)
    $('.dash_board').html(stat.join("\n"));
  };

smile.click(function() {
  fillField();
  firstClick = true;
  clearInterval(timer);
  finish = false;
  
      // $('.stat').toggleClass("rotated");
       //$('.game_field').toggleClass("rotated");
  });

$(".arrow-back").click(function() {
  $('.stat').toggleClass("rotated");
  $('.game_field').toggleClass("rotated");
  });

fillField();
renewStat();