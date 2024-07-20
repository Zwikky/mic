@extends('admin.layouts.app')
@section('layout')
<script src="{{asset('assets/js/Group.js')}}"></script>
<div class="col-12 inner-container">
    <div class="title-bar">
        <span class="head-title">Groups</span>
    </div>
    <form method="post" action="/Group/ListGroup" id="lstGrpForm">
        <div class="content_section">

            <!-- Start Search Pannel -->
            <div class="SearchPannel mb-2">
                <div class="row">

                    <div class="col-lg-3 col-md-3" style="position:relative;">
                        <div class="form-label">Group Name</div>
                        <span class="claim_searchicon"><i class="fa fa-search"></i></span>
                        <input class = "form-control form-control-sm AutoSearchflip" id = "exampleDataList" style = "padding:0.35rem 0.5rem 0.35rem 30px;" onkeyup = "GroupAutoSearchList()" autocomplete = "off" />
                         <div class="AutoSearch_popup AutoSearch_List">
                            <div class="AutoSearch_TableScrl">
                                <ul id="datalistOptions"></ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-3">
                        <div class="form-label">Status</div>
                        <select class = "form-select form-select-sm" id = "Group_Status_Id" onchange = "this.form.submit();">
                            <option value="1">Active</option>
                            <option value="2">Pending</option>
                            <option value="1">Disabled</option>

                        </select>
                    </div>

                        <div class="col-lg-6 col-md-6">
                            <div>&nbsp;</div>
                            <div class="pull-right"><a class="btn btn-primary btn-sm" href="/groups/add-group">Add Group</a></div>
                        </div>
                    
                </div>
            </div>

            <!-- End Search Pannel -->
            <div class="table-responsive">
                <table id="DT_load" class="table">
                    <thead>
                        <tr>
                            <th><div class="form-check m-0"><input class="form-check-input" type="checkbox" id="1" style="margin:7px 0 0 -1.5em"><label class="form-check-label" for="1"></label></div></th>
                            <th>Group ID</th>
                            <th>Status</th>
                            <th>Group Name</th>
                            <th>City</th>
                            <th>Registration Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            @foreach($groups as $data)
                                        <td><div class="form-check"><input class="form-check-input" type="checkbox" id="2"><label class="form-check-label" for="2"></label></div></td>
                                        <td>{{$data->Group_Number}}</td>
                                        <td>
                                            @if ($data->Group_Status_Id == 13)
                                            
                                                <span class="Status_Green"></span> {{$data->Group_Status}}
                                            @endif
                                            @if ($data->Group_Status_Id == 11)
                                            
                                                <span class="Status_Blue"></span> {{$data->Group_Status}}
                                            @endif
                                            @if ($data->Group_Status_Id == 12)
                                            
                                                <span class="Status_Orenge"></span> {{$data->Group_Status}}
                                            @endif
                                            @if ($data->Group_Status_Id == 14)
                                            
                                                <span class="Status_Red"></span> {{$data->Group_Status}}
    
                                            @endif
                                        
                                        
                                        <td><a href="#">{{$data->Group_Name}}</a></td>
                                        <td>{{$data->Physical_City}}</td>
                                        <td>{{$data->Registration_Date}}</td>

                                        <td>
                                            <div class="dropdown action">
                                                <span class="dropdown-toggle action_dot_icon" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></span>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <div class="dropdown_arrow"></div>
                                                    <li><a class="dropdown-item" href="#"><i class="fa fa-pencil"></i> &nbsp; Edit</a></li>
                                                    <li><a class="dropdown-item" href="#"><i class="fa fa-dashboard"></i> &nbsp; Overview</a></li>
                                                    
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                               @endforeach
                    </tbody>
                </table>
            </div>

            <div class="clearfix"></div>

        </div>
    </form>
</div>


@endsection