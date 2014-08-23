jsPlumb.ready(function () {
    jsPlumb.setContainer($("body"));

    var items = $('.panel');
    jsPlumb.draggable(items, {
        containment: 'parent',
        handle: '.panel-heading'
    });

    var bodies = items.find('.panel-body');
    jsPlumb.makeSource(bodies, {
        connector: 'StateMachine'
    });

    jsPlumb.makeTarget(bodies, {
        anchor: 'Continuous'
    });

    jsPlumb.bind('click', function (connection, e) {
        jsPlumb.detach(connection);
    });
});
