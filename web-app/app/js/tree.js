var app = angular.module('myApp', ['angularBootstrapNavTree']);

app.controller('MainCtl', ['$scope', function ($scope) {
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

    $scope.my_handler = function (branch) {
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
                return true;
            } else {
                if ($scope.moveUp(level[i].children)) {
                    var copy = {
                        label: $scope.branch.label,
                        id: $scope.branch.uid,
                        children: $scope.branch.children,
                        level: $scope.branch.level - 1
                    };
                    level.push(copy);
                    $scope.branch = null;
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
        console.log("INSERTING", level);
        for (var i = 0; i < level.length; i++) {
            if (level[i].uid == id) {
                level[i].children.push({
                    label: data.label,
                    id: data.uid,
                    children: data.children,
                    level: data.level + 1
                });
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
        remover(undefined, $scope.branch.uid);
        inserter(undefined, $scope.selectedSibling.uid, $scope.branch);
        $scope.selectedSibling = null;
        $scope.branch = null;
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