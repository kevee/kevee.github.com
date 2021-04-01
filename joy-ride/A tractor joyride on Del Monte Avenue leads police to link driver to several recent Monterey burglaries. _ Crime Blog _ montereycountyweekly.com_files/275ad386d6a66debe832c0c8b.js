(function(){if(!window.$mcSite){$mcSite={};$mcSite.adwords_remarketing={settings:{google_allow_ad_personalization_signals:"false"}};}})();
/* eslint-disable */
(function () {
    if (window.$mcSite === undefined || window.$mcSite.adwords_remarketing === undefined) {
        return;
    }

    var module = window.$mcSite.adwords_remarketing;

    if(module.installed === true) {
        return;
    }

    if (!module.settings) {
        return;
    }

    var settings = module.settings;

    if(!settings.google_conversion_id) {
        return;
    }

    if(!settings.google_remarketing_only) {
        return;
    }

    var script = document.createElement("script");
    script.src = "//www.googleadservices.com/pagead/conversion_async.js";
    script.type = "text/javascript";
    script.onload = function () {
        var allow_personalization_settings = settings.google_allow_ad_personalization_signals;
        if (allow_personalization_settings === undefined) {
            allow_personalization_settings = "true";
        }

        window.google_trackConversion({
            google_conversion_id: settings.google_conversion_id,
            google_remarketing_only: settings.google_remarketing_only,
            google_allow_ad_personalization_signals: allow_personalization_settings
        });
    };

    document.body.appendChild(script);

    window.$mcSite.adwords_remarketing.installed = true;
})();
