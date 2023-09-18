require('./style.css');
const config = require('./config.js');

const minDt = document.getElementById('mindt');

new DateTime('#mindt', {
  format: 'YYYY/MM/DD'
});

function showData(dataArray) {
  dataArray = dataArray.map(function(data) {return data.length == 5 ? data.concat(['']) : data;});
  $(document).ready(function () {
    $('#example thead tr')
      .clone(true)
      .addClass('filters')
      .appendTo('#example thead');

    window.table = $("#data-table").DataTable({
      data: dataArray,
      //CHANGE THE TABLE HEADINGS BELOW TO MATCH WITH YOUR SELECTED DATA RANGE
      columns: [
        { title: "姓名" },
        { title: "日期", render: function(data, type) {
          return type === 'sort' ? moment(data, 'YYYY/MM/DD') : moment(data, 'YYYY/MM/DD').format('YYYY/MM/DD');
        }},
        { title: "開始時間"},
        { title: "結束時間" },
        { title: "服務事由" },
        { title: "備註" }
      ],
      order: [[1, 'desc'], [2, 'incr']],
      pageLength: 15,
      lengthMenu: [0, 15, 30, 50, 100]
    })
  })
}



$(document).ready(function () {
  fetch(
    config.SCRIPT_URL + "?method=getData",
    {
      redirect: "follow",
      method: "GET",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      }
    }
  )
    .then((response) => response.json())
    .then((data) => {
      window.debug_k = data;
      showData(data.data);
    });
});

$.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
  let min = moment(minDt.value, 'YYYY/MM/DD');
  let date = moment(data[1], 'YYYY/MM/DD') || 0; // use data for the age column

  if (
    isNaN(min) ||
    (min <= date)
  ) {
    return true;
  }

  return false;
});

minDt.addEventListener('input', function () {
  window.table.draw();
});
minDt.addEventListener('change', function () {
  window.table.draw();
});
