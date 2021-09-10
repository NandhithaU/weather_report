$(document).ready(function () {
    $("#search").click(function () {
        $("#cityRes").text("loading");
        var city = $("#city").val()
        if (!city) {
            alert("please enter something")
            return;
        }

        $.ajax({
            url: `/weather?city=${city}`,
            type: "GET",
            success: function (result) {
                console.log(result);
                $("#cityRes").text(result);
                $("#city").val("");
            },
            error : function(error){
                $("#cityRes").text("please enter valid city name");
                $("#city").val("");
            }
        });

    })
})