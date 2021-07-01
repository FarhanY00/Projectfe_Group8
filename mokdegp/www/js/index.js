$(function () {
    if (!sessionStorage.ttoken || sessionStorage.ttoken === null)
        location.href = "login.html";

    //$("#idSpan").val = sessionStorage.ttoken;
    document.getElementById("idSpan").innerHTML = sessionStorage.ttoken;


    var link1 = crossroads.addRoute("/logout", function () {
        sessionStorage.clear();
        location.href = "login.html";
    });

    var link2 = crossroads.addRoute("/Home", function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#Home']").parent().addClass("active");
        var email = sessionStorage.ttoken;
        var datalist = "email=" + email;
        $.ajax({
            type: "post",
            url: "http://192.168.1.12:8080/hpsave/GetItemData",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                //alert(mydata);
                var lastIndex = myData.length - 1;
                var htmlText = "";
                if (myData[lastIndex].status === 1) {
                    for (var i = 0; i < lastIndex; i++) {
                        htmlText = htmlText + "<tr><td>" + myData[i].id
                            + "</td><td><a href='#view/" + myData[i].id + "'>" + myData[i].title
                            + "</td><td><a href='#delcontact'><span class='glyphicon glyphicon-trash' data-itemId='"
                            + myData[i].id
                            + "'></span></a></td></tr>";
                    }
                    //alert(htmlText);
                    $("#tblItem tbody").html(htmlText);
                }
            },
            error: function () {

            }
        });
        $("#divHome").show();
        $("#divInbox").show();
        $("#divAddItem").hide();
        $("#divEditItem").hide();
        $("#divView").hide();
        $("#divAddBtn").show();
    });


    var link4 = crossroads.addRoute("/btnAddItem", function () {
        $("#divHome").hide();
        $("#divInbox").hide();
        $("#divEditItem").hide();
        $("#divAddBtn").hide();
        $("#divView").hide();
        $("#divAddItem").show();
    });

    var link3 = crossroads.addRoute("", function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#Home']").parent().addClass("active");
        var email = sessionStorage.ttoken;
        var datalist = "email=" + email;
        $.ajax({
            type: "post",
            url: "http://192.168.1.12:8080/hpsave/GetItemData",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                //alert(mydata);
                var lastIndex = myData.length - 1;
                var htmlText = "";
                if (myData[lastIndex].status === 1) {
                    for (var i = 0; i < lastIndex; i++) {
                        htmlText = htmlText + "<tr><td>" + myData[i].id
                            + "</td><td><a href='#view/" + myData[i].id + "'>" + myData[i].title
                            + "</td><td><a href='#delcontact'><span class='glyphicon glyphicon-trash' data-itemId='"
                            + myData[i].id
                            + "'></span></a></td></tr>";
                    }
                    //alert(htmlText);
                    $("#tblItem tbody").html(htmlText);
                }
            },
            error: function () {

            }
        });
        $("#divHome").show();
        $("#divInbox").show();
        $("#divAddItem").hide();
        $("#divEditItem").hide();
        $("#divView").hide();
        $("#divAddBtn").show();
    });

    var link5 = crossroads.addRoute("/update/{id}", function (id) {
        $("#divHome").hide();
        $("#divContact").hide();
        $("#divAddContact").hide();
        $("#divEditItem").show();
        $("#divView").hide();
        $("#divAddBtn").hide();
        var datalist = "id=" + id;
        $.ajax({
            type: "post",
            url: "http://192.168.1.12:8080/hpsave/GetItemDataByID",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);

                if (myData.status === 1) {
                    document.getElementById("title0").value = myData.title;
                    document.getElementById("username0").value = myData.username;
                    document.getElementById("password0").value = myData.password;
                    document.getElementById("descript0").value = myData.descript;
                    document.getElementById("itemId0").value = myData.id;
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });

    var link6 = crossroads.addRoute("/view/{id}", function (id) {
        $("#divHome").hide();
        $("#divInbox").hide();
        $("#divAddItem").hide();
        $("#divEditItem").hide();
        $("#divView").show();
        $("#divAddBtn").hide();

        var datalist = "id=" + id;
        $.ajax({
            type: "post",
            url: "http://192.168.1.12:8080/hpsave/GetItemDataByID",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                var lastIndex = myData.length - 1;
                var htmlText = "";
                if (myData.status === 1) {
                    htmlText = "<tr><td>Index : </td><td>" + myData.id
                        + "</td></tr> <tr><td>Title : </td><td>" + myData.title
                        + "</td></tr> <tr><td>Username : </td><td>" + myData.username
                        + "</td></tr> <tr><td>Password : </td><td>" + myData.password
                        + "</td></tr> <tr><td>Description : </td><td><p>" + myData.descript
                        + "</p></td></tr> <br>"
                        + "<tr><td><a class='btn btn-primary' href='#update/" + myData.id + "' role='button'>Update</a></td></tr>";
                    $("#tblView tbody").html(htmlText);
                }
            },
            error: function () {

            }
        });
    });

    $("#frmAddItem").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var title = $("#title").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var descript = $("#descript").val();

        var datalist = "title=" + title + " &username=" + username + "&password=" + password + "&descript=" + descript + "&owneremail=" + sessionStorage.ttoken;
        $.ajax({
            type: "post",
            url: "http://192.168.1.12:8080/hpsave/AddItem",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Add Contact Success!");
                    $(link2).show();

                }
                else {
                    alert(myData.status);
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });

    $("#frmEditItem").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var title = $("#title0").val();
        var username = $("#username0").val();
        var password = $("#password0").val();
        var descript = $("#descript0").val();
        var itemId = $("#itemId0").val();


        var datalist = "title=" + title + " &username=" + username + "&password=" + password + "&descript=" + descript + "&itemId=" + itemId;
        $.ajax({
            type: "post",
            url: "http://192.168.1.12:8080/hpsave/UpdateItemByID",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Update Contact Success!");
                    $("#divEditItem").hide();
                    $("#divHome").show();
                    $("#divInbox").show();
                    $("#divAddBtn").show();
                    $("#divView").hide();
                    $("#divEditItem").hide();
                }
                else {
                    alert("Update Contact Failed");
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });

    $("#tblItem tbody").on("click", "span", function () {
        var itemId = $(this).data("itemId")
        // bootbox.alert("Delete process"+contactid);
        datalist = "itemId=" + itemId;
        var parentTR = $(this).parent().parent().parent();
        bootbox.confirm("Are u sure to delete this contact?", function (answer) {
            if (answer) {
                $.ajax({
                    type: "post",
                    url: "http://192.168.1.12:8080/hpsave/DelItemByID",
                    data: datalist,
                    cache: false,
                    success: function (mydata) {
                        var myData = JSON.parse(mydata);
                        if (myData.status === 1) {
                            alert("Delete Contact Success!");
                            $(parentTR).fadeOut("slow", "swing", function () {
                                $(parentTR).remove();
                            });

                        }
                        else {
                            alert(myData.status);
                            alert("Delete Contact Failed");
                        }
                    },
                    error: function () {
                        console.log("ajax error!");
                        alert("Please contact admin!");
                    }
                });
            }
            else {
                bootbox.alert("Delete canceled");
            }
        });
    });

    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

});