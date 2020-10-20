$(document).ready(function () {

    // ===================================== Hide And Show
    $(".formDiv").hide();
    $(".addSearch button").click(function () {
        $(".formDiv").show(300);
        makeDisable();
        makeDisableUpdate();
    })
    // ===================================== Hide And Show


    // ====================================================== LOCAL STORAGE
    // ====================================================== WRITE TO LOCAL STORAGE
    getFromLocalStorage();
    let obj = {}
    let userId = 1;

    function addToLocalStorage() {
        let user = {
            Name: $("#name").val(),
            Country: $("#country").val(),
            Salary: $("#salary").val(),
            Email: $("#email").val()
        }

        if (obj[userId] == undefined) {
            obj[userId] = [];
        }

        obj[userId].push(user);
        localStorage.setItem("users", JSON.stringify(obj));
        userId++;
        console.log(obj);
    }
    // ====================================================== WRITE TO LOCAL STORAGE
    // ====================================================== GET FROM LOCAL STORAGE
    function getFromLocalStorage() {
        let user = localStorage.getItem("users");
        let obj = JSON.parse(user);

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];

                element.forEach(e => {
                    $("tbody").append(`<tr>
                        <td>${e.Name}</td>
                        <td>${e.Country}</td>
                        <td>${e.Salary}</td>
                        <td>${e.Email}</td>
                        <td>
                            <i class='fas fa-edit'></i>
                            <i class='fas fa-trash'></i>
                        </td>
                    </tr>`);
                    console.log(e.Name);
                });
            }
        }
    }
    // ========================================================= GET FROM LOCAL STORAGE
    // ========================================================= LOCAL STORAGE


    // ========================================================== MAIN ACTION 
    $(".formDiv").change(function () {
        if ($("#name").val() && $("#country").val() && $("#salary").val() && $("#email").val()) {
            makeNotDisable();

            $("tbody>tr>td:nth-of-type(4)").each(function () {
                if ($(this).text() == $("#email").val()) {
                    makeDisable();
                    $(".wrongMail").slideDown(300, function () {})
                    return false;
                } else {
                    addNewData();
                    makeNotDisable();
                    // addToLocalStorage();
                    $(".wrongMail").slideUp(300, function () {})
                }
            })

        } else {
            makeDisable();
        }
    })
    // ========================================================== MAIN ACTION 


    // ============================================= CANCEL
    afterAddHide();

    function afterAddHide() {
        $(".cancel").click(function () {
            cleanInput();
        })
    }
    // ============================================= CANCEL


    // ============================================== CLEAN INPUT FIELDS
    function cleanInput() {
        $(".formDiv").hide();
        $("#name").val("");
        $("#country").val("");
        $("#salary").val("");
        $("#email").val("");
    }
    // ============================================== CLEAN INPUT FIELDS


    // ======================================== EDIT DATA
    editData();

    function editData() {
        $(".fa-edit").click(function () {
            $(".formDiv").show();
            $("#name").val($(this).parent().siblings("td:nth-of-type(1)").text());
            $("#country").val($(this).parent().siblings("td:nth-of-type(2)").text());
            $("#salary").val($(this).parent().siblings("td:nth-of-type(3)").text());
            $("#email").val($(this).parent().siblings("td:nth-of-type(4)").text());

            let myThis = $(this);
            makeNotDisableUpdate();
            makeDisable();

            document.querySelectorAll(".buttons .update")[0].onclick = function () {

                $(myThis.parent().siblings("td:nth-of-type(1)")).text($("#name").val());
                $(myThis.parent().siblings("td:nth-of-type(2)")).text($("#country").val());
                $(myThis.parent().siblings("td:nth-of-type(3)")).text($("#salary").val());
                $(myThis.parent().siblings("td:nth-of-type(4)")).text($("#email").val());

                trashDelete();
                editData();
                afterAddHide();
                cleanInput();
                totalAmount();
            }
        })
    }
    // ======================================== EDIT DATA


    //  ====================================== Delete Table DATA
    trashDelete();

    function trashDelete() {
        $(".fa-trash").click(function () {
            $(this).parent().parent().remove();
            totalAmount();
        });
    }
    //  ====================================== Delete Table DATA


    // ===================================== ADD NEW DATA
    function addNewData() {
        document.querySelectorAll(".buttons .save")[0].onclick = function () {
            let nameData = $("<td></td>").text($("#name").val());
            let countryData = $("<td></td>").text($("#country").val());
            let salaryData = $("<td></td>").text($("#salary").val());
            let emailData = $("<td></td>").text($("#email").val());
            let operation = $("<td></td>").append('<i class="fas fa-edit"></i><i class="fas fa-trash"></i>');
            let tr = $("<tr></tr>").append(nameData, countryData, salaryData, emailData, operation);
            $("tbody").append(tr);

            addToLocalStorage();
            trashDelete();
            editData();
            afterAddHide();
            cleanInput();
            totalAmount();
        }
    }
    // ===================================== ADD NEW DATA


    // ========================================== DISABLE OR NOT DISABLE
    function makeDisable() {
        $(".buttons .save").removeClass("selected");
        $(".buttons .save").prop('disabled', true);
    }

    function makeNotDisable() {
        $(".buttons .save").addClass("selected");
        $(".buttons .save").prop('disabled', false);
    }

    function makeDisableUpdate() {
        $(".buttons .update").css({
            "z-index": "-100",
            "display": "none"
        })
        $(".buttons .update").prop('disabled', true);
    }

    function makeNotDisableUpdate() {
        $(".buttons .update").css({
            "z-index": "100",
            "display": "block"
        })
        $(".buttons .update").prop('disabled', false);
    }
    // ========================================== DISABLE OR NOT DISABLE


    // ================================= TOTAL CALCULATOR
    totalAmount();

    function totalAmount() {
        let total = 0;
        $("tbody>tr>td:nth-of-type(3)").each(function () {
            total += Number($(this).text());
            console.log(total);
        })
        $(".totalMaount span").text(total);
    }
    // ================================= TOTAL CALCULATOR


    // ================================= SEARCH
    searchData();

    function searchData() {
        // document.getElementById("search").addEventListener("keyup", function () {
        //     var input, filter, table, tr, td, txtValue;
        //     input = document.getElementById("search");
        //     filter = input.value.toUpperCase();
        //     table = document.getElementById("myTable");
        //     tr = table.getElementsByTagName("tr");
        //     for (let i = 0; i < tr.length; i++) {
        //         td = tr[i].getElementsByTagName("td")[0];
        //         if (td) {
        //             txtValue = td.textContent || td.innerText;
        //             if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //                 tr[i].style.display = "";
        //             } else {
        //                 tr[i].style.display = "none";
        //             }
        //         }
        //     }
        // });

        $(document).on("keyup", "#search", function () {
            let inputValue = $("#search").val().toLowerCase().trim();
            $("tbody tr").each(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1);
            });
        });
    }
    // ================================= SEARCH

});