"use strict";
var ContactCollectionModel = (function () {
    function ContactCollectionModel(contacts, address, location) {
        this.contacts = [];
        for (var i = 0; i < contacts.length; i++) {
            this.contacts[i] = new GeneratedContactModel(contacts[i]);
        }
        this.address = address ? address : null;
        this.location = location != null ? location : null;
    }
    return ContactCollectionModel;
}());
exports.ContactCollectionModel = ContactCollectionModel;
var GeneratedContactModel = (function () {
    function GeneratedContactModel(contact) {
        this.label = contact.label;
        this.contact_string = contact.makeContactString();
        console.log("GENERATED CONTACT STRING: " + this.contact_string);
        this.contact_link = contact.makeContactLink();
        console.log("GENERATED CONTACT LINK: " + this.contact_link);
    }
    return GeneratedContactModel;
}());
exports.GeneratedContactModel = GeneratedContactModel;
var PhoneModel = (function () {
    function PhoneModel(label, number) {
        this.label = label;
        this.contact_arr = number;
    }
    PhoneModel.prototype.makeContactString = function () {
        return this.contact_arr.join('-');
    };
    PhoneModel.prototype.makeContactLink = function () {
        var prefix = 'tel';
        return prefix + ":" + this.makeContactString();
    };
    return PhoneModel;
}());
exports.PhoneModel = PhoneModel;
var FaxModel = (function () {
    function FaxModel(label, number) {
        this.label = label;
        this.contact_arr = number;
    }
    FaxModel.prototype.makeContactString = function () {
        return this.contact_arr.join('-');
    };
    FaxModel.prototype.makeContactLink = function () {
        var prefix = 'fax-global-phone';
        return prefix + ":" + this.makeContactString();
    };
    return FaxModel;
}());
exports.FaxModel = FaxModel;
var EmailModel = (function () {
    function EmailModel(label, strs) {
        this.label = label;
        this.contact_arr = strs;
    }
    EmailModel.prototype.makeContactString = function () {
        return this.contact_arr[0] + "@" + this.contact_arr[1] + "." + this.contact_arr[2];
    };
    EmailModel.prototype.makeContactLink = function () {
        var prefix = 'mailto';
        return prefix + ":" + this.makeContactString();
    };
    return EmailModel;
}());
exports.EmailModel = EmailModel;
exports.GCS_CONTACTS = [
    new ContactCollectionModel([
        new PhoneModel('Clark Seydel', ['+1', '202', '360', '5015'])
    ], [
        '25025 Las Brisas Rd, Ste A',
        'Murrieta, CA 92562'
    ], 'Murrieta, CA'),
    new ContactCollectionModel([
        new PhoneModel('Phone', ['+86', '21', '5131', '4277']),
        new FaxModel('Fax', ['+86', '21', '5131', '4278'])
    ], [
        '1st Floor Building 17, No. 498',
        'Guoshoujing Road, 201203'
    ], 'Shanghai, China'),
    new ContactCollectionModel([
        new EmailModel('Email', ['info', 'gamecloudstudios', 'com'])
    ], [], ' ')
];
//# sourceMappingURL=contact-model.js.map