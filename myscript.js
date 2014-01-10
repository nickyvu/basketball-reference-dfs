console.log("Test!");
var checkDouble = function (stat) {
  if ( stat >= 10 ) {
    return 1;
  } else {
    return 0;
  }
}

var checkBonus = function (x) {
  if ( x == 2 ) {
    return 1.5;
  }
  if (x >= 3 ) {
    return 3;
  }
  else {
    return 0;
  }
}
$(document).ready(function() {
  $('#per_minute thead tr, #per_game thead tr').append('<th>FD</th><th>DS</th><th>DK</th><th>SS</th>');
  $('#per_minute tbody tr, #per_minute tfoot tr, #per_game tbody tr, #per_game tfoot tr').each(function(index){
    var pts = Number($(this).find('td:nth-last-child(1)').text());
    var ast = Number($(this).find('td:nth-last-child(6)').text());
    var stl = Number($(this).find('td:nth-last-child(5)').text());
    var blk = Number($(this).find('td:nth-last-child(4)').text());
    var tov = Number($(this).find('td:nth-last-child(3)').text());
    var reb = Number($(this).find('td:nth-last-child(7)').text());
    var fga = Number($(this).find('td:nth-last-child(20)').text());
    var fgm = Number($(this).find('td:nth-last-child(21)').text());
    var fta = Number($(this).find('td:nth-last-child(11)').text());
    var ftm = Number($(this).find('td:nth-last-child(12)').text());
    var tpt = Number($(this).find('td:nth-last-child(18)').text());
    var fd = (pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.2*reb)).toFixed(2);
    var ds = (pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.25*reb) - (.5*(fga-fgm)) - (.5*(fta-ftm))).toFixed(2);
    var stats = [pts, ast, stl, blk, reb];
    var doubles = stats.map(checkDouble);
    var doublesSum = doubles.reduce(function (a,b) { return a + b });
    var dkBonus = checkBonus(doublesSum);
    var dk = (pts + (1.5*ast) + (2*stl) + (2*blk) - (.5*tov) + (1.25*reb) + (.5*tpt) + dkBonus).toFixed(2);
    $(this).append("<td>" + fd + "</td>" + "<td>" + ds + "</td>" + "<td>" + dk + "</td>");
  });
});

