<template>
    <div class="w-50 mx-auto">
        <GChart type="LineChart" :data="chartData" :options="chartOptions" @ready="onChartReady" />
    </div>
</template>

<script>
import axios from 'axios';
import { GChart } from 'vue-google-charts'
export default {
    components: {
        GChart
    },
    data() {
        return {
            products: null,
            dateBill: null,
            dataHeader: ["Month", "số lượng"],
            chartData: [],
            chartOptions: {
                title: "Tổng số sản phẩm bán theo tháng",
                width: 600,
                height: 300,
                legend: { position: "none" },
                hAxis: { title: 'Tháng trong năm', titleTextStyle: { color: 'red' } },
                vAxis: { title: 'Tổng sản phẩm bán được', titleTextStyle: { color: 'red' } },
                bar: { groupWidth: "95%" },
                curveType: 'function',
                pointSize: 5,
            },
        }
    },
    methods: {
        view() {
            console.log(this.products.map(item => item.name));
        },
        async loadData() {
            try {
                const { data } = await axios.get("http://localhost:3000/orders");
                // đẩy header vào data chart
                this.chartData.push(this.dataHeader);
                for (let i = 0; i < 12; i++) {
                    var month = i + 1;
                    var sumProduct = 0
                    // tìm theo tháng đếm product
                    data.forEach(element => {
                        var billDate = new Date(element.billDate);
                        if (billDate.getMonth() + 1 == month) {
                            element.productOrder.forEach(item => {
                                sumProduct += (item.quantity);
                            });
                        }
                    });
                    // đẩy dữ liệu và data chart
                    var array = [];
                    array.push(`tháng ${month}`, sumProduct);
                    this.chartData.push(array);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.loadData();
    }

}
</script>