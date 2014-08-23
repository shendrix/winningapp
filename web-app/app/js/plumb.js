var app = angular.module("myApp", []);

app.controller('MainCtl', ['$scope', function ($scope) {
    $scope.connections = [];

    var updateConnections = function (conn, remove) {
        if (!remove) {
            $scope.connections.push({
                source: conn.sourceId,
                target: conn.targetId,
                scope: conn.scope
            });
        } else {
            var idx = -1;
            for (var i = 0; i < $scope.connections.length; i++) {
                if ($scope.connections[i].source == conn.sourceId && $scope.connections[i].target == conn.targetId) {
                    idx = i;
                    break;
                }
            }
            if (idx != -1) {
                $scope.connections.splice(idx, 1);
            }
        }
    };

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

        jsPlumb.bind("connection", function (info, originalEvent) {
            console.log("Connection added");
            $scope.$apply(function () {
                updateConnections(info.connection);
            });
        });

        jsPlumb.bind("connectionDetached", function (info, originalEvent) {
            // honestly, I don't know why this method doesn't need $scope.$apply, but it doesn't
            console.log("Connection removed");
            $scope.$apply(function () {
                updateConnections(info.connection, true);
            });
        });
    });
}]);
