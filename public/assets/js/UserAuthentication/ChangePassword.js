function ChangePasswordValidate() {
    ////debugger;
    $("#err_Message_Old_password").text('');
    $("#err_Message_New_Password").text('');
    $("#err_Confirm_Password").text('');
    var flag = 0;
    var oPwd = $.trim($("#Old_Password").val());
    var nPwd = $.trim($("#New_Password").val());

    $("#New_Password").attr('maxlength', '');
    $("#Confirm_Password").attr('maxlength', '');

    if ($("#Old_Password").val() == "") {
        $("#err_Message_Old_password").text("Please enter old password");
        flag = 1;

    }
    if ($("#New_Password").val() == "") {
        $("#err_Message_New_Password").text("Please enter new password");
        flag = 1;

    }
    //if (oPwd.length < 8) {
    //    $("#err_oldpassword").html("Password must be minimum 8 characters");
    //    $("#Old_Password").focus();
    //    flag = 1;

    //}
    if (nPwd.length < 8) {
        $("#err_Message_New_Password").html("Password must be minimum 8 characters");
        $("#New_Password").focus();
        flag = 1;

    }
    if (nPwd.length > 10) {
        $("#err_Message_New_Password").html("Password must be maximum 10 characters");
        $("#New_Password").focus();
        flag = 1;

    }
    //if (!oPwd.match(/[A-Z]/)) {
    //    $("#err_oldpassword").html("Password should contain at least one capital letter");
    //    $("#Old_Password").focus();
    //    flag = 1;

    //}
    if (!nPwd.match(/[A-Z]/)) {
        $("#err_Message_New_Password").html("Password should contain at least one capital letter");
        $("#New_Password").focus();
        flag = 1;

    }
    //if (!oPwd.match(/\d/)) {
    //    $("#err_oldpassword").html("Password should contain at least one numeric");
    //    $("#oldPassword").focus();
    //    flag = 1;

    //}
    if (!nPwd.match(/\d/)) {
        $("#err_Message_New_Password").html("Password should contain at least one numeric");
        $("#New_Password").focus();
        flag = 1;

    }
    //if (!oPwd.match(/[$,@@,#]/)) {
    //    $("#err_oldpassword").html("Password should contain at least one special character($,@@,#)");
    //    $("#oldPassword").focus();
    //    flag = 1;

    //}
    if (!nPwd.match(/[$,@@,#]/)) {
        $("#err_Message_New_Password").html("Password should contain at least one special character($,@,#)");
        $("#New_Password").focus();
        flag = 1;

    }
    if ($("#Confirm_Password").val() == "") {
        $("#err_Confirm_Password").text("Please enter confirm password");
        flag = 1;

    }
    if ($("#New_Password").val() == $("#Old_Password").val()) {
        $("#err_Message_New_Password").text("New password should not be same as old password");
        flag = 1;

    }
    if ($("#New_Password").val() != $("#Confirm_Password").val()) {
        $("#err_Confirm_Password").text("Password does not match");
        flag = 1;

    }
    if (flag == 1) {
        $("#New_Password").attr('maxlength', '10');
        $("#Confirm_Password").attr('maxlength', '10');
        return false;
    }
    else {
        encrypt_change_pass();
        return
    }
}
function CheckPasswordStength() {
    ////debugger;
    var pswd = $.trim($("#New_Password").val());

    if (pswd.match(/[$,@@,#]/)) {
        $('#SpnSpecialChar').removeClass('text-danger').addClass('text-success');
        $('#faSpnSpecialChar').removeClass('fa-times-circle').addClass('fa-check-circle');
    }
    else {
        $('#SpnSpecialChar').removeClass('text-success').addClass('text-danger');
        $('#faSpnSpecialChar').removeClass('fa-check-circle').addClass('fa-times-circle');
    }
    if (pswd.match(/\d/)) {
        $('#SpnNumeric').removeClass('text-danger').addClass('text-success');
        $('#faSpnNumeric').removeClass('fa-times-circle').addClass('fa-check-circle');
    }
    else {
        $('#SpnNumeric').removeClass('text-success').addClass('text-danger');
        $('#faSpnNumeric').removeClass('fa-check-circle').addClass('fa-times-circle');
    }

    if (pswd.match(/[A-Z]/)) {
        $('#SpnCapletter').removeClass('text-danger').addClass('text-success');
        $('#faSpnCapletter').removeClass('fa-times-circle').addClass('fa-check-circle');
    }
    else {
        $('#SpnCapletter').removeClass('text-success').addClass('text-danger');
        $('#faSpnCapletter').removeClass('fa-check-circle').addClass('fa-times-circle');
    }

    if (pswd.length < 8) {
        $('#SpnPasslength').removeClass('text-success').addClass('text-danger');
        $('#faSpnPasslength').removeClass('fa-check-circle').addClass('fa-times-circle');
    }
    else {
        $('#SpnPasslength').removeClass('text-danger').addClass('text-success');
        $('#faSpnPasslength').removeClass('fa-times-circle').addClass('fa-check-circle');
    }

}