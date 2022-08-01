jQuery('#btn-copy').click(function() {
    reformat();
    var data = jQuery('#result');

    if (data != "") {
        data.select();
        document.execCommand("copy");
    }
});

jQuery('.tabs').click(function() {
    var x;
    x = jQuery(this).attr('data-id');

    $('.wrap').each(function(e) {
        jQuery(this).css('display', 'none');
    });

    $('.tabs').each(function(e) {
        jQuery(this).find('div').removeClass('w3-border-white');
    });
    $(this).find('div').addClass('w3-border-white');
    jQuery(x).css('display', 'block');
});

jQuery('#btn-copy-result').click(function() {
    var data = jQuery('#content').val();
    var metadata = jQuery('#metadata');

    metadata.html(data);
    metadata.find('a').each(function(e) {
        var format = reformat_content(jQuery(this).attr('href'));
        jQuery(this).attr('href', format);
        jQuery(this).attr('target', '_self');
    });

    var result = jQuery('#content_result');
    result.html(metadata.html());
    result.select();
    document.execCommand("copy");
});


function reformat() {

    var text = jQuery('#url').val();

    if (text != "") {

        text = text.toLowerCase();

        //check if url contain domain

        var url = text;
        var hostname;

        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }


        //find & remove host and port number
        hostname = hostname.split(':')[0];

        if (hostname != "") {
            const url = text;
            const lookingFor = hostname;
            const replaced = url.substring(url.indexOf(lookingFor) + lookingFor.length);

            text = replaced;
        }


        //check / at first and last character
        if (text.charAt(0) != "/") {
            text = "/" + text;
        }

        if (text.slice(-1) != "/") {
            text = text + "/";
        }


        //remove .shtml or html
        text = text.replace(".shtml", "");
        text = text.replace(".html", "");


        jQuery('#result').html(text);

    } else {

    }
}


function reformat_content(data) {

    var text = data;

    if (text != "") {

        text = text.toLowerCase();

        //check if url contain domain

        var url = text;
        var hostname;

        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }


        //find & remove host and port number
        hostname = hostname.split(':')[0];

        if (hostname != "") {
            const url = text;
            const lookingFor = hostname;
            const replaced = url.substring(url.indexOf(lookingFor) + lookingFor.length);

            text = replaced;
        }


        //check / at first and last character
        if (text.charAt(0) != "/") {
            text = "/" + text;
        }

        if (text.slice(-1) != "/") {
            text = text + "/";
        }


        //remove .shtml or html
        text = text.replace(".shtml", "");
        text = text.replace(".html", "");


        return text;

    } else {

    }
}

jQuery('#form-url').on('submit', function(e) {
    e.preventDefault();
    reformat();
});