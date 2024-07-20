//#region DownloadFile
function DownloadFile(FileName) {
    //debugger
    download('/DigitalAssets/MediClaim/' + FileName + '', FileName);

}

const download = (path, filename) => {
    // //debugger
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
};

//#endregion

//#region Document

var Claim_Document_ArrayList = [];

function Claim_Document_Add() {
    //debugger
    var Beneficiary_Id = $("#Beneficiary_Id").val();
    var Beneficiary_Name = $("#Beneficiary_Id option[value=" + Beneficiary_Id + "]").text();
    var Document_Type_Id = $("#Document_Type_Id").val();
    var Document_Type_Name = $("#Document_Type_Id option[value=" + Document_Type_Id + "]").text();
    var Document_Name = $("#Document_Name").val();
    var Document_Number = $("#Document_Number").val();
    var Document_File_Name = $("#Document_File_Name").val();

    var flag = 0;
    $(".error_msg").text("");
    if (DropDownValidation("Beneficiary_Id", "Select Beneficiary") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Document_Type_Id", "Select Document Type") == 1) {
        flag = 1;
    }
    if (Document_Type_Id == "117") {
        if (TextBoxValidation("Document_Name", "Enter Document Name") == 1) {
            flag = 1;
        }
    }
    if ($("#Document_File_Name").val() == "") {
        alert("Please upload document");
        flag = 1;
    }
    $("#err_Document_no").text('');
    if (Document_Type_Id == "112") {
        if (Document_Number == "") {
            $("#err_Document_no").text('Please enter Account/invoice number');
            flag = 1;
        }
    }
    if (flag == 1) {
        return false;
    }


    var BeneficiaryArray = Beneficiary_Id.split("_");


    var tbodyrowCount = $('#tbody_Claim_Document tr').length;
    if (tbodyrowCount == 0) {
        $("#Claim_Document_Count").val("0");
    }

    var Document_Count = $("#Claim_Document_Count").val();
    var Claim_Document_Count = parseInt(Document_Count) + 1;

    var oClaim_Document_ArrayList = Claim_Document_ArrayList;
    var document = oClaim_Document_ArrayList.length;
    var i = 0;
    var d_name = $("#Document_Type_Id").val();
    for (i = 0; i < document; i++) {
        if (oClaim_Document_ArrayList[i].Document_Type_Id == 112 && oClaim_Document_ArrayList[i].Document_Type_Id == d_name) {
            alert("Account / Invoice is already exist.");
            return false;
        }
    }

    var tr = "<tr id=tr_" + Claim_Document_Count + ">";
    tr += "<td>" + Beneficiary_Name + "</td>";
    tr += "<td>" + Document_Type_Name + "</td>";
    tr += "<td>" + Document_Name + "</td>";
    tr += "<td>" + Document_Number + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Claim_Document_Edit(" + Claim_Document_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Claim_Document_Delete(" + Claim_Document_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a><a href='JavaScript:Void(0);' onclick='DownloadFile(\"" + Document_File_Name + "\")'><i class='fa fa-download' data-bs-toggle='tooltip' title='' data-bs-original-title='Download' aria-label='Download'></i></a></td>";
    $("#tbody_Claim_Document").append(tr);

    var ItemsClaimDocument = {};
    ItemsClaimDocument["RowId"] = Claim_Document_Count;
    ItemsClaimDocument["Claim_Document_Id"] = "0";
    ItemsClaimDocument["Beneficiary_Id"] = BeneficiaryArray[0];
    ItemsClaimDocument["Beneficiary_Type_Id"] = BeneficiaryArray[1];
    ItemsClaimDocument["Beneficiary_Name"] = Beneficiary_Name;
    ItemsClaimDocument["Document_Type_Id"] = Document_Type_Id;
    ItemsClaimDocument["Document_Type_Name"] = Document_Type_Name;
    ItemsClaimDocument["Document_Name"] = $.trim(Document_Name);
    ItemsClaimDocument["Document_Number"] = $.trim(Document_Number);
    ItemsClaimDocument["Document_File_Name"] = Document_File_Name;
    Claim_Document_ArrayList.push(ItemsClaimDocument);

    //  $("#Beneficiary_Id").val("0");
    var numberOfOptions = $('select#Beneficiary_Id option').length
    if (numberOfOptions == 1) {
        //  $("#Beneficiary_Name").val("1");
    }
    else {
        $("#Beneficiary_Id").val("0");
    }
    $("#Document_Type_Id").val("0");
    $("#Document_Name").val("");
    $("#Document_Number").val("");
    $("#Document_File_Name").val("");
    $("#upload_Document").val("");
    $(".update_icon").css("display", "none");
    $("#Claim_Document_Count").val(Claim_Document_Count);
}

var IS_Claim_DocumentEdit = false;
function Claim_Document_Edit(Rowid) {
    //debugger
    $(".error_msg").text("");
    if (IS_Claim_DocumentEdit != true) {
        IS_Claim_DocumentEdit = true;
        $("#CLM_DOC_BTN").removeAttr("onclick");
        $("#CLM_DOC_BTN").attr("onclick", "Claim_Document_Update(" + Rowid + ")");
        $("#CLM_DOC_BTN").text("Update");
        var oClaim_Document_ArrayList = Claim_Document_ArrayList.find(x => x.RowId == Rowid);
        var Beneficiary_Id = oClaim_Document_ArrayList.Beneficiary_Id + "_" + oClaim_Document_ArrayList.Beneficiary_Type_Id;
        $("#Beneficiary_Id").val(Beneficiary_Id);
        $("#Document_Type_Id").val(oClaim_Document_ArrayList.Document_Type_Id);
        $("#Document_Name").val(oClaim_Document_ArrayList.Document_Name);
        $("#Document_Number").val(oClaim_Document_ArrayList.Document_Number);
        $("#Document_File_Name").val(oClaim_Document_ArrayList.Document_File_Name);
        $(".update_icon").css("display", "block");
        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one docoment in edit mode.");
        return false;
    }
}

function Claim_Document_Update(Rowid) {
    debugger

    IS_Claim_DocumentEdit = false;
    var oClaim_Document_ArrayList = Claim_Document_ArrayList.find(x => x.RowId == Rowid);
    $("#tr_" + Rowid + "").remove();

    var Beneficiary_Id = $("#Beneficiary_Id").val();
    var Beneficiary_Name = $("#Beneficiary_Id option[value=" + Beneficiary_Id + "]").text();
    var Document_Type_Id = $("#Document_Type_Id").val();
    var Document_Type_Name = $("#Document_Type_Id option[value=" + Document_Type_Id + "]").text();
    var Document_Name = $("#Document_Name").val();
    var Document_Number = $("#Document_Number").val();
    var Document_File_Name = $("#Document_File_Name").val();

    var flag = 0;
    $(".error_msg").text("");
    if (DropDownValidation("Beneficiary_Id", "Select Beneficiary") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Document_Type_Id", "Select Document Type") == 1) {
        flag = 1;
    }
    if (Document_Type_Id == "117") {
        if (TextBoxValidation("Document_Name", "Enter Document Name") == 1) {
            flag = 1;
        }
    }
    if ($("#Document_File_Name").val() == "") {
        alert("Please upload document");
        flag = 1;
    }
    $("#err_Document_no").text('');
    if (Document_Type_Id == "112") {
        if (Document_Number == "") {
            $("#err_Document_no").text('Please enter Account/invoice number');
            flag = 1;
        }
    }
    if (flag == 1) {
        return false;
    }

    var oClaim_Document_ArrayList = Claim_Document_ArrayList;
    var document = oClaim_Document_ArrayList.length;
    var i = 0;
    var d_name = $("#Document_Type_Id").val();
    // debugger;
    for (i = 0; i < document; i++) {
        if (oClaim_Document_ArrayList[i].Document_Type_Id == 112 && oClaim_Document_ArrayList[i].Document_Type_Id == d_name) {
            if (oClaim_Document_ArrayList[i].Document_Type_Id == 112 && oClaim_Document_ArrayList[i].RowId == Rowid) {
                // return true;
            }
            else {
                alert("Account / Invoice is already exist.");
                return false;
            }
        }
    }

    //  var oClaim_Document_ArrayList = Claim_Document_ArrayList.find(x => x.RowId == Rowid);


    var BeneficiaryArray = Beneficiary_Id.split("_");


    oClaim_Document_ArrayList.Beneficiary_Id = BeneficiaryArray[0];
    oClaim_Document_ArrayList.Beneficiary_Type_Id = BeneficiaryArray[1];
    oClaim_Document_ArrayList.Beneficiary_Name = Beneficiary_Name;
    oClaim_Document_ArrayList.Document_Type_Id = Document_Type_Id;
    oClaim_Document_ArrayList.Document_Type_Name = Document_Type_Name;
    oClaim_Document_ArrayList.Document_Name = Document_Name;
    oClaim_Document_ArrayList.Document_Number = Document_Number;
    oClaim_Document_ArrayList.Document_File_Name = Document_File_Name;


    var tr = "<tr id=tr_" + Rowid + ">";
    tr += "<td>" + Beneficiary_Name + "</td>";
    tr += "<td>" + Document_Type_Name + "</td>";
    tr += "<td>" + Document_Name + "</td>";
    tr += "<td>" + Document_Number + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Claim_Document_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Claim_Document_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a><a href='JavaScript:Void(0);' onclick='DownloadFile(\"" + Document_File_Name + "\")'><i class='fa fa-download' data-bs-toggle='tooltip' title='' data-bs-original-title='Download' aria-label='Download'></i></a></td>";
    $("#tbody_Claim_Document").append(tr);

    /* $("#Beneficiary_Id").val("0");*/
    var numberOfOptions = $('select#Beneficiary_Id option').length
    if (numberOfOptions == 1) {
        // $("#Beneficiary_Name").val("1");
    }
    else {
        $("#Beneficiary_Id").val("0");
    }
    $("#Document_Type_Id").val("0");
    $("#Document_Name").val("");
    $("#Document_Number").val("");
    $("#Document_File_Name").val("");
    $("#upload_Document").val("");
    $(".update_icon").css("display", "none");

    $("#CLM_DOC_BTN").removeAttr("onclick");
    $("#CLM_DOC_BTN").attr("onclick", "Claim_Document_Add()");
    $("#CLM_DOC_BTN").text("Add");
}

function Claim_Document_Delete(Rowid) {
    //debugger
    var oClaim_Document_ArrayList = Claim_Document_ArrayList.find(x => x.RowId == Rowid);
    if (oClaim_Document_ArrayList != undefined) {


        for (var i = 0; i < Claim_Document_ArrayList.length; i++) {
            if (Claim_Document_ArrayList[i].RowId == Rowid) {
                Claim_Document_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#tr_" + Rowid + "").remove();
    }
}

function Upload_Claim_Document(event) {
    //debugger
    $(".update_icon").css("display", "none")
    var Image_Size_KB_For_Validation = (Math.round(event.target.files[0].size / 1024));
    var Image_Size_MB_For_Validation = (Math.round(Image_Size_KB_For_Validation / 1024));
    if (Image_Size_KB_For_Validation > 4096) {  // Max file size will be 4 mb or 4096 KB
        alert("Max file size 1mb is allowed. The size of uploaded file is " + Image_Size_MB_For_Validation + " mb (approximately).");

        return;
    }
    //debugger
    var fileUpload = $("#upload_Document").get(0);
    var files = fileUpload.files;
    var fileData = new FormData();
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    $.ajax({
        url: '/MediClaim/UploadClaimDocument',
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (result) {
            //debugger
            $("#Document_File_Name").val(result);
            $(".update_icon").css("display", "block")
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function ValidateClaimDocument() {
    //debugger
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    $("#HDN_Claim_Document").val(JSON.stringify(Claim_Document_ArrayList));
}

function ClaimDocumentTypeOnChange() {
    //debugger
    var Document_Type_Id = $("#Document_Type_Id").val();
    if (Document_Type_Id == "117") {
        $("#spanDN").show();
    }
    else {
        $("#spanDN").hide();
    }
    if (Document_Type_Id == "112") {
        $("#spanDNO").show();
    }
    else {
        $("#spanDNO").hide();
    }
}
//#endregion


//#region Treatment


function GetMinutsQty() {
    debugger;
    var Treatment_Date_From = $("#Treatment_Date_From").val();
    var Treatment_Date_To = $("#Treatment_Date_To").val();
    var Treatment_Time_From = $("#Treatment_Time_From").val();
    var Treatment_Time_To = $("#Treatment_Time_To").val();

    $("#err_Treatment_Date_From").text("");
    $("#err_Treatment_Time_From").text("");
    $("#err_Treatment_Date_To").text("");
    $("#err_Treatment_Time_To").text("");
    var flag = 0;
    $("#Tariff_Qty").val('')

    var arrTreatmentDateFrom = Treatment_Date_From.split('/');
    var SplitTreatmentDateFrom = arrTreatmentDateFrom[2] + '-' + arrTreatmentDateFrom[1] + '-' + arrTreatmentDateFrom[0];
    var oFromDateTime = new Date(SplitTreatmentDateFrom + " " + Treatment_Time_From);

    var arrTreatmentDateTo = Treatment_Date_To.split('/');
    var SplitTreatmentDateTo = arrTreatmentDateTo[2] + '-' + arrTreatmentDateTo[1] + '-' + arrTreatmentDateTo[0];
    var oToDateTime = new Date(SplitTreatmentDateTo + " " + Treatment_Time_To);

    if (Treatment_Date_From == "") {
        flag = 1;
        $("#err_Treatment_Date_From").text("Select From Date");
    }
    if (Treatment_Time_From == "") {
        flag = 1;
        $("#err_Treatment_Time_From").text("Enter From Time");
    }
    if (Treatment_Date_To == "") {
        flag = 1;
        $("#err_Treatment_Date_To").text("Select To Date");
    }
    if (Treatment_Time_To == "") {
        flag = 1;
        $("#err_Treatment_Time_To").text("Enter To Time");
    }
    if (Treatment_Date_From != "") {
        if (oFromDateTime == "Invalid Date") {
            flag = 1;
            $("#err_Treatment_Date_From").text("Select Correct From Date and Time");
        }

    }

    if (Treatment_Date_To != "") {
        if (oToDateTime == "Invalid Date") {
            flag = 1;
            $("#err_Treatment_Date_To").text("Select Correct To Date and Time");
        }

    }


    if (flag == 1) {
        return false;
    }
    else {
        if (oFromDateTime > oToDateTime) {
            // alert("To date should grater than from date")
            $("#err_Treatment_Date_From").text("To date should be greater than from date");
            $("#Tariff_Qty").val('')
            return false;
        }
        debugger;
        var diffsec = (oToDateTime - oFromDateTime);
        var Days = Math.floor(diffsec / 86400000); // days
        var Hrs = Math.floor((diffsec % 86400000) / 3600000); // hours

        var Hours = Math.floor(Days * 24) + parseInt(Hrs);
        var Mins = Math.round(((diffsec % 86400000) % 3600000) / 60000); // minutes

        //if (Hours < 10) {
        //    Hours = "0" + Hours;
        //}
        //if (Mins < 10) {
        //    Mins = "0" + Mins;
        //}
        var HoursToMin = parseInt(Hours) * 60;
        var Qty = parseInt(HoursToMin) + parseInt(Mins);
        // var RunningDueration = Hours + ":" + Mins;

        //  var hoursFraction = Math.abs(oToDateTime - oFromDateTime) / 36e5;


        $("#Tariff_Qty").val(Qty)
        var Tariff_Unit_Price = $("#Tariff_Unit_Price").val()
        if (Tariff_Unit_Price == "") {
            Tariff_Unit_Price = 0;
        }
        $("#Tariff_Amount").val(parseFloat(parseFloat(Tariff_Unit_Price) * parseInt(Qty)).toFixed(2))
    }
}

function ClaimAmountUnitOnchange() {
    debugger;
    var Claim_Amount_Unit = $("#Claim_Amount_Unit").val();
    var Tariff_Qty = $("#Tariff_Qty").val();
    if (Claim_Amount_Unit == "") {
        Claim_Amount_Unit = 0;
    }
    if (Tariff_Qty == "") {
        Tariff_Qty = 0;
    }
    var Claim_Amount = parseFloat(Claim_Amount_Unit) * parseFloat(Tariff_Qty);
    if (Claim_Amount != 0) {
        $("#Claim_Amount").val(parseFloat(Claim_Amount).toFixed(2));
    }
    var Tariff_Amount = $("#Tariff_Amount").val();
    var Claim_Amount = $("#Claim_Amount").val();
    if (Tariff_Amount == "") {
        Tariff_Amount = 0;
    }
    if (Claim_Amount == "") {
        Claim_Amount = 0;
    }

    if ((Claim_Amount != 0) || (Tariff_Amount != 0)) {

        if (parseFloat(Claim_Amount) < parseFloat(Tariff_Amount)) {
            $("#Paid_Amount").val(parseFloat(Claim_Amount).toFixed(2));
        }
        else {
            $("#Paid_Amount").val(parseFloat(Tariff_Amount).toFixed(2));
        }

    }

    if (Tariff_Amount == 0) {
        $("#Paid_Amount").val(parseFloat(Claim_Amount).toFixed(2));
    }

}

function TariffQtyOnchange() {
    debugger;

    var Tariff_Qty = $("#Tariff_Qty").val();
    var Tariff_Unit_Price = $("#Tariff_Unit_Price").val();
    if (Tariff_Qty == "") {
        Tariff_Qty = 0;
    }
    if (Tariff_Unit_Price == "") {
        Tariff_Unit_Price = 0;
    }
    var Tariff_Amount = parseFloat(Tariff_Qty) * parseFloat(Tariff_Unit_Price);
    if (Tariff_Amount != 0) {
        $("#Tariff_Amount").val(parseFloat(Tariff_Amount).toFixed(2));
    }
    ClaimAmountUnitOnchange();
}


var Treatment_ArrayList = [];

function Treatment_Add() {
    debugger
    var Beneficiary_Id = $("#Beneficiary_Id").val();
    var Beneficiary_Name = $("#Beneficiary_Id option[value=" + Beneficiary_Id + "]").text();
    var Discipline_Id = $("#Discipline_Id").val();
    var Discipline_Name = $("#Discipline_Id option[value=" + Discipline_Id + "]").text();
    var Treatment_Date_From = $("#Treatment_Date_From").val();
    var Treatment_Date_To = $("#Treatment_Date_To").val();
    var Treatment_Time_From = $("#Treatment_Time_From").val();
    var Treatment_Time_To = $("#Treatment_Time_To").val();
    var Tariff_Amount = $("#Tariff_Amount").val();
    var Claim_Amount = $("#Claim_Amount").val();
    var Paid_Amount = $("#Paid_Amount").val();
    var Tariff_Qty = $("#Tariff_Qty").val();
    var Tariff_Unit_Price = $("#Tariff_Unit_Price").val();
    var Claim_Amount_Unit = $("#Claim_Amount_Unit").val();
    var Claim_Amount_Unit = $("#Claim_Amount_Unit").val();

    var Sp_Invoice_Number = $("#Sp_Invoice_Number").val().trim();
    $("#err_Sp_Invoice_Number").text("");

    var BeneficiaryArray = Beneficiary_Id.split("_");
    var DisciplineArray = Discipline_Name.split("-");
    var BeneficiaryNameArray = Beneficiary_Name.split("(");
    var BeneficiaryShortName = "(" + BeneficiaryNameArray[1];
    var TariffId = $("#TariffId").val();
    var Tariff_Code = $("#Tariff_Code").val();
    var Tariff_Desc = $("#Tariff_Desc").val();
    var Tariff_Code_Desc = $("#TariffCode").val();
    var Benefit_Id = $("#Benefit_Id").val();
    var Benefit_Name = $("#Benefit_Name").val();
    debugger;
    var flag = 0;
    $(".error_msg").text("");
    var Claim_date = $("#pClaim_date").val();
    var date_Claim = Claim_date.split('/');
    var myarray = date_Claim[2] + '-' + date_Claim[1] + '-' + date_Claim[0];
    var Claim_Date = new Date(myarray);
    var treatment = Treatment_Date_From.split('/');
    var myarray1 = treatment[2] + '-' + treatment[1] + '-' + treatment[0];
    var Treatment_date = new Date(myarray1);
    if (Claim_Date < Treatment_date) {
        alert("Claim date can not be smaller than treatment date");
        flag = 1;
    }

    if (DropDownValidation("Beneficiary_Id", "Select Beneficiary") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Discipline_Id", "Select Discipline") == 1) {
        flag = 1;
    }
    //if (TextBoxValidation("Tariff_Amount", "Enter Tariff Amount") == 1) {
    //    flag = 1;
    //}
    if (TextBoxValidation("Claim_Amount", "Enter Claim Amount") == 1) {
        flag = 1;
    }
    //if (TextBoxValidation("Claim_Amount", "Enter Claim Amount") == 0) {
    //    if (DecimalValidation("Claim_Amount", "Enter only numeric") ==1) {
    //        flag = 1;
    //    }
    //}
    if (TextBoxValidation("Paid_Amount", "Enter Paid Amount") == 1) {
        flag = 1;
    }
    if (CheckTariifAmountOnAddButton(TariffId) == 1) {
        alert("You can not modify Tariff amount or paid amount");
        flag = 1;

    }
    if (Tariff_Amount == "") {
        Tariff_Amount = 0;
    }
    if (Sp_Invoice_Number == "") {
        flag = 1;
        $("#err_Sp_Invoice_Number").text('Enter Account/Invoice Number');

    }
    debugger;
    var total_claim_amout = parseFloat(Tariff_Qty * Claim_Amount_Unit).toFixed(2);
    if (Tariff_Amount != "0") {
        if (Claim_Amount != total_claim_amout) {
            alert('You can not modify claim amount');
            flag = 1;
        }
    }

    var oTreatment_ArrayListLength = Treatment_ArrayList.length;
    var oTreatment_ArrayList = Treatment_ArrayList;
    var i = 0;
    for (i = 0; i < oTreatment_ArrayListLength; i++) {
        if (oTreatment_ArrayList[i].Beneficiary_Id == BeneficiaryArray[0] && oTreatment_ArrayList[i].Tariff_Id == TariffId && oTreatment_ArrayList[i].Tariff_Code == Tariff_Code) {
            alert("Beneficiary, Tariff code is duplicate");
            flag = 1;
            // return false;
        }
    }
    if (Beneficiary_Id != "0") {
        if (ClaimTreatmentDuplicateTarifCodeCheck() == 1) {
            flag = 1;
        }
    }
    if (flag == 1) {
        return false;
    }





    var Trt_Count = $("#Treatment_Count").val();
    var Treatment_Count = parseInt(Trt_Count) + 1;


    var div = "<div class='row border-bottom mt-3' id=div_" + Treatment_Count + ">";
    div += "<div class='col-lg-5 col-md-5'>";
    div += "<div class='row'>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray'>Beneficiary:</label> <span>" + BeneficiaryNameArray[0] + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray'>Discipline Code:</label> <span>" + Discipline_Name + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray'>Tariff Code:</label> <span>" + Tariff_Code_Desc + "</span>";
    div += "</div>";
    div += "</div>";
    div += "</div>";
    div += "<div class='col-lg-3 col-md-3'>";
    div += " <div class='row'>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Date From:</label> <span>" + Treatment_Date_From + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Time From:</label> <span>" + Treatment_Time_From + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Date To:</label> <span>" + Treatment_Date_To + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Time To:</label> <span>" + Treatment_Time_To + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Qty.:</label> <span>" + Tariff_Qty + "</span>";
    div += "</div>";
    div += "</div>";
    div += " </div>";
    div += "<div class='col-lg-3 col-md-3'>";
    div += " <div class='row'>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Tariff Unit Price:</label> <span>" + parseFloat(Tariff_Unit_Price).toFixed(2) + "</span>";
    div += "</div>";
    div += " <div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Tariff Amount:</label> <span>" + parseFloat(Tariff_Amount).toFixed(2) + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Claim Amount / Unit: </label> <span>" + parseFloat(Claim_Amount_Unit).toFixed(2) + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Claim Amount: </label> <span>" + parseFloat(Claim_Amount).toFixed(2) + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<b class='paid_amount'><label style='width:120px;'>Paid Amount: </label> <span>" + parseFloat(Paid_Amount).toFixed(2) + "</span></b>";
    div += "</div>";
    div += " </div>";
    div += "</div>";
    div += " <div class='col-lg-1 col-md-1 text-end action' style='margin:20px 0 0;'>";
    div += " <a href='JavaScript:Void(0);' onclick='Treatment_Edit(" + Treatment_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='' data-bs-original-title='Edit' aria-label='Edit'></i></a>";
    div += " <a href='JavaScript:Void(0);' onclick='Treatment_Delete(" + Treatment_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='' data-bs-original-title='Delete' aria-label='Delete'></i></a>";
    div += "</div>";
    div += " </div>";
    $("#div_Treatment").append(div);


    var ItemsTreatmentDocument = {};
    ItemsTreatmentDocument["RowId"] = Treatment_Count;
    ItemsTreatmentDocument["Claim_Treatment_Id"] = "0";
    ItemsTreatmentDocument["Beneficiary_Id"] = BeneficiaryArray[0];
    ItemsTreatmentDocument["Beneficiary_Type_Id"] = BeneficiaryArray[1];
    ItemsTreatmentDocument["Beneficiary_Name"] = BeneficiaryNameArray[0];
    ItemsTreatmentDocument["Beneficiary_Type_Short_Name"] = BeneficiaryShortName;
    ItemsTreatmentDocument["Discipline_Id"] = Discipline_Id;
    ItemsTreatmentDocument["Discipline_Code"] = DisciplineArray[0];
    ItemsTreatmentDocument["Discipline_Description"] = DisciplineArray[1];
    ItemsTreatmentDocument["Tariff_Id"] = TariffId;
    ItemsTreatmentDocument["Tariff_Code"] = Tariff_Code;
    ItemsTreatmentDocument["Tariff_Description"] = Tariff_Desc;
    ItemsTreatmentDocument["Benefit_Id"] = Benefit_Id;
    ItemsTreatmentDocument["BeneFit_Name"] = Benefit_Name;
    ItemsTreatmentDocument["Treatment_Date_From"] = Treatment_Date_From;
    ItemsTreatmentDocument["Treatment_Date_To"] = Treatment_Date_To;
    ItemsTreatmentDocument["Treatment_Time_From"] = Treatment_Time_From;
    ItemsTreatmentDocument["Treatment_Time_To"] = Treatment_Time_To;
    ItemsTreatmentDocument["Tariff_Amount"] = Tariff_Amount;
    ItemsTreatmentDocument["Claim_Amount"] = Claim_Amount;
    ItemsTreatmentDocument["Paid_Amount"] = Paid_Amount;
    ItemsTreatmentDocument["Tariff_Qty"] = Tariff_Qty;
    ItemsTreatmentDocument["Tariff_Unit_Price"] = parseFloat(Tariff_Unit_Price).toFixed(2);
    ItemsTreatmentDocument["Claim_Amount_Unit"] = parseFloat(Claim_Amount_Unit).toFixed(2);
    Treatment_ArrayList.push(ItemsTreatmentDocument);



    //debugger

    var total = 0;
    for (var i = 0; i < Treatment_ArrayList.length; i++) {
        total += parseFloat(Treatment_ArrayList[i].Paid_Amount);
    }
    $("#TotalAmount").text(parseFloat(total).toFixed(2));

    // $("#Beneficiary_Id").val("0");
    var numberOfOptions = $('select#Beneficiary_Id option').length
    if (numberOfOptions == 1) {
        //  $("#Beneficiary_Name").val("1");
    }
    else {
        $("#Beneficiary_Id").val("0");
    }
    var DisciplinedbLength = $('select#Discipline_Id option').length
    if (DisciplinedbLength == 1) {
        //  $("#Beneficiary_Name").val("1");
    }
    else {
        $("#Discipline_Id").val("0");
    }
    /* $("#Discipline_Id").val("0");*/
    $("#TariffCode").val("");
    $("#Treatment_Date_From").val("");
    $("#Treatment_Date_To").val("");
    $("#Treatment_Time_From").val("");
    $("#Treatment_Time_To").val("");
    $("#Tariff_Amount").val("");
    $("#Claim_Amount").val("");
    $("#Paid_Amount").val("");
    $("#TariffId").val("");
    $("#Benefit_Id").val("0");
    $("#Benefit_Name").val("");
    $("#Tariff_Qty").val("1");
    $("#Tariff_Unit_Price").val("");
    $("#Claim_Amount_Unit").val("");
    var oTreatmentListLength = Treatment_ArrayList.length;
    if (oTreatmentListLength > 0) {
        $("#Sp_Invoice_Number").attr('readonly', true);
    }

    $("#Treatment_Count").val(Treatment_Count);
}

var IS_Treatment_Edit = false;
function Treatment_Edit(Rowid) {
    //debugger
    $(".error_msg").text("");
    if (IS_Treatment_Edit != true) {
        IS_Treatment_Edit = true;
        $("#TRTM_BTN").removeAttr("onclick");
        $("#TRTM_BTN").attr("onclick", "Treatment_Update(" + Rowid + ")");
        $("#TRTM_BTN").text("Update");


        //$("#TRTM_CNC_BTN").attr("onclick", "Treatment_Update(" + Rowid + ")");
        //$("#TRTM_CNC_BTN").text("Update");
        var oTreatment_ArrayList = Treatment_ArrayList.find(x => x.RowId == Rowid);
        var Beneficiary_Id = oTreatment_ArrayList.Beneficiary_Id + "_" + oTreatment_ArrayList.Beneficiary_Type_Id;
        $("#Beneficiary_Id").val(Beneficiary_Id);
        $("#Discipline_Id").val(oTreatment_ArrayList.Discipline_Id);
        $("#Benefit_Id").val(oTreatment_ArrayList.Benefit_Id);
        $("#Benefit_Name").val(oTreatment_ArrayList.BeneFit_Name);
        $("#TariffId").val(oTreatment_ArrayList.Tariff_Id);
        $("#Tariff_Code").val(oTreatment_ArrayList.Tariff_Code);
        $("#Tariff_Desc").val(oTreatment_ArrayList.Tariff_Description);
        var TariffCod = oTreatment_ArrayList.Tariff_Code + " - " + oTreatment_ArrayList.Tariff_Description;
        $("#TariffCode").val(TariffCod);
        $("#Treatment_Date_From").val(oTreatment_ArrayList.Treatment_Date_From);
        $("#Treatment_Date_To").val(oTreatment_ArrayList.Treatment_Date_To);
        $("#Treatment_Time_From").val(oTreatment_ArrayList.Treatment_Time_From);
        $("#Treatment_Time_To").val(oTreatment_ArrayList.Treatment_Time_To);
        $("#Tariff_Amount").val(oTreatment_ArrayList.Tariff_Amount);
        $("#Claim_Amount").val(oTreatment_ArrayList.Claim_Amount);
        $("#Paid_Amount").val(oTreatment_ArrayList.Paid_Amount);
        $("#Tariff_Qty").val(oTreatment_ArrayList.Tariff_Qty);
        $("#Tariff_Unit_Price").val(oTreatment_ArrayList.Tariff_Unit_Price);
        $("#Claim_Amount_Unit").val(oTreatment_ArrayList.Claim_Amount_Unit);


        $("#div_" + Rowid + "").hide();

    } else {
        alert("Already one row in edit mode.");
        return false;
    }
}

function Treatment_Update(Rowid) {
    debugger
    IS_Treatment_Edit = false;
    var oTreatment_ArrayList = Treatment_ArrayList.find(x => x.RowId == Rowid);
    $("#err_Sp_Invoice_Number").text("");
    var total = 0;
    for (var i = 0; i < Treatment_ArrayList.length; i++) {
        total += parseFloat(Treatment_ArrayList[i].Paid_Amount);
    }
    var DeleteAmount = parseFloat(total) - parseFloat(oTreatment_ArrayList.Paid_Amount);
    $("#TotalAmount").text(parseFloat(DeleteAmount).toFixed(2));
    $("#div_" + Rowid + "").remove();

    var Beneficiary_Id = $("#Beneficiary_Id").val();
    var Beneficiary_Name = $("#Beneficiary_Id option[value=" + Beneficiary_Id + "]").text();
    var Discipline_Id = $("#Discipline_Id").val();
    var Discipline_Name = $("#Discipline_Id option[value=" + Discipline_Id + "]").text();
    var Treatment_Date_From = $("#Treatment_Date_From").val();
    var Treatment_Date_To = $("#Treatment_Date_To").val();
    var Treatment_Time_From = $("#Treatment_Time_From").val();
    var Treatment_Time_To = $("#Treatment_Time_To").val();
    var Tariff_Amount = $("#Tariff_Amount").val();
    var Claim_Amount = $("#Claim_Amount").val();
    var Paid_Amount = $("#Paid_Amount").val();
    var Tariff_Qty = $("#Tariff_Qty").val();
    var Tariff_Unit_Price = $("#Tariff_Unit_Price").val();
    var Claim_Amount_Unit = $("#Claim_Amount_Unit").val();
    var Sp_Invoice_Number = $("#Sp_Invoice_Number").val().trim();

    var BeneficiaryArray = Beneficiary_Id.split("_");
    var DisciplineArray = Discipline_Name.split("-");
    var BeneficiaryNameArray = Beneficiary_Name.split("(");
    var BeneficiaryShortName = "(" + BeneficiaryNameArray[1];
    var TariffId = $("#TariffId").val();
    var Tariff_Code = $("#Tariff_Code").val();
    var Tariff_Desc = $("#Tariff_Desc").val();
    var Tariff_Code_Desc = $("#TariffCode").val();
    var Benefit_Id = $("#Benefit_Id").val();
    var Benefit_Name = $("#Benefit_Name").val();

    var flag = 0;
    $(".error_msg").text("");

    var Claim_date = $("#pClaim_date").val();
    var date_Claim = Claim_date.split('/');
    var myarray = date_Claim[2] + '-' + date_Claim[1] + '-' + date_Claim[0];
    var Claim_Date = new Date(myarray);
    var treatment = Treatment_Date_From.split('/');
    var myarray1 = treatment[2] + '-' + treatment[1] + '-' + treatment[0];
    var Treatment_date = new Date(myarray1);
    if (Claim_Date < Treatment_date) {
        alert("Claim date can not be smaller than treatment date");
        flag = 1;
    }

    if (DropDownValidation("Beneficiary_Id", "Select Beneficiary") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Discipline_Id", "Select Discipline") == 1) {
        flag = 1;
    }
    //if (TextBoxValidation("Tariff_Amount", "Enter Tariff Amount") == 1) {
    //    flag = 1;
    //}
    if (TextBoxValidation("Claim_Amount", "Enter Claim Amount") == 1) {
        flag = 1;
    }
    //if (TextBoxValidation("Claim_Amount", "Enter Claim Amount") == 0) {
    //    if (DecimalValidation("Claim_Amount", "Enter only numeric") == 1) {
    //        flag = 1;
    //    }
    //}
    if (TextBoxValidation("Paid_Amount", "Enter Paid Amount") == 1) {
        flag = 1;
    }
    if (CheckTariifAmountOnAddButton(TariffId) == 1) {
        alert("You can not modify Tariff amount or paid amount");
        flag = 1;

    }
    if (Tariff_Amount == "") {
        Tariff_Amount = 0;
    }
    if (Sp_Invoice_Number == "") {
        flag = 1;
        $("#err_Sp_Invoice_Number").text('Enter Account/Invoice Number');

    }
    debugger;
    var total_claim_amout = parseFloat(Tariff_Qty * Claim_Amount_Unit).toFixed(2);
    if (Tariff_Amount != "0") {
        if (Claim_Amount != total_claim_amout) {
            alert('You can not modify claim amount');
            flag = 1;
        }
    }
    if (Beneficiary_Id != "0") {
        if (ClaimTreatmentDuplicateTarifCodeCheck() == 1) {
            flag = 1;
        }
    }
    if (flag == 1) {
        return false;
    }

    //if (Tariff_Amount == "") {
    //    Tariff_Amount = 0;
    //}

    oTreatment_ArrayList.Beneficiary_Id = BeneficiaryArray[0];
    oTreatment_ArrayList.Beneficiary_Type_Id = BeneficiaryArray[1];
    oTreatment_ArrayList.Beneficiary_Name = BeneficiaryNameArray[0];
    oTreatment_ArrayList.Beneficiary_Type_Short_Name = BeneficiaryShortName;
    oTreatment_ArrayList.Discipline_Id = Discipline_Id;
    oTreatment_ArrayList.Discipline_Code = DisciplineArray[0];
    oTreatment_ArrayList.Discipline_Description = DisciplineArray[1];
    oTreatment_ArrayList.Tariff_Id = TariffId;
    oTreatment_ArrayList.Tariff_Code = Tariff_Code;
    oTreatment_ArrayList.Tariff_Description = Tariff_Desc;
    oTreatment_ArrayList.Benefit_Id = Benefit_Id;
    oTreatment_ArrayList.BeneFit_Name = Benefit_Name;
    oTreatment_ArrayList.Treatment_Date_From = Treatment_Date_From;
    oTreatment_ArrayList.Treatment_Date_To = Treatment_Date_To;
    oTreatment_ArrayList.Treatment_Time_From = Treatment_Time_From;
    oTreatment_ArrayList.Treatment_Time_To = Treatment_Time_To;
    oTreatment_ArrayList.Tariff_Amount = Tariff_Amount;
    oTreatment_ArrayList.Claim_Amount = Claim_Amount;
    oTreatment_ArrayList.Paid_Amount = Paid_Amount;
    oTreatment_ArrayList.Tariff_Qty = Tariff_Qty;
    oTreatment_ArrayList.Tariff_Unit_Price = Tariff_Unit_Price;
    oTreatment_ArrayList.Claim_Amount_Unit = Claim_Amount_Unit;




    var div = "<div class='row border-bottom mt-3' id=div_" + Rowid + ">";
    div += "<div class='col-lg-5 col-md-5'>";
    div += "<div class='row'>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray'>Beneficiary:</label> <span>" + BeneficiaryNameArray[0] + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray'>Discipline Code:</label> <span>" + Discipline_Name + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray'>Tariff Code:</label> <span>" + Tariff_Code_Desc + "</span>";
    div += "</div>";
    div += "</div>";
    div += "</div>";
    div += "<div class='col-lg-3 col-md-3'>";
    div += " <div class='row'>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Date From:</label> <span>" + Treatment_Date_From + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Time From:</label> <span>" + Treatment_Time_From + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Date To:</label> <span>" + Treatment_Date_To + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Time To:</label> <span>" + Treatment_Time_To + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += " <label class='text-gray' style='width:70px;'>Qty.:</label> <span>" + Tariff_Qty + "</span>";
    div += "</div>";
    div += "</div>";
    div += " </div>";
    div += "<div class='col-lg-3 col-md-3'>";
    div += " <div class='row'>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Tariff Unit Price:</label> <span>" + parseFloat(Tariff_Unit_Price).toFixed(2) + "</span>";
    div += "</div>";
    div += " <div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Tariff Amount:</label> <span>" + parseFloat(Tariff_Amount).toFixed(2) + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Claim Amount / Unit: </label> <span>" + parseFloat(Claim_Amount_Unit).toFixed(2) + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<label class='text-gray' style='width:120px;'>Claim Amount: </label> <span>" + parseFloat(Claim_Amount).toFixed(2) + "</span>";
    div += "</div>";
    div += "<div class='col-lg-12 col-md-12 pb-1'>";
    div += "<b class='paid_amount'><label style='width:120px;'>Paid Amount: </label> <span>" + parseFloat(Paid_Amount).toFixed(2) + "</span></b>";
    div += "</div>";
    div += " </div>";
    div += "</div>";
    div += " <div class='col-lg-1 col-md-1 text-end action' style='margin:20px 0 0;'>";
    div += " <a href='JavaScript:Void(0);' onclick='Treatment_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='' data-bs-original-title='Edit' aria-label='Edit'></i></a>";
    div += " <a href='JavaScript:Void(0);' onclick='Treatment_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='' data-bs-original-title='Delete' aria-label='Delete'></i></a>";
    div += "</div>";
    div += " </div>";
    $("#div_Treatment").append(div);

    var total = 0;
    for (var i = 0; i < Treatment_ArrayList.length; i++) {
        total += parseFloat(Treatment_ArrayList[i].Paid_Amount);
    }
    $("#TotalAmount").text(parseFloat(total).toFixed(2));

    //  $("#Beneficiary_Id").val("0");
    var numberOfOptions = $('select#Beneficiary_Id option').length
    if (numberOfOptions == 1) {
        //  $("#Beneficiary_Name").val("1");
    }
    else {
        $("#Beneficiary_Id").val("0");
    }
    var DisciplinedbLength = $('select#Discipline_Id option').length
    if (DisciplinedbLength == 1) {
        //  $("#Beneficiary_Name").val("1");
    }
    else {
        $("#Discipline_Id").val("0");
    }
    /*  $("#Discipline_Id").val("0");*/
    $("#TariffCode").val("");
    $("#Treatment_Date_From").val("");
    $("#Treatment_Date_To").val("");
    $("#Treatment_Time_From").val("");
    $("#Treatment_Time_To").val("");
    $("#Tariff_Amount").val("");
    $("#Claim_Amount").val("");
    $("#Paid_Amount").val("");
    $("#TariffId").val("");
    $("#Benefit_Id").val("0");
    $("#Benefit_Name").val("");
    $("#Tariff_Qty").val("1");
    $("#Tariff_Unit_Price").val("");
    $("#Claim_Amount_Unit").val("");

    $("#TRTM_BTN").removeAttr("onclick");
    $("#TRTM_BTN").attr("onclick", "Treatment_Add()");
    $("#TRTM_BTN").text("Add");
    var oTreatmentListLength = Treatment_ArrayList.length;
    if (oTreatmentListLength > 0) {
        $("#Sp_Invoice_Number").attr('readonly', true);
    }
}

function Treatment_Delete(Rowid) {
    //debugger
    var oTreatment_ArrayList = Treatment_ArrayList.find(x => x.RowId == Rowid);

    var total = 0;
    for (var i = 0; i < Treatment_ArrayList.length; i++) {
        total += parseFloat(Treatment_ArrayList[i].Paid_Amount);
    }
    var DeleteAmount = parseFloat(total) - parseFloat(oTreatment_ArrayList.Paid_Amount);
    $("#TotalAmount").text(parseFloat(DeleteAmount).toFixed(2));
    if (oTreatment_ArrayList != undefined) {


        for (var i = 0; i < Treatment_ArrayList.length; i++) {
            if (Treatment_ArrayList[i].RowId == Rowid) {
                Treatment_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#div_" + Rowid + "").remove();
    }

    var oTreatmentListLength = Treatment_ArrayList.length;
    if (oTreatmentListLength == 0) {
        $("#Sp_Invoice_Number").attr('readonly', false);
    }
}

function ValidateTreatment() {
    //debugger
    var flag = 0;
    $(".error_msg").text("");
    $("#preload").css("display", "block");
    if (TextBoxValidation("Sp_Invoice_Number", "Enter invoice number") == 1) {
        flag = 1;
    }
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('SBTN').hidden = true;

    if (flag == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('PRVBTN').hidden = false;
        document.getElementById('SBTN').hidden = false;
        return false;
    }
    $("#HDN_Treatment").val(JSON.stringify(Treatment_ArrayList));
    return true;

}

function TariffCodeGet_By_DisciplineId() {
    debugger
    $("#datalistOptions").html('');
    $("#Tariff_Amount").val('');
    $("#TariffId").val('');
    $("#Tariff_Code").val("");
    $("#Tariff_Desc").val("");
    $("#Claim_Amount").val('');
    $("#Paid_Amount").val('');
    $("#err_Tariff_Code").text("");
    $("#Tariff_Unit_Price").val("");

    var pDisciplineId = $("#Discipline_Id").val();
    var pTariffCode = $("#TariffCode").val();
    if (pTariffCode == "") {
        $("#datalistOptions").html('');
        $("#DivTariffCode").hide();

    }
    else {

        $.ajax({
            //Modify SA on 27-10-2022
            url: '/MediClaim/TariffCodeGet_By_DisciplineId',
            type: "Post",
            async: false,
            data: { pDisciplineId: pDisciplineId, pTariffCode: pTariffCode },
            dataType: "json",
            success: function (result) {
                //debugger
                if (result.length > 0) {
                    for (var dat in result) {
                        var value = result[dat].Tariff_Code + " - " + result[dat].Tariff_Description;
                        var Opt = '<li onclick="TariffAmountGet_By_TariffId(' + result[dat].Tariff_Id + ')">' + value + '</li>';
                        $("#datalistOptions").append(Opt);
                    }
                }
                $("#DivTariffCode").show();
            }
        });
    }
}

function TariffAmountGet_By_TariffId(pTariffId) {
    //debugger
    $("#datalistOptions").html('');
    var pClaim_date = $("#pClaim_date").val();
    $.ajax({

        url: '/MediClaim/TariffAmountGet_By_TariffId',
        type: "Post",
        async: false,
        data: { pTariffId: pTariffId, pClaim_date: pClaim_date },
        dataType: "json",
        success: function (result) {
            //debugger
            var value = result.Tariff_Code + " - " + result.Tariff;
            $("#TariffCode").val(value);
            $("#Tariff_Unit_Price").val(result.Price);
            /*   $("#Paid_Amount").val(result.Price);*/
            $("#TariffId").val(result.Tariff_Id);
            $("#Tariff_Code").val(result.Tariff_Code);
            $("#Tariff_Desc").val(result.Tariff);
            $("#Tariff_Qty").val("1");

            TariffQtyOnchange();
        },
        error: function (response) {
            $("#err_Tariff_Code").text("Tariff amount is not available in this tariff code");

        }
    });
}

function BenifitGet_By_DisciplineId() {
    debugger
    var pDisciplineId = $("#Discipline_Id").val();

    $("#Tariff_Amount").val("");
    $("#Claim_Amount").val("");
    $("#Paid_Amount").val("");
    $("#TariffCode").val("");
    $("#TariffId").val("");
    $("#Tariff_Code").val("");
    $("#Tariff_Desc").val("");
    $("#err_Tariff_Code").text("");
    $("#Tariff_Unit_Price").val("");

    $("#Benefit_Id").val("0");
    $("#Benefit_Name").val("");

    $.ajax({
        url: '/MediClaim/BenifitGet_By_DisciplineId',
        type: "Post",
        async: false,
        data: { pDisciplineId: pDisciplineId },
        dataType: "json",
        success: function (result) {
            //debugger
            var value = result.Tariff_Code + " - " + result.Tariff;
            $("#Benefit_Id").val(result.Benefit_Id);
            $("#Benefit_Name").val(result.Benefit_Name);
            // TariffQtyOnchange();
        }
    });
}

function PaidAmountOnchange() {
    // debugger;
    var Tariff_Amount = $("#Tariff_Amount").val();
    var Claim_Amount = $("#Claim_Amount").val();

    var ClaimAmount = 0;
    if (Claim_Amount != "") {
        ClaimAmount = Claim_Amount;
    }

    if (ClaimAmount != "0") {

        if (parseFloat(Claim_Amount) <= parseFloat(Tariff_Amount)) {
            $("#Paid_Amount").val(parseFloat(Claim_Amount).toFixed(2));
        }
        else {
            $("#Paid_Amount").val(parseFloat(Tariff_Amount).toFixed(2));
        }
    }
}

function CheckTariifAmountOnAddButton(pTariffId) {
    // debugger;
    var flag = 0;
    var Tariff_Unit_Price = $("#Tariff_Unit_Price").val();
    var pClaim_date = $("#pClaim_date").val();
    // var Paid_Amount = $("#Paid_Amount").val();
    // var Claim_Amount = $("#Claim_Amount").val();
    if (pTariffId == "" || pTariffId != "0") {
        $.ajax({

            url: '/MediClaim/TariffAmountGet_By_TariffId',
            type: "Post",
            async: false,
            data: { pTariffId: pTariffId, pClaim_date: pClaim_date },
            dataType: "json",
            success: function (result) {
                //  debugger
                if (result.Price != Tariff_Unit_Price) {
                    flag = 1;
                }
                //if (parseFloat(result.Price) < parseFloat(Paid_Amount)) {
                //    flag = 1;
                //}
                if (flag == 1) {
                    $("#Tariff_Amount").val('');
                    $("#TariffId").val('');
                    $("#Tariff_Code").val("");
                    $("#Tariff_Desc").val("");
                    $("#TariffCode").val("");
                    // $("#Claim_Amount").val('');
                    // $("#Paid_Amount").val('');
                    $("#err_Tariff_Code").text("");
                }

                $("#Tariff_Amount").prop('readonly', true);
                $("#Paid_Amount").prop('readonly', true);
            },
            error: function (response) {
                //  $("#err_Tariff_Code").text("Tariff amount is not available in this tariff code");

            }
        });
    }
    return flag;
}

function ClaimTreatmentDuplicateTarifCodeCheck() {
    debugger
    flag = 0;

    var Sp_Invoice_Number = $("#Sp_Invoice_Number").val().trim();
    var Beneficiary_Id = $("#Beneficiary_Id").val();
    var TariffId = $("#TariffId").val();
    var Tariff_Code = $("#Tariff_Code").val();
    var pClaim_Id = $("#pClaim_Id").val();
    if (Sp_Invoice_Number == "") {
        $("#err_Sp_Invoice_Number").text('Enter Account/Invoice Number');

    }
    else {
        var BeneficiaryArray = Beneficiary_Id.split("_");

        $.ajax({
            //Modify SA on 27-10-2022
            url: '/MediClaim/CSTMZClaimTreatmentDuplicateTarifCodeCheck',
            type: "Post",
            async: false,
            data: { pClaim_Id: pClaim_Id, Sp_Invoice_Number: Sp_Invoice_Number, Beneficiary_Id: BeneficiaryArray[0], Tariff_Id: TariffId, Tariff_Code: Tariff_Code },
            dataType: "json",
            success: function (result) {
                //debugger
                if (result.IsSuccess == true) {
                    flag = 1;
                    alert(result.Message);
                }

            }
        });
    }

    return flag;
}

//#endregion


//#region -ServiceProvider
function AutoSearchList() {
    // debugger
    $("#datalistOptions").empty();
    $('#pServiceProviderId').val("0");
    var Data = $('#exampleDataList').val().trim();
    if (Data.length >= 3) {
        $.ajax({
            url: '/MediClaim/AutoComplete/',
            type: "Post",
            async: false,
            data: { pPKvalue: Data },
            success: function (data) {
                //debugger;
                if (data.length > 0) {

                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='TextBoxBind(" + data[i].Service_Provider_Id + ",\"" + data[i].Sp_Name + "\",\"" + data[i].Practice_Number + "\")'" + ">" + data[i].Sp_Name.trim() + " (" + data[i].Practice_Number.trim() + ")" + "</li>";
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
function ClearAllData() {
    //debugger
    /* $("#exampleDataList").val('');*/
    $("#pServiceProviderId").val("0");
    $("#div_Sp_Name").html('');
    $("#div_Email_Id").html('');
    $("#div_TIN").html('');
    $("#div_Practice_Number").html('');
    $("#div_Contact_Number_Work").html('');
    $("#div_Practice_Type").html('');
    $("#div_Physical_City").html('');
    $("#div_Postal_Address").html('');
    $("#div_PhysicalAddress").html('');
    $("#div_Bank_Name").html('');
    $("#div_Branch_Name").html('');
    $("#div_Branch_Code").html('');
    $("#div_Account_Number").html('');
    $("#div_Account_Holder_Name").html('');
    $("#div_Payment_Method_Id").html('');
    $("#tbl_AreaOfExpertise").html('');
}
function TextBoxBind(id, Name, Practice_Number) {
    //debugger

    var SPName = Name.trim() + " (" + Practice_Number.trim() + ")";
    $("#datalistOptions").html('');
    $('#pServiceProviderId').val(id);
    $('#exampleDataList').val(SPName);
}
function ClaimMember_Data_Get() {
    //debugger
    ClearMemberdata();
    $('#err_Membership').text("");
    var pMembership_Number = $('#Search_Membership_Id').val().trim();
    if (pMembership_Number != "") {
        $.ajax({
            url: '/MediClaim/MemberDataGet/',
            data: {
                pMembership_Number: pMembership_Number
            },
            dataType: "json",
            type: "POST",
            success: function (data) {

                //debugger
                if (data.oMemberGetModel.Member_Id != null) {
                    debugger
                    if (data.oMemberGetModel != null) {
                        var First_Name = data.oMemberGetModel.First_Name;
                        var Last_Name = data.oMemberGetModel.Last_Name;
                        var MemberName = First_Name + " " + Last_Name;
                        $("#Member_Id").val(data.oMemberGetModel.Member_Id);
                        $("#Claim_Member_Id").html("0");

                        $("#div_Member_Name").html(MemberName);
                        $("#div_Member_Date_Birth").html(data.oMemberGetModel.Date_of_Birth);
                        $("#div_Contact_Number_Cell").html(data.oMemberGetModel.Contact_Number_Cell);
                        $("#div_Email_Id").html(data.oMemberGetModel.Email_Id);
                        $("#div_Gender_Id").html(data.oMemberGetModel.Gender);
                        $("#div_Address").html(data.oMemberGetModel.Address);
                        $("#div_Membership_Number").html(data.oMemberGetModel.Membership_Number);
                        $("#div_Current_Plan_Id").html(data.oMemberGetModel.Plan);
                        $("#div_Group_Id").html(data.oMemberGetModel.Group);
                        $("#div_Registration_Date").html(data.oMemberGetModel.Registration_Date);
                        $("#div_Member_Status").html(data.oMemberGetModel.Member_Status);

                    }

                    if (data.lstMemberBankDetailsGetModel.length > 0) {
                        $("#div_Bank_Name").html(data.lstMemberBankDetailsGetModel[0].Bank_Name);
                        $("#div_Branch_Name").html(data.lstMemberBankDetailsGetModel[0].Branch_Name);
                        $("#div_Branch_Code").html(data.lstMemberBankDetailsGetModel[0].Branch_Code);
                        $("#div_Account_Number").html(data.lstMemberBankDetailsGetModel[0].Account_Number);
                        $("#div_Account_Holder_Name").html(data.lstMemberBankDetailsGetModel[0].Account_Holder_Name);
                        $("#div_Payment_Method_Id").html(data.lstMemberBankDetailsGetModel[0].Member_Payment_Method);
                    }
                }
                else {

                    $('#err_Membership').text("No data found");
                }
            }
        });
    }
}

function Member_Rdo_Onclick() {
    //debugger
    ClearAllData();
    $("#Div_OverView").hide();
    $("#exampleDataList").val('');
    $('#exampleDataList').attr('readonly', true);
    $("#BTN_GET_DETAILS").prop('disabled', true);
    $("#err_ServiceProviderId").text("");
    $('#pServiceProviderId').val("0");
    $("#BTN_GET_DETAILS").removeAttr("onclick");
    $("#exampleDataList").removeAttr("onkeyup");
}

function SP_Rdo_Onclick() {
    $("#Div_OverView").show();
    $('#exampleDataList').attr('readonly', false);
    $("#BTN_GET_DETAILS").prop('disabled', false);

    $("#BTN_GET_DETAILS").removeAttr("onclick");
    $("#BTN_GET_DETAILS").attr("onclick", "AddServiceProviderDetailsData()");

    $("#exampleDataList").removeAttr("onkeyup");
    $("#exampleDataList").attr("onkeyup", "AutoSearchList()");
}

function Radio_btn_Onclick() {
    //debugger
    $("#Div_OverView").hide();
    $('#exampleDataList').attr('readonly', true);
    $("#BTN_GET_DETAILS").prop('disabled', true);
}
function AddServiceProviderDetailsData() {
    // ClearAllData();
    //debugger
    $("#tbl_AreaOfExpertise").html("");
    var pServiceProviderId = $('#pServiceProviderId').val();
    var spId = 0;
    if (pServiceProviderId != "") {
        spId = pServiceProviderId;
    }
    if (spId != "0") {
        $.ajax({
            url: '/MediClaim/ServiceProviderDataGet',
            data: { 'pPKvalue': pServiceProviderId },
            dataType: "json",
            type: "POST",
            success: function (data) {

                if (data != null) {
                    //  debugger
                    for (var i = 0; i < data.lstServiceProviderBankDetailsGetModel.length; i++) {

                        $("#div_Bank_Name").html(data.lstServiceProviderBankDetailsGetModel[i].Bank_Name);
                        $("#div_Branch_Name").html(data.lstServiceProviderBankDetailsGetModel[i].Branch_Name);
                        $("#div_Branch_Code").html(data.lstServiceProviderBankDetailsGetModel[i].Branch_Code);
                        $("#div_Account_Number").html(data.lstServiceProviderBankDetailsGetModel[i].Account_Number);
                        $("#div_Account_Holder_Name").html(data.lstServiceProviderBankDetailsGetModel[i].Account_Holder_Name);
                        $("#div_Payment_Method_Id").html(data.lstServiceProviderBankDetailsGetModel[i].Member_Payment_Method);

                    }
                    if (data.oServiceProviderGetModel != null) {
                        var P_Address = "";
                        var PhysicalAddress = data.oServiceProviderGetModel.Physical_Address + ", " + data.oServiceProviderGetModel.Physical_City + ", " + data.oServiceProviderGetModel.Physical_Postal_Code;

                        if (data.oServiceProviderGetModel.Postal_Address != null) {
                            P_Address = P_Address + data.oServiceProviderGetModel.Postal_Address + ", ";
                        }
                        if (data.oServiceProviderGetModel.Postal_City != null) {
                            P_Address = P_Address + data.oServiceProviderGetModel.Postal_City + ", ";
                        }
                        if (data.oServiceProviderGetModel.Postal_Code != null) {
                            P_Address = P_Address + data.oServiceProviderGetModel.Postal_Postal_CodeCity;
                        }


                        $("#pServiceProviderId").val(data.oServiceProviderGetModel.Service_Provider_Id);
                        $("#div_Sp_Name").html(data.oServiceProviderGetModel.Sp_Name);
                        $("#div_Email_Id").html(data.oServiceProviderGetModel.Email_Id);
                        $("#div_TIN").html(data.oServiceProviderGetModel.TIN);
                        $("#div_Practice_Number").html(data.oServiceProviderGetModel.Practice_Number);
                        $("#div_Contact_Number_Work").html(data.oServiceProviderGetModel.Contact_Number_Work);
                        $("#div_Practice_Type").html(data.oServiceProviderGetModel.Practice_Type);
                        $("#div_Physical_City").html(data.oServiceProviderGetModel.Physical_City)
                        $("#div_Postal_Address").html(P_Address);
                        $("#div_PhysicalAddress").html(PhysicalAddress);

                    }
                    var Count = 1;
                    for (var i = 0; i < data.lstServiceProviderExpertiseGetModel.length; i++) {
                        var tr = "<tr id=" + data.lstServiceProviderExpertiseGetModel[i].Expertise_Id + ">";
                        tr += "<td>" + data.lstServiceProviderExpertiseGetModel[i].Expertise_Id + " - " + data.lstServiceProviderExpertiseGetModel[i].Sp_Expertise + "</td>";
                        $("#tbl_AreaOfExpertise").append(tr);
                        Count++;
                    }
                }
            }
        });
    }
    else {
        ClearAllData();
    }
}

function ServiceProvider_Validate() {
    debugger
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    var plan_id = $('#pplan_id').val();
    var practrice_type = $('#div_Practice_Type').html().trim();

    var myObjectString_new = localStorage.getItem('objectGreeting1');
    var myObject2 = JSON.parse(myObjectString_new);
    var check = myObject2;
    var member_id = $('#Pmembership_number').val();
    if (check != member_id) {
        alert("Please Validate the member");
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }

    if (plan_id == 1 && practrice_type == "Private Hospital") {
        alert("Silver Member can not file for private hospital");
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }
    var Claim_File_by_Type = 0;
    $('input[name="Claim_File_by_Type_Id"]').each(function () {
        if (this.checked) {

            Claim_File_by_Type = $(this).val();
        }
    });
    if (Claim_File_by_Type == 90) {
        var pServiceProviderId = $('#pServiceProviderId').val();
        if ((pServiceProviderId == "0") || (pServiceProviderId == "")) {
            $("#err_ServiceProviderId").text("Please choose service provider");
            alert("Please choose service provider");
            $("#preload").css("display", "none");
            document.getElementById('SAVEBTN').hidden = false;
            document.getElementById('NXTBTN').hidden = false;
            return false;
        }
    }
    debugger
    if (statuscheckingOnSave() == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }

    return true;
}

function MemberValidate() {
    //debugger
    var pMember_Id = $('#Member_Id').val();
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    if (pMember_Id == "0" || pMember_Id == "") {

        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('PRVBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;

        alert("Please choose member");
        return false;
    }
    return true;
}

function ClearMemberdata() {
    //debugger
    $("#Member_Id").val("0");
    $("#Claim_Member_Id").html("0");

    $("#div_Member_Name").html("");
    $("#div_Contact_Number_Cell").html("");
    $("#div_Email_Id").html("");
    $("#div_Gender_Id").html("");
    $("#div_Address").html("");
    $("#div_Membership_Number").html("");
    $("#div_Current_Plan_Id").html("");
    $("#div_Group_Id").html("");
    $("#div_Registration_Date").html("");
    $("#div_Member_Status").html("");

    $("#div_Bank_Name").html("");
    $("#div_Branch_Name").html("");
    $("#div_Branch_Code").html("");
    $("#div_Account_Number").html("");
    $("#div_Account_Holder_Name").html("");
    $("#div_Payment_Method_Id").html("");
}


function statuscheckingOnSave() {
    debugger
    var flag = 0
    var ReturnFlag = 0;

    $("#err_validate").text('');
    $("#err_membership_id").text('')
    $("#err_claim_date").text('');
    var result = "";

    var membr_id = $("#Pmembership_number").val();
    var claim_date = $("#Claim_Date").val()
    var claim_dateArray = claim_date.split("/");
    var Splitclaim_date = claim_dateArray[1] + "/" + claim_dateArray[0] + "/" + claim_dateArray[2];
    var claimdate = new Date(Splitclaim_date);
    var CurrentDate = new Date();
    if (membr_id == "") {
        $("#err_membership_id").text('Please enter a membership number');
        flag = 1;

    }
    if (claim_date == "") {
        $("#err_claim_date").text('Please enter claim/service date');
        flag = 1;
    }
    debugger;
    if (claim_date != "") {
        if (claimdate > CurrentDate) {
            $("#err_claim_date").text('Date should less than current date');
            flag = 1;
        }
    }
    if (flag == 1) {
        return false;
    }
    if (flag == 0) {
        $.ajax({
            url: '/MediClaim/MemberStatusChecking',
            data: { member_id: 1, Membership_number: membr_id, Claim_Date: claim_date },
            dataType: "json",
            async: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                debugger;
                var item = data.length;
                for (i = 0; i < item; i++) {
                    result = data[i].Is_Valdate;
                    $("#err_validate").text(data[i].Validation_Message);
                }

            },

        });

    }
    debugger;
    if (result == false) {
        ReturnFlag = 1;
    }
    return ReturnFlag;
}

//#endregion


//#region Clinical Details


var Doctor_ArrayList = [];
function Doctor_Details_AddRow() {
    //debugger
    var Doctor_Name = $("#Doctor_Name").val();
    var Doctor_Reg_Number = $("#Doctor_Reg_Number").val();
    var Claim_Id = $("#pClaim_Id").val();

    var flag = 0;
    $(".error_msg").text("");
    if (TextBoxValidation("Doctor_Name", "Enter doctor name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Doctor_Reg_Number", "Enter practice number") == 1) {
        flag = 1;
    }

    if (flag == 1) {
        return false;
    }

    var tbodyrowCount = $('#doctor_tbl_add tr').length;
    if (tbodyrowCount == 0) {
        $("#Doctor_Details_Count").val("0");
    }

    var Doctor_Details = $("#Doctor_Details_Count").val();
    var Doctor_Details_Count = parseInt(Doctor_Details) + 1;

    var tr = "<tr id=trDC_" + Doctor_Details_Count + ">";
    tr += "<td>" + Doctor_Name + "</td>";
    tr += "<td>" + Doctor_Reg_Number + "</td>";
    tr += "<td class='action'></a><a href='JavaScript:Void(0);' onclick='Doctor_Details_Delete(" + Doctor_Details_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td >";
    $("#doctor_tbl_add").append(tr);

    var ItemsDoctors = {};
    ItemsDoctors["RowId"] = Doctor_Details_Count;
    ItemsDoctors["Claim_Id"] = Claim_Id;
    ItemsDoctors["Doctor_Name"] = $.trim(Doctor_Name);
    ItemsDoctors["Doctor_Reg_Number"] = $.trim(Doctor_Reg_Number);

    Doctor_ArrayList.push(ItemsDoctors);
    var Doctor_Contact = JSON.stringify(Doctor_ArrayList);
    $("#pClaimDoctorAddEditJson").val(Doctor_Contact);

    $("#Doctor_Name").val('');
    $("#Doctor_Reg_Number").val('');
    $("#Doctor_Details_Count").val(Doctor_Details_Count);
}
function Doctor_Details_Delete(Rowid) {
    //debugger
    var oDoctor_ArrayList = Doctor_ArrayList.find(x => x.RowId == Rowid);
    if (oDoctor_ArrayList != undefined) {
        for (var i = 0; i < Doctor_ArrayList.length; i++) {
            if (Doctor_ArrayList[i].RowId == Rowid) {
                Doctor_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#trDC_" + Rowid + "").remove();
        var Doctor_Contact = JSON.stringify(Doctor_ArrayList);
        $("#pClaimDoctorAddEditJson").val(Doctor_Contact);
    }
}

var Diagnosis_ArrayList = [];
function Diagnosis_AddRow() {
    //debugger
    var ICD_Code = $("#ICD_Code").val();
    var Diagnosis_Description = $("#Diagnosis_Description").val();
    var Claim_Id = $("#pClaim_Id").val();
    var ICD_Code_Id = $("#ICD_Code_Id").val();
    var Version = $("#Version").val();

    var flag = 0;
    $(".error_msg").text("");
    if (TextBoxValidation("ICD_Code", "Enter ICD Code") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Diagnosis_Description", "Enter Diagnosis Description") == 1) {
        flag = 1;
    }

    if (flag == 1) {
        return false;
    }

    var tbodyrowCount = $('#diagnosis_tbl_add tr').length;
    if (tbodyrowCount == 0) {
        $("#Diagnosis_Count").val("0");
    }

    var Diagnosis_Details = $("#Diagnosis_Count").val();
    var Diagnosis_Count = parseInt(Diagnosis_Details) + 1;

    var tr = "<tr id=trDG_" + Diagnosis_Count + ">";
    tr += "<td>" + ICD_Code + "</td>";
    tr += "<td>" + Diagnosis_Description + "</td>";
    tr += "<td class='action'></a><a href='JavaScript:Void(0);' onclick='Diagnosis_Delete(" + Diagnosis_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td >";
    $("#diagnosis_tbl_add").append(tr);

    var ItemsDiagnosis = {};
    ItemsDiagnosis["RowId"] = Diagnosis_Count;
    ItemsDiagnosis["Claim_Id"] = Claim_Id;
    ItemsDiagnosis["ICD_Code"] = $.trim(ICD_Code);
    ItemsDiagnosis["Icd_Code_Description"] = $.trim(Diagnosis_Description);
    ItemsDiagnosis["ICD_Code_Id"] = ICD_Code_Id;
    ItemsDiagnosis["Version"] = $.trim(Version);

    Diagnosis_ArrayList.push(ItemsDiagnosis);
    var Diagnosis = JSON.stringify(Diagnosis_ArrayList);
    $("#pClaimDiagnosisAddEditJson").val(Diagnosis);

    $("#ICD_Code").val('');
    $("#Diagnosis_Description").val('');
    $("#ICD_Code_Id").val('');
    $("#Version").val('');
    $("#Diagnosis_Count").val(Diagnosis_Count);
}
function Diagnosis_Delete(Rowid) {
    //debugger
    var oDiagnosis_ArrayList = Diagnosis_ArrayList.find(x => x.RowId == Rowid);
    if (oDiagnosis_ArrayList != undefined) {


        for (var i = 0; i < Diagnosis_ArrayList.length; i++) {
            if (Diagnosis_ArrayList[i].RowId == Rowid) {
                Diagnosis_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#trDG_" + Rowid + "").remove();
        var Diagnosis = JSON.stringify(Diagnosis_ArrayList);
        $("#pClaimDiagnosisAddEditJson").val(Diagnosis);
    }
}

function ICD_CodeGet() {
    //debugger
    $('#Diagnosis_Description').val('');
    $("#ICD_ul").html('');
    var ICD_Code = $('#ICD_Code').val().trim();
    if (ICD_Code != "") {
        //
        $.ajax({
            url: '/MediClaim/ICD_CodeGet',
            type: "POST",
            data: { pPKvalue: ICD_Code },
            dataType: "json",
            success: function (data) {
                //debugger

                for (var i = 0; i < data.lstIcdCodeGetModel.length; i++) {
                    var li = "<li onclick='ICD_Code_DescGet(" + data.lstIcdCodeGetModel[i].Icd_Code_Id + ")'" + ">" + data.lstIcdCodeGetModel[i].Icd_Code + "</li>";
                    $("#ICD_ul").append(li);
                }
            }
        });
    }


}

function ICD_Code_DescGet(id) {
    //debugger
    $("#ICD_ul").html('');
    $.ajax({
        url: '/MediClaim/ICD_CodeDescGet',
        type: "POST",
        data: { pPKvalue: id },
        dataType: "json",
        success: function (data) {
            //debugger
            $('#Diagnosis_Description').val(data.oIcdCodeAddEditModel.Icd_Code_Description);
            $('#ICD_Code').val(data.oIcdCodeAddEditModel.Icd_Code);
            $('#ICD_Code_Id').val(data.oIcdCodeAddEditModel.Icd_Code_Id);
            $('#Version').val(data.oIcdCodeAddEditModel.Version);
        }
    });
}

function ValidateClinicalDetails() {
    //debugger
    var flag = 0;
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    if (Doctor_ArrayList == "") {
        alert('Please enter At least one doctor details');
        flag = 1;
    }
    if (Diagnosis_ArrayList == "") {
        alert('Please enter At least one diagnosis details');
        flag = 1;
    }
    if (flag == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('PRVBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }

    return true;

}

//function ValidateDoctorDetails() {
//    //debugger
//    var flag = 0;
//    $(".error_msg").text("");
//    if (TextBoxValidation("Doctor_Name", "Enter doctor name") == 1) {
//        flag = 1;
//    }
//    if (TextBoxValidation("Doctor_Reg_Number", "Enter doctor reg number") == 1) {
//        if (NumberValidation("Doctor_Reg_Number", "Enter only number") == 1) {
//            flag = 1;
//        }
//    }

//    if (flag == 1) {
//        return false;
//    }
//    else {
//        Doctor_Details_AddRow();
//    }

//}

//function ValidateDiagnosisDetails() {
//    //debugger
//    var flag = 0;
//    $(".error_msg").text("");
//    if (TextBoxValidation("ICD_Code", "Enter ICD Code") == 1) {
//        flag = 1;
//    }
//    if (TextBoxValidation("Diagnosis_Description", "Enter Diagnosis Description") == 1) {
//        flag = 1;
//    }

//    if (flag == 1) {
//        return false;
//    }
//    else {
//        Diagnosis_AddRow();
//    }

//}


//#endregion Clinical Details


//#region OverView

function DownloadClaimDocument() {
    //debugger
    var Document_Checked = [];
    $('input[name="Claim_DOC_File"]').each(function () {
        if (this.checked) {
            Document_Checked.push($(this).val());
        }
    });

    if (Document_Checked.length == 0) {
        alert("Please choose document");
    }
    else {
        for (var i = 0; i < Document_Checked.length; i++) {
            DownloadFile(Document_Checked[i]);
        }
    }

}

function ClearRejectionRejection(pTreatmentId) {
    //debugger
    $("#RejectedReason_Id_" + pTreatmentId).val("0")
    $("#Reason_" + pTreatmentId).val("")

}

function ApproveTreatment(pTreatmentId, pRowsId) {
    // debugger
    var Benefit_Id = $("#Benefit_Id_" + pTreatmentId).val();
    var Benefit = ("Benefit_Id_" + pTreatmentId);
    var PaidAmount = $("#SPN_Paid_Amount_" + pRowsId).text();
    var RemittanceAmount = $("#SPN_Remittance_Amount_" + pRowsId).text();
    var RemittanceComments = $("#Remittance_Comments_" + pRowsId).val();


    var flag = 0;
    var Benefit_Name = $("#" + Benefit + " option[value=" + Benefit_Id + "]").text();
    if (Benefit_Id == "0") {
        alert("Please select Benefit before Approved")
        flag = 1;

    }
    if (Benefit_Id != "0") {
        if (parseFloat(RemittanceAmount) == "0") {
            alert("The benefit amount exhausted")
            flag = 1;

        }
    }
    if (Benefit_Id != "0") {
        if (Treatment_Plan_Benefit_Check(pTreatmentId) == 1) {
            flag = 1;
        }

    }

    if (flag == 1) {
        return false;
    }
    else {
        $.ajax({
            type: "Post",
            async: false,
            url: '/MediClaim/AooroveTreatment',
            data: { pTreatmentId: pTreatmentId, pBenefitId: Benefit_Id, pBenefitName: Benefit_Name, pPaidAmount: PaidAmount, pRemittanceAmount: RemittanceAmount, pRemittanceComments: RemittanceComments },
            dataType: 'json',
            success: function (data) {
                //  debugger
                $("#StatusDiv_" + pTreatmentId).removeClass("text-danger");
                $("#StatusDiv_" + pTreatmentId).addClass("text_green");
                $("#StatusSpan_" + pTreatmentId).text("Approved");
                $("#StatusDiv_" + pTreatmentId).show();
                $("#ResDiv_" + pTreatmentId).hide();
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }

}

function Treatment_Plan_Benefit_Check(pTreatmentId) {
    // debugger
    var flag = 0;
    var Benefit_Id = $("#Benefit_Id_" + pTreatmentId).val();

    $.ajax({
        type: "Post",
        async: false,
        url: '/MediClaim/CstmzClaimTreatmentPlanBenefitCheck',
        data: { pClaim_Treatment_Id: pTreatmentId, pBenefit_Id: Benefit_Id },
        dataType: 'json',
        success: function (data) {
            //  debugger
            if (data != "") {
                alert(data);
                flag = 1;
            }
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
    debugger;
    return flag;

}

function RejectTreatment(pTreatmentId) {
    //debugger
    $(".error_msg").text("");
    var RejectedReason_Id = $("#RejectedReason_Id_" + pTreatmentId).val();
    var RejectedReason = ("RejectedReason_Id_" + pTreatmentId)
    var RejectedReason_Text = $('#' + RejectedReason).find(":selected").text();
    var Reason = $("#Reason_" + pTreatmentId).val();

    if (RejectedReason_Id == "0") {
        $("#err_RejectedReason_Id_" + pTreatmentId).text("Please Select Rejection Reason");
        return false;

    }
    if (RejectedReason_Id == "109") {
        if (Reason.trim() == "") {
            $("#err_Reason_" + pTreatmentId).text("Please Enter Reason");
            return false;
        }
    }


    $.ajax({
        type: "Post",
        async: false,
        url: '/MediClaim/RejectTreatment',
        data: { pTreatmentId: pTreatmentId, pRejected_Reason_Id: RejectedReason_Id, pRejected_Reason_Captured: Reason },
        dataType: 'json',
        success: function (data) {
            //debugger
            $("#StatusDiv_" + pTreatmentId).removeClass("text_green");
            $("#StatusDiv_" + pTreatmentId).addClass("text-danger");
            $("#StatusSpan_" + pTreatmentId).text("Rejected");
            $("#ResSpan_" + pTreatmentId).text(RejectedReason_Text);

            $("#StatusDiv_" + pTreatmentId).show();
            $("#ResDiv_" + pTreatmentId).show();

            $("#Rejection_modal_" + pTreatmentId).modal('hide');
            ClearRejectionRejection(pTreatmentId);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });

}

function ClearRejectionClaim() {
    //debugger
    $("#RejectedReason_Id").val("0")
    $("#Reason").val("")

}

function ApproveClaim(pClaimId) {
    //debugger
    var flag = 0;
    $.ajax({
        type: "Post",
        async: false,
        url: '/MediClaim/CSTMZClaimTreatmentAmountGetForApprove',
        data: { pClaimId: pClaimId },
        dataType: 'json',
        success: function (data) {
            //  debugger
            if (data == "0") {
                alert("This claim Can not be Approved.");
                flag = 1;
            }
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
    if (flag == 0) {
        $.ajax({
            type: "Post",
            async: false,
            url: '/MediClaim/ApproveClaim',
            data: { pClaimId: pClaimId },
            dataType: 'json',
            success: function (data) {
                //debugger
                var StatusResult = data.split("_");
                if (StatusResult[0] == "0") {
                    $("#SpanErrMsg").text(StatusResult[1]);
                    $("#divErrMsg").show();
                }
                else {
                    $("#StatusDiv").removeClass("text-danger");
                    $("#StatusDiv").addClass("text_green");
                    $("#StatusSpan").text("Approved");
                    $("#StatusDiv").show();
                    $("#ResDiv").hide();

                    $("#SpanErrMsg").text("");
                    $("#divErrMsg").hide();

                    location.href = "/MediClaim/OverviewClaim?pClaim_Id=" + pClaimId;
                }


            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }

}

function RejectClaim(pClaimId) {
    //  debugger
    $(".error_msg").text("");
    var RejectedReason_Id = $("#RejectedReason_Id").val();
    var RejectedReason_Text = $('#RejectedReason_Id').find(":selected").text();
    var Reason = $("#Reason").val();

    if (RejectedReason_Id == "0") {
        $("#err_RejectedReason_Id").text("Please Select Rejection Reason");
        return false;

    }
    if (RejectedReason_Id == "109") {
        if (Reason.trim() == "") {
            $("#err_Reason").text("Please Enter Reason");
            return false;
        }

    }

    $.ajax({
        type: "Post",
        async: false,
        url: '/MediClaim/RejectClaim',
        data: { pClaimId: pClaimId, pRejected_Reason_Id: RejectedReason_Id, pRejected_Reason_Captured: Reason },
        dataType: 'json',
        success: function (data) {
            //   debugger
            var StatusResult = data.split("_");
            if (StatusResult[0] == "0") {
                $("#SpanErrMsg").text(StatusResult[1]);
                $("#divErrMsg").show();
            }
            else {
                $("#StatusDiv").removeClass("text_green");
                $("#StatusDiv").addClass("text-danger");
                $("#StatusSpan").text("Rejected");

                $("#StatusDiv").show();
                $("#ResDiv").show();

                $("#ResSpan").text(RejectedReason_Text);

                $("#SpanErrMsg").text("");
                $("#divErrMsg").hide();

                location.href = "/MediClaim/OverviewClaim?pClaim_Id=" + pClaimId;
            }


            $("#Rejection_modal").modal('hide');
            ClearRejectionClaim();


        },
        error: function (err) {
            alert(err.statusText);
        }
    });

}

function CancelClaim() {
    //debugger
    location.href = "/MediClaim/ListClaim";

}

//#endregion

//#region Beneficiary Details Tab
var ClaimBeneficiary_Add_ArrayList = [];
function CheckBeneficiary() {
    // debugger
    var BeneficiaryCount = $("#pBeneficiaryCount").val();
    var IsCNF = 0;
    if (BeneficiaryCount == 0) {
        var CNF = confirm('Editing beneficiary will not be available when moving forward');
        if (CNF == false) {
            IsCNF = 1;
            return false;
        }
    }

    if (IsCNF == 1) {
        return false;
    }
    else {
        $("#preload").css("display", "block");
        document.getElementById('SAVEBTN').hidden = true;
        document.getElementById('PRVBTN').hidden = true;
        if ($("#pBeneficiaryCount").val() == "1") {
            document.getElementById('NXTBTN').hidden = true;
        }

        var Row_Checked = [];
        $('input[name="ClaimBeneficiaryCheck"]').each(function () {
            if (this.checked) {
                Row_Checked.push($(this).val());
            }
        });


        for (var i = 0; i < Row_Checked.length; i++) {

            var oClaimBeneficiary_Get_ArrayList = ClaimBeneficiary_Get_ArrayList.find(x => x.RowId == Row_Checked[i]);

            var Claim_Beneficiary_Id = 0;
            if (oClaimBeneficiary_Get_ArrayList.Claim_Beneficiary_Id != null) {
                Claim_Beneficiary_Id = oClaimBeneficiary_Get_ArrayList.Claim_Beneficiary_Id;
            }


            var ItemsAddClaimBeneficiary = {};


            ItemsAddClaimBeneficiary["Claim_Beneficiary_Id"] = Claim_Beneficiary_Id;
            ItemsAddClaimBeneficiary["Beneficiary_Type_Id"] = oClaimBeneficiary_Get_ArrayList.Beneficiary_Type_Id;
            ItemsAddClaimBeneficiary["Beneficiary_Id"] = oClaimBeneficiary_Get_ArrayList.Beneficiary_Id;
            ItemsAddClaimBeneficiary["Beneficiary_Name"] = oClaimBeneficiary_Get_ArrayList.Beneficiary_Name;
            ItemsAddClaimBeneficiary["Beneficiary_Type_Short_Name"] = oClaimBeneficiary_Get_ArrayList.Beneficiary_Type_Short_Name;
            ItemsAddClaimBeneficiary["ID_Number"] = oClaimBeneficiary_Get_ArrayList.ID_Number;
            ItemsAddClaimBeneficiary["Date_of_Birth"] = oClaimBeneficiary_Get_ArrayList.Date_of_Birth;
            ItemsAddClaimBeneficiary["Age"] = oClaimBeneficiary_Get_ArrayList.Age;
            ItemsAddClaimBeneficiary["Gender_Id"] = oClaimBeneficiary_Get_ArrayList.Gender_Id;
            ItemsAddClaimBeneficiary["Blood_Group_Id"] = oClaimBeneficiary_Get_ArrayList.Blood_Group_Id;
            ItemsAddClaimBeneficiary["Relationship_Id"] = oClaimBeneficiary_Get_ArrayList.Relationship_Id;
            ItemsAddClaimBeneficiary["Photo_File_Name"] = oClaimBeneficiary_Get_ArrayList.Photo_File_Name;
            ItemsAddClaimBeneficiary["Exclusion_Benefit_List"] = oClaimBeneficiary_Get_ArrayList.Exclusion_Benefit_List;
            ClaimBeneficiary_Add_ArrayList.push(ItemsAddClaimBeneficiary);

        }

        $("#pClaimBeneficiaryAddEditJson").val(JSON.stringify(ClaimBeneficiary_Add_ArrayList));
    }
}

//#endregion

function RemittanceAmountGet(pTreatmentId, pRowId) {
    debugger;
    var Benefit_Id = $("#Benefit_Id_" + pTreatmentId).val();
    var PaidAmount = $("#SPN_Paid_Amount_" + pRowId).text();
    var TotalPaidAmount = $("#Spn_TotalPaidAmount").text();
    $("#Remittance_Message_" + pRowId).text("");
    $.ajax({
        type: "Post",
        async: false,
        url: '/MediClaim/CstmzClaimTreatmentPlanBenefitRemittanceAmountGet',
        data: { pClaim_Treatment_Id: pTreatmentId, pBenefit_Id: Benefit_Id, pPaid_Amount: PaidAmount },
        dataType: 'json',
        success: function (data) {
            debugger;

            var RemittanceResult = data.split("_");
            if (RemittanceResult[0] == "0.00") {
                $("#SPN_Remittance_Amount_" + pRowId).text(RemittanceResult[0]);
                $("#Remittance_Message_" + pRowId).text(RemittanceResult[1]);
            }
            else {
                $("#SPN_Remittance_Amount_" + pRowId).text(RemittanceResult[0]);
                $("#SPN_Paid_Amount_" + pRowId).text(RemittanceResult[0]);

                var RemmitancePaidAmount = RemittanceResult[0];
                var afterMinusRemmitanceAmount = TotalPaidAmount - PaidAmount;
                var finalPaidAmount = parseFloat(afterMinusRemmitanceAmount) + parseFloat(RemmitancePaidAmount);

                $("#Spn_TotalPaidAmount").text(finalPaidAmount);

                $("#Remittance_Comments_" + pRowId).text(RemittanceResult[1]);
                $("#Remittance_Message_" + pRowId).text(RemittanceResult[1]);

            }

        },
        error: function (err) {
            alert(err.statusText);
        }
    });

}