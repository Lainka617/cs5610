"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var page_list_component_1 = require("./page-list.component");
describe('PageListComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [page_list_component_1.PageListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(page_list_component_1.PageListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
