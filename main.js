$(document).ready(function(){
    const table = $('#dt-table').DataTable();
    const tableData = getTableData(table);
    createHighcharts(tableData);
    setTableEvents(table);
    });

function getTableData(table) {
    const data = [],
    Category = [],
    2018 = [],
    2019 = [];
    table.rows({ search: "applied" }).every(function() {
    const data = this.data();
    Category.push(data[0]);
    2018.push(parseInt(data[3].replace(/\,/g, "")));
    2019.push(parseInt(data[5].replace(/\,/g, "")));
    });
    data.push(Category, 2018, 2019);
    return data;
    }
function createHighcharts(data){
        Highcharts.chart("chart", {
        chart: {
        zoomType: 'xy'
        },
        title: {
        text: "Changes in crime in Wichita, KS"
        },
        subtitle: {
        text: "Update: February 26, 2020 from ucr.fbi.gov/crime-in-the-u.s/2019/ <br>Click and drag in the plot area to zoom in"
        },
        xAxis: [
        {
        categories: data[0],
        labels: {
        rotation: -45
        }
        }
        ],
        yAxis: [
        {
        title: {
        text: "Value"
        }
        }
        ],
        series: [
        {
        name: "2018",
        type: "lollipop",
        data: data[1],
        color: "orange"
        },
        {
        name: "2019",
        type: "lollipop",
        data: data[2],
        color: "red"
        }
        ],
        tooltip: {
        shared: true
        },
        legend: {
        backgroundColor: "white",
        shadow: true
        },
        credits: {
        enabled: false
        },
        noData: {
        style: {
        fontSize: "16px"
        }
        }
        });
        }
    
let draw = false;
function setTableEvents(table) {
    table.on("page", () => {
    draw = true;
    });
    table.on("draw", () => {
    if (draw) {
    draw = false;
    } else {
    const tableData = getTableData(table);
    createHighcharts(tableData);
    }
    });
    }
