module.exports = function($scope, $rootScope, aplicativoAPI) {

  $rootScope.subheader = [
    {"name":"Solicitantes"},
    {"name":"Materiais"},
    {"name":"Insumos"},
    {"name":"Pedidos"}
  ]

  var solicitantes = aplicativoAPI.getSolicitantes();
  var materiais = aplicativoAPI.getMateriais();
  var insumos = aplicativoAPI.getInsumos();
  var pedidos = aplicativoAPI.getPedidos();


  console.log('Testendo promise');

}
