<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

use App\Models\Group;

class GroupController extends Controller
{
     
     public function getGroups(){
        if (Session::get('username')) {$groups = Group::all();
            return view('admin.group.list-groups', [
                'groups' => $groups
            ]);
        }else{
            return redirect('login');
        }
        
    }

    public function addGroupForm(){
        if (Session::get('username')) {
            return view('admin.group.add-group');
        }else{
            return redirect('login');
        }
    }
}
