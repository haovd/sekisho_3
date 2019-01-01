<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use function GuzzleHttp\Promise\all;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('guest')->except('logout');
    }
    public function login(Request $request)
    {
        $this->validateLogin($request);

        if ($this->attemptLogin($request)) {
            return redirect($this->redirectTo);
        }

        return redirect()->back()->withInput()->with('login_error', __('auth.login_fail'));
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }

    public function username()
    {
        return 'username';
    }
}
