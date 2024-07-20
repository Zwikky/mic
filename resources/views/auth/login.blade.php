<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Medical Claims</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <link href="assets/images/favicon.ico" rel="shortcut icon" />
    <link href="assets/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/login.css" rel="stylesheet" />
    <script src="assets/js/jquery-3.6.0.js"></script>
    <script src="assets/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <div>
            
            <div class="d-flex justify-content-center">
                <div class="col-lg-5">
                    <form action="login" method="POST">
                        @csrf
                    <div class="LoginSection">
                        <div>
                        <h1><img src="assets/images/logo_blue.png"></h1>
                        {{-- {{-- @if(isset($_POST['Insert'])) --}}

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
                        <div class="loginBg">
                            <div class="icon"><img src="assets/images/email_icon.png"></div>

                            
                            <input type="text" name="EmailId" id="EmailId" placeholder="Input your Email" maxlength="40" onchange="return ValidateEmail();" onkeypress="return ClearErrorMsgEmail();" />
                            <div class="error_msg" id="err_Message_Email"></div>
                        </div>

                        <div class="loginBg">
                            <div class="icon"><img src="assets/images/password_icon1.png"></div>
                            <input type="password" name="Login_Password" id="Login_Password" placeholder="Input your password" />
                            <div class="error_msg" id="err_Message_Password"></div>
                        </div>

                        <div class="Remember_Section">
                            <label class="Checkbox"> <span class="CheckboxCheckMark BlueBdr"></span>Remember me</label>
                            <div class="pull-right forgotpassword"><a href="#">Forgot Password? </a></div>
                        </div>

                        <div style="padding:0 15px; text-align:center;">
                            <button type="submit" class="SignIn_btn"><img src="assets/images/login_icon.png"> &nbsp; LOG IN</button>
                            
                        </div>
                    </div>

                    </form>
                </div>
                <!-- End shell -->
            </div>            
            
            
    </div>

    <script src="assets/js/jquery-3.6.0.js"></script>
    <script src="assets/js/UserAuthentication/ValidateEmail.js"></script>
    <script src="assets/js/UserAuthentication/HasingintoSHA_256.js"></script>
</body>
</html>








