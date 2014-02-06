function median(values) {
  values.sort( function(a,b) { return a - b; });
  var half = Math.floor(values.length/2);

  if(values.length % 2)
    return values[half];
  else
    return (Number(values[half - 1]) + Number(values[half]))/2.0;
}

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
  $('#per_minute thead tr, #per_game thead tr, #pgl_basic thead tr, #stats thead tr').append('<th>FD</th><th>DS</th><th>DK</th><th>SS</th>');
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
    var ss = (pts + (1.5*ast) + (1.25*reb) + (2*blk) + (2* stl) - tov).toFixed(2);
    $(this).append("<td>" + fd + "</td>" + "<td>" + ds + "</td>" + "<td>" + dk + "</td>" + "<td>" + ss + "</td>");
  });
  $('#stats tbody tr').each(function(index){
    var pts = Number($(this).find('td:nth-last-child(13)').text());
    var ast = Number($(this).find('td:nth-last-child(18)').text());
    var stl = Number($(this).find('td:nth-last-child(17)').text());
    var blk = Number($(this).find('td:nth-last-child(16)').text());
    var tov = Number($(this).find('td:nth-last-child(15)').text());
    var reb = Number($(this).find('td:nth-last-child(19)').text());
    var fga = Number($(this).find('td:nth-last-child(25)').text());
    var fgm = Number($(this).find('td:nth-last-child(26)').text());
    var fta = Number($(this).find('td:nth-last-child(21)').text());
    var ftm = Number($(this).find('td:nth-last-child(22)').text());
    var tpt = Number($(this).find('td:nth-last-child(24)').text());
    var games = Number($(this).find('td:nth-last-child(29)').text());
    var fd = ((pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.2*reb))/games).toFixed(2);
    var ds = ((pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.25*reb) - (.5*(fga-fgm)) - (.5*(fta-ftm)))/games).toFixed(2);
    var stats = [pts/games, ast/games, stl/games, blk/games, reb/games];
    var doubles = stats.map(checkDouble);
    var doublesSum = doubles.reduce(function (a,b) { return a + b });
    var dkBonus = checkBonus(doublesSum);
    var dk = ((pts + (1.5*ast) + (2*stl) + (2*blk) - (.5*tov) + (1.25*reb) + (.5*tpt) + dkBonus)/games).toFixed(2);
    var ss = ((pts + (1.5*ast) + (1.25*reb) + (2*blk) + (2* stl) - tov)/games).toFixed(2);
    $(this).append("<td>" + fd + "</td>" + "<td>" + ds + "</td>" + "<td>" + dk + "</td>" + "<td>" + ss + "</td>");
  });
  var fd_vals = []; 
  var ds_vals = [];
  var dk_vals = [];
  var ss_vals = [];
  $("#pgl_basic tbody tr").not(".thead").each(function(index){
      var pts = Number($(this).find('td:nth-last-child(3)').text());
      var ast = Number($(this).find('td:nth-last-child(8)').text());
      var stl = Number($(this).find('td:nth-last-child(7)').text());
      var blk = Number($(this).find('td:nth-last-child(6)').text());
      var tov = Number($(this).find('td:nth-last-child(5)').text());
      var reb = Number($(this).find('td:nth-last-child(9)').text());
      var fga = Number($(this).find('td:nth-last-child(19)').text());
      var fgm = Number($(this).find('td:nth-last-child(20)').text());
      var fta = Number($(this).find('td:nth-last-child(13)').text());
      var ftm = Number($(this).find('td:nth-last-child(14)').text());
      var tpt = Number($(this).find('td:nth-last-child(17)').text());
      var fd = (pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.2*reb)).toFixed(2);
      fd_vals.push(fd);
      var ds = (pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.25*reb) - (.5*(fga-fgm)) - (.5*(fta-ftm))).toFixed(2);
      ds_vals.push(ds);
      var stats = [pts, ast, stl, blk, reb];
      var doubles = stats.map(checkDouble);
      var doublesSum = doubles.reduce(function (a,b) { return a + b });
      var dkBonus = checkBonus(doublesSum);
      var dk = (pts + (1.5*ast) + (2*stl) + (2*blk) - (.5*tov) + (1.25*reb) + (.5*tpt) + dkBonus).toFixed(2);
      dk_vals.push(dk);
      var ss = (pts + (1.5*ast) + (1.25*reb) + (2*blk) + (2* stl) - tov).toFixed(2);
      ss_vals.push(ss);
      $(this).append("<td class='fd'>" + fd + "</td>" + "<td class='ds'>" + ds + "</td>" + "<td class='dk'>" + dk + "</td>" + "<td class='ss'>" + ss + "</td>");
  });
  $("#pgl_basic tbody").append("<tr><td><strong>FD</strong></td><td> Median</td><td>" + median(fd_vals) + "</td><td></td><td>Min</td><td>" + Math.min.apply(Math,fd_vals) + "</td><td></td><td>Max</td><td>" + Math.max.apply(Math,fd_vals) + "</td></tr>");
  $("#pgl_basic tbody").append("<tr><td><strong>DS</strong></td><td> Median</td><td>" + median(ds_vals) + "</td><td></td><td>Min</td><td>" + Math.min.apply(Math,ds_vals) + "</td><td></td><td>Max</td><td>" + Math.max.apply(Math,ds_vals) + "</td></tr>");
  $("#pgl_basic tbody").append("<tr><td><strong>DK</strong></td><td> Median</td><td>" + median(dk_vals) + "</td><td></td><td>Min</td><td>" + Math.min.apply(Math,dk_vals) + "</td><td></td><td>Max</td><td>" + Math.max.apply(Math,dk_vals) + "</td></tr>");
  $("#pgl_basic tbody").append("<tr><td><strong>SS</strong></td><td> Median</td><td>" + median(ss_vals) + "</td><td></td><td>Min</td><td>" + Math.min.apply(Math,ss_vals) + "</td><td></td><td>Max</td><td>" + Math.max.apply(Math,ss_vals) + "</td></tr>");
});

