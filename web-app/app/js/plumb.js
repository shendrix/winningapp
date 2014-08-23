jsPlumb.ready(function () {
    jsPlumb.setContainer($("body"));

    var items = $('.item');
    jsPlumb.draggable(items, {
        containment: 'parent'
    });

    jsPlumb.makeSource(items, {
        connector: 'StateMachine'
    });

    jsPlumb.makeTarget(items, {
        anchor: 'Continuous'
    });
});
