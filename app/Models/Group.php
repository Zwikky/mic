<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $table = 'dbo.GRP_TBL_Group';
    public $timestamps = false;

    protected $fillable = [
        'Group_Name', 
        'Contact_Number_Work', 
        'Contact_Number_Cell', 
        'Email_Id', 
        'Registration_Date', 
        'Group_Valid_From', 
        'Group_Valid_To', 
        'Postal_Address', 
        'Postal_City', 
        'Postal_Country_Id', 
        'Postal_Code', 
        'Physical_Address', 
        'Physical_City', 
        'Physical_Country_Id', 
        'Physical_Postal_Code', 
        'Group_Status_Id', 
        'Created_By'
    ];
}
