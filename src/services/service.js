module.exports = function($http, APP_SETTINGS) {

  var _getSolicitantes = function(){

      return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM solicitantes ORDER BY nome ASC limit 5');
   };
   var _getMateriais = function(){

       return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM materiais ORDER BY nome ASC')
    };
    var _getInsumos = function(){

        return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM insumos')
     };
     var _getPedidos = function(){

         return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM pedidos')
      };
   var _getPedidoById = function (id) {

      return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM pedidos WHERE id ='+id);

   }
   var _getInsumoById = function (id) {

      return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM insumos WHERE id_pedido ='+id);

   }
   var _getSolicitanteById = function (id) {

      return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM solicitantes WHERE id = '+id);
   }

   var _getInsumosByMaterial = function (id_material) {

     return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM insumos INNER JOIN materiais ON insumos.id_material = materiais.id WHere insumos.id_material = '+ id_material );

   }

   var _getCep = function (cep) {

     return $http.get('https://viacep.com.br/ws/'+cep+'/json/');

   }
   var _addInsumo = function (data) {

     return $http.post(APP_SETTINGS().BASE_URL+'INSERT INTO insumos ("id_pedido","id_material","descricao","preco", "quantidade") VALUES ()');

   }
   var _getPedidoByData = function (data) {

     return $http.get(APP_SETTINGS().BASE_URL+'Select distinct(data_de_compra) from pedidos ORDER BY data_de_compra  limit 6');

   }

   var _getAllPedidosbyData = function (data) {

     return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM pedidos WHERE INSTR(data_de_compra, "'+data+'") > 0');

   }

   var _getPedidoBySolicitantes = function (id) {

     if(id){
       return $http.get(APP_SETTINGS().BASE_URL+'SELECT * FROM pedidos WHERE id_solicitante = '+id);
     }

   }

   var _pedidoPendentes = function () {

     return $http.get(APP_SETTINGS().BASE_URL+'SELECT pedidos.*, solicitantes.* FROM pedidos INNER JOIN solicitantes  ON pedidos.id_solicitante = solicitantes.id');

   }


   return{

       getSolicitantes: _getSolicitantes,
       getMateriais : _getMateriais,
       getInsumos : _getInsumos,
       getPedidos : _getPedidos,
       getPedidoById: _getPedidoById,
       getInsumoById: _getInsumoById,
       getSolicitanteById: _getSolicitanteById,
       getInsumosByMaterial: _getInsumosByMaterial,
       getCep: _getCep,
       getPedidoByData: _getPedidoByData,
       getAllPedidosbyData: _getAllPedidosbyData,
       getPedidoBySolicitantes: _getPedidoBySolicitantes,
       pedidoPendentes: _pedidoPendentes
   };
}
