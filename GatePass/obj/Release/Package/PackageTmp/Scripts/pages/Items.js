var dataItem, dataCategory, dataType, dataMeasure, dataDepartment;

$('#btnSupplier').click(function () {
    showforms.item('add');
});
$('#btnCategory').click(function () {
    showforms.add('Category','Category');
});
$('#btnType').click(function () {
    showforms.add('Item Type', 'Type');
});
$('#btnMeasure').click(function () {
    showforms.add('Unit of Measure', 'Measure');
});
$('#btnDept').click(function () {
    showforms.add('Item Department', 'Department');
});

$(document).delegate("#ItemGrid_Export_to_Excel", "click", function () {
    $("#ItemGrid").jqxGrid('exportdata', 'xls', 'Item_Details');
    $.ajax({
        url: '/Items/export',
        type: 'get',
        dataType: 'json',
        data: {
            operation: 'Export_Item',
            table: 'tblItems'
        }
    });
});

$(document).delegate("#CategoryGrid_Export_to_Excel", "click", function () {
    $("#CategoryGrid").jqxGrid('exportdata', 'xls', 'ItemCategory_Details');
    $.ajax({
        url: '/Items/export',
        type: 'get',
        dataType: 'json',
        data: {
            operation: 'Export_Category',
            table: 'tblCategories'
        }
    });
});

$(document).delegate("#TypeGrid_Export_to_Excel", "click", function () {
    $("#TypeGrid").jqxGrid('exportdata', 'xls', 'ItemType_Details');
    $.ajax({
        url: '/Items/export',
        type: 'get',
        dataType: 'json',
        data: {
            operation: 'Export_ItemType',
            table: 'tblItemTypes'
        }
    });
});

$(document).delegate("#MeasureGrid_Export_to_Excel", "click", function () {
    $("#MeasureGrid").jqxGrid('exportdata', 'xls', 'ItemMeasure_Details');
    $.ajax({
        url: '/Items/export',
        type: 'get',
        dataType: 'json',
        data: {
            operation: 'Export_Measure',
            table: 'tblUnitOfMeasure'
        }
    });
});

$(document).delegate("#DepartmentGrid_Export_to_Excel", "click", function () {
    $("#DepartmentGrid").jqxGrid('exportdata', 'xls', 'ItemDepartment_Details');
    $.ajax({
        url: '/Items/export',
        type: 'get',
        dataType: 'json',
        data: {
            operation: 'Export_Department',
            table: 'tblItemDepartmentRelationship'
        }
    });
});

$(document).delegate('#btnProceedDeactivate', 'click', function () {
    dbase_operation.deactivate($(this).attr('data-source') ,$(this).attr('data-id'), $(this).attr('itemID'));
});

$(document).delegate('#btnSaveItem', 'click', function () {
    dbase_operation.addItem();
});

$(document).delegate('#btnAdd', 'click', function () {
    dbase_operation.add($(this).attr('data-source'));
});

$(document).delegate(".ItemGrid_Inactive", "click", function (event) {
    showforms.deactivate('edit', dataItem.code_string, 'ItemGrid', dataItem.id_number);
});

$(document).delegate(".CategoryGrid_Inactive", "click", function (event) {
    showforms.deactivate('edit', dataCategory.code_string, 'CategoryGrid', dataCategory.id_number);
});

$(document).delegate(".TypeGrid_Inactive", "click", function (event) {
    showforms.deactivate('edit', dataType.code_string, 'TypeGrid', dataType.id_number);
});

$(document).delegate(".MeasureGrid_Inactive", "click", function (event) {
    showforms.deactivate('edit', dataMeasure.code_string, 'MeasureGrid', dataMeasure.id_number);
});

$(document).delegate(".DepartmentGrid_Inactive", "click", function (event) {
    showforms.deactivate('edit', dataDepartment.code_string, 'DepartmentGrid', dataDepartment.id_number);
});

$("#ItemGrid").on('rowclick', function (event) {
    var args = event.args;
    // row's bound index.
    var boundIndex = args.rowindex;
    // row's visible index.
    var visibleIndex = args.visibleindex;
    // right click.
    var rightclick = args.rightclick;
    // original event.
    var ev = args.originalEvent;

    var rowID = $("#ItemGrid").jqxGrid('getrowid', boundIndex);
    var data = $("#ItemGrid").jqxGrid('getrowdatabyid', rowID);
    dataItem = data;
    //showforms.deactivate('edit', data.code_string, 'ItemGrid');
});

$("#CategoryGrid").on('rowclick', function (event) {
    var args = event.args;
    // row's bound index.
    var boundIndex = args.rowindex;
    // row's visible index.
    var visibleIndex = args.visibleindex;
    // right click.
    var rightclick = args.rightclick;
    // original event.
    var ev = args.originalEvent;

    var rowID = $("#CategoryGrid").jqxGrid('getrowid', boundIndex);
    var data = $("#CategoryGrid").jqxGrid('getrowdatabyid', rowID);
    dataCategory = data;
    //showforms.deactivate('edit', data.code_string, 'CategoryGrid');
});

$("#TypeGrid").on('rowclick', function (event) {
    var args = event.args;
    // row's bound index.
    var boundIndex = args.rowindex;
    // row's visible index.
    var visibleIndex = args.visibleindex;
    // right click.
    var rightclick = args.rightclick;
    // original event.
    var ev = args.originalEvent;

    var rowID = $("#TypeGrid").jqxGrid('getrowid', boundIndex);
    var data = $("#TypeGrid").jqxGrid('getrowdatabyid', rowID);
    dataType = data;
    //showforms.deactivate('edit', data.code_string, 'TypeGrid');
});

$("#MeasureGrid").on('rowclick', function (event) {
    var args = event.args;
    // row's bound index.
    var boundIndex = args.rowindex;
    // row's visible index.
    var visibleIndex = args.visibleindex;
    // right click.
    var rightclick = args.rightclick;
    // original event.
    var ev = args.originalEvent;

    var rowID = $("#MeasureGrid").jqxGrid('getrowid', boundIndex);
    var data = $("#MeasureGrid").jqxGrid('getrowdatabyid', rowID);
    dataMeasure = data;
    //showforms.deactivate('edit', data.code_string, 'MeasureGrid');
});

$("#DepartmentGrid").on('rowclick', function (event) {
    var args = event.args;
    // row's bound index.
    var boundIndex = args.rowindex;
    // row's visible index.
    var visibleIndex = args.visibleindex;
    // right click.
    var rightclick = args.rightclick;
    // original event.
    var ev = args.originalEvent;

    var rowID = $("#DepartmentGrid").jqxGrid('getrowid', boundIndex);
    var data = $("#DepartmentGrid").jqxGrid('getrowdatabyid', rowID);
    dataDepartment = data
    //showforms.deactivate('edit', data.code_string, 'DepartmentGrid');
});

$(document).delegate("#ItemGrid_searchField", "keyup", function (e) {
    var columns = ["supplier_string", "supplier_contact_string", "category_string",
                   "type_string", "related_to_string", "name_string", "description_string"];
    generalSearch($('#ItemGrid_searchField').val(), 'ItemGrid', columns, e);
});

$(document).delegate("#CategoryGrid_searchField", "keyup", function (e) {
    var columns = ["name_string", "description_string"];
    generalSearch($('#CategoryGrid_searchField').val(), 'CategoryGrid', columns, e);
});

$(document).delegate("#TypeGrid_searchField", "keyup", function (e) {
    var columns = ["name_string", "description_string"];
    generalSearch($('#TypeGrid_searchField').val(), 'TypeGrid', columns, e);
});

$(document).delegate("#MeasureGrid_searchField", "keyup", function (e) {
    var columns = ["name_string", "description_string"];
    generalSearch($('#MeasureGrid_searchField').val(), 'MeasureGrid', columns, e);
});

$(document).delegate("#DepartmentGrid_searchField", "keyup", function (e) {
    var columns = ["name_string", "description_string"];
    generalSearch($('#DepartmentGrid_searchField').val(), 'DepartmentGrid', columns, e);
});

var showforms = {
    item: function (operation, boundIndex) {

        var modal = '<style>';
        modal += ' .textstyle {';
        modal += '      background-color: transparent;';
        modal += '      outline: none;';
        modal += '      outline-style: none;';
        modal += '      outline-offset: 0;';
        modal += '      border-top: none;';
        modal += '      border-left: none;';
        modal += '      border-right: none;';
        modal += '      border-bottom: 1px solid #e5e5e5;';
        modal += '      padding: 3px 10px;';
        modal += '}';
        modal += ' .form-control:focus {';
        modal += '      border-top: 0;';
        modal += '      border-left: 0;';
        modal += '      border-right: 0;';
        modal += '      border-bottom: 1px solid #e5e5e5;';
        modal += '}';
        modal += '</style>';

        modal += '<div class="modal fade" id="modalitemmaster" role="dialog" >';
        modal += '<div class="modal-dialog">';
        modal += ' <div class="modal-content">';

        modal += '<div class="modal-header" style="background-color:#76cad4; color:#ffffff">';
        modal += '<h4 class="modal-title">Add Item</h4>';
        modal += '</div>';
        modal += '<div class="modal-body">';

        modal += '<div class="row">';
        modal += '  <input id="Code" type="hidden" />';
        modal += '  <div class="col-md-12" style="margin-top:3%;">';
        modal += '          <div class="form-group">';
        modal += '              <input id="name" type="text" class="textstyle form-control" placeholder="*Item name"class="form-control companyrequired" style="width:98%;" />';
        modal += '          </div>';
        modal += '  </div>';
        modal += '</div>';
        modal += '<div class="row">';
        modal += '  <div class="col-md-12">';
        modal += '          <div class="form-group">';
        modal += '              <input id="description" placeholder="*Description"  class="textstyle form-control" type="text" class="form-control companyrequired" style="width:98%;" />';
        modal += '          </div>';
        modal += '  </div>';
        modal += '</div>';
        modal += '<div class="row">';
        modal += '  <div class="col-md-12">';
        modal += '          <div class="form-group">';
        modal += '              <div class="form-control dropdownlist textstyle" id="cmbSupplier" data-placeholder="*Supplier" data-url="/Transactions/GetSupplierCombo" data-display="supplier_string" data-value="code_string"></div>';
        modal += '          </div>';
        modal += '  </div>';
        modal += '</div>';
        modal += '<div class="row">';
        modal += '  <div class="col-md-12">';
        modal += '          <div class="form-group">';
        modal += '              <div class="form-control dropdownlist textstyle" id="cmbCategory" data-placeholder="*Item Category" data-url="/Items/GetItemCategories" data-display="name_string" data-value="code_string"></div>';
        modal += '          </div>';
        modal += '  </div>';
        modal += '</div>';
        modal += '<div class="row">';
        modal += '  <div class="col-md-12">';
        modal += '          <div class="form-group">';
        modal += '              <div class="form-control dropdownlist textstyle" id="cmbType" data-placeholder="*Item Type" data-url="/Items/GetItemTypes" data-display="name_string" data-value="code_string"></div>';
        modal += '          </div>';
        modal += '  </div>';
        modal += '</div>';
        modal += '<div class="row">';
        modal += '  <div class="col-md-12">';
        modal += '          <div class="form-group">';
        modal += '             <div class="form-control dropdownlist textstyle" id="cmbDepartment" data-placeholder="*Item Department" data-url="/Items/GetItemDepartment" data-display="name_string" data-value="code_string"></div>';
        modal += '          </div>';
        modal += '  </div>';
        modal += '</div>';

        modal += '<div class="modal-footer">';
        modal += '<div class="row">';
        modal += '<button class="btn btn-success" id="btnSaveItem"';
        modal += 'style="width: 100px;">';
        modal += 'SAVE</button>';
        modal += '<button type="button" style="width: 100px;" class="btn btn-default" data-dismiss="modal">CANCEL</button> &nbsp ';
        modal += '</div>';
        modal += '</div>';

        modal += '</div>';

        modal += '</div>';
        modal += '</div>';
        modal += '</div>';

        $("#form_modal").html(modal);
        $("#modalitemmaster").modal("show");
        $("#modalitemmaster").css('z-index', '1000000');

        ini_main.element('dropdownlist');
        ini_main.element('inputtext');
    },

    deactivate: function (operation, code, source, id) {
        var modal = '<div class="modal fade" id="modalDeactivate" role="dialog" >';
        modal += '<div class="modal-dialog modal-sm">';
        modal += ' <div class="modal-content">';

        modal += '<div class="modal-header" style="background-color:#F25656; color:#ffffff">';
        modal += '<h4 class="modal-title">Inactive Record</h4>';
        modal += '</div>';
       // modal += '<br/>';

        modal += '<div class="modal-body" style="margin-top:4%">';
        modal += '<p>Are you sure you want to be inactive this record?</p>';
        modal += '</div>';

        modal += '<div class="modal-footer">';
        modal += '<div class="row">';
        modal += '<button class="btn btn-danger" id="btnProceedDeactivate"';
        modal += 'data-source="' + source + '" data-id="' + code + '" itemID="'+id+'">';
        modal += 'YES</button>';
        modal += '<button type="button" class="btn btn-default" data-dismiss="modal">NO</button> &nbsp ';
        modal += '</div>';
        modal += '</div>';

        modal += '</div>';
        modal += '</div>';
        modal += '</div>';

        $("#form_modal").html(modal);
        $("#modalDeactivate").modal("show");
        $("#modalDeactivate").css('z-index', '1000000');
    },

    add: function (title, source) {

        var modal = '<style>';
        modal += ' .textstyle {';
        modal += '      background-color: transparent;';
        modal += '      outline: none;';
        modal += '      outline-style: none;';
        modal += '      outline-offset: 0;';
        modal += '      border-top: none;';
        modal += '      border-left: none;';
        modal += '      border-right: none;';
        modal += '      border-bottom: 1px solid #e5e5e5;';
        modal += '      padding: 3px 10px;';
        modal += '}';
        modal += ' .form-control:focus {';
        modal += '      border-top: 0;';
        modal += '      border-left: 0;';
        modal += '      border-right: 0;';
        modal += '      border-bottom: 1px solid #e5e5e5;';
        modal += '}';
        modal += '</style>';

        modal += '<div class="modal fade" id="modaladd" role="dialog" >';
        modal += '<div class="modal-dialog">';
        modal += ' <div class="modal-content">';

        modal += '<div class="modal-header" style="background-color:#76cad4; color:#ffffff">';
        modal += '<h4 class="modal-title">Add ' + title + '</h4>';
        modal += '</div>';
        modal += '<div class="modal-body" style="margin-top:3%;">';
        //modal += '   <label style="margin-top:3%;">Name</label>'
        modal += '   <input id="name" type="text" placeholder="*Name" class="form-control companyrequired textstyle" />';
        //modal += '   <label>Description</label>'
        modal += '   <input id="description" type="text" placeholder="*Description" class="form-control companyrequired textstyle" style="margin-top:3%;"/>';
        modal += '</div>';

        modal += '<div class="modal-footer">';
        modal += '<div class="row">';
        modal += '<button class="btn btn-success" id="btnAdd" data-source="' + source + '"';
        modal += 'style="width: 100px;">';
        modal += 'SAVE</button>';
        modal += '<button type="button" style="width: 100px;" class="btn btn-default" data-dismiss="modal">NO</button> &nbsp ';
        modal += '</div>';
        modal += '</div>';

        modal += '</div>';
        modal += '</div>';
        modal += '</div>';

        $("#form_modal").html(modal);
        $("#modaladd").modal("show");
        $("#modaladd").css('z-index', '1000000');
    }
};

var dbase_operation = {
    deactivate: function (grid, code, id) {
        var url = '';
        var msg = '';
        if (grid == "ItemGrid") {
            url = '/Items/DeactivateItem'
            msg = 'Record inactive successfully!';
        } else if (grid == "CategoryGrid") {
            url = '/Items/DeactivateCategory'
            msg = 'Record inactive successfully!';
        } else if (grid == "TypeGrid") {
            url = '/Items/DeactivateType'
            msg = 'Record inactive successfully!';
        } else if (grid == "MeasureGrid") {
            url = '/Items/DeactivateMeasure'
            msg = 'Record inactive successfully!';
        } else if (grid == "DepartmentGrid") {
            url = '/Items/DeactivateDepartment'
            msg = 'Record inactive successfully!';
        }
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            data: {
                Id: id,
                code: code,
                isactive: false
            },
            beforeSend: function () {

            },
            success: function (response) {
                if (response.success) {
                    $("#modalDeactivate").modal("hide");
                    notification_modal("Inactive Record", msg, "success");
                    if (grid == "ItemGrid")
                        $('#ItemGrid').jqxGrid('updatebounddata');
                    else if (grid == "CategoryGrid")
                        $('#CategoryGrid').jqxGrid('updatebounddata');
                    else if (grid == "TypeGrid")
                        $('#TypeGrid').jqxGrid('updatebounddata');
                    else if (grid == "MeasureGrid")
                        $('#MeasureGrid').jqxGrid('updatebounddata');
                    else if (grid == "DepartmentGrid")
                        $('#DepartmentGrid').jqxGrid('updatebounddata');
                } else {
                    notification_modal("Deactivation Failed!", response.message, "danger");
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    },

    addItem: function () {
      
            var elements = ["#name", "#description", "#cmbSupplier", "#cmbCategory", "#cmbType", "#cmbDepartment"]
            var ctr = 0;
            for (var i = 0; i <= 5; i++) {
                if ($(elements[i]).val() == "") {
                    $(elements[i]).css("border-color", "red");
                }
                else {
                    $(elements[i]).css("border-color", "#e5e5e5");
                    ctr++;
                }
            }
        
        if (ctr == 6) {
            var msg = 'New record successfully added';
            $.ajax({
                url: '/Items/AddItems',
                dataType: 'json',
                type: 'get',
                data: {
                    name: $("#name").val(),
                    description: $("#description").val(),
                    supplier: $("#cmbSupplier").val(),
                    category: $("#cmbCategory").val(),
                    type: $("#cmbType").val(),
                    department: $("#cmbDepartment").val()
                },
                beforeSend: function () {

                },
                headers: {
                    //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if (response.success) {
                        $("#modalitemmaster").modal("hide");
                        notification_modal("Add Record", msg, "success");
                        $('#ItemGrid').jqxGrid('updatebounddata');
                    } else {
                        notification_modal("Addition failed!", response.message, "danger");
                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        }
        else {
            console.log("fill up all fields");
        }
    },

    add: function (source) {

        var elements = ["#name", "#description"]
        var ctr = 0;
        for (var i = 0; i <= 1; i++) {
            if ($(elements[i]).val() == "") {
                $(elements[i]).css("border-color", "red");
            }
            else {
                $(elements[i]).css("border-color", "#e5e5e5");
                ctr++;
            }
        }
        if (ctr == 2) {
            var url = '';
            var msg = '';
            if (source == "Category") {
                url = '/Items/AddCategory'
                msg = 'New record successfully added!'
            } else if (source == "Type") {
                url = '/Items/AddType'
                msg = 'New record successfully added!'
            } else if (source == "Measure") {
                url = '/Items/AddMeasure'
                msg = 'New record successfully added!'
            } else if (source == "Department") {
                url = '/Items/AddDepartment'
                msg = 'New record successfully added!'
            }
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'get',
                data: {
                    name: $("#name").val(),
                    description: $("#description").val()
                },
                beforeSend: function () {

                },
                headers: {
                    //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if (response.success) {
                        $("#modaladd").modal("hide");
                        notification_modal("Add Record", msg, "success");
                        if (source == "Category")
                            $('#CategoryGrid').jqxGrid('updatebounddata');
                        else if (source == "Type")
                            $('#TypeGrid').jqxGrid('updatebounddata');
                        else if (source == "Measure")
                            $('#MeasureGrid').jqxGrid('updatebounddata');
                        else if (source == "Department")
                            $('#DepartmentGrid').jqxGrid('updatebounddata');
                    } else {
                        notification_modal("Addition failed!", response.message, "danger");
                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        }
    },
};