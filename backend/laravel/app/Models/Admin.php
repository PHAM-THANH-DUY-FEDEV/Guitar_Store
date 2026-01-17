<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class Admin extends Authenticatable
{
    use HasFactory;  
    use HasApiTokens, Notifiable;

    protected $table = 'admin_account';
       protected $fillable = [
        'ma_admin',
        'dia_chi',
        'email_admin',
        'so_dien_thoai',
        'ten_dang_nhap',
        'mat_khau',
    ];
    protected $hidden = [
        'mat_khau',
    ];
    protected $primaryKey = 'ma_admin';
    public $incrementing = false; // vì mã KH không auto-increment
    protected $keyType = 'string';
    public $timestamps = false;
}
