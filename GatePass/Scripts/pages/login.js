$(document).ready(function () {
    $("#txtUsername").focus();
    $(".progress").hide();

    $("#txtUsername").keypress(function (e) {
        if (e.which == 13) {
            $("#txtPassword").focus();
        }
    });

    $("#txtPassword").keypress(function (e) {
        if (e.which == 13) {
            $("#cmdLogin").trigger("click");
        }
    });

    $("#cmdLogin").click(function () {
        _action.loginAttempt();
    });
});

var _action = {
    loginAttempt: function () {
        if (!$.trim($("#txtUsername").val()) && !$.trim($("#txtPassword").val())) {
            notification_modal("Login Failed", "Please provide a username and password!", "danger");
        } else {
            $.ajax({
                url: '/Account/Attempt',
                dataType: 'json',
                type: 'post',
                cache: false,
                data: {
                    username: $("#txtUsername").val(),
                    password: $("#txtPassword").val(),
                    returnurl: $("#txtReturnURL").val(),
                },
                beforeSend: function () {
                    $("#cmdLogin").hide();
                    $(".progress").show();
                },
                headers: {
                    //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    console.log(response);

                    $("#cmdLogin").show();
                    $(".progress").hide();

                    if (response.success) {
                        //alert("hello world");
                        //window.location.href = response.message;
                        window.location.href = response.message;
                    } else {
                        notification_modal("Login failed!", response.message, "danger");

                        $("#modal_div").on('hidden.bs.modal', function () {
                            $("#txtPassword").val('');
                            $("#txtUsername").focus();
                            $("#txtUsername").select();
                        })
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $("#cmdLogin").show();
                    $(".progress").hide();
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        }
    },
};