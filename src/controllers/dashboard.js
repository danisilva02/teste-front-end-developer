module.exports = function($scope, $rootScope, aplicativoAPI, Dash) {

  $scope.dashboard1 = false;
  $scope.dashboard2 = false;
  $scope.dashboard3 = false;
  $scope.initDash = true;


  $scope.subheader = [
    {
      "name":"Pedidos por dia",
      "link":"dashboard-1",
      "id": 1
    },
    {
      "name":"Pedidos por solicitantes",
      "link":"dashboard-2",
      "id": 2
    },
    {
      "name":"Pedidos pendente",
      "link":"dashboard-3",
      "id": 3
    }
  ]


  var solicitantes = aplicativoAPI.getSolicitantes();
  $scope.allSolicitantes;
  var materiais = aplicativoAPI.getMateriais();
  var insumos = aplicativoAPI.getInsumos();
  var pedidos = aplicativoAPI.getPedidos();
  var getPedidoByData = aplicativoAPI.getPedidoByData();


function getAllPedidosbyData(data){

  var allDataArray = [];
  var dataInBinds = [];
  var dataTable = [];
  var quantPedido = [];

  angular.forEach(data, function (value) {
    var dataFormat = value.data_de_compra.substring(0,10);
    allDataArray.push(dataFormat);
  })

  // //console.log(allDataArray);

  getDataPedido1 = aplicativoAPI.getAllPedidosbyData(allDataArray[0]);

  getDataPedido1.then(
    function (response) {
        if(response.data.length > 0){
          dataInBinds.push(response.data.length);
          constructArrayTable(response.data);
        }
    },
    function () {
        dataInBinds[0] = 0;
    });

  getDataPedido2 = aplicativoAPI.getAllPedidosbyData(allDataArray[1]);

  getDataPedido2.then(
    function (response) {
      if(response.data.length > 0){
        dataInBinds.push(response.data.length);
        constructArrayTable(response.data);
      }
    },
    function () {
        dataInBinds[0] = 0;
    });

    getDataPedido3 = aplicativoAPI.getAllPedidosbyData(allDataArray[2]);

    getDataPedido3.then(
      function (response) {
        if(response.data.length > 0){
          dataInBinds.push(response.data.length);
          constructArrayTable(response.data);
        }
      },
      function () {
          dataInBinds[0] = 0;
      });

  getDataPedido4 = aplicativoAPI.getAllPedidosbyData(allDataArray[3]);

  getDataPedido4.then(
    function (response) {
      if(response.data.length > 0){
        dataInBinds.push(response.data.length);
        constructArrayTable(response.data);
      }
    },
    function () {
        dataInBinds[0] = 0;
    });

  getDataPedido5 = aplicativoAPI.getAllPedidosbyData(allDataArray[4]);

  getDataPedido5.then(
    function (response) {
      if(response.data.length > 0){
        dataInBinds.push(response.data.length);
        constructArrayTable(response.data);
      }
    },
    function () {
        dataInBinds[0] = 0;
    });

  getDataPedido6 = aplicativoAPI.getAllPedidosbyData(allDataArray[5]);

  getDataPedido6.then(
    function (response) {
      if(response.data.length > 0){
        dataInBinds.push(response.data.length);
        constructArrayTable(response.data);
      }
    },
    function () {
        dataInBinds[0] = 0;
    });

    Dash.Pedidospordia(allDataArray, dataInBinds, 'myChart-1');
    $scope.quantPedidoByData = dataInBinds;

    // //console.log(dataTable)

}

$scope.dataTable = [];
function constructArrayTable(data){

  // //console.log(data);

  angular.forEach(data, function (value) {

    $scope.dataTable.unshift(value);
    // //console.log(value);

  })

  // //console.log($scope.dataTable);

}

getPedidoByData.then(
  function (response) {
    var allDatas = response.data;
    getAllPedidosbyData(allDatas);
    // //console.log(allDatas);
  },
  function (error) {
    //console.log(error)
})

function getSolicitanteByPedidos() {
  solicitantes.then(
    function (response) {
      $scope.allSolicitantes = response.data;
      getPedidoBySolicitantes(response.data);
    },
    function (error) {
      console.log(error);
    });
  }
  getSolicitanteByPedidos();

function createArraySolicitendeByDash(data) {

   var arraySoli = [];

   angular.forEach(data, function (value) {
     arraySoli.push(value.nome);
   })

   return arraySoli;

}
  function getPedidoBySolicitantes(data) {

    $scope.solicitantePedidoArray = [];

    var solicitantePedido1 = aplicativoAPI.getPedidoBySolicitantes(data[0].id)
    var solicitantePedido2 = aplicativoAPI.getPedidoBySolicitantes(data[1].id)
    var solicitantePedido3 = aplicativoAPI.getPedidoBySolicitantes(data[2].id)
    var solicitantePedido4 = aplicativoAPI.getPedidoBySolicitantes(data[3].id)

    solicitantePedido1.then(
      function (response) {
        if(response.data.length > 0){
            $scope.solicitantePedidoArray.push(response.data.length);
        }
      },
      function (error) {
        console.log(error)
      });

      solicitantePedido2.then(
        function (response) {
          if(response.data.length > 0){
              $scope.solicitantePedidoArray.push(response.data.length);
          }
        },
        function (error) {
          console.log(error)
        });

        solicitantePedido3.then(
          function (response) {
            if(response.data.length > 0){
                $scope.solicitantePedidoArray.push(response.data.length);
            }
          },
          function (error) {
            console.log(error)
          });

          solicitantePedido4.then(
            function (response) {
              if(response.data.length > 0){
                  $scope.solicitantePedidoArray.push(response.data.length);
              }
            },
            function (error) {
              console.log(error)
            });

          var labels = createArraySolicitendeByDash($scope.allSolicitantes);

          Dash.PedidosporSolicitantes(labels, $scope.solicitantePedidoArray, 'myChart-2');

  }

  function pedidosPendente() {
    var pedidoPendente = aplicativoAPI.pedidoPendentes();
    pedidoPendente.then(
      function (response) {
          $scope.pedidoPendente = response.data;
      },
      function (error) {

      });

  }

  pedidosPendente();

  function setActiveLink() {

    angular.forEach($scope.subheader, function (value) {

      $('#'+value.link).removeClass('active-link');

    })

  }

  $scope.getDash = function (data) {

    $scope.initDash = false;
    setActiveLink();
    switch (data.id) {
      case 1:
        $scope.dashboard1 = true;
        $scope.dashboard2 = false;
        $scope.dashboard3 = false;
        $('#'+data.link).addClass('active-link');
        break;
      case 2:
        $scope.dashboard1 = false;
        $scope.dashboard2 = true;
        $scope.dashboard3 = false;
        $('#'+data.link).addClass('active-link');
        break;
      case 3:
        $scope.dashboard1 = false;
        $scope.dashboard2 = false;
        $scope.dashboard3 = true;
        $('#'+data.link).addClass('active-link');
        break;

    }

  }

}
