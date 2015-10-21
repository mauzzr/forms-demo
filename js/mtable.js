/*
 * File: mtable.js, created by Peter Welby 18 Oct. 2015
 * This script implements the single-page application functionality
 * which reads form input and synchronizes it with the location hash
 * to facilitate back/forward functionality, bookmarking and sharing
 * created tables, etc.
 */

"use strict";

/** Validation function -- checks to make sure inputs are filled in and ordered correctly,
 *  i.e. "start" is smaller than "end". If all the inputs are valid, they end up in the
 *  inputVals array for the purposes of generating the multiplication table.*/
var validate = function() {
    console.log("I got called!");
    var i,
        bFormIsValid = true;

    for (i = 0; i < 4; i++) {
        // check for blank fields
        if ($("#in" + (i + 1)).val() == "") {
            bFormIsValid = false;
            $("#in" + (i + 1)).css("background-color", "rgba(255, 0, 0, 0.5)");
            $("#message").text("Please fill out all fields before generating a table.");
        // check to make sure the Start of the range is not bigger than the End
        } else if ($("#in" + (i + 1)).attr("class") === "startInput" &&
                   $("#in" + (i + 2)).val() < $("#in" + (i + 1)).val()) {
            bFormIsValid = false;
            console.log(i + 1);
            console.log(i + 2);
            $("#in" + (i + 1)).css("background-color", "rgba(255, 0, 0, 0.5)");
            //$("#in" + (i + 2)).css("background-color", "rgba(255, 0, 0, 0.5)");
            $("#message").text("Cannot generate table -- Start cannot be greater than End");
        } else {
            $("#in" + (i + 1)).css("background-color", "#ffffff");
        }
    }
    if (bFormIsValid) {
        $("#message").text("");
    }
    return bFormIsValid;
};

/** Generate the table -- called via the form action attribute, which fires only after the form is
 *  successfully validated */
var generateTable = function(values) {
    console.log("I GOT CALLED");
    var i, j,
        strContent = "",
        rStart, rEnd,
        cStart, cEnd;

    strContent += "<table>";

    //Get input field values
    rStart = Number($("#in3").val());
    rEnd = Number($("#in4").val());
    cStart = Number($("#in1").val());
    cEnd = Number($("#in2").val());

    // start at one less than the row and column start values to make a spot for the labels
    for (i = rStart - 1; i <= rEnd; i++) {
        strContent += "<tr>";

        // j goes between the cStart and cEnd values
        for (j = cStart - 1; j <= cEnd; j++) {
            // handle the printing of labels, and put nothing in the top-left corner
            if (i === rStart - 1) {
                if (j === cStart - 1) {
                    // top-left corner, so we need an empty cell
                    strContent += "<td class='indexLabel'>" + " " + "</td>";
                } else {
                    // first row, need to print column labels
                    strContent += "<td class='indexLabel'>" + j + "</td>";
                }
            } else if (j === cStart - 1) {
                strContent += "<td class='indexLabel'>" + i + "</td>";
            } else if (i === j) {
                // we're calculating a square, so highlight it
                strContent += "<td class='squareProduct'>" + (i * j) + "</td>";
            } else {
                strContent += "<td>" + (i * j) + "</td>";
            }

        }
        strContent += "</tr>";
    }

    strContent += "</table>";

    $("#tableArea").html(strContent);
};