var mongoose = require('mongoose');

var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model("Widgets", widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(pageId,widget) {

    return widgetModel.create(widget)
        .then(
            function (createWidget) {
                pageModel.findPageById(pageId)
                    .then(
                        function (page) {
                            page.widgets.push(widget);
                            pageModel.updatePage(pageId, page).then(data => {
                                console.log(data);
                            });
                        }
                    );
                return createWidget;
            }
        );
}

function findWidgetsByPageId(pageId) {
    return widgetModel.find({pageId: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.findOneAndUpdate({_id: widgetId}, widget, {new: true});
}

function deleteWidget(widgetId) {
    return widgetModel.findOneAndDelete({_id: widgetId});
}

