function TextBoxValidation(id, ErrorMsg) {
    var flag = 0;
    var varId = $("#" + id).val().trim();
    if (varId == "") {
        $("#err_" + id).text(ErrorMsg);
        flag = 1;
    }
    return flag;
}

function DropDownValidation(id, ErrorMsg) {
    var flag = 0;
    var varId = $("#" + id).val();
    if (varId == "" || varId == "0") {
        $("#err_" + id).text(ErrorMsg);
        flag = 1;
    }
    return flag;
}

function NumberValidation(id, ErrorMsg) {
   // //debugger
    var flag = 0;
    var varId = $("#" + id).val();
    if (isNaN(varId)) {
        $("#err_" + id).text(ErrorMsg);
        flag = 1;
    }
    return flag;
}

function DecimalValidation(id, ErrorMsg) {
    //debugger
    var flag = 0;
    var reg = "/^[1-9]\d*(\.\d+)?$/";
    var varId = $("#" + id).val();
    if (reg.test(varId))
    {
        $("#err_" + id).text(ErrorMsg);
        flag = 1;
    }
    return flag;
}

function MaxLengthValidation(id, ErrorMsg,MaxLength) {
  //  //debugger
    var flag = 0;
    var varId = $("#" + id).val().trim();
    var varId_maxLength = varId.length;
    if (varId_maxLength > MaxLength) {
        $("#err_" + id).text(ErrorMsg);
        flag = 1;
    }
    return flag;
}

function ClearErrorMessage(id) {
	////debugger
  $("#err_" + id).text("");
}

function ValidateEmail(email, ErrorMsg) {
    debugger
    var flag = 0;
    var varEmail = $("#" + email).val();
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!filter.test(varEmail)) {
        $("#err_Message_Email").text("Please provide a valid email address");
        $("#err_" + email).text(ErrorMsg);
        flag = 1;
    }
    return flag;
}