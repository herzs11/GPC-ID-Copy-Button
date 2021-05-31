// ==UserScript==
// @name         Haystack GPC_ID
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prints selected GPC product id to screen, click to copy id to clipboard
// @author       Seth Herz
// @match        https://dev.searchhaystack.com/admin/gpc_products/all_columns/?selected_gpc_products=*
// @require http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==


$(document).ready(function() {
    var styles = {
        "position":"fixed",
        "bottom":"50px",
        "right":"0px",
        "width":"-moz-fit-content",
        "width":"fit-content",
        "padding":"5px",
        "background":"#4DFF80",
        "font-size":"25px",
        "border":"5px solid red"
    };
    var gpc_id = window.location.search.split("=").pop(-1).split("_").pop(-1);
    $('body').append(`<button id=gpc_id>${gpc_id}</button>`);
    $('body').append('<div class="copied"></div>');
    $('body').append('<input id=dummy>');
    $("#gpc_id").css(styles);
    $(".copied").css({"display":"none","position":"fixed","bottom":"30px","right":"0px"});
    $("#dummy").css("display","none");
    $("#gpc_id").hover(function() {
        $(this).css("background","yellow");
      }, function(){
        $(this).css("background","#4DFF80");
    });
    $("#gpc_id").mouseup(function() {
        $(this).css({"background":"#4DFF80","color":"black"});
        $("#dummy").show();
        $('#dummy').val($(this).text()).select();
        document.execCommand('copy');
        $("#dummy").hide();
        $(".copied").text("Copied!").show();
    })
    .mousedown(function(){
        $(this).css({"background":"#0000FF","color":"white"});
    });
    var intervalId = window.setInterval(function(){
        var gpc_id = window.location.search.split("=").pop(-1).split("_").pop(-1);
        $("#gpc_id").text(gpc_id);
        $(".copied").hide();
    }, 500);
});
