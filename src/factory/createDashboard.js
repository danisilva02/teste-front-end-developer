module.exports = function () {

  // console.log('Dash');

  return{

      Pedidospordia: function (dataLabes, binsData, target) {


        var ctx = document.getElementById(target);
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
          labels: dataLabes,
          datasets: [
            {
                data: binsData,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FF2260",
                    "#FF36EB",
                    "#366A36"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF2260",
                  "#FF36EB",
                  "#366A36"
                ]
            }]
          },
          options: {
            animation:{
                animateScale:true
            }
          }
        });


        return true;
      },
      PedidosporSolicitantes: function (dataLabes, binsData, target) {

        console.log(dataLabes);
        console.log(binsData);
        console.log(target);

        // return true;

        var ctx = document.getElementById(target);
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
          labels: dataLabes,
          datasets: [
            {
                data: binsData,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FF2260"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF2260"
                ]
            }]
          },
          options: {
            animation:{
                animateScale:true
            }
          }
        });


        return true;
      }

  }

}
