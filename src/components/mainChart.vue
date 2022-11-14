<template>
    <GChart type="LineChart" :data="chartData" :options="chartOptions" />
</template>

<script>


import { GChart } from 'vue-google-charts'

export default {
    components: {
        GChart
    },

    data() {
        return {
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartData: [
                ['Month', 'Sales', 'Expenses', 'Profit'],
                ['2014', 1000, 400, 200],
                ['2015', 1170, 460, 250],
                ['2016', 660, 1120, 300],
                ['2017', 1030, 540, 350]
            ],
            chartOptions: {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                },
                title: 'Company Performance',
            },

            dataProduct: null,
        }
    },

    method: {
        view() {
            GChart.addColumn("string", "tháng")
            GChart.addColumn("string", "mặt hàng")
            console.log(this.dataProduct);
        }
    },

    mounted() {
        this.dataProduct = this.$store.state.products
        // this.dataProduct = this.dataProduct.map(item => item.name)
    },
    created() {
        this.$store.dispatch("getAllProducts")
    }
}
</script>