@extends('admin.layouts.app')
@section('layout')

<script src="assets/js/Member.js"></script>
<script src="assets/js/jquery-3.6.0.js"></script>
<div class="col-12 inner-container">
    <div class="title-bar">
        <span class="head-title">Manage Users</span>
    </div>
    <form method="post" action="/Member/ListMember" id="MemberForm">
        <div class="content_section">

            <!-- Start Search Pannel -->
            <div class="SearchPannel mb-2">
                <div class="row">
                    <!--<div class="col-lg-12 col-md-12">
                        <div class="search_head">Search</div>
                    </div>-->

                    <div class="col-lg-3 col-md-3" style="position:relative;">
                        <div class="form-label">User ID</div>
                        <span class="claim_searchicon"><i class="fa fa-search"></i></span>
                        <input class = "form-control form-control-sm" id = "Membership_Number" style = "padding:0.35rem 0.5rem 0.35rem 30px;"/>
                    </div>

                    <div class="col-lg-3 col-md-3">
                        <div class="form-label">Status</div>
                        <select class = "form-select form-select-sm", id = "Member_Status_Id" onchange = "this.form.submit();">
                            <option value="1">Pending</option>
                            <option value="2">Declined</option>
                            <option value="3">Active</option>
                        </select>
                    </div>

                    <div class="col-lg-1 col-md-1">
                        <div>&nbsp;</div>
                        <div class="search_setting_icon"><img src="assets/images/icon/setting.png" class="ShowSearch"></div>
                    </div>
                    <div class="AdvSearchMask" id="AdvSearch">
                        <div class="Adv_search">
                            <div class="row">
                                <div class="col-lg-12 col-md-12"><div class="close_btn" onClick="hide('AdvSearch')" type="button" data-dismiss="alert"><img src="assets/images/close.png"></div></div>
                            </div>
                            <div class="Adv_search_scroll row masked-input">
                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">Group</label>
                                    <select class = "form-select form-select-sm" id = "Group_Id">
                                        <option value="1">Steel and Wire</option>
                                        <option value="2">Peak Timbers</option>
                                        <option value="1">Manzini City Council</option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">Member Name</label>
                                    <input class = "form-control form-control-sm" id = "First_Name"/>
                                </div>

                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">Date of Birth</label>
                                    <input class = "form-control form-control-sm DatePick date" id = "From_Date_of_Birth" placeholder = "DD/MM/YYYY" />
                                </div>

                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">Email ID</label>
                                    <input class = "form-control form-control-sm" id = "Email_Id" />
                                </div>

                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">Contact Number (Cell)</label>
                                    <input class = "form-control form-control-sm" id = "Contact_Number_Cell" />
                                </div>

                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">ID Number</label>
                                    <input class= "form-control form-control-sm" id = "ID_Number"/>
                                </div>

                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">From Date (Registration)</label>
                                    <input class = "form-control form-control-sm DatePick date" id = "From_Registration_Date" placeholder = "DD/MM/YYYY" />
                                </div>

                                <div class="col-lg-6 col-md-6 mb-3">
                                    <label class="FormLabel">To Date (Registration)</label>
                                    <input class = "form-control form-control-sm DatePick date" id = "To_Registration_Date" placeholder = "DD/MM/YYYY" />
                                    <div class="error_msg" id="err_To_Registration_Date"></div>
                                </div>

                                <div class="col-lg-12 col-md-12 text-end">
                                    <div class="FormLabel">&nbsp;</div>
                                    <button type="button" onclick="ResetSearchList()" class="btn btn-primary btn-sm prv-btn">Reset</button>
                                    <button type="submit" onclick="return SearchMember()" class="btn btn-primary btn-sm">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-5 col-md-5">
                            <div>&nbsp;</div>
                            <div class="pull-right"><a class="btn btn-primary btn-sm" href="/users/add-user">Add User</a></div>
                        </div>
                    
                </div>
            </div>

            <!-- End Search Pannel -->
            <div class="table-responsive">
                <table id="DT_load" class="table">
                    <thead>
                        <tr>
                            <th><div class="form-check m-0"><input class="form-check-input" type="checkbox" value="" id="1" style="margin:7px 0 0 -1.5em"><label class="form-check-label" for="1"></label></div></th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Contact ID</th>
                            <th>Match</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($users as $data)
                                 <tr>
                                    <td><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="2"><label class="form-check-label" for="2"></label></div></td>
                                    <td>{{$data->User_Name}}</td>
                                    <td>{{$data->Email}}</td>
                                    <td>{{$data->Password}}</td>
                                    <td>{{$data->Contact_Id}}</td>
                                    <td>
                                        @if (hash('sha256', 'Test@1234') == $data->Password)
                                            Match                
                                        @else
                                            Not Matched
                                        @endif
                                    </td>
                                    <td><span class="Status_Green"></span> Active</td>
                                    <td>

                                        <div class="dropdown action">
                                            <span class="dropdown-toggle action_dot_icon" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></span>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <div class="dropdown_arrow"></div>
                                               <li><a class="dropdown-item" href="#"><i class="fa fa-pencil"></i>  &nbsp; Edit</a></li>
                                                
                                                    <li><a class="dropdown-item" href="/users/user/{{$data->User_Id}}"><i class="fa fa-dashboard"></i>  &nbsp; Overview</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa fa-trash"></i>  &nbsp; Delete</a></li>

                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            
                        @endforeach

                           
                    </tbody>
                </table>
            </div>

            <!-- Start Change Status Popup -->
            <div class="BigPopUpMask" id="ChangeStatus">
                <div class="ViewDataManage" style="width:40%;">
                    <input type="hidden" id="hdnMemberStatusId" value="0" />
                    <input type="hidden" id="hdnMemberId"  value="0"/>
                    <div class="ViewDataManageHeader">
                        <div class="col-md-12">
                            <div class="PopupHead" id="PopuText">Terminate / Suspend Member</div>
                            <span class="CloseIcon"><div class="close_btn" onClick="hide('ChangeStatus')" type="button" data-dismiss="alert"><img src="assets/images/close.png"></div></span>
                        </div>
                    </div>


                    <div class="row mb-4">
                        <div class="col-lg-5 col-md-5">Member Name:<span id="MemberName"></span></div>
                        <div class="col-lg-3 col-md-3">Code:<span id="Code"></span></div>
                        <div class="col-lg-4 col-md-4">Current Status:<span id="Status"></span></div>
                    </div>

                    <div class="row masked-input">
                        <div class="col-lg-4 col-md-4 mb-3">
                            <label class="FormLabel">Status<span class="mandatory">*</span></label>
                            <select class="form-select form-select-sm" id="ddlStatus" onchange="StatusOnchange()">
                            </select>
                            <div class="error_msg" id="err_ddlStatus"></div>
                        </div>

                        <div class="col-lg-4 col-md-4 mb-3" id="divTerminationType">
                            <label class="FormLabel">Termination Type<span class="mandatory">*</span></label>
                            <select class="form-select form-select-sm" id="ddlTerminationType" onchange="TerminationTypeOnchange()">
                            </select>
                            <div class="error_msg" id="err_ddlTerminationType"></div>
                        </div>

                        <div class="col-lg-4 col-md-4 mb-3">
                            <label class="FormLabel" id="labelTerminationDate">Termination Date<span class="mandatory">*</span></label>
                            <input class="form-control form-control-sm DatePick date" id="TerminationDate" type="text" placeholder="DD/MM/YYYY" onchange="TerminationDateOnchange()">
                            <div class="error_msg" id="err_TerminationDate"></div>
                        </div>

                        <div class="col-lg-4 col-md-4 mb-3" id="divEffectiveTerminationDate">
                            <label class="FormLabel" id="labelEffectiveTerminationDate">Effective Termination Date<span class="mandatory">*</span></label>
                            <input class="form-control form-control-sm DatePick date" id="EffectiveTerminationDate" type="text" placeholder="DD/MM/YYYY">
                            <div class="error_msg" id="err_EffectiveTerminationDate"></div>
                        </div>

                        <div class="col-lg-12 col-md-12 mb-3">
                            <label class="FormLabel">Reason<span class="mandatory">*</span></label>
                            <textarea name="" cols="" rows="4" id="Reason" class="form-control form-control-sm"></textarea>
                            <div class="error_msg" id="err_Reason"></div>
                        </div>

                        <div class="col-md-12 text-end">
                            <a onClick="hide('ChangeStatus')" class="btn btn-primary btn-sm prv-btn">Cancel</a>
                            <button type="button" onclick="return UpdateMemberStatus()" class="btn btn-primary btn-sm" id="btnChangeStatus">Change Status</button>
                        </div>

                    </div>


                </div>
            </div>
            <!-- End  Change Status Popup -->
            <div class="clearfix"></div>

        </div>
    </form>
</div>
<script>
    function SearchList() {
        $('#Membership_Number').keypress(function (e) {
            //debugger
            var key = e.which;
            if (key == 13)  // the enter key code
            {
                document.getElementById("Member_Status_Id").submit();
                return false;
            }
        });
    }

    function ResetSearchList() {
        $("#Group_Id").val("0");
        $("#First_Name").val("");
        $("#From_Date_of_Birth").val("");
        $("#Email_Id").val("");
        $("#Contact_Number_Cell").val("");
        $("#ID_Number").val("");
        $("#From_Registration_Date").val("");
        $("#To_Registration_Date").val("");
    }

    function ValidateToDate() {
        //  debugger
        var From_Registration_Date = $("#From_Registration_Date").val();
        var To_Registration_Date = $("#To_Registration_Date").val();

        var flag = 0;

        var FromRegistrationArray = From_Registration_Date.split("/");
        var From_Registration = FromRegistrationArray[1] + "/" + FromRegistrationArray[0] + "/" + FromRegistrationArray[2];
        var From = new Date(From_Registration);

        var ToRegistrationArray = To_Registration_Date.split("/");
        var To_Registration = ToRegistrationArray[1] + "/" + ToRegistrationArray[0] + "/" + ToRegistrationArray[2];
        var To = new Date(To_Registration);

        if (From > To) {
            $("#err_To_Registration_Date").text("To date should grater than from date")
            flag = 1;
        }

        return flag;
    }

    function SearchMember() {
        // debugger;
        $(".error_msg").text("");
        var flag = 0;
        var From_Registration_Date = $("#From_Registration_Date").val();
        var To_Registration_Date = $("#To_Registration_Date").val();

        if (From_Registration_Date != "" && To_Registration_Date != "") {
            if (ValidateToDate() == 1) {
                flag = 1;
            }
        }

        if (flag == 1) {
            return false;
        }
        return true;
    }

</script>

<script>
    function GetInvoiceHdr_Details(pMemberId) {

        debugger;
        $.ajax({
            url: '/Member/GetInvoiceHdr_Details/',
            data: { pMember_Id: pMemberId },
            dataType: "json",
            async: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                debugger;
                var item = data.length;
                if (item > 0) {
                    var Invoice_Hdr_Id = data[0].Invoice_Hdr_Id;
                    var Member_Id = data[0].Invoice_For_Id;
                    location.href = "/Member/OverviewMember?pMember_Id=" + Member_Id + "&pInvoice_Hdr_Id=" + Invoice_Hdr_Id;
                }
                else {
                    var Member_Id = pMemberId;
                    location.href = "/Member/OverviewMember?pMember_Id=" + Member_Id + "&pInvoice_Hdr_Id=" + 0;

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
</script>



@endsection

