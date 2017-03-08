module.exports = function($scope, $rootScope, aplicativoAPI) {

  $scope.activeLoad = false;
  $scope.errorCep = false;
  //
  // function maskCep() {
  //   var inputCep = $('#cep-solicitante').val();
  //
  //   console.log(inputCep);
  //
  //   for(var i = 0; i < inputCep.length; i++){
  //     console.log(inputCep[i]);
  //   }
  //
  // }
  //
  // function formatar(mascara, documento){
  //   var i = documento.value.length;
  //   var saida = mascara.substring(0,1);
  //   var texto = mascara.substring(i)
  //
  //   if (texto.substring(0,1) != saida){
  //             documento.value += texto.substring(0,1);
  //   }
  // }

  var solicitantes;
  var materiais;
  var insumos;
  var pedidos;
  var pedidoAtivo;
  $scope.buscaPrdido = false;

  // $scope.subheader = [
  //   {"name":"Dados do pedido"},
  //   {"name":"Dados do Insumos"},
  //   {"name":"Dados do Solicitante"},
  //   {"name":"Dados da Entrega"},
  //   {"name":"Total"}
  // ]

  // solicitantes = aplicativoAPI.getSolicitantes();
  materiais = aplicativoAPI.getMateriais();
  insumos = aplicativoAPI.getInsumos();
  // pedidos = aplicativoAPI.getPedidos();

  materiais.then(
    function(response) {
      $scope.materiaisDatas = response.data;
      // console.log($scope.materiaisDatas);
      // $scope.itemSoli['ende'] = $scope.itemSoli.rua + '' + $scope.itemSoli.numero + ' - ' + $scope.itemSoli.estado;
    },
    function(error) {
  });

  insumos.then(function (response) {

    console.log(response);

  },function (error) {


  })


  function getPedidoById(id) {
    var pedidoGet = aplicativoAPI.getPedidoById(id);
    pedidoGet.then(
      function(response) {
        $scope.itemPedido = response.data[0];
        getSolicitanteById($scope.itemPedido.id_solicitante);
        pedidoAtivo = $scope.itemPedido.id;
      },
      function(error) {
    });
  }

  function getInsumoById(id) {

   var insumoGet =  aplicativoAPI.getInsumoById(id);

   insumoGet.then(
     function(response) {
       var key = response.data[0];
       var id_material = key.id_material;
       getInsumosByMaterial(id_material);
     },
     function(error) {
   });

  }

  function calculateTotProd(data) {

    var totProd = 0;

    angular.forEach(data, function (value) {

      totProd += value.preco * value.quantidade;

    })

    return totProd;

  }

  function calculateQuantileProd(data) {

    var quantProd = 0;

    angular.forEach(data, function (value) {

      quantProd += value.quantidade;

    })

    return quantProd;
  }

  function getInsumosByMaterial(id_material) {
      var join = aplicativoAPI.getInsumosByMaterial(id_material);
      join.then(
        function(response) {
          $scope.insumosData = response.data;
          var tot = calculateTotProd(response.data)
          var quant = calculateQuantileProd(response.data);
          $scope.itemPedido.quantMaterial = quant;
          $scope.itemPedido.precoTotal = tot;

        },
        function(error) {
      });

      console.log(join);
  }

  function getSolicitanteById(id) {

   var getSolicitante =  aplicativoAPI.getSolicitanteById(id);
   getSolicitante.then(
     function(response) {
       $scope.itemSoli = response.data[0];
       $scope.itemSoli['ende'] = $scope.itemSoli.rua + '' + $scope.itemSoli.numero + ' - ' + $scope.itemSoli.estado;
     },
     function(error) {
   });
  }

  $scope.filterPedido = function (id) {

    $scope.buscaPrdido = true
    getPedidoById(id);
    getInsumoById(id)

  }

  $scope.setEndereco = function (cep) {

    $scope.activeLoad = true;
    $scope.errorCep = false;

     if(cep.length > 0){
       var res = cep.replace(/-/g, "");
     }
    //  console.log(res);
    //  console.log(cep.length);

    if(res.length == 8){

      var mycep = aplicativoAPI.getCep(res);
      mycep.then(
        function (response) {
          console.log(response);
          if(response.data){
            $scope.itemSoli.cep = response.data.cep;
            $scope.itemSoli.ende = response.data.logradouro + ' - ' + response.data.bairro;
            $scope.itemSoli.cidade = response.data.localidade;
            $scope.itemSoli.estado = response.data.uf;
            $scope.activeLoad = false;
            $scope.errorCep = false;
          }else{
              $scope.errorCep = true;
          }
        },
        function (error) {

          $scope.errorCep = true;

        }
      )
      // console.log(mycep);

    }

  }

  $scope.activeModal = function () {
    $('.modal').show();
  }
  $scope.closeModal = function () {
    $('.modal').hide();
  }

  $scope.addInsumo = function (data) {

    console.log(data);
    console.log(pedidoAtivo);
    var parseDataItem = JSON.parse(data.item)

    $scope.insumosData.push({
      "id": null,
      "id_pedido": pedidoAtivo,
      "id_material": parseDataItem.id,
      "descricao": data.desc,
      "preco": 28.85,
      "quantidade": data.quant,
      "marca": parseDataItem.marca
  })

  $scope.newInsumo.desc = '';
  $scope.newInsumo.quant = '';

  var tot = calculateTotProd($scope.insumosData)
  var quant = calculateQuantileProd($scope.insumosData);
  $scope.itemPedido.quantMaterial = quant;
  $scope.itemPedido.precoTotal = tot;

  $('.modal').hide();

  }

  $scope.removeInsumo = function (key) {

    delete $scope.insumosData[key];

  }

}
