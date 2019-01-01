<script>
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
</script>