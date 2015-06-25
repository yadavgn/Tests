	//$(document).ready( init() );
UserProfile = function(name, mobile, address1, address2, address3,email)
{
	this.name = name;
	this.mobile = mobile;
	this.address1 = address1;
	this.address2 = address2;
	this.address3 = address3;
	this.email = email;	

};

UserProfile.prototype.isRegistered = function() {
	return !(localStorage.userprofile === undefined);
};

/***********************************************************
* this function loads App User Profile from local db.
************************************************************/
UserProfile.prototype.loadUserProfile = function() {
	
	var profile = JSON.parse(localStorage.userprofile);
	if(!this.isRegistered())	return this;

	this.name = profile.name;
	this.mobile = profile.mobile;
	this.address1 = profile.address1;
	this.address2 = profile.address2;
	this.address3 = profile.address3;
	this.email = profile.email;
	return this;
};

Order = function(name, mobile,pickupdate, pickuptime,dropdate, droptime) {
	this.pickupdate = date;
	this.scheduledpickup = pickuptime;
	this.scheduleddrop = droptime;
	this.status = 'new';
	this.name = name;
	this.mobile = mobile;
};

MyApp = function() {
	this.userprofile = new UserProfile();
	this.orders = new Array();
};

App = new MyApp();

/////////////////////////////////////////////////////////////////////////////////
// This function will update Register Page with the stored profile information.
////////////////////////////////////////////////////////////////////////////////
MyApp.prototype.DisplayProfileDetails = function(parent) {
	if(parent === undefined) parent = '';
	$(parent+' #nameinput').val(this.userprofile.name);
	$(parent+' #mobileinput').val(this.userprofile.mobile);
	$(parent+' #addressinput-1').val(this.userprofile.address1);
	$(parent+' #addressinput-2').val(this.userprofile.address2);
	$(parent+' #addressinput-3').val(this.userprofile.address3);
	$(parent+' #emailinput').val(this.userprofile.email);

	return this;
}

MyApp.prototype.UpdateUserProfile = function(parent) {
	this.userprofile.name 		= $(parent+' #nameinput').val();
	this.userprofile.mobile 	= $(parent+' #mobileinput').val();
	this.userprofile.address1 	= $(parent+' #addressinput-1').val();
	this.userprofile.address2 	= $(parent+' #addressinput-2').val();
	this.userprofile.address3 	= $(parent+' #addressinput-3').val();
	this.userprofile.email 		= $(parent+' #emailinput').val();

	return this;
}

$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
   	console.log('test: This is pagecontainerbeforechange event.');
});

$(document).ready(function(){
	$('#submitprofile').click(function(){
		App.UpdateUserProfile("#registration"); // take data from ui to object.
		//App.userprofile.isValid();  // perform validation of the user profile object.
		localStorage.userprofile = JSON.stringify(App.userprofile); // save user profile in local storage.
		
		$('#wellcomescrn h1').text('Wellcome '+ App.userprofile.name)
		$.mobile.pageContainer.pagecontainer("change", "#start", {
					transition: "pop"
		});
	});
});

$(document).ready(function() {
	if(App.userprofile.isRegistered() === false ){
		setTimeout(function (e) {
				$.mobile.pageContainer.pagecontainer("change", "#registration", {
					transition: "pop"
				});
			},100);
	}else {
		App.userprofile.loadUserProfile();
		$('#wellcomescrn h1').text('Hi '+ App.userprofile.name);
		//App.DisplayProfileDetails('#profile');
	}

});


$(document).ready(function(){
	$('#gotoNewOrder').click(function(){
		

	});
	
	$('#openprofile').click(function(){
		//App.UpdateUserProfile("#profile");
		App.DisplayProfileDetails("#profile");
		$.mobile.pageContainer.pagecontainer("change", "#profile", {
			transition: "pop"
		});
	});
	
	$('#updateprofile').click(function(){

		App.UpdateUserProfile("#profile"); // take data from ui to object.
		//App.userprofile.isValid();  // perform validation of the user profile object.
		localStorage.userprofile = JSON.stringify(App.userprofile); // save user profile in local storage.

		$('#wellcomescrn h1').text('Hi '+ App.userprofile.name);
		$("#popupBasic").popup( "open",{
				transition: "fade"
			} ).text("Data Saved successfully");
		
		setTimeout(function(e){
			$("#popupBasic").popup("close",{
				transition: "fade"
			});
		}, 1000);

	});

	$('#unregisterprofile').click(function(){
		App.UpdateUserProfile("#profile"); // take data from ui to object.
		//App.userprofile.isValid();  // perform validation of the user profile object.
		localStorage.removeItem("userprofile");
		setTimeout(function (e) {
			$.mobile.pageContainer.pagecontainer("change", "#registration", {
				transition: "pop"
			});
		},100);
	});

	$('#exitApp').click(function(){
		//$.mobile.
	});
});