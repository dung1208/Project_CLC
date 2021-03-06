// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
document.getElementsByClassName("dashboard-data").disabled = true;
var ctx = document.getElementById("myAreaChart");
var dataArea = $(".dashboard-data").data("doanhthu");
var ordersData = $(".dashboard-data").data("lai");

var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return number_format(value) + ' dong';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel) + ' dong';
        }
      }
    }
  }
});

let elementDoanhThu = document.getElementsByClassName("time-doanhthu");

for (i = 0; i < elementDoanhThu.length; i++) {
  elementDoanhThu[i].onclick = function () {
    myLineChart.destroy();
    let label = [];
    let c = 0;
    let data = [];
    let index_data = {};

    let type = $(this).data('content');

    let filterDay = DayFilter(type, "doanhthu");
    let lowerDay = filterDay[0];
    let greaterDay = filterDay[1];
    let labelDay = new Date(lowerDay);

    while (labelDay <= greaterDay) {
      let _label = Date2String(labelDay);
      label.push(_label);
      data.push(0);
      index_data[_label] = c;
      c += 1;
      labelDay.setDate(labelDay.getDate() + 1);
    }

    for (let index = 0; index < dataArea.length; index++) {
      let item = dataArea[index];
      let order_date = new Date(item.Order_date);
      let orderDate = new Date(order_date.getFullYear(), order_date.getMonth(), order_date.getDate());

      if (lowerDay <= orderDate && orderDate <= greaterDay) {
        let _order_date = Date2String(orderDate);
        let _index = index_data[_order_date];
        data[_index] += +item.Order_total;
      }
    }

      // chart line
      myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: label,
          datasets: [{
            label: "Earnings",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: data,
          }],
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 25,
              top: 25,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7
              }
            }],
            yAxes: [{
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return number_format(value) + ' dong';
                }
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
              label: function (tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': ' + number_format(tooltipItem.yLabel) + ' dong';
              }
            }
          }
        }
      });
    }
}

let elementProductPopular = document.getElementsByClassName("popular-product");

for (i = 0; i < elementProductPopular.length; i++) {
  elementProductPopular[i].onclick = function () {
    // $('#popular-product').dataTable( {
    //   "destroy": true
    // } );
    let data = {};
    let type = $(this).data('content');

    let filterDay = DayFilter(type, "popular");
    let lowerDay = filterDay[0];
    let greaterDay = filterDay[1];

    let labelDay = new Date(lowerDay);

    // while (labelDay <= greaterDay) {
    //   let _label = Date2String(labelDay);
    //   label.push(_label);
    //   labelDay.setDate(labelDay.getDate() + 1);
    // }

    for (let index = 0; index < ordersData.length; index++) {
      let item = ordersData[index];
      let order_date = new Date(item.Order_date);
      let orderDate = new Date(order_date.getFullYear(), order_date.getMonth(), order_date.getDate());

      if (lowerDay <= orderDate && orderDate <= greaterDay) {
        let key_product = item.Product_id;
        if (data.hasOwnProperty(key_product)) {
          data[key_product]["total"] += item.Quantity;
        }
        else {
          data[key_product] = {};
          data[key_product]["name"] = item.Product_name;
          data[key_product]["total"] = item.Quantity;
        }
      }
    }

    let result = Object.keys(data).map(function(key) {
      return data[key];
    });

    result = result.sort(function(a, b){
      return (b.total - a.total);
    });

    result = result.slice(0, 10);

    // $('#popular-product').dataTable().fnDestroy();
    $('#popular-product').DataTable( {
      "destroy": true,
      data: result,
      columns: [
        { data: 'name' },
        { data: 'total' }
      ],
      "paging":   false,
      "ordering": false,
      "info":     false,
      "searching":   false,
      "scrollY":  "360px",
      "scrollCollapse": true
    } );
  }
}
/**
 * @return {string}
 */
function Date2String(d) {
  let _month = d.getMonth()+1;
  let _day = d.getDate();
  let _year = d.getFullYear();

  return _day + '/' + _month + '/' + _year;
}


function DayFilter(type, grid) {
  let _lowerDay = null;
  let _greaterDay = null;
  let now = new Date();
  if (type === "today") {
    _lowerDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    _greaterDay = new Date();
  }
  if (type === "yesterday") {
    _lowerDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() -1);
    _greaterDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() -1);
  }
  if (type === "7ago") {
    _lowerDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() -7);
    _greaterDay = new Date();
  }
  if (type === "this_month") {
    _lowerDay = new Date(now.getFullYear(), now.getMonth(), 1);
    _greaterDay = new Date();
  }
  if (type === "previous_month") {
    _lowerDay = new Date(now.getFullYear(), now.getMonth(), 1);
    _greaterDay = new Date();
    var newMonth = now.getMonth() - 1;
    if(newMonth < 0){
      newMonth += 12;
      _greaterDay.setYear(now.getYear() - 1);
      _lowerDay.setYear(now.getYear() - 1);
    }
    _greaterDay.setMonth(newMonth+1);
    _greaterDay.setDate(0);
    _lowerDay.setMonth(newMonth);
  }
  if (type === "Khac") {
    if (grid === "doanhthu") {
      _lowerDay = $('.lower-date-dt').datepicker({dateFormat: 'yy-mm-dd'}).val();
      _greaterDay = $('.greater-date-dt').datepicker({dateFormat: 'yy-mm-dd'}).val();
    }
    if (grid === "popular") {
      _lowerDay = $('.lower-date-popular').datepicker({dateFormat: 'yy-mm-dd'}).val();
      _greaterDay = $('.greater-date-popular').datepicker({dateFormat: 'yy-mm-dd'}).val();
    }
    _lowerDay = new Date(_lowerDay);
    _greaterDay = new Date(_greaterDay);
    // if(new Date(lowerDay) <= new Date(greaterDay))
    // {//compare end <=, not >=
    //   console.log(true);
    // }
  }

  return [_lowerDay, _greaterDay];
}

$('.this_month').click();
$('.today').click();