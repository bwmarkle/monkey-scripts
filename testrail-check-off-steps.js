// ==UserScript==
// @name         TestRail - check off steps
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make it easier to keep track of where you are in a test case. As you finish a step, click it, it will turn a different color.
// @author       BradM
// @match        https://*.testrail.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $body = jQuery( 'body' );

    $body
        .append( '<style>.step-done{background:#ABEBC6;}</style>' )
        .on( 'click', 'table.steps tr, #qpane-body li', function() {
            jQuery( this ).toggleClass( 'step-done' );
        });
})();