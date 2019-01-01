<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{ asset('AdminLte/dist/img/user2-160x160.jpg') }}" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p>Alexander Pierce</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
            @if (isset($backend_menus) && !empty($backend_menus))
                @php
                    $currentRouteName = request()->route()->getName();
                @endphp
                @foreach($backend_menus as $menu)
                    @php
                        if(!empty($menu['hide'])) {
                            continue;
                        }
                    @endphp

                    @if (isset($menu['sub']) && !empty($menu['sub']))
                        <?php
                        $subHtml = '';
                        $active = false;
                        foreach ($menu['sub'] as $submenu) {
                            $class = '';
                            if ($currentRouteName == $submenu['route']) {
                                $class = 'active';
                                $active = true;
                            }

                            if (isset($submenu['sub']) && !empty($submenu['sub'])) {
                                foreach ($submenu['sub'] as $subsubmenu) {
                                    if ($currentRouteName == $subsubmenu['route']) {
                                        $class = 'active';
                                        $active = true;
                                    }
                                }
                            }

                            $subHtml .= '<li class="' . $class . '"><a href="' . route($submenu['route']) . '"> <i class="' . $submenu['icon']. '"></i>' . trans($submenu['text']) . '</a></li>';
                        }
                        ?>
                        <li class="{{ $active ? 'active ' : '' }}{{ $menu['class'] }} @if (!empty($subHtml)) treeview @endif">
                            <a href="{{ isset($menu['route']) ? route($menu['route']) : '#' }}">
                                <i class="{{ isset($menu['icon']) ? $menu['icon'] : '' }}"></i>
                                <span>{{ isset($menu['text']) ? trans($menu['text']) : '' }}</span>
                                @if(!empty($menu['sub']) && count($menu['sub']) >  0)
                                    <span class="pull-right-container">
                              <i class="fa fa-angle-left pull-right"></i>
                            </span>
                                @endif
                            </a>
                            @if (!empty($subHtml))
                                <ul class="treeview-menu">
                                    {!! $subHtml !!}
                                </ul>
                            @endif
                        </li>
                    @else
                        <li class="@if(request()->route()->getName() == $menu['route'])active @endif{{ isset($menu['class']) ? $menu['class'] : '' }}">
                            <a href="{{ isset($menu['route']) ? route($menu['route']) : '#' }}"><i
                                        class="{{ isset($menu['icon']) ? $menu['icon'] : '' }}"></i>
                                <span>{{ isset($menu['text']) ? trans($menu['text']) : '' }}</span></a>
                        </li>
                    @endif
                @endforeach
            @endif
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>