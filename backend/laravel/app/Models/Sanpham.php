<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sanpham extends Model
{
    use HasFactory;
    protected $table = 'sanpham'; 
    protected $primaryKey = 'ma_san_pham'; 
    public $incrementing = false;  
    protected $keyType = 'string'; 
    public $timestamps = false; 
    protected $fillable = [
        'ten_san_pham',
        'hang_san_xuat',
        'nam_san_xuat',
        'loai_san_pham',
        'mo_ta_san_pham',
        'gia_san_pham'
    ];
}
