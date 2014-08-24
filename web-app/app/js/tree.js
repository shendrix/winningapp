var app = angular.module('myApp', ['angularBootstrapNavTree', 'ngAnimate', 'ngResource']);

app.factory('Ontologies', ['$resource', function ($resource) {
    return $resource('/app/ontologies/:id/:version', null, {
            update: {method: "POST", url: '/app/ontologies/:id', params: {id: '@id'}}}
    );
}]);

app.controller('MainCtl', ['$scope', 'Ontologies', function ($scope, Ontologies) {
    $scope.sources = Ontologies.query();
    $scope.selectedSibling = null;

    $scope.data = [
        {
            label: 'Animals',
            children: [
                {
                    label: 'Mammals',
                    children: [
                        {
                            label: 'Human'
                        },
                        {
                            label: "Manatee"
                        }
                    ]
                },
                {
                    label: 'Insects'
                },
                {
                    label: 'Kangaroo'
                }
            ]
        },
        {
            label: 'Fungi',
            children: [
                {
                    label: 'Toadstool'
                },
                {
                    label: '1Up'
                }
            ]
        }
    ];

    $scope.save = function () {
        Ontologies.update({id: $scope.source.name}, {
            name: $scope.source.name,
            data: JSON.stringify($scope.data),
            ontologyVersion: $scope.version + 1
        }, function () {
            $scope.load($scope.version + 2);
        });
    };

    $scope.versionChange = function () {
        $scope.load($scope.version + 1);
        var temp = Ontologies.get({id: $scope.source.name}, function () {
            $scope.versions = [];
            for (var i = 0; i < temp.ontologyVersion; i++) {
                $scope.versions.push(i);
            }
        })
    };

    $scope.load = function (version) {
        $scope.data = Ontologies.get({id: $scope.source.name, version: version}, function () {
            console.log($scope.data);
            $scope.versions = [];
            for (var i = 0; i < $scope.data.ontologyVersion; i++) {
                $scope.versions.push(i);
            }
            $scope.version = $scope.data.ontologyVersion - 1;
            $scope.data = JSON.parse($scope.data.data);
        });
    };

    $scope.my_handler = function (branch) {
        if ($scope.branch) {
            $scope.branch.selected = false;
        }
        $scope.branch = branch;
        $scope.siblings = angular.copy(gatherSiblings());
        for (var i = 0; i < $scope.siblings.length; i++) {
            if ($scope.siblings[i].uid == $scope.branch.uid) {
                $scope.siblings.splice(i, 1);
                break;
            }
        }
    };

    var gatherSiblings = function (level) {
        if (level == undefined) {
            level = $scope.data;
        }
        for (var i = 0; i < level.length; i++) {
            if (level[i].uid == $scope.branch.uid) {
                return level;
            } else {
                if (level[i].children) {
                    var v = gatherSiblings(level[i].children);
                    if (v != null) {
                        return v;
                    }
                }
            }
        }
    };

    $scope.moveUp = function (level) {
        if (level == undefined) {
            level = $scope.data;
        }
        for (var i = 0; i < level.length; i++) {
            if (level[i].uid == $scope.branch.uid) {
                level.splice(i, 1);
                // if the selected branch is at this level, remove it, return true to indicate
                // the branch needs to be added to the parent
                return true;
            } else {
                // couldn't find it, do depth first search (easier)
                if ($scope.moveUp(level[i].children)) {
                    // it was found the level below me, add it to this level
                    var copy = {
                        label: $scope.branch.label,
                        children: $scope.branch.children,
                        level: $scope.branch.level - 1,
                        selected: true
                    };
                    level.push(copy);
                    $scope.my_handler(copy);
                    return false;
                }
            }
        }
        return false;
    };

    // removes a node from the tree based on ID
    var remover = function (level, id) {
        if (level == undefined) {
            level = $scope.data;
        }
        for (var i = 0; i < level.length; i++) {
            if (level[i].uid == id) {
                level.splice(i, 1);
                return true;
            } else {
                if (remover(level[i].children, id)) {
                    return true;
                }
            }
        }
        return false;
    };

    // inserts a node as a child of the branch at ID with data
    var inserter = function (level, id, data) {
        if (level == undefined) {
            level = $scope.data;
        }
        for (var i = 0; i < level.length; i++) {
            if (level[i].uid == id) {
                var guy = {
                    label: data.label,
                    children: data.children,
                    level: data.level + 1,
                    selected: true
                };
                level[i].children.push(guy);
                $scope.my_handler(guy);
                return true;
            } else {
                if (inserter(level[i].children, id, data)) {
                    return true;
                }
            }
        }
        return false;
    };

    $scope.moveDown = function () {
        console.log("REMOVE:", $scope.branch.uid);
        // poor performance but simple impl
        remover(undefined, $scope.branch.uid);
        inserter(undefined, $scope.selectedSibling.uid, $scope.branch);
    };

    var compare = function (a, b) {
        if (a.label < b.label)
            return -1;
        if (a.label > b.label)
            return 1;
        return 0;
    };

    var sortAll = function (level) {
        if (level == undefined) {
            level = $scope.data;
        }
        level.sort(compare);
        sortAll(level.children);
    };
}
]);