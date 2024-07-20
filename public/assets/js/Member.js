function CalculateAge(txtId, ShowId) {
    //debugger
    $("#err_" + txtId).text("");
    var age = "";
    var varId = $("#" + txtId).val();
    var myArray = varId.split("/");
    var birthDay = myArray[1] + "/" + myArray[0] + "/" + myArray[2];
    var DOB = new Date(birthDay);
    var today = new Date();
    if (today < DOB) {
        $("#" + txtId).val("");
        $("#err_" + txtId).text("Future date is not allowed")
    }
    else {
        var ageInMilliseconds = new Date(today - DOB);
        var years = ageInMilliseconds / (24 * 60 * 60 * 1000 * 365.25);
        var months = 12 * (years % 1);
        var days = Math.floor(30 * (months % 1));
        age = Math.floor(years);
        // age=  Math.floor(years) + ' years ' + Math.floor(months) + ' months ' + days + ' days';

        $("#" + ShowId).html(age)
    }
}

function CalculateAgeOnEdit(pdate) {
    //debugger
    var age = "";
    var varId = pdate;
    var myArray = varId.split("/");
    var birthDay = myArray[1] + "/" + myArray[0] + "/" + myArray[2];
    var DOB = new Date(birthDay);
    var today = new Date();
    var ageInMilliseconds = new Date(today - DOB);
    var years = ageInMilliseconds / (24 * 60 * 60 * 1000 * 365.25);
    var months = 12 * (years % 1);
    var days = Math.floor(30 * (months % 1));
    age = Math.floor(years);
    // age=  Math.floor(years) + ' years ' + Math.floor(months) + ' months ' + days + ' days';

    return age
}

function RestrictFutureDate(txtId) {
    //debugger
    $("#err_" + txtId).text("");
    var flag = 0;
    var age = "";
    var varId = $("#" + txtId).val();
    var myArray = varId.split("/");
    var birthDay = myArray[1] + "/" + myArray[0] + "/" + myArray[2];
    var DOB = new Date(birthDay);
    var today = new Date();

    if (today < DOB) {

        $("#" + txtId).val("");
        $("#err_" + txtId).text("Future date is not allowed")
        flag = 1;
    }

    return flag;
}


//#region Personal DetailsValidateMember

var Emergency_Contact_ArrayList = [];


function ValidateMember() {
    //debugger
    var flag = 0;
    $(".error_msg").text("");
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;

    if (DropDownValidation("Title_Id", "Select title") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("First_Name", "Enter first name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Last_Name", "Enter last name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Date_of_Birth", "Select date of birth") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Date_of_Birth", "Select date of birth") == 0) {
        if (RestrictFutureDate("Date_of_Birth") == 1) {
            flag = 1;
        }
    }

    if (DropDownValidation("Marital_Status_Id", "Select marital status") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Occupation", "Enter Occupation") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Blood_Group_Id", "Select blood group") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Gender_Id", "Select gender") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Ethnicity_Id", "Select Ethnicity") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Address", "Enter Address") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("City", "Enter City") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Country_Id", "Select Country") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Postal_Code", "Enter Postal Code") == 1) {
        flag = 1;
    }
    //if (TextBoxValidation("Postal_Code", "Enter Postal Code") == 0) {

    //    if (NumberValidation("Postal_Code", "Enter only number") == 1) {
    //        flag = 1;
    //    }
    //}
    if (TextBoxValidation("Contact_Number_Cell", "Contact Number (Cell)") == 1) {
        flag = 1;
    }

    if (TextBoxValidation("Email_Id", "Enter email") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Email_Id", "Enter email") == 0) {
        if (ValidateEmail("Email_Id", "Enter valid email") == 1) {
            flag = 1;
        }
    }
    if (TextBoxValidation("Registration_Date", "Select Registration Date") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Registration_Date", "Select Registration Date") == 0) {
        if (RestrictFutureDate("Registration_Date") == 1) {
            flag = 1;
        }
    }


    if (DropDownValidation("Current_Plan_Id", "Select Plan") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Current_Member_Cat_Id", "Select Member Categories") == 1) {
        flag = 1;
    }



    if ($("#Profile_Image_File_Name").val() == "") {
        flag = 1;
        alert("Please choose photo");
    }

    var MemberId = $("#pPKvalue").val();
    if (MemberId != "0") {
        if (DropDownValidation("Member_Status_Id", "Select Status") == 1) {
            flag = 1;
        }
    }

    if (CheckDuplicateMember() == 1) {        flag = 1;
    }

    //debugger
    //37-Suspended
    //38-Active
    var Member_Status_Id = $("#Member_Status_Id").val();
    if (Member_Status_Id == "37" || Member_Status_Id == "38") {
        var PRV_Plan_Id = $("#PRV_Plan_Id").val();
        var PRV_Member_Cat_Id = $("#PRV_Member_Cat_Id").val();
        var Current_Plan_Id = $("#Current_Plan_Id").val();
        var Current_Member_Cat_Id = $("#Current_Member_Cat_Id").val();

        if ((PRV_Plan_Id != Current_Plan_Id) || (PRV_Member_Cat_Id != Current_Member_Cat_Id)) {
            if ($("#Plan_Effective_Date").val() == "") {
                $("#err_Plan_Effective_Date").text("Select Plan Effective Date");
                flag = 1;
            }
        }
    }

    $("#HDN_Emergency_Contacts").val(JSON.stringify(Emergency_Contact_ArrayList));

    if (flag == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }
    return true;
}

function Plan_Member_CategoryOnChange() {
    //debugger
    var Member_Status_Id = $("#Member_Status_Id").val();
    if (Member_Status_Id == "37" || Member_Status_Id == "38") {
        var PRV_Plan_Id = $("#PRV_Plan_Id").val();
        var PRV_Member_Cat_Id = $("#PRV_Member_Cat_Id").val();
        var Current_Plan_Id = $("#Current_Plan_Id").val();
        var Current_Member_Cat_Id = $("#Current_Member_Cat_Id").val();

        if ((PRV_Plan_Id != Current_Plan_Id) || (PRV_Member_Cat_Id != Current_Member_Cat_Id)) {
            $("#span_Effective_Date").css("visibility", "visible");
            //debugger;
            var GetDate = new Date();

            GetDate.setFullYear(GetDate.getFullYear());
            var NextYear = GetDate.getFullYear() + 1;

            $("#Plan_Effective_Date").val("01/01/" + NextYear);

        }
        else {
            $("#span_Effective_Date").css("visibility", "hidden");
            $("#Plan_Effective_Date").val("");
        }
    }
}

function Emergency_Contacts_Add() {
    //debugger
    var First_Name = $("#First_Name_EM").val();
    var Last_Name = $("#Last_Name_EM").val();
    var Contact_Number = $("#Contact_Number").val();
    var Name = First_Name + " " + Last_Name;
    var Relationship_Id = $("#Relationship_Id").val();
    var Relationship = $("#Relationship_Id option[value=" + Relationship_Id + "]").text();

    var flag = 0;
    $(".error_msg").text("");
    if (TextBoxValidation("First_Name_EM", "Enter First Name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Last_Name_EM", "Enter Last Name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Contact_Number", "Enter Contact Number") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Contact_Number", "Enter Contact Number") == 0) {

        if (NumberValidation("Contact_Number", "Enter Number Only") == 1) {
            flag = 1;
        }
    }
    if (DropDownValidation("Relationship_Id", "Select Relationship") == 1) {
        flag = 1;
    }
    if (flag == 1) {
        return false;
    }


    var tbodyrowCount = $('#tbody_Emergency_Contacts tr').length;
    if (tbodyrowCount == 0) {
        $("#Emergency_Contacts_Count").val("0");
    }

    var Emergency_Contacts = $("#Emergency_Contacts_Count").val();
    var Emergency_Contacts_Count = parseInt(Emergency_Contacts) + 1;

    var tr = "<tr id=tr_" + Emergency_Contacts_Count + ">";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + Relationship + "</td>";
    tr += "<td>" + Contact_Number + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Emergency_Contact_Edit(" + Emergency_Contacts_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Emergency_Contact_Delete(" + Emergency_Contacts_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Emergency_Contacts").append(tr);

    var ItemsEmergencyContacts = {};
    ItemsEmergencyContacts["RowId"] = Emergency_Contacts_Count;
    ItemsEmergencyContacts["Member_Emergency_Contact_Id"] = "0";
    ItemsEmergencyContacts["First_Name"] = $.trim(First_Name);
    ItemsEmergencyContacts["Last_Name"] = $.trim(Last_Name);
    ItemsEmergencyContacts["Contact_Number"] = $.trim(Contact_Number);
    ItemsEmergencyContacts["Relationship_Id"] = Relationship_Id;
    ItemsEmergencyContacts["RelationshipName"] = Relationship;
    Emergency_Contact_ArrayList.push(ItemsEmergencyContacts);

    $("#First_Name_EM").val("");
    $("#Last_Name_EM").val("");
    $("#Contact_Number").val("");
    $("#Relationship_Id").val("0");
    $("#Emergency_Contacts_Count").val(Emergency_Contacts_Count);
}

var IS_Emergency_ContactEdit = false;
function Emergency_Contact_Edit(Rowid) {
    //debugger
    $(".error_msg").text("");
    if (IS_Emergency_ContactEdit != true) {
        IS_Emergency_ContactEdit = true;
        $("#Emer_Contact_BTN").removeAttr("onclick");
        $("#Emer_Contact_BTN").attr("onclick", "Emergency_Contact_Update(" + Rowid + ")");
        $("#Emer_Contact_BTN").text("Update");
        var oEmergency_Contact_ArrayList = Emergency_Contact_ArrayList.find(x => x.RowId == Rowid);
        $("#First_Name_EM").val(oEmergency_Contact_ArrayList.First_Name);
        $("#Last_Name_EM").val(oEmergency_Contact_ArrayList.Last_Name);
        $("#Contact_Number").val(oEmergency_Contact_ArrayList.Contact_Number);
        $("#Relationship_Id").val(oEmergency_Contact_ArrayList.Relationship_Id);
        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one emergency contact in edit mode.");
        return false;
    }
}

function Emergency_Contact_Update(Rowid) {
    //debugger
    IS_Emergency_ContactEdit = false;
    var oEmergency_Contact_ArrayList = Emergency_Contact_ArrayList.find(x => x.RowId == Rowid);
    $("#tr_" + Rowid + "").remove();

    var First_Name = $("#First_Name_EM").val();
    var Last_Name = $("#Last_Name_EM").val();
    var Contact_Number = $("#Contact_Number").val();
    var Name = First_Name + " " + Last_Name;
    var Relationship_Id = $("#Relationship_Id").val();
    var Relationship = $("#Relationship_Id option[value=" + Relationship_Id + "]").text();

    var flag = 0;
    $(".error_msg").text("");
    if (TextBoxValidation("First_Name_EM", "Enter First Name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Last_Name_EM", "Enter Last Name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Contact_Number", "Enter Contact Number") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Contact_Number", "Enter Contact Number") == 0) {

        if (NumberValidation("Contact_Number", "Enter Number Only") == 1) {
            flag = 1;
        }
    }
    if (DropDownValidation("Relationship_Id", "Select Relationship") == 1) {
        flag = 1;
    }
    if (flag == 1) {
        return false;
    }


    oEmergency_Contact_ArrayList.First_Name = First_Name;
    oEmergency_Contact_ArrayList.Last_Name = Last_Name;
    oEmergency_Contact_ArrayList.Contact_Number = Contact_Number;
    oEmergency_Contact_ArrayList.Relationship_Id = Relationship_Id;
    oEmergency_Contact_ArrayList.RelationshipName = Relationship;


    var tr = "<tr id=tr_" + Rowid + ">";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + Relationship + "</td>";
    tr += "<td>" + Contact_Number + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Emergency_Contact_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Emergency_Contact_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Emergency_Contacts").append(tr);

    $("#First_Name_EM").val("");
    $("#Last_Name_EM").val("");
    $("#Contact_Number").val("");
    $("#Relationship_Id").val("0");

    $("#Emer_Contact_BTN").removeAttr("onclick");
    $("#Emer_Contact_BTN").attr("onclick", "Emergency_Contacts_Add()");
    $("#Emer_Contact_BTN").text("Add");
}

function Emergency_Contact_Delete(Rowid) {
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

function Upload_Member_Image(event) {
    //debugger
    var Image_Size_KB_For_Validation = (Math.round(event.target.files[0].size / 1024));
    var Image_Size_MB_For_Validation = (Math.round(Image_Size_KB_For_Validation / 1024));
    if (Image_Size_KB_For_Validation > 4096) {  // Max file size will be 4 mb or 4096 KB
        alert("Max file size 1mb is allowed. The size of uploaded file is " + Image_Size_MB_For_Validation + " mb (approximately).");

        var output = document.getElementById('wizardPicturePreview');
        output.src = "/Assets/images/blank_user.jpg";

        return;
    }
    //debugger
    var fileUpload = $("#wizardpicture").get(0);
    var files = fileUpload.files;
    var fileData = new FormData();
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    $.ajax({
        url: '/Member/UploadDependantImage',
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (result) {
            //debugger
            $("#Profile_Image_File_Name").val(result);
            var output = document.getElementById('wizardPicturePreview');
            output.src = "/DigitalAssets/ProfileImage/" + result;
            $("#wizardpicture").val("");
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function CheckDuplicateMember() {    //debugger    var MemberId = $("#pPKvalue").val();    var FirstName = $("#First_Name").val().trim();    var LastName = $("#Last_Name").val().trim();    var Date_of_Birth = $("#Date_of_Birth").val();    var flag = 0;    if (FirstName != "" && LastName != "" && Date_of_Birth != "") {        $.ajax({            url: '/Member/CheckDuplicateMember',            type: "Post",            async: false,            data: { pMemberId: MemberId, pFirstName: FirstName, pLastName: LastName, DateofBirth: Date_of_Birth },            dataType: "json",            success: function (result) {                //debugger                if (result == true) {                    alert('Member already exist!')                    flag = 1;                }            }        });    }    return flag;}

//#endregion

//#region Dependant Details

var Dependant_Detail_ArrayList = [];

function Dependant_Detail_Add() {
    //debugger
    $(".error_msg").text("");
    var Member_Cat_Id = $("#Member_Cat_Id").val();


    var Title_Id = $("#Title_Id").val();
    var First_Name = $.trim($("#First_Name").val());
    var Last_Name = $.trim($("#Last_Name").val());
    var Date_of_Birth = $("#Date_of_Birth").val();
    var Depedent_Age = $("#Depedent_Age").text();
    var Blood_Group_Id = $("#Blood_Group_Id").val();
    var Blood_Group_Name = $("#Blood_Group_Id option[value=" + Blood_Group_Id + "]").text();
    var Relationship_Id = $("#Relationship_Id").val();
    var Relationship_Name = $("#Relationship_Id option[value=" + Relationship_Id + "]").text();
    var Depedent_Image = $("#Depedent_Image").val();
    var flag = 0;
    if (Title_Id == "0") {
        $("#err_Title_Id").text("Select Title");
        flag = 1;
    }
    if (First_Name == "") {
        $("#err_First_Name").text("Enter first name");
        flag = 1;
    }
    if (Last_Name == "") {
        $("#err_Last_Name").text("Enter last name");
        flag = 1;
    }
    if (Date_of_Birth == "") {
        $("#err_Date_of_Birth").text("Select Date of Birth");
        flag = 1;
    }
    if (Date_of_Birth != "") {
        if (RestrictFutureDate("Date_of_Birth") == 1) {
            flag = 1;
        }
    }
    if (Blood_Group_Id == "0") {
        $("#err_Blood_Group_Id").text("Select Blood Group");
        flag = 1;
    }
    if (Relationship_Id == "0") {
        $("#err_Relationship_Id").text("Select Relationship");
        flag = 1;
    }
    if (Depedent_Image == "") {
        alert("Please choose image");
        flag = 1;
    }
    if (flag == 1) {
        return false;
    }



    var Name = First_Name + " " + Last_Name;

    var tbodyrowCount = $('#tbody_Dependant_Detail tr').length;
    if (tbodyrowCount == 0) {
        $("#Dependant_Detail_Count").val("0");
    }

    if (Member_Cat_Id == 1) {
        alert("You cannot add Dependant");
        return false;
    }
    if (Member_Cat_Id == 2) {
        if (tbodyrowCount == 1) {
            alert("You add only one Dependant");
            return false;
        }

    }
    if (Member_Cat_Id == 3) {
        if (tbodyrowCount >= 2) {
            alert("You add only two Dependant");
            return false;
        }
    }
    if (Member_Cat_Id == 4) {
        if (tbodyrowCount >= 3) {
            alert("You add only three Dependant");
            return false;
        }
    }
    if (Member_Cat_Id == 5) {
        if (tbodyrowCount >= 4) {
            alert("You add only four Dependant");
            return false;
        }
    }
    if (Member_Cat_Id == 6) {
        if (tbodyrowCount >= 5) {
            alert("You add only five Dependant");
            return false;
        }
    }
    if (Member_Cat_Id == 7) {
        if (tbodyrowCount >= 6) {
            alert("You add only six Dependant");
            return false;
        }
    }
    if (Member_Cat_Id == 8) {
        if (tbodyrowCount >= 7) {
            alert("You add only seven Dependant");
            return false;
        }
    }
    if (Member_Cat_Id == 9) {
        if (tbodyrowCount >= 8) {
            alert("You add only eight Dependant");
            return false;
        }
    }

    var Dependant_Count = $("#Dependant_Detail_Count").val();
    var Dependant_Detail_Count = parseInt(Dependant_Count) + 1;

    var tr = "<tr id=tr_" + Dependant_Detail_Count + ">";
    tr += "<td><div class='thumb_img'><img src='/DigitalAssets/ProfileImage/" + Depedent_Image + "'></div></td>";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + Date_of_Birth + "</td>";
    tr += "<td>" + Depedent_Age + "</td>";
    tr += "<td>" + Blood_Group_Name + "</td>";
    tr += "<td>" + Relationship_Name + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Dependant_Detail_Edit(" + Dependant_Detail_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Dependant_Detail_Delete(" + Dependant_Detail_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Dependant_Detail").append(tr);

    var ItemsDependantDetail = {};
    ItemsDependantDetail["RowId"] = Dependant_Detail_Count;
    ItemsDependantDetail["Member_Dependent_Id"] = "0";
    ItemsDependantDetail["Title_Id"] = Title_Id;
    ItemsDependantDetail["First_Name"] = First_Name;
    ItemsDependantDetail["Last_Name"] = Last_Name;
    ItemsDependantDetail["Date_of_Birth"] = Date_of_Birth;
    ItemsDependantDetail["Depedent_Age"] = Depedent_Age;
    ItemsDependantDetail["Blood_Group_Id"] = Blood_Group_Id;
    ItemsDependantDetail["Blood_Group_Name"] = Blood_Group_Name;
    ItemsDependantDetail["Relationship_Id"] = Relationship_Id;
    ItemsDependantDetail["Relationship_Name"] = Relationship_Name;
    ItemsDependantDetail["Photo_File_Name"] = Depedent_Image;


    Dependant_Detail_ArrayList.push(ItemsDependantDetail);

    $("#Title_Id").val("0");
    $("#First_Name").val("");
    $("#Last_Name").val("");
    $("#Date_of_Birth").val("");
    $("#Depedent_Age").text("Age");
    $("#Blood_Group_Id").val("0");
    $("#Relationship_Id").val("0");
    $("#Depedent_Image").val("");

    $("#wizardPicturePreview").attr("src", "/Assets/images/blank_user.jpg");
    $("#Dependant_Detail_Count").val(Dependant_Detail_Count);
}

var IS_DependantDetail_Edit = false;
function Dependant_Detail_Edit(Rowid) {
    //debugger
    $(".error_msg").text("");
    if (IS_DependantDetail_Edit != true) {
        IS_DependantDetail_Edit = true;
        $("#DPN_DTL_BTN").show();
        $("#DPN_DTL_BTN").removeAttr("onclick");
        $("#DPN_DTL_BTN").attr("onclick", "Dependant_Detail_Update(" + Rowid + ")");
        $("#DPN_DTL_BTN").text("Update");
        var oDependant_Detail_ArrayList = Dependant_Detail_ArrayList.find(x => x.RowId == Rowid);
        $("#Title_Id").val(oDependant_Detail_ArrayList.Title_Id);
        $("#First_Name").val(oDependant_Detail_ArrayList.First_Name);
        $("#Last_Name").val(oDependant_Detail_ArrayList.Last_Name);
        $("#Date_of_Birth").val(oDependant_Detail_ArrayList.Date_of_Birth);
        $("#Depedent_Age").text(oDependant_Detail_ArrayList.Depedent_Age);
        $("#Blood_Group_Id").val(oDependant_Detail_ArrayList.Blood_Group_Id);
        $("#Relationship_Id").val(oDependant_Detail_ArrayList.Relationship_Id);
        $("#Depedent_Image").val(oDependant_Detail_ArrayList.Photo_File_Name);
        $("#wizardPicturePreview").val(oDependant_Detail_ArrayList.Photo_File_Name);
        $("#wizardPicturePreview").attr("src", "/DigitalAssets/ProfileImage/" + oDependant_Detail_ArrayList.Photo_File_Name);

        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one dependant in edit mode.");
        return false;
    }
}

function Dependant_Detail_Update(Rowid) {
    //debugger
    $(".error_msg").text("");
    IS_DependantDetail_Edit = false;
    var oDependant_Detail_ArrayList = Dependant_Detail_ArrayList.find(x => x.RowId == Rowid);
    $("#tr_" + Rowid + "").remove();

    var Title_Id = $("#Title_Id").val();
    var First_Name = $.trim($("#First_Name").val());
    var Last_Name = $.trim($("#Last_Name").val());
    var Date_of_Birth = $("#Date_of_Birth").val();
    var Depedent_Age = $("#Depedent_Age").text();
    var Blood_Group_Id = $("#Blood_Group_Id").val();
    var Blood_Group_Name = $("#Blood_Group_Id option[value=" + Blood_Group_Id + "]").text();
    var Relationship_Id = $("#Relationship_Id").val();
    var Relationship_Name = $("#Relationship_Id option[value=" + Relationship_Id + "]").text();
    var Depedent_Image = $("#Depedent_Image").val();

    var flag = 0;
    if (Title_Id == "0") {
        $("#err_Title_Id").text("Select Title");
        flag = 1;
    }
    if (First_Name == "") {
        $("#err_First_Name").text("Enter first name");
        flag = 1;
    }
    if (Last_Name == "") {
        $("#err_Last_Name").text("Enter last name");
        flag = 1;
    }
    if (Date_of_Birth == "") {
        $("#err_Date_of_Birth").text("Select Date of Birth");
        flag = 1;
    }
    if (RestrictFutureDate("Date_of_Birth") == 1) {
        flag = 1;
    }
    if (Blood_Group_Id == "0") {
        $("#err_Blood_Group_Id").text("Select Blood Group");
        flag = 1;
    }
    if (Relationship_Id == "0") {
        $("#err_Relationship_Id").text("Select Relationship");
        flag = 1;
    }
    if (Depedent_Image == "") {
        alert("Please chose image");
        flag = 1;
    }
    if (flag == 1) {
        return false;
    }

    var Name = First_Name + " " + Last_Name;


    oDependant_Detail_ArrayList.Title_Id = Title_Id;
    oDependant_Detail_ArrayList.First_Name = First_Name;
    oDependant_Detail_ArrayList.Last_Name = Last_Name;
    oDependant_Detail_ArrayList.Date_of_Birth = Date_of_Birth;
    oDependant_Detail_ArrayList.Depedent_Age = Depedent_Age;
    oDependant_Detail_ArrayList.Blood_Group_Id = Blood_Group_Id;
    oDependant_Detail_ArrayList.Blood_Group_Name = Blood_Group_Name;
    oDependant_Detail_ArrayList.Relationship_Id = Relationship_Id;
    oDependant_Detail_ArrayList.Relationship_Name = Relationship_Name;
    oDependant_Detail_ArrayList.Photo_File_Name = Depedent_Image;



    var tr = "<tr id=tr_" + Rowid + ">";
    tr += "<td><div class='thumb_img'><img src='/DigitalAssets/ProfileImage/" + Depedent_Image + "'></div></td>";
    tr += "<td>" + Name + "</td>";
    tr += "<td>" + Date_of_Birth + "</td>";
    tr += "<td>" + Depedent_Age + "</td>";
    tr += "<td>" + Blood_Group_Name + "</td>";
    tr += "<td>" + Relationship_Name + "</td>";
    if (oDependant_Detail_ArrayList.Member_Dependent_Id != 0) {
        if ($("#Is_Submited").val() == "1") {
            tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Dependant_Detail_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a></td>";
        }
        else {
            tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Dependant_Detail_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Dependant_Detail_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";

        }
    }
    else {
        tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Dependant_Detail_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Dependant_Detail_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";

    }
    $("#tbody_Dependant_Detail").append(tr);

    $("#Title_Id").val("0");
    $("#First_Name").val("");
    $("#Last_Name").val("");
    $("#Date_of_Birth").val("");
    $("#Depedent_Age").text("Age");
    $("#Blood_Group_Id").val("0");
    $("#Relationship_Id").val("0");
    $("#Depedent_Image").val("");
    $("#wizardPicturePreview").attr("src", "/Assets/images/blank_user.jpg");

    $("#DPN_DTL_BTN").removeAttr("onclick");
    if ($("#Is_Submited").val() == "0") {
        $("#DPN_DTL_BTN").attr("onclick", "Dependant_Detail_Add()");
        $("#DPN_DTL_BTN").text("Add");
    }
    else {
        $("#DPN_DTL_BTN").attr("onclick", "");
        $("#DPN_DTL_BTN").text("");
        $("#DPN_DTL_BTN").hide();
    }

}

function Dependant_Detail_Delete(Rowid) {
    //debugger
    var oDependant_Detail_ArrayList = Dependant_Detail_ArrayList.find(x => x.RowId == Rowid);
    if (oDependant_Detail_ArrayList != undefined) {


        for (var i = 0; i < Dependant_Detail_ArrayList.length; i++) {
            if (Dependant_Detail_ArrayList[i].RowId == Rowid) {
                Dependant_Detail_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#tr_" + Rowid + "").remove();
    }
}

function Upload_Dependant_Image(event) {
    //debugger
    var Image_Size_KB_For_Validation = (Math.round(event.target.files[0].size / 1024));
    var Image_Size_MB_For_Validation = (Math.round(Image_Size_KB_For_Validation / 1024));
    if (Image_Size_KB_For_Validation > 4096) {  // Max file size will be 4 mb or 4096 KB
        alert("Max file size 1mb is allowed. The size of uploaded file is " + Image_Size_MB_For_Validation + " mb (approximately).");

        var output = document.getElementById('wizardPicturePreview');
        output.src = "/Assets/images/blank_user.jpg";

        return;
    }
    //debugger
    var fileUpload = $("#wizardpicture").get(0);
    var files = fileUpload.files;
    var fileData = new FormData();
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    $.ajax({
        url: '/Member/UploadDependantImage',
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (result) {
            //debugger
            $("#Depedent_Image").val(result);
            var output = document.getElementById('wizardPicturePreview');
            output.src = "/DigitalAssets/ProfileImage/" + result;
            $("#wizardpicture").val('');
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function ValidateDependantDetail() {
    //debugger
    var flag = 0;
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    var Member_Cat_Id = $("#Member_Cat_Id").val();
    var tbodyrowCount = $('#tbody_Dependant_Detail tr').length;

    if (Member_Cat_Id == 1) {
        if (tbodyrowCount > 0) {
            flag = 1;
            alert("You cannot add Dependant");
        }

    }
    if (Member_Cat_Id == 2) {
        if (tbodyrowCount > 1) {
            flag = 1;
            alert("You add only one Dependant");
        }
    }
    if (Member_Cat_Id == 3) {
        if (tbodyrowCount > 2) {
            flag = 1;
            alert("You add only two Dependant");

        }
    }
    if (Member_Cat_Id == 4) {
        if (tbodyrowCount > 3) {
            flag = 1;
            alert("You add only three Dependant");

        }
    }
    if (Member_Cat_Id == 5) {
        if (tbodyrowCount > 4) {
            flag = 1;
            alert("You add only four Dependant");

        }
    }
    if (Member_Cat_Id == 6) {
        if (tbodyrowCount > 5) {
            flag = 1;
            alert("You add only five Dependant");

        }
    }
    if (Member_Cat_Id == 7) {
        if (tbodyrowCount > 6) {
            flag = 1;
            alert("You add only six Dependant");

        }
    }
    if (Member_Cat_Id == 8) {
        if (tbodyrowCount > 7) {
            flag = 1;
            alert("You add only seven Dependant");

        }
    }
    if (Member_Cat_Id == 9) {
        if (tbodyrowCount > 8) {
            flag = 1;
            alert("You add only eight Dependant");

        }
    }
    if (flag == 1) {
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('PRVBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }

    $("#HDN_Dependant_Detail").val(JSON.stringify(Dependant_Detail_ArrayList));

    return true;
}

//#endregion

//#region Document

var Member_Document_ArrayList = [];

function Member_Document_Add() {
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
    if (DropDownValidation("Beneficiary_Id", "Select Primary Member & Dependants") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Document_Type_Id", "Select Document Type") == 1) {
        flag = 1;
    }
    if (Document_Type_Id == "62") {
        if (TextBoxValidation("Document_Name", "Enter Document Name") == 1) {
            flag = 1;
        }
    }
    if (Document_Type_Id == "60") {
        if (TextBoxValidation("Document_Number", "Enter Document Number") == 1) {
            flag = 1;
        }
    }
    if (Document_File_Name == "") {
        flag = 1;
        alert("Please upload document");
    }

    if (flag == 1) {
        return false;
    }


    var BeneficiaryArray = Beneficiary_Id.split("_");


    var tbodyrowCount = $('#tbody_Member_Document tr').length;
    if (tbodyrowCount == 0) {
        $("#Member_Document_Count").val("0");
    }

    var Document_Count = $("#Member_Document_Count").val();
    var Member_Document_Count = parseInt(Document_Count) + 1;

    var tr = "<tr id=tr_" + Member_Document_Count + ">";
    tr += "<td>" + Beneficiary_Name + "</td>";
    tr += "<td>" + Document_Type_Name + "</td>";
    tr += "<td>" + Document_Name + "</td>";
    tr += "<td>" + Document_Number + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Member_Document_Edit(" + Member_Document_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Member_Document_Delete(" + Member_Document_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Member_Document").append(tr);

    var ItemsMemberDocument = {};
    ItemsMemberDocument["RowId"] = Member_Document_Count;
    ItemsMemberDocument["Member_Doc_Id"] = "0";
    ItemsMemberDocument["Beneficiary_Id"] = BeneficiaryArray[0];
    ItemsMemberDocument["Beneficiary_Type_Id"] = BeneficiaryArray[1];
    ItemsMemberDocument["Beneficiary_Name"] = Beneficiary_Name;
    ItemsMemberDocument["Document_Type_Id"] = Document_Type_Id;
    ItemsMemberDocument["Document_Type_Name"] = Document_Type_Name;
    ItemsMemberDocument["Document_Name"] = $.trim(Document_Name);
    ItemsMemberDocument["Document_Number"] = $.trim(Document_Number);
    ItemsMemberDocument["Document_File_Name"] = Document_File_Name;
    Member_Document_ArrayList.push(ItemsMemberDocument);

    $("#Beneficiary_Id").val("0");
    $("#Document_Type_Id").val("0");
    $("#Document_Name").val("");
    $("#Document_Number").val("");
    $("#Document_File_Name").val("");
    $("#upload_Document").val("");
    $(".update_icon").css("display", "none");
    $("#Member_Document_Count").val(Member_Document_Count);
}

var IS_Member_DocumentEdit = false;
function Member_Document_Edit(Rowid) {
    //debugger
    $(".error_msg").text("");
    if (IS_Member_DocumentEdit != true) {
        IS_Member_DocumentEdit = true;
        $("#MBR_DOC_BTN").removeAttr("onclick");
        $("#MBR_DOC_BTN").attr("onclick", "Member_Document_Update(" + Rowid + ")");
        $("#MBR_DOC_BTN").text("Update");
        var oMember_Document_ArrayList = Member_Document_ArrayList.find(x => x.RowId == Rowid);
        var Beneficiary_Id = oMember_Document_ArrayList.Beneficiary_Id + "_" + oMember_Document_ArrayList.Beneficiary_Type_Id;
        $("#Beneficiary_Id").val(Beneficiary_Id);
        $("#Document_Type_Id").val(oMember_Document_ArrayList.Document_Type_Id);
        $("#Document_Name").val(oMember_Document_ArrayList.Document_Name);
        $("#Document_Number").val(oMember_Document_ArrayList.Document_Number);
        $("#Document_File_Name").val(oMember_Document_ArrayList.Document_File_Name);
        $(".update_icon").css("display", "block");
        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one docoment in edit mode.");
        return false;
    }
}

function Member_Document_Update(Rowid) {
    //debugger
    IS_Member_DocumentEdit = false;
    var oMember_Document_ArrayList = Member_Document_ArrayList.find(x => x.RowId == Rowid);
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
    if (DropDownValidation("Beneficiary_Id", "Select Primary Member & Dependants") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Document_Type_Id", "Select Document Type") == 1) {
        flag = 1;
    }
    if (Document_Type_Id == "62") {
        if (TextBoxValidation("Document_Name", "Enter Document Name") == 1) {
            flag = 1;
        }
    }
    if (Document_Type_Id == "60") {
        if (TextBoxValidation("Document_Number", "Enter Document Number") == 1) {
            flag = 1;
        }
    }
    if (Document_File_Name == "") {
        flag = 1;
        alert("Please upload document");
    }

    if (flag == 1) {
        return false;
    }

    var BeneficiaryArray = Beneficiary_Id.split("_");


    oMember_Document_ArrayList.Beneficiary_Id = BeneficiaryArray[0];
    oMember_Document_ArrayList.Beneficiary_Type_Id = BeneficiaryArray[1];
    oMember_Document_ArrayList.Beneficiary_Name = Beneficiary_Name;
    oMember_Document_ArrayList.Document_Type_Id = Document_Type_Id;
    oMember_Document_ArrayList.Document_Type_Name = Document_Type_Name;
    oMember_Document_ArrayList.Document_Name = Document_Name;
    oMember_Document_ArrayList.Document_Number = Document_Number;
    oMember_Document_ArrayList.Document_File_Name = Document_File_Name;





    var tr = "<tr id=tr_" + Rowid + ">";
    tr += "<td>" + Beneficiary_Name + "</td>";
    tr += "<td>" + Document_Type_Name + "</td>";
    tr += "<td>" + Document_Name + "</td>";
    tr += "<td>" + Document_Number + "</td>";
    if (oMember_Document_ArrayList.Member_Doc_Id != 0) {
        if ($("#Is_Submited").val() == "1") {
            tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Member_Document_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a></td>";
        }
        else {
            tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Member_Document_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Member_Document_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";

        }
    }
    else {
        tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Member_Document_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Member_Document_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";

    }
    $("#tbody_Member_Document").append(tr);

    $("#Beneficiary_Id").val("0");
    $("#Document_Type_Id").val("0");
    $("#Document_Name").val("");
    $("#Document_Number").val("");
    $("#Document_File_Name").val("");
    $("#upload_Document").val("");
    $(".update_icon").css("display", "none");

    $("#MBR_DOC_BTN").removeAttr("onclick");
    $("#MBR_DOC_BTN").attr("onclick", "Member_Document_Add()");
    $("#MBR_DOC_BTN").text("Add");

}

function Member_Document_Delete(Rowid) {
    //debugger
    $(".error_msg").text("");
    var oMember_Document_ArrayList = Member_Document_ArrayList.find(x => x.RowId == Rowid);
    if (oMember_Document_ArrayList != undefined) {


        for (var i = 0; i < Member_Document_ArrayList.length; i++) {
            if (Member_Document_ArrayList[i].RowId == Rowid) {
                Member_Document_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#tr_" + Rowid + "").remove();
    }
}

function Upload_Member_Document(event) {
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
        url: '/Member/UploadMemberDocument',
        type: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (result) {
            //debugger
            $("#Document_File_Name").val(result);
            // alert("File has uploaded successfully.");
            $(".update_icon").css("display", "block")
            /* setTimeout(function () { $(".SucessMsg").fadeOut(1500); }, 1000)*/
        },
        error: function (err) {
            alert(err.statusText);
        }
    });

    $("#upload_Document").val("");
}

function ValidateMemberDocument() {
    ////debugger
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    var flag = 0;
    var BeneficiaryArray = [];
    $("#Beneficiary_Id option").each(function () {
        var Val = $(this).val();
        if (Val != 0) {
            var Beneficiary = Val.split("_");
            var ItemsBeneficiaryList = {};
            ItemsBeneficiaryList["Beneficiary_Id"] = Beneficiary[0];
            ItemsBeneficiaryList["Beneficiary_Type_Id"] = Beneficiary[1];
            ItemsBeneficiaryList["Beneficiary_Name"] = $(this).text();
            BeneficiaryArray.push(ItemsBeneficiaryList);
        }

    });
    var Beneficiary_Name_Doc = "";
    for (var j = 0; j < BeneficiaryArray.length; j++) {
        var Document_Array = $.grep(Member_Document_ArrayList, function (v) {
            return v.Beneficiary_Type_Id == BeneficiaryArray[j].Beneficiary_Type_Id && v.Beneficiary_Id == BeneficiaryArray[j].Beneficiary_Id && v.Document_Type_Id == 60;
        });
        if (Document_Array.length == 0) {

            Beneficiary_Name_Doc = Beneficiary_Name_Doc + BeneficiaryArray[j].Beneficiary_Name + ", ";

            flag = 1;
        }
    }

    if (flag == 1) {
        alert("Please add ID Proof for " + Beneficiary_Name_Doc);
        $("#preload").css("display", "none");
        document.getElementById('SAVEBTN').hidden = false;
        document.getElementById('PRVBTN').hidden = false;
        document.getElementById('NXTBTN').hidden = false;
        return false;
    }
    $("#HDN_Member_Document").val(JSON.stringify(Member_Document_ArrayList));
    return true;


}

function DocumentTypeOnChange() {
    //debugger
    var Document_Type_Id = $("#Document_Type_Id").val();
    if (Document_Type_Id == "60") {
        $("#spanDN").show();
    }
    else {
        $("#spanDN").hide();
    }

    if (Document_Type_Id == "62") {
        $("#spanDname").show();
    }
    else {
        $("#spanDname").hide();
    }
}

//#endregion

//#region Medical history

var Medical_History_ArrayList = [];

function Medical_History_Add() {
    //debugger
    $(".error_msg").text("");
    var Beneficiary_Id = $("#Beneficiary_Id").val();
    var Beneficiary_Name = $("#Beneficiary_Id option[value=" + Beneficiary_Id + "]").text();
    var Exclusion_Type_Id = $("#Exclusion_Type_Id").val();

    var Exclusion_Type = $("#Exclusion_Id");
    var Exclusionselected = Exclusion_Type[0].selectedOptions;
    var BeneficiaryArray = Beneficiary_Id.split("_");

    if (Beneficiary_Id == "0") {
        $("#err_Beneficiary_Id").text("Select Primary Member & Dependants");
        return false;
    }
    if (Exclusionselected.length == 0) {
        $("#err_Exclusion_Id").text("Select Medical Conditions");
        return false;
    }
    var oMedical_History_ArrayList = Medical_History_ArrayList.find(x => x.Beneficiary_Id == BeneficiaryArray[0] && x.Beneficiary_Type_Id == BeneficiaryArray[1]);
    if (oMedical_History_ArrayList != undefined) {
        $("#err_Beneficiary_Id").text("Primary Member & Dependants Already present");
        return false;
    }




    var Exclusiondata = "";
    var ExclusionID = "";
    $.each(Exclusionselected, function (option) {
        Exclusiondata += Exclusionselected[option].text + ', ';
        ExclusionID += "0_" + Exclusionselected[option].value + ',';
    });

    Exclusiondata = Exclusiondata.replace(/,\s*$/, "");
    ExclusionID = ExclusionID.replace(/,\s*$/, "");

    var tbodyrowCount = $('#tbody_Medical_History tr').length;
    if (tbodyrowCount == 0) {
        $("#Medical_History_Count").val("0");
    }

    var Medica_Count = $("#Medical_History_Count").val();
    var Medical_History_Count = parseInt(Medica_Count) + 1;

    var tr = "<tr id=tr_" + Medical_History_Count + ">";
    tr += "<td>" + Beneficiary_Name + "</td>";
    tr += "<td>" + Exclusiondata + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Medical_History_Edit(" + Medical_History_Count + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Medical_History_Delete(" + Medical_History_Count + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Medical_History").append(tr);


    var ItemsMedicalHistory = {};
    ItemsMedicalHistory["RowId"] = Medical_History_Count;
    ItemsMedicalHistory["Member_Medical_History_Id"] = "0";
    ItemsMedicalHistory["Beneficiary_Id"] = BeneficiaryArray[0];
    ItemsMedicalHistory["Beneficiary_Type_Id"] = BeneficiaryArray[1];
    ItemsMedicalHistory["Beneficiary_Name"] = Beneficiary_Name;
    ItemsMedicalHistory["Exclusion_Id"] = ExclusionID;
    ItemsMedicalHistory["Exclusion_Name"] = Exclusiondata;
    Medical_History_ArrayList.push(ItemsMedicalHistory);

    $("#Beneficiary_Id").val("0");
    $("#Exclusion_Id option:selected").prop("selected", false);
    $("select").multiselect('reload');


    $("#Medical_History_Count").val(Medical_History_Count);
}

var IS_Medical_HistoryEdit = false;
function Medical_History_Edit(Rowid) {
    //debugger
    $(".error_msg").text("");
    if (IS_Medical_HistoryEdit != true) {
        IS_Medical_HistoryEdit = true;
        $("#MD_HS_BTN").removeAttr("onclick");
        $("#MD_HS_BTN").attr("onclick", "Medical_History_Update(" + Rowid + ")");
        $("#MD_HS_BTN").text("Update");
        var oMedical_History_ArrayList = Medical_History_ArrayList.find(x => x.RowId == Rowid);
        var Beneficiary_Id = oMedical_History_ArrayList.Beneficiary_Id + "_" + oMedical_History_ArrayList.Beneficiary_Type_Id;
        $("#Beneficiary_Id").val(Beneficiary_Id);
        var Exclusion_Id = oMedical_History_ArrayList.Exclusion_Id.split(",")
        for (var i in Exclusion_Id) {
            var optionVal = Exclusion_Id[i];
            var ExclusionArray = optionVal.split("_");
            $("select").find("option[value=" + ExclusionArray[1] + "]").prop("selected", "selected");
        }
        $("select").multiselect('reload');
        $("#tr_" + Rowid + "").hide();

    } else {
        alert("Already one data in edit mode.");
        return false;
    }
}

function Medical_History_Update(Rowid) {
    //debugger
    IS_Medical_HistoryEdit = false;
    var oMedical_History_ArrayList = Medical_History_ArrayList.find(x => x.RowId == Rowid);
    $("#tr_" + Rowid + "").remove();

    $(".error_msg").text("");
    var Beneficiary_Id = $("#Beneficiary_Id").val();
    var Beneficiary_Name = $("#Beneficiary_Id option[value=" + Beneficiary_Id + "]").text();
    var Exclusion_Type_Id = $("#Exclusion_Type_Id").val();

    var Exclusion_Type = $("#Exclusion_Id");
    var Exclusionselected = Exclusion_Type[0].selectedOptions;
    var BeneficiaryArray = Beneficiary_Id.split("_");

    if (Beneficiary_Id == "0") {
        $("#err_Beneficiary_Id").text("Select Primary Member & Dependants");
        return false;
    }
    if (Exclusionselected.length == 0) {
        $("#err_Exclusion_Id").text("Select Medical Conditions");
        return false;
    }



    var ExclusionName = "";
    var ExclusionID = "";
    $.each(Exclusionselected, function (option) {
        ExclusionName += Exclusionselected[option].text + ', ';
        ExclusionID += "0_" + Exclusionselected[option].value + ',';
    });

    ExclusionName = ExclusionName.replace(/,\s*$/, "");
    ExclusionID = ExclusionID.replace(/,\s*$/, "");


    oMedical_History_ArrayList.Beneficiary_Id = BeneficiaryArray[0];
    oMedical_History_ArrayList.Beneficiary_Type_Id = BeneficiaryArray[1];
    oMedical_History_ArrayList.Beneficiary_Name = Beneficiary_Name;
    oMedical_History_ArrayList.Exclusion_Id = ExclusionID;
    oMedical_History_ArrayList.Exclusion_Name = ExclusionName;


    var tr = "<tr id=tr_" + Rowid + ">";
    tr += "<td>" + Beneficiary_Name + "</td>";
    tr += "<td>" + ExclusionName + "</td>";
    tr += "<td class='action'><a href='JavaScript:Void(0);' onclick='Medical_History_Edit(" + Rowid + ")'><i class='fa fa-pencil' data-bs-toggle='tooltip' title='Edit'></i></a> <a href='JavaScript:Void(0);' onclick='Medical_History_Delete(" + Rowid + ")'><i class='fa fa-trash-o' data-bs-toggle='tooltip' title='Delete'></i></a></td>";
    $("#tbody_Medical_History").append(tr);

    $("#Beneficiary_Id").val("0");
    $("#Exclusion_Id option:selected").prop("selected", false);
    $("select").multiselect('reload');

    $("#MD_HS_BTN").removeAttr("onclick");
    $("#MD_HS_BTN").attr("onclick", "Medical_History_Add()");
    $("#MD_HS_BTN").text("Add");
}

function Medical_History_Delete(Rowid) {
    //debugger
    var oMedical_History_ArrayList = Medical_History_ArrayList.find(x => x.RowId == Rowid);
    if (oMedical_History_ArrayList != undefined) {


        for (var i = 0; i < Medical_History_ArrayList.length; i++) {
            if (Medical_History_ArrayList[i].RowId == Rowid) {
                Medical_History_ArrayList.splice(i, 1);
                break;
            }
        }
        $("#tr_" + Rowid + "").remove();
    }
}

function ValidateMedicalHistory() {
    //debugger
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('NXTBTN').hidden = true;
    $("#HDN_Medical_History").val(JSON.stringify(Medical_History_ArrayList));
}

//#endregion

//#region Bank Details

function ValidateBankDetails() {
    //debugger
    var flag = 0;
    $(".error_msg").text("");
    $("#preload").css("display", "block");
    document.getElementById('SAVEBTN').hidden = true;
    document.getElementById('PRVBTN').hidden = true;
    document.getElementById('SBTN').hidden = true;

    if (TextBoxValidation("Bank_Name", "Enter Bank Name") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Account_Number", "Enter Account Number") == 1) {
        flag = 1;
    }
    if (TextBoxValidation("Account_Number", "Enter Account Number") == 0) {

        if (NumberValidation("Account_Number", "Enter number only") == 1) {
            flag = 1;
        }
    }
    if (TextBoxValidation("Account_Holder_Name", "Enter Account Name") == 1) {
        flag = 1;
    }
    if (DropDownValidation("Payment_Method_Id", "Select Payment Method") == 1) {
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

//#endregion

//#region Status Change
function ChangeStatus(pMemberId, pMemberStatusId) {
    debugger;
    $("#hdnMemberId").val("0");
    $("#hdnMemberStatusId").val("0");
    $(".error_msg").text("");

    $("#ddlStatus").val("0");
    $("#ddlTerminationType").val("0");
    $("#TerminationDate").val("");
    $("#EffectiveTerminationDate").val("");
    $("#Reason").val("");
    // alert(pMemberId);
    if (pMemberId.length != 0) {
        debugger;
        $.ajax({
            url: '/Member/ChangeStatus/',
            data: { pMember_Id: pMemberId },
            dataType: "json",
            async: false,
            type: "Get",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                debugger;
                $("#MemberName").text(data.oMemberAddEditModel.First_Name + ' ' + data.oMemberAddEditModel.Last_Name);
                $("#Code").text(data.oMemberAddEditModel.Membership_Number);
                $("#Status").text(data.oMemberAddEditModel.Member_Status);
                if (data.oMemberAddEditModel.Member_Status_Id == "37") {
                    $("#Status").text('Suspended');
                }
                if (data.oMemberAddEditModel.Member_Status_Id == "38") {
                    $("#Status").text('Active');
                }
                if (data.oMemberAddEditModel.Member_Status_Id == "39") {
                    $("#Status").text('Terminated');
                }
                $("#ddlTerminationType").html('');
             /*   if (pMemberStatusId == 38) {*/
                    var ddlTerminationTypeData = "";
                    for (var i = 0; i < data.oMemberLookupModel.lstTerminationType.length; i++) {
                        ddlTerminationTypeData += '<option value="' + data.oMemberLookupModel.lstTerminationType[i].Value + '">' + data.oMemberLookupModel.lstTerminationType[i].Text + '</option>';
                    }
                    $("#ddlTerminationType").append(ddlTerminationTypeData);
              /*  }*/

                $("#ddlStatus").html('');
                var ddlStatus = "";
                for (var i = 0; i < data.oMemberLookupModel.lstMemberStatusCustomise.length; i++) {
                    ddlStatus += '<option value="' + data.oMemberLookupModel.lstMemberStatusCustomise[i].Value + '">' + data.oMemberLookupModel.lstMemberStatusCustomise[i].Text + '</option>';
                }
                $("#ddlStatus").append(ddlStatus);
                debugger;
                if (pMemberStatusId == 38) {
                    $("#divTerminationType").show();
                    $("#divEffectiveTerminationDate").show();
                    $("#labelTerminationDate").text("Termination Date");
                    $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
                    $("#PopuText").text("Terminate / Suspend Member");
                    $("#btnChangeStatus").text("Change Status");

                }
              else  if (pMemberStatusId == 37) {
                    $("#divTerminationType").show();
                    $("#divEffectiveTerminationDate").show();
                    $("#labelTerminationDate").text("Termination Date");
                    $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
                    $("#PopuText").text("Terminate / Suspend Member");
                    $("#btnChangeStatus").text("Change Status");

                }
                else {
                    $("#divTerminationType").hide();
                    $("#divEffectiveTerminationDate").hide();
                    $("#labelTerminationDate").text("Status Change Date");
                    $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
                    $("#PopuText").text("Reinstate Member");
                    $("#btnChangeStatus").text("Change Status");
                }
                $("#hdnMemberId").val(pMemberId);
                $("#hdnMemberStatusId").val(pMemberStatusId);
                show('ChangeStatus');
            }
            //error: function (response) {
            //    alert(response.responseText);
            //},
            //failure: function (response) {
            //    alert(response.responseText);
            //}
        });
    }
}

function StatusOnchange() {
    debugger;
    var Status = $("#ddlStatus").val();
    var MemberStatusId = $("#hdnMemberStatusId").val();
    if (Status == 37) {
        $("#labelTerminationDate").text("Suspended Date");
        $("#labelEffectiveTerminationDate").text("Effective Suspended Date");
        $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
        $("#labelEffectiveTerminationDate").append("<span class='mandatory'>*</span>");
        $("#ddlTerminationType").val("0");
        $("#ddlTerminationType").attr("Disabled", true);
        $("#btnChangeStatus").text("Suspend Member");
        $("#err_TerminationDate").text("");
        $("#TerminationDate").val("");
        $("#EffectiveTerminationDate").val("");
        $("#EffectiveTerminationDate").removeClass('DatePick');
        $("#EffectiveTerminationDate").attr('readonly', true);
        $("#EffectiveTerminationDate").css("pointer-events", "none");
    }
    if (Status == 38) {
        $("#divTerminationType").hide();
        $("#divEffectiveTerminationDate").hide();
        $("#labelTerminationDate").text("Status Change Date");
        $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
        $("#PopuText").text("Reinstate Member");
        $("#btnChangeStatus").text("Change Status");
        $("#err_TerminationDate").text("");
        $("#TerminationDate").val("");
    }
    if (Status == 39) {
        $("#labelTerminationDate").text("Termination Date");
        $("#labelEffectiveTerminationDate").text("Effective Termination Date");
        $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
        $("#labelEffectiveTerminationDate").append("<span class='mandatory'>*</span>");
        $("#ddlTerminationType").val("0");
        $("#ddlTerminationType").attr("Disabled", false);
        $("#btnChangeStatus").text("Terminate Member");
        $("#err_TerminationDate").text("");

        $("#divTerminationType").show();
        $("#divEffectiveTerminationDate").show();
        $("#labelTerminationDate").text("Termination Date");
        $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
        $("#PopuText").text("Terminate Member");
       

        $("#TerminationDate").val("");
        $("#EffectiveTerminationDate").val("");
        $("#EffectiveTerminationDate").addClass('DatePick');
        $("#EffectiveTerminationDate").attr('readonly', false);
        $("#EffectiveTerminationDate").css("pointer-events", "auto");
    }
    if (Status == 0) {
        $("#labelTerminationDate").text("Termination Date");
        $("#labelEffectiveTerminationDate").text("Effective Termination Date");
        $("#labelTerminationDate").append("<span class='mandatory'>*</span>");
        $("#labelEffectiveTerminationDate").append("<span class='mandatory'>*</span>");
        $("#ddlTerminationType").val("0");
        $("#ddlTerminationType").attr("Disabled", false);
        $("#btnChangeStatus").text("Change Status");

        $("#TerminationDate").val("");
        $("#EffectiveTerminationDate").val("");
        $("#EffectiveTerminationDate").addClass('DatePick');
        $("#EffectiveTerminationDate").attr('readonly', false);
        $("#EffectiveTerminationDate").css("pointer-events", "auto");

    }
  
}

function TerminationTypeOnchange() {
    debugger;
    var TerminationTypeId = $("#ddlTerminationType").val();
    var MemberStatusId = $("#hdnMemberStatusId").val();


    if (TerminationTypeId != 145) {
        $("#EffectiveTerminationDate").removeClass('DatePick');
        $("#EffectiveTerminationDate").css("pointer-events", "none");
        $("#EffectiveTerminationDate").attr('readonly', true);
    }
    else {
        $("#EffectiveTerminationDate").addClass('DatePick');
        $("#EffectiveTerminationDate").css("pointer-events", "auto");
        $("#EffectiveTerminationDate").attr('readonly', false);
    }
    if (TerminationTypeId == "0") {
        $("#TerminationDate").val("");
        $("#EffectiveTerminationDate").val("");
        $("#EffectiveTerminationDate").css("pointer-events", "auto");
        $("#EffectiveTerminationDate").attr('readonly', false);
    }

    TerminationDateOnchange();

}
function TerminationDateOnchange() {
    debugger;
    var TerminationTypeId = $("#ddlTerminationType").val();
    var MemberStatusId = $("#hdnMemberStatusId").val();
    var ddlStatus = $("#ddlStatus").val();

    var TerminationDate = $("#TerminationDate").val();

    if (ddlStatus == 39) {
        if (TerminationTypeId == "0") {
            $("#TerminationDate").val("");
            $("#EffectiveTerminationDate").val("");
            $("#EffectiveTerminationDate").css("pointer-events", "auto");
            $("#EffectiveTerminationDate").attr('readonly', false);
        }
        else if (TerminationTypeId == 148 || TerminationTypeId == 147) {
         
            if (TerminationDate != "") {
                $("#EffectiveTerminationDate").val(TerminationDate);
            }
        }
    }

    if (ddlStatus == 37) {
      
        if (TerminationDate != "") {
            $("#EffectiveTerminationDate").val(TerminationDate);
        }
    }

   

}

function UpdateMemberStatus() {
    debugger;
    $(".error_msg").text("");
    var MemberStatusId = $("#hdnMemberStatusId").val();
    var MemberId = $("#hdnMemberId").val();
    var ddlStatus = $("#ddlStatus").val();
    var ddlTerminationType = $("#ddlTerminationType").val();
    var TerminationDate = $("#TerminationDate").val();
    var EffectiveTerminationDate = $("#EffectiveTerminationDate").val();
    var Reason = $("#Reason").val();
    var TextDate = "";
    TextDate = ddlStatus == 38 ? "Change" : ddlStatus == 37 ? "Suspended" : ddlStatus == 39 ? "Termination" : ""
    var flag = 0;
    if (ddlStatus == "0") {
        flag = 1;
        $("#err_ddlStatus").text("Select Status");
    }

    if (TerminationDate == "") {
        flag = 1;
        $("#err_TerminationDate").text("Select " + TextDate + " Date");
    }
    if (ddlStatus != 38) {
        if (EffectiveTerminationDate == "") {
            flag = 1;
            $("#err_EffectiveTerminationDate").text("Select Effective " + TextDate + " Date");
        }
        if (ddlStatus != 37) {
            if (ddlTerminationType == "0") {
                flag = 1;
                $("#err_ddlTerminationType").text("Select Termination Type");
            }
        }
    }
    debugger;
    if (ddlStatus == 38) {
        if (TerminationDate != "") {
            var TerminationDate_Split = TerminationDate.split("/");
            var Termination_Date = TerminationDate_Split[1] + "/" + TerminationDate_Split[0] + "/" + TerminationDate_Split[2];
            var NewTerminationDate = new Date(Termination_Date);
            var firstDay = new Date(NewTerminationDate.getFullYear(), NewTerminationDate.getMonth(), 1);
          
            const TodayDate = new Date(NewTerminationDate);
            let GetTodayDate = TodayDate.getDate();

            const FirstDate = new Date(firstDay);
            let GetFirstDate = FirstDate.getDate();

            var TodatDate = new Date();
            if (NewTerminationDate > TodatDate) {
                $("#err_TerminationDate").text("Change Date should be less than current date")
                flag = 1;
            }
            else if (GetTodayDate != GetFirstDate) {
                $("#err_TerminationDate").text("Change Date will be first day of the month")
                flag = 1;
            }
        }
    }
    debugger;
    if (ddlStatus == 39) {
        if (ddlTerminationType == 145) {
            if (TerminationDate != "") {
                var TerminationDate_Split = TerminationDate.split("/");
                var Termination_Date = TerminationDate_Split[1] + "/" + TerminationDate_Split[0] + "/" + TerminationDate_Split[2];
                var NewTerminationDate = new Date(Termination_Date);

                var firstDay = new Date(NewTerminationDate.getFullYear(), NewTerminationDate.getMonth(), 1);
                var lastDay = new Date(NewTerminationDate.getFullYear(), NewTerminationDate.getMonth() + 1, 0);

                const TodayDate = new Date(NewTerminationDate);
                let GetTodayDate = TodayDate.getDate();

                const lastDate = new Date(lastDay);
                let GetlastDate = lastDate.getDate();

                if (NewTerminationDate > TodatDate) {
                    $("#err_TerminationDate").text("Termination Date should be less than current date")
                    flag = 1;
                }
                else if (GetTodayDate != GetlastDate) {
                    $("#err_TerminationDate").text("Termination Date will be last day of the month")
                    flag = 1;
                }


             
            }

            if (EffectiveTerminationDate != "") {
                var TerminationDate_Split = TerminationDate.split("/");
                var Termination_Date = TerminationDate_Split[1] + "/" + TerminationDate_Split[0] + "/" + TerminationDate_Split[2];
                var NewTermination_Date = new Date(Termination_Date);

                var EffectiveTerminationDate_Split = EffectiveTerminationDate.split("/");
                var EffectiveTerminationDatet_Date = EffectiveTerminationDate_Split[1] + "/" + EffectiveTerminationDate_Split[0] + "/" + EffectiveTerminationDate_Split[2];
                var NewEffectiveTerminationDate = new Date(EffectiveTerminationDatet_Date);

               
                var lastDay = new Date(NewEffectiveTerminationDate.getFullYear(), NewEffectiveTerminationDate.getMonth() + 1, 0);

                const TodayDate = new Date(NewEffectiveTerminationDate);
                let GetTodayDate = TodayDate.getDate();

                const lastDate = new Date(lastDay);
                let GetlastDate = lastDate.getDate();

                if (NewEffectiveTerminationDate > NewTermination_Date) {
                    $("#err_EffectiveTerminationDate").text("Effective Termination Date should be less than current date")
                    flag = 1;
                }
                else if (GetTodayDate != GetlastDate) {
                    $("#err_EffectiveTerminationDate").text("Effective Termination Date will be last day of the month")
                    flag = 1;
                }



            }
        }
    }

    if (Reason == "") {
        flag = 1;
        $("#err_Reason").text("Enter Reason");
    }

    if (flag == 1) {
        return false
    }
    else {
        $.ajax({
            url: '/Member/AddStatusChangeLog',
            type: "POST",
            async: false,
            data: {
                pMemberId: MemberId,
                pMemberStatusId: MemberStatusId,
                pStatusId: ddlStatus,
                pTerminationTypeId: ddlTerminationType,
                pTerminationDate: TerminationDate,
                pEffectiveTerminationDate: EffectiveTerminationDate,
                pReason: Reason
            },
            dataType: "json",
            success: function (result) {

                if (result != 0) {
                    if (ddlStatus == 38) {
                        alert("Member Reinstate Succesfully");
                        hide('ChangeStatus');
                        location.href = "/Member/ListMember";
                    }
                    if (ddlStatus == 37) {
                        alert("Member Suspended Succesfully");
                        hide('ChangeStatus');
                        location.href = "/Member/ListMember";
                    }
                    if (ddlStatus == 39) {
                        alert("Member Terminated Succesfully");
                        hide('ChangeStatus');
                        location.href = "/Member/ListMember";
                    }
                }
                else {
                    alert("Somthing went wrong");
                }

            }
        });
    }
}
//#endregion






