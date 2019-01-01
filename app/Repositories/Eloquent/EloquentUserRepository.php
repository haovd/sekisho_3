<?php
namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\UserRepository;

class EloquentUserRepository extends EloquentDBRepository implements UserRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
}