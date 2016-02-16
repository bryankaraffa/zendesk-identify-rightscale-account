(function() {

  return {
    events: {
      'app.activated':'init'
    },

    init: function() {
        // Create the ticket object
        var ticket = this.ticket();
        
        // Check to see if RightScale Account has already been set
        if (ticket.customField('custom_field_30589777') === null || ticket.customField('custom_field_30589777') === '') {
            console.log("[zd-identify-rs-account] RightScale Account field is currently unset.  Scanning tickets for RightScale account number..");
            
            
            // Setup the forEach loop in a try statement such that we can break out when the field has been set.
            try {
                // Get all comments on ticket and iterate through each of them looking for the regex
                ticket.comments().forEach(function(comment, i) {
                    var rightscale_urls_found=comment.value().match(/(rightscale.com\/acct\/)(\d+)/ig);
                    
                    // Check to see if any RightScale URLs are found in the comment 
                    if (typeof rightscale_urls_found.length === "number" && rightscale_urls_found.length > 0) {
                        // Do Something if URL match is found
                        console.log("[zd-identify-rs-account] Found RightScale URL in Ticket");
                        var rightscale_account_number=rightscale_urls_found[0].split("/")[2];
                        console.log("[zd-identify-rs-account] Setting RightScale Account # field to: %o",rightscale_account_number);
                        ticket.customField('custom_field_30589777',rightscale_account_number);    
                        throw new Event(); // break out of forEach loop once Account Has been set.
                    }
                }); // End ticket.comments().forEach
            } catch (e) {}
            
            

        } // end if ticket.customField
        else {
            console.log("[zd-identify-rs-account] RightScale Account field is already set.  Skipping scan for RightScale account number..");
        } // end else ticket.customField
    } // end init function ()
    
  }; // end return

}());
