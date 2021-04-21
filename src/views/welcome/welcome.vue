<template>
  <div>
    <div class='flexR cjs' style='height:100%;width:100%;' v-if="result">
      <div class='box box6' style='color:#181818;z-inde:10;height:380px;width:380px;'>
        <div class='flexC pl' style='align-items:start;'>
          <div class='mt'>注册客户总数：<span style="color:red">{{result.userNumber}}</span></div>
          <div class='mt'>已下单客户前五：</div>
          <div class='mt flexR' v-for="item in result.userConsumptionRanking" :key='item.userId'>
            <div class='pl'>{{item.nickName}}</div>
            <div class='pl'>{{item.phone}}</div>
            <div class='pl'>{{item.sumAmount}} 元</div>
          </div>
        </div>
      </div>

      <div class='box box6' style="color:#181818;z-inde:10;">
        <div class='flexC pl' style='align-items:start;'>
          <div class='mt'>本月下单数：{{result.thisMonthOrderNumber}}</div>
          <div class='mt'>本月下单金额：{{result.thisMonthOrderAmount}} 元</div>
          <div class='mt'>上月下单数：{{result.lastMonthOrderNumber}}</div>
          <div class='mt'>上月下单金额：<span style="color:red">{{result.lastMonthOrderAmount}}</span> 元</div>
          <div class='mt'>总下单数：{{result.orderNumber}}</div>
          <div class='mt'>总下单金额：{{result.orderAmount}} 元</div>
        </div>
      </div>

      <div class='box box6' style='color:#181818;z-inde:10;'>
        <div class='flexC pl' style='align-items:start;'>
          <div class='mt' >总商品数：<span style="color:red">{{result.commodityNumber}}</span> </div>
          <div class='mt'>商品种类：{{result.categoryNumber}} </div>
          <div class='mt'>品牌共计：{{result.brandNumber}} </div>
        </div>
      </div>
      
    </div>

    <div class='box box6 mt stick' style="">
      
    </div>

  </div>
</template>

<script>
  import useCrus from '/@/mixin/useCrus.js'
  import {toRefs,defineComponent, reactive} from 'vue'
  import loadingView from '../../components/loading/loading.vue'
  // import {useStore} from 'vuex'

  export default defineComponent({
    components: { loadingView },
    setup(){
      const state=reactive(useCrus()) 
      // console.log(useStore().state)
      state.urls.s='/build/admin/adminUser/homePage'
      
      state.getList()
      return {
        ...toRefs(state)
      }
    }
  }) 

</script>

<style lang='scss' scoped>
  
.text-fill-color{
	color: lighten(#435560,20%) ;
	font-size:50px;
  font-weight:bold;
}

.box6 { padding: 0 0 1px; background: rgba(#faf3e0, 1); border-top: 1px solid rgba(204, 204, 204, 1); border-right: 1px solid rgba(204, 204, 204, 1); border-left: 1px solid rgba(204, 204, 204, 1); -webkit-border-radius: 60px 60px 60px 0 / 5px 5px 60px 0; border-radius: 60px 60px 60px 0 / 5px 5px 60px 0; -webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3); -moz-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3); box-shadow: 0 0 12px rgba(0, 0, 0, 0.3) }
.box6:before { content: ""; width: 25px; height: 20px; position: absolute; bottom: 0; right: 0; -webkit-border-radius: 0 0 30px 0; -moz-border-radius: 0 0 30px 0; border-radius: 0 0 30px; -webkit-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3); -moz-box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3); box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.3); -webkit-transform: rotate(-20deg) skew(-40deg,-3deg) translate(-13px,-13px); -moz-transform: rotate(-20deg) skew(-40deg,-3deg) translate(-13px,-13px); -o-transform: rotate(-20deg) skew(-40deg,-3deg) translate(-13px,-13px); transform: rotate(-20deg) skew(-40deg, -3deg) translate(-13px, -13px) }
// .box6:after { content: ""; z-index: -10; width: 100px; height: 100px; position: absolute; bottom: 0; right: 0; background: rgba(0, 0, 0, 0.2); display: inline-block; -webkit-box-shadow: 20px 20px 8px rgba(0, 0, 0, 0.2); -moz-box-shadow: 20px 20px 8px rgba(0, 0, 0, 0.2); box-shadow: 20px 20px 8px rgba(0, 0, 0, 0.2); -webkit-transform: rotate(0deg) translate(-45px,-20px) skew(20deg); -moz-transform: rotate(0deg) translate(-45px,-20px) skew(20deg); -o-transform: rotate(0deg) translate(-45px,-20px) skew(20deg); transform: rotate(0deg) translate(-45px, -20px) }
.box6 .cornerLf { width: 100px; height: 100px; top: 0; left: 0; position: absolute; z-index: -6; display: inline-block; -webkit-box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.2); -moz-box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.2); box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.2); -webkit-transform: rotate(2deg) translate(20px,25px) skew(20deg); -moz-transform: rotate(2deg) translate(20px,20px) skew(20deg); -o-transform: rotate(2deg) translate(20px,20px) skew(20deg); transform: rotate(2deg) translate(20px, 20px) }
.box6 .cornerRt { content: ""; width: 50px; height: 50px; top: 0; right: 0; position: absolute; display: inline-block; z-index: -6; -webkit-box-shadow: 10px -10px 8px rgba(0, 0, 0, 0.2); -moz-box-shadow: 10px -10px 18px rgba(0, 0, 0, 0.2); box-shadow: 10px -10px 8px rgba(0, 0, 0, 0.2); -webkit-transform: rotate(2deg) translate(-14px,20px) skew(-20deg); -moz-transform: rotate(2deg) translate(-14px,15px) skew(-20deg); -o-transform: rotate(2deg) translate(-14px,15px) skew(-20deg); transform: rotate(2deg) translate(-14px, 15px) }
.box {width: 300px; height: 300px; margin: 30px; display: inline-block; background: rgba(#faf3e0, 1); border: 1px solid rgba(204, 204, 204, 1); position: relative }

.stick{
  background-image: url('../../assets/images/girl.jpg');
  background-size:cover;
  background-repeat:no-repeat;
  transform: rotate(-45deg) scale(0.6);
  position:absolute;
  right:30px;
  bottom:30px;
  // z-index:-10;
}
</style>