<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // 👈 Thêm dòng này

class KhachHang extends Authenticatable
{
    use HasFactory;  
    use HasApiTokens, Notifiable;

    protected $table = 'KhachHang';
       protected $fillable = [
        'ma_khach_hang',
        'so_dien_thoai',
        'email_khach_hang',
        'ten_dang_nhap',
        'mat_khau',
        'dia_chi',
    ];
    protected $hidden = [
        'mat_khau',
    ];
    protected $primaryKey = 'ma_khach_hang';
    public $incrementing = false; // vì mã KH không auto-increment
    protected $keyType = 'string';
    public $timestamps = false;
}
