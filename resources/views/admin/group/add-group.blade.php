@extends('admin.layouts.app')
@section('layout')
<script src="{{asset('assets/js/Group.js')}}"></script>
<script src="{{asset('assets/js/jquery-3.6.0.js')}}"></script>
<form action="AddGroup" method="POST">

    <div class="col-12 inner-container">
        <div class="title-bar">
            <span class="head-title">Add Group</span>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/groups">Group</a></li>
                    <li class="breadcrumb-item active">Add Group</li>
                </ol>
            </nav>
        </div>
        <div class="content_section">

            <div class="tab_nav">
                <ul>
                        <li><a href="#" class="active">Group Details</a></li>
                    
                </ul>
            </div>

            <div class="FormMinHeight pt-2">

                <div class="row masked-input">
                    <div class="col-lg-3 col-md-3 mb-3">
                        <label class="FormLabel">Group Name<span class="mandatory">*</span></label>
                        <input class = "form-control form-control-sm Nohtml" id = "Group_Name" name="Group_Name" onchange = "ClearErrorMessage('Group_Name');" maxlength = "256" />

                        <div class="error_msg" id="err_Group_Name"></div>
                    </div>

                    <div class="col-lg-3 col-md-3 mb-3">
                        <label class="FormLabel">Contact Number (Work)<span class="mandatory">*</span></label>
                        <input class = "form-control form-control-sm Nohtml" id = "Contact_Number_Work" name="Contact_Number_Work" maxlength = "16" onchange = "ClearErrorMessage('Contact_Number_Work');" />

                        <div class="error_msg" id="err_Contact_Number_Work"></div>
                    </div>

                    <div class="col-lg-3 col-md-3 mb-3">
                        <label class="FormLabel">Contact Number (Cell)</label>
                        <input class = "form-control form-control-sm" id = "Contact_Number_Cell" name="Contact_Number_Cell" maxlength = "16" onchange = "ClearErrorMessage('Contact_Number_Cell');" />
                        <div class="error_msg" id="err_Contact_Number_Cell"></div>
                    </div>

                    <div class="col-lg-3 col-md-3 mb-3">
                        <label class="FormLabel">Email ID<span class="mandatory">*</span></label>
                        <input class = "form-control form-control-sm Nohtml" id = "Email_Id" name="Email_Id" onchange = "ClearErrorMessage('Email_Id');" maxlength = "256" />
                        <div class="error_msg" id="err_Email_Id"></div>
                    </div>

                    <div class="col-lg-3 col-md-3 mb-3">
                        <label class="FormLabel">Registration Date<span class="mandatory">*</span></label>
                        <input class = "form-control form-control-sm DatePick date" name="Registration_Date" id = "Registration_Date", placeholder = "DD/MM/YYYY" onchange = "ClearErrorMessage('Registration_Date');" />
                        <div class="error_msg" id="err_Registration_Date"></div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-lg-6 col-md-6 mt-2">
                        <div class="mb-4 border-bottom">
                            <div class="box_header">Postal Address</div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">Address<span class="mandatory">*</span></label>
                                <input class = "form-control form-control-sm Nohtml" name="Postal_Address" id = "Postal_Address" onchange = "ClearErrorMessage('Postal_Address');" />
                                
                                <div class="error_msg" id="err_Postal_Address"></div>
                            </div>

                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">City<span class="mandatory">*</span></label>
                                <input class = "form-control form-control-sm Nohtml" name="Postal_City" id = "Postal_City" onchange = "ClearErrorMessage('Postal_City');" maxlength = "256" />
                                
                                <div class="error_msg" id="err_Postal_City"></div>
                            </div>

                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">Country<span class="mandatory">*</span></label>
                                <select class = "form-select form-select-sm" id = "Postal_Country_Id" name="Postal_Country_Id">
                                    <option value="1">Swaziland</option>
                                    <option value="1">South Africa</option>
                                    <option value="1">Botswana</option>
                                    <option value="1">Lesotho</option>
                                </select>
                                <div class="error_msg" id="err_Postal_Country_Id"></div>
                            </div>


                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">Postal  Code<span class="mandatory">*</span></label>
                                <input class = "form-control form-control-sm Nohtml" name="Postal_Code" id = "Postal_Code" maxlength = "16" />
                                <div class="error_msg" id="err_Postal_Code"></div>
                            </div>

                        </div>

                    </div>

                    <div class="col-lg-6 col-md-6 mt-2">
                        <div class="mb-4 border-bottom">
                            <div class="box_header">Physical Address</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">Address</label>
                                <input class = "form-control form-control-sm Nohtml" name="Physical_Address" id = "Physical_Address" onchange = "ClearErrorMessage('Physical_Address');" />
                                <div class="error_msg" id="err_Physical_Address"></div>
                            </div>

                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">City</label>
                                <input class = "form-control form-control-sm Nohtml" name="Physical_City" id = "Physical_City" onchange = "ClearErrorMessage('Physical_City');" maxlength = "256" />
                                <div class="error_msg" id="err_Physical_City"></div>
                            </div>

                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">Country</label>
                                <select class = "form-select form-select-sm" name="Physical_Country_Id" id = "Physical_Country_Id" onchange = "ClearErrorMessage('Physical_Country_Id');">
                                    <option value="1">Swaziland</option>
                                    <option value="1">South Africa</option>
                                    <option value="1">Botswana</option>
                                </select>
                                <div class="error_msg" id="err_Physical_Country_Id"></div>
                            </div>

                            <div class="col-lg-6 col-md-6 mb-3">
                                <label class="FormLabel">Postal Code</label>
                                <input class = "form-control form-control-sm Nohtml" name="Physical_Postal_Code" id = "Physical_Postal_Code" onchange = "ClearErrorMessage('Physical_Postal_Code');" maxlength = "16" />
                                <div class="error_msg" id="err_Physical_Postal_Code"></div>
                            </div>
                        </div>
                    </div>

                </div>

                <input type="hidden" name="ContactGroup" id="ContactGroup" />
                <div class="mb-4 mt-2 border-bottom">
                    <div class="box_header">Contact Person</div>
                </div>
                <div class="row">
                    <div class="col-lg-2 col-md-2 mb-3">
                        <label class="FormLabel">First Name<span class="mandatory">*</span></label>
                        <input class="form-control form-control-sm Nohtml" type="text" id="First_Name" onchange="ClearErrorMessage('First_Name');" maxlength="256" />
                        <div class="error_msg" id="err_First_Name"></div>
                    </div>

                    <div class="col-lg-2 col-md-2 mb-3">
                        <label class="FormLabel">Last Name<span class="mandatory">*</span></label>
                        <input class="form-control form-control-sm Nohtml" type="text" id="Last_Name" onchange="ClearErrorMessage('Last_Name');" maxlength="256" />
                        <div class="error_msg" id="err_Last_Name"></div>
                    </div>


                    <div class="col-lg-2 col-md-2 mb-3">
                        <label class="FormLabel">Contact Number (Work)</label>
                        <input class="form-control form-control-sm Nohtml" type="text" id="Work_Contact_Number" maxlength="16" />
                        <div class="error_msg"></div>
                    </div>

                    <div class="col-lg-2 col-md-2 mb-3">
                        <label class="FormLabel">Contact Number (Cell)<span class="mandatory">*</span></label>
                        <input class="form-control form-control-sm Nohtml" type="text" id="Cell_Contact_Number" maxlength="16" onchange="ClearErrorMessage('Cell_Contact_Number');" />
                        <div class="error_msg" id="err_Cell_Contact_Number"></div>
                    </div>

                    <div class="col-lg-2 col-md-2 mb-3">
                        <label class="FormLabel">Designation</label>
                        <input class="form-control form-control-sm Nohtml" type="text" id="Designation" maxlength="256" />
                        <div class="error_msg"></div>
                    </div>

                    <div class="col-lg-2 col-md-2 mb-3">
                        <div class="FormLabel">&nbsp;</div>
                        <button type="button" class="btn btn-primary btn-sm" id="Grp_Contact_BTN" onclick="Group_Contact_AddRow();">Add</button>
                    </div>
                </div>

                <input type="hidden" id="Group_Contact_Count" value="0" />
                <div class="table-responsive">
                    <table class="table" id="tbl_add">
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Contact Number (Work)</th>
                                <th>Contact Number (Cell)</th>
                                <th>Designation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="tbody_Emergency_Contacts">
                        </tbody>
                    </table>

                    <?php 
                    if (!empty($_COOKIE['groupContact'])) {
                        $arrLow = json_decode($_COOKIE['groupContact'], true);
                        print_r($arrLow);
                    }
                   
                    ?>
                </div>
            </div>
            <div class="col-md-12 text-end">
                <button type="submit" name="Command" value="GrpDetailsSave" class="btn btn-sm save-btn" onclick="return ValidateGroup()" id="SAVEBTN"><img src="{{asset('assets/images/save_btn.png')}}"></button>
                <button type="submit" name="Command" value="GrpDetailsNext" class="btn btn-primary btn-sm" onclick="return ValidateGroup()" id="NXTBTN">Next</button>
            </div>
        </div>
    </div>
</form>

<script>
    $(".Nohtml").focusout(function (e) {
        var $this = $(this);
        var reg = /<(.|\n)*?>/g;
        if (reg.test($this.val()) == true) {
            alert('HTML Tag are not allowed');
            $this.val('');
        }
        e.preventDefault();
    });
</script>
@endsection