//#region For--GroupAdd page*/
var Emergency_Contact_ArrayList = [];
function Group_Contact_AddRow() {
    //debugger
    $(".error_msg").text("");
    var FisrtName = $("#First_Name").val();
    var LastName = $("#Last_Name").val();
    var Name = FisrtName + " " + LastName;
    var WorkContactNumber = $("#Work_Contact_Number").val();
    var CellContactNumber = $("#Cell_Contact_Number").val();
    var Designation = $("#Designation").val();

    var flag = 0;
    if (TextBoxValidation("First_Name", "Enter first name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Last_Name", "Enter last name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Cell_Contact_Number", "Enter contact number (Cell)") == 1) {
        flag = 1;
    }
    if (flag == 1) {
        return false;
    }

    var tbodyrowCount = $('#tbody_Emergency_Contacts tr').length;
    if (tbodyrowCount == 0) {
        $("#Group_Contact_Count").val("0");
    }

    var Group_Contacts = $("#Group_Contact_Count").val();
    var Group_Contact_Count = parseInt(Group_Contacts) + 1;

    var tr = "<tr id=tr_" + Group_Contact_Count + ">";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + WorkContactNumber + "</td>";
    tr += "<td>" + CellContactNumber + "</td>";
    tr += "<td>" + Designation + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Group_Contact_Edit(" + Group_Contact_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a><a href='JavaScript:Void(0);' onclick='Group_Contact_Delete(" + Group_Contact_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td >";
    $("#tbody_Emergency_Contacts").append(tr);

    var ItemsContacts = {};
    ItemsContacts["RowId"] = Group_Contact_Count;
    ItemsContacts["Group_Contact_Id"] = "0";
    ItemsContacts["First_Name"] = $.trim(FisrtName);
    ItemsContacts["Last_Name"] = $.trim(LastName);
    ItemsContacts["Contact_Number_Work"] = $.trim(WorkContactNumber);
    ItemsContacts["Contact_Number_Cell"] = $.trim(CellContactNumber);
    ItemsContacts["Designation"] = $.trim(Designation);
    Emergency_Contact_ArrayList.push(ItemsContacts);
    
    document.cookie = "groupContact="+Emergency_Contact_ArrayList.length;

    //var Grp_Contact = JSON.stringify(Emergency_Contact_ArrayList);
    //$("#ContactGroup").val(Grp_Contact);

    $("#First_Name").val('');
    $("#Last_Name").val('');
    $("#Work_Contact_Number").val('');
    $("#Cell_Contact_Number").val('');
    $("#Designation").val('');
    $("#Group_Contact_Count").val(Group_Contact_Count);
}
function Group_Contact_Delete(Rowid) {
    //debugger
    var oEmergency_Contact_ArrayList = Emergency_Contact_ArrayList.find(x => x.RowId == Rowid);
    if (oEmergency_Contact_ArrayList != undefined) {


        for (var i = 0; i < Emergency_Contact_ArrayList.length; i++) {
            if (Emergency_Contact_ArrayList[i].RowId == Rowid) {
                Emergency_Contact_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#tr_" + Rowid + "").remove();
    }
}
var IS_Group_ContactEdit = false;
function Group_Contact_Edit(Rowid) {
    //debugger
    if (IS_Group_ContactEdit != true) {
        IS_Group_ContactEdit = true;
        $("#Grp_Contact_BTN").removeAttr("onclick");
        $("#Grp_Contact_BTN").attr("onclick", "Group_Contact_Update(" + Rowid + ")");
        $("#Grp_Contact_BTN").text("Update");
        var oGroup_Contact_ArrayList = Emergency_Contact_ArrayList.find(x => x.RowId == Rowid);
        $("#First_Name").val(oGroup_Contact_ArrayList.First_Name);
        $("#Last_Name").val(oGroup_Contact_ArrayList.Last_Name);
        $("#Work_Contact_Number").val(oGroup_Contact_ArrayList.Contact_Number_Work);
        $("#Cell_Contact_Number").val(oGroup_Contact_ArrayList.Contact_Number_Cell);
        $("#Designation").val(oGroup_Contact_ArrayList.Designation);

        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one emergency contact in edit mode.");
        return false;
    }
}
function Group_Contact_Update(Rowid) {
    //debugger
    IS_Group_ContactEdit = false;
    var oGroup_Contact_ArrayList = Emergency_Contact_ArrayList.find(x => x.RowId == Rowid);
    $("#tr_" + Rowid + "").remove();

    var First_Name = $("#First_Name").val();
    var Last_Name = $("#Last_Name").val();
    var Work_Contact_Number = $("#Work_Contact_Number").val();
    var Cell_Contact_Number = $("#Cell_Contact_Number").val();
    var Designation = $("#Designation").val();
    var Name = First_Name + " " + Last_Name;

    var flag = 0;
    if (TextBoxValidation("First_Name", "Enter first name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Last_Name", "Enter last name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Cell_Contact_Number", "Enter contact number (Cell)") == 1) {
        flag = 1;
    }
    if (flag == 1) {
        return false;
    }


    oGroup_Contact_ArrayList.First_Name = First_Name;
    oGroup_Contact_ArrayList.Last_Name = Last_Name;
    oGroup_Contact_ArrayList.Contact_Number_Work = Work_Contact_Number;
    oGroup_Contact_ArrayList.Contact_Number_Cell = Cell_Contact_Number;
    oGroup_Contact_ArrayList.Designation = Designation;

    var tr = "<tr id=tr_" + Rowid + ">";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + Work_Contact_Number + "</td>";
    tr += "<td>" + Cell_Contact_Number + "</td>";
    tr += "<td>" + Designation + "</td>";
    tr += "<td class='action'><a href ='JavaScript:Void(0);' onclick='Group_Contact_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a><a href='JavaScript:Void(0);' onclick='Group_Contact_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td >";
    $("#tbl_add").append(tr);

    $("#First_Name").val('');
    $("#Last_Name").val('');
    $("#Work_Contact_Number").val('');
    $("#Cell_Contact_Number").val('');
    $("#Designation").val('');

    $("#Grp_Contact_BTN").removeAttr("onclick");
    $("#Grp_Contact_BTN").attr("onclick", "Group_Contact_AddRow()");
    $("#Grp_Contact_BTN").text("Add");
}
//#endregion


//#region /*For--ListPage--*/
function SearchList() {
    $('#Group_Name').keypress(function (e) {
        //debugger
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            document.getElementById("lstGrpForm").submit();
            return false;
        }
    });
}
//#endregion 

//#region Document By HS
var Group_Document_ArrayList = [];
function Group_Document_Add() {
    //debugger

    var Document_Type_Id = $("#Document_Type_Id").val();
    var Document_Type_Name = $("#Document_Type_Id option[value=" + Document_Type_Id + "]").text();
    var Document_Name = $("#Document_Name").val();
    var Document_Number = $("#Document_Number").val();
    var Document_File_Name = $("#Document_File_Name").val();


    flag = 0;
    //debugger
    if (DropDownValidation("Document_Type_Id", "Enter document name") == 1) {
        flag = 1;
    }
    if (Document_Type_Id == "10") {
        if (TextBoxValidation("Document_Name", "Enter document name") == 1) {
            flag = 1;
        }
    }
    if (Document_File_Name == "") {
        alert("Please upload document");
        flag = 1;
        //return false;
    }
    if (flag == 1) {
        //debugger
        return false;
    }


    var tbodyrowCount = $('#tbody_Group_Document tr').length;
    if (tbodyrowCount == 0) {
        $("#Group_Document_Count").val("0");
    }

    var Document_Count = $("#Group_Document_Count").val();
    var Group_Document_Count = parseInt(Document_Count) + 1;

    var tr = "<tr id=tr_" + Group_Document_Count + ">";
    /* tr += "<td><img src='/DigitalAssets/Group/" + Document_File_Name + "' width='40'></td>";*/
    tr += "<td>" + Document_Type_Name + "</td>";
    tr += "<td>" + Document_Name + "</td>";
    tr += "<td>" + Document_Number + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Group_Document_Edit(" + Group_Document_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Group_Document_Delete(" + Group_Document_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Group_Document").append(tr);

    var ItemsGroupDocument = {};
    ItemsGroupDocument["RowId"] = Group_Document_Count;
    ItemsGroupDocument["Group_Document_Id"] = "0";
    ItemsGroupDocument["Document_Type_Id"] = Document_Type_Id;
    ItemsGroupDocument["Document_Type_Name"] = Document_Type_Name;
    ItemsGroupDocument["Document_Name"] = $.trim(Document_Name);
    ItemsGroupDocument["Document_Number"] = $.trim(Document_Number);
    ItemsGroupDocument["Document_File_Name"] = Document_File_Name;
    Group_Document_ArrayList.push(ItemsGroupDocument);

    $("#Document_Type_Id").val("0");
    $("#Document_Name").val("");
    $("#Document_Number").val("");
    $("#Document_File_Name").val("");
    $("#upload_Document").val("");
    $(".update_icon").css("display", "none");
    $("#Group_Document_Count").val(Group_Document_Count);
}
var IS_Group_DocumentEdit = false;
function Group_Document_Edit(Rowid) {
    //debugger
    if (IS_Group_DocumentEdit != true) {
        IS_Group_DocumentEdit = true;
        $("#GRP_DOC_BTN").removeAttr("onclick");
        $("#GRP_DOC_BTN").attr("onclick", "Group_Document_Update(" + Rowid + ")");
        $("#GRP_DOC_BTN").text("Update");
        var oGroup_Document_ArrayList = Group_Document_ArrayList.find(x => x.RowId == Rowid);
        $("#Document_Type_Id").val(oGroup_Document_ArrayList.Document_Type_Id);
        $("#Document_Name").val(oGroup_Document_ArrayList.Document_Name);
        $("#Document_Number").val(oGroup_Document_ArrayList.Document_Number);
        $("#Document_File_Name").val(oGroup_Document_ArrayList.Document_File_Name);
        $(".update_icon").css("display", "block");
        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one docoment in edit mode.");
        return false;
    }
}
function Group_Document_Update(Rowid) {

    IS_Group_DocumentEdit = false;
    var oGroup_Document_ArrayList = Group_Document_ArrayList.find(x => x.RowId == Rowid);
    $("#tr_" + Rowid + "").remove();

    var Document_Type_Id = $("#Document_Type_Id").val();
    var Document_Type_Name = $("#Document_Type_Id option[value=" + Document_Type_Id + "]").text();
    var Document_Name = $("#Document_Name").val();
    var Document_Number = $("#Document_Number").val();
    var Document_File_Name = $("#Document_File_Name").val();

    flag = 0;
    //debugger
    if (DropDownValidation("Document_Type_Id", "Enter document name") == 1) {
        flag = 1;
    }
    if (Document_Type_Id == "10") {
        if (TextBoxValidation("Document_Name", "Enter document name") == 1) {
            flag = 1;
        }
    }
    if (Document_File_Name == "") {
        alert("Please upload document");
        flag = 1;
        //return false;
    }
    if (flag == 1) {
        //debugger
        return false;
    }


    oGroup_Document_ArrayList.Document_Type_Id = Document_Type_Id;
    oGroup_Document_ArrayList.Document_Type_Name = Document_Type_Name;
    oGroup_Document_ArrayList.Document_Name = Document_Name;
    oGroup_Document_ArrayList.Document_Number = Document_Number;
    oGroup_Document_ArrayList.Document_File_Name = Document_File_Name;


    var tr = "<tr id=tr_" + Rowid + ">";
    /*   tr += "<td><img src='/DigitalAssets/Group/" + Document_File_Name + "' width='40'></td>";*/
    tr += "<td>" + Document_Type_Name + "</td>";
    tr += "<td>" + Document_Name + "</td>";
    tr += "<td>" + Document_Number + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Group_Document_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Group_Document_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Group_Document").append(tr);


    $("#Document_Type_Id").val("0");
    $("#Document_Name").val("");
    $("#Document_Number").val("");
    $("#Document_File_Name").val("");
    $("#upload_Document").val("");
    $(".update_icon").css("display", "none");

    $("#GRP_DOC_BTN").removeAttr("onclick");
    $("#GRP_DOC_BTN").attr("onclick", "Group_Document_Add()");
    $("#GRP_DOC_BTN").text("Add");
}

function Group_Document_Delete(Rowid) {

    var oGroup_Document_ArrayList = Group_Document_ArrayList.find(x => x.RowId == Rowid);
    if (oGroup_Document_ArrayList != undefined) {


        for (var i = 0; i < Group_Document_ArrayList.length; i++) {
            if (Group_Document_ArrayList[i].RowId == Rowid) {
                Group_Document_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#tr_" + Rowid + "").remove();
    }
}

function Upload_Groupr_Document(event) {
    $(".update_icon").css("display", "none")
    var Image_Size_KB_For_Validation = (Math.round(event.target.files[0].size / 1024));
    var Image_Size_MB_For_Validation = (Math.round(Image_Size_KB_For_Validation / 1024));
    if (Image_Size_KB_For_Validation > 4096) {  // Max file size will be 4 mb or 4096 KB
        alert("Max file size 4mb is allowed. The size of uploaded file is " + Image_Size_MB_For_Validation + " mb (approximately).");

        return;
    }

    var fileUpload = $("#upload_Document").get(0);
    var files = fileUpload.files;
    var fileData = new FormData();
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    $.ajax({
        url: '/Group/UploadGroupDocument',
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (result) {
            $("#Document_File_Name").val(result);
            $(".update_icon").css("display", "block")
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function ValidateGroupDocument() {
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    if (Group_Document_ArrayList == "") {
        alert("Insert at least one Document");

        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }
    $("#HDN_Group_Document").val(JSON.stringify(Group_Document_ArrayList));


}

//#endregion

//#region ---Edit-Contact-Group---
var IS_Group_ContactEdit = false;
function Group_Contact_From_Edit(Rowid) {
    if (IS_Group_ContactEdit != true) {
        IS_Group_ContactEdit = true;
        $("#Grp_Contact_BTN").removeAttr("onclick");
        $("#Grp_Contact_BTN").attr("onclick", "Group_Contact_Update_From_Edit(" + Rowid + ")");
        $("#Grp_Contact_BTN").text("Update");
        var oGroup_Contact_ArrayList = Group_Contact_ArrayList.find(x => x.RowId == Rowid);
        $("#First_Name").val(oGroup_Contact_ArrayList.First_Name);
        $("#Last_Name").val(oGroup_Contact_ArrayList.Last_Name);
        $("#Work_Contact_Number").val(oGroup_Contact_ArrayList.Contact_Number_Work);
        $("#Cell_Contact_Number").val(oGroup_Contact_ArrayList.Contact_Number_Cell);
        $("#Designation").val(oGroup_Contact_ArrayList.Designation);

        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one emergency contact in edit mode.");
        return false;
    }
}
function Group_Contact_Update_From_Edit(Rowid) {

    IS_Group_ContactEdit = false;
    var oGroup_Contact_ArrayList = Group_Contact_ArrayList.find(x => x.RowId == Rowid);
    $("#tr_" + Rowid + "").remove();

    var First_Name = $("#First_Name").val();
    var Last_Name = $("#Last_Name").val();
    var Work_Contact_Number = $("#Work_Contact_Number").val();
    var Cell_Contact_Number = $("#Cell_Contact_Number").val();
    var Designation = $("#Designation").val();
    var Name = First_Name + " " + Last_Name;


    var flag = 0;
    if (TextBoxValidation("First_Name", "Enter first name") == 1) {
        flag = 1;
    }
    else {
        $("#err_First_Name").text('');
    }
    if (TextBoxValidation("Cell_Contact_Number", "Enter contact number (Cell)") == 1) {
        flag = 1;
    }
    else {
        $("#err_Cell_Contact_Number").text('');
    }
    if (TextBoxValidation("Last_Name", "Enter last name") == 1) {
        flag = 1;
    }
    else {
        $("#err_Last_Name").text('');
    }
    if (flag == 1) {
        //debugger
        return false;
    }

    oGroup_Contact_ArrayList.First_Name = First_Name;
    oGroup_Contact_ArrayList.Last_Name = Last_Name;
    oGroup_Contact_ArrayList.Contact_Number_Work = Work_Contact_Number;
    oGroup_Contact_ArrayList.Contact_Number_Cell = Cell_Contact_Number;
    oGroup_Contact_ArrayList.Designation = Designation;

    var tr = "<tr id=tr_" + Rowid + ">";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + Work_Contact_Number + "</td>";
    tr += "<td>" + Cell_Contact_Number + "</td>";
    tr += "<td>" + Designation + "</td>";
    tr += "<td class='action'><a href ='#' onclick='Group_Contact_From_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a><a href='#' onclick='Contact_Group_Delete_From_Edit(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td >";
    $("#tbl_add").append(tr);

    $("#First_Name").val('');
    $("#Last_Name").val('');
    $("#Work_Contact_Number").val('');
    $("#Cell_Contact_Number").val('');
    $("#Designation").val('');

    $("#Grp_Contact_BTN").removeAttr("onclick");
    $("#Grp_Contact_BTN").attr("onclick", "AddRow_EditGroup()");
    $("#Grp_Contact_BTN").text("Add");
}
function ValidateGroupContact() {
    $("#ContactGroup").val(JSON.stringify(Group_Contact_ArrayList));
}
function AddRow_EditGroup() {
    var FisrtName = $("#First_Name").val();
    var LastName = $("#Last_Name").val();
    var Name = FisrtName + " " + LastName;
    var WorkContactNumber = $("#Work_Contact_Number").val();
    var CellContactNumber = $("#Cell_Contact_Number").val();
    var Designation = $("#Designation").val();

    var tbodyrowCount = $('#row').length;
    if (tbodyrowCount == 0) {
        $("#Group_Contact_Count").val("0");
    }

    var Group_Contacts = $("#Group_Contact_Count").val();
    var Group_Contact_Count = parseInt(Group_Contacts) + 1;

    var tr = "<tr id=tr_" + Group_Contact_Count + ">";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + WorkContactNumber + "</td>";
    tr += "<td>" + CellContactNumber + "</td>";
    tr += "<td>" + Designation + "</td>";
    tr += "<td class='action'><a href='#' onclick='Group_Contact_From_Edit(" + Group_Contact_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a><a href='#' onclick='Contact_Group_Delete_From_Edit(" + Group_Contact_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td >";
    $("#tbl_add").append(tr);

    var ItemsContacts = {};
    ItemsContacts["RowId"] = Group_Contact_Count;
    ItemsContacts["EmergencyContactId"] = "0";
    ItemsContacts["First_Name"] = $.trim(FisrtName);
    ItemsContacts["Last_Name"] = $.trim(LastName);
    ItemsContacts["Contact_Number_Work"] = $.trim(WorkContactNumber);
    ItemsContacts["Contact_Number_Cell"] = $.trim(CellContactNumber);
    ItemsContacts["Designation"] = $.trim(Designation);
    Group_Contact_ArrayList.push(ItemsContacts);

    var Grp_Contact = JSON.stringify(Group_Contact_ArrayList);
    $("#ContactGroup").val(Grp_Contact);

    $("#First_Name").val('');
    $("#Last_Name").val('');
    $("#Work_Contact_Number").val('');
    $("#Cell_Contact_Number").val('');
    $("#Designation").val('');
    $("#Group_Contact_Count").val(Group_Contact_Count);
}
function Contact_Group_Delete_From_Edit(Rowid) {
    var oEmergency_Contact_ArrayList = Group_Contact_ArrayList.find(x => x.RowId == Rowid);
    if (oEmergency_Contact_ArrayList != undefined) {


        for (var i = 0; i < Group_Contact_ArrayList.length; i++) {
            if (Group_Contact_ArrayList[i].RowId == Rowid) {
                Group_Contact_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#tr_" + Rowid + "").remove();
    }
}
//#endregion

//#region ----validation---------
function ValidateGroup() {
    //debugger
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    $("#ContactGroup").val(JSON.stringify(Emergency_Contact_ArrayList));
    var flag = 0;
    $(".error_msg").text("");
    if (TextBoxValidation("Group_Name", "Enter group name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Contact_Number_Work", "Enter contact number (Work)") == 1) {
        flag = 1;
    }
    //if (TextBoxValidation("Contact_Number_Work", "Enter contact number (Work)") == 0) {
    //    if (NumberValidation("Contact_Number_Work", "Enter only number") == 1) {
    //        flag = 1;
    //    }
    //}
    if (TextBoxValidation("Email_Id", "Enter email id") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Email_Id", "Enter email id") == 0) {
        if (ValidateEmail("Email_Id", "Enter valid email id") == 1) {
            flag = 1;
        }
    }
    if (TextBoxValidation("Registration_Date", "Select registration date") == 1) {
        flag = 1;
    }
    //if (TextBoxValidation("Physical_Address", "Enter physical address") == 1) {
    //    flag = 1;
    //}
    //if (TextBoxValidation("Physical_City", "Enter physical city") == 1) {
    //    flag = 1;
    //}
    //if (DropDownValidation("Physical_Country_Id", "Select physical country") == 1) {
    //    flag = 1;
    //}

    //if (TextBoxValidation("Physical_Postal_Code", "Enter physical postal code") == 1) {
    //    flag = 1;
    //}

    //if (TextBoxValidation("Physical_Postal_Code", "Enter postal code") == 0) {
    //    if (NumberValidation("Physical_Postal_Code", "Enter only number") == 1) {
    //        flag = 1;
    //    }
    //}

    if (TextBoxValidation("Postal_Address", "Enter postal address") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Postal_City", "Enter postal city") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Postal_Country_Id", "Select postal country") == 1) {
        flag = 1;
    }

    if (TextBoxValidation("Postal_Code", "Enter postal code") == 1) {
        flag = 1;
    }
    if (Emergency_Contact_ArrayList.length == 0) {
        alert("Insert at least one contact person");
        flag = 1;
    }
    if (flag == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }

    return true;
}
function ValidateGroup_GrpContact() {
    //debugger
    var flag = 0;
    if (TextBoxValidation("First_Name", "Enter first name") == 1) {
        flag = 1;
    }
    else {
        $("#err_First_Name").text('');
    }
    if (TextBoxValidation("Cell_Contact_Number", "Enter contact number (Cell)") == 1) {
        flag = 1;
    }
    else {
        $("#err_Cell_Contact_Number").text('');
    }
    if (TextBoxValidation("Last_Name", "Enter last name") == 1) {
        flag = 1;
    }
    else {
        $("#err_Last_Name").text('');
    }
    if (flag == 1) {
        //debugger
        return false;
    }
    else {
        Group_Contact_AddRow();
    }
}
function ValidateGroup_GrpDoc() {
    flag = 0;
    //debugger
    if (TextBoxValidation("Document_Name", "Enter document name") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Document_Type_Id", "Enter document name") == 1) {
        flag = 1;
    }
    var DocContent = $("#upload_Document").val();
    if (Document_File_Name == "") {
        alert("Please upload document");
        flag = 1;
        //return false;
    }
    if (flag == 1) {
        //debugger
        return false;
    }
    else {
        $("#err_Document_Name").text('');
        Group_Document_Add();
        //Upload_Groupr_Document(event);
    }
}
function ValidateGroup_GrpBankDetails() {
    //debugger
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('SBTN').hidden = true;

    var flag = 0;
    if (DropDownValidation("Payment_Method_Id", "Select document type") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Bank_Name", "Enter bank name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Account_Number", "Enter account number") == 1) { flag = 1; }
    //if (TextBoxValidation("Account_Number", "Enter account number") == 0) {
    //    if (NumberValidation("Account_Number", "Enter only number") == 1) {
    //        flag = 1;
    //    }
    //}
    if (TextBoxValidation("Account_Holder_Name", "Enter account name") == 1) {
        flag = 1;
    }

    if (flag == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('PRVBTN').hidden = false;
        document.getElementById('SBTN').hidden = false;
        return false;
    }
    return true;
}
function ValidateGroup_For_Edit() {
    //debugger
    var flag = 0;
    $(".error_msg").text("");
    if (TextBoxValidation("Group_Name", "Enter group name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Contact_Number_Work", "Enter contact number (Work)") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Contact_Number_Work", "Enter contact number (Work)") == 0) {
        if (NumberValidation("Contact_Number_Work", "Enter only number") == 1) {
            flag = 1;
        }
    }
    if (TextBoxValidation("Email_Id", "Enter email id") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Email_Id", "Enter email id") == 0) {
        if (ValidateEmail("Email_Id", "Enter valid email id") == 1) {
            flag = 1;
        }
    }
    if (TextBoxValidation("Registration_Date", "Select registration date") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Physical_Address", "Enter address") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Physical_City", "Enter city") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Physical_Country_Id", "Select country") == 1) {
        flag = 1;
    }

    if (TextBoxValidation("Physical_Postal_Code", "Enter postal code") == 1) {
        flag = 1;
    }

    if (DropDownValidation("Group_Status_Id", "Select status") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Physical_Postal_Code", "Enter postal code") == 0) {
        if (NumberValidation("Physical_Postal_Code", "Enter only number") == 1) {
            flag = 1;
        }
    }
    if (Group_Contact_ArrayList == "") {
        alert("Insert at least one contact person");
        flag = 1;
    }
    if (flag == 1) {
        //debugger
        return false;
    }
    else {
        ValidateGroupContact();
    }
    /*return true;*/
}
function ValidateGroup_GrpContact_For_Edit() {
    //debugger
    var flag = 0;
    if (TextBoxValidation("First_Name", "Enter first name") == 1) {
        flag = 1;
    }
    else {
        $("#err_First_Name").text('');
    }
    if (TextBoxValidation("Cell_Contact_Number", "Enter contact number (Cell)") == 1) {
        flag = 1;
    } else { $("#err_Cell_Contact_Number").text(''); }
    if (TextBoxValidation("Last_Name", "Enter last name") == 1) {
        flag = 1;
    }
    else {
        $("#err_Last_Name").text('');
    }
    if (flag == 1) {
        //debugger
        return false;
    }
    else {
        AddRow_EditGroup();
    }

}
//#endregion


function GroupAutoSearchList() {
    debugger
    $("#datalistOptions").html('');

    var Data = $('#exampleDataList').val().trim();
    if (Data.length == 0) {
        document.getElementById("lstGrpForm").submit();
    }

    if (Data.length >= 4) {
        //debugger
        $.ajax({
            url: '/Group/GroupAutoComplete/',
            data: "{'pPKvalue': '" + Data + "'}",
            dataType: "json",
            async: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //debugger
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var ListData = "<li onclick='TextBoxBind(\"" + data[i].Group_Name + "\")'" + ">" + data[i].Group_Name + "</li>";
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

function TextBoxBind(Name) {
    //debugger
    $("#datalistOptions").html('');
    $('#exampleDataList').val(Name);

    document.getElementById("lstGrpForm").submit();
}

function ValidateOnSubmit() {
    //debugger
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('SBTN').hidden = true;
    var flag = 0;
    if (DropDownValidation("Payment_Method_Id", "Select document type") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Bank_Name", "Enter bank name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Account_Number", "Enter account number") == 1) { flag = 1; }
    //if (TextBoxValidation("Account_Number", "Enter account number") == 0) {
    //    if (NumberValidation("Account_Number", "Enter only number") == 1) {
    //        flag = 1;
    //    }
    //}
    if (TextBoxValidation("Account_Holder_Name", "Enter account name") == 1) {
        flag = 1;
    }
    if (ValidateGrpDoc() == 1) {
        //debugger
        flag = 1;
    }
    if (flag == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('SBTN').hidden = false;
        return false;
    }
    return true;
}

function ValidateGrpDoc() {
    //debugger
    var pGroupId = $('#pGroup_Id').val();
    var flag = 0;
    $.ajax({
        url: '/Group/ValidateGrpDoc/',
        type: "POST",
        async: false,
        data: { pPKvalue: pGroupId },
        dataType: "json",
        success: function (result) {
            //debugger
            if (result == 0) {
                //debugger
                alert("Please upload document");
                flag = 1;
            }
        },
        error: function (response) {
            alert(response.responseText);
        },
        failure: function (response) {
            alert(response.responseText);
        }
    });
    return flag;
}


function GPDocumentTypeOnChange() {
    //debugger
    var Document_Type_Id = $("#Document_Type_Id").val();
    if (Document_Type_Id == "10") {
        $("#spanDN").show();
    }
    else {
        $("#spanDN").hide();
    }
}