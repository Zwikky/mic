<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/users', [UserController::class, 'getUsers'])->name('GetUsers');
Route::get('/groups', [GroupController::class, 'getGroups'])->name('GetGroups');
Route::get('/groups/add-group', [GroupController::class, 'addGroupForm'])->name('AddGroupForm');
Route::get('/users/user/{id}', [UserController::class, 'viewUser'])->name('ViewUser');
Route::get('/users/add-user', [UserController::class, 'addUserForm'])->name('AddUserForm');
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/login', [UserController::class, 'index'])->name('login');
Route::post('/login', [UserController::class, 'doLogin'])->name('doLogin');
Route::post('/users/addUser', [UserController::class, 'addUserSave'])->name('AddUserSave');
Route::get('/logout', [UserController::class, 'logout'])->name('LogoutUser');