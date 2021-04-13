<template>
	<view class="loadingSeven">
	    <span class="sp"></span>
	    <span class="sp"></span>
	    <span class="sp"></span>
	    <span class="sp"></span>
	    <span class="sp"></span>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss">
	.loadingSeven{
	    width: 80px;
	    height: 40px;
	    margin: 100px auto;
	    // margin-top:100px;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			// position: fixed;
			// top:50%;
			// left:45%;
			// background-color: #000;
	}
	.loadingSeven .sp{
	    display: inline-block;
	    width: 8px;
	    height: 100%;
	    border-radius: 4px;
	    background: #c8c6a7;
	    animation: loadsaven 1.04s ease infinite;
	}
	@keyframes loadsaven{
	    0%,100%{
	        height: 40px;
	        background: #c8c6a7;
	    }
	    50%{
	        height: 60px;
	        margin-top: -20px;
	        background: #92967d;
	    }
	}
	.loadingSeven .sp:nth-child(2){
	    animation-delay:0.13s;
	}
	.loadingSeven .sp:nth-child(3){
	    animation-delay:0.26s;
	}
	.loadingSeven .sp:nth-child(4){
	    animation-delay:0.39s;
	}
	.loadingSeven .sp:nth-child(5){
	    animation-delay:0.52s;
	}

</style>
