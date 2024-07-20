<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class DashboardController extends Controller
{
    public function index(){
        
    

        if (Session::get('username')) {
            return view('admin.dashboard');
            
        }else{
            return redirect('login');
        }
    }
}
