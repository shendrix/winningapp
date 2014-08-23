var app = angular.module("mine", ['ui.bootstrap']);

// Used to generate a unique ID. If we don't do this then jsPlumb will and we won't know what it is called.
var nId = 0;
var generateId = function () {
    return "id_" + nId++;
};

app.controller("MainCtl", ['$scope', function ($scope) {
    $scope.tools = [fastq, eater, aligner];
    $scope.selected = null;

    $scope.select = function (t) {
        $scope.selected = t;
    };

    // For display
    $scope.getWorkspace = function () {
        return angular.toJson($scope.workspace, true);
    };

    $scope.getConnections = function () {
        return angular.toJson($scope.connections, true);
    };

    $scope.workspace = [];

    $scope.addTool = function (tool) {
        tool = jQuery.extend(true, {}, tool);  // we must deep copy or things break
        tool.left = 100;
        tool.top = 100;
        tool.id = generateId();

        for (var i = 0; i < tool.inputs.length; i++) {
            tool.inputs[i].id = generateId();
        }

        for (i = 0; i < tool.outputs.length; i++) {
            tool.outputs[i].id = generateId();
        }

        for (i = 0; i < tool.configuration.length; i++) {
            tool.configuration[i].value = tool.configuration[i].default; // TODO: default is optional, "or" to a defaultier value?
        }
        $scope.workspace.push(tool);
    };

    $scope.remove = function (idx) {
        var tool = $scope.workspace[idx];

        for (var i = 0; i < tool.inputs.length; i++) {
            jsPlumb.removeAllEndpoints(tool.inputs[i].id);
        }

        for (i = 0; i < tool.outputs.length; i++) {
            jsPlumb.removeAllEndpoints(tool.outputs[i].id);
        }

        if ($scope.selected == $scope.workspace[idx]) {
            $scope.selected = null;
        }
        $scope.workspace.splice(idx, 1);
    };

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
        jsPlumb.importDefaults({
            Connector: [ "Bezier", { curviness: 30, connectorClass: "connectorClass" } ],
            Container: $('#area'),
            PaintStyle: {lineWidth: 6, strokeStyle: "#049cdb"},
            Endpoint: ["Dot", {radius: 8}]
            //Endpoint: ["Image", {src:"static/img/chevron.png"}],
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
            updateConnections(info.connection, true);
        });

        jsPlumb.bind("click", function (conn) {
            console.log("Connection clicked");
            $scope.$apply(function () {
                jsPlumb.detach(conn);
            });
        });
    });
}]);

app.directive('tool', function () {
    return {
        restrict: 'A',
        link: function (scope, elt, attrs) {
            jsPlumb.setId(elt, scope.t.id);
            jsPlumb.draggable(elt);
        }
    };
});

app.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, elt, attrs) {
            jsPlumb.draggable(elt);
        }
    }
});

app.directive('input', function () {
    return {
        restrict: 'A',
        link: function (scope, elt, attrs) {
            jsPlumb.setId(elt, scope.i.id);
            jsPlumb.addEndpoint(elt, {
                isTarget: true,
                anchor: "LeftMiddle",
                //endpoint: ["Rectangle", {width: 20, height: 12, cssClass: 'endpointTarget'}],
                endpoint: ["Dot", {radius: 10, cssClass: 'endpointTarget'}],
                connectorStyle: { lineWidth: 20, strokeStyle: "#049cdb" },
                paintStyle: { fillStyle: "#049cdb"}, // color of the endpoint itself!
                maxConnections: 1,
                style: {fillStyle: "#049cdb"}, // color of the connector
                dropOptions: {hoverClass: "hover", activeClass: "dragActive"},
                scope: scope.i.format
            });

        }
    }
});

app.directive('output', function () {
    return {
        restrict: "A",
        link: function (scope, elt, attrs) {
            jsPlumb.setId(elt, scope.o.id);
            jsPlumb.addEndpoint(elt, {
                isSource: true,
                anchor: "RightMiddle",
                //endpoint: ["Rectangle", {width: 15, height: 15, cssClass: 'endpointSource'}],
                endpoint: ["Dot", {radius: 10, cssClass: 'endpointSource'}],
                paintStyle: { fillStyle: "#049cdb"}, // color of the endpoint itself!
                scope: scope.o.format
            });
        }
    }
});
