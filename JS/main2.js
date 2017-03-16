$(document).ready(function(){  
 
  var round="x";
  var player1=[]; 
  var player2=[];  
  var win1 = [1,5,9];
  var win2 = [1,4,7];
  var win3 = [1,2,3];
  var win4 = [4,5,6];     
  var win5 = [7,8,9];
  var win6 = [2,5,8];
  var win7 = [3,6,9];
  var win8 = [3,5,7];
  var wins = [win1, win2, win3, win4, win5, win6, win7, win8];
  var score1 = 0;
  var score2=0;
  var result=$("#result");
  var startGame=function(){
   player1 = [];
   player2 = [];
   round="x";
  $(".square").each(function(){
  $(this).text("");
  });
  }

  $(".clickable").click(function(){
  var celltext=$(this).html();
  if(celltext==""){
    if(round=="x"){
        $(this).html("<p class='x'>x</p>");
        player1.push($(this).data("val"));
        round="o";
        console.log(player1);
    }
    else{
        $(this).html("<p class='o'>o</p>");
        player2.push($(this).data("val"));
        round="x"; 
        console.log(player1);
        }
        $.each(wins, function(i,v){
          if(player1.length>=3){
            var winner = true;
            $.each(v,function(icon,value){
                if($.inArray(value,player1)==-1){
                  winner = false;
                }
            })
            if(winner == true){
              result.html('<img src="css/catdance.gif" alt="GANASTE!"');
              score1++ ;
              $("#score1").text(score1); 
              $("#score2").text("0")    
              return;                                                     
            }
          }
          if(player2.length>=3){
            var winner2 = true;
            $.each(v,function(icon,value){
                if($.inArray(value,player2)==-1){
                  winner2 = false;
           }
          })
            if(winner2 == true){
              result.html('<img src="img/gatoloco.gif" alt="Ganaste!!">Ganaste!!');
              score2++ ;                  
              $("#score2").text(score2);
              $("#score1").text("0")
              return;  
            }
          }
       });
    };
  });
  $("#playagain").click(function(){
      $(".square").text("");
      startGame();                    
  });
});