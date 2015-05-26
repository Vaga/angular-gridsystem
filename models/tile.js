function Tile(id, type, order, size, data) {

    var self = this;

    this.settings = {
        id: id,
        type: type,
        order: order,
        size: size,
        isEditable: false,
        element: null,
        onEdit: function(tile) {

            console.debug(tile);
            return true;
        },
        onDelete: function() {

            console.debug('Call API : tile/delete');
            return true;
        },
        onMove: function(id1, id2) {
            return true;
        }
    };

    this.data = data;
}
