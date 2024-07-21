<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Medical Claims</title>

    <link href="{{ asset('assets/images/favicon.ico')}}" rel="shortcut icon">
    <link href="{{ asset('assets/lib/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('assets/lib/multi-select/multi-select.css')}}" rel="stylesheet">
    <link href="{{ asset('assets/lib/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <link href="{{ asset('assets/lib/datatable/jquerydataTables.css')}}" rel="stylesheet">
    <link href="{{ asset('assets/css/jquery-ui.css')}}" rel="stylesheet" />
    <link href="{{ asset('assets/css/LeftNav.css')}}" rel="stylesheet">
    <link href="{{ asset('assets/css/site.css')}}" rel="stylesheet" />
</head>
<body class="sidebar-mini fixed" onload = "getTime()">

    <header class="fixed-top">
        <!--<a class="sidebar-toggle Mobile" href="#" data-toggle="offcanvas"></a>-->
        <a class="sidebar-toggle Desktop" href="#" data-toggle="offcanvas"></a>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow TopNav">
            <div class="row">
                <div class="col-lg-2 col-md-2">
                    <div class="navbar-brand"><a href="#"><img src="{{ asset('assets/images/Logo.png')}}"></a></div>
                </div>

                <div class="col-lg-10 col-md-10 top_m">
                    <div class="navbar-collapse d-sm-inline-flex justify-content-between pull-right">
                        
                        <div class="taday_date_time" id="showTime"></div>
                        <nav class="main-nav d-lg-block">
                            <ul>
                                <li><a href="javascript:void(0)"><img src="{{ asset('assets/images/icon/notification.png')}}" width="30"><div class="noof_notification">0</div></a></li>
                                <li class="drop-down">
                                    <a href="javascript:void(0)"><img src="{{ asset('assets/images/blank_user.jpg')}}" class="UserPhoto"></a>
                                    <ul style="left:inherit; right:15px; top:40px;">
                                        <div class="dropdown_arrow"></div>
                                        <li>{{Session::get('username')}}</li>
                                        <li><a href="#"><i class="fa fa-key" style="color:#bbb;"></i> Change Password</a></li>
                                        <li><a href="/logout"><img src="{{ asset('assets/images/icon/logout.png')}}" width="14"> Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </nav>
    </header>

 
        <aside class="main-sidebar hidden-print">
            <div class="clearfix"></div>
          

            <section class="sidebar">
                    <ul class="sidebar-menu">                    
                            
                            
                            <li class="{{ (Request::is('dashboard') || Request::is('/') ? 'active' : '') }}">
                                <a href="/"><label class="dashboard">Dashboard</label></a>
                            </li>
                            
                            <li class="{{ (Request::is('claims/*') || Request::is('claims') || Request::is('claims/*') ? 'active' : '') }}">
                                <a href="/claims"><label class="claims">Claims</label></a>
                            </li>
                       
                            
                            <li class="{{ (Request::is('members/*') || Request::is('members') || Request::is('members/*') ? 'active' : '') }}">
                                <a href="/members"><label class="membership">Membership</label></a>
                            </li>
                        
                             <li class="{{ (Request::is('groups/*') || Request::is('groups') || Request::is('groups/*') ? 'active' : '') }}">
                                <a href="{{route('GetGroups')}}"><label class="group">Groups</label></a>
                            </li>
                        
                           
                            <li class="{{ (Request::is('plans/*') || Request::is('plans') || Request::is('plans/*') ? 'active' : '') }}">
                                <a href="/plans"><label class="plans">Plans</label></a>
                            </li>
                        
                               
                            <li class="{{ (Request::is('providers/*') || Request::is('providers') || Request::is('providers/*') ? 'active' : '') }}">
                                <a href="/providers"><label class="service">Service Providers</label></a>
                            </li>
                       
                            <li class="treeview">
                                    <a href="#"><label class="account">Accounts <i class="fa fa-angle-down"></i></label></a>
                                    <ul class="treeview-menu menu-open">
                                       
                                            <li class="active"><a href="#">Invoice</a></li>
                                            <li class="active"><a href="#">Receipt</a></li>
                                            <li class="active"><a href="#">Payout Claim</a></li>
                                        
                                    </ul>
                                </li>
                          
                            
                                <li class="">
                                    <a href="#"><label class="report">Reports <i class="fa fa-angle-down"></i></label></a>
                                    <ul class="treeview-menu">
                                        <li><a href="#">Claims Usage</a></li>
                                        <li><a href="#">Members Status</a></li>
                                        <li><a href="#">Monthly Income</a></li>
                                        <li><a href="#">Remittance</a></li>
                                        <li><a href="#">Statement</a></li>
                                    </ul>
                                </li>

                                
                                <li class="">
                                    <a href="#"><label class="userrole">Admin <i class="fa fa-angle-down"></i></label></a>
                                    <ul class="treeview-menu">
                                        <li><a href="{{route('GetUsers')}}">Users</a></li>
                                        <li><a href="#">Tariff Codes</a></li>
                                    </ul>
                                </li>
                            
                        </ul>

            </section>

        </aside>
    
    <div class="content-wrapper">
        <main role="main" class="main-contener">
            <div class="arrow"><a class="Mobile" href="#" data-toggle="offcanvas"><img src="{{ asset('assets/images/leftmenu-arrow.png')}}" id="getImage" onClick="imagefun()"></a></div>
            <!-- Start Content Here -->

            <div class="row">
                <div class="container">
                    
                    @yield('layout')

                </div>
            </div>

            <!-- End Content Here -->
        </main>


        <footer class="text-center pt-2">
            <div class="text-center">&copy; Copyright {{date('Y')}} - Medical Claims</div>
        </footer>
    </div>
    <div id="preload" style="display:none">
        <div class="loader1"></div>
        <div class="loaderImg"><img src="{{ asset('assets/images/loader.png')}}" /></div>
    </div>
    @if(!Session::get('username'))
    <table align="center">
        <tr>

        </tr>

        <tr>

            <td>
                <a href="/login"><span class=" btn btn-primary hidden-tablet align-center"> <i class="icon-lock"></i> LOGIN PLEASE </span></a>
            </td>
        </tr>
    </table>
@endif


    <script src="{{ asset('assets/js/jquery-3.6.0.js')}}"></script>
    <script src="{{ asset('assets/js/jquery-ui.js')}}"></script>
    <script src="{{ asset('assets/lib/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{ asset('assets/lib/datatable/jquerydataTables.js')}}"></script>
    <script src="{{ asset('assets/js/LeftNav.js')}}"></script>
    <script src="{{ asset('assets/lib/multi-select/multi-select.js')}}"></script>
    <script src="{{ asset('assets/js/common.js')}}"></script>
    <script src="{{ asset('assets/js/advanced-form-elements.js')}}"></script>
    <script src="{{ asset('assets/js/GenericValidation.js')}}"></script>
    <script src="{{ asset('assets/js/jQuery.print.js')}}"></script>
    <script>
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })


    </script>
     <script>
        function  getTime() {
           var today = new Date();
           var h = today.getHours();
           var m = today.getMinutes();
           var s = today.getSeconds();

           // Add a zero in front of number less than 10


            if(h < 10){
                h = "0" + h;

            }
            if(m < 10){
                m = "0" + m;
            }
            if(s < 10){
                s = "0" + s;
            }

            document.getElementById('showTime').innerHTML = h+ ":"+m+":"+s;
             t = setTimeout(function(){getTime()}, 500);


            if(navigator.onLine){

              //  alert(navigator.onLine);

                document.getElementById('connectedDot').style.display= 'block';
                document.getElementById('notConnectedDot').style.display= 'none';


            }
            else{

                document.getElementById('notConnectedDot').style.display= 'block';
                document.getElementById('connectedDot').style.display= 'none';


            }
        }



    </script>
</body>
</html>
