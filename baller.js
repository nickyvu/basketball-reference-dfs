var StatTable = {

  getIndex:  function($row, category) {
    var selector = "th:contains(" + category + ")";
    var $table = $row.parent().parent();
    var idx = $table.find('thead tr:not(.over_header)').first().find(selector).index();
    console.log(category + ': ' + idx);
    return idx;
  },

  getValue: function($row, category) {
    return Number($row.find('td').eq(this.getIndex($row, category)).text());
  }

};

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
    var $row = $(this);
    var pts = StatTable.getValue($row, 'PTS');
    var ast = StatTable.getValue($row, 'AST');
    var stl = StatTable.getValue($row, 'STL');
    var blk = StatTable.getValue($row, 'BLK');
    var tov = StatTable.getValue($row, 'TOV');
    var reb = StatTable.getValue($row, 'TRB');
    var fga = StatTable.getValue($row, 'FGA');
    var fgm = StatTable.getValue($row, 'FG');
    var fta = StatTable.getValue($row, 'FTA');
    var ftm = StatTable.getValue($row, 'FT');
    var tpt = StatTable.getValue($row, '3P');
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

  var tableHeading = $('.table_heading h2').text();

  $('#stats tbody tr').each(function(index){
      var $row = $(this);
      var pts = StatTable.getValue($row, 'PTS');
      var ast = StatTable.getValue($row, 'AST');
      var stl = StatTable.getValue($row, 'STL');
      var blk = StatTable.getValue($row, 'BLK');
      var tov = StatTable.getValue($row, 'TOV');
      var reb = StatTable.getValue($row, 'TRB');
      var fga = StatTable.getValue($row, 'FGA');
      var fgm = StatTable.getValue($row, 'FG');
      var fta = StatTable.getValue($row, 'FTA');
      var ftm = StatTable.getValue($row, 'FT');
      var tpt = StatTable.getValue($row, '3P');
      var games = StatTable.getValue($row, 'G');
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
      var $row = $(this);
      var pts = StatTable.getValue($row, 'PTS');
      var ast = StatTable.getValue($row, 'AST');
      var stl = StatTable.getValue($row, 'STL');
      var blk = StatTable.getValue($row, 'BLK');
      var tov = StatTable.getValue($row, 'TOV');
      var reb = StatTable.getValue($row, 'TRB');
      var fga = StatTable.getValue($row, 'FGA');
      var fgm = StatTable.getValue($row, 'FG');
      var fta = StatTable.getValue($row, 'FTA');
      var ftm = StatTable.getValue($row, 'FT');
      var tpt = StatTable.getValue($row, '3P');
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
  var url = document.URL;
  if ( url.split('/')[3] == "boxscores" ) {
    $('table').each(function() {
      if ( $(this).attr('id') != undefined && $(this).attr('id').split('_')[1] == "basic" ) {
        $(this).find('thead tr').not('.over_header').append('<th>FD</th><th>DS</th><th>DK</th><th>SS</th>');
        $(this).find('tbody tr, tfoot tr').not('.thead').each(function(index){
          var $row = $(this);
          var pts = StatTable.getValue($row, 'PTS');
          var ast = StatTable.getValue($row, 'AST');
          var stl = StatTable.getValue($row, 'STL');
          var blk = StatTable.getValue($row, 'BLK');
          var tov = StatTable.getValue($row, 'TOV');
          var reb = StatTable.getValue($row, 'TRB');
          var fga = StatTable.getValue($row, 'FGA');
          var fgm = StatTable.getValue($row, 'FG');
          var fta = StatTable.getValue($row, 'FTA');
          var ftm = StatTable.getValue($row, 'FT');
          var tpt = StatTable.getValue($row, '3P');
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
    }
  });
  }
});

