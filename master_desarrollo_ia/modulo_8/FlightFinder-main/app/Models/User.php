<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'document_number',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'document_number',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'document_number' => 'encrypted',
        ];
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}