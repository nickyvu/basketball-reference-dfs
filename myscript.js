console.log("Test!");
$(document).ready(function() {
  $('#per_minute thead tr').append('<th>FD</th><th>DS</th><th>DK</th><th>SS</th>');
  $('#per_minute tbody tr').each(function(index){
    var pts = Number($(this).find('td:nth-last-child(1)').text());
    var ast = Number($(this).find('td:nth-last-child(6)').text());
    var stl = Number($(this).find('td:nth-last-child(5)').text());
    var blk = Number($(this).find('td:nth-last-child(4)').text());
    var tov = Number($(this).find('td:nth-last-child(3)').text());
    var reb = Number($(this).find('td:nth-last-child(7)').text());
    var fd = (pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.2*reb)).toFixed(2);
    $(this).append("<td>" + fd + "</td>")
  });
  $('#per_minute tfoot tr').each(function(index){
    var pts = Number($(this).find('td:nth-last-child(1)').text());
    var ast = Number($(this).find('td:nth-last-child(6)').text());
    var stl = Number($(this).find('td:nth-last-child(5)').text());
    var blk = Number($(this).find('td:nth-last-child(4)').text());
    var tov = Number($(this).find('td:nth-last-child(3)').text());
    var reb = Number($(this).find('td:nth-last-child(7)').text());
    var fd = (pts + (1.5*ast) + (2*stl) + (2*blk) - tov + (1.2*reb)).toFixed(2);
    $(this).append("<td>" + fd + "</td>")
  });
});
