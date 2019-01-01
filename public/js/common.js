var cus = $('[name="cus_fee"]').prop('checked');
var own = $('[name="own_fee"]').prop('checked');
if(cus) {
    $('.cus').find('.form-group > label').not(':first').append(' <span class="required">*</span>');
}
if(own) {
    $('.own').find('.form-group > label').not(':first').append(' <span class="required">*</span>');
}
$('input, select').change(function () {
    if ($(this).hasClass('error')) {
        $(this).removeClass('error');
    }
    $(this).closest('.form-group').find('label.error').remove();
    $(this).closest('.form-group').find('.error').removeClass('error');
});

$('#create-contract select[name="type"]').change(function () {
    let val = $(this).val();
    if(val==1) {
        $('#create-contract .old').remove();
        $('input[name="contract_reference"]').val('').prop('disabled', true);
        $('label.reference').find('span.required').remove();
    } else {
        $('#create-contract .cus').append(formInput('cus_contract_old'));
        $('#create-contract .own').append(formInput('own_contract_old'));
        $('input[name="contract_reference"]').val('').prop('disabled', false);
        $('label.reference').append('<span class="required">*</span>');
    }
});

//confirm before back when add new
$(document).on('click', '.btn.back', function (e) {
    if(!confirm('キャンセルしますか。?')) return false;
});
//confirm before delete
$(document).on('click', '.btn.delete_confirm', function (e) {
    if(!confirm('削除しますか？')) return false;
});

//create/edit contract
$('input[name="cus_fee"], input[name="own_fee"]').change(function () {
    _this = $(this);
    col = _this.closest('.col-1');
    if (_this.prop('checked')) {
        col.find('.form-group > label').not(':first').append(' <span class="required">*</span>');
    } else {
        col.find('span.required').remove();
    }
});

$('input[type!="password"]').attr("autocomplete","off");

$(document).on('keyup', '.price', function () {
    var val = $(this).val().replace(/\D/g, '');
    $(this).prev('[type="hidden"]').val(val);
    val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $(this).val(val);
});

function language() {
    return {
        "lengthMenu": " １ページで _MENU_ 個の結果を表示します。",
        "zeroRecords": "一致する結果がありません。",
        "infoEmpty": "",
        "infoFiltered": "(lọc từ tổng số _MAX_ bản ghi)",
        "info": "_TOTAL_個の結果を_START_から_END_まで表示します。",
        "paginate": {
            "first":      "最初へ",
            "last":       "最後へ",
            "next":       "次へ",
            "previous":   "前へ"
        },
        "sProcessing": '<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading'
    };
}
function drawCallback(settings) {
    if (settings._iDisplayLength >= settings.fnRecordsDisplay() || settings._iRecordsTotal===0) {
        $(settings.nTableWrapper).find('.pagination').hide();
    } else {
        $(settings.nTableWrapper).find('.pagination').show();
    }
}

$(".selectpicker").selectpicker({
    noneSelectedText : ''
});
//select2
$.fn.customSelect2 = function (url, params) {
    params = params ? params : {};
    var customer = params.customer;
    var typeCustomer = params.typeCustomer;
    var property = params.property;
    var property_type = params.property_type;
    var in_claim = params.in_claim? true : null;
    $(this).select2({
        placeholder: '全て',
        minimumInputLength: 0,
        allowClear: true,
        ajax: {
            url: url,
            type: 'get',
            dataType: 'json',
            delay: 300,
            data: function (params) {
                return {
                    txt: params.term,
                    typeCustomer: typeCustomer? typeCustomer.val() : '',
                    customer_id: customer? customer.val() : '',
                    property_type: property_type? property_type.val() : '',
                    in_claim: in_claim,
                    page: params.page || 1
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                return {
                    results: $.map(data.data, function (item) {
                        if (property) {
                            return {
                                text: item.name,
                                id: item.id,
                                type: item.type,
                                owner_id: item.owner_id,
                                owner_name: item.customer_name
                            };
                        }else if (in_claim) {
                            return {
                                customer_id: item.customer_id,
                                customer_name: item.customer_name,
                                id: item.renter_no,
                                renter_id: item.id,
                                in_claim: true,
                                text: item.name,
                                property_id: item.property_id,
                                property_name: item.property_name,
                                room: item.room,
                                contract_id: item.contract_id
                            };
                        }else if(item.payment_type) {
                            return {
                                text: item.name,
                                id: item.id,
                                payment_type: item.payment_type==1? 'VND' : 'USD'
                            };
                        } else {
                            return {
                                text: item.name,
                                id: item.id,
                            };
                        }
                    }),
                    pagination: {
                        more: (params.page * data.length) < data.total
                    }
                };
            }
        },
        templateSelection: template,
        cache: true
    });
}
function template(data) {
    if(data)
        if (data.customer_id && !data.in_claim) {
            return data.customer_id;
        }
    return data.text;
}
//datepicker - require moment js
$('.pickerDate').datepicker({
    autoclose: true,
    format: 'yyyy/mm/dd'
})
//datepicker click to icon calendar
$(document).ready(function() {
    $('.fa-calendar').click(function() {
        $(this).closest('.input-group').find('input').focus();
    });
});
//create contract
$('[name="contract_reference"]').blur(function () {
    var _this = $(this);
    var val = $(this).val();
    $.ajax({
        url: '/jp/api/contract/getDetail',
        type: 'get',
        data: {
            contract_no: val
        },
        success: function(res) {
            if( res.error ) {
                _this.addClass('error');
                _this.closest('div').find('label.error').remove();
                _this.after('<label class="error">'+ res.msg+'</label>');
            } else {
                _this.removeClass('error');
                $.each(res.data, function(key, value) {
                    $('[name="'+key+'"]').val(value)
                    $('[name="'+key+'"][type="checkbox"]', '[name="'+key+'"][type="radio"]').prop('checked', value);
                    $('[name="'+key+'"]').next('.price').val(value==null? '' : formatMoney(value, 0));
                    $('select[name="'+key+'"]').val(value).trigger('change');
                });
                $('.owner_name').val(res.data.owner_name);
                $('#select-customer').html('<option value="'+res.data.customer_id+'">'+res.data.customer_name+'</option>');
                $('#select-user').html('<option value="'+res.data.user_id+'">'+res.data.user_name+'</option>');
                $('#select-renter').html('<option value="'+res.data.renter_id+'">'+res.data.renter_name+'</option>');
                $('#select-property').html('<option value="'+res.data.property_id+'">'+res.data.property_name+'</option>');
                if(res.data.cus_fee) {
                    $('.cus').find('.required, .error').remove();
                    $('.cus').find('.form-group > label').not(':first').append(' <span class="required">*</span>');
                } else {
                    $('.cus').find('.required, .error').remove();
                }
                if(res.data.own_fee) {
                    $('.own').find('.required, .error').remove();
                    $('.own').find('.form-group > label').not(':first').append(' <span class="required">*</span>');
                }else {
                    $('.own').find('.required, .error').remove();
                }
            }
        }
    });
})
//
function formInput(name) {
    return '<div class="form-group old">\n' +
        '<label class="col-sm-4 control-label">元媒介契約番号</label>\n' +
        '<div class="col-sm-8">\n' +
        '<input type="text" name="'+name+'" disabled class="form-control">\n' +
        '</div>\n' +
        '</div>';
}
//filter list
$('button#filter').click(function (e) {
    e.preventDefault();
    table.draw();
    var form1 = $(this).closest('form#filter-contract');
    if( form1.length ) {
        var input1 = form1.find("[name]");
        var store1 = {};
        input1.each(function() {
            var key1 = $(this).prop('name');
            var val1 = $(this).val();
            store1[key1] = val1;
        });
        localStorage.setItem('contract__store', JSON.stringify(store1));
    }
    var form2 = $(this).closest('form#filter-bills');
    if( form2.length ) {
        var input2 = form2.find("[name]");
        var store2 = {};
        input2.each(function() {
            var key2 = $(this).prop('name');
            if(key2=='finish') {
                val2 = $(this).prop('checked')? 1 : 0;
            } else {
                val2 = $(this).val();
            }
            store2[key2] = val2;
        });
        localStorage.setItem('bill__store', JSON.stringify(store2));
    }
    var formClaim = $(this).closest('form#filter_claims');
    if( formClaim.length ) {
        var inputClaim = formClaim.find("[name]");
        var storeClaim = {};
        inputClaim.each(function() {
            var key3 = $(this).prop('name');
            var val3 = $(this).val();
            storeClaim[key3] = val3;
        });
        localStorage.setItem('claim__store', JSON.stringify(storeClaim));
    }

});
$('button#reset').click(function (e) {
    e.preventDefault();
    var form = $(this).closest('form');
    var user_name = form.find('[name="_usr_name"]').data('username');
    var user_id = form.find('[name="_usr_id"]').data('userid');
    var date_default = form.find('#date-default').data('value');
    form.find('input').val('');
    form.find('input[type="checkbox"]').prop('checked', false);
    form.find('select').val('').trigger('change');
    if (user_name && user_id) {
        form.find('[name="user_name"]').val(user_name);
        $('#select-user, .select-user').html('<option value="'+user_id+'">'+user_name+'</option>');
    }
    if (date_default) {
        form.find('[name="update_from"]').val(date_default);
    }
    form.find('select[name="payment_date"].default').val(1).trigger('change');
    form.find('select[name="status"].default').val(1).trigger('change');
    table.draw();
    localStorage.removeItem('contract__store');
    localStorage.removeItem('bill__store');
    localStorage.removeItem('claim__store');
});

$('[name=cus_fee], [name="own_fee"]').change(function () {
    $('.checkmark').removeClass('error');
})
//in create + edit customer
$('.bill_addr').click(function () {
    var addr = $(this).closest('form').find('[name="address"]').val();
    $('[name="addr_bill_from"]').val(addr);

})
$('.bill_name').click(function () {
    var name = $(this).closest('form').find('[name="customer_name"]').val();
    $('[name="name_bill_from"]').val(name);

})

function fillFilterContract() {
    var storage = localStorage.getItem('contract__store');
    if ( !storage ) return;
    var params = JSON.parse(storage);
    var form = $('form#filter-contract');
    form.find('[name="contract_id"]').val(params.contract_id);
    if (params.update_from) {
        form.find('[name="update_from"]').val(params.update_from);
    }
    if (params.update_to) {
        form.find('[name="update_to"]').val(params.update_to);
    }
    form.find('[name="contract_of"]').val(params.contract_of).trigger('change');
    form.find('[name="payment_date"]').val(params.payment_date).trigger('change');
    form.find('[name="property_type"]').val(params.property_type).trigger('change');
    form.find('[name="status"]').val(params.status).trigger('change');
    if(params['renter']){
        form.find('[name="renter_name"]').val(params['renter_name']);
        form.find('[name="renter"]').val(params['renter']).trigger('change');
        form.find('[name="renter"]').html('<option value="'+params['renter']+'">'+params['renter_name']+'</option>');
    }
    if(params['customer']){
        form.find('[name="customer_name"]').val(params['customer_name']);
        form.find('[name="customer"]').val(params['customer']).trigger('change');
        form.find('[name="customer"]').html('<option value="'+params['customer']+'">'+params['customer_name']+'</option>');
    }
    if(params['owner']){
        form.find('[name="owner_name"]').val(params['owner_name']);
        form.find('[name="owner"]').val(params['owner']).trigger('change');
        form.find('[name="owner"]').html('<option value="'+params['owner']+'">'+params['owner_name']+'</option>');
    }
    if(params['property']){
        form.find('[name="property_name"]').val(params['property_name']);
        form.find('[name="property"]').val(params['property']).trigger('change');
        form.find('[name="property"]').html('<option value="'+params['property']+'">'+params['property_name']+'</option>');
    }
    if(params['user']){
        form.find('[name="user_name"]').val(params['user_name']);
        form.find('[name="user"]').val(params['user']).trigger('change');
        form.find('[name="user"]').html('<option value="'+params['user']+'">'+params['user_name']+'</option>');
    }
}
function fillFilterBill() {
    var storage = localStorage.getItem('bill__store');
    if ( !storage ) return;
    var params = JSON.parse(storage);
    var form = $('form#filter-bills');
    form.find('[name="payment_date"]').val(params.payment_date);
    if(params.finish) {
        form.find('[name="finish"]').trigger('click');
    }
    if (params.update_from) {
        form.find('[name="update_from"]').val(params.update_from);
    }
    if (params.update_to) {
        form.find('[name="update_to"]').val(params.update_to);
    }
    if(params['renter']){
        form.find('[name="renter_name"]').val(params['renter_name']);
        form.find('[name="renter"]').val(params['renter']).trigger('change');
        form.find('[name="renter"]').html('<option value="'+params['renter']+'">'+params['renter_name']+'</option>');
    }
    if(params['customer']){
        form.find('[name="customer_name"]').val(params['customer_name']);
        form.find('[name="customer"]').val(params['customer']).trigger('change');
        form.find('[name="customer"]').html('<option value="'+params['customer']+'">'+params['customer_name']+'</option>');
    }
    if(params['owner']){
        form.find('[name="owner_name"]').val(params['owner_name']);
        form.find('[name="owner"]').val(params['owner']).trigger('change');
        form.find('[name="owner"]').html('<option value="'+params['owner']+'">'+params['owner_name']+'</option>');
    }
    if(params['user']){
        form.find('[name="user_name"]').val(params['user_name']);
        form.find('[name="user"]').val(params['user']).trigger('change');
        form.find('[name="user"]').html('<option value="'+params['user']+'">'+params['user_name']+'</option>');
    }else {
        form.find('[name="user"]').val('').trigger('change');
        form.find('[name="user"]').html('');
    }
}
function fillFormClaim() {
    var storage = localStorage.getItem('claim__store');
    if ( !storage ) return;
    var params = JSON.parse(storage);
    var form = $('form#filter_claims');
    $('[name="using_status"]').val(params.using_status).trigger('change');
    $('[name="status"]').val(params.status).trigger('change');
    if(params['renter_id']){
        form.find('[name="renter_name"]').val(params['renter_name']);
        form.find('[name="renter_id"]').val(params['renter_id']).trigger('change');
        form.find('[name="renter_id"]').html('<option value="'+params['renter_id']+'">'+params['renter_name']+'</option>');
    }
    if(params['customer_id']){
        form.find('[name="customer_name"]').val(params['customer_name']);
        form.find('[name="customer_id"]').val(params['customer_id']).trigger('change');
        form.find('[name="customer_id"]').html('<option value="'+params['customer_id']+'">'+params['customer_name']+'</option>');
    }
    if(params['curator_id']){
        form.find('[name="user_name"]').val(params['user_name']);
        form.find('[name="curator_id"]').val(params['curator_id']).trigger('change');
        form.find('[name="curator_id"]').html('<option value="'+params['curator_id']+'">'+params['user_name']+'</option>');
    } else {
        form.find('[name="user_name"]').val('');
        form.find('[name="curator_id"]').val('').trigger('change');
        form.find('[name="curator_id"]').html('');
    }
}
$('form').submit(function () {
    $(this).find('button[type="submit"]').prop('disabled', true);
})

//remove filter contracts in localStorage
var clean_contract__store = $('.renter.renter_detail, .contract_list, .contract_detail, .contract_edit');
if ( !clean_contract__store.length ) {
    localStorage.removeItem('contract__store');
}
var clean_bill_store = $('.contract_detail, .bill_list');
if ( !clean_bill_store.length ) {
    localStorage.removeItem('bill__store');
}
var clean_claim_store = $('.store_filter_claim');
if ( !clean_claim_store.length ) {
    localStorage.removeItem('claim__store');
}
//end remove
