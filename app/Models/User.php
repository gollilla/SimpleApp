<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'status' => UserStatus::class,
        ];
    }

    /**
     * ユーザーのロールを取得
     */
    public function getRole(): UserRole
    {
        return $this->role ?? UserRole::USER;
    }

    /**
     * 指定されたロール以上の権限を持っているかチェック
     */
    public function hasRole(UserRole $role): bool
    {
        return $this->getRole()->hasPermissionLevel($role);
    }

    /**
     * 管理者権限を持っているかチェック
     */
    public function isAdmin(): bool
    {
        return $this->getRole()->isAdmin();
    }

    /**
     * モデレーター以上の権限を持っているかチェック
     */
    public function isModerator(): bool
    {
        return $this->getRole()->isModerator();
    }

    /**
     * 一般ユーザー以上の権限を持っているかチェック
     */
    public function isUser(): bool
    {
        return $this->getRole()->isUser();
    }

    /**
     * ユーザーのステータスを取得
     */
    public function getStatus(): UserStatus
    {
        return $this->status ?? UserStatus::ACTIVE;
    }

    /**
     * ユーザーがアクティブかチェック
     */
    public function isActive(): bool
    {
        return $this->getStatus() === UserStatus::ACTIVE;
    }

    /**
     * ユーザーが停止中かチェック
     */
    public function isSuspended(): bool
    {
        return $this->getStatus() === UserStatus::SUSPENDED;
    }

    /**
     * ユーザーが承認待ちかチェック
     */
    public function isPending(): bool
    {
        return $this->getStatus() === UserStatus::PENDING;
    }
}
