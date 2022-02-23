"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportStatus = exports.ReportCategory = void 0;
var ReportCategory;
(function (ReportCategory) {
    ReportCategory["TrafficJam"] = "Traffic Jam";
    ReportCategory["Accident"] = "Accident";
})(ReportCategory = exports.ReportCategory || (exports.ReportCategory = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["Created"] = "Created";
    ReportStatus["Confirmed"] = "Confirmed";
    ReportStatus["Rejected"] = "Rejected";
})(ReportStatus = exports.ReportStatus || (exports.ReportStatus = {}));
