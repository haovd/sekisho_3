@extends('layouts.master')
@section('title', __('fe.user.user'))
@section('content')
<div class="content-wrapper">
        <section class="content-header">
            <h1>
                @lang('fe.user.user')
            </h1>
            <ol class="breadcrumb">
                <li><a href="{{ route('home') }}"><i class="fa fa-dashboard"></i> @lang('fe.home')</a></li>
                <li class="active">@lang('fe.user.user')</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box box-primary">
                        <div class="box-header">
                            <h3 class="box-title">@lang('fe.user.list')</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <table id="table" class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th class="no-sort">#</th>
                                    <th>@lang('fe.user.name')</th>
                                    <th>@lang('fe.user.username')</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                @php $k=1 @endphp
                                    @foreach($users as $user)
                                        <tr>
                                            <td>{{ $k++ }}</td>
                                            <td>{{ $user->name }}</td>
                                            <td>{{ $user->username }}</td>
                                            <td>
                                                <div class="text-center">
                                                    <a href="#" class="btn btn-success">@lang('fe.btn.edit')</a>
                                                    <a href="#" class="btn btn-danger">@lang('fe.btn.remove')</a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
        <!-- /.content -->
    </div>
@endsection
@include('script')
@section('scripts')
<script>
    table = $('#table').DataTable({
        ordering:  false
    });
</script>
@endsection