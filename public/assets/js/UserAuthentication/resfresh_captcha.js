function refreshCaptcha() {
    debugger;
    var SessionId = document.getElementById('sessionId').value;
    var captcha = document.getElementById('textCaptcha').value;
   RefreshCaptcha(captcha, SessionId);
   /* document.getElementById("newCaptcha").src = newcaptchafile;*/

}
function RefreshCaptcha(pcaptcha,psessionid) {
  
    $.ajax({
        
        type: "Post",
        url: "/UserAuthentication/RefreshCaptcha",
        data: '{captcha:"' + pcaptcha + '",SessionId:"' + psessionid + '"}',
        contentType: "application/json; Charset-utf-8",
        dataType: "json",
        success: function (result) {
           
           
            document.getElementById("newCaptcha").src = result;
        }
        
    });
    //return final;
}