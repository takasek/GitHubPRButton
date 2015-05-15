$(function(){
$("<a>PR作成</a>").addClass("btn btn-sm").bind("click", function(){
  $.ajax({
    url: "../compare",
    cache: false,
    success: function(html){
      var nums = $(".gh-header-number").html().match("[0-9]+");
      if (!nums.length) {
        alert("has no issue number");
        return;
      }
      var num = nums[0];
      var result = html.match(new RegExp('href="([^"]+develop\.\.\.[^"]+' + num + '[^"]+)"'));
      if (!result || result.length < 1) {
        alert("maches no branch!");
        return;
      }
      
      var pr = window.open("http://github.com"+result[1]);
      if (!pr) {
        alert("fail to open PR!");
        return;
      }
      $(pr.document.body).ready(function(){
        setTimeout(function(){
          $(pr.document).find("#pull_request_title").val("#"+num+" "+$(".js-issue-title").html());
          $(pr.document).find("#pull_request_body").val("#"+num);
        }, 1000);
      });
    }
  });
}).appendTo($(".gh-header-actions"));
});