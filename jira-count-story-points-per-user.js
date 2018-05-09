// ==UserScript==
// @name         JIRA: Count Story Points Per User
// @namespace    http://tampermonkey.net/
// @version      0.3
// @updateURL    https://raw.githubusercontent.com/bwmarkle/monkey-scripts/master/jira-count-story-points-per-user.js
// @downloadURL  https://raw.githubusercontent.com/bwmarkle/monkey-scripts/master/jira-count-story-points-per-user.js
// @description  This script counts all the story points and displays them per user.
// @author       bradm
// @match        https://jira.imhdev.com/issues/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     *
     */
    var gmStoryPointsPerUser = function() {
        var gmUsers = [];

        jQuery( 'tr[data-issuekey]' ).each( function() {
            var $tr = jQuery( this ),
                assignee = $tr.find( '.assignee' ).text().trim(),
                storyPoints = parseInt( $tr.find( 'td.customfield_10004' ).text().trim() );

            // Make sure user, low, and high exist.
            gmUsers[assignee] = gmUsers[assignee] || [];
            gmUsers[assignee]['low'] = gmUsers[assignee]['low'] || 0;
            gmUsers[assignee]['high'] =  gmUsers[assignee]['high'] || 0;

            // Increase low and high values.
            if( Number.isInteger(storyPoints) ) {
                    gmUsers[assignee]['low'] += storyPoints;
                    gmUsers[assignee]['high'] += ( storyPoints >= 5 ? (storyPoints * 2 ) : storyPoints );
            }
        });

        console.log( 'DESCRPTION: 1, 2, and 3 story points equate to roughly 1, 2, or 3 hours of work. Story points >3 equate to a range, such as "x - 2x hours". For example, 5 story points equals roughly 5 - 10 hours of work. The following is a range of **hours of work** for each assignee.' );
        console.log( gmUsers );
        alert( "Open your JS Console (F12) to view data." );
    };

    /**
     *
     */
    jQuery( function() {
        jQuery( '.save-as-new-filter' ).after( '<a class="aui-button story-points-per-user" title="Data will be displayed in JS Console">Story Points per user</a>' );
        jQuery( 'body' ).on( 'click', '.story-points-per-user', gmStoryPointsPerUser );
    });
})();