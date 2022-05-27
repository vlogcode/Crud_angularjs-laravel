app.controller('DistrictController', function($scope, $http) { //tao 1 controller
    $http({
        method: "GET",
        url: "http://localhost:8000/api/district"
    }).then(function(response) {
        console.log(response.data);
        $scope.districts= response.data;
    });
    $scope.showmodal = function(id) {;
        $scope.id = id;
        if (id == 0) {
            $scope.district = null;
            $scope.modalTitle = "Add district";
        } else {
            $scope.modalTitle = "Edit district";
            $http({
                method: "GET",
                url: "http://localhost:8000/api/district/" + id
            }).then(function(response) {
                $scope.district = response.data;
            });
        }
        $('#modelId').modal('show');
    }
    $scope.deleteClick = function(id) {
        var hoi = confirm("Ban co muon xoa that khong");
        if (hoi) {
            $http({
                method: "DELETE",
                url: "http://localhost:8000/api/district/" + id
            }).then(function(response) {
                $scope.message = response.data;
                location.reload();
            });
        }
    }
    $scope.saveData = function() {
        if ($scope.id == 0) { //dang them tin moi
            $http({
                method: "POST",
                url: "http://localhost:8000/api/district",
                data: $scope.district,
                "content-Type": "application/json"
            }).then(function(response) {
                $scope.message = response.data;
                console.log(response.data);
                location.reload();

            });
        } else { //sua tin
            $http({
                method: "PUT",
                url: "http://localhost:8000/api/district/" + $scope.id,
                data: $scope.district,
                "content-Type": "application/json"
            }).then(function(response) {
                $scope.message = response.data;
                console.log(response.data);
                location.reload();

            });
        }
    }
});
