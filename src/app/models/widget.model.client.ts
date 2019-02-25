export class Widget {
    _id: string;
    name?: string;
    widgetType: string;
    pageId: string;
    size?: string;
    text?: string;
    url?: any;
    width?: string;

    constructor(_id, type, pageId, name, size= '1', text = 'text', width = '100%', url = 'url') {
        this._id = _id;
        this.widgetType = type;
        this.pageId = pageId;
        this.size = size;
        this.url = url;
        this.width = width;
        this.text = text;
        this.name = name;
    }
}
