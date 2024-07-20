<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\User;

class UserController extends Controller
{

    public function __construct(){
        $this->middleware('guest');
    }

    public function getUsers(){
        $users = User::all();
        // dd($users);

        if (Session::get('username')) {
            return view('admin.user.list-users', [
                'users' => $users
            ]);
        }else{
            return redirect('login');
        }
        
    }

    public function addUserForm(){
        $countries = DB::table('RD_TBL_Country')
                    ->where('Is_Active', '=', '1')
                    ->get();

        $plans = DB::table('PLN_TBL_Plan')
                   ->where('Is_Active', '=', '1')
                   ->get();

        $groups = DB::table('GRP_TBL_Group')
                   ->where('Is_Active', '=', '1')
                   ->get();
        $user_types = DB::table('RD_TBL_Reference_List as list')
                        ->join('RD_TBL_Reference_List_Group as group', 'list.Reference_List_Group_Id', '=', 'group.Reference_List_Group_Id')
                        ->select('list.Reference_List_Id', 'list.Reference_List_Name') 
                        ->where('list.Reference_List_Group_Id', '=', 20)
                        ->get();
        $service_providers = DB::table('SPDR_TBL_Service_Provider')
                            ->where('Is_Active', '=', 1)
                            ->get();

        if (Session::get('username')) {
            return view('admin.user.add-user', [
                'countries' => $countries,
                'plans' => $plans,
                'groups' => $groups,
                'user_types' => $user_types,
                'service_providers' => $service_providers
            ]);
        }else{
            return redirect('login');
        }
        
    }

    public function viewUser($id){
        $user = DB::table('UA_TBL_User as user')
                    ->join('RD_TBL_Reference_List as type', 'type.Reference_List_Id', '=', 'user.User_Type')
                    ->select('user.*', 'type.Reference_List_Name')
                    ->where('user.User_Id', '=', $id)
                    ->first();

        if (Session::get('username')) {
            return view('admin.user.view-user', [
                'user' => $user
            ]);
        }else{
            return redirect('login');
        }
        
    }

    public function addUserSave(Request $request){
        $users = User::all();
        $user = new User;

        $validatedData = $request->validate([
            'Email' => ['required', 'unique:UA_TBL_User', 'max:255'],
            'First_Name' => ['required'],
        ]);
        $user->User_Name = $request->get('Title').' '.$request->get('First_Name').' '.$request->get('Last_Name');
        $user->Email = $request->get('Email');
        $user->Contact_Id = 0;
        $user->Created_By = 11;
        $user->Password = hash('sha256', $request->get('Password'));
        $user->Created_Date= Carbon::now()->format('Y-m-d H:m:s');
		$user->User_Type = $request->get('User_Type');

        // dd($user);
        if($user->save()){
            return view('admin.user.list-users');
        }else{
            return redirect('add-user', [
                'users' => $users
            ])->withErrors('Please Change Your Password');
        }
       
    }



    /*=================================================================================================================
                     *                   START OF LOGIN MODULE
                     *                    Author: ......   22 JUNE 2024 22:21 PM
    =================================================================================================================*/
    public function index(){

        return view('auth.login');
    }


    public function doLogin(Request $request){

        $loginBag = User::where('email', '=', $request->get('EmailId'))

            ->get();

        foreach ($loginBag as $logger) {   // testing if the username matches the password in the database
            $pass= $logger->Password;
            $type= $logger->User_Type;
            // $status =  $logger ->Status; // testing if the user is deleted from the system to login or not

            if(hash('sha256', $request->get('Login_Password')) == $pass){

            // if (password_verify($request->get('password'), $pass) && $status == 1) {
                session_start();

                Session::put('username', $logger->User_Name);
                Session::put('rights', $type);
                Session::put('user',$logger->User_ID);

                $_SESSION['lastLogin'] = Carbon::now()->format('y-m-d h:i:s');
                //$logger->updated_at = Carbon::now();
                $logger->save();

                if (password_verify('123456', $pass))
                {
                    return redirect('dashboard')->withErrors('Please Change Your Password');
                }
                return redirect('dashboard');
             }
            // elseif ($status == 0)
            // {
            //     return back()->withErrors('You Are Not Allowed To User Our Systems!!!');
            // }
            else
            {
                return back()->withErrors('Username and Password do not match');
            }
        }
        return back()->withErrors('User Does Not Exist');
    }

    public function bringHomePage(){
            return view('dashboard');
    }

    public function logOut(){
        
        if(Session::get('username')){

            Session::forget('username');
            // unset( $_SESSION['rights_id']);
            // unset( $_SESSION['user_id']);
        }
        return redirect('login');
    }

}
