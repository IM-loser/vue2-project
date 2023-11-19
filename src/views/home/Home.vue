<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class='num'>{{ totalData.saleTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.sale | num }}</div>
      </div>
      <div class="item">总访问量
        <div class='num'>{{ totalData.viewsTotal | num }}</div>
        <div class="bottom">今日访问量：{{ totalData.views | num }}</div>
      </div>
      <div class="item">总收藏量
        <div class='num'>{{ totalData.collectTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.collect | num }}</div>
      </div>
      <div class="item">总支付量
        <div class='num'>{{ totalData.payTotal | num }}</div>
        <div class="bottom">今日支付量：{{ totalData.pay | num }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id='box13'>
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div class="title">产品销售比例</div>
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>


    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ orderData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ orderData.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ orderData.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ orderData.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      totalData: {},//首页数据统计
      orderData: {},//首页订单信息
    }
  },
  created() {
    this.totalInfo()
    this.orderinfo()
    this.format();
    // console.log('created-id',document.getElementById('charts'));
  },
  mounted() {//最早获取DOM元素的生命周期函数 挂载完毕
    // console.log('mounted-id', document.getElementById('charts'));
    // this.line()
    // this.pie()
  },
  methods: {
    //获取数据统计---------------------------
    async totalInfo() {
      let res = await this.$api.totalInfo()
      console.log('首页统计信息---', res.data.data.list);
      this.totalData = res.data.data.list;
    },
    //获取今日订单统计信息------------------------------------
    async orderinfo() {
      let res = await this.$api.orderinfo()
      console.log('获取今日订单统计信息---', res.data)
      this.orderData = res.data.list
    },
    //获取图表动态数据-----------------
    async format(){
      let res = await this.$api.format()
      console.log('获取图表动态数据----',res.data.result.data.sale_money);
      // console.log(res.data.result.data.sale_money);//[{},{},{}]
      //折线图 柱状图数据格式：[xx,xx,xx]
      //获取x轴的数据名称
      let arr =res.data.result.data.sale_money;
      let arrx=[],money=[],total=[],pieData=[];
      arr.forEach(ele => {
          arrx.push(ele.name)
          total.push(ele.num)
          money.push(ele.total_amount)
          //饼图--对象数据
          let obj={}
          obj.name = ele.name;
          obj.value = ele.total_amount;
          pieData.push(obj)//[{name:,value:},{},{}]
      });
      // console.log(arrx);
      // console.log(money);
      // console.log(total);
      this.line(arrx,money,total)
      this.pie(pieData)
    },
    //绘制图表--折线------------------
    line(data,money,total) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('charts'));
      // 绘制图表
      myChart.setOption({
        tooltip: {//提示框组件
          trigger: 'axis',
        },
        legend: {},
        toolbox: {
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            // restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {//x轴数据
          data,
        },
        yAxis: {//y轴会自动创建数据
        },
        series: [//图表内容
          {
            name: '销售额',
            type: 'line',
            data:money,
            smooth: true,//是否平滑曲线显示
          },
          {
            name: '销售量',
            type: 'bar',
            data: total,
          }

        ]
      });
    },
    //绘制饼图
    pie(pieData) {
      var myChart = echarts.init(document.getElementById('pie'));
      var option;
      option = {
        tooltip: {
          trigger: 'item',
          formatter:'{a}<br/>{b}:{d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '产品销售额',
            type: 'pie',
            radius: '50%',
            data:pieData,
            // data: [//[{},{}]
            //   { value: 1048, name: '审议' },
            //   { value: 735, name: '淘宝' },
            //   { value: 580, name: '京东' }
            // ],
            emphasis: {//高亮配置
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
    line2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('charts'));
      // 绘制图表
      myChart.setOption({
        // title: {//标题组件，包含主标题和副标题
        //   text: 'ECharts 入门示例'
        // },
        tooltip: {//提示框组件
          trigger: 'axis',
          //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
          // formatter:'{a}-{b}-{c}'
        },
        xAxis: {//x轴数据
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          // axisLine: {//坐标轴轴线相关设置
          //   lineStyle: {
          //     color: 'skyblue',//坐标轴线线的颜色
          //   }
          // },
          // axisTick: {//坐标轴刻度相关设置
          //   alignWithLabel: true
          // }
        },
        yAxis: {//y轴会自动创建数据
        },
        series: [//图表内容
          {
            name: '销量',
            type: 'line',//bar 柱状图  line 折线图  pie饼图  map地图
            data: [5, 20, 66, 10, 10, 20],
            // label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
            //   show: true
            // },
            // labelLine: {
            //   lineStyle: {
            //     color: '#ff5555'
            //   }
            // },
            // itemStyle: {
            //   color: '#ff5555'
            // },
            // lineStyle: {
            //   color: '#ff5555'
            // },
            // smooth: true,//是否平滑曲线显示
          }
        ]
      });
    }

  },
  //过滤器---处理数据格式
  filters: {
    num(value) {//23466 -- 23,466
      if (!value) return;
      return value.toLocaleString();
    }
  }
}
</script>

<style lang="less" scoped>
// .home {
//   margin: 10px;
// }

.header {
  display: flex;
  padding-right: 30px;

  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;

    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }

    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }

  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }

  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }

  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }

  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }
  .item{
    text-align: center;
    font-size: 24px;
    color: #333;
    .el-col{
      border-right: 1px solid #eee;

    }
    .el-col:last-child{
      border-right: none;
    }
    .title{
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>