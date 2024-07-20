@extends('admin.layouts.app')
@section('layout')

<script src="assets/js/Member.js"></script>

<div class="col-12 inner-container">
    <div class="title-bar">
        <span class="head-title">Add User</span>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/users">Users</a></li>
                <li class="breadcrumb-item active">Add User</li>
            </ol>
        </nav>
    </div>
    <div class="content_section">

        <div class="tab_nav">
            <ul>

                <li><a href="#" class="active">User Details</a></li>

            </ul>
        </div>
        <div>
            @if($errors->any())                             
                                 
                @foreach ($errors->all() as $error)
                    <div class="alert alert-danger alert-dismissible" role="alert" style="right: 0">
                        <strong>{{$error}}</strong>
                            <button type="button" class="btn-close" 
                                data-bs-dismiss="alert"
                                aria-label="Close">
                        </button>
                    </div>
                @endforeach                             

            @elseif(Session::has('flash_message'))
                    <div class="login-error">
                        {{Session::get('flash_message')}}
                    </div>
            @endif 
        </div>

        <form method="post" action="/User/AddUser">
            @csrf
            <div class="FormMinHeight">
                <div class="pt-2">
                    <div class="row masked-input">
                        <div class="col-lg-10 col-md-10">
                            <div class="row">
                                <input type="hidden" name="pPKvalue" id="pPKvalue" value="0" />
                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Title<span class="mandatory">*</span></label>
										<select class = "form-select form-select-sm" name="Title">
											<option value="Mr">Mr.</option>
											<option value="Mrs">Mrs.</option>
											<option value="Miss">Miss.</option>
											<option value="Ms">Ms.</option>
											<option value="Dr">Dr.</option>
										<select>
                                    <div class="error_msg" id="err_Title_Id"></div>
                                </div>

                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">First Name<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" name="First_Name"/>
                                    <div class="error_msg" id="err_First_Name"></div>
                                </div>

                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Last Name<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" name = "Last_Name"/>
                                    <div class="error_msg" id="err_Last_Name"></div>
                                </div>

                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Password<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" type="password" name = "Password"/>
                                    <div class="error_msg" id="err_Password"></div>
                                </div>
                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Cellphone<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" name = "Cellphone"/>
                                    <div class="error_msg" id="err_Cellphone"></div>
                                </div>

                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Email<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" name = "Email"/>
                                    <div class="error_msg" id="err_Email"></div>
                                </div>

                                
                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Service Provider<span class="mandatory">*</span></label>
                                    <select class = "form-select form-select-sm" name = "Service_Provider">
                                        <option value="0">Swazi HMO</option>
                                        @foreach ($service_providers as $data)
                                            <option value="{{$data->Service_Provider_Id}}">{{$data->Sp_Name}}</option>
                                        @endforeach
										
									</select>
                                    <div class="error_msg" id="err_Service_Provider"></div>
                                </div>



                                

                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">User Type<span class="mandatory">*</span></label>
                                    <select class = "form-select form-select-sm" name = "User_Type">
                                        @foreach ($user_types as $data)
                                            <option value="{{$data->Reference_List_Id}}">{{$data->Reference_List_Name}}</option>
                                        @endforeach
									</select>
                                    <div class="error_msg" id="err_User_Type"></div>
                                </div>
                           

                               

                            </div>

                        </div>

                        <div class="col-lg-2 col-md-2 p-0">
                            <label class="FormLabel">&nbsp;</label>
                            <div class="ProfilePhoto_Section">
                               
                                <div class="ProfilePhoto">
                                    <img src="assets/images/blank_user.jpg" id="wizardPicturePreview">
                                    <div class="CameraIcon">
                                        <input class="form-control" type="file" name="myfile" accept="image/*" id="wizardpicture" onchange="Upload_User_Image(event)">
                                        <!--<i class="fa fa-camera"></i>-->
                                        <img src="assets/images/camera.png">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <div class="col-md-12 text-end">
                <input type="hidden" id="HDN_Emergency_Contacts" name="HDN_Emergency_Contacts" />
                <button type="submit" name="BTN" value="SAVE" class="btn btn-primary btn-sm">Save User</button>
            </div>


        </form>

    </div>
</div>
@endsection

