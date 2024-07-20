//#startregion Member Status Report

function MBR_RPT_AutoSearchList() {
    debugger;
    $("#datalistOptions").html('');
    var Data = $('#Member_Name').val().trim();
    if (Data.length == 0) {
        $('#Member_Id').val(null);
    }
    else {
        $('#Member_Id').val("0");
    }

    if (Data.length>0) {
        //debugger;
        $.ajax({
            url: '/Report/MemberNameGet/',
            async: false,
            data: { pPKvalue: Data },
            dataType: "json",
            type: "POST",
            success: function (data) {
                //debugger;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='MBR_RPT_TextBoxBind(\"" + data[i].First_Name + ' ' + data[i].Last_Name + "\",\"" + data[i].Member_Id + "\")'" + ">" + data[i].First_Name + ' ' + data[i].Last_Name + "</li>";
                        $("#datalistOptions").append(ListData);
                    }
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    }

}

function MBR_RPT_TextBoxBind(name, id) {
    //debugger;
    $("#datalistOptions").html('');
    $('#Member_Name').val(name);
    $('#Member_Id').val(id);
}
//#endregion


function CLM_MBR_AutoSearchList() {
    debugger;
    $("#datalistOptions_MBR").html('');
    //$('#Member_Id').val("0");
    var Data = $('#Member_Name').val().trim();
    if (Data.length == 0) {
        $('#Member_Id').val(null);
    }
    else {
      //  $('#Member_Id').val("0");
    }
    if (Data.length>0) {

        //debugger;
        $.ajax({
            url: '/Report/MemberNameGet/',
            data: {pPKvalue: Data },
            dataType: "json",
            type: "POST",
            async: false,
            success: function (data) {
                //debugger;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='CLM_MBR_TextBoxBind(\"" + data[i].First_Name + ' ' + data[i].Last_Name + "\",\"" + data[i].Member_Id + "\")'" + ">" + data[i].First_Name + ' ' + data[i].Last_Name + "</li>";
                        $("#datalistOptions_MBR").append(ListData);
                    }
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    }

}

function CLM_MBR_TextBoxBind(name, id) {
    //debugger;
    $("#datalistOptions_MBR").html('');
    $('#Member_Name').val(name);
    $('#Member_Id').val(id);
}

function CLM_GRP_AutoSearchList() {
    //debugger;
    $("#datalistOptions_GRP").html('');
    
    var Data = $('#Group_Name').val().trim();
    if (Data.length == 0) {
        $('#Group_Id').val(null);
    }
    //else {
    //    $('#Group_Id').val("0");
    //}
    if (Data.length > 0) {

        //debugger;
        $.ajax({
            url: '/Report/GroupNameGet/',
            data: {pPKvalue: Data},
            dataType: "json",
            type: "POST",
            async: false,
            success: function (data) {
                //debugger;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='CLM_GRP_TextBoxBind(\"" + data[i].Group_Name + "\",\"" + data[i].Group_Id + "\")'" + ">" + data[i].Group_Name + "</li>";
                        $("#datalistOptions_GRP").append(ListData);
                    }
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    }

}

function CLM_GRP_TextBoxBind(name, id) {
    //debugger;
    $("#datalistOptions_GRP").html('');
    $('#Group_Name').val(name);
    $('#Group_Id').val(id);
}

function CLM_Diag_AutoSearchList() {
    //debugger;
    $("#datalistOptions_Diag").html('');
   
    var Data = $('#Diagnosis').val().trim();
    if (Data.length == 0) {
        $('#Icd_Code').val(null);
    }
    else {
        $('#Icd_Code').val("0");
    }
    if (Data.length > 0) {
        //debugger;
        $.ajax({
            url: '/Report/DiagnosisGet/',
            data: {pPKvalue: Data},
            dataType: "json",
            type: "POST",
            async: false,
            success: function (data) {
                //debugger;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='CLM_Diag_TextBoxBind(\"" + data[i].Icd_Code_Description + "\",\"" + data[i].Icd_Code + "\")'" + ">" + data[i].Icd_Code + '-' + data[i].Icd_Code_Description + "</li>";
                        $("#datalistOptions_Diag").append(ListData);
                    }
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    }

}

function CLM_Diag_TextBoxBind(name, id) {
    //debugger;
    $("#datalistOptions_Diag").html('');
    $('#Diagnosis').val(name);
    $('#Icd_Code').val(id);
}

function CLM_SP_AutoSearchList() {
    //debugger;
    $("#datalistOptions_SP").html('');
  
    var Data = $('#Sp_Name').val().trim();
    if (Data.length == 0) {
        $('#Sp_Id').val(null);
    }
    else {
        $('#Sp_Id').val("0");
    }
    if (Data.length > 0) {
        //debugger;
        $.ajax({
            url: '/Report/SPGet/',
            data: {pPKvalue:  Data },
            dataType: "json",
            type: "POST",
            async: false,
            success: function (data) {
                //debugger;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='CLM_SP_TextBoxBind(\"" + data[i].Sp_Name + "\",\"" + data[i].Service_Provider_Id + "\")'" + ">" + data[i].Sp_Name + "</li>";
                        $("#datalistOptions_SP").append(ListData);
                    }
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    }

}

function CLM_SP_TextBoxBind(name, id) {
    //debugger;
    $("#datalistOptions_SP").html('');
    $('#Sp_Name').val(name);
    $('#Sp_Id').val(id);
}

function CLM_Disc_AutoSearchList() {
    //debugger;
    $("#datalistOptions_Disc").html('');
    
    var Data = $('#Discipline').val().trim();
    if (Data.length == 0) {
        $('#Discipline_Id').val(null);
    }
    else {
        $('#Discipline_Id').val("0");
    }
    if (Data.length > 0) {
        //debugger;
        $.ajax({
            url: '/Report/DisciplineGet/',
            data: "{'pPKvalue': '" + Data + "'}",
            dataType: "json",
            type: "POST",
            async:false,
            success: function (data) {
                //debugger;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='CLM_Disc_TextBoxBind(\"" + data[i].Discipline_Code + "\",\"" + data[i].Discipline_Id + "\")'" + ">" + data[i].Discipline_Code + "</li>";
                        $("#datalistOptions_Disc").append(ListData);
                    }
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    }
}

function CLM_Disc_TextBoxBind(name, id) {
    //debugger;
    $("#datalistOptions_Disc").html('');
    $('#Discipline').val(name);
    $('#Discipline_Id').val(id);
}




//#region
function MBR_GRP_Name_AutoSearchList() {
    debugger;
    $("#datalistOptions_MI").html('');
    //$('#Member_Id').val("0");
    var Data = $('#Member_Group_Name').val().trim();
    //if (Data.length == 0) {
    //    $('#Invoice_For_Id').val(null);
    //}
    //else {
    //    $('#Invoice_For_Id').val("0");
    //}
    var MonthSearch = $('#MonthSearch').val()
    var YearSearch = $('#YearSearch').val()
    if (Data.length > 0) {

        //debugger;
        $.ajax({
            url: '/Report/BillToNameGet/',
            data: { pPKvalue: Data, Month: MonthSearch, Year: YearSearch},
            dataType: "json",
            type: "POST",
            async: false,
            success: function (data) {
                debugger;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='MBR_GRP_Name_TextBoxBind(\"" + data[i].Bill_To_Name + "\",\"" + data[i].Invoice_For_Id + "\")'" + ">" + data[i].Bill_To_Name + "</li>";
                        $("#datalistOptions_MI").append(ListData);
                    }
                }
            },
            error: function (response) {
                alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
        });
    }

}

function MBR_GRP_Name_TextBoxBind(name, id) {
    //debugger;
    $("#datalistOptions_MI").html('');
    $('#Member_Group_Name').val(name);
  //  $('#Invoice_For_Id').val(id);
}
//#endregion