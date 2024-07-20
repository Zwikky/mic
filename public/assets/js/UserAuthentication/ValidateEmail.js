function ValidateEmail() {
    debugger;
    var email = document.getElementById('EmailId');
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!filter.test(email.value)) {
        //alert('Please provide a valid email address');
        $("#err_Message_Email").text("Please provide a valid email address");
        email.focus;

        return false;
    }
    
    
}

function ClearErrorMsgEmail() {
    $("#err_Message_Email").text("");
}
function ClearErrorMsgCaptcha() {
    $("#err_message1").text("");
}