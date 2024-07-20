@extends('admin.layouts.app')
@section('layout')

<script src="assets/js/Member.js"></script>

<div class="col-12 inner-container">
    <div class="title-bar">
        <span class="head-title">View User</span>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/users">Users</a></li>
                <li class="breadcrumb-item active">View User</li>
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
                                    <label class="FormLabel">Full Name<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" disabled name="First_Name" value="{{$user->User_Name}}"/>
                                    <div class="error_msg" id="err_First_Name"></div>
                                </div>

                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Cellphone<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" disabled name = "Cellphone" value="{{$user->User_Id}}"/>
                                    <div class="error_msg" id="err_Cellphone"></div>
                                </div>

                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Email<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" disabled name = "Email" value="{{$user->Email}}"/>
                                    <div class="error_msg" id="err_Email"></div>
                                </div>

                                
                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">Service Provider<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" disabled name = "Cellphone" value="{{$user->Password}}"/>
                                    <div class="error_msg" id="err_Service_Provider"></div>
                                </div>
                                <div class="col-lg-3 col-md-3 mb-3">
                                    <label class="FormLabel">User Type<span class="mandatory">*</span></label>
                                    <input class = "form-control form-control-sm" disabled name = "User_Type" value="{{$user->Reference_List_Name}}"/>
                                    <div class="error_msg" id="err_User_Type"></div>
                                </div>
                           

                               

                            </div>

                        </div>

                        <div class="col-lg-2 col-md-2 p-0">
                            <label class="FormLabel">&nbsp;</label>
                            <div class="ProfilePhoto_Section">
                               
                                <div class="ProfilePhoto">
                                    <img src="assets/images/blank_user.jpg" id="wizardPicturePreview">
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



            </div>


        </form>

    </div>
</div>
@endsection

